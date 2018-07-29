<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

echo getcwd();
echo "<br>";
//echo __FILE__;

echo "<pre>";
print_r($_REQUEST);
//print_r($_FILES);
echo "</pre>";

if ( empty($_REQUEST["remote_url"]) )
{
	echo "error, need remote_url";	
	echo "<br>";	
	exit;
}
$remote_url = $_REQUEST["remote_url"];

$file_headers = @get_headers($remote_url);
echo "<pre>";
print_r($file_headers);
echo "</pre>";

if($file_headers[0] == 'HTTP/1.1 404 Not Found') 
{
    $exists = false;
	exit;
}

$local_file = basename($remote_url);
if ( !empty($_REQUEST["xml_file"]) )
{
	$local_file = $_REQUEST["xml_file"];
}

$download_folder = "./xml";
//====================================
echo "<pre>";
print_r( get_loaded_extensions() );
echo "</pre>";

if (function_exists('curl_init')) 
{
/*
echo "<pre>";
print_r( curl_version() );
echo "</pre>";
*/
	$info = curl_version();
	echo "CURL enabled, version - ".$info["version"];
	echo "<br>";	

	$local_file = $download_folder."/".$local_file;
	if ( download_remote_file_with_curl($remote_url, $local_file) )
	{
echo "$local_file saved....";	
echo "<br>";	
	}
	else
	{
echo "error, $local_file dont save!!!";	
echo "<br>";	
	}

} 
else 
{
	echo 'no CURL';
	echo "<br>";	
}

//====================================

function download_remote_file_with_curl($file_url, $save_to)
{
	$res=false;
	if( $curl = curl_init() ) 
	{
echo "curl_init";
echo "<br>";
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_URL, $file_url); 
	
//При установке этого параметра в ненулевое значение CURL будет возвращать результат, а не выводить его		
		//curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
		$file_content = curl_exec( $curl );
		curl_close( $curl );

		$downloaded_file = fopen($save_to, 'w');
		if ( fwrite($downloaded_file, $file_content) )
		{
			$res=true;
		}
		fclose($downloaded_file);

		return $res; 

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
		return $res; 
	}


}//-------------------- end func

?>

