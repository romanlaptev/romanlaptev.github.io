<?php
//echo "<spanre>";
//print_r($_REQUEST);
//echo "</pre>";
//exit;

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

if (!isset($_REQUEST['file']) || empty($_REQUEST['file'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'file'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

if (!isset($_REQUEST['fs_path']) || empty($_REQUEST['fs_path'])){
	$logMsg["eventType"] = "error";
	$logMsg["message"] = "error, undefined or empty parameter 'fs_path'...";
	$jsonStr = json_encode($logMsg);
	echo $jsonStr;
	exit;
}

$file = $_REQUEST['file'];
$fs_path = $_REQUEST['fs_path'];

$logMsg["eventType"] = "success";
$logMsg["message"] = "";

for( $n1=0; $n1 < count($file); $n1++ ){
	$filename = $fs_path."/".$file[$n1];

	if( is_dir($filename) ){
		if( rmdir( $filename ) ){
			$logMsg["message"] .= "<span class='msg-success'><b>rmdir empty folder</b> $filename</span><br>";
		} else {
			$res=false;
			$res=RemoveTree($filename);
			if ($res){
				$logMsg["message"] .= "<span class='msg-success'><b>remove tree</b> $filename</span><br>";
			} else {
				$perms = substr(sprintf('%o', fileperms( $filename ) ), -4);
$logMsg["message"] .= "<span class='msg-warning'><b>cannot rmdir</b> $filename, access rights: $perms</span><br>";
			}
		}
	}

	if ( is_file($filename) ){
		if (unlink ($filename)){
			$logMsg["message"] .= "<span class='msg-success'><b>delete</b> $filename</span><br>";
		} else {
			$logMsg["message"] .= "<span class='msg-error'><b>cannot delete</b> $filename</span><br>";
		}
	}


}//next

$jsonStr = json_encode($logMsg);
echo $jsonStr;

//------------------------------------------

function RemoveTree($dir) 
{ 
	global $logMsg;

	//$handle = opendir($dir) or die("Cannot open directory $dir"); 
	if ($handle = opendir($dir) ){

		while (false !== ($file = readdir($handle))) 	{ 
			if ($file != "." && $file != "..") { 
				if( is_file($dir."/".$file) ) { 
					if( unlink($dir."/".$file) ) {
						$logMsg["message"] .= "<span class='msg-success'><b>delete</b> $file</span><br>";
					} 
				} 
				if(is_dir($dir."/".$file)) { 
					RemoveTree($dir."/".$file);
					if( rmdir($dir."/".$file) ) {
						$logMsg["message"] .= "<span class='msg-success'><b>rmdir</b> $dir."/".$file</span><br>";
					} 
				} 
				
			} 
		}//end while
		closedir($handle); 
		
		if(rmdir($dir)){
			$logMsg["message"] .= "<span class='msg-success'><b>rmdir</b> $dir</span><br>";
			return true;
		} 
		
	} else {
		$perms = substr(sprintf('%o', fileperms( $dir ) ), -4);
		$logMsg["message"] .= "<span class='msg-error'>Cannot open file system object $dir, access rights: $perms</span><br>";
	}
	
}//end

?>
