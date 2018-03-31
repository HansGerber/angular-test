app.directive('characterLimit', function() {
    
	return {
		link: function(scope, element, attrs){
			
			var el = angular.element(element), maxlength = 255;
			
			el.after('<div class="characterLimit"></div>');
			
			if("maxlength" in attrs){
				maxlength = attrs.maxlength;
			}
			
			el.attr("maxlength", maxlength);
			el.on("keyup", function() {
				el.next(".charactersLimit").html(el.val().length + " / " + maxlength);
			});
			
			el.next(".charactersLimit").html(el.val().length + " / " + maxlength);
		},
		
	}
});

app.directive('ticketCount', function() {
    
  return {
    controller: ['$scope', '$http', function ticketCounterController($scope, $http) {
        
        $scope.countResult = "loading ...";
        
        if("BKCleanApi" in window){
            
                $http
                    .get(BKCleanApi.makePath("tickets", "ticketCount"))
                    .then(function(response) {
                        $scope.countResult = (response.data.success === true ? response.data.detail.ticketCount : "Fehler beim ermitteln der Ticketanzahl. Bitte versuchen Sie es sp&auml;ter erneut.");
                    }
                );
            } else {
            $scope.countResult = "Fehler beim ermitteln der Ticketanzahl. Bitte versuchen Sie es sp&auml;ter erneut.";
        }
    }],
    template: '{{ countResult }}'
  };
});

app.directive('loginForm', function() {
  
  return {
	  
    template: '<form id="loginForm" class="container">' +
            '<div class="row"><label class="col-md-2">Kundennummer *</label><input type="text" class="col-md-8" name="user" ng-model="user.cid"></div>' +
            '<div class="row"><label class="col-md-2">Passwort *</label><input type="password" class="col-md-8" name="password" ng-model="user.password"></div>' +
            '<div class="row"><input type="submit" ng-click="doLogin(user)" value="einloggen" /></div>' +
        '</form>'
  };
});

app.directive('naviUserSnippet', function() {
    
    return {
        controller: function($scope, $rootScope, userService, $sce){
            
            if(userService.isLoggedIn()){
                $scope.tmpl = '<a href="#/my-profile">Mein Profil</a>' +
                    '<a href="#/tickets">Tickets</a>' +
                    '<a href="#/logout">Logout</a>';
            } else {
                $scope.tmpl = '<a href="#/login">Login</a>';
            }
            
            $scope.renderHTML = function(html){
                return $sce.trustAsHtml(html);
            }
            
            $rootScope.$on('userService.login', function(event, loginResult){
                
                $scope.tmpl = '<a href="#/my-profile">Mein Profil</a>' +
                    '<a href="#/tickets">Tickets</a>' +
                    '<a href="#/logout">Logout</a>';
            
            });
            
            $rootScope.$on('userService.logout', function(event, logoutResult){
                
                $scope.tmpl = '<a href="#/login">Login</a>';
                
            });
        },
        template: function() {
            return '<div ng-bind-html="renderHTML(tmpl)"></div>';
        }
    };
});

app.directive('copyrightNote', function() {
  
  return {
        controller: ['$scope', function copyrightNoteController($scope) {
            var year = new Date().getFullYear();
            $scope.date = (year <= 2018 ? '' : ' - ' + year);
        }],
        template: '<div id="copyrightNote">&copy; 2018{{ date }}</div>'
  };
});