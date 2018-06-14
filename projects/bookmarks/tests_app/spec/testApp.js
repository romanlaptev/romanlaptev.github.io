//jasmine.getJSONFixtures().fixturesPath = __confFixturesPathJSON;
//jasmine.getFixtures().fixturesPath = "html";
//console.log( jasmine );

/*
describe("test webapp", function(){
	
	beforeAll(function(){
console.log("beforeAll ", arguments);
//console.log( _kd.testing );
	});
	
	beforeEach(function(){
console.log("beforeEach ", arguments);
	});
	
	afterEach(function(){
console.log("afterEach ", arguments);
	});
	
	it("test init application , must be loaded HTML templates into memory.", function(){
		//expect( myName() ).toEqual("Roman");
		expect( true ).toBe(true);
	});
});
*/

describe("test application", function(){
	
	beforeAll(function(){
console.log("beforeAll", arguments);
		//loadFixtures("test.index.html");
		// spyOn( webApp.iDBmodule, "getRecords" ).and.callFake( function(){
// console.log("test method .getRecords(), fake call", arguments);
		// });
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

	// it("test2, checking load DOM objects", function(){
		
		// "pageContainer" : getById("content-column"),
		// "insertContainer" : getById("insert-json"),
		// "btnParse" : getById("btn-parse"),
		// "wait" : getById("wait"),
		// "waitWindow" : getById("win1"),
		
		// // var res = typeof webApp === "object";
// // console.log( typeof webApp, res );	
		// // expect( res ).toBe(true);
	// });//end it
	
});//end describe