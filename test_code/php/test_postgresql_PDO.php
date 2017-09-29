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
	<link rel="stylesheet" href="/css/bootstrap337.min.css">
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1>test PostgreSQL PDO</h1>
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
		</pre>

<?php
$_vars["config"]["dbHost"] = "ec2-184-73-189-190.compute-1.amazonaws.com";
$_vars["config"]["dbPort"] = "5432";
$_vars["config"]["dbUser"] = "aejvwysqgsboeb";
$_vars["config"]["dbPassword"] = "55b5c22131c1d612574edb5dea0b63433293d828ab1f77196f52eb0a849a577c";
$_vars["config"]["dbName"] = "d7c534mf7866o2";

//Port    
//URI    postgres://aejvwysqgsboeb:55b5c22131c1d612574edb5dea0b63433293d828ab1f77196f52eb0a849a577c@ec2-184-73-189-190.compute-1.amazonaws.com:5432/d7c534mf7866o2
//Heroku CLI    heroku pg:psql postgresql-infinite-47776 --app romanlaptev

// $dbopts = parse_url(getenv('DATABASE_URL'));
// $app->register(new Herrera\Pdo\PdoServiceProvider(),
               // array(
                   // 'pdo.dsn' => 'pgsql:dbname='.ltrim($dbopts["path"],'/').';host='.$dbopts["host"] . ';port=' . $dbopts["port"],
                   // 'pdo.username' => $dbopts["user"],
                   // 'pdo.password' => $dbopts["pass"]
               // )
// );

echo PDO::ATTR_DRIVER_NAME;
if (!defined('PDO::ATTR_DRIVER_NAME')) {
	// $PDOstate = "<h1>PDO unavailable</h1>";
} else {
	$PDOstate = "<h1>PDO available</h1>";
	
	$dbHost = $_vars["config"]["dbHost"];
	$dbPort = $_vars["config"]["dbPort"];
	$dbUser = $_vars["config"]["dbUser"];
	$dbPassword = $_vars["config"]["dbPassword"];
	$dbName = $_vars["config"]["dbName"];
	
	//$dsn = "mysql:host={$dbHost};dbname={$dbName}";
	$dsn = "pgsql:dbname='{$dbName}'; host='{$dbHost}'; port='{$dbPort}'";
	
	try{
		$_vars["link"] = new PDO( $dsn, $dbUser, $dbPassword );
echo "Connect!";		
		_testPDO();
		unset ($connection);
	} catch( PDOException $exception ) {
		echo $exception->getMessage();
	}
	
}

function _testPDO(){
	global $_vars;
	
	$connection = $_vars["link"];
	
	$_vars["PDOdrivers"] = $connection->getAvailableDrivers();
// echo "<pre>";	
// print_r($connection->getAvailableDrivers());
// echo "</pre>";

	// $dbName = $_vars["config"]["dbName"];
	
	// $_vars["dbInfo"] = "<ul>";
	// //$coll = $connection->query( "SELECT COLLATION('$dbName')" )->fetchColumn();
	// //echo $coll->fetch(PDO::FETCH_NUM)[0];
	// //echo $coll;
	// //$_vars["dbInfo"] .= "<li>database '$dbName', collation_connection : " . $coll ."</li>";
	
	// $charset = $connection->query("SELECT CHARSET('')")->fetchColumn();
	// $_vars["dbInfo"] .= "<li>Charset : " . $charset ."</li>";
	
	// $_vars["dbInfo"] .= "</ul>";
//----------------------------------------------	

	// $_vars["dbList"] = "";
	// $query = "SHOW DATABASES";
	// $result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	// //$row = $result->fetch( PDO::FETCH_NUM );
	// //$totRows = $stmt->rowCount();
	// $rows  = $result->fetchAll( PDO::FETCH_NUM );
// // echo "<pre>";	
// // print_r($rows);
// // echo "</pre>";	
	// for( $n = 0; $n < count($rows); $n++){
		// $_vars["dbList"] .= "<li>" . $rows[$n][0] ."</li>";
	// }//next
	
//----------------------------------------------	
	
	$_vars["dbVersion"] = "";
	$query = "SELECT version()";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	$row = $result->fetch( PDO::FETCH_NUM );
	$_vars["dbVersion"] .= $row[0];
	
	$rows  = $result->fetchAll( PDO::FETCH_ASSOC );
echo "<pre>";	
print_r($rows);
echo "</pre>";	
//----------------------------------------------

	$_vars["dbVars"] = "";

	
	$query = "SELECT * FROM PG_SETTINGS";
	$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
	$rows  = $result->fetchAll( PDO::FETCH_ASSOC );
//echo count($rows);	
/*
            [name] => allow_system_table_mods
            [setting] => off
            [unit] => 
            [category] => Developer Options
            [short_desc] => Allows modifications of the structure of system tables.
            [extra_desc] => 
            [context] => postmaster
            [vartype] => bool
            [source] => default
*/
	$vars = "";
	for( $n = 0; $n < count($rows); $n++){
		$name = $rows[$n]["name"];
		$value = $rows[$n]["setting"];
		$cat = $rows[$n]["category"];
		$shDesc = $rows[$n]["short_desc"];
		$item = "<b>Category</b>: ".$cat.", <b>name</b>: ".$name." = " .$value. ", <small>".$shDesc."</small>";

		$vars .= "<li>".$item. "</li>";
	}//next	
	$_vars["dbVars"] = "<ul>".$vars."</ul>";
	
return;	
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
			<h3>PDOdrivers</h3>
<pre>
<?php print_r( $_vars["PDOdrivers"] ); ?>		
</pre>
		</div>
		
		<div class="panel-body">
			<h3> Connect to <?php echo $_vars["config"]["dbHost"] ?></h3>
		</div>
<!--		
		<div class="panel-body">
			db info:<?php //echo $_vars["dbInfo"]; ?>
		</div>  
		<div class="panel-body">
			<b>Database list</b>: <?php //echo $_vars["dbList"]; ?>
		</div>  
-->

		<div class="panel-body">
			<b>SELECT VERSION():</b> <?php //echo $_vars["dbVersion"]; ?>
		</div>  
		<div class="panel-body">
			<b>DB VARIABLES:</b><?php echo $_vars["dbVars"]; ?>
		</div>  
		
	</div>
		
</div><!-- end container -->
</body>
</html>