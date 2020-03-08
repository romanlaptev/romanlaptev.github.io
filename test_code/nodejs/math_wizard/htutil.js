var url = require("url");

exports.loadParams = function( req, res, next){
	req.requrl = url.parse( req.url, true);

	//req.a = ( req.requrl.query.a && !isNaN( req.requrl.query.a) )
		//? new Number ( req.requrl.query.a );	NaN;
	req.a = req.requrl.query.a;

	//req.b = ( req.requrl.query.b && !isNaN( req.requrl.query.b) )
		//? new Number ( req.requrl.query.b );	NaN;
	req.b = req.requrl.query.b;

	//if( next ){
		//next();
	//}
};

exports.navbar = function(){
	return [
"<ul class='nav nav-tabs'>",
"<li><a href='/'>Home</a></li>",
"<li><a href='/mult'>multiplication</a></li>",
"<li><a href='/square'>calc square</a></li>",
"<li><a href='/factorial'>calc factorial</a></li>",
"<li><a href='/fibonacci'>calc Fibonacci</a></li>",
"</ul>"].join("\n");
};

exports.page = function( title, navbar, content){
	return [
"<html>",
"<head>",
"<meta charset='utf-8'/>",
"<meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>",
"<meta name='viewport' content='width=device-width, initial-scale=1.0'/>",
"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>",
"<title>{title}</title>",
"</head>",
"<body>",
"<div class='container'>",
"<div class='page-header'>",
"<h1>{title}</h1>",
"</div>",
"<nav class='navbar'>{navbar}</nav>",
"<div class='panel'>{content}</div>",
"</div>",
"</body>",
"</html>"].join("\n")
.replace( /{title}/g, title)
.replace( /{navbar}/g, navbar)
.replace( /{content}/g, content);
};

