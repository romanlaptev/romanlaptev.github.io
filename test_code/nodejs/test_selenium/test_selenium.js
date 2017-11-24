var webdriver = require("selenium-webdriver");

// Input capabilities
var capabilities = {
"browserName" : "chrome",
}

var driver = new webdriver.Builder().
usingServer("http://localhost:4444/wd/hub").
withCapabilities(capabilities).
build();

driver.get("http://www.google.com");
driver.findElement(webdriver.By.name("q")).sendKeys("video testing");
driver.findElement(webdriver.By.name("btnG")).click();

driver.getTitle().then(function(title) {
console.log(title);
});

//driver.quit();