<?php
//header('Access-Control-Allow-Origin: *');
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r ($_SERVER);
//print_r ($_REQUEST);
//print_r($_FILES);
//echo "</pre>";

$_vars=array();
// $_vars["config"]["dbHost"] = "localhost";
// $_vars["config"]["dbUser"] = "root";
// $_vars["config"]["dbPassword"] = "master";
// $_vars["config"]["dbName"] = "db1";

//https://romanlaptev.herokuapp.com/
$_vars["config"]["dbHost"] = "ec2-184-73-189-190.compute-1.amazonaws.com";
$_vars["config"]["dbPort"] = "5432";
$_vars["config"]["dbUser"] = "aejvwysqgsboeb";
$_vars["config"]["dbPassword"] = "55b5c22131c1d612574edb5dea0b63433293d828ab1f77196f52eb0a849a577c";
$_vars["config"]["dbName"] = "d7c534mf7866o2";

$_vars["log"] = array();

//========================================= connect to server
	//check PDO support
	// if (!defined('PDO::ATTR_DRIVER_NAME')) {
		// $_vars["useMySQL"] = 1;
		// $_vars["usePDO"] = 0;
		// $_vars["link"] = connectDbMySQL();
	// } else {
		//$_vars["useMySQL"] = 0;
		$_vars["usePDO"] = 1;
		
		$_vars["link"] = connectDbPDO();
		
		$connection = $_vars["link"];
		
		$_vars["dbVersion"] = "";
		$query = "SELECT * FROM PG_SETTINGS WHERE name='server_version';";
		$result  = $connection->query( $query ) or die( $connection->errorInfo()[2] );
		$rows  = $result->fetchAll( PDO::FETCH_ASSOC );
// echo "<pre>";	
// print_r($rows);
// echo "</pre>";	
		$_vars["dbInfo"][]["message"] = "database server version: " . $rows[0]["setting"];
	//}
	
	// if($_vars["useMySQL"] == 1){
		// mysql_close ( $_vars["link"] );
	// }
	//if($_vars["usePDO"] == 1){
		unset ($_vars["link"]);
	//}
	
	if ( function_exists("json_encode") ){	//PHP 5 >= 5.2.0
		$json = json_encode($_vars["dbInfo"]);
		echo $json;
	} else {
$msg = "error, not support function json_encode(). incorrect PHP version - ".phpversion().", need PHP >= 5.2.0";
$_vars["log"][] = "{\"error_code\" : \"notSupportJSON\", \"message\" : \""+$msg+"\"}";
	}

	viewLog();
//=========================================== end

//output log in JSON format
function viewLog(){
	global $_vars;
	
	if( count( $_vars["log"] ) > 0){
		 $logStr = "[";
		for( $n = 0; $n < count( $_vars["log"] ); $n++){
			if( $n > 0){
				$logStr .= ", ";
			}
			$logStr .= $_vars["log"][$n];
		}
		$logStr .="]";
		// logStr = logStr.Replace("\\", "&#92;");//replace slash			
		//$logStr = str_replace("`", "&#39", $logStr);//replace apostrophe
		echo $logStr;
	}
}//end viewLog
	
// function connectDbMySQL(){
	// global $_vars;
// // echo "<pre>";
// // print_r($_vars);
// // echo "</pre>";

	// $dbHost = $_vars["config"]["dbHost"];
	// $dbUser = $_vars["config"]["dbUser"];
	// $dbPassword = $_vars["config"]["dbPassword"];
	// $dbName = $_vars["config"]["dbName"];
	
	// try{
		// $link = mysql_connect($dbHost, $dbUser, $dbPassword);
		// if (!$link){
			// throw new Exception('MySQL Connection Database Error: ' . mysql_error());
		// } else{

			// if ( function_exists("mysql_set_charset") ){
				// //function mysql_set_charset() is available since PHP 5.2.3
				// //MySQL => 5.0.7
				// mysql_set_charset("utf8", $link);
			// } else {
// //mysql_query('SET NAMES utf8');
// //mysql_query("SET CHARACTER SET utf8 ");
				// mysql_query ("set character_set_client='utf8'");
				// mysql_query ("set character_set_results='utf8'");
				// mysql_query ("set collation_connection='utf8_general_ci'");
			// }
			
// //SHOW VARIABLES LIKE  'char%'
// //$db_info = "<li>MySQL server info: " . mysql_get_server_info() ."</li>";
// // $db_info .= "<li>MySQL client info: " . mysql_get_client_info() ."</li>";
// // $db_info .= "<li>MySQL host info: " . mysql_get_host_info() ."</li>";
// // $db_info .= "<li>MySQL protocol version: " . mysql_get_proto_info() ."</li>";
// //$db_info .= "<li>mysql_client_encoding: " . mysql_client_encoding($link) ."</li>";
// //echo $db_info;

			// return $link;
		// }
		
	// }catch(Exception $e){
		// //echo "exception: ",  $e->getMessage(), "\n";
		// $_vars["log"][] = "{\"error_code\" : \"connectDBerror\", \"message\" : \"exception: " . $e->getMessage() . "\"}";
		// viewLog();
		// exit();
	// }

// }//end connectDbMySQL()

function connectDbPDO(){
	global $_vars;
// echo "<pre>";
// print_r($_vars);
// echo "</pre>";

	$dbHost = $_vars["config"]["dbHost"];
	$dbPort = $_vars["config"]["dbPort"];
	$dbUser = $_vars["config"]["dbUser"];
	$dbPassword = $_vars["config"]["dbPassword"];
	$dbName = $_vars["config"]["dbName"];
	
	$dsn = "pgsql:dbname='{$dbName}'; host='{$dbHost}'; port='{$dbPort}'";
	try{
		$connection = new PDO( $dsn, $dbUser, $dbPassword );
//echo "Connect!";		
		
		// $query = "set character_set_client='utf8'";
		// $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		
		// $query = "set character_set_results='utf8'";
		// $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		
		// $query = "set collation_connection='utf8_general_ci'";
		// $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		//$_vars["log"][] = "{\"message\" : \"connection estableshed\"}";
		
		return $connection;
	} catch( PDOException $exception ) {
		//echo $exception->getMessage();
		$_vars["log"][] = "{\"error_code\" : \"connectDBerror\", \"message\" : \"" . $exception->getMessage() . "\"}";
		viewLog();
		exit();
	}
}//end connectDbPDO()
?>