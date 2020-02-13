var _http = require("http");

_http.createServer( _requestListener ).listen(3000, function(){
console.log("Server has been started.");
console.log(arguments);
});


function _requestListener( req, resp){
//console.log("-- request: ", req);
//console.log("-- response: ", resp);

console.log("Request received.");
	resp.writeHead(200, {"Content-Type": "text/plain"});
	resp.write("Hello World");
	resp.end();
}//end
