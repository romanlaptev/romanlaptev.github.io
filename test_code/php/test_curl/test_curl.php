<?php
//http://easy-code.ru/lesson/advanced-curl-php
//https://www.php.net/manual/ru/book.curl.php
//https://htmlweb.ru/php/php_curl.php
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

//$url = "https://api.rasp.yandex.net/v3.0/search/?from=851508&to=851635&format=json&apikey=b07a64bc-f237-4e79-9efb-b951ec68eaf7&date=2019-11-26&transport_types=suburban&system=esr&show_systems=esr";

//$url = "http://vbox5/sites/romanlaptev.github.io/";
$url = "https://jsonplaceholder.typicode.com/albums";

//====================================
$module_name = "curl";
//https://www.php.net/manual/ru/function.get-loaded-extensions.php
$loadedExt = get_loaded_extensions();
if ( !in_array( $module_name, $loadedExt ) ) {
	$msg = "<p>-- error, <b>".$module_name."</b> module  is not in the list of loaded extensions...</p>";
	echo $msg;
echo "loaded extensions: <pre>";
print_r( $loadedExt );
echo "</pre>";
	exit;
}

if (!extension_loaded( $module_name ) ) {
	
	if ( function_exists("dl") ){
		
		//https://www.php.net/manual/ru/function.dl.php
		if ( dl("curl.so") ) {//try dynamic load module
			//$msg = "<p>-- success, module ".$module_name." available...</p>";
			//echo $msg;
			runApp();
		} else {
			$msg = "<p>-- error, module <b>".$module_name."</b> not loaded...</p>";
			$msg .= "<p>-- failed load curl.so..</p>";
			echo $msg;
			exit;
		}
		
	} else {
		$msg = "<p>-- error, module <b>".$module_name."</b> not loaded...</p>";
		$msg .= "<p>-- failed load curl.so, not function dl()</p>";
		echo $msg;
		exit;
	}
	
} else {
	$msg = "<p>-- success, module <b>".$module_name."</b> available...</p>";
	echo $msg;
//https://www.php.net/manual/ru/function.get-extension-funcs.php
	echo "list of functions in module <b>".$module_name."</b>:<pre>";
	print_r(get_extension_funcs( $module_name ));
	echo "</pre>";
	
	runTest();
}

function runTest(){
	global $url;
	
	if (function_exists("curl_init") ) {
	// echo "<pre>";
	// print_r( curl_version() );
	// echo "</pre>";

		$curlVersion = curl_version();
echo "CURL enabled, version - ".$curlVersion["version"];
echo "<br>";	

		if( $curl = curl_init() ) {
	//echo "curl_init";
	//echo "<br>";

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
	echo "<b>Result of request to </b> ".$url.": <pre>";
	print_r( $result );
	echo "</pre>";

			$curlError = curl_error($curl);
	echo "<b>curlError</b>: ".$curlError;
	echo "<br>";

			$curlErrorNo = curl_errno($curl);
	echo "<b>curlErrorNo</b>: ".$curlErrorNo;
	echo "<br>";
			
			$httpCode  = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	echo "<b>httpCode</b>: ".$httpCode;
	echo "<br>";

			$info = curl_getinfo($curl);
	echo "<b>curl_getinfo:</b> <pre>";
	print_r( curl_version() );
	echo "</pre>";

			curl_close( $curl );
		} else {
			echo "curl_init error!!!";
			echo "<br>";
			
			echo curl_error( $curl );
			echo "<br>";
			
			echo curl_errno( $curl );
			echo "<br>";
			
			echo curl_getinfo( $curl, CURLINFO_HTTP_CODE);
			echo "<br>";
		}

	} else {
		echo "no CURL support...";
		echo "<br>";	
	}
	
}//end runTest()

?>