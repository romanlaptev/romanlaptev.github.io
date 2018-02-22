//var path = require('path');
var express = require("express");
var fs = require('fs');

var app = express();
//app.use( express.static(path.join(__dirname, 'public')));
app.use( express.static(__dirname + '/public') );

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
	
	html += "<ul class='list-unstyled'>\r\n";
	html += "<li><a class='btn btn-large btn-primary' href='/test'>load local text file</a></li>\r\n";
	html += "</ul>\r\n";
	
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

app.get("/test", function(req, res){
console.log("request to the " + req.originalUrl);
//console.log(req);
//console.log(res);
	var localFile = fs.readFileSync("nb.txt");
	res.end(localFile);
});

app.listen(3000, function(){
console.log('Example app listening on port 3000!');
});