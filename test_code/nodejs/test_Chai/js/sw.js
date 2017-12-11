// Start with a webdriver instance:
var sw = require('selenium-webdriver');
console.log( sw );

/*
Browser:
 { ANDROID: 'android',
   CHROME: 'chrome',
   EDGE: 'MicrosoftEdge',
   FIREFOX: 'firefox',
   IE: 'internet explorer',
   INTERNET_EXPLORER: 'internet explorer',
   IPAD: 'iPad',
   IPHONE: 'iPhone',
   OPERA: 'opera',
   PHANTOM_JS: 'phantomjs',
   SAFARI: 'safari',
   HTMLUNIT: 'htmlunit' },
*/
var driver = new sw.Builder()
  .withCapabilities(
	//sw.Capabilities.chrome()
	sw.Capabilities.firefox()
	//sw.Capabilities.ie()
).build();

// And then...
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

driver.get("https://github.com/login");
//chai.expect('#site-container h1.heading').dom.to.not.contain.text("I'm a kitty!");	
driver.findElement( sw.By.name("login")).sendKeys("romanlaptev");
driver.findElement( sw.By.name("password")).sendKeys("*******");
driver.findElement( sw.By.name("commit")).click();

/*
driver.get('http://chaijs.com/');
expect('nav h1').dom.to.contain.text('Chai');
expect('#node .button').dom.to.have.style('float', 'left');
*/