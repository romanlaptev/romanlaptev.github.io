<?php
//ajax query with url http://graphic-art-collection.16mb.com/php/test_mysql.php
//header('Access-Control-Allow-Origin: *');

//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r ($_REQUEST);
//echo "</pre>";
$_vars=array();

?>
<DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, inital-scale=1.0">
	<link rel="stylesheet" href="/css/bootstrap335.min.css">
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1>test MYSQL PDO</h1>
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
http://php.net/manual/ru/ref.pdo-mysql.php
https://nix-tips.ru/php-pdo-rabotaem-s-bazami-dannyx-pravilno.html
https://stackoverflow.com/questions/36073703/mysql-to-pdo-comparison-table
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

$_vars["config"]["dbHost"] = "localhost";
$_vars["config"]["dbUser"] = "root";
$_vars["config"]["dbPassword"] = "master";
$_vars["config"]["dbName"] = "mysql";

//graphic-art-collection.16mb.com
// $host = "mysql.hostinger.ru";
// $user = "u380901270_usr";
// $password = "E6bAsZYBs4";
// $db_name = "u380901270_db1";

//echo PDO::ATTR_DRIVER_NAME;
if (!defined('PDO::ATTR_DRIVER_NAME')) {
	$PDOstate = "<h1>PDO unavailable</h1>";
} else {
	$PDOstate = "PDO available";
	
	$dbHost = $_vars["config"]["dbHost"];
	$dbUser = $_vars["config"]["dbUser"];
	$dbPassword = $_vars["config"]["dbPassword"];
	$dbName = $_vars["config"]["dbName"];
	
	$dsn = "mysql:host={$dbHost};dbname={$dbName}";
	try{
		$_vars["link"] = new PDO( $dsn, $dbUser, $dbPassword );
		_testPDO();
		unset ($connection);
	} catch( PDOException $exception ) {
		echo $exception->getMessage();
	}
	
}
/*

MySQL_ way:
$result = mysql_query( $query, [$dbh] ) or die( mysql_error() );
$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
----------

MySQL_ way:
$row = mysql_fetch_row( $result );

PDO way:
$row = $result->fetch( PDO::FETCH_NUM );

PDO::FETCH_ASSOC     Associative array
PDO::FETCH_BOTH      Array indexed by both numeric and associative keys (default)
PDO::FETCH_BOUND     Boolean TRUE (and assigns columns values to variables to which  
                     they were bound with the PDOStatement::bindColumn() method)
PDO::FETCH_LAZY      combines PDO::FETCH_BOTH and PDO::FETCH_OBJ
PDO::FETCH_NAMED     same form as PDO::FETCH_ASSOC, but if there are multiple columns 
                     with same name, the value referred to by that key will be an 
                     array of all the values in the row that had that column name
PDO::FETCH_NUM       Enumerated array
PDO::FETCH_OBJ       Anonymous object with column names as property names
---------

$result   = $connection->query( $query, PDO::FETCH_OBJ ) or die( $connection->errorInfo()[2] );
------------
MySQL_ way:

$totRows = mysql_num_rows( $result );
$totRows = affected_rows( $result );

PDO way:

$totRows = $stmt->rowCount();
-------------
MySQL_ way:

$row   = mysql_result( $result, $numRow );
$field = mysql_result( $result, $numRow, $numField );

PDO way:

$rows  = $stmt->fetchAll( FETCH_NUM );
$row   = $rows[ $numRow ];
$field = $rows[ $numRow ][ $numField ];
------------
MySQL_ way:

$result    = mysql_list_tables( $dbName );
$tableName = mysql_tablename( $result, $tableNum );

PDO way:
$stmt      = $dbh->query( "SHOW TABLES FROM test" )->fetchAll(PDO::FETCH_NUM);
$tableName = $stmt[1][0];

*/

