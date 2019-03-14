<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//echo "</pre>";
//exit();

//===================== INIT vars
$_vars=array();

//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;
$_vars["phpversion"] = phpversion();

//$exportBookName = "";
//фильмы
//видеоклипы, музыкальное видео
//видеоуроки, программирование
//мультипликация

$filename = "export_video.xml";
$sqlite_path = "sqlite:/home/www/sites/video/cms/db/video.sqlite";
$_vars["sql"]["getVideo"] = "
SELECT 
node.nid, 
node.title, 
node.type, 
node.created, 
node.changed, 
node.status,
field_data_field_producer.field_producer_value,
field_data_field_roles.field_roles_value,
field_data_body.body_value
FROM node
LEFT JOIN field_data_field_producer ON field_data_field_producer.entity_id=node.nid
LEFT JOIN field_data_field_roles ON field_data_field_roles.entity_id=node.nid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid
WHERE 
node.status=1 AND 
node.type='video';
";

$_vars["sql"]["getVideoClips"] = "
SELECT 
node.nid, 
node.title, 
field_data_field_creators.field_creators_value,
node.type, 
node.created, 
node.changed, 
node.status,
field_data_body.body_value
FROM node
LEFT JOIN field_data_field_creators ON field_data_field_creators.entity_id=node.nid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid
WHERE 
node.status=1 AND 
node.type='videoclip' 
-- AND node.title LIKE ('%Life%');
";

$_vars["exportTitle"] = "Export video info from DB Drupal (video.sqlite) database to XML file";

