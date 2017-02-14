<?php
	if( empty($_REQUEST['filename']) )
	{
		$message .= "<p class='error'>error, empty filename</p>";
		echo $message;
		exit ();
	}

	if( empty($_REQUEST['json']) )
	{
		$message .= "<p class='error'>error, empty json playlist</p>";
		echo $message;
		exit ();
	}

	$filename = $_REQUEST['filename'];
	$json_string = json_encode( $_REQUEST['json'] );
	switch ( json_last_error() ) {
		case JSON_ERROR_NONE:
			$num_bytes = file_put_contents ($filename, $json_string);
			if ($num_bytes > 0)
			{
$message .= "<p class='ok'>Write ".$num_bytes." bytes  in ".$filename . "</p>";
			}
			else
			{
$message .= getcwd();
$message .= "<p class='error'>Write error in ".$filename."</p>";
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
?>
