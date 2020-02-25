/*
var http = require("http");
http.createServer(function(request, response) {
   response.writeHead(200, {"Content-Type": "text/plain"});
   response.write("Hello World");
   response.end();
}).listen(8888);
*/
var http = require("http");
var _url = require("url");

http.createServer(onRequest).listen(3000, function(){
console.log("Server has been started.");
});

function onRequest(request, response) {
console.log("Request received.");
   //response.writeHead(200, {"Content-Type": "text/plain"});
	//response.writeHead(200, {"Content-Type": "text/html"});
	response.writeHead(200, {
		"Content-Type": "text/html",
		"Cache-control": "no-cache",
		"Access-Control-Allow-Origin": "*"
	});

	response.write("<ul>");
	response.write("<li><b>URL:</b> " + request.url  + "</li>");
	response.write("<li><b>Request method:</b> " + request.method + "</li>");
	response.write("</ul>");

//-------------------------------------------
console.log( request.headers );

	response.write("<h2>Request headers</h2>");
	response.write("<ul>");
	response.write("<li><b>request.headers.host:</b> " + request.headers.host  + "</li>");
	response.write("<li><b>request.headers['user-agent']:</b> " + request.headers['user-agent']  + "</li>");
	response.write("<li><b>request.headers.accept:</b> " + request.headers.accept  + "</li>");
	response.write("<li><b>request.headers['accept-language']:</b> " + request.headers['accept-language']  + "</li>");
	response.write("<li><b>request.headers['accept-encoding']:</b> " + request.headers['accept-encoding']  + "</li>");
	response.write("<li><b>request.headers,connection:</b> " + request.headers.connection  + "</li>");
	response.write("</ul>");


	response.write("<h2>Response headers</h2>");
console.log( typeof response["_header"] );
/*
HTTP/1.1 200 OK
Content-Type: text/html
Date: Sat, 22 Feb 2020 01:04:31 GMT
Connection: keep-alive
Transfer-Encoding: chunked
*/
	response.write("<li>" + response["_header"] +"</li>");

//------------------------------------------- http://localhost:3000/echo?message=Hello
	var urlParsed = _url.parse( request.url, true);
console.log( urlParsed );

	if( urlParsed.pathname === "/echo" && urlParsed.query.message ){
		//response.setHeader( "Cache-control", "no-cache" );
		//response.setHeader( "Access-Control-Allow-Origin", "*" );
		response.end( urlParsed.query.message );
	} else {
		response.end();
	}

}//end onRequest()



