//import React, { Component } from 'react';

//type: "text/x-moz-place-container"
//typeCode: 2

//type: "text/x-moz-place"
//typeCode: 1
//uri: "http://192.168.0.1/"

/*
children: Array(15) [ {…}, {…}, {…}, … ]
​​​​​dateAdded: 1527556169316000
​​​​​guid: "menu________"
​​​​​id: 2
​​​​​index: 0
​​​​​lastModified: 1529484963727000
​​​​​root: "bookmarksMenuFolder"
​​​​​title: "Меню закладок"
​​​​​type: "text/x-moz-place-container"
​​​​​typeCode: 2
-------------

annos: Array [ {…} ]
​​​​​​​dateAdded: 1485666961987000
​​​​​​​guid: "vjFTTIEK7DfV"
​​​​​​​id: 6215
​​​​​​​index: 14
​​​​​​​lastModified: 1528524416604000
​​​​​​​title: "D-LINK WIRELESS ROUTER"
​​​​​​​type: "text/x-moz-place"
​​​​​​​typeCode: 1
​​​​​​​uri: "http://192.168.0.1/"		

*/
var dataStore = {
	
	urlViewContainer: "#?q=view-container&id={{id}}",
	components:{},//components link
	sharedFunc: {
		eventHandler: _eventHandler,
		parseDate: _parseDate
		//parseGetParams: _parseGetParams
	},
	
	breadcrumbPath: {
		//"container_2": "Меню закладок",
		//"container_79": "info",
		//"container_24": "blogs, articles",
		//"container_454": "LiveJournal"
	},

	bookmarksArray: {
		dateAdded: 1527556169316000,
		lastModified: 1529484963727000,
		id: 1,
		index: 0,
		root: "placesRoot",
		title: "",
		type: "text/x-moz-place-container",
		typeCode: 2,
		children: [
			{ 
				id: 2,
				"typeCode" : 2, 
				"type" : "text/x-moz-place-container", 
				"title" : "Меню закладок", 
				root: "bookmarksMenuFolder",
				dateAdded: 1527556169316000,
				lastModified: 1529484963727000,
				children: [

					{ 
						id: 14,
						index: 0,
						"typeCode" : 1, 
						"type" : "text/x-moz-place", 
						"uri" : "place:type=6&sort=14&maxResults=10", 
						"title" : "Последние метки", 
						dateAdded: 1527556178054000,
						lastModified: 1527556178907000,
						annos: [ {
							value: "announce!!!!"
						}]
					},

					{ 
						id: 79,
						index: 2,
						"typeCode" : 2, 
						"type" : "text/x-moz-place-container", 
						"title" : "info", 
						announce: "bookmarks container",
						dateAdded: 1485666942761000,
						lastModified: 1529484963727000,
						annos: [ {
							value: "announce!!!!"
						}],
						children: [ 
							{ 
								"typeCode" : 1, 
								"type" : "text/x-moz-place", 
								"uri" : "http://yandex.ru", 
								"title" : "Yandex", 
								icon : "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
								annos: "web portal",
								dateAdded: 1485666961987000,
								lastModified: 1528524416604000
							},
							
							{ 
								"typeCode" : 1, 
								"type" : "text/x-moz-place", 
								"uri" : "https://jestjs.io/docs/ru/getting-started", 
								"title" : "Jest 23.3", 
								icon : "https://jestjs.io/img/favicon/favicon.ico",
								annos: "system of JavaScript testing",
								dateAdded: 1485666961987000,
								lastModified: 1528524416604000
							},
							
							{ 
								id: 1079,
								"typeCode" : 2, 
								"type" : "text/x-moz-place-container", 
								"title" : "test container", 
								annos: [ {
									value: "bookmarks container"
								}],
								children: [ 
									{ 
										"typeCode" : 1, 
										"type" : "text/x-moz-place", 
										"uri" : "http://yandex.ru", 
										"title" : "Yandex", 
										icon : "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
										annos: "web portal",
										dateAdded: 1485666961987000,
										lastModified: 1528524416604000
									}
								],
								dateAdded: 1485666961987000,
								lastModified: 1528524416604000
							}
						]
					},


					{ 
						id: 6215,
						index: 14,
						"typeCode" : 1, 
						"type" : "text/x-moz-place", 
						"uri" : "http://192.168.0.1/", 
						"title" : "D-LINK WIRELESS ROUTER", 
						dateAdded: 1485666961987000,
						lastModified: 1528524416604000,
						annos: [ {
							value: "announce!!!!"
						}]
					}
					
				]
				
			},
			
			{ 
				id: 3,
				typeCode: 2, 
				type: "text/x-moz-place-container", 
				title: "Панель закладок",
				root: "toolbarFolder",
				dateAdded: 1527556169316000,
				lastModified: 1527556178024000
			}
		]
	}
	
};//end dataStore
console.log("dataStore: ", dataStore);

/*
class DataContainer extends Component {
	
	constructor( props ){
		super( props );
		this.state = {
			bookmarks: bookmarksArray
		};
	};//end constructor
	
	render(){
		return;
	}
	
}//end class
*/

export default dataStore;


function _eventHandler( event ){	
//console.log("dataStore.eventHandler()", event, _this);
	//e.preventDefault();		
//<a href="#?q=view-container&id=79"

	var path = event.target.href.split("?");
	var parseStr = path[1]; 
//console.log( path, parseStr );


		if( parseStr.length > 0 ){
			
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
				
				default:
console.log("error, no action...");
				break;
				
			}//end switch


		} else {
console.log( "Warn! error parse url in " + event.target.href );
		}

	};//end eventHandler


function _parseGetParams( parseStr ) { 

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		var parse_url = parseStr.split("&"); 
	}
//console.log(parse_url);
	
	var $_GET = {}; 
	for(var n = 0; n < parse_url.length; n++) { 
	var getVar = parse_url[n].split("="); 
		//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
		if( typeof(getVar[1])=="undefined" ){
			$_GET[ getVar[0] ] = "";
		} else {
		 $_GET[ getVar[0] ] = getVar[1];
		}
	}//next
	return $_GET; 
}//end parseGetParams() 

function _parseDate( _date ){
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
