<pre>
<?php
	$file="sqlite:./places.sqlite";
	$db = new PDO($file) or die("Could not open database");

/*
 * List tables in this database
 */
	$query = "SELECT * FROM sqlite_master WHERE type='table';";
	$result = $db->query($query);
	$result->setFetchMode(PDO::FETCH_ASSOC);

	foreach ($result as $row )
	{
		print_r($row);
	}


/*
 * List all links I have visited in visit count order.
 */
	$query = "SELECT p.url,p.title,p.visit_count FROM moz_places as p ORDER BY p.visit_count;";
	$result = $db->query($query);
	$result->setFetchMode(PDO::FETCH_ASSOC);

	foreach ($result as $row )
	{
		print_r($row);
	}

/*
 * List 
 */
//$query = "SELECT b.* FROM moz_bookmarks as b;";

?>
</pre>