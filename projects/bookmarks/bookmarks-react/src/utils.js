import {dataStore} from "./components/DataStore";

//export function sayHi() {
  //alert("Hello!");
//};

export function eventHandler( event ){	
console.log("dataStore.eventHandler()", event);
	//e.preventDefault();		
//<a href="#?q=view-container&id=79"
	//window.location.hash = "";
	
	urlManager( event.target.href );

};//end eventHandler()



export function urlManager( path ){
//console.log( "_urlManager()", arguments);

	var p = path.split("?");
	var parseStr = p[1]; 
//console.log( "_urlManager()", p, parseStr );
	
	if( !parseStr || parseStr.length === 0 ){
console.log( "Warn! error parse url in _urlManager()."  );
		return;
	}

	dataStore["GET"] = _parseGetParams( parseStr ); 
	var $_GET = _parseGetParams(parseStr); 
//console.log( $_GET);

	switch( $_GET["q"] ){
		case "view-container":
			if( $_GET["id"] ){
				dataStore.components["Container"]._getContainerByID( $_GET["id"], dataStore["bookmarksArray"], 
					function( res, _this ){
//console.log("CHANGE container:", res, _this);
//console.log( res["id"], res["title"] );
						dataStore.components["Container"].setState({
							container: res
						});

						//UPDATE Breadcrumb								
						dataStore.components["Container"].props.updateState({
							"title": res["title"],
							"id": "container_" + res["id"]
						}, "updateBreadcrumb");

				});
			}
		break;
		
		case "clear-log":
			document.querySelector("#log").innerHTML = "";
			document.querySelector("#log-wrap").style.display = "none";
		break;
		
		case "get-json":
dataStore.logMsg = "action: get-json";
console.log(dataStore.logMsg);
		break;

		
		default:
console.log("error, no action...");
		break;
		
	}//end switch
	
}//end _urlManager

function _parseGetParams( parseStr ) { 

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		parse_url = parseStr.split("&"); 
	}
//console.log(parse_url);
	
	var $_GET = {}; 
	for(var n = 0; n < parse_url.length; n++) { 
	var getVar = parse_url[n].split("="); 
		//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
		if( typeof(getVar[1]) === "undefined" ){
			$_GET[ getVar[0] ] = "";
		} else {
		 $_GET[ getVar[0] ] = getVar[1];
		}
	}//next
	return $_GET; 
}//end parseGetParams() 




export function parseDate( _date ){
	var timestamp = _date / 1000;
	var date = new Date();
	date.setTime( timestamp);
//console.log( date );

	var sYear = date.getFullYear();
	
	var sMonth = date.getMonth() + 1;
//console.log( sMonth, typeof sMonth );
	if( sMonth < 10){
		sMonth = "0" + sMonth;
	}
	
	var sDate = date.getDate();
	if( sDate < 10){
		sDate = "0" + sDate;
	}
	
	var sHours = date.getHours();
	if( sHours < 10){
		sHours = "0" + sHours;
	}
	
	var sMinutes = date.getMinutes();
	if( sMinutes < 10){
		sMinutes = "0" + sMinutes;
	}
	
	var dateStr = sYear + "-" + sMonth + "-" + sDate + " " + sHours + ":" + sMinutes;

	return dateStr;
}//end _parseDate()
