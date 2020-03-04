var htutil = require("./htutil");
exports.get = function( req, res){
	res.writeHead( 200, {"Content-Type" : "text/html"});

	var _title = "Math Wizard";
	var _navBar = htutil.navbar();
//console.log( _navBar );

	res.end(
		htutil.page( _title, _navBar, "Choose calculation action")
	);
}
