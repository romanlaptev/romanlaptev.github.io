<?php
//header('Access-Control-Allow-Origin: *');
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

	//$db = new SQLite3("test.db");
if ($db = sqlite_open('db1.db', 0666, $sqliteerror)){ 
	sqlite_query($db, 'CREATE TABLE notes (author varchar(20))');
	sqlite_query($db, "INSERT INTO author VALUES ('test')");
	$result = sqlite_query($db, 'select * from notes');
echo "<pre>";
print_r (sqlite_fetch_array($result));
echo "</pre>";
} else {
	echo "failed to open/create the database"; 
	die($sqliteerror);
}
?>