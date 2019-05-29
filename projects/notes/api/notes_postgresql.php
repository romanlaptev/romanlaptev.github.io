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

include("auth_postgresql.php");
//if( $_SERVER["SERVER_NAME"] !== "romanlaptev.herokuapp.com"){
	//$_vars["config"]["dbName"] = "notes";
//}

$_vars["config"]["phpversion"] = phpversion();
$_vars["export"]["filename"] = "notes.xml";
$_vars["uploadPath"] = "upload";

$_vars["config"]["tableName"] = "notes";

$_vars["sql"]["createDB"] = "";
$_vars["sql"]["createTable"] = 'CREATE TABLE IF NOT EXISTS "public"."notes" (
	"id" SERIAL,
	"author" character(20) NOT NULL,
	"title" character(255),
	"text_message" text,
	"client_date" date,
	"server_date" date,
	"ip" character(20),
	CONSTRAINT "notes_pkey" PRIMARY KEY (id)
) WITHOUT OIDS;';

$_vars["sql"]["removeTable"] = 'DROP TABLE '.$_vars["config"]["tableName"];

$_vars["sql"]["insertNote"] = "INSERT INTO notes (\"author\", \"title\", \"text_message\", \"client_date\", \"server_date\", \"ip\") 
VALUES (
'{{authorName}}', 
'{{title}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
);";

$_vars["sql"]["insertAll"] = "INSERT INTO ".$_vars["config"]["tableName"]." VALUES {{values}};";
$_vars["sql"]["insertValues"] = "(
default, 
'{{authorName}}', 
'{{title}}', 
'{{textMessage}}',
'{{client_date}}', 
'{{server_date}}', 
'{{ip}}'
)";

$_vars["sql"]["updateNote"] = "UPDATE ".$_vars["config"]["tableName"]." SET 
author = '{{authorName}}', 
title = '{{title}}', 
text_message = '{{textMessage}}',
client_date = '{{client_date}}', 
server_date = '{{server_date}}', 
ip = '{{ip}}' WHERE id={{id}}";

$_vars["sql"]["getNotes"] = 'SELECT id, author, title, text_message, client_date, server_date, ip FROM '.$_vars["config"]["tableName"].' ORDER BY "client_date" DESC';
$_vars["sql"]["deleteNote"] = 'DELETE FROM '.$_vars["config"]["tableName"].' WHERE "id"={{id}};';
$_vars["sql"]["clearNotes"] = "TRUNCATE TABLE ".$_vars["config"]["tableName"].";";

$_vars["log"] = array();

	$action = "";
	if( !empty($_REQUEST['action']) ){
		$action = $_REQUEST['action'];
	} else {
		$_vars["log"][] = "{\"error_code\" : \"noaction\", \"message\" : \"error, undefined var 'action'\"}";
	}
	
//========================================= connect to server
	if (!defined('PDO::ATTR_DRIVER_NAME')) {
exit();		
	} else {
		$_vars["usePDO"] = 1;
		$_vars["link"] = connectDbPDO();
		createTable();
	}
	
	switch ($action){
		case "save_note":
			saveNote();
		break;
		
		case "get_notes":
			$notes = getNotes();
//echo count($notes);	
//echo "<pre>";	
//print_r($notes);
//echo "</pre>";
			if( count($notes) > 0 ){
					if ( function_exists("json_encode") ){
						//PHP 5 >= 5.2.0
						$json = json_encode($notes);
						
						//restore formatting after json_encode
						$json = str_replace("&amp;gt;", "&gt;", $json);
						$json = str_replace("&amp;lt;", "&lt;", $json);
						$json = str_replace("&amp;quot;", "&quot;", $json);

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
	
	unset ($_vars["link"]);
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


//======================================== create table (CREATE TABLE IF NOT EXISTS)
function createTable(){
	global $_vars;
	
	$tableName = $_vars["config"]["tableName"];
	$query = $_vars["sql"]["createTable"];
	$msg_success = "$tableName created succesfully, ". "SQL: " . $query;
	
	$connection = $_vars["link"];
	try{
		$connection->query( $query );
//echo $msg_success;
	} catch( PDOException $exception ){
		print_r($connection->errorInfo(), true);
		echo $exception->getMessage();
		exit();
	}
	
}//end createTable()


function getNotes(){
	global $_vars;
	
	$messages = array();
	$query = $_vars["sql"]["getNotes"];
	
	$connection = $_vars["link"];
	$result  = $connection->query( $query ) or die( print_r($connection->errorInfo(), true) );
	$messages  = $result->fetchAll( PDO::FETCH_OBJ );
// echo count($messages);	
// echo "<pre>";	
// print_r($messages);
// echo "</pre>";	
	return $messages;
		
}//end getNotes()	


function deleteNote( $id ){
	global $_vars;

	$query = $_vars["sql"]["deleteNote"];
	$query = str_replace("{{id}}", $id, $query);
//echo $query;
	$msg_success = "record $id was deleted, ". "SQL: " . $query;

	$connection = $_vars["link"];
	try{
		$connection->query( $query );
		$_vars["log"][] = "{\"message\" : \"$msg_success\"}";
	} catch( PDOException $exception ){
		print_r($connection->errorInfo(), true);
		echo $exception->getMessage();
		exit();
	}
		
}//end deleteNote()	

function clearNotes(){
	global $_vars;
	$query = $_vars["sql"]["clearNotes"];
	$msg_success = "clear notes, ". "SQL: " . $query;
	
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
}//end removeNotes()


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
	$title = addslashes( htmlspecialchars($_REQUEST["title"]) );
	$textMessage = addslashes( htmlspecialchars($_REQUEST["text_message"]) );
	
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

	if($_vars["usePDO"] == 1){
		$connection = $_vars["link"];
		try{
			$connection->query( $query );
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
		
		$textMessage = str_replace("\'", "&#39;", $textMessage);//replace \' by apostrophe
		
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
	
echo "Records added, ". "SQL: " . $query;
	$msg_success = "Records added.";

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

?>