var webdriver = require("selenium-webdriver");

// Input capabilities
var capabilities = {
//"browserName" : "chrome",
"browserName" : "firefox",
//"browserName" : "internet explorer",
}
	
var driver = new webdriver.Builder()
.usingServer("http://localhost:4444/wd/hub")
.withCapabilities(capabilities)
.build();

driver.get("http://www.google.com");
driver.findElement(webdriver.By.name("q")).sendKeys("video testing");
//driver.findElement(webdriver.By.name("q")).sendKeys("video testing\n");
//driver.findElement(webdriver.By.name("btnG")).click();
driver.findElement( webdriver.By.id("lst-ib") ).sendKeys( webdriver.Key.ENTER );

driver.getTitle().then(function(title) {
console.log(title);
});

//driver.quit();