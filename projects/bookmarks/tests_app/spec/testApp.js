//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "../";
//console.log( jasmine );

describe("test application", function(){
	
	beforeAll(function(){
console.log("beforeAll", arguments);
		//loadFixtures("test.index.html");
		// spyOn( webApp.iDBmodule, "getRecords" ).and.callFake( function(){
// console.log("test method .getRecords(), fake call", arguments);
		// });
		
		//loadFixtures("bookmarks2.html");
		
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

	it("test, checking load DOM objects", function(){
		var res = typeof webApp.vars["pageContainer"] === "object";
		res = webApp.vars["pageContainer"] !== null;
console.log( typeof webApp.vars["pageContainer"], webApp.vars["pageContainer"]);

		// "pageContainer" : getById("content-column"),
		// "insertContainer" : getById("insert-json"),
		// "btnParse" : getById("btn-parse"),
		// "wait" : getById("wait"),
		// "waitWindow" : getById("win1"),

		expect( res ).toBe(true);
	});//end it

	
});//end describe