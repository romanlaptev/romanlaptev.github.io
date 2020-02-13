<?php

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

if (!isset($_REQUEST['old_name']) || empty($_REQUEST['old_name'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'old_name'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

if (!isset($_REQUEST['new_name']) || empty($_REQUEST['new_name'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'new_name'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

$oldfile = $_REQUEST['old_name'];
$newfile = $_REQUEST['new_name'];

$logMsg["eventType"] = "success";
$logMsg["message"] = "";

if (rename ($oldfile,$newfile) ) {
	$logMsg["message"] .= "<span class='msg-success'><b>Rename</b> $oldfile to $newfile</span><br>";
} else {
	$logMsg["message"] .= "<span class='msg-error'>Cannot <b>rename</b> $oldfile to $newfile</span><br>";
}

$jsonStr = json_encode($logMsg);
echo $jsonStr;
?>