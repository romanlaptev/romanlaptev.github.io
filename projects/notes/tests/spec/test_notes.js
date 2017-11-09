jasmine.getFixtures().fixturesPath = "html";
var webNotes;

beforeAll(function(){
console.log("beforeAll !!!!");
});

afterAll(function(){
console.log("afterAll !!!!");				
});

describe("check DOM elements", function(){
	
	beforeEach(function(){
//console.log("beforeEach !!!!");				
	  loadFixtures("notes.html");
	});
	
	afterEach(function(){
//console.log("afterEach !!!!");				
	});
			
	it("test 1, check #messages", function(){
		//expect( "Roman" ).toEqual("Roman");
		//expect(true).toBe(true);
// top
// num-notes
// control-btn
// log

// overlay 
// wait-window 

// importModal 
// import-form

// editModal 
// message-edit-form

// newModal 
// message-form
		expect( $("#messages") ).toBeInDOM();
		expect( $("#tpl-message-list") ).toBeInDOM();
		
	});//end it
	
});//end describe

describe("check object vars", function(){
	
	beforeEach(function(){
		loadFixtures("notes.html");
		webNotes = _notes();
		//spyOn( webNotes, "init");
		spyOn( webNotes.testing, "defineEvents").and.callFake( function(){
console.log("defineEvents(), callFake");
		});
		spyOn( webNotes.testing, "testServer" ).and.callFake( function(){
console.log("testServer(), callFake");
		});
	});
	
	afterEach(function(){
//console.log("afterEach !!!!");				
		// _kdd.getKodifHash.calls.reset();
		// _w.wait.calls.reset();
		// _kdd.getCatalog.calls.reset();
		// _m.closeTooltips.calls.reset();
		// jasmine.clock().uninstall();
	});

	it("test 2", function(){
		
		webNotes.init();
console.log( webNotes );	
		
		var res = typeof webNotes.vars["templates"] !== "undefined";
console.log( typeof webNotes.vars["templates"], res );	
		expect( res ).toBe(true);
		
	});//end it
	
});//end describe
