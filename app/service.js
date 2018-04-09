app.factory("userService", function($rootScope, $http, base64) {
	
	return {
		
		login: function(credentials, success, error){

                    if(this.isLoggedIn() === false){
                        
			$http.post(
				BKCleanApi.makePath("user/"),
				credentials
			).then(
				function(response){
                                        if(response.data.success){
                                            switch(response.data.key){
                                                case 'OK':
                                                    sessionStorage.setItem("loggedin", 1);
                                                    $http.defaults.headers.common['Authorization'] = 'Basic ' + base64.encode(credentials.cid + ':' + credentials.password);
                                                    $rootScope.$emit("userService.login", "success");
                                                break;
                                                default:
                                                    $rootScope.$emit("userService.login", "error");
                                                break;
                                            }
                                        } else {
                                            $rootScope.$emit("userService.login", "error");
                                        }
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
			return sessionStorage.getItem("loggedin") !== null;
		},
		
		logout: function() {
                    if(this.isLoggedIn() === true){
                        $http.defaults.headers.common.Authorization = 'Basic';
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

app.factory("base64", function() {
   return {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
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
