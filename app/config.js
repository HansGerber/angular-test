app.config(function($routeProvider) {
    $routeProvider.when(
            '/',
            {
                    controller:'home',
                    templateUrl:'views/home.htm',
                    title:'Home - BKClean'
            }
    ).when(
            '/contact',
            {
                    controller:'contact',
                    templateUrl:'views/contactForm.htm',
                    title:'Kontakt - BKClean'
            }
    ).when(
            '/contact/success',
            {
                    controller:'contactSuccess',
                    templateUrl:'views/contactSuccess.htm',
                    title:'Kontakt - BKClean'
            }
    ).when(
            '/contact/error',
            {
                    controller:'contactError',
                    templateUrl:'views/contactError.htm',
                    title:'Kontakt - BKClean'
            }
    ).when(
            '/login',
            {
                    controller:'login',
                    templateUrl:'views/login.htm',
                    title:'Login - BKClean'
            }
    ).when(
            '/logout',
            {
                    controller:'logout',
                    templateUrl:'views/logoutSuccess.htm',
                    title:'Logout - BKClean'
            }
    ).when(
            '/my-profile',
            {
                    controller:'myProfile',
                    templateUrl:'views/myProfile.htm',
                    title:'Mein Profil - BKClean'
            }
    ).when(
            '/tickets',
            {
                    controller:'tickets',
                    templateUrl:'views/tickets.htm',
                    title:'Tickets - BKClean'
            }
    ).otherwise(
            //{redirectTo: '/'}
            {
                    controller:'pageNotFound',
                    templateUrl:'views/404.htm',
                    title:'Nicht gefunden - BKClean'
            }
    );
});

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

app.config(['AnalyticsProvider', function (AnalyticsProvider) {
   // Add configuration code as desired
   AnalyticsProvider.setAccount('UA-80065119-4');
}]).run(['Analytics', function(Analytics) { }]);