function _testPDO(){
	global $_vars;
	
	$connection = $_vars["link"];
	$dbName = $_vars["config"]["dbName"];
	
	$_vars["dbInfo"] = "<ul>";
	//$coll = $connection->query( "SELECT COLLATION('$dbName')" )->fetchColumn();
	//echo $coll->fetch(PDO::FETCH_NUM)[0];
	//echo $coll;
	//$_vars["dbInfo"] .= "<li>database '$dbName', collation_connection : " . $coll ."</li>";
	
	$charset = $connection->query("SELECT CHARSET('')")->fetchColumn();
	$_vars["dbInfo"] .= "<li>Charset : " . $charset ."</li>";
	
	$_vars["dbInfo"] .= "</ul>";
//----------------------------------------------	

	$_vars["dbList"] = "";
	$query = "SHOW DATABASES";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	//$row = $result->fetch( PDO::FETCH_NUM );
	//$totRows = $stmt->rowCount();
	$rows  = $result->fetchAll( PDO::FETCH_NUM );
// echo "<pre>";	
// print_r($rows);
// echo "</pre>";	
	for( $n = 0; $n < count($rows); $n++){
		$_vars["dbList"] .= "<li>" . $rows[$n][0] ."</li>";
	}//next
//----------------------------------------------	
	
	$_vars["dbVersion"] = "";
	$query = "SELECT VERSION()";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	$row = $result->fetch( PDO::FETCH_NUM );
	$_vars["dbVersion"] .= $row[0];
//----------------------------------------------

	$_vars["dbVars"] = "";
	$query = "SHOW VARIABLES";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	$rows  = $result->fetchAll( PDO::FETCH_ASSOC );
//echo count($rows);	
	$vars = "";
	for( $n = 0; $n < count($rows); $n++){
		$name = $rows[$n]["Variable_name"];
		$value = $rows[$n]["Value"];
		$item = $name." = " .$value;
		
		if ($name == "character_set_system"){
			$item = "<p class='mark'>DEFAULT CHARSET, <b>".$name."</b> : ".$value."</p>";
		}
		// if ($name == "table_type"){
			// $item = "<p class='mark'>ENGINE, <b>".$name."</b> : ".$value."</p>";
		// }
		
		if ($name == "storage_engine"){
			$item = "<p class='mark'>ENGINE, <b>".$name."</b> : ".$value."</p>";
		}

		$vars .= "<li>".$item. "</li>";
	}//next	
	$_vars["dbVars"] = "<ul>".$vars."</ul>";
	
//----------------------------------------------
	$_vars["dbTables"] = "";
	$query = "SHOW TABLES";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	$rows  = $result->fetchAll( PDO::FETCH_NUM );
	for( $n = 0; $n < count($rows); $n++){
		$_vars["dbTables"] .= "<li>" . $rows[$n][0] ."</li>";
	}//next
	
// echo "<pre>";	
// print_r($rows);
// echo "</pre>";	
	
}//end _testPDO()

?>
<div class="panel panel-primary">

	<div class="panel-heading">
		<h2><?php echo $PDOstate; ?></h2>	
	</div>

	<div class="panel-body">
		<h3> Connect to <?php echo $_vars["config"]["dbHost"] ?></h3>
	</div>
	
	<div class="panel-body">
		db info:<?php echo $_vars["dbInfo"]; ?>
	</div>  
	
	<div class="panel-body">
		<b>Database list</b>: <?php echo $_vars["dbList"]; ?>
	</div>  
	
	<div class="panel-body">
		<b>SELECT VERSION():</b> <?php echo $_vars["dbVersion"]; ?>
	</div>  
	
	<div class="panel-body">
		<b>SHOW VARIABLES:</b><?php echo $_vars["dbVars"]; ?>
	</div>  

	<div class="panel-body">
		<b>SHOW TABLES from DB mysql:</b><?php echo $_vars["dbTables"]; ?>
	</div>  
	
</div>
		
</div><!-- end container -->
</body>
</html>