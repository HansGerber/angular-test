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

controllers.login = function($scope, $location, userService, deepLinkService) {

    if(userService.isLoggedIn() === true){
        
        $location.path("/");
    } else {

		$scope.user = {
			cid: '',
			password: ''
		}
		
		$scope.doLogin = function(user){
			
			if(userService.isLoggedIn()){
						alert("Schon angemeldet.");
			} else {
						userService.login(
							user,
							function(response) {
                                                            console.log(response.data.success);
								if(response.data.success === true){
									switch(response.data.key){
										case 'OK':
											deepLinkService.redirectAfterLogin();
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
								console.log("Internal Error" ,response);
							}
						);
			}
		}
    }
};

controllers.logout = function($scope, $timeout, $location, userService, deepLinkService) {
    if(userService.isLoggedIn() === true){
        userService.logout();
    }
    $location.path("/");
};

controllers.myProfile = function($scope, userService, deepLinkService) {
    deepLinkService.loginRedirect();
}

controllers.tickets = function($scope, $route, deepLinkService) {
    deepLinkService.loginRedirect();
    $scope.refresh = function() {
        $route.reload();
    }
};

controllers.pageNotFound = function($scope) {
    
};

app.controller(controllers);

