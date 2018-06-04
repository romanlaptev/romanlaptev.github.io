var webApp = {
	"vars" : {
		"app_title" : "Firefox bookmarks",
		"log" : [],
		//"templates_url" : "tpl/templates.xml",
		//"GET" : {},
		//"pageContainer" : getById("page-container"),
		//"wait" : getById("wait"),
		//"waitWindow" : getById("wait-window"),
		//"loadProgress" : getById("load-progress"),
		//"loadProgressBar" : getById("load-progress-bar"),
		//"saveProgressBar" : getById("save-progress-bar")
	},
	
	"init" : function( postFunc ){
console.log("init webapp!", arguments);
console.log( navigator.userAgent );
//console.log( this.vars.pageContainer );

		webApp.app.init();
		
		var app_title = getById("app-title");
		if( app_title){
			app_title.innerHTML = this.vars["app_title"];
		}
		
		if( typeof postFunc === "function"){
			postFunc();
		}
		
	},//end init()
	
	"app" : _app(),
	//"run" : _runApp
};//end webApp()
console.log(webApp);

//==================================
function _app( opt ){
//console.log(arguments);	

	// private variables and functions
	var _vars = {
		//"init_url" : "#?q=node&nid=20",
	};// _vars
	
	var _init = function( opt ){
console.log("init app!");
		//defineEvents();
	};//end _init()
	
	function _loadTemplates( callback ){
//..................
	}//end _loadTemplates()
	
	// public interfaces
	return{
		vars : _vars,
		init:	function(args){ 
			return _init(args); 
		},
		//urlManager:	function( target ){ 
			//return _urlManager( target ); 
		//},
		loadTemplates : _loadTemplates,
	};
	
}//end _app()

function _runApp(){
	//webApp.app.loadTemplates(function(){
//console.log("Load templates end...", webApp.draw.vars["templates"] );		
		webApp.init(function(){
//...........		
		});//end webApp initialize
	//});
}//end _runApp()

//================================== Start
_runApp();
	
