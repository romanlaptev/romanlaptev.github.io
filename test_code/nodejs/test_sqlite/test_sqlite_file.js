//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
//npm install sqlite3 
//node test_sqlite.js

var fs = require("fs");
var dbFile = "./db/testdrive.db";
var xml = "<table>{{records}}</table>";
var xmlRec = "<record>\
<name>{{username}}</name>\
<password>{{pwd}}</password>\
</record>";
var exportFile = "testdrive.xml";

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database( dbFile, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
	console.error(err.message);
	}
	console.log('Connected to the database.');
});


db.serialize(() => {
	
	db.each("SELECT username, password as pwd FROM tbl_user", (err, row) => {
		if (err) {
console.error(err.message);
		}
//console.log( row.username + "\t" + row.pwd );
		xmlRec = xmlRec
		.replace("{{username}}", row.username)
		.replace("{{pwd}}", row.pwd);
	});
	
});

xml = xml.replace("{{records}}", xmlRec);

db.close((err) => {
if (err) {
console.error(err.message);
}
console.log("Close the database connection.");
});


fs.writeFile( exportFile, xml, function(error){
	if (error) {
		throw error; 
	}
console.log("Async write is over. Content file:");

	var fileContent = fs.readFileSync( exportFile, "utf8");
console.log( fileContent ); 

});
