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
$_vars["config"]["dbHost"] = "localhost";
$_vars["config"]["dbUser"] = "root";
$_vars["config"]["dbPassword"] = "master";
$_vars["config"]["dbName"] = "db1";

//$_vars["config"]["dbHost"] = "mysql.hostinger.ru";
//$_vars["config"]["dbUser"] = "u380901270_usr";
//$_vars["config"]["dbPassword"] = "E6bAsZYBs4";
//$_vars["config"]["dbName"] = "u380901270_db1";

//http://romanlaptev.gearhostpreview.com/
//$_vars["config"]["dbHost"] = "mysql5.gear.host";
//$_vars["config"]["dbUser"] = "db118";
//$_vars["config"]["dbPassword"] = "Kb50i?84!a4i";
//$_vars["config"]["dbName"] = "db118";

//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;
$_vars["config"]["phpversion"] = phpversion();
$_vars["export"]["filename"] = "notes.xml";
$_vars["uploadPath"] = "upload";

$_vars["config"]["tableName"] = "notes";

$_vars["sql"]["createDB"] = "CREATE DATABASE IF NOT EXISTS ".$_vars["config"]["dbName"]." DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci";
/*
        $dbh->exec("CREATE DATABASE `$db`;
                CREATE USER '$user'@'localhost' IDENTIFIED BY '$pass';
                GRANT ALL ON `$db`.* TO '$user'@'localhost';
                FLUSH PRIVILEGES;") 
*/
$_vars["sql"]["createTable"] = "CREATE TABLE IF NOT EXISTS `".$_vars["config"]["tableName"]."` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`author` varchar(20) NOT NULL,
`title` varchar(255) default \"no title\",
`text_message` text NOT NULL default \"\",
`client_date` DATETIME NULL,
`server_date` DATETIME NULL,
`ip` varchar( 20 ) default \"\",
PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
//) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
//MyISAM
$_vars["sql"]["removeTable"] = "DROP TABLE `".$_vars["config"]["tableName"]."`";

$_vars["sql"]["insertNote"] = "INSERT INTO `".$_vars["config"]["tableName"]."` (`author`, `title`, `text_message`, `client_date`, `server_date`, `ip`) VALUES (
'{{authorName}}', 
'{{title}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
);";
$_vars["sql"]["insertAll"] = "INSERT INTO `".$_vars["config"]["tableName"]."` VALUES {{values}};";
$_vars["sql"]["insertValues"] = "(
NULL, 
'{{authorName}}', 
'{{title}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
)";

$_vars["sql"]["updateNote"] = "UPDATE `".$_vars["config"]["tableName"]."` SET 
author = '{{authorName}}', 
title = '{{title}}', 
text_message = '{{textMessage}}',
client_date = '{{client_date}}', 
server_date = '{{server_date}}', 
ip = '{{ip}}' WHERE id={{id}}";

$_vars["sql"]["showTables"] = "SHOW TABLES  FROM `".$_vars["config"]["dbName"]."`";
$_vars["sql"]["getNotes"] = "SELECT id, author, title, text_message, client_date, server_date, ip FROM `".$_vars["config"]["tableName"]."` ORDER BY `client_date` DESC";
$_vars["sql"]["deleteNote"] = "DELETE FROM `".$_vars["config"]["tableName"]."` WHERE `id`={{id}}";
$_vars["sql"]["clearNotes"] = "TRUNCATE TABLE `".$_vars["config"]["tableName"]."`";
$_vars["log"]=array();

	$action = "";
	if( !empty($_REQUEST['action']) ){
		$action = $_REQUEST['action'];
	} else {
		$_vars["log"][] = "{\"error_code\" : \"noaction\", \"message\" : \"error, undefined var 'action'\"}";
	}
	
