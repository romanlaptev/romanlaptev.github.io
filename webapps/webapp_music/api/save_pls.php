<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";
//exit;

if (!isset($_REQUEST['filename']) || empty($_REQUEST['filename'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined parameter 'filename'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

if (!isset($_REQUEST['playlist']) || empty($_REQUEST['playlist'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined parameter 'playlist'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

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
	
	$filename = $_REQUEST['filename'];
	$json_string = json_encode( $_REQUEST['playlist'] );
		
	if ( !function_exists("json_last_error") ){ //PHP 5 >= 5.3.0
		$logMsg["eventType"] = "error";
		//http://php.net/manual/ru/function.json-encode.php
		$logMsg["message"] = "<p>error, not support function <b>json_last_error()</b>. incorrect PHP version - ".phpversion().", need PHP >= 5.3.0</p>";
		
		$num_bytes = file_put_contents ($filename, $json_string);
		if ($num_bytes > 0){
			$logMsg["message"] .= "<p>Write ".$num_bytes." bytes  in ".$filename . "</p>";
		} else {
			$logMsg["message"] .= getcwd();
			$logMsg["message"] .= "<p>Write error in ".$filename."</p>";
		}
		$jsonStr = '{"eventType": "'.$logMsg["eventType"].'", "message": "'.$logMsg["message"].'"}';
		echo $jsonStr;
		exit ();
	}
		
	switch ( json_last_error() ) {
		case JSON_ERROR_NONE:
			$logMsg["eventType"] = "success";
			
			$num_bytes = file_put_contents ($filename, $json_string);
			if ($num_bytes > 0){
$logMsg["message"] = "<p>Write ".$num_bytes." bytes  in ".$filename . "</p>";
			} else {
$logMsg["eventType"] = "error";
$logMsg["message"] = getcwd();
$logMsg["message"] = "<p>Write error in ".$filename."</p>";
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
			echo ' - Достигнута максимальная глубина стека';
		break;
		case JSON_ERROR_STATE_MISMATCH:
			echo ' - Некорректные разряды или не совпадение режимов';
		break;
		case JSON_ERROR_CTRL_CHAR:
			echo ' - Некорректный управляющий символ';
		break;
		case JSON_ERROR_SYNTAX:
			echo ' - Синтаксическая ошибка, не корректный JSON';
		break;
		case JSON_ERROR_UTF8:
			echo ' - Некорректные символы UTF-8, возможно неверная кодировка';
		break;
		default:
			echo ' - Неизвестная ошибка';
		break;
	}//end switch
	
	$jsonStr = '{"eventType": "'.$logMsg["eventType"].'", "message": "'.$logMsg["message"].'"}';
	echo $jsonStr;
	
?>