//exit();
//==============================================================
//echo "REMOTE_ADDR: ".$_SERVER["REMOTE_ADDR"];
//echo "<br>";

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
	if (empty($_REQUEST['action']))	{
		view_form();
	} else {
		$action = $_REQUEST['action'];
		
		switch ($action) {
			case "export":
				if (!empty($_REQUEST['filename']))	{
					$_vars["filename"] = $_REQUEST['filename'];
					//$_vars["exportBookName"] = $_REQUEST['book_title'];
					$_vars["sqlite_path"] = $_REQUEST['sqlite_path'];
					
					$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
					
					$_vars["films"] = getNodes( $_vars["sql"]["getVideo"] );
					$_vars["films"] = _convertFields($_vars["films"]);
					
					$_vars["videoclips"] = getNodes( $_vars["sql"]["getVideoClips"] );
					$_vars["videoclips"] = _convertFields($_vars["videoclips"]);
					
					$_vars["video"] = array_merge($_vars["films"], $_vars["videoclips"]);
echo "vars = <pre>";
print_r($_vars["video"] );
echo "</pre>";
					//if ( !empty($_vars["book"]) ){
						//write_xml($_vars["book"]);
					//}
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

	echo $_vars["exportTitle"]."\n";
	echo "PHP version: ".$_vars["phpversion"]."\n";
echo "SAPI name: ".php_sapi_name();
echo "\n";
echo "PHP_SAPI: ".PHP_SAPI;
echo "\n";
	
	//$_vars["exportBookName"] = $exportBookName;
	$_vars["filename"] = $filename;
	$_vars["sqlite_path"] = $sqlite_path;
	
	$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");

	$_vars["nodes"] = getNodes();

//echo "web:" . $_vars["web"];
//echo "\n";
//echo "console:" . $_vars["console"];
//echo "\n";

	if ( !empty($_vars["nodes"]) ) {
		
		if ( !file_exists( $_vars["filename"] ) ){
			//write_xml( $_vars["book"] );
		} else {
			
			// $oldfile = $_vars["filename"];
			// $newfile = "_".$_vars["filename"];
			
			// if (rename ($oldfile, $newfile)) {
				// _log("- rename $oldfile (old version) to $newfile\n");
			// } else {
				// _log("- unable to rename file $oldfile\n");
			// }
			//write_xml( $_vars["book"] );
		}
	}

	//echo $_vars["log"];
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
//echo "result SQL:";
//echo $result->queryString;
//echo "<hr/>";
	//$result->setFetchMode(PDO::FETCH_ASSOC);
	$result->setFetchMode(PDO::FETCH_OBJ);
	$resultData = $result->fetchAll();
	return $resultData;
}//end runSql()

function getNodes( $sql ) {
	global $db, $_vars;
	$result = runSql($db,  $sql);
_log("-- get node info\n");
	return $result;
}//end getNodes()

function _convertFields( $records ) {
	$newRecords = array();
	

	for( $n1 = 0; $n1 < count( $records ); $n1++)	{
		$record = $records[$n1];
//echo $record->title;
//echo "<br>";
		$recordVideo = array();
		foreach( $record as $key=>$field )	{
//echo $key;
//echo $field;
//echo "<br>";

			if( $key === "type"){
				$recordVideo["type"] = $field;
			}
			if( $key === "status"){
				$recordVideo["public_status"] = $field;
			}
			if( $key === "created"){
				$recordVideo["public"] = date('d-M-Y H:i:s', $field);
			}
			if( $key === "changed"){
				$recordVideo["updated"] = date('d-M-Y H:i:s', $field);
			}
			if( $key === "body_value"){
				$body = htmlspecialchars ($field);
//echo $body;
//echo "<br>";
				$recordVideo["description"] = $body;
			}

//-------------------------------- film fields
			if( $key === "field_producer_value"){
				$recordVideo["creators"] = $field;
			}
			
			if( $key === "field_roles_value"){
				$recordVideo["roles"] = $field;
			}
			
//-------------------------------- videoclip fields
			if( $key === "field_creators_value"){
				$recordVideo["creators"] = $field;
			}

			if( $key === "videoclip_title"){
				$recordVideo["title"] = $field;
			}
			
		}//next
		$newRecords[] = $recordVideo;
	}//next
	
	//$newRecords = $records;
	return $newRecords;
}//end _convertFields()

/*
function write_xml($data){
	global $_vars;

	$xml="";
	$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
	$xml .= "<database name='lib'>\n";

	$xml .= "<table_node>\n";
	foreach ($data["node"] as $row ){

//print_r($row);
		$nid = $row->nid;
		$mlid = $row->mlid; 
		$plid = $row->plid; 
		$type = $row->type; 
		$title = htmlspecialchars($row->title);
		$created = date('d-M-Y H:i:s', $row->created);
		$changed = date('d-M-Y H:i:s', $row->changed);
		$weight = $row->weight;

		$xml .=  "\t<node title=\"".$title."\" ";
		$xml .=  "nid=\"".$nid."\" ";
		$xml .=  "mlid=\"".$mlid."\" ";
		$xml .=  "plid=\"".$plid."\" ";
		$xml .=  "type=\"".$type."\" ";
		$xml .=  "created=\"".$created."\" ";
		$xml .=  "changed=\"".$changed."\" ";
		$xml .=  "weight=\"".$weight."\"";
		$xml .=  ">\n";
		if (!empty($row->body_value)){
			$body = $row->body_value;
			$body = htmlspecialchars ($body);

//------------------------ filter
			$body = str_replace('', '', $body);
			$body = str_replace('&', '&amp;', $body);
//------------------------------

			$xml .=  "\t\t<body_value>\n";
			$xml .=  $body."\n";
			$xml .=  "\t\t</body_value>\n";

		}
		if (!empty($row->field_subfolder_value))
		{
			$xml .=  "\t\t<subfolder>\n";
			$xml .=  $row->field_subfolder_value."\n";
			$xml .=  "\t\t</subfolder>\n";
		}
		if (!empty($row->field_book_author_value))
		{
			$xml .=  "\t\t<author>\n";
			$author = str_replace('&', '&amp;', $row->field_book_author_value);
			$xml .=  $author."\n";
			$xml .=  "\t\t</author>\n";
		}
		if (!empty($row->field_book_name_value))
		{
			$xml .=  "\t\t<bookname>\n";
			$bookname = str_replace('&', '&amp;', $row->field_book_name_value);
			$xml .=  $bookname."\n";
			$xml .=  "\t\t</bookname>\n";
		}
		$xml .= "\t</node>\n";
	}//----------------------- end foreach
	$xml .= "</table_node>\n\n";

//----------------------------- table book_filename
	$xml .= "<table_book_filename>\n";
	foreach ($data["book_filename"] as $row )
	{
		if (!empty($row->field_book_filename_value))
		{
			$entity_id = $row->entity_id;
			$bundle = $row->bundle; 
			$delta = $row->delta; 

			$xml .=  "\t<item entity_id=\"".$entity_id."\" ";
			$xml .=  "bundle=\"".$bundle."\" ";
			$xml .=  "delta=\"".$delta."\"";
			$xml .=  ">\n";
			$xml .=  "\t\t<value>";

			//$xml .=  $row->field_book_filename_value;
			$field_book_filename_value = $row->field_book_filename_value;
//------------------------ filter
			$field_book_filename_value = str_replace('&', '&amp;', $field_book_filename_value);
//------------------------------
			$xml .=  $field_book_filename_value;

			$xml .=  "</value>\n";
			$xml .= "\t</item>\n";
		}
	}//----------------------- end foreach
	$xml .= "</table_book_filename>\n\n";

//----------------------------- table book_url
	$xml .= "<table_book_url>\n";
	foreach ($data["field_url"] as $row )
	{
		if (!empty($row->field_url_value))
		{
			$entity_id = $row->entity_id;
			$bundle = $row->bundle; 
			$delta = $row->delta; 

			$xml .=  "\t<item entity_id=\"".$entity_id."\" ";
			$xml .=  "bundle=\"".$bundle."\" ";
			$xml .=  "delta=\"".$delta."\"";
			$xml .=  ">\n";
			$xml .=  "\t\t<value>";

			//$xml .=  $row->field_url_value;
			$field_url_value = $row->field_url_value;
//------------------------ filter
			$field_url_value = str_replace('&', '&amp;', $field_url_value);
//------------------------------
			$xml .=  $field_url_value;

			$xml .=  "</value>\n";
			$xml .= "\t</item>\n";
		}
	}//----------------------- end foreach
	$xml .= "</table_book_url>\n\n";


//----------------------------- table book links
	$xml .= "<table_book_links>\n";
	foreach ($data["field_links"] as $row )
	{
		if (!empty($row->field_links_value))
		{
			$entity_id = $row->entity_id;
			$bundle = $row->bundle; 
			$delta = $row->delta; 

			$xml .=  "\t<item entity_id=\"".$entity_id."\" ";
			$xml .=  "bundle=\"".$bundle."\" ";
			$xml .=  "delta=\"".$delta."\"";
			$xml .=  ">\n";
			$xml .=  "\t\t<value>";

			$field_links_value = $row->field_links_value;
//------------------------ filter
			$field_links_value = str_replace('&', '&amp;', $field_links_value);
//------------------------------
			$xml .=  $field_links_value;

			$xml .=  "</value>\n";
			$xml .= "\t</item>\n";
		}
	}//----------------------- end foreach
	$xml .= "</table_book_links>\n\n";


	$xml .= $_vars["xml"]["taxonomy_index"];
	$xml .= $_vars["xml"]["taxonomy_term_data"];
	$xml .= $_vars["xml"]["taxonomy_term_hierarchy"];
	$xml .= $_vars["xml"]["taxonomy_vocabulary"];


//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";

	$xml .= "</database>\n";
	
	//----------------------------------- write xml file
	if ( !empty($xml) )
	{
		if ( $_vars["runType"] == "web") {
			header('Content-Type:  application/xhtml+xml');
			header('Content-Disposition: attachment; filename='.$_vars["filename"].'');
			header('Content-Transfer-Encoding: binary');
			//header('Content-Length: '.strlen($xml));
			echo $xml;
		}
		
		if ( $_vars["runType"] == "console") {
			$num_bytes = file_put_contents ( $_vars["filename"], $xml);
			if ($num_bytes > 0){
_log("Write ".$num_bytes." bytes  in ".$_vars["filename"] . "\n");
			} else {
_log( getcwd() );
_log("Write error in ".$_vars["filename"]."\n");
			}
		}
		
	}
	//-----------------------------------

}//end write_xml()
*/

function view_form(){
	global $_vars;
	//global $exportBookName;
	global $sqlite_path;
	global $filename;
	
echo "
<html>
<head>
	<meta http-equiv='content-type' content='text/html; charset=utf-8'/>
	<link rel='stylesheet' href='../css/bootstrap337.min.css'/>
</head>
<body>

<div class='container'>
	<div class='page-header'>
		<h2>".$_vars["exportTitle"]."</h2>
	</div>
	
	<form method=post name='form_export' action='' class='form'>
		<fieldset>
		
<legend>Export params:</legend>
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

		<input type=hidden name='action' value='export'/>
		<input type=submit value='export' class='btn btn-large btn-primary'>
		</fieldset>
	</form>
	
	<pre>PHP version: ".$_vars["phpversion"]."</pre>
	<pre>SAPI name: ".php_sapi_name()."</pre>
	
</div>

</body>
</html>
";

}//end view_form()

?>