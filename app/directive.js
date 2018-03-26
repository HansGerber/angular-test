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
            '<div class="row"><label class="col-md-2">Username/E-Mail *</label><input type="text" class="col-md-8" name="user" ng-model="login.user"></div>' +
            '<div class="row"><label class="col-md-2">Password *</label><input type="password" class="col-md-8" name="password" ng-model="login.password"></div>' +
            '<div class="row"><input type="submit" ng-click="login()" value="einloggen" /></div>' +
        '</form>'
  };
});

app.directive('copyrightNote', function() {
  
  return {
	  controller: ['$scope', function copyrightNoteController($scope) {
		  var year = new Date().getFullYear();
		  $scope.date = (year <= 2018 ? '' : ' - ' + year);
	  }],
    template: '<div id="copyrightNote">&copy; BK-Clean 2018{{ date }}</div>'
  };
});