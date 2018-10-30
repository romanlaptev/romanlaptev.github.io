<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//===================== INIT vars
$_vars=array();

//echo PHP_VERSION;
//echo phpversion();
echo PHP_OS;
$_vars["phpversion"] = phpversion();

$filename = "import_lib.xml";
$sqlite_path = "sqlite:/home/www/sites/lib/cms/db/lib.sqlite";

$_vars["sql"]["getTaxonomyIndex"] = "SELECT nid,tid FROM taxonomy_index";


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

echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
print_r($_vars);
echo "</pre>";
exit();

	if (empty($_REQUEST['action']))	{
		//view_form();
	} else {
	/*	
		$action = $_REQUEST['action'];
		
		switch ($action) {
			case "export":
				if (!empty($_REQUEST['filename']))	{
					$_vars["filename"] = $_REQUEST['filename'];
					$_vars["exportBookName"] = $_REQUEST['book_title'];
					$_vars["sqlite_path"] = $_REQUEST['sqlite_path'];
					
					$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
					$_vars["book"] = get_content();

//echo "book = <pre>";
//print_r($_vars["book"]);
//echo "</pre>";
					if ( !empty($_vars["book"]) ){
						write_xml($_vars["book"]);
					}
				}
			break;
		}//end switch
*/			

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
/*	
	$_vars["exportBookName"] = $exportBookName;
	$_vars["filename"] = $filename;
	$_vars["sqlite_path"] = $sqlite_path;
	
	$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
	
	$_vars["book"] = get_content();
//echo "book = <pre>";
//print_r($_vars["book"]);
//echo "</pre>";

//echo "web:" . $_vars["web"];
//echo "\n";
//echo "console:" . $_vars["console"];
//echo "\n";

	if ( !empty($_vars["book"]) ) {
		
		if ( !file_exists( $_vars["filename"] ) ){
			write_xml( $_vars["book"] );
		} else {
			
			$oldfile = $_vars["filename"];
			$newfile = "_".$_vars["filename"];
			
			if (rename ($oldfile, $newfile)) {
				_log("- rename $oldfile (old version) to $newfile\n");
			} else {
				_log("- unable to rename file $oldfile\n");
			}
			write_xml( $_vars["book"] );
		}
	}
	//echo $_vars["log"];
*/	
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

/*
//-------------------------
// получить страницы книги
//-------------------------
function get_nodes($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getNodes"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
_log("-- get nodes\n");
	
	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_nodes()
*/


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
	global $_vars, $exportBookName;
	global $exportBookName;
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
		<h2>Export book info from DB</h2>
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

<label>book_title</label>
<input 
class='form-control'
type='text' name='book_title' 
value=".$exportBookName."
/>

<!--
<div class='form-group'>
	<label class='radio-inline'><input type='radio' name='format' checked='checked' value='xml' >XML</label>
	<label class='radio-inline'><input type='radio' name='format' value='json' >JSON</label>
	<label class='radio-inline'><input type='radio' name='format' value='wxr' >WXR ( WordPress eXtended Rss export/import )</label>
</div>
-->
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