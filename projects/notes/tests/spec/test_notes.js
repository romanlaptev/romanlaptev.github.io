describe("Testing notes webapp", function(){
	
	beforeEach(function(){
console.log("beforeEach !!!!");				

		//var webNotes = _notes();
//console.log( webNotes );	
		//webNotes.init();

		// loadFixtures("kodif.fields.html");
		// _kd.init();
		// spyOn(_kdd, "getKodifHash").and.returnValue({hashShort:12345678, nomer:123});
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
console.log("afterEach !!!!");				
		// _kdd.getKodifHash.calls.reset();
		// _w.wait.calls.reset();
		// _kdd.getCatalog.calls.reset();
		// _m.closeTooltips.calls.reset();
		// jasmine.clock().uninstall();
	});
			
	it("test1", function(){
		//expect( "Roman" ).toEqual("Roman");
		expect(true).toBe(true);
	});//end it
	
});//end describe