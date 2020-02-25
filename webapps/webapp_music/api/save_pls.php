<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";
//exit;

//https://www.abeautifulsite.net/using-json-encode-and-json-decode-in-php4
//http://www.epigroove.com/blog/how-to-use-json-in-php-4-or-php-51x
//https://gist.github.com/jorgeatorres/1239453
if ( !function_exists("json_encode") ){//PHP 5 >= 5.2.0
		$logMsg["eventType"] = "error";
		$logMsg["message"] = "error, not support function <b>json_encode()</b>. incorrect PHP version - ".phpversion().", need PHP >= 5.2.0";
		$jsonStr = '{"eventType": "'.$logMsg["eventType"].'", "message": "'.$logMsg["message"].'"}';
		echo $jsonStr;
		exit ();
}

if (!isset($_REQUEST['filename']) || empty($_REQUEST['filename'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'filename'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

if (!isset($_REQUEST['playlist']) || empty($_REQUEST['playlist'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'playlist'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

	$filename = $_REQUEST['filename'];
	$json_string = json_encode( $_REQUEST['playlist'] );
		
	if ( !function_exists("json_last_error") ){ //PHP 5 >= 5.3.0
		$logMsg["eventType"] = "error";
		//http://php.net/manual/ru/function.json-encode.php
		$logMsg["message"] = "<p>error, not support function <b>json_last_error()</b>. incorrect PHP version - ".phpversion().", need PHP >= 5.3.0</p>";
		
		$dir = dirname( $filename );
		$perms = substr(sprintf('%o', fileperms( $dir ) ), -4);
		if (is_writable( $dir )){
			$num_bytes = file_put_contents ($filename, $json_string);
			if ($num_bytes > 0){
				$logMsg["message"] .= "Write ".$num_bytes." bytes  in ".$filename;
			} else {
				//$logMsg["message"] .= getcwd();
				$logMsg["message"] .= "Write error in ".$filename;
			}
		} else {
$logMsg["eventType"] = "error";
$logMsg["message"] = "Cannot write $dir, access rights: $perms";
		}
		
		$jsonStr = '{"eventType": "'.$logMsg["eventType"].'", "message": "'.$logMsg["message"].'"}';
		echo $jsonStr;
		exit ();
	}

//https://www.php.net/manual/en/function.json-last-error.php
	switch ( json_last_error() ) {
		case JSON_ERROR_NONE:
			$logMsg["eventType"] = "success";

			$dir = dirname( $filename );
			if ( !is_dir($dir)) {
				$logMsg["eventType"] = "error";
				$logMsg["message"] = "fail, <b>".$dir."</b> not a directory...";
				$jsonStr = json_encode($logMsg);
				echo $jsonStr;
				exit ();
			}
			
			$perms = substr(sprintf('%o', fileperms( $dir ) ), -4);
			if (is_writable( $dir )){

				$num_bytes = file_put_contents ($filename, $json_string);
				if ($num_bytes > 0){
	$logMsg["message"] = "Write ".$num_bytes." bytes  in ".$filename ;
				} else {
					$logMsg["eventType"] = "error";
					$logMsg["message"] = "Write error in ".$filename;
					$perms = substr(sprintf('%o', fileperms( $filename ) ), -4);
					$logMsg["message"] .= ", access rights: $perms";
				}

			} else {
$logMsg["eventType"] = "error";
$logMsg["message"] = "Cannot write $dir, access rights: $perms";
			}
			
/*
		header('Content-Type: application/json');
		header('Content-Disposition: attachment; filename='.$filename.'');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: '.strlen($json_string;) );
		echo $json_string;;
*/
		break;
		
		case JSON_ERROR_DEPTH:
$logMsg["eventType"] = "error";
$logMsg["message"] = "The maximum stack depth has been exceeded";
			//echo "The maximum stack depth has been exceeded";//' - Достигнута максимальная глубина стека';
		break;

		case JSON_ERROR_STATE_MISMATCH:
$logMsg["eventType"] = "error";
$logMsg["message"] = "Invalid or malformed JSON";
			//echo "Invalid or malformed JSON";//' - Некорректные разряды или не совпадение режимов';
		break;

		case JSON_ERROR_CTRL_CHAR:
$logMsg["eventType"] = "error";
$logMsg["message"] = "Control character error, possibly incorrectly encoded";
			//echo "Control character error, possibly incorrectly encoded";//'- Некорректный управляющий символ';
		break;

		case JSON_ERROR_SYNTAX:
$logMsg["eventType"] = "error";
$logMsg["message"] = "Syntax error";
			//echo "Syntax error";//' - Синтаксическая ошибка, не корректный JSON';
		break;
		
		case JSON_ERROR_UTF8:
$logMsg["eventType"] = "error";
$logMsg["message"] = "Malformed UTF-8 characters, possibly incorrectly encoded";
			//echo "Malformed UTF-8 characters, possibly incorrectly encoded";//' - Некорректные символы UTF-8, возможно неверная кодировка';
		break;
		
		case JSON_ERROR_RECURSION:
$logMsg["eventType"] = "error";
$logMsg["message"] = "One or more recursive references in the value to be encoded";
//One or more recursive references in the value to be encoded 	PHP 5.5.0
		break;

		case JSON_ERROR_INF_OR_NAN:
$logMsg["eventType"] = "error";
$logMsg["message"] = "One or more NAN or INF values in the value to be encoded";
//One or more NAN or INF values in the value to be encoded 	PHP 5.5.0
		break;

		case JSON_ERROR_UNSUPPORTED_TYPE:
$logMsg["eventType"] = "error";
$logMsg["message"] = "A value of a type that cannot be encoded was given";
//A value of a type that cannot be encoded was given 	PHP 5.5.0
		break;

		case JSON_ERROR_INVALID_PROPERTY_NAME:
$logMsg["eventType"] = "error";
$logMsg["message"] = "A property name that cannot be encoded was given";
//A property name that cannot be encoded was given 	PHP 7.0.0
		break;

		case JSON_ERROR_UTF16:
$logMsg["eventType"] = "error";
$logMsg["message"] = "Malformed UTF-16 characters, possibly incorrectly encoded";
//Malformed UTF-16 characters, possibly incorrectly encoded 	PHP 7.0.0
		break;
		
		default:
$logMsg["eventType"] = "error";
$logMsg["message"] = "json_last_error(), Unknown error";
			//echo "Unknown error";//' - Неизвестная ошибка';
		break;
	}//end switch
	
	$jsonStr = '{"eventType": "'.$logMsg["eventType"].'", "message": "'.$logMsg["message"].'"}';
	echo $jsonStr;
	
?>