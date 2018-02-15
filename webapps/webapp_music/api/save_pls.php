<?php
	if( empty($_REQUEST['filename']) )
	{
		$message .= "<p class='alert alert-error'>error, empty filename</p>";
		echo $message;
		exit ();
	}

	if( empty($_REQUEST['playlist']) )
	{
		$message .= "<p class='alert alert-error'>error, empty playlist</p>";
		echo $message;
		exit ();
	}

	$filename = $_REQUEST['filename'];

//echo "Test!!!!!!!!!!". function_exists("json_encode");	
	if ( function_exists("json_encode") == 1){
		//https://www.abeautifulsite.net/using-json-encode-and-json-decode-in-php4
		//http://www.epigroove.com/blog/how-to-use-json-in-php-4-or-php-51x
		//https://gist.github.com/jorgeatorres/1239453
//echo "error, not support function json_encode(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5.2.0";
$msg = "<p class='alert alert-error'>error, not support function json_encode(). incorrect PHP version - ".phpversion().", need PHP >= 5.2.0</p>";
		echo $msg;
		exit ();
	}
	
	//if ( function_exists("json_encode") ){
		
		//PHP 5 >= 5.2.0
		$json_string = json_encode( $_REQUEST['playlist'] );
		switch ( json_last_error() ) {
			case JSON_ERROR_NONE:
				$num_bytes = file_put_contents ($filename, $json_string);
				if ($num_bytes > 0)
				{
	$message .= "<p class='alert alert-success'>Write ".$num_bytes." bytes  in ".$filename . "</p>";
				}
				else
				{
	$message .= getcwd();
	$message .= "<p class='alert alert-error'>Write error in ".$filename."</p>";
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
		}
		echo $message;
		
	//} else {
		
		// //https://www.abeautifulsite.net/using-json-encode-and-json-decode-in-php4
		// //http://www.epigroove.com/blog/how-to-use-json-in-php-4-or-php-51x
		// //https://gist.github.com/jorgeatorres/1239453
// //echo "error, not support function json_encode(). incorrect PHP version - ".$_vars["config"]["phpversion"].", need PHP >= 5.2.0";
// $msg = "<p class='alert alert-error'>error, not support function json_encode(). incorrect PHP version - ".phpversion().", need PHP >= 5.2.0</p>";
		// echo $msg;
		// exit ();
	// }
	
?>
