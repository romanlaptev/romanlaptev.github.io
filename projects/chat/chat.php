<?php
//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

echo "<pre>";
//print_r ($_SERVER);
print_r ($_REQUEST);
echo "</pre>";

$host = "localhost";
$user = "root";
$password = "master";
$db_name = "db1";
$tableName = "messages";

$sql=array();
$sql["createDB"] = "CREATE DATABASE ".$db_name." DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci";
$sql["createTable"] = "CREATE TABLE IF NOT EXISTS `".$tableName."` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`author` varchar(20) NOT NULL,
`message` text NOT NULL default \"\",
`client_date` DATETIME NULL,
`server_date` DATETIME NULL,
`ip` varchar( 20 ) default \"\",
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
$sql["insertMessage"] = "INSERT INTO `messages` (`author`, `message`, `client_date`, `server_date`, `ip`) VALUES (
'{{authorName}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
)";

	$action = $_REQUEST['action'];
//====================================== start
	
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
				exit();
			}
			
// $db_info = "<li>MySQL server info: " . mysql_get_server_info() ."</li>";
// $db_info .= "<li>MySQL client info: " . mysql_get_client_info() ."</li>";
// $db_info .= "<li>MySQL host info: " . mysql_get_host_info() ."</li>";
// $db_info .= "<li>MySQL protocol version: " . mysql_get_proto_info() ."</li>";
// $db_info .= "<li>mysql_client_encoding: " . mysql_client_encoding($link) ."</li>";
// echo $db_info;
//mysql_query('SET NAMES utf8');
//mysql_set_charset("utf8", $link);
			
			$db = mysql_select_db($db_name);
			if (!$db){
				$query = $sql["createDB"];
				if (mysql_query($query, $link) ) {
					echo "base $db_name created succesfully<br>";
					$db = mysql_select_db($db_name);
// echo "<pre>";
// print_r($db);
// echo "</pre>";
					if($db){
						saveMessage();
					}
					
				} else {
					echo "error create $db_name: " . mysql_error() . "<br>";
					echo "SQL: " . $sql . "<br>";
				}				
			} else {
				saveMessage();
			}

			mysql_close ($link);

		break;
	}//end switch
	

function saveMessage(){
	global $tableName, $link, $sql;

	$authorName = $_REQUEST["authorName"];
	$textMessage = $_REQUEST["textMessage"];
	$clientDate = $_REQUEST["date"];
	$serverDate = date(DATE_ATOM);
	$ip = $_SERVER["REMOTE_ADDR"];
	
	$query = $sql["createTable"];
	if (mysql_query($query, $link) ) {
		echo "table $tableName was created....<br>";

		$query = $sql["insertMessage"];
		$query = str_replace("{{authorName}}", $authorName, $query);
		$query = str_replace("{{textMessage}}", $textMessage, $query);
		$query = str_replace("{{client_date}}", $clientDate, $query);
		$query = str_replace("{{server_date}}", $serverDate, $query);
		$query = str_replace("{{ip}}", $ip, $query);
		
		if (mysql_query($query, $link) ) {
			echo "record was inserted....<br>";
		} else {
			echo "error INSERT: " . mysql_error() . "<br>";
			echo "SQL: " . $sql . "<br>";
			return false;
		}
		
	} else {
		echo "error CREATE TABLE $tableName: " . mysql_error() . "<br>";
		echo "SQL: " . $sql . "<br>";
		return false;
	}				
}//end saveMessage()	

// function get_db_data( $sql ){
	// $data = array();
	// $res = mysql_query($sql) or die( "Ошибка при выполнении запроса $sql, ".mysql_error() );
	// for( $n = 0; $n < mysql_num_rows ($res); $n++){
		// $row = mysql_fetch_object($res);
// //echo "<pre>";
// //print_r ($row);
// //echo "</pre>";
		// $data[] = $row;
	// }//next row
	
	// return $data;
// }//end get_db_data()

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