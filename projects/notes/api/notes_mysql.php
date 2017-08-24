<?php
//header('Access-Control-Allow-Origin: *');
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r ($_SERVER);
//print_r ($_REQUEST);
//echo "</pre>";

$_vars=array();
$_vars["config"]["dbHost"] = "localhost";
$_vars["config"]["dbUser"] = "root";
$_vars["config"]["dbPassword"] = "master";
$_vars["config"]["dbName"] = "db1";

//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;
$_vars["config"]["phpversion"] = phpversion();


//$_vars["config"]["dbHost"] = "mysql.hostinger.ru";
//$_vars["config"]["dbUser"] = "u380901270_usr";
//$_vars["config"]["dbPassword"] = "E6bAsZYBs4";
//$_vars["config"]["dbName"] = "u380901270_db1";

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

$_vars["sql"]["insertMessage"] = "INSERT INTO `".$_vars["config"]["tableName"]."` (`author`, `title`, `text_message`, `client_date`, `server_date`, `ip`) VALUES (
'{{authorName}}', 
'{{title}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
)";
$_vars["sql"]["showTables"] = "SHOW TABLES  FROM `".$_vars["config"]["dbName"]."`";
$_vars["sql"]["getNotes"] = "SELECT id, author, title, text_message, client_date, server_date, ip FROM `".$_vars["config"]["tableName"]."` ORDER BY `client_date` DESC";
$_vars["sql"]["deleteNote"] = "DELETE FROM `".$_vars["config"]["tableName"]."` WHERE `id`={{id}}";
$_vars["sql"]["clearNotes"] = "TRUNCATE `".$_vars["config"]["tableName"]."`";


	$action = "";
	if( !empty($_REQUEST['action']) ){
		$action = $_REQUEST['action'];
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
			getNotes();
		break;

		case "delete_note":
			if( !empty($_REQUEST['id']) ){
				$id = $_REQUEST["id"];
				deleteNote($id);
			}
		break;

		case "clear_notes":
			clearNotes();
		break;
		
		case "remove_table":
			removeTable();
		break;
		
	}//end switch

	
	if($_vars["useMySQL"] == 1){
		mysql_close ( $_vars["link"] );
	}
	if($_vars["usePDO"] == 1){
		unset ($_vars["link"]);
	}

//=========================================== end	
	
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
		echo "exception: ",  $e->getMessage(), "\n";
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
		echo $exception->getMessage();
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
				echo "error, " . mysql_error() . "<br>";
				echo "SQL: " . $query . "<br>";
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
			echo $exception->getMessage();
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

	$authorName = addslashes( htmlspecialchars($_REQUEST["authorName"]) );
	
	//$title = $_REQUEST["title"];
	$title = addslashes( htmlspecialchars($_REQUEST["title"]) );
	
	//$textMessage = $_REQUEST["textMessage"];
	//$textMessage = strip_tags( $_REQUEST["textMessage"], "<h1>" );
	//$textMessage = nl2br( $_REQUEST["textMessage"] );
//echo $textMessage;
	//$textMessage = addslashes(htmlspecialchars("<script>alert('test');</script>"));
	$textMessage = addslashes( htmlspecialchars($_REQUEST["textMessage"]) );
/*
	$textMessage = str_replace("<script", "&lt;script", $textMessage);
	$textMessage = str_replace("</script>", "&lt;/script&gt;", $textMessage);
	
	$textMessage = str_replace("<?", "&lt;?", $textMessage);
	$textMessage = str_replace("/?>", "/?&gt;", $textMessage);
	
	$textMessage = str_replace("<%", "&lt;%", $textMessage);
	$textMessage = str_replace("%>", "%&gt;", $textMessage);

	$textMessage = addslashes($textMessage);
*/
	$clientDate = $_REQUEST["date"];
	$serverDate = date(DATE_ATOM);
	$ip = $_SERVER["REMOTE_ADDR"];
	
	$query = $_vars["sql"]["insertMessage"];
	$query = str_replace("{{authorName}}", $authorName, $query);
	$query = str_replace("{{title}}", $title, $query);
	$query = str_replace("{{textMessage}}", $textMessage, $query);
	$query = str_replace("{{client_date}}", $clientDate, $query);
	$query = str_replace("{{server_date}}", $serverDate, $query);
	$query = str_replace("{{ip}}", $ip, $query);

	if($_vars["useMySQL"] == 1){

		if (mysql_query($query, $_vars["link"]) ) {
			echo "record was inserted...";
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
			echo "record was inserted...";
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
		
	}
		
}//end saveNote()	

function getNotes(){
	global $_vars;

	$query = $_vars["sql"]["getNotes"];
	
	if($_vars["useMySQL"] == 1){
		$messages = getDataObject( $query, $_vars["link"] );
	}
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		$result  = $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
		$messages  = $result->fetchAll( PDO::FETCH_ASSOC );
// echo count($messages);	
// echo "<pre>";	
// print_r($messages);
// echo "</pre>";	
	}
	
	if( count($messages) > 0 ){
			if ( function_exists("json_encode") ){
				//PHP 5 >= 5.2.0
				$json = json_encode($messages);
/*
			//restore formatting
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
echo "error, not use function json_encode(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5.2.0";
			}
	}
	
}//end getNotes()	

function deleteNote( $id ){
	global $_vars;

	$query = $_vars["sql"]["deleteNote"];
	$query = str_replace("{{id}}", $id, $query);
//echo $query;

	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			echo "record $id was deleted...";
		} else {
			echo "error DELETE: " . mysql_error() . "<br>";
			echo "SQL: " . $query;
			exit();
		}
	}
	
	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
			echo "record $id was deleted...";
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
			echo $msg_success;
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
			echo $msg_success;
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
	$msg_success = "remove tables, ". "SQL: " . $query;
	
	if($_vars["useMySQL"] == 1){
		if (mysql_query($query, $_vars["link"]) ) {
			echo $msg_success;
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
			echo $msg_success;
		} catch( PDOException $exception ){
			print_r($connection->errorInfo(), true);
			echo $exception->getMessage();
			exit();
		}
	}
}//end clearNotes()


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