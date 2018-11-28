//=================================== DRAW methods
var draw = {

	"buildPage": function(opt){
		return _buildPage(opt);
	}

};//end draw
//console.log("storage object:", storage);

function _buildPage( opt ){
console.log("_buildPage()");

	var p = {
		//"nid": null,
		//"templateID" : "tpl-page"
		//"title" : "",
		//content : ""
		"callback": null
	};
	//extend options object
	for(var key in opt ){
		p[key] = opt[key];
	}
console.log(p);

};//end _buildPage()
