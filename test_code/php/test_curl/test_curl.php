<?php
//http://easy-code.ru/lesson/advanced-curl-php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

// $file_headers = @get_headers($remote_url);
// echo "<pre>";
// print_r($file_headers);
// echo "</pre>";
// if($file_headers[0] == 'HTTP/1.1 404 Not Found') 
// {
    // $exists = false;
	// exit;
// }

$url = "https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&format=json&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-11-26&transport_types=suburban&system=esr&show_systems=esr";

//$url = "http://vbox5/sites/romanlaptev.github.io/";

//====================================
echo "loaded_extensions:<pre>";
print_r( get_loaded_extensions() );
echo "</pre>";


if (function_exists("curl_init") ) 
{
// echo "<pre>";
// print_r( curl_version() );
// echo "</pre>";

	$curlVersion = curl_version();
	echo "CURL enabled, version - ".$curlVersion["version"];
	echo "<br>";	

	if( $curl = curl_init() ) 
	{
echo "curl_init";
echo "<br>";

		//curl_setopt( $curl, CURLOPT_POST, true);
		curl_setopt( $curl, CURLOPT_URL, $url); 
		//curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,5);
		//curl_setopt($curl, CURLOPT_TIMEOUT, 5);
	
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt( $curl, CURLOPT_HEADER, 0);
		
		$result = curl_exec( $curl );
		//if ($result === FALSE) {
			//echo "cURL Error: " . curl_error($ch);
		//}
echo "result: ".$result;
echo "<br>";

		$curlError = curl_error($curl);
echo "curlError: ".$curlError;
echo "<br>";

		$curlErrorNo = curl_errno($curl);
echo "curlErrorNo: ".$curlErrorNo;
echo "<br>";
		
		$httpCode  = curl_getinfo($curl, CURLINFO_HTTP_CODE);
echo "httpCode: ".$httpCode;
echo "<br>";

		curl_close( $curl );
	}
	else
	{
		echo "curl_init error!!!";
		echo "<br>";
		
		echo curl_error( $curl );
		echo "<br>";
		
		echo curl_errno( $curl );
		echo "<br>";
		
		echo curl_getinfo( $curl, CURLINFO_HTTP_CODE);
		echo "<br>";
	}

} 
else 
{
	echo "no CURL support...";
	echo "<br>";	
}
?>