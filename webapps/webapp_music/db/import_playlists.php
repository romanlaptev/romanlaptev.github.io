<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//===================== INIT vars
$_vars=array();

$_vars["drupalConstFile"] = "./includes/bootstrap.inc";
$_vars["importFilename"] = "http://i5/sites/romanlaptev.github.io/webapps/webapp_music/db/list.xml";

$_vars["nodeType"] = "playlist";
$_vars["dbPrefix"] = "";
//$result = db_query('SELECT nid, foo FROM {mytable} WHERE nid IN(:nids)', array(':nids' => array_keys($nodes)));
$_vars["sql"]["getPlaylists"] = "SELECT nid, title, created, changed FROM ".$_vars["dbPrefix"]."node WHERE type='".$_vars["nodeType"]."';";


$_vars["runType"] = "";
//=========================== run type 
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


//===================== load Drupal
chdir ("../");
//echo getcwd();
//echo "<br>";

if ( !is_file( $_vars["drupalConstFile"] ) ){
	$logMsg = "error, not find Drupal constant file ".$_vars["drupalConstFile"];
	_log( $logMsg );
	exit;
}

// Define default settings.
define('DRUPAL_ROOT', getcwd() );
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Bootstrap Drupal.
require_once $_vars["drupalConstFile"];
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);


//=======================
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
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";
		
		switch ($action) {
			case "import":
				if (!empty($_REQUEST['filename']))	{
					$_vars["importFilename"] = $_REQUEST['filename'];
//startImport();
				}
			break;
		}//end switch

	}//end elseif

}


if ( $_vars["runType"] == "console") {
//print_r($argv);
//$_SERVER["argv"]
//$_vars["console"] = true;
	$logMsg = "PHP version: ".phpversion();
	_log( $logMsg );

	$logMsg = "SAPI name: ".php_sapi_name();
	_log( $logMsg );

	$logMsg = "PHP_SAPI: ".PHP_SAPI;
	_log( $logMsg );

	$logMsg = "Drupal version: ".VERSION;
	_log( $logMsg );

	startImport();
}


//====================
// FUNCTIONS
//====================

function _log( $message ){
	global $_vars;
	if ( $_vars["runType"] == "console") {
		echo $message."\n";
	}
	if ( $_vars["runType"] == "web") {
		echo "<p>".$message."</p>";
	}
}//end _log()


function startImport(){
	global $_vars;

//$node = node_load(110);
//echo "<pre>";
//print_r($node);
//echo "</pre>";
//exit;

	//--------------------------- get exists DB nodes
	$query = $_vars["sql"]["getPlaylists"];
	$result = db_query($query);
	$n1=0;
	foreach ($result as $row) {
		$_vars["dbNodes"][$n1] = $row;
		$_vars["dbNodes"][$n1]->createdTime = date("d-M-Y H:i:s", $row->created);
		$_vars["dbNodes"][$n1]->changedTime = date("d-M-Y H:i:s", $row->changed);
		$n1++;
	}//next

	$logMsg = "Count  database nodes: " . count( $_vars["dbNodes"] );
	_log( $logMsg );

	//--------------------------- load playlist XML
	$xml = simplexml_load_file( $_vars["importFilename"] );
	if ($xml == FALSE) {
		$logMsg = "Failed to open ".$_vars["importFilename"];
		_log( $logMsg );
		exit();
	}
//echo "<pre>";
//print_r ($xml);
//echo "</pre>";

	//--------------------------- get XML nodes
	$n1=0;
	foreach( $xml->xdata->playlist as $key=>$playlist){
//echo "--key: ".$key;
//print_r( $playlist );
		$_vars["xmlNodes"][$n1]["title"] = (string) $playlist[@title];
		$_vars["xmlNodes"][$n1]["created"] = (string) $playlist[@created];

		$_vars["xmlNodes"][$n1]["file_location"] = (string) $playlist->location;
		$_vars["xmlNodes"][$n1]["img_cover"] = (string) $playlist->thumbnail[@url];

		if( isset( $playlist->related_links ) ){
			$relatedLinks = (string) $playlist->related_links->li;
			$_vars["xmlNodes"][$n1]["related_links"] = $relatedLinks;
		}

		$n1++;
	}//next

//print_r( $_vars );
	$logMsg = "Count  XML nodes: " . count( $_vars["xmlNodes"] );
	_log( $logMsg );

//--------------------------------------------------------------------- Update exists db node or crete new db node
	$_vars["numUpdatedNodes"] = 0;
	$_vars["numCreatedNodes"] = 0;

	for( $n1 = 0; $n1 < count( $_vars["xmlNodes"] ); $n1++){
	//for( $n1 = 0; $n1 < 1; $n1++){
		$xmlNode = $_vars["xmlNodes"][$n1];
//print_r( $xmlNode );
		$update = 0;

		for( $n2 = 0; $n2 < count( $_vars["dbNodes"] ); $n2++){
			$dbNode = $_vars["dbNodes"][$n2];
//print_r( $dbNode );
			if( strtoupper( $dbNode->title ) ==  strtoupper( $xmlNode["title"] ) ){
//print( "--test:". $dbNode->title . $xmlNode["title"]. "\n" );
				$update = 1;
			}
		}//next

		if( $update == 1){
			updateNode( $xmlNode, $dbNode );
		} else {
			saveNode( $xmlNode );
		}

	}//next

	$logMsg = "Number created  nodes: " . $_vars["numCreatedNodes"];
	_log( $logMsg );

	$logMsg = "Number updated  nodes: " . $_vars["numUpdatedNodes"];
	_log( $logMsg );


}//end startImport()



