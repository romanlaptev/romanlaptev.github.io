<pre>
<?php
//header('Access-Control-Allow-Origin: *');
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

	$sqlite_path = "sqlite:./places.sqlite";
	//$sqlite_path = "sqlite:/home/www/sites/lib/cms/db/lib.sqlite";
	$db = new PDO($sqlite_path) or die("Could not open database");

	//List tables in this database
	$query = "SELECT * FROM sqlite_master WHERE type='table';";
	//$query = "SELECT * FROM node;";
	$result = $db->query($query);
	
	//$result->setFetchMode(PDO::FETCH_ASSOC);
	$result->setFetchMode(PDO::FETCH_OBJ);

	foreach ($result as $row )
	{
		print_r($row);
	}

/* List all links I have visited in visit count order. */
	$query = "SELECT p.url,p.title,p.visit_count FROM moz_places as p ORDER BY p.visit_count;";
	$result = $db->query($query);
	$result->setFetchMode(PDO::FETCH_ASSOC);

	foreach ($result as $row )
	{
		print_r($row);
	}

/* List  */
//$query = "SELECT b.* FROM moz_bookmarks as b;";

?>
</pre>