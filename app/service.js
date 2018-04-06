app.factory("userService", function($rootScope, $http) {
	
	return {
		
		login: function(credentials, success, error){

                    if(this.isLoggedIn() === false){
                        
			$http.post(
				BKCleanApi.makePath("user/"),
				credentials
			).then(
				function(response){
						if(response.data.success){
							sessionStorage.setItem("loggedin", 1);
							$rootScope.$emit("userService.login", "success");
							success(response);
						} else {
							$rootScope.$emit("userService.login", "error");
							error(response);
						}
				},
				function(response){
						$rootScope.$emit("userService.login", "error");
						error(response);
				}
			);
                    }
		},

		isLoggedIn: function(){
			return sessionStorage.getItem("loggedin") !== null;
		},
		
		logout: function() {
                    if(this.isLoggedIn() === true){
                        $rootScope.$emit("userService.logout", "success");
						sessionStorage.removeItem("loggedin");
                    }
		},
		
		getUserInfo: function(success, error) {
			if(this.isLoggedIn()){
				$http.get(
					BKCleanApi.makePath("user/", "userInfo")
				).then(
					function(result) {
						console.log("userService.getUserInfo() SUCCESS ", result);
						success(result);
					},
					function(result) {
						console.log("userService.getUserInfo() ERROR ", result);
						error(result);
					}
				);
			} else {
				error({
					success: false,
					key: "notLoggedIn"
				});
			}
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
