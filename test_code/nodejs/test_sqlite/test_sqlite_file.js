//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
//http://www.sqlitetutorial.net/sqlite-nodejs/query/
//npm install sqlite3 
//node test_sqlite.js

var fs = require("fs");

_vars = {
	"dbFile" : "./db/testdrive.db",
	
	"xml" : "<table>\r\n\{{records}}\</table>",
	"xmlRecTpl" : "\t<record>\r\n\
\t\t<name>{{username}}</name>\r\n\t\t<password>{{pwd}}</password>\r\n\
\t</record>\r\n",

	"exportFile" : "testdrive.xml",
	"sql" : "SELECT username, password as pwd FROM tbl_user"
	
};//end _vars{}

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database( _vars["dbFile"], sqlite3.OPEN_READONLY, (err) => {
	if (err) {
	console.error(err.message);
	}
console.log('Connected to the database.');
});

//Get data
let params = [];
db.all( _vars["sql"], params, (err, rows) => {
	if (err) {
		throw err;
	}
//console.log( "TEST1", rows );
	_formXML( rows );
});

db.close((err) => {
	if (err) {
	console.error(err.message);
	}
console.log("Close the database connection.");
});

//===================================
function _formXML(rows){
	
	var xmlRecords = "";
	rows.forEach( (row) => {
//console.log( row.username + "\t" + row.pwd );
		xmlRecords += _vars["xmlRecTpl"]
		.replace("{{username}}", row.username)
		.replace("{{pwd}}", row.pwd);
	});
//console.log( "TEST3", xmlRecords, xmlRecords.length );

	_vars["xml"] = _vars["xml"].replace("{{records}}", xmlRecords);
//console.log( _vars["xml"] );

	_saveXML( _vars["exportFile"], _vars["xml"] );
}//end _formXML()


function _saveXML( filepath, xml){
	
	fs.writeFile( filepath, xml, function(error){
		if (error) {
			throw error; 
		}
console.log("Async write is over. Content file:");

		var fileContent = fs.readFileSync( filepath, "utf8");
console.log( fileContent ); 
	});
	
}//end _saveXML()