var wd = require('selenium-webdriver');
var assert = require('assert');

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
var URL = 'http://www.yandex.ru';

var client = new wd.Builder()
   .usingServer(SELENIUM_HOST)
 //  .withCapabilities({ browserName: 'MicrosoftEdge' })
//   .withCapabilities({ browserName: 'internet explorer' })
   //.withCapabilities({ browserName: 'chrome',  platform: 'VISTA', })
	.withCapabilities({ browserName: 'firefox' })   
   .build();

client.get(URL).then(function() {
    client.findElement({ name: 'text' }).sendKeys('test');
    //client.findElement({ css: '.b-form-button__input' }).click();
    client.findElement({ css: '.button_theme_websearch' }).click();

    client.getTitle().then(function(title) {
		assert.ok(title.indexOf('test — Яндекс: нашлось') > -1, 'Ничего не нашлось :(');
    });

    client.quit();
});


////var client = new wd.Builder().usingServer('http://172.16.1.209:4444/wd/hub').withCapabilities({ browserName: 'chrome',  platform: 'VISTA', }).build()