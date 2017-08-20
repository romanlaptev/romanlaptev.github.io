<?php
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r ($_SERVER);
//print_r ($_REQUEST);
//echo "</pre>";

$_vars=array();
$_vars["config"]["host"] = "localhost";
$_vars["config"]["user"] = "root";
$_vars["config"]["password"] = "master";
$_vars["config"]["dbName"] = "db1";

//$_vars["config"]["host"] = "mysql.hostinger.ru";
//$_vars["config"]["user"] = "u380901270_usr";
//$_vars["config"]["password"] = "E6bAsZYBs4";
//$_vars["config"]["dbName"] = "u380901270_db1";

$_vars["config"]["tableName"] = "notes";

$_vars["sql"]["createDB"] = "CREATE DATABASE ".$_vars["config"]["dbName"]." DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci";
$_vars["sql"]["createTable"] = "CREATE TABLE IF NOT EXISTS `".$_vars["config"]["tableName"]."` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`author` varchar(20) NOT NULL,
`text_message` text NOT NULL default \"\",
`client_date` DATETIME NULL,
`server_date` DATETIME NULL,
`ip` varchar( 20 ) default \"\",
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
$_vars["sql"]["insertMessage"] = "INSERT INTO `".$_vars["config"]["tableName"]."` (`author`, `text_message`, `client_date`, `server_date`, `ip`) VALUES (
'{{authorName}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
)";
$_vars["sql"]["showTables"] = "SHOW TABLES  FROM `".$_vars["config"]["dbName"]."`";
$_vars["sql"]["getMessages"] = "SELECT id, author, text_message, client_date, server_date, ip FROM `".$_vars["config"]["tableName"]."`";
$_vars["sql"]["deleteMessage"] = "DELETE FROM `".$_vars["config"]["tableName"]."` WHERE `id`={{id}}";

	$action = "";
	if( !empty($_REQUEST['action']) ){
		$action = $_REQUEST['action'];
	}
//========================================= start
	//connect to server
	$_vars["link"] = connectMySQL();
//echo $_vars["link"];

	//create database (IF NOT EXISTS)
	$dbName = $_vars["config"]["dbName"];
	$db = mysql_select_db($dbName, $_vars["link"]);
	if (!$db){
		$query = $_vars["sql"]["createDB"];
		if (mysql_query($query, $_vars["link"]) ) {
			//echo "base $dbName created succesfully<br>";
			$db = mysql_select_db($dbName, $_vars["link"]);
		} else {
			echo "error create $dbName: " . mysql_error() . "<br>";
			echo "SQL: " . $query . "<br>";
			exit();
		}				
	}
	
	//create table (CREATE TABLE IF NOT EXISTS)
	//$tableName = $_vars["config"]["tableName"];
	$query = $_vars["sql"]["showTables"];
	$tables = getDataRow( $query, $_vars["link"] );
	$test = 0;
	for( $n = 0; $n < count ($tables); $n++){
		if( $tables[$n] == $_vars["config"]["tableName"]){
			$test = 1;
		}
	}//next
	if(!$test){
		$query = $_vars["sql"]["createTable"];
		mysql_query($query, $_vars["link"]);
	}
	
	switch ($action){
		case "save_message":
// echo PHP_VERSION;
// echo phpversion();
// echo PHP_OS;
			saveMessage();
		break;
		
		case "get_messages":
			getMessages();
		break;

		case "delete_message":
			if( !empty($_REQUEST['id']) ){
				$id = $_REQUEST["id"];
				deleteMessage($id);
			}
		break;

		case "edit_message":
		break;
		
	}//end switch
	mysql_close ( $_vars["link"] );
//=========================================== end	
	
function connectMySQL(){
	global $_vars;
// echo "<pre>";
// print_r($_vars);
// echo "</pre>";

	$host = $_vars["config"]["host"];
	$user = $_vars["config"]["user"];
	$password = $_vars["config"]["password"];
	$dbName = $_vars["config"]["dbName"];
	$tableName = $_vars["config"]["tableName"];
	
	try{
		$link = mysql_connect($host, $user, $password);
		if (!$link){
			throw new Exception('MySQL Connection Database Error: ' . mysql_error());
		} else{
			mysql_set_charset("utf8", $link);
//mysql_query('SET NAMES utf8');
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

}//end connectMySQL()
	
function saveMessage(){
	global $_vars;

	$authorName = $_REQUEST["authorName"];
	$textMessage = $_REQUEST["textMessage"];
	$clientDate = $_REQUEST["date"];
	$serverDate = date(DATE_ATOM);
	$ip = $_SERVER["REMOTE_ADDR"];
	//$tableName = $_vars["config"]["tableName"];
	
	//$query = $_vars["sql"]["createTable"];
//	if (mysql_query($query, $_vars["link"]) ) {
		//echo "table $tableName was created....<br>";

		$query = $_vars["sql"]["insertMessage"];
		$query = str_replace("{{authorName}}", $authorName, $query);
		$query = str_replace("{{textMessage}}", $textMessage, $query);
		$query = str_replace("{{client_date}}", $clientDate, $query);
		$query = str_replace("{{server_date}}", $serverDate, $query);
		$query = str_replace("{{ip}}", $ip, $query);
		
		if (mysql_query($query, $_vars["link"]) ) {
			echo "record was inserted....<br>";
		} else {
			echo "error INSERT: " . mysql_error() . "<br>";
			echo "SQL: " . $query . "<br>";
			exit();
		}
		
	//} else {
		//edit this....return JSON!!!!!
		//echo "error CREATE TABLE $tableName: " . mysql_error() . "<br>";
//		echo "SQL: " . $query . "<br>";
//		return false;
//	}				
}//end saveMessage()	

function getMessages(){
	global $_vars;

	$query = $_vars["sql"]["getMessages"];
	$messages = getDataObject( $query, $_vars["link"] );
	if( count($messages) > 0 ){
		$json = json_encode($messages);
		//$error = json_last_error();		
echo $json;
	}
	
}//end getMessages()	

function deleteMessage( $id ){
	global $_vars;

	$query = $_vars["sql"]["deleteMessage"];
	$query = str_replace("{{id}}", $id, $query);
//echo $query;
	if (mysql_query($query, $_vars["link"]) ) {
		//to JSON!!!!
		echo "record $id was deleted....<br>";
	} else {
		echo "error DELETE: " . mysql_error() . "<br>";
		echo "SQL: " . $query . "<br>";
		return false;
	}
	
}//end getMessages()	

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
