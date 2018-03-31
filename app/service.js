app.factory("userService", function($rootScope, $http) {
	
	return {
		
		sessionKey: 'user',
	
		login: function(user, success, error){

                    if(this.isLoggedIn() === false){
                        
			$http.post(
				BKCleanApi.makePath("user/"),
				user
			).then(
				function(response){
                                    $rootScope.$emit("userService.login", "success");
                                    success(response);
				},
				function(response){
                                    $rootScope.$emit("userService.login", "error");
                                    error(response);
				}
			);
                    }
		},

		isLoggedIn: function(){
			
			if(sessionStorage.getItem(this.sessionKey)){
				return true;
			}
			return false;
		},
		
		logout: function() {
                    if(this.isLoggedIn() === true){
                        $rootScope.$emit("userService.logout", "success");
			sessionStorage.removeItem(this.sessionKey);
                    }
		},
                
                storeUserInSession: function(userData){
                    sessionStorage.setItem(this.sessionKey, userData);
                }
	
	}
});

app.factory("deepLinkService", function(userService, $location) {
	
	return {
	    
            resetReferrer: function(options) {
                var doReset = true;
            
                if(typeof options !== "undefined" && "excludeUrls" in options){
                    options.excludeUrls.map(function(value){
                        if(value === $location.url()){
                            doReset = false;
                        }
                    });
                }
                
                if(doReset){
                    if(sessionStorage.getItem("referrer")){
                        sessionStorage.removeItem("referrer");
                    }
                }
            },
            
	    loginRedirect: function() {
                if(userService.isLoggedIn() === false){
                    sessionStorage.setItem("referrer", $location.url());
                    $location.path("login");
                }
            },
	
            redirectAfterLogin: function(){
                if(sessionStorage.getItem("referrer")){
                    var ref = sessionStorage.getItem("referrer");
                    sessionStorage.removeItem("referrer");
                    $location.path(ref);
                } else {
                    $location.path("/");
                }
            }
	}
});