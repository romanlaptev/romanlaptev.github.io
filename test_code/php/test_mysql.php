<?php
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r ($_REQUEST);
//echo "</pre>";

?>

<DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, inital-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1>test MySQL connect...</h1>
		</div>
		
		<div class="panel">
			<div class="panel-body">
				<div>PHP_VERSION:
<?php
//echo phpversion();
echo PHP_VERSION;
?>
				</div>
				<div>PHP_OS:<?php echo PHP_OS;?></div>
			</div>
		<div>
		
		<pre>
http://php.net/manual/ru/function.mysql-db-query.php
http://php.net/manual/ru/mysqli.select-db.php
		</pre>

<?php
//beta.hut2.ru
//$server = "database";
//$username = "beta8";
//$password = "O4AtmRKe";

//catblack.h19.ru
//$server = "localhost";
//$username = "catblac8";
//$password = "master";

//roman-laptev.hut1.ru
//$server = "database.agava.ru";
//$username = "romanla";
//$password = "master";

//catblack.co.cc
//$server = "localhost";
//$username = "user_acc2";
//$password = "master";

//blackcat.px6.ru
//$server = "sql-4.ayola.net";
//$username = "blackcat608";
//$password = "sck7aklskg";
//$base =  "blackcat608";

//$server = "mysql.royaltee.mass.hc.ru:3306";
//$username = "royaltee_rk";
//$password = "kj3f5surn";
//$base =  "wwwroyalkidsru_rk";

//$server = "91.226.93.8:3306";
//$username = "dostup_user";
//$password = "dostup";

//gravura.ts6.ru
//$server = "sql-4.ayola.net";
//$username = "gravura619";
//$password = "sijnic3ra6";

//limb.me.pn
//$server = "fdb2.eu.pn:3306";
//$username = "1032442_db1";
//$password = "gfccword";

//limb.500mb.net
//$server = "sql104.500mb.net";
//$username = "runet_10193869";
//$password="w0rdpass";
//$password = "jocker";
//$db_url = 'mysqli://runet_10193869:jocker@localhost/runet_10193869_db2 ';

//blackcat.500mb.net
//$server="sql302.500mb.net";
//$username="runet_10195192";
//$password="w0rdpass";

//it-works.16mb.com
//$server="mysql.hostinger.ru";
//$username="u131428543_user1";
//$password="m2ster";

// $host = "localhost";
// $user = "fr18091_db1";
// $password = "m@ster";
// $db_name = "fr18091_db1";

$host = "localhost";
$user = "root";
$password = "master";
$db_name = "mysql";

//graphic-art-collection.16mb.com
// $host = "mysql.hostinger.ru";
// $user = "u380901270_usr";
// $password = "E6bAsZYBs4";
// $db_name = "u380901270_db1";

$link = mysql_connect($host, $user, $password) or die( "<b class='text-danger'>Query error: </b>".mysql_error() );

//mysql_query('SET NAMES utf8');
//mysql_set_charset("utf8", $link);

$db_info = "<ul>";
$db_info .= "<li>MySQL server version: " . mysql_get_server_info() ."</li>";
$db_info .= "<li>MySQL client info: " . mysql_get_client_info() ."</li>";
$db_info .= "<li>MySQL host info: " . mysql_get_host_info() ."</li>";
$db_info .= "<li>MySQL protocol version: " . mysql_get_proto_info() ."</li>";
$db_info .= "<li>mysql_client_encoding: " . mysql_client_encoding($link) ."</li>";
$db_info .= "</ul>";

//-----------------------------------------------------------
$list = "<ol>";
$db_list = mysql_list_dbs ($link);
while ($row = mysql_fetch_object($db_list)){
//echo "<pre>";	
//print_r($row);
//echo "</pre>";	
	$list .= "<li>".$row->Database."</li>";
}
$list .= "</ol>";

//-----------------------------------------------------------
	$vars = "";
	
	$sql_query = "SHOW VARIABLES";
	$query = mysql_query($sql_query) or die( "<b class='text-danger'>Query error: </b>".mysql_error() );
	while( $result = mysql_fetch_assoc($query) ){
//echo "<pre>";	
//print_r($result);
//echo "</pre>";	
		$name = $result['Variable_name'];
		$value = $result['Value'];
		$item = $name." = " .$value;
		
		if ($name == "character_set_system"){
			$item = "<p class='mark'>DEFAULT CHARSET, <b>".$name."</b> : ".$value."</p>";
		}
		
		if ($name == "table_type"){
			$item = "<p class='mark'>ENGINE, <b>".$name."</b> : ".$value."</p>";
		}

		$vars .= "<li>".$item. "</li>";
	}// end while
	$list_vars = "<ul>".$vars."</ul>";
	

//-----------------------------------------------------------
	$ver = mysql_query("SELECT VERSION()");
	if($ver){
		$version = mysql_result($ver, 0);
	}

//-----------------------------------------------------------
	$db = mysql_select_db($db_name) or die( "<b class='text-danger'>Query error: </b>".mysql_error() );
	
	$sql = "SHOW TABLES";
	$data = get_db_data( $sql );
	
	$output="<ol>";
	//foreach( $data as $key => $value){
	for( $n = 0; $n < count($data); $n++ ){
		$row = $data[$n];
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$list_fields = show_fields( $row[0] );
		$output .="<li><b>Table</b> ".$row[0].", <b>fields:</b> ". $list_fields."</li>";
	}//next
	
	$output .= "<ol>";
	$test_query = $output;


mysql_close ($link);




