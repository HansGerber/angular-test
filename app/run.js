app.run(function($rootScope, deepLinkService) {
    // Stuff to run after all modules are initalized.
    // Add global functions/variables here via the $rootScope
    
    $rootScope.$on('$routeChangeStart', function(){
        deepLinkService.resetReferrer({
            excludeUrls: ['/login']
        });
    });
    
    addEventListener("load", function() {
        document.getElementById("pageLoadingOverlay").style.display="none";
    }, false);
    
});