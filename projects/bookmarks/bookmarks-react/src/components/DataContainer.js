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
*/
var bookmarksArray = [

	{ 
​​​​​		id: 2,
​​​​​		"typeCode" : 2, 
		"type" : "text/x-moz-place-container", 
		"title" : "Меню закладок", 
		dateAdded: 1527556169316000,
		lastModified: 1529484963727000
	},
	
	{ 
		"typeCode" : 1, 
		"type" : "text/x-moz-place", 
		"url" : "http://yandex.ru", 
		"title" : "Yandex", 
		icon : "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
		announce: "web portal",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	},
	
	{ 
		"typeCode" : 1, 
		"type" : "text/x-moz-place", 
		"url" : "https://jestjs.io/docs/ru/getting-started", 
		"title" : "Jest 23.3", 
		icon : "https://jestjs.io/img/favicon/favicon.ico",
		announce: "system of JavaScript testing",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	}//,
	//{ 
		//"typeCode" : 2, 
		//"type" : "text/x-moz-place-container", 
		//"title" : "info", 
		//announce: "bookmarks container",
		//dateAdded: "2017-1-29 12:15",
		//lastModified: "2018-6-20 15:56"
	//}
];

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

export default bookmarksArray;
