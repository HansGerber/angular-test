app.factory("userService", function($http) {
	
	return {
		
		sessionKey: 'user',
	
		login: function(user, success, error){

                    if(this.isLoggedIn() === false){
                        
			$http.post(
				BKCleanApi.makePath("user/"),
				user
			).then(
				function(response){
                                    success(response);
				},
				function(response){
                                    error(response);
				}
			);
                    }
		},

		isLoggedIn: function(){
			
                        console.log("isLoggedIn()", sessionStorage.getItem(this.sessionKey));
                        
			if(sessionStorage.getItem(this.sessionKey)){
				return true;
			}
			return false;
		},
		
		logout: function() {
                    if(this.isLoggedIn() === true){
			sessionStorage.removeItem(this.sessionKey);
                    }
		},
                
                storeUserInSession: function(userData){
                    sessionStorage.setItem(this.sessionKey, userData);
                }
	
	}
});