//========================================= connect to server
	//check PDO support
	if (!defined('PDO::ATTR_DRIVER_NAME')) {
		$_vars["useMySQL"] = 1;
		$_vars["usePDO"] = 0;
		$_vars["link"] = connectDbMySQL();
	} else {
		$_vars["useMySQL"] = 0;
		$_vars["usePDO"] = 1;
		$_vars["link"] = connectDbPDO();
	}
	
	createDb();
	createTable();
	
	switch ($action){
		case "save_note":
			saveNote();
		break;
		
		case "get_notes":
			$notes = getNotes();
// echo count($notes);	
// echo "<pre>";	
// print_r($notes);
// echo "</pre>";
			if( count($notes) > 0 ){
					if ( function_exists("json_encode") ){
						//PHP 5 >= 5.2.0
						$json = json_encode($notes);
						
						//restore formatting after json_encode
						$json = str_replace("&amp;gt;", "&gt;", $json);
						$json = str_replace("&amp;lt;", "&lt;", $json);
						$json = str_replace("&amp;quot;", "&quot;", $json);
		/*
						$json = str_replace("&lt;", "<", $json);
						$json = str_replace("&gt;", ">", $json);
						$json = str_replace("&quot;", "'", $json);
						//$json = str_replace("<code>", "<pre>", $json);
						//$json = str_replace("<\/code>", "</pre>", $json);
									
					//no run script code, no JS, no PHP
						$json = str_replace("<script", "&lt;script", $json);
						$json = str_replace("</script>", "&lt;/script&gt;", $json);
						
						$json = str_replace("<?", "&lt;?", $json);
						$json = str_replace("/?>", "/?&gt;", $json);
						
						$json = str_replace("<%", "&lt;%", $json);
						$jso = str_replace("%>", "%&gt;", $json);
		*/

		/*
						$json = str_replace("&lt;pre&gt;", "<pre>", $json);
						$json = str_replace("&lt;\/pre&gt;", "</pre>", $json);

						$json = str_replace("&lt;a", "<a", $json);
						$json = str_replace("&lt;\/a&gt;", "</a>", $json);
						$json = str_replace("&quot;&gt;", "'>", $json);
						$json = str_replace("&quot;", "'", $json);
		*/				
						//$error = json_last_error();		
						echo $json;
					} else {
		//https://www.abeautifulsite.net/using-json-encode-and-json-decode-in-php4
		//http://www.epigroove.com/blog/how-to-use-json-in-php-4-or-php-51x
		//https://gist.github.com/jorgeatorres/1239453
//echo "error, not support function json_encode(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5.2.0";
$msg = "error, not support function json_encode(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5.2.0";
$_vars["log"][] = "{\"error_code\" : \"notSupportJSON\", \"message\" : \""+$msg+"\"}";
					}
			}

		break;

		case "delete_note":
			if( !empty($_REQUEST['id']) ){
				$id = $_REQUEST["id"];
				deleteNote($id);
			}
		break;

		case "edit_note":
			updateNote();
		break;
		
		case "clear_notes":
			clearNotes();
		break;
		
		case "remove_table":
			removeTable();
		break;
		
		case "export_notes":
			exportTable( $_vars["export"]["filename"] );
		break;
		
		case "upload":
			uploadFile();
		break;
		
		case "import_notes":
			$foldername = $_vars["uploadPath"];
			chdir("../");
			$fullPath = getcwd() . "/".$foldername;
			importTable( $fullPath."/". $_vars["export"]["filename"]);
		break;
		
	}//end switch

	
	if($_vars["useMySQL"] == 1){
		mysql_close ( $_vars["link"] );
	}
	if($_vars["usePDO"] == 1){
		unset ($_vars["link"]);
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
	
function connectDbMySQL(){
	global $_vars;
// echo "<pre>";
// print_r($_vars);
// echo "</pre>";

	$dbHost = $_vars["config"]["dbHost"];
	$dbUser = $_vars["config"]["dbUser"];
	$dbPassword = $_vars["config"]["dbPassword"];
	$dbName = $_vars["config"]["dbName"];
	$tableName = $_vars["config"]["tableName"];
	
	try{
		$link = mysql_connect($dbHost, $dbUser, $dbPassword);
		if (!$link){
			throw new Exception('MySQL Connection Database Error: ' . mysql_error());
		} else{

			if ( function_exists("mysql_set_charset") ){
				//function mysql_set_charset() is available since PHP 5.2.3
				//MySQL => 5.0.7
				mysql_set_charset("utf8", $link);
			} else {
//mysql_query('SET NAMES utf8');
//mysql_query("SET CHARACTER SET utf8 ");
				mysql_query ("set character_set_client='utf8'");
				mysql_query ("set character_set_results='utf8'");
				mysql_query ("set collation_connection='utf8_general_ci'");
			}
			
//SHOW VARIABLES LIKE  'char%'
//$db_info = "<li>MySQL server info: " . mysql_get_server_info() ."</li>";
// $db_info .= "<li>MySQL client info: " . mysql_get_client_info() ."</li>";
// $db_info .= "<li>MySQL host info: " . mysql_get_host_info() ."</li>";
// $db_info .= "<li>MySQL protocol version: " . mysql_get_proto_info() ."</li>";
//$db_info .= "<li>mysql_client_encoding: " . mysql_client_encoding($link) ."</li>";
//echo $db_info;

			return $link;
		}
		
	}catch(Exception $e){
		//echo "exception: ",  $e->getMessage(), "\n";
		$_vars["log"][] = "{\"error_code\" : \"connectDBerror\", \"message\" : \"exception: " . $e->getMessage() . "\"}";
		viewLog();
		exit();
	}

}//end connectDbMySQL()

function connectDbPDO(){
	global $_vars;
// echo "<pre>";
// print_r($_vars);
// echo "</pre>";

	$dbHost = $_vars["config"]["dbHost"];
	$dbUser = $_vars["config"]["dbUser"];
	$dbPassword = $_vars["config"]["dbPassword"];
	$dbName = $_vars["config"]["dbName"];
	$tableName = $_vars["config"]["tableName"];
	
	$dsn = "mysql:host={$dbHost}";
	try{
		$connection = new PDO( $dsn, $dbUser, $dbPassword );
		
		$query = "set character_set_client='utf8'";
		$connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		
		$query = "set character_set_results='utf8'";
		$connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		
		$query = "set collation_connection='utf8_general_ci'";
		$connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		
		return $connection;
	} catch( PDOException $exception ) {
		//echo $exception->getMessage();
		$_vars["log"][] = "{\"error_code\" : \"connectDBerror\", \"message\" : \"" . $exception->getMessage() . "\"}";
		viewLog();
		exit();
	}
	
}//end connectDbPDO()


//=========================================== create database (IF NOT EXISTS)
function createDb(){
	global $_vars;
	
	$query = $_vars["sql"]["createDB"];
	
	if($_vars["useMySQL"] == 1){
		$dbName = $_vars["config"]["dbName"];
		//$db = mysql_select_db($dbName, $_vars["link"]);
		//if (!$db){
			if (mysql_query($query, $_vars["link"]) ) {
				//echo "base $dbName created succesfully<br>";
				$db = mysql_select_db($dbName, $_vars["link"]);
			} else {
				//echo "error, " . mysql_error() . "<br>";
				//echo "SQL: " . $query . "<br>";
				$_vars["log"][] = "{\"error_code\" : \"createDBerror\", \"message\" : \"" . mysql_error() . "\"}";
				$_vars["log"][] = "{\"message\" : \"SQL: " . $query . "<br>\"}";
				viewLog();
				exit();
			}				
		//}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		//$connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		try{
			$connection->query( $query );
			//echo $msg_success;
			$connection->query("use ".$_vars["config"]["dbName"]);	
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			//echo $exception->getMessage();
			$_vars["log"][] = "{\"error_code\" : \"createDBerror\", \"message\" : \"" . $exception->getMessage() . "\"}";
			$_vars["log"][] = "{\"message\" : \"SQL: " . $query . "\"}";
			viewLog();
			exit();
		}
	}
	
}//end createDb()	