function updateNode( $xmlNode, $dbNode ){
	global $_vars;
	$logMsg = "-- start update node, title:".$xmlNode["title"]."\n";
	_log( $logMsg );
//........
	$_vars["numUpdatedNodes"]++;
}//end updateNode()

function saveNode($xmlNode){
	global $_vars;

	$node = new stdClass();

	$node->uid = 1; // author id 
	$node->type = $_vars["nodeType"];
	$node->sticky = 0;//?

	$node->language = LANGUAGE_NONE;
	//$node->language = 'ru';

	$node->title = $xmlNode["title"];

	/*
	$body_text =  "Body";
	$node->body[ $node->language][0]['value'] = $body_text;
	$node->body[ $node->language][0]['summary'] = text_summary($body_text);
	$node->body[ $node->language][0]['format'] = 'filtered_html';
	*/

	$node->status = 1;     // public
	//$node->revision = 1;
	//$node->promote = ;

	$node->created = time();
	$node->changed = time();

	//$node->path = "test1";
	//$node->log = "added $i node";
	//$node_terms = array();

	//CCK fields
	//$node->field_taxonomy_alpha[ LANGUAGE_NONE ][]["tid"] = 94;//termin "M"

	$node->field_img_cover[ LANGUAGE_NONE ][]["value"] = $xmlNode["img_cover"];//"/music/M/Metallica/covers/Kill_Em_All.jpg";
	$node->field_file_location[ LANGUAGE_NONE ][]["value"] = $xmlNode["file_location"];//"/music/0_playlist/metallica.json";

	//$node->field_country[ LANGUAGE_NONE ][]["tid"] = 116;//termin "USA"
	//$node->field_music_genre[ LANGUAGE_NONE ][]["tid"] = 122;//termin "Rock"
	//$node->field_music_styles[ LANGUAGE_NONE ][]["tid"] = 17;//termin "thrash"
	//$node->field_music_format[ LANGUAGE_NONE ][]["tid"] = 120;//termin "studio album"
	//$node->field_music_artist[ LANGUAGE_NONE ][]['value'] = "test artist";

	$node->field_related_links[ LANGUAGE_NONE ][]["value"] = $xmlNode["related_links"];
//'<a href="https://music.yandex.ru/users/roman-laptev/playlists/1019" class="btn btn-info" target="_blank">yandex music</a>';

	//&lt;a href=&quot;https://music.yandex.ru/users/roman-laptev/playlists/1019&quot; class=&quot;btn btn-info&quot; target=&quot;_blank&quot;&gt;yandex music&lt;/a&gt

	//$node->field_music_track[ LANGUAGE_NONE ][]["value"] = '<a data-type="local-file" href="/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3">Motorbreath</a>';
	//[safe_value] => &lt;a data-type=&quot;local-file&quot; href=&quot;/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3&quot;&gt;Motorbreath&lt;/a&gt;

	//$node->field_music_track[ LANGUAGE_NONE ][]["value"] = '<a data-type="local-file" href="/music/M/Metallica/1983_Kill_em_All/04_Jump_In_The_Fire.mp3">Jump_In_The_Fire</a>';
	//[safe_value] => &lt;a data-type=&quot;local-file&quot; href=&quot;/music/M/Metallica/1983_Kill_em_All/04_Jump_In_The_Fire.mp3&quot;&gt;Jump_In_The_Fire&lt;/a&gt;

	/*
		[book] => Array
		    (
		        [mlid] => 618
		        [nid] => 110
		        [bid] => 110
	*/
	//node_save($node);

/*
	try {
		node_save($node);
		//$success = TRUE;
	}
	catch (Exception $e) {
	// Do your error handling here.
echo "exception: ",  $e->getMessage(), "\n";
exit();
	}
*/

  	// node_save() does not return a value. It instead populates the $node object. Thus to check if the save was successful, we check the nid.
	node_save($node);

	if( !empty($node->nid) ){
		$logMsg = "-- create new node, nid:". $nid.", title:".$node->title."\n";
		_log( $logMsg );
		$_vars["numCreatedNodes"]++;
	} else {
		$logMsg = "-- error, not create node, nid:". $nid.", title:".$node->title."\n";
		_log( $logMsg );
	}

}//end saveNode()


function viewForm(){
	global $_vars;

echo "
<html>
<head>
	<meta http-equiv='content-type' content='text/html; charset=utf-8'/>
<!--
	<link rel='stylesheet' href='../css/bootstrap336.min.css'/>
-->
</head>
<body>

<div class='container'>
	<div class='page-header'>
		<h2>Import playlists to database music.sqlite</h2>
	</div>
	
	<form method=post name='form_import' action='' class='form'>
		<fieldset>
		
<legend>Import params:</legend>
		<div class=class='form-group'>
 
<label>filename</label>
<input 
type='text'
name='filename'
value='".$_vars["importFilename"]."'
size='60'
class='form-control'/>
<br>


		</div>

		<input type=hidden name='action' value='import'/>
		<input type=submit value='Import' class='btn btn-large btn-primary'>
		</fieldset>
	</form>
	
	<p><b>PHP version:</b> ".phpversion()."</p>
	<p><b>SAPI name:</b> ".php_sapi_name()."</p>
	<p><b>Drupal version:</b> ".VERSION."</p>
	
</div>

</body>
</html>
";

}//end viewForm()

?>
