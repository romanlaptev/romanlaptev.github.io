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

$action = "";
if( !empty($_REQUEST['action']) ){
	$action = $_REQUEST['action'];
} else {
	$_vars["log"][] = "{\"error_code\" : \"noaction\", \"message\" : \"error, undefined var 'action'\"}";
}

switch ($action){
	case "save_message":
		//saveNote();
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";
	break;
	
	case "upload":
		//uploadFile();
echo "<pre>";
print_r ($_REQUEST);
print_r($_FILES);
echo "</pre>";
	break;
	
	default:
		$_vars["log"][] = "{\"error_code\" : \"wrong_action\", \"message\" : \"wrong action...\"}";
	break;
}//end switch

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

/*
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
*/

/*
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
*/
?>