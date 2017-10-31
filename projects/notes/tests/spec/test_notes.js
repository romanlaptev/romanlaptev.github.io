jasmine.getFixtures().fixturesPath = "html";

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
//console.log("beforeEach !!!!");				

		loadFixtures("notes.html");

		// spyOn(_m, "closeTooltips");
		// spyOn(_w, "wait").and.callFake(function(obj){
// console.log("Spy callback for wait function !!!!", obj );				
				// _waitObj=obj;
		// });
		
		// _kdd.getCatalog=jasmine.createSpy().and.callFake(function(obj){
			// var $df = $.Deferred();
			
			// $df.resolve([{kod:"1", text:"text_1", text_t:"text_1"}, {kod:"2", text:"text_2", text_t:"text_2"}]);
			// return $df;
		// });
		// jasmine.clock().install();
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
		var webNotes = _notes();
		//webNotes.init();
		
		var res = typeof webNotes.vars["templates"] !== "undefined";
console.log( typeof webNotes.vars["templates"], res );	
		expect( res ).toBe(true);
		
	});//end it
	
});//end describe