<?php
	//$db = new SQLite3("test.db");

if ($db = sqlite_open('example.db', 0666, $sqliteerror)) 
{ 
	sqlite_query($db, 'CREATE TABLE foo (bar varchar(10))');
	sqlite_query($db, "INSERT INTO foo VALUES ('fnord')");
	$result = sqlite_query($db, 'select bar from foo');
    var_dump(sqlite_fetch_array($result)); 
} 
else 
{
	echo "failed to open/create the database"; 
	die($sqliteerror);
}

?>