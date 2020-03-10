<?php
function get_tables()
{
	$test_sql = "SHOW TABLES";
	$res = mysql_query( $test_sql ) or die( "<br>". mysql_error().", error in  ".$test_sql );
	while ( $row = mysql_fetch_row($res))
	{
		$list_tables[] = $row;
	}
	return $list_tables;
}

function get_main_category()
{
/*
	$sql="SELECT term_hierarchy.tid, term_data.name, term_data.description from term_hierarchy
LEFT JOIN term_data ON term_data.tid=term_hierarchy.tid
WHERE term_hierarchy.parent=0  AND term_data.vid !=5
ORDER BY term_data.weight LIMIT $start_page, $num_page;";
*/
	$sql="SELECT term_hierarchy.tid, term_data.name, term_data.description from term_hierarchy
LEFT JOIN term_data ON term_data.tid=term_hierarchy.tid
WHERE term_hierarchy.parent=0  AND term_data.vid !=5
ORDER BY term_data.weight;";
	$res = mysql_query( $sql ) or die( "<br>". mysql_error().", error in  ".$test_sql );
	while ( $row = mysql_fetch_assoc($res))
	{
		$category[] = $row;
	}
	return $category;
}
?>
