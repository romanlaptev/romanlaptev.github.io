<?php
//header("Access-Control-Allow-Credentials: true ");
//header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-Auth-Token, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Origin");
//header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-Powered-By,  Cache-Control, Origin");
//header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Origin: *");

//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

//$media_types = array("wav","mp3","MP3","ogg","avi","wmv","mkv","m4a","mpg","mp4","m4v","flv","flac");

if (!empty($_REQUEST['dir']) )
{
	$dir = $_REQUEST['dir'];
}
else
{
	exit;
}

$files = DirFiles($dir, $media_types);
echo json_encode($files);

function DirFiles($dir, $media_types)
{
	$files = array(); 
	
	if ( !is_dir( $dir ) ) {
		$files["log"][] = "Not find directory $dir";
//exit();
		$dir = ".";
	}
	
	
	//$handle = opendir($dir) or die("Can't open directory $dir"); 
	if ( !$handle = opendir( $dir ) ) {
echo "Can't open directory $dir"; 
exit();
	}
	
	while (false !== ($file = readdir($handle))) 
	{
	    if ($file != "." && $file != "..") 
		{ 
			if(is_dir($dir."/".$file)) 
			{ 
				$files['subfolders'][] = ($dir."/".$file); 
			} 
			else 
			{ 
				//$filename_arr = explode(".", $file);
				//$type = end($filename_arr);
				//if (in_array($type, $media_types))
				//{
					$files['files'][] = $dir."/".$file; 
				//}
			} 
		} 
	}//--------------------------- end while
									     
	closedir ($handle);
	return $files;
}//-------------------- end func

?>
