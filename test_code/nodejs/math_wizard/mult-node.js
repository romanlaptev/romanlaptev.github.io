var htutil = require("./htutil");

exports.get = function( req, res){
	res.writeHead(200, {"Content-Type" : "text/html"});

	var _title = "Multiplication";
	var _navBar = htutil.navbar();

	var _resultHtml = "";
	if( !isNaN( req.a) && !isNaN( req.b ) ){
		var result = req.a * req.b;
		_resultHtml = "<p class='result'>{a} * {b} = {result}</p>"
.replace("{a}", req.a)
.replace("{b}", req.b)
.replace("{result}", result);
	}

	var _content = [
"<form name='form_mult' action='/mult' method='GET'>", 
"<h3>Enter numbers to multiply:</h3>", 
"<label>A:<input class='form-control' type='text' name='a' /></label>", 
"<label>B: <input class='form-control' type='text' name='b' /></label>", 
"<input type='submit' value='Calc' />", 
"</form>", 
_resultHtml, 
].join("\n");

//console.log( _content );

	res.end(
		htutil.page( _title, _navBar, _content )
	);
};