function get_db_data( $sql ){
	$data = array();
	$res = mysql_query($sql) or die( "<b class='text-danger'>Query error: </b>".mysql_error() );

	//while ($row = mysql_fetch_array($res,MYSQL_BOTH)){
	//while ($row = mysql_fetch_array($res,MYSQL_ASSOC)){
	//while( $row = mysql_fetch_row($res)){
	//while ($row = mysql_fetch_assoc($res)){
//echo "<pre>";
//print_r($row);
//echo "</pre>";
	//}//end while

// $num_rows = mysql_num_rows($res);
// if ($num_rows > 0){
// } else {
	// echo "<p class='text-danger'>Empty result query ".$query."</p>";
// }
	
	for( $n = 0; $n < mysql_num_rows ($res); $n++){
		//$row = mysql_fetch_object($res);
		$row = mysql_fetch_row($res);
//echo "<pre>";
//print_r ($row);
//echo "</pre>";
		$data[] = $row;
	}//next row
	
	return $data;
}//end get_db_data()


function get_db_data_obj( $sql ){
	$data = array();
	$res = mysql_query($sql) or die( "<b class='text-danger'>Query error: </b>".mysql_error() );

	for( $n = 0; $n < mysql_num_rows ($res); $n++){
		$row = mysql_fetch_object($res);
//echo "<pre>";
//print_r ($row);
//echo "</pre>";
		$data[] = $row;
	}//next row
	
	return $data;
}//end get_db_data_obj()

function show_fields( $table_name ){
	$sql = "SHOW COLUMNS FROM ".$table_name;
	//$sql = "SHOW FIELDS FROM db ";
	$data = get_db_data_obj( $sql );
/*	
	$out="<ol>";
	foreach( $data as $key => $row){
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$out .= "<li><small><ul>";
		foreach( $row as $field_name => $value){
//echo $field_name;			
//echo "<pre>";
//print_r($value);
//echo "</pre>";
			$out .="<li><b>".$field_name."</b> : " .$value. "</l>";
		}//next
		$out .= "</ul></small></li>";
	}//next
	
	$out .= "</ol>";
*/	
	$table_tpl ="<table class='table table-bordered small'><thead><tr class='list-header success'>{{thead}}</tr></thead><tbody>{{records}}</tbody></table>";
	$thead_tpl = "<th>{{column_name}}</th>";
	$record_tpl = "<tr>{{columns}}</tr>";
	$column_tpl = "<td class='list-body'>{{data}}</td>";
	
	$records = "";
	foreach( $data as $key => $row){
		$thead = "";
		$columns = "";
		foreach( $row as $field_name => $value){
			$thead .= str_replace('{{column_name}}', $field_name, $thead_tpl);
			$columns .= str_replace('{{data}}', $value, $column_tpl);
		}//next
		$records .= str_replace('{{columns}}', $columns, $record_tpl);
	}//next
	
	$table = str_replace('{{thead}}', $thead, $table_tpl);
	$table = str_replace('{{records}}', $records, $table);
	
	//$out .= $table;
	
	return $table;
}//end show_fields

/*
function list_fields( $query ){
	
	$result = mysql_query($query);
	$fields = mysql_num_fields ($result);
	$rows   = mysql_num_rows ($result);
	$table = mysql_field_table ($result, $i);
	//echo "<b>"; 
	//echo "Your '".$table."' table has ".$fields." fields and ".$rows." records <br/>";
	//echo "The table has the following fields<br/>"; 
	//echo "</b>"; 
	echo "CREATE TABLE IF NOT EXISTS `".$table."` (";
	echo "<br>";
	$n = 0;
	while ($n < $fields)
		{
			echo "<b>name: </b>".mysql_field_name  ($result, $n)."<br/>";
			echo "<b>type: </b>" .mysql_field_type  ($result, $n)."<br/>";
			echo "<b>len: </b>". mysql_field_len   ($result, $n)."<br/>";
			echo "<b>flags: </b>".mysql_field_flags ($result, $n)."<br/>";

			// echo " `".mysql_field_name  ($result, $n)."` "
// .mysql_field_type  ($result, $n)
// ."(".mysql_field_len ($result, $n).") "
// .mysql_field_flags ($result, $n).",";
			// echo "<br>";

			$n++;
		}

	// $q = mysql_query("SHOW KEYS FROM ".$table." WHERE Key_name = 'PRIMARY'") or die("Ошибка при выполнении запроса: ".mysql_error());
	// $result = mysql_fetch_assoc($q);
	// echo " PRIMARY KEY (`".$result['Column_name']."`)";
	// echo "<br>";


}// end list_fields()
*/

?>
		
<div class="panel panel-primary">
	<div class="panel-heading">
		<h2>test mysql_connect</h2>	
	</div>
	<div class="panel-body">
		<h3> Connect to <?php echo $host ?></h3>
	</div>
	<div class="panel-body">

		db info:<?php echo $db_info; ?>

		<b>Database list (mysql_list_dbs)</b>: <?php echo $list; ?>
	</div>  
	
	<div class="panel-body">
		<b>SELECT VERSION():</b> <?php echo $version; ?>
	</div>  
	
	<div class="panel-body">
		<b>SHOW VARIABLES:</b><?php echo $list_vars; ?>
	</div>  
	
	<div class="panel-body">
		<b>SHOW TABLES from DB mysql:</b><?php echo $test_query; ?>
	</div>  
	
</div>
		
		<pre>
		<h2>test mysqli_connect</h2>
<?
printf("mysqli_get_client_info: %s\n", mysqli_get_client_info());
$link = mysqli_connect( $host, $user, $password, $db_name);
echo $link;


if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

?>
		</pre>
	</div><!-- end container -->
</body>
</html>