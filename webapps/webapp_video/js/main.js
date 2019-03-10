//console.log("module sharedFunc:", typeof sharedFunc, sharedFunc);
var func = sharedFunc();
//console.log("func:", func);

if( typeof window.jQuery === "function"){
var msg = 'jQuery version: ' + jQuery.fn.jquery;
func.log(msg);

	$(document).ready(function(){
//console.log("document ready");
	});//end ready	

	$(window).scroll(function() {
//var st = $(window).scrollTop();
//document.title = st;
//console.log ("scrollTop = " + st );
/*
		if ( $(this).scrollTop() > start_scroll_pos  ) {
			$("#btn-scroll-to-top").show();
		} 

		if ( $(this).scrollTop() < end_scroll_pos ) {
			$("#btn-scroll-to-top").hide();
		}
*/		
	});//end scroll
}



window.onload = function(){
//console.log("window event onload");
func.log( navigator.userAgent );

	//Start webApp
	if( typeof webApp === "object"){
		_runApp();
	}

	function _runApp(){
		webApp.init(function(){
console.log("end webApp initialize....");
		});//end webApp initialize

	}//end _runApp()

};//end window.load

if ('ontouchstart' in window){
	document.body.className = "touch";
func.log( document.body.className );	
/*
		var script = document.createElement('script');
		script.src = "https://getfirebug.com/firebug-lite.js";
		//document.body.appendChild( script );
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function() {
//alert( "onload " + this.src);
		};
		script.onerror = function(e) {
//alert( "error load script " + this.src);
		};  
*/
}


var webApp = {
	
	"vars" : {
		"app_title" : "video collection",
		"logMsg" : ""
	},
	
	"init" : function( postFunc ){
console.log("init webapp!");

		var appTitle = func.getById("app-title");
		if( appTitle){
			appTitle.innerHTML = this.vars["app_title"];
		}
		
		this["vars"]["log"] = func.getById("log");
		this["vars"]["btnToggle"] = func.getById("btn-toggle-log");
		
		defineEvents();
				
		if( typeof postFunc === "function"){
			postFunc();
		}
	},//end init()
	
};//end webApp()
console.log(webApp);

	function defineEvents(){

/*
//console.log( webApp.vars.pageContainer );
		if( webApp.vars.pageContainer ){
			webApp.vars.pageContainer.onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
//console.log( event );
//console.log( this );//page-container
//console.log( target.textContent );
//console.log( event.eventPhase );
//console.log( "preventDefault: " + event.preventDefault );
				//event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
				//event.preventDefault ? event.preventDefault() : (event.returnValue = false);				
				
				if( target.tagName === "A"){
					if ( target.href.indexOf("#?q=") !== -1){
						if (event.preventDefault) { 
							event.preventDefault();
						} else {
							event.returnValue = false;				
						}

							//var search = target.href.split("?"); 
							//var parseStr = search[1]; 
							var parseStr = target.href; 
//console.log( search, parseStr );
							if( parseStr.length > 0 ){
								webApp.vars["GET"] = parseGetParams( parseStr ); 
								webApp.app.urlManager( target );
							} else {
console.log( "Warn! error parse url in " + target.href );
							}
					}
				}
				
			}//end event
		}
*/

		$("#btn-clear-log").on("click", function(e){
console.log("click...", e);			
			webApp.vars["log"].innerHTML="";
		});//end event
		
		$("#btn-toggle-log").on("click", function(e){
console.log("click...", e);			
			if( webApp.vars["log"].style.display==="none"){
				webApp.vars["log"].style.display="block";
				webApp.vars["btnToggle"].innerHTML="-";
			} else {
				webApp.vars["log"].style.display="none";
				webApp.vars["btnToggle"].innerHTML="+";
			}
		});//end event
		
	}//end defineEvents()
