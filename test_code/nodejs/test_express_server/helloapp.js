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
	//res.send( "Hello!" );
});

// POST method route
app.post('/', function (req, res) {
console.log('POST request to the homepage');
//console.log(req);
//console.log(res);
console.log(req.body);
});

//app.get("/css/style.css", function(req, res){
//console.log("request to the /css/style.css");
//res.download("/documents/laptev/www/test/nodejs/test_express/css/style.css");
//res.end();

/*
res.download() 	����������� �������� �����.
res.end() 	���������� �������� ������.
res.json() 	�������� ������ JSON.
res.jsonp() 	�������� ������ JSON � ���������� JSONP.
res.redirect() 	��������������� ������.
res.render() 	����� ������� �������������.
res.send() 	�������� ������ ��������� �����.
res.sendFile 	�������� ����� � ���� ������ �������.
res.sendStatus() 	��������� ���� ��������� ������ � �������� ������������� � ���� ������ � �������� ���� ������.
*/
//});

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