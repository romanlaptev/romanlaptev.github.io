//npm install request
var _req = require("request");

var url = "http://localhost/sites";
_req( url, function( err, response, body){
	if(err){
		throw err;
	}
console.log(err);
console.log(response.headers);
console.log(body);
});

