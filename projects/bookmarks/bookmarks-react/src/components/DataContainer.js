import React, { Component } from 'react';

//type: "text/x-moz-place-container"
//typeCode: 2

//type: "text/x-moz-place"
//typeCode: 1
//uri: "http://192.168.0.1/"

var _bookmarksArray = [
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
	},
	{ 
		"typeCode" : 2, 
		"type" : "text/x-moz-place-container", 
		"title" : "info", 
		announce: "bookmarks container",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	}
];

/*
class DataContainer extends Component {
	
	constructor( props ){
		super( props );
		this.state = {
			bookmarks: _bookmarksArray
		};
	};//end constructor
	
	render(){
		return;
	}
	
}//end class
*/

export default _bookmarksArray;