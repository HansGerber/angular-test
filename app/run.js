app.run(function($rootScope, deepLinkService) {
    
    $rootScope.$on('$routeChangeStart', function(){
        deepLinkService.resetReferrer({
            excludeUrls: ['/login']
        });
    });
    
    addEventListener("load", function() {
        document.getElementById("pageLoadingOverlay").style.display="none";
    }, false);
    
});