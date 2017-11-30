/**
 * @fileoverview An example WebDriver script.
 *
 * Before running this script, ensure that Mozilla's geckodriver is present on
 * your system PATH: <https://github.com/mozilla/geckodriver/releases>
 *
 * Usage:
 *   // Default behavior
 *   node selenium-webdriver/example/google_search.js
 *
 *   // Target Chrome locally; the chromedriver must be on your PATH
 *   SELENIUM_BROWSER=chrome node selenium-webdriver/example/google_search.js
 *
 *   // Use a local copy of the standalone Selenium server
 *   SELENIUM_SERVER_JAR=/path/to/selenium-server-standalone.jar \
 *     node selenium-webdriver/example/google_search.js
 *
 *   // Target a remote Selenium server
 *   SELENIUM_REMOTE_URL=http://www.example.com:4444/wd/hub \
 *     node selenium-webdriver/example/google_search.js
 */
 
//const {Builder, By, Key, until} = require('..');
var webdriver = require("selenium-webdriver");

//var driver = new Builder()
var driver = new webdriver.Builder()
    .forBrowser("chrome")
    //.forBrowser("firefox")
    //.forBrowser("internet explorer")
    .build();

// driver.get('http://www.google.com/ncr')
    // .then(_ =>
        // driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN))
    // .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
    // .then(_ => driver.quit());

driver.get("http://localhost/www/test/browser_info.html")
	.then(function(){
		driver.findElement( webdriver.By.id("btn1") ).click();
		driver.sleep(3000);
	}).then(
		_ => driver.quit()
	);
	