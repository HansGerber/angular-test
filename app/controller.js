/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var controllers = {};

controllers.home = function($scope, $http) {
	
};

controllers.contact = function($scope, $http, $location) {
	
    function validate(contactData) {

        var result = {
            success: true,
            errors: []
        };

        document.querySelectorAll("#contactForm input[type=text], #contactForm input[type=email], #contactForm input[type=tel], #contactForm select, #contactForm textarea")
            .forEach(function(currentValue, currentIndex, listObj) {
                listObj[currentIndex].classList.remove("error");
            });

        document.getElementById("internalError").style.display = "none";

        if(
            typeof contactData === "undefined"
        ){
            result.success = false;
            result.errors.push('noData');
            document.getElementById("internalError").style.display = "block";
        }

        if(
            !("name" in contactData) ||
            contactData.name.length < 2
        ){
            result.success = false;
            result.errors.push('invalidName');
            document.querySelector("#contactForm input[name=name]").classList.add("error");
        }

        if(
            !("email" in contactData)
            || contactData.email.match(/.+\@.+\..+/) === null
        ){
            result.success = false;
            result.errors.push('invalidEmail');
            document.querySelector("#contactForm input[name=email]").classList.add("error");
        }

        if(
            !("message" in contactData)
            || contactData.message.length < 5
        ){
            result.success = false;
            result.errors.push('invalidMessage');
            document.querySelector("#contactForm textarea[name=message]").classList.add("error");
        }

        return result;
    };

    $scope.contact = {};

    $scope.send = function() {
        var validationResult = validate($scope.contact);

        if(validationResult.success === true){

            $http.post(
                BKCleanApi.baseURL + 'contact/',
                {
                    data: $scope.contact
                }
            ).then(function(response) {

                if(response.data.success === true){
                    $location.path('contact/success');
                } else {
                    $location.path('contact/error');
                }
            });
        } else {

            console.log("validation fail : ", validationResult);
        }
    };
}

controllers.contactSuccess = function($scope) {

};

controllers.contactError = function($scope) {

};

controllers.login = function($scope, userService) {

	$scope.user = {
		name: '',
		password: ''
	}
	
	$scope.doLogin = function(user){
		
		if(userService.isLoggedIn()){
                    alert("Schon angemeldet.");
		} else {
                    userService.login(
                        user,
                        function(response) {
                            if(response.data.success === true){
                                switch(response.data.key){
                                    case 'OK':
                                        userService.storeUserInSession(user);
                                        alert("Anmeldung erfolgreich.");
                                    break;
                                }
                            } else {
                                switch(response.data.key){
                                    case 'UserNotFound':
                                        alert("Unbekannte Anmeldedaten.");
                                    break;
                                    default:
                                        alert("Etwas ist schief gelaufen. Bitte versuchen sie es später erneut.");
                                    break;
                                }
                            }
                        },
                        function(response) {
                            console.log("Internal Error (" + response + ")");
                        }
                    );
		}
	}
};

controllers.tickets = function($scope, userService) {
    
};

controllers.pageNotFound = function($scope) {
    
};

app.controller(controllers);

