var path = require('path');
var express = require("express");
//console.log(express.request.ip);
/*
 is: [Function: is],
 protocol: [Getter],
 secure: [Getter],
 ip: [Getter],
 ips: [Getter],
 subdomains: [Getter],
 path: [Getter],
 hostname: [Getter],
 host: [Getter],
 fresh: [Getter],
 stale: [Getter],
 xhr: [Getter] }
*/

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

console.log("__dirname: " + __dirname);

app.all("/", function (req, res, next) {
console.log("Request...");
	next(); // pass control to the next handler
});

// GET method route
app.get("/", function( req, res ){
console.log('GET request to the homepage');
//console.log(req);
//console.log(res);
	var html = "<!DOCTYPE html>\r\n<html>\r\n";

	html += "<head>\r\n";
	html += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>\r\n";
	html += "<link rel='stylesheet' href='/css/style.css'>\r\n";
	html += "<link rel='stylesheet' href='/style_public.css'>\r\n";
	
	html += "</head>\r\n";
	
	html += "<body>\r\n";
	html += "<div class='container'>\r\n";
	
	html += "<h1>Hello Express!!!</h1>\r\n";
	
	html += "<pre>\r\n";
	html += "http://expressjs.com/ru/guide/routing.html\r\n";
	html += "</pre>\r\n";
	
	html += "<h3>test post request</h3>\r\n";
	html += "<form method='POST' name='form1' action=''>";
	html += "<input type='text' name='field1'>";
	html += "<input type='submit'>";
	html += "</form>\r\n";
	
	html += "</div>\r\n";
	html += "</body>\r\n";
	html += "</html>";
	
	res.send( html );
});

// POST method route
app.post('/', function (req, res) {
console.log('POST request to the homepage');
//console.log(req);
//console.log(res);
res.end();
});

app.get("/css/style.css", function(req, res){
console.log("request to the /css/style.css");
//res.download("/documents/laptev/www/test/nodejs/test_express/css/style.css");
res.end();

/*
res.download() 	Приглашение загрузки файла.
res.end() 	Завершение процесса ответа.
res.json() 	Отправка ответа JSON.
res.jsonp() 	Отправка ответа JSON с поддержкой JSONP.
res.redirect() 	Перенаправление ответа.
res.render() 	Вывод шаблона представления.
res.send() 	Отправка ответа различных типов.
res.sendFile 	Отправка файла в виде потока октетов.
res.sendStatus() 	Установка кода состояния ответа и отправка представления в виде строки в качестве тела ответа.
*/
});


app.listen(3000, function(){
console.log('Example app listening on port 3000!');
});