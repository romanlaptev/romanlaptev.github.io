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
	logMsg : "",
	
	//dataUrl : "http://localhost/www/bookmarks/db/bookmarks.json",
	dataUrl : "db/bookmarks.json",
	
	initUrl : "#?q=get-json",
	initContainerName : "bookmarksMenuFolder",
	components:{},//components link
	breadcrumbPath: {
		//"container_2": "Меню закладок",
		//"container_79": "info",
		//"container_24": "blogs, articles",
		//"container_454": "LiveJournal"
	}//,
	
/*	

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
*/	
};//end dataStore
console.log("dataStore: ", dataStore);

//var test=123;
export {dataStore, test};
