var mobileTreshholdWidth = 1024;
var checkingNav = false;

function closeMobileNavi(){
    navLinks.classList.remove("open");
}

function switchNavToMobile(){
	var nav = document.getElementById("nav");
	var navLinks = document.getElementById("navLinks");
	nav.classList.remove("desktop");
	nav.classList.add("mobile");
        closeMobileNavi();
}

function switchNavToDesktop(){
	var nav = document.getElementById("nav");
	nav.classList.add("desktop");
	nav.classList.remove("mobile");
}

function initNavi(){
	var btn = document.getElementById("openMobileNavButton");
        var navLinks = document.getElementById("nav").getElementsByTagName("a");
	btn.addEventListener("click", function() {
		var navLinks = document.getElementById("navLinks");
		navLinks.classList.toggle("open");
	}, false);
        /*for(var i = 0; i < navLinks.length; i++){
            navLinks[i].addEventListener("click", function() {
                closeMobileNavi();
            }, false);
        }*/
}

function checkNavi() {
	if(checkingNav === false){
		checkingNav = true;
		setTimeout(function() {
			if(window.innerWidth < mobileTreshholdWidth){
				switchNavToMobile();
			} else {
				switchNavToDesktop();
			}
			checkingNav = false;
		}, 100);
	}
}

addEventListener("load", function(){
        initNavi();
        checkNavi();
}, false);

addEventListener("resize", function(){
        checkNavi();
}, false);