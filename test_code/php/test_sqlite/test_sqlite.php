<?php
//header('Access-Control-Allow-Origin: *');
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

	// //$db = new SQLite3("test.db");
// if ($db = sqlite_open('db1.db', 0666, $sqliteerror)){ 
	// sqlite_query($db, 'CREATE TABLE notes (author varchar(20))');
	// sqlite_query($db, "INSERT INTO author VALUES ('test')");
	// $result = sqlite_query($db, 'select * from notes');
// echo "<pre>";
// print_r (sqlite_fetch_array($result));
// echo "</pre>";
// } else {
	// echo "failed to open/create the database"; 
	// die($sqliteerror);
// }

	
$_vars=array();
$_vars["config"]["tableName"] = "notes";

$_vars["sql"]["createTable"] = "CREATE TABLE IF NOT EXISTS `".$_vars["config"]["tableName"]."` (
`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
`author` VARCHAR NOT NULL,
`title` VARCHAR DEFAULT 'no title',
`text_message` text NOT NULL,
`client_date` DATETIME NULL,
`server_date` DATETIME NULL,
`ip` VARCHAR
);";

$sqlite_path = "sqlite:./db1.sqlite";
//$db = new PDO($sqlite_path) or die("Could not open database");
$query = $_vars["sql"]["createTable"];
$tableName = $_vars["config"]["tableName"];

try {
	
	$db = new PDO($sqlite_path);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->query($query);
	$msg_success = "$tableName created succesfully, ". "SQL: " . $query;
	echo $msg_success;
	
} catch (Exception $e) {
echo "<pre>";
print_r ($e);
echo "</pre>";
	exit();
}
?>