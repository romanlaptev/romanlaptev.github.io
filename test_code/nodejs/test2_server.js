var _http = require("http");
var _path = require("path");
var _fs = require("fs");
var pid = process.pid;

_http.createServer( _requestListener ).listen(3000, function(){
console.log("Server has been started, process ID:" + pid);
console.log(`-- process ID: ${pid}`);
console.log(arguments);
});


function _requestListener( req, resp){
//console.log("-- request: ", req);
//console.log("-- response: ", resp);
	//resp.writeHead(200, {"Content-Type": "text/plain"});
	//resp.writeHead(200, {"Content-Type": "text/html"});
	//resp.write("<h1>Hello World</h1>");
	
//console.log( req.url );
	//var _filePath = _path.join( __dirname, "nb.txt");
	//var _filePath = "../app.html";
	var _filePath = ".." + req.url;
console.log( _filePath );
	var _ext = _path.extname(_filePath);

	var contentType = "text/html";
	switch ( _ext ) {
		case ".css":
			contentType = "text/css";
		break;
		
		case ".js":
			contentType = "application/javascript";
		break;
		
		case ".json":
			contentType = "application/json";
		break;
		
		case ".xml":
			contentType = "application/xml";
		break;
	
		default:
			contentType = "text/html";
	}//end switch
	
	
	
	_fs.readFile( _filePath, function(err, data ){
console.log("readFile, err:", err);
		if(err){
			resp.writeHead( 404 );
			resp.end("<h1>error....</h1>");
		} else {
			resp.writeHead( 200, {"Content-Type": contentType });
			resp.end( data );
		}
		
	});

	//resp.end("Hello world! !");
	//resp.end();
}//end
