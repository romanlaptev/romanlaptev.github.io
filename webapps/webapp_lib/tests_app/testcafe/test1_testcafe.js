import { Selector } from 'testcafe';
fixture `Getting Started`
	.page `../index.html`
	.before( async t => {
console.log("- fixture initialization code...");
	})
	.after( async t => {
console.log("- fixture finalization code...");
	});
	
test('My first test', async t => {
/*	
    await t
		.typeText('#developer-name', 'John Smith')
		.click('#submit-button')
		
		// Use the assertion to check if the actual header text is equal to the expected one
		.expect(Selector("#article-header").innerText).eql("Thank you, John Smith!");
		
		var test = Selector("#article-header").exists;
console.log( "#article-header exists..." );
		
		const articleHeader = await Selector('.result-content').find('h1');
		// Obtain the text of the article header
		let headerText = await articleHeader.innerText;
console.log( headerText );
*/
		const element = Selector("#sitename-block");
		var test1 = await element.exists;
console.log("#sitename-block.exists:", test1);		

		var test2 = await element.visible;
console.log("#sitename-block.visible:", test2);		

		//if( await element.exists && await element.visible ){
			//await t.typeText(element, "Peter Parker");
		//}
		
		var result = test1 && test2;
		await t.expect( result ).eql(true);
	})
	
	.before( async t => {
console.log("- before method...");
	})
	
	.after( async t => {
console.log("- after method...");
	});
