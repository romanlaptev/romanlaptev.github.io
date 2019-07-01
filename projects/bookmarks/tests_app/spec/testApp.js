//console.log( jasmine );
//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "../";
jasmine.getFixtures().fixturesPath = "html";
//webApp.vars["data_url"] = "../db/bookmarks.json";



describe("test application", function(){
	
	beforeAll(function(){
console.log("beforeAll", arguments);
		//loadFixtures("test.index.html");
		// spyOn( webApp.iDBmodule, "getRecords" ).and.callFake( function(){
// console.log("test method .getRecords(), fake call", arguments);
		// });
		
//Start webApp
//_runApp();
		//$("#test-html").load("../bookmarks2.html #content-column");
	});

	beforeEach(function(){
console.log("beforeEach", arguments);
	});
	
	afterEach(function(){
console.log("afterEach", arguments);
	});
	
	it("test1, creating webApp object", function(){
		var res = typeof webApp === "object";
//console.log( typeof webApp, res );	
		expect( res ).toBe(true);
	});//end it

	it("test2, checking webApp.vars objects", function(){
		var res = typeof webApp.vars === "object";
console.log( typeof webApp.vars, res );	
		expect( res ).toBe(true);
	});//end it

	it("test, checking load templates", function(){
		var res = typeof webApp.vars["templates"] === "object";
		
		res = typeof webApp.vars["templates"]["container_tpl"] === "string";
		res = webApp.vars["templates"]["container_tpl"].length > 0;
		
		res = typeof webApp.vars["templates"]["folder_tpl"] === "string";
		res = webApp.vars["templates"]["folder_tpl"].length > 0;
		
		res = typeof webApp.vars["templates"]["link_tpl"] === "string";
		res = webApp.vars["templates"]["link_tpl"].length > 0;
		
		res = typeof webApp.vars["templates"]["annos_tpl"] === "string";
		res = webApp.vars["templates"]["annos_tpl"].length > 0;
		
		res = typeof webApp.vars["templates"]["iconuri_tpl"] === "string";
		res = webApp.vars["templates"]["iconuri_tpl"].length > 0;
		
		res = typeof webApp.vars["templates"]["tooltip_tpl"] === "string";
		res = webApp.vars["templates"]["tooltip_tpl"].length > 0;
		
		expect( res ).toBe(true);
	});//end it

});//end describe


describe("test2", function(){
	
	beforeEach(function(){
console.log("beforeEach", arguments);
		loadFixtures("test.bookmarks2.html");
	});

	it("checking load DOM objects", function(){
//console.log( $("#content-column"), webApp.vars );

		
//---------------------
		var id = "content-column";
		webApp.vars["pageContainer"] = getById(id);
		//webApp.vars["pageContainer"] = "00000000";

		var condition1 = typeof webApp.vars["pageContainer"] === "object";
//console.log( condition1 );

		if( condition1 ){
			var condition2 = webApp.vars["pageContainer"].outerHTML.length > 0;
//console.log( condition2 );
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		var id = "insert-json";
		var prop = "insertContainer";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
//console.log( condition1 );

		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
//console.log( condition2 );
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		var id = "btn-parse";
		var prop = "btnParse";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
//console.log( condition1 );

		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
//console.log( condition2 );
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		var id = "wait";
		var prop = "wait";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
//console.log( condition1 );

		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
//console.log( condition2 );
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		var id = "win1";
		var prop = "waitWindow";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
//console.log( condition1 );

		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
//console.log( condition2 );
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		var id = "log";
		prop = "log";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);
//--------------------- 

		var id = "user-data-file";
		var prop = "userDataFile";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
		if( condition1 ){
		var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);
//---------------------

		var id = "user-data-url";
		var prop = "userDataUrl";
		webApp.vars[ prop ] = getById(id);

		var condition1 = typeof webApp.vars[ prop ] === "object";
		if( condition1 ){
			var condition2 = webApp.vars[ prop ].outerHTML.length > 0;
		}

		var res = condition1 && condition2;
console.log("Load #" +id+ " : " + res);		
//---------------------

		expect( res ).toBe(true);
	});//end it
	
});//end describe


describe("test3", function(){
	
	it("check method 'urlManager', must be defined as function.", function(){
//console.log( $("#content-column"), webApp.vars );

		//webApp.app.urlManager = "000";
		
		//expect(window.document).toBeDefined();
    	var res = typeof webApp.app.urlManager === "function";
		expect( res ).toBe(true);
	});//end it
	
});//end describe
