<?php
//****************************************
// Загрузить файл в текущий каталог
//****************************************

//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//print_r($_SESSION);
//print_r ($_COOKIE);
//print_r ($_FILES);
//echo "</pre>";

error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

$vars=array();
$vars["max_filesize"] = ini_get('upload_max_filesize'); 

$vars["request"] = $_REQUEST;
if( empty($_REQUEST['action'])){
	$vars["request"]["action"]=""; 
}
$vars["files"] = $_FILES;
$vars["log"] = "<div class='alert alert-info'>test</div>";

?>
<!DOCTYPE html>
<html>
<head>
	<title>test upload</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=10">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">	
</head>

<body>
	<div class="container">
		<div class="page-header">
			<h3>Test upload file to server</h3>
		</div>

	<div class="panel">
		<form method="post" enctype="multipart/form-data" action="" target="">
			upload_dir: <input name="upload_dir" class="form-conrol" type="text"  value="/mnt/d2/temp">
			<input name="upload_file" class="form-conrol" type="file" >
			<input type="hidden" name="action" value="upload">
			<input type="submit" value="upload">
		</form>
		<p><small>upload_max_filesize = <?php echo $vars["max_filesize"] ?></small></p>
	</div>



<?php
	if ($vars["request"]["action"] == "upload"){

		if ( empty(  $vars["request"]["upload_dir"] ) ){
			$vars["log"] = logAlert("error, empty parameter <b>'upload_dir'</b>...", "error");
		} else {
			$vars["log"] = uploadFile();
		}
	}

function uploadFile(){
	global $vars;
	$log="";

	$vars["uploadDir"] = $vars["request"]["upload_dir"];
	$perms = substr(sprintf('%o', fileperms( $vars["uploadDir"] ) ), -4);


	if ( !is_writable( $vars["uploadDir"] )){
$msg = "Can not write to <b>" .$vars["uploadDir"]."</b> (". $perms.") ";
$log .= logAlert($msg, "error");
	} else {
		$file_arr = $vars["files"]["upload_file"];
		$errors ="";
		switch ($file_arr['error']){
				case 0:
$msg = "<p>UPLOAD_ERR_OK</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
					if ( is_uploaded_file ($file_arr['tmp_name']) )	{
						$uploaded_file = $vars["uploadDir"]."/".$file_arr['name'];
						if ( move_uploaded_file( $file_arr['tmp_name'], $uploaded_file ) )	{
$msg .= $file_arr['name'].", size= ".$file_arr['size']." bytes was uploaded successfully";
$log .= logAlert($msg, "success");
						} else {
$msg .= $file_arr['name'].", size= ".$file_arr['size']." bytes was not uploaded";
$log .= logAlert($msg, "error");
						}
					}
				break;

					case 1:
$msg = "<p>UPLOAD_ERR_INI_SIZE, more than upload_max_filesize from php.ini.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 2:
$msg = "<p>UPLOAD_ERR_FORM_SIZE.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 3:
$msg = "<p>UPLOAD_ERR_PARTIAL.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 4:
$msg = "<p>UPLOAD_ERR_NO_FILE.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 6:
$msg = "<p>UPLOAD_ERR_NO_TMP_DIR.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 7:
$msg = "<p>UPLOAD_ERR_CANT_WRITE.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

					case 8:
$msg = "<p>UPLOAD_ERR_EXTENSION.</p>";
$msg .= "<p>Error code: " . $file_arr['error'] . "</p>";
$log .= logAlert($msg, "error");
					break;

			}// end switch

	}
	return $log;
}//end uploadFile()



function logAlert( $msg, $level){

	switch ($level) {
		case "info":
			return "<div class='alert alert-info'>".$msg."</div>";
		break;
		
		case "warning":
			return "<div class='alert alert-warning'>".$msg. "</div>";
		break;
		
		case "danger":
		case "error":
			return "<div class='alert alert-danger'>".$msg. "</div>";
		break;
		
		case "success":
			return "<div class='alert alert-success'>".$msg. "</div>";
		break;
		
		default:
			return "<div class='alert alert-info'>".$msg. "</div>";
		break;
	}//end switch

}//end logAlert()

?>

	<div class="panel log-panel">
		<div class="panel-body">
			<div id="log" class=""><?php echo $vars["log"] ?></div>
		</div>
	</div>

<pre>
<?php //print_r ($vars); ?>
</pre>

</div><!-- end container -->

</body>
</html>
