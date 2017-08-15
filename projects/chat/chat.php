<?php
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";

$host = "localhost";
$user = "root";
$password = "master";
$db_name = "db1";
$tableName = "messages";

	$authorName = $_REQUEST["authorName"];
	$textMessage = $_REQUEST["textMessage"];
	$action = $_REQUEST['action'];
	switch ($action){
		case "save_message":
// echo PHP_VERSION;
// echo phpversion();
// echo PHP_OS;
			try{
				$link = mysql_connect($host, $user, $password);
				if (!$link){
					throw new Exception('MySQL Connection Database Error: ' . mysql_error());
				}				
			}catch(Exception $e){
				echo "exception: ",  $e->getMessage(), "\n";
// echo "<pre>";
// print_r($e);
// echo "</pre>";
				exit();
			}
			
$db_info = "<li>MySQL server info: " . mysql_get_server_info() ."</li>";
$db_info .= "<li>MySQL client info: " . mysql_get_client_info() ."</li>";
$db_info .= "<li>MySQL host info: " . mysql_get_host_info() ."</li>";
$db_info .= "<li>MySQL protocol version: " . mysql_get_proto_info() ."</li>";
$db_info .= "<li>mysql_client_encoding: " . mysql_client_encoding($link) ."</li>";
echo $db_info;
//mysql_query('SET NAMES utf8');
//mysql_set_charset("utf8", $link);
			
			$db = mysql_select_db($db_name);
			if (!$db){
//CREATE DATABASE `db1` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
				$sql = "CREATE DATABASE ".$db_name;
				if (mysql_query($sql, $link) ) {
					echo "База $db_name успешно создана\n";
					saveMessage();
				} else {
					echo "Ошибка при создании базы данных $db_name: " . mysql_error() . "<br>";
					echo "SQL: " . $sql . "<br>";
				}				
			} else {
				saveMessage();
			}

			mysql_close ($link);

		break;
	}//end switch
	

function saveMessage(){
	global $authorName, $textMessage, $tableName, $link;
//echo $textMessage;	
	$sql = "";
	$sql .= "CREATE TABLE IF NOT EXISTS `".$tableName."` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`author` varchar(20) NOT NULL,
`message` text NOT NULL default \"\",
`date` varchar( 20 ) default \"\",
`ip` varchar( 20 ) default \"\",
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";

	if (mysql_query($sql, $link) ) {
		echo "table $tableName was created....<br>";
	} else {
		echo "error created $tableName: " . mysql_error() . "<br>";
		echo "SQL: " . $sql . "<br>";
	}				

}//end saveMessage()	
?>