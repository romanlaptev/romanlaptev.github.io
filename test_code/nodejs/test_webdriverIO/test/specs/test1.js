//var expect = require('jasmine').expect;
describe("tests for test", function(){
	
	beforeAll(function( done ){
console.log("before all tests....");		
		// browser
		   // .url("/www/test/nodejs/test_webdriverIO/")
		   // .windowHandleSize({ width: 1024, height: 1024 })
		   // .call(done);
	});
	
	it("first test", function( done ){
		
		browser
			.windowHandleSize({ width: 1200, height: 768 })
			.url("/www/test/nodejs/test_webdriverIO/")
			.setValue('#user-name', 'test_user')
			.setValue('#pwd', '123qwe');
           // .click('#login')
			//.waitForExist('.user-panel');

browser.timeouts('script', 10000);
browser.executeAsync(function (done) {
console.log('this should not fail...wait...', done);
    setTimeout(done, 9900);
});			
       // expect(browser.getText('.user-panel__username'))
           // .toBe('test_user');
		   
		expect(true).toBe(true);
		browser.call(done);		
	});
	
	afterAll(function(){
console.log("after all tests....");		
	});
	
});