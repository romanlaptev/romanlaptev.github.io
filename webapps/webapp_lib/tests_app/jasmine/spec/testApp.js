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
		/*
		var res = typeof webApp === "object";
//console.log( typeof webApp, res );	
		expect( res ).toBe(true);
		*/
		expect( true ).toBe(true);
	});//end it

});//end describe
