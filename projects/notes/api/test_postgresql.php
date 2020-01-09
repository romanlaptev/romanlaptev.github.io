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
$_vars["log"] = array();
include("auth_postgresql.php");

//==================================== TEST MODULES
//https://www.php.net/manual/ru/function.get-loaded-extensions.php
$loadedExt = get_loaded_extensions();
//echo "loaded extensions: <pre>";
//print_r( $loadedExt );
//echo "</pre>";
$module_name = "pgsql";
if ( !in_array( $module_name, $loadedExt ) ) {
	$msg = "<b>".$module_name."</b> module  is not in the list of loaded extensions.";
	$_vars["log"][] = "{\"error_code\" : \"loadModuleError\", \"message\" : \"" . $msg . "\"}";
	viewLog();
	exit;
}
//echo "list of functions in module <b>".$module_name."</b>:<pre>";
//print_r(get_extension_funcs( $module_name ));
//echo "</pre>";

$module_name = "pdo_pgsql";
if ( !in_array( $module_name, $loadedExt ) ) {
	$msg = "<b>".$module_name."</b> module  is not in the list of loaded extensions.";
	$_vars["log"][] = "{\"error_code\" : \"loadModuleError\", \"message\" : \"" . $msg . "\"}";
	viewLog();
	exit;
}
//====================================


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
	
//--------------------------------------

//--------------------------------------

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
		return $connection;
	} catch( PDOException $exception ) {
		//echo $exception->getMessage();
		$_vars["log"][] = "{\"error_code\" : \"connectDBerror\", \"message\" : \"" . $exception->getMessage() . "\"}";
		viewLog();
		exit();
	}
}//end connectDbPDO()
?>