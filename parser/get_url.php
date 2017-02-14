<?php
	$html=file_get_contents("https://drive.google.com/folderview?hl=ru&id=0B0l5s_9HQLzzTzBfTzFtRVVyNlU#list");
	//echo htmlspecialchars($html);
	echo $html;

/*
       $url = "http://www.test.com";
       $ch = curl_init();
       $timeout = 5; // set to zero for no timeout
       curl_setopt ($ch, CURLOPT_URL, $url);
       curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
       $file_contents = curl_exec($ch);
       curl_close($ch);
*/

/*
$fp = fsockopen("www.google.com", 80, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)<br />\n";
} else {
    $out = "GET / HTTP/1.1\r\n";
    $out .= "Host: www.google.com\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);
    while (!feof($fp)) {
        echo fgets($fp, 128);
    }
    fclose($fp);
} 
*/
?> 
