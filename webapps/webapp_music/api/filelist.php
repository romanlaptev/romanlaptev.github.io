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

if (!isset($_REQUEST['dir']) ){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined GET parameter 'dir'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

if (!empty($_REQUEST['dir']) ){
	$dir = $_REQUEST['dir'];
} else {
	$dir = "/";
}


if (is_dir($dir)) {
	$files = DirFiles($dir, $media_types);
	if ( empty($files) ){
		$logMsg["eventType"] = "warning";
		//$logMsg["code"] = "empty_dir";
		$logMsg["message"] = "warning, empty file list, directory: <b>".$dir."</b>";
		$jsonStr = json_encode($logMsg);
		echo $jsonStr;
		exit;
	}
	echo json_encode($files);
	
} else {
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "fail, <b>".$dir."</b> is not directory...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
}

function DirFiles($dir, $media_types){
	$files = array(); 
	$handle = opendir($dir) or die("Can't open directory $dir"); 
//echo $handle;
	while (false !== ( $file = readdir($handle) ) ) {
		if ($file != "." && $file != "..") { 
		
			if(is_dir($dir."/".$file)) { 
				$obj=new stdClass(); 
				$obj->name=$file; 
				//$obj->fs_path=$dir."/".$file;
				$files['subfolders'][] = $obj; 
				//$files['subfolders'][] = ($dir."/".$file); 
			} else { 
				//$filename_arr = explode(".", $file);
				//$type = end($filename_arr);
				//if (in_array($type, $media_types))
				//{
					$obj=new stdClass(); 
					$obj->name=$file; 
					$files['files'][] = $obj; 
					//$files['files'][] = $dir."/".$file; 
				//}
			}
			
		} 
	}//next
									     
	closedir ($handle);
	return $files;
}// end func

?>