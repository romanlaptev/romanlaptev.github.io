var _http = require("http");
var _path = require("path");
var _fs = require("fs");

_http.createServer( _requestListener ).listen(3000, function(){
console.log("Server has been started.");
console.log(arguments);
});


function _requestListener( req, resp){
//console.log("-- request: ", req);
//console.log("-- response: ", resp);

console.log("Request received.");
	//resp.writeHead(200, {"Content-Type": "text/plain"});
	//resp.writeHead(200, {"Content-Type": "text/html"});
	//resp.write("<h1>Hello World</h1>");
	
console.log( req.url );
	if( req.url === "/"){
		
		//var _filePath = _path.join( __dirname, "nb.txt");
		var _filePath = "../app.html";
		_fs.readFile( _filePath, function(err, data ){
//console.log("readFile, err:", err);
			if(err){
				throw(err);
			}
			resp.writeHead( 200, {"Content-Type": "text/html"});
			resp.end( data );
			
		});
	}
	
	
	//resp.end("Hello world! !");
	//resp.end();
}//end
