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
		//loadFixtures("test.index.html");
	});
			
	it("test 1", function(){
		expect(true).toBe(true);
	});//end it
	
});//end describe