<?php
//phpinfo();
//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;

//$logMsg = "PHP version: ".phpversion();
//_log( $logMsg );

echo 2+2;

$_vars=array();

$msg = "error, not support function json_encode(). incorrect PHP version - ".phpversion().", need PHP >= 5.2.0";
$_vars["log"][] = "{\"error_code\" : \"notSupportJSON\", \"message\" : \""+$msg+"\"}";
//formJSON();

//output log in JSON format
function formJSON(){
	global $_vars;
	
	if( count( $_vars["log"] ) > 0){
		 $logStr = "[";
		for( $n = 0; $n < count( $_vars["log"] ); $n++){
			if( $n > 0){
				$logStr .= ", ";
			}
			$logStr .= $_vars["log"][$n];
		}
		$logStr .="]";
		// logStr = logStr.Replace("\\", "&#92;");//replace slash			
		//$logStr = str_replace("`", "&#39", $logStr);//replace apostrophe
		echo $logStr;
	}
}//end formJSON()

?>
