//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
//npm install sqlite3 
//node test_sqlite.js

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./db/testdrive.db", sqlite3.OPEN_READONLY, (err) => {
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
console.log( row.username + "\t" + row.pwd );
	});
	
});

db.close((err) => {
if (err) {
console.error(err.message);
}
console.log('Close the database connection.');
});
