//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);

	var support = false;
	var logMsg;

window.onload = function(){

	logMsg = navigator.userAgent;
	func.logAlert(logMsg, "info");

//------------------ left menu, SNAP-BOX

	//var snapper = new Snap({
		//element: document.getElementById("appContainer")
	//});
  
	func.addEvent(document.querySelector("#open-left"), 'click', function(){
		//snapper.open('left');
//console.log( snapper.state().state );
		//( snapper.state().state == "closed")? snapper.open("left"): snapper.close();
    var appContainer = document.querySelector("#app-container");
    var sideMenu = document.querySelector("#side-menu");
//console.log( "transform: ", appContainer.style.transform, appContainer.style.transform.length );
    
		//if( appContainer.style.transform === ""){
		if( sideMenu.style.display === "block"){
			sideMenu.style.display = "none";
			appContainer.style.transform = "";
		} else {
			sideMenu.style.display = "block";
			appContainer.style.transform = "translate3d(202px, 0px, 0px)";
		}
    
	});


	//func.addEvent(document.getElementById("btn-close-drawer-left"), 'click', function(){
		//snapper.close();
	//});

//	func.addEvent(document.getElementById('or'), 'click', function(){
		//snapper.open('right');
//console.log( snapper.state().state );
		//( snapper.state().state == "closed")? snapper.open("right"): snapper.close();
	//});
  
/* Prevent Safari opening links when viewing as a Mobile App */
/*  
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");
*/  
//----------------------
  
	defineEvents();

	//--------------------------
/*	
	var test =  typeof navigator.geolocation !== "undefined";
	logMsg = "navigator.geolocation support: " + test;
	if ( test ) {
		func.logAlert(logMsg, "success");
		support = true;
	} else {
		func.logAlert(logMsg, "danger");
	}
*/	
	//--------------------------
/*	
	if( window.location.protocol !== "https:"){
		support = false;
		logMsg = "error, <b>navigator.geolocation</b> requires <b>'https:'</b> protocol....";
		func.logAlert( logMsg, "error" );
	} else {
		support = true;
	}

//for test
//support = true;
*/
	//Start webApp
	//if( support ){
		_runApp();
	//}

	function _runApp(){
		var _app = App();
console.log("_app:", _app);
		_app.init();
	}//end _runApp()

  
};//end window.load



function defineEvents(){

	var btn_clear_log = func.getById("btn-clear-log");
	var logPanel = func.getById("log");
	btn_clear_log.onclick = function( event ){
//console.log("click...", e);			
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (event.preventDefault) { 
			event.preventDefault();
		} else {
			event.returnValue = false;				
		}
		logPanel.innerHTML = "";
	};//end event

}//end defineEvents()



//================================= Element.classList
//https://developer.mozilla.org/ru/docs/Web/API/Element/classList
(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += ' '+ name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();
