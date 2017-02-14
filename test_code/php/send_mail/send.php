<?php
//echo "<pre>";
//print_r ($_REQUEST);
//echo "</pre>";

//session_start();

//	if(isset($_SESSION['captcha_keystring']) && 
//		$_SESSION['captcha_keystring'] ==  $_REQUEST['code'])
//	{
//echo "Correct code";
//echo "<br>";
		if( !empty($_REQUEST['email']) && !empty($_REQUEST['message']) )
		{
			if(!empty($_REQUEST['email']))
			{
				$from=$_REQUEST['email'];
			}
			if(!empty($_REQUEST['message']))
			{
				$message=$_REQUEST['message'];
			}

$to_addr = "roman-laptev@yandex.ru";
$subject="test message from ".$from;
$headers = "MIME-Version: 1.0\r\n";
$headers .= 'Content-Type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: ' . $from . "\r\n";
$body .= $message."<br>".$from;


			if ( mail($to_address, $subject, $body, $headers) )
			{
				echo '1';
			}
			else
			{
				echo '0';
			}

		}
//	}
//	else
//	{
//echo "Wrong code";
//echo "<br>";
//	}

//unset($_SESSION['captcha_keystring']);


?>
