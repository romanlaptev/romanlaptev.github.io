var http_port = 3000;
var http = require("http");
var htutil = require("./htutil");

var server = http.createServer(function(req, res){
	htutil.loadParams( req, res, undefined);

	var loaded = false;

	if( req.requrl.pathname === "/"){
		require("./home-node").get( req, res);
		loaded = true;
	}

	if( req.requrl.pathname === "/square"){
		require("./square-node").get( req, res);
		loaded = true;
	}

	if( req.requrl.pathname === "/factorial"){
		require("./factorial-node").get( req, res);
		loaded = true;
	}

	if( req.requrl.pathname === "/fibonacci"){
		require("./fibo-node").get( req, res);
		loaded = true;
	}

	if( req.requrl.pathname === "/mult"){
		require("./mult-node").get( req, res);
		loaded = true;
	}

	if( !loaded ){
		res.writeHead(404, {"Content-Type" : "text/plain"});
		res.end("<h1>bad URL....." + req.url+"</h1>");
	}

});

server.listen(  http_port, function(){
console.log("Server has been started, port " +  http_port);
});