//======================================== create table (CREATE TABLE IF NOT EXISTS)
function createTable(){
	global $_vars;
	
	$tableName = $_vars["config"]["tableName"];
	// $query = $_vars["sql"]["showTables"];
	// $tables = getDataRow( $query, $_vars["link"] );
	// $test = 0;
	// for( $n = 0; $n < count ($tables); $n++){
		// if( $tables[$n] == $_vars["config"]["tableName"]){
			// $test = 1;
		// }
	// }//next
	// if(!$test){
		// $query = $_vars["sql"]["createTable"];
		// mysql_query($query, $_vars["link"]);
	// }
	$query = $_vars["sql"]["createTable"];
	$msg_success = "$tableName created succesfully, ". "SQL: " . $query;
	
	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			//echo $msg_success;
		} else {
			echo "error: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}				
	}				
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		//$connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		try{
			$connection->query( $query );
			//echo $msg_success;
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
	
}//end createTable()


function saveNote(){
	global $_vars;
	
	if( empty( $_REQUEST["text_message"]) ){
echo "error!";
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";
exit();
	}

	$authorName = addslashes( htmlspecialchars($_REQUEST["author_name"]) );
	
	//$title = $_REQUEST["title"];
	$title = addslashes( htmlspecialchars($_REQUEST["title"]) );
	
	//$textMessage = $_REQUEST["textMessage"];
	//$textMessage = strip_tags( $_REQUEST["textMessage"], "<h1>" );
	//$textMessage = nl2br( $_REQUEST["textMessage"] );
//echo $textMessage;
	//$textMessage = addslashes(htmlspecialchars("<script>alert('test');</script>"));
	$textMessage = addslashes( htmlspecialchars($_REQUEST["text_message"]) );
	
//------------------------ filter
	//$textMessage = str_replace("&amp;lt;", "&lt;", $textMessage);
	//$textMessage = str_replace("&amp;gt;", "&gt;", $textMessage);
	//$textMessage = str_replace("&amp;quot;", "&quot;", $textMessage);
		// //remove old special symbols
		// $textMessage = str_replace("&quot;", "\"", $textMessage);
		// $textMessage = str_replace("&amp;", "&", $textMessage);
		// $textMessage = str_replace("&lt;", "<", $textMessage);
		// $textMessage = str_replace("&gt;", ">", $textMessage);
		
		// //insert special symbols re-new
		// $textMessage = str_replace("&", "&amp;", $textMessage);
		// $textMessage = str_replace("<", "&lt;", $textMessage);
		// $textMessage = str_replace(">", "&gt;", $textMessage);
		// $textMessage = str_replace("\"", "&quot;", $textMessage);
/*
	$textMessage = str_replace("<script", "&lt;script", $textMessage);
	$textMessage = str_replace("</script>", "&lt;/script&gt;", $textMessage);
	
	$textMessage = str_replace("<?", "&lt;?", $textMessage);
	$textMessage = str_replace("/?>", "/?&gt;", $textMessage);
	
	$textMessage = str_replace("<%", "&lt;%", $textMessage);
	$textMessage = str_replace("%>", "%&gt;", $textMessage);

	$textMessage = addslashes($textMessage);
*/
//------------------------------

	$clientDate = $_REQUEST["date"];
	$serverDate = date(DATE_ATOM);
	$ip = $_SERVER["REMOTE_ADDR"];
	
	$query = $_vars["sql"]["insertNote"];
	$query = str_replace("{{authorName}}", $authorName, $query);
	$query = str_replace("{{title}}", $title, $query);
	$query = str_replace("{{textMessage}}", $textMessage, $query);
	$query = str_replace("{{client_date}}", $clientDate, $query);
	$query = str_replace("{{server_date}}", $serverDate, $query);
	$query = str_replace("{{ip}}", $ip, $query);

	if($_vars["useMySQL"] == 1){

		if (mysql_query($query, $_vars["link"]) ) {
			//echo "record was inserted...";
			$_vars["log"][] = "{\"message\" : \"record was inserted...\"}";
		} else {
			echo "error INSERT: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		
//Protection against sql-injections
//1. 
//$username = PDO::quote($_GET['username']);
//$pdo->query("SELECT * FROM users WHERE username = $username");
//2.
//$pdo->prepare('SELECT * FROM users WHERE username = :username');
//$pdo->execute(array(':username' => $_GET['username']));

		// $query = str_replace("{{authorName}}", ":author", $query);
		// $query = str_replace("{{title}}", ":title", $query);
		// $query = str_replace("{{textMessage}}", ":text_message", $query);
		// $query = str_replace("{{client_date}}", ":client_date", $query);
		// $query = str_replace("{{server_date}}", ":server_date", $query);
		// $query = str_replace("{{ip}}", ":ip", $query);
// echo $query;
		// $st = $connection->prepare($query);
// echo "<pre>";
// print_r($st);
// echo "</pre>";
		
		// $params = array();
		// $params[":author_name"] = $authorName;
		// $params[":title"] = $title;
		// $params[":text_message"] = $textMessage;
		// $params[":client_date"] = $clientDate;
		// $params[":server_date"] = $serverDate;
		// $params[":ip"] = $ip;
// echo "<pre>";
// print_r($params);
// echo "</pre>";

		// $st->execute($params);
		
		//$textMessage = $connection->quote( htmlspecialchars($_REQUEST["textMessage"]) );
		//$query = str_replace("{{textMessage}}", $textMessage, $query);
		
		try{
			$connection->query( $query );
			//echo "record was inserted...";
			$_vars["log"][] = "{\"message\" : \"record was inserted...\"}";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end saveNote()	

function updateNote(){
	global $_vars;
	
	if( empty( $_REQUEST["text_message"]) ){
echo "error, not found text note...";
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";
exit();
	}
	$textNote = $_REQUEST["text_message"];
	//$textMessage = strip_tags( $_REQUEST["text_message"], "<h1>" );
	//$textMessage = nl2br( $_REQUEST["text_message"] );
//echo $textMessage;

	//filter
	//remove old special symbols ( for correct htmlspecialchars() )
	$textNote = str_replace("&quot;", "\"", $textNote);
	$textNote = str_replace("&amp;", "&", $textNote);
	$textNote = str_replace("&lt;", "<", $textNote);
	$textNote = str_replace("&gt;", ">", $textNote);

	//$textMessage = addslashes(htmlspecialchars("<script>alert('test');</script>"));
	$textMessage = addslashes( htmlspecialchars($textNote) );
					
	if( empty( $_REQUEST["id"]) ){
echo "error, not found id note...";
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";
exit();
	}
	$id = $_REQUEST["id"];
	
	$authorName = addslashes( htmlspecialchars($_REQUEST["author_name"]) );
	$title = addslashes( htmlspecialchars($_REQUEST["title"]) );
	$clientDate = $_REQUEST["date"];
	$serverDate = date(DATE_ATOM);
	$ip = $_SERVER["REMOTE_ADDR"];
	
	$query = $_vars["sql"]["updateNote"];
	$query = str_replace("{{authorName}}", $authorName, $query);
	$query = str_replace("{{title}}", $title, $query);
	$query = str_replace("{{textMessage}}", $textMessage, $query);
	$query = str_replace("{{client_date}}", $clientDate, $query);
	$query = str_replace("{{server_date}}", $serverDate, $query);
	$query = str_replace("{{ip}}", $ip, $query);
	$query = str_replace("{{id}}", $id, $query);

	$msg_success = "record $id was updated. ";
	if($_vars["useMySQL"] == 1){

		if (mysql_query($query, $_vars["link"]) ) {
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} else {
			echo "error INSERT: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end updateNote()	

function getNotes(){
	global $_vars;
	
	$messages = array();
	$query = $_vars["sql"]["getNotes"];
	
	if($_vars["useMySQL"] == 1){
		$messages = getDataObject( $query, $_vars["link"] );
	}
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		$result  = $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		//$messages  = $result->fetchAll( PDO::FETCH_ASSOC );
		$messages  = $result->fetchAll( PDO::FETCH_OBJ );
		
// echo count($messages);	
// echo "<pre>";	
// print_r($messages);
// echo "</pre>";	
	}
	return $messages;
}//end getNotes()	

function deleteNote( $id ){
	global $_vars;

	$query = $_vars["sql"]["deleteNote"];
	$query = str_replace("{{id}}", $id, $query);
//echo $query;
	$msg_success = "record $id was deleted, ". "SQL: " . $query;

	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} else {
			//echo "error DELETE: " . mysql_error() . "<br>";
			//echo "SQL: " . $query;
			$_vars["log"][] = "{\"error_code\" : \"errorDelete\", \"message\" : \"" . mysql_error() . "\"}";
			$_vars["log"][] = "{\"message\" : \"SQL: " . $query . "<br>\"}";
			viewLog();
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end deleteNote()	

function clearNotes(){
	global $_vars;
	$query = $_vars["sql"]["clearNotes"];
	$msg_success = "clear notes, ". "SQL: " . $query;
	
	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			//echo $msg_success;
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} else {
			echo "error: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
			//echo $msg_success;
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end clearNotes()

function removeTable(){
	global $_vars;
	$query = $_vars["sql"]["removeTable"];
	$msg_success = "Rebuild table, ". "SQL: " . $query;
	
	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			//echo $msg_success;
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} else {
			echo "error: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			//echo $msg_success;
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end removeNotes()


function exportTable( $filename ){
	//global $_vars;
	
	$notes = getNotes();
// echo count($notes);	
// echo "<pre>";	
// print_r($notes);
// echo "</pre>";
	if( count($notes) === 0 ){
//echo "Export error, no data...";		
		$_vars["log"][] = "{\"error_code\" : \"exportError\", \"message\" : \"not find notes...\"}";
		viewLog();
		exit();
	}
	//create XML
	$xml="";
	$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
	$xml .= "<table name='notes'>\n";
	foreach ( $notes as $row ){
//print_r($row);
		//$id = $row->id;
		$author = $row->author;
		$title = $row->title;
		$text_message = $row->text_message;
		$client_date = $row->client_date;
		$server_date = $row->server_date;
		$ip = $row->ip;

		$xml .=  "\t<note title=\"".$title."\" ";
		//$xml .=  "id=\"".$id."\" ";
		$xml .=  "author=\"".$author."\" ";
		$xml .=  "ip=\"".$ip."\" ";
		$xml .=  "client_date=\"".$client_date."\" ";
		$xml .=  "server_date=\"".$server_date."\" ";
		$xml .=  ">\n";
		if ( !empty($text_message) ){
//------------------------ filter
			//$text_message = str_replace('', '', $text_message);
			//$text_message = str_replace('&', '&amp;', $text_message);
			
			//remove old special symbols
			// $text_message = str_replace("&quot;", "\"", $text_message);
			// $text_message = str_replace("&amp;", "&", $text_message);
			// $text_message = str_replace("&lt;", "<", $text_message);
			// $text_message = str_replace("&gt;", ">", $text_message);
			
			// //insert special symbols re-new
			// $text_message = str_replace("&", "&amp;", $text_message);
			// $text_message = str_replace("<", "&lt;", $text_message);
			// $text_message = str_replace(">", "&gt;", $text_message);
			// $text_message = str_replace("\"", "&quot;", $text_message);
//------------------------------
			$xml .=  "\t\t<text_message>\n";
			$xml .=  $text_message."\n";
			$xml .=  "\t\t</text_message>\n";
		}
		$xml .= "\t</note>\n";
	}//end foreach
	$xml .= "</table>\n\n";
		
// echo "<pre>";
// echo htmlspecialchars($xml);
// echo "</pre>";
// exit();

	if ( !empty($xml) )
	{
		header('Content-Type:  application/xhtml+xml');
		header('Content-Disposition: attachment; filename='.$filename.'');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: '.strlen($xml));
		echo $xml;
	}
	
}//end exportNotes()

function importTable( $xml_file ){
	global $_vars;
	//removeTable();
	
	if ( !function_exists("simplexml_load_file") ){
//echo "error read xml from ".$xml_file;	
//echo "<br>";
//echo "Not support function simplexml_load_file(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5";
		$msg = "error read xml from ".$xml_file;
		$msg .= "<br>Not support function simplexml_load_file(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5";
		$_vars["log"][] = "{\"error_code\" : \"importError\", \"message\" : \"$msg\"}";
		exit();
	}
	
	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) {
		exit("Failed to open ".$xml_file);
	}
//echo "Ok, read xml from ".$xml_file;	
//echo "<br>";
//echo "<pre>";
//print_r($xml);
//echo "</pre>";

	$queryValues = "";
	for ($n=0; $n < sizeof($xml->note); $n++){
		$authorName = $xml->note[$n]["author"];
		$authorName = addslashes( htmlspecialchars($authorName) );
		
		$title = $xml->note[$n]["title"];
		$title = addslashes( htmlspecialchars($title) );
		
		$textMessage = $xml->note[$n]->text_message;
		$textMessage = addslashes( htmlspecialchars($textMessage) );
		
//------------------------ filter
		$textMessage = str_replace("&amp;lt;", "&lt;", $textMessage);
		$textMessage = str_replace("&amp;gt;", "&gt;", $textMessage);
		// //remove old special symbols
		// $textMessage = str_replace("&quot;", "\"", $textMessage);
		// $textMessage = str_replace("&amp;", "&", $textMessage);
		// $textMessage = str_replace("&lt;", "<", $textMessage);
		// $textMessage = str_replace("&gt;", ">", $textMessage);
		
		// //insert special symbols re-new
		// $textMessage = str_replace("&", "&amp;", $textMessage);
		// $textMessage = str_replace("<", "&lt;", $textMessage);
		// $textMessage = str_replace(">", "&gt;", $textMessage);
		// $textMessage = str_replace("\"", "&quot;", $textMessage);
//------------------------------
		
		$clientDate = $xml->note[$n]["client_date"];
		$serverDate = $xml->note[$n]["server_date"];
		$ip = $xml->note[$n]["ip"];
		
		$items = $_vars["sql"]["insertValues"];
		$items = str_replace("{{authorName}}", $authorName, $items);
		$items = str_replace("{{title}}", $title, $items);
		$items = str_replace("{{textMessage}}", $textMessage, $items);
		$items = str_replace("{{client_date}}", $clientDate, $items);
		$items = str_replace("{{server_date}}", $serverDate, $items);
		$items = str_replace("{{ip}}", $ip, $items);
//echo $items;
//echo "<br>";
		$queryValues .= $items;
		if( $n < (sizeof($xml->note)-1) ){
			$queryValues .= ", ";
		}
	}//next
//echo $queryValues;
//echo "<br>";
	$query = $_vars["sql"]["insertAll"];
	$query = str_replace("{{values}}", $queryValues, $query);
	
	//$msg_success = "Records added, ". "SQL: " . $query;
	$msg_success = "Records added.";
	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			//echo $msg_success;
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} else {
			//echo "error INSERT: " . mysql_error() . "<br>";
			//echo "SQL: " . $query;
			$msg = "error INSERT: " . mysql_error() . "<br>";
			$msg .= "SQL: " . $query;
			$_vars["log"][] = "{\"error_code\" : \"importError\", \"message\" : \"$msg\"}";
			exit();
		}
	}

	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			//echo $msg_success;
			$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
	
}//end importTable()

function uploadFile(){
	global $_vars;
//echo "<pre>";
//print_r ($_SERVER);
//print_r ($_REQUEST);
//print_r($_FILES);
//echo "</pre>";

		$upload_max_filesize = ini_get('upload_max_filesize'); 
//echo "upload_max_filesize = ". $upload_max_filesize;
//echo "<br>";
		$msg = "upload_max_filesize = ". $upload_max_filesize;
		$_vars["log"][] = "{\"message\" : \"$msg\"}";

		$fullPath = initUploadDirectory();
		if( !$fullPath ){
//echo "not Ok";
//echo "<br>";
exit();
		}
			
//echo "Ok";
//echo "<br>";
	$file_arr = $_FILES["upload_file"];
	$errors ="";
	switch ($file_arr['error']){
		case 0:
			$errors .= "UPLOAD_ERR_OK";
			if ( is_uploaded_file ($file_arr['tmp_name']) ) {
				$uploaded_file = $fullPath."/".$_vars["export"]["filename"];
				if ( move_uploaded_file( $file_arr['tmp_name'], $uploaded_file ) )
				{
//echo $file_arr['name'].", size= ".$file_arr['size']." bytes upload successful";
//echo "<br>";
//echo "Rename ". $file_arr['name']." to ".$_vars["export"]["filename"];
//echo "<br>";
					$msg = $file_arr['name'].", size= ".$file_arr['size']." bytes upload successful";
					$_vars["log"][] = "{\"message\" : \"$msg\"}";
					$msg = "Rename ". $file_arr['name']." to ".$_vars["export"]["filename"];
					$_vars["log"][] = "{\"message\" : \"$msg\"}";

					importTable( $fullPath."/".$_vars["export"]["filename"] );
				} else {
//echo $file_arr['name'].", size= ".$file_arr['size']." bytes not upload";
//echo "<br>";
					$msg = $file_arr['name'].", size= ".$file_arr['size']." bytes not upload";
					$_vars["log"][] = "{\"message\" : \"$msg\"}";
				}
			}
		break;

		case 1:
$errors .= 'UPLOAD_ERR_INI_SIZE, Размер принятого файла превысил максимально допустимый размер, который задан директивой upload_max_filesize конфигурационного файла php.ini.';
		break;

		case 2:
$errors .= 'UPLOAD_ERR_FORM_SIZE,  Размер загружаемого файла превысил значение MAX_FILE_SIZE, указанное в HTML-форме.';
		break;

		case 3:
$errors .= 'UPLOAD_ERR_PARTIAL, Загружаемый файл был получен только частично.';
		break;

		case 4:
$errors .= 'UPLOAD_ERR_NO_FILE';
		break;

		case 6:
$errors .= 'UPLOAD_ERR_NO_TMP_DIR';
		break;

		case 7:
$errors .= 'UPLOAD_ERR_CANT_WRITE';
		break;

		case 8:
$errors .= 'UPLOAD_ERR_EXTENSION, PHP-расширение остановило загрузку файла. PHP не предоставляет способа определить какое расширение остановило загрузку файла; в этом может помочь просмотр списка загруженных расширений из phpinfo(). Добавлено в PHP 5.2.0.';
		break;

	}//end switch
$errors .= ' code: ' . $file_arr['error'];
//echo $errors;
//echo "<br>";
	$_vars["log"][] = "{\"message\" : \"$errors\"}";

}// uploadFile()

function initUploadDirectory(){
	global $_vars;
		chdir("../");
//echo "getcwd = ".getcwd();
//echo "__DIR__ = ".__DIR__;
		$foldername = $_vars["uploadPath"];
		$fullPath = getcwd() . "/".$foldername;
		
		if ( !file_exists( $fullPath )) {
//echo $fullPath . " not exists";
//echo "<br>";
	
			$mode = 0777;
			$recursive = false;
			if (mkdir ( $fullPath, $mode, $recursive)) {
//echo "Mkdir $fullPath successful";
//echo "<br>";
				$msg = "Mkdir $fullPath successful";
				$_vars["log"][] = "{\"message\" : \"$msg\"}";
			} else {
//echo "Cannot mkdir $fullPath, ";
//echo "<br>";
				$msg = "Cannot mkdir $fullPath, ";
				$_vars["log"][] = "{\"message\" : \"$msg\"}";
			}
			
			$perms=substr(sprintf('%o', fileperms(  $fullPath )), -4);
//echo $fullPath . ", rights: $perms";
//echo "<br>";
			$msg = $fullPath . ", rights: $perms";
			$_vars["log"][] = "{\"message\" : \"$msg\"}";
			if (is_writable( $fullPath )){
				return $fullPath;
			} else {
//echo "Not writable!";
//echo "<br>";
				$msg = "Not writable!";
				$_vars["log"][] = "{\"message\" : \"$msg\"}";
				return 0;
			}
			
		} else {
			$perms=substr(sprintf('%o', fileperms(  $fullPath )), -4);
//echo $fullPath . " exists, rights: $perms";
//echo "<br>";
			$msg = $fullPath . " exists, rights: $perms";
			$_vars["log"][] = "{\"message\" : \"$msg\"}";
			if (is_writable( $fullPath )){
				return $fullPath;
			} else {
//echo "Not writable!";
//echo "<br>";
				$msg = "Not writable!";
				$_vars["log"][] = "{\"message\" : \"$msg\"}";
				return 0;
			}

		}
}//end initUploadDirectory()		


function getDataObject( $query, $link ){
	$data = array();
	$res = mysql_query($query, $link) or die( "error run query:  $query, ".mysql_error() );
	for( $n = 0; $n < mysql_num_rows ($res); $n++){
		$row = mysql_fetch_object($res);
// echo "<pre>";
// print_r ($row);
// echo "</pre>";
		$data[] = $row;
	}//next row
	return $data;
}//end getDataObject()

function getDataRow( $query, $link ){
	$data = array();
	$res = mysql_query($query, $link) or die( "error run query:  $query, ".mysql_error() );
	for( $n = 0; $n < mysql_num_rows ($res); $n++){
		$row = mysql_fetch_row($res);
// echo "<pre>";
// print_r ($row);
// echo "</pre>";
		$data[] = $row[0];
	}//next row
	return $data;
}//end getDataObject()

/*
//---------------------------------------------
			$query3 = "
		
			SELECT a.description
			FROM opr_result r
			LEFT JOIN opr_result_value rv ON rv.result_id = r.id AND rv.answer_id in 
				(SELECT a.id from opr_answer a WHERE a.question_id = ".$row2['id'] .") 
			LEFT JOIN opr_answer a ON rv.answer_id = a.id
			ORDER BY r.region, r.city , r.organization 
			";
			$res3 = mysql_query($query3);
			while($row3 = mysql_fetch_assoc($res3))
			{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
				
				echo "		<td>".$row3['description']."		</td>";
			}//------------------------- end while

			
//---------------------------------------------
	$tables = "SHOW TABLES";
	$res = mysql_query($tables) or die( "Ошибка при выполнении запроса: ".mysql_error() );

//	while( $table = mysql_fetch_row($res) )
	for ($n1=0; $n1< 6; $n1++ )
	  {
		$table = mysql_fetch_row($res);



//---------------------------------------------
			//while ($row = mysql_fetch_array($res,MYSQL_BOTH))
			//while ($row = mysql_fetch_array($res,MYSQL_ASSOC))
			//while( $row = mysql_fetch_row($res))
			while ($row = mysql_fetch_assoc($res))
			{
	


//---------------------------------------------
		$sql = "
INSERT INTO $tablename (
`id` ,
`field_state`
)
VALUES 
(
NULL , '$field_arr'
);
";
//echo $sql;
//echo "<br>";

		if (mysql_query($sql))
		{
$log_message .= "- save field state in database: $dbname, table: $tablename";
$log_message .= "<br>";
		}
		else
			echo "Invalid query: " . mysql_error();
		
*/
?>