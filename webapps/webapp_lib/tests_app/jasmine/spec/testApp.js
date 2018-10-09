//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "../../";
jasmine.getFixtures().fixturesPath = "html";
//jasmine.getStyleFixtures().fixturesPath = "../../../css";

//===============
/*
var config = {
	"dbName" : "db1",
	"storage_key" : "lib_xml",
	"xml_file" : "../../db/export_lib.xml",
	//"xml_file : "db/test.xml",
	"tpl_file" : "../../tpl/templates.html",

	//"content_location" : "file:///mnt/terra/clouds/0_data",
	"content_location" : "http://site-content",

	//"url_lib_location_dropbox" : "https://dl.dropboxusercontent.com/u/75717183",
	"url_book_location_Mail" : "https://cloclo20.datacloudmail.ru/weblink/view/JSDm/zciANxB6p",
	"url_book_location_Yandex" : "https://docviewer.yandex.ru/?url=ya-disk:///disk/dont_sync",
	"use_localcache" : true,
	"addCopyLink": true,
	"localforagePath": "../../js/vendor/localforage.min.js",
	"clipboardPath": "../../js/vendor/clipboard.min.js"				
};
*/
//===============

describe("check DOM elements", function(){
	
	beforeAll(function(){
//console.log("beforeAll !!!!");				
	});
	
	beforeEach(function(){
//console.log("beforeEach !!!!");				
		loadFixtures("test.index.html");
	});
	
	afterEach(function(){
//console.log("afterEach !!!!");				
	});
			
	it("check AppContainer, #App", function(){
		expect( $("#App") ).toBeInDOM();
	});//end it
	
	it("check Log panel, #log", function(){
		expect( $("#log") ).toBeInDOM();
	});//end it
	
	it("check waitWindow, #win1", function(){
		expect( $("#win1") ).toBeInDOM();
	});//end it
	
	it("check content blocks, #block-taxonomy-alpha, #block-taxonomy, #block-nodes", function(){
		expect( $("#block-taxonomy-alpha") ).toBeInDOM();
		expect( $("#block-taxonomy") ).toBeInDOM();
		expect( $("#block-nodes") ).toBeInDOM();
	});//end it
	
	it("check toggle info block, #info", function(){
		expect( $("#info") ).toBeInDOM();
	});//end it
	
});//end describe


describe("test application", function(){
	
	beforeAll(function(){
//console.log("beforeAll", arguments);
		loadFixtures("test.index.html");
		//loadFixtures("index.html");
	});

	beforeEach(function(){
//console.log("beforeEach", arguments);
	});
	
	afterEach(function(){
//console.log("afterEach", arguments);
	});
	
	it("check creating lib object", function(){
		
		//Start webApp
		var lib = Lib();
console.log("lib:", lib);
		
		var test1 = typeof Lib === "function";
//console.log( "Lib: " + typeof Lib, test1 );	

		var test2 = typeof lib === "object";
//console.log( "lib: " + typeof lib, test2 );	

		var res = test1 && test2;
//console.log( "test result: ", res );	
		
		expect( res ).toBe(true);
	});//end it

	it("checking lib.vars object", function(){
		
		//Start webApp
		var lib = Lib();
//console.log("lib.vars:", lib.vars);
		
		var res = typeof lib.vars === "object";
//console.log( typeof lib.vars, res );	
//console.log( "test2 result: ", res );	

		expect( res ).toBe(true);
	});//end it

});//end describe


describe("test method get_node()", function(){
	
	beforeAll(function(){
//console.log("beforeAll", arguments);
		loadFixtures("test.index.html");
		//loadFixtures("index.html");
	});

	beforeEach(function(){
//console.log("beforeEach", arguments);
	});
	
	afterEach(function(){
//console.log("afterEach", arguments);
	});
	
	it("test empty parameters, must be return FALSE", function(){
		
		//Start webApp
		var lib = Lib();
//console.log("lib.testApi:", lib.testApi);
		
		var res = false;
		var test = lib.testApi.nodesObj.get_node();
//console.log(test);

		if( !test ){
			var res = true;
		};
		
		expect( res ).toBe(true);
		
	});//end it


	it("get node data, must be return object with property 'NID', 'TITLE'", function(){
		
		//Start webApp
		var lib = Lib();
		
		var res = false;
		
		//fake data
		lib.vars["nodes"] = [{
author: "Святослав Логинов",
body_value: "",
book_files: ["Loginov.Sv/loginov_svyatoslav_analitik.fb2.zip"],
book_links: ["https://yadi.sk/d/4M0mxgw8qblbuQ"],
book_url: ["http://site-content/"],
bookname: "Аналитик",
changed: "11-Sep-2018 21:26:39",
created: "11-Sep-2018 21:19:21",
mlid: "2154",
nid: "1752",
plid: "384",
subfolder: "lib/books/L",
termins: [	{tid: "39", name: "художественая литература"},
			{tid: "173", name: "фантастика"},
			{tid: "47", name: "история"},
			{tid: "20", name: "Новелла, рассказ"},
			{tid: "185", name: "fb2"},
			{tid: "139", name: "А"},
			{tid: "150", name: "Л"},
			{tid: "229", name: "СССР"}
		],
tid: ["39", "173", "47", "20", "185", "139", "150", "229"],
title: "Святослав Логинов. Аналитик",
type: "library_book",
weight: "0"
		}];
		
		lib.testApi.nodesObj["x_table_index"] = [];
		
		//try to get node
		var node = lib.testApi.nodesObj.get_node({"nid": "1752"});
console.log("test getting node data ", node, typeof node);
//console.log(node["nid"], node instanceof Array, node instanceof Object);
//node = {};

		if( typeof node === "object"){
			if( node["nid"] && 
				node["nid"] !== "" &&
				node["title"] !== ""
			){
				res = true;
			}
		}

		expect( res ).toBe(true);
	});//end it

});//end describe
