<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//===================== INIT vars
$_vars=array();

//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;
$_vars["phpversion"] = phpversion();

$filename = "import_lib.xml";
$sqlite_path = "sqlite:/home/www/sites/lib/cms/db/lib.sqlite";

$_vars["sql"]["getNodeTypes"] = "SELECT * FROM node_type;";


//=====================
//echo "REMOTE_ADDR: ".$_SERVER["REMOTE_ADDR"];
//echo "<br>";

//http://php.net/php_sapi_name
//apache2handler
//cli

$_vars["runType"] = "";

$sapi_type = php_sapi_name();
if ( $sapi_type == 'apache2handler') {
	$_vars["runType"] = "web";
}
if ( $sapi_type == 'cli') {
	$_vars["runType"] = "console";
}

if (!empty($_REQUEST['run_type']) )	{
	$_vars["runType"] = $_REQUEST['run_type'];
}

//=================================== WEB run
if ( $_vars["runType"] == "web") {

//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//print_r($_vars);
//echo "</pre>";
//exit();

	
	if (empty($_REQUEST['action']))	{
		viewForm();
	} else {
		$action = $_REQUEST['action'];
echo "<pre>";
print_r($_REQUEST);
echo "</pre>";
		
		switch ($action) {
			case "import":
				if (!empty($_REQUEST['filename']))	{
					$_vars["filename"] = $_REQUEST['filename'];
					$_vars["sqlite_path"] = $_REQUEST['sqlite_path'];
					
					$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
getNodeType();
				}
			break;
		}//end switch

	}//end elseif
	
}

//==================================== CONSOLE run
if ( $_vars["runType"] == "console") {
//print_r($argv);
//$_SERVER["argv"]
$_vars["console"] = true;

	echo "import book info to DB (lib.sqlite)\n";
	echo "PHP version: ".$_vars["phpversion"]."\n";
echo "SAPI name: ".php_sapi_name();
echo "\n";
echo "PHP_SAPI: ".PHP_SAPI;
echo "\n";

	//$_vars["filename"] = $filename;
	//$_vars["sqlite_path"] = $sqlite_path;
	
	//$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
	
}


//====================
// FUNCTIONS
//====================
function _log( $message ){
	global $_vars;
	if ( $_vars["runType"] == "console") {
		echo $message;
	}
}//end _log()

function runSql($db,  $query){
	$result = $db->query($query);
	//$result->setFetchMode(PDO::FETCH_ASSOC);
	$result->setFetchMode(PDO::FETCH_OBJ);
	$resultData = $result->fetchAll();
	return $resultData;
}//end runSql()


function getNodeType() {
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getNodeTypes"];
_log("-- get node types\n");

	$res = runSql($db,  $sql);
echo "res = <pre>";
print_r($res);
echo "</pre>";
} //end getNodeType()


function viewForm(){
	global $_vars;
	global $sqlite_path;
	global $filename;

echo "
<html>
<head>
	<meta http-equiv='content-type' content='text/html; charset=utf-8'/>
	<link rel='stylesheet' href='../css/bootstrap336.min.css'/>
</head>
<body>

<div class='container'>
	<div class='page-header'>
		<h2>Import book info to database lib.sqlite</h2>
	</div>
	
	<form method=post name='form_import' action='' class='form'>
		<fieldset>
		
<legend>Import params:</legend>
		<div class=class='form-group'>
 
<label>filename</label>
<input 
type='text'
name='filename'
value='".$filename."'
class='form-control'/>
<br>

<label>sqlite_path</label>
<input 
class='form-control'
type='text' 
name='sqlite_path' 
value='".$sqlite_path."'/>
<br>

		</div>

		<input type=hidden name='action' value='import'/>
		<input type=submit value='Import' class='btn btn-large btn-primary'>
		</fieldset>
	</form>
	
	<pre>PHP version: ".$_vars["phpversion"]."</pre>
	<pre>SAPI name: ".php_sapi_name()."</pre>
	
</div>

</body>
</html>
";

}//end viewForm()

?>