<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//===================== INIT vars
$_vars=array();

//echo PHP_VERSION;
//echo phpversion();
//echo PHP_OS;
$_vars["phpversion"] = phpversion();

$exportBookName = "библиотека";
$filename = "export_lib.xml";
$sqlite_path = "sqlite:/home/www/sites/lib/cms/db/lib.sqlite";

$_vars["sql"]["getBook"] = "SELECT menu_links.mlid FROM menu_links WHERE menu_links.menu_name IN (SELECT menu_name FROM menu_links WHERE link_title LIKE '{{exportBookName}}' AND module='book') ORDER BY weight ASC;";

$_vars["sql"]["getNodes"] = "
SELECT 
book.mlid, 
book.nid, 
menu_links.plid, 
node.nid, 
node.type, 
node.status,
node.created, 
node.changed, 
node.title, 
field_data_body.body_value, 
field_data_field_subfolder.field_subfolder_value, 
field_data_field_book_author.field_book_author_value, 
field_data_field_book_name.field_book_name_value, 
menu_links.weight 
-- file_managed.filename
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
-- LEFT JOIN file_usage ON file_usage.id=node.nid 
-- LEFT JOIN file_managed ON file_managed.fid=file_usage.fid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid 
LEFT JOIN field_data_field_subfolder ON field_data_field_subfolder.entity_id=node.nid 
LEFT JOIN field_data_field_book_author ON field_data_field_book_author.entity_id=node.nid 
LEFT JOIN field_data_field_book_name ON field_data_field_book_name.entity_id=node.nid 
WHERE 
node.status=1 AND 
book.mlid in ( {{listNodesMlid}} ) ORDER BY menu_links.weight,title ASC
";

$_vars["sql"]["getBookFileName"] = "
SELECT 
field_data_field_book_filename.entity_id,
field_data_field_book_filename.bundle,
field_data_field_book_filename.field_book_filename_value,
field_data_field_book_filename.delta
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_field_book_filename ON field_data_field_book_filename.entity_id=node.nid
WHERE 
book.mlid in ( {{listNodesMlid}} ) ORDER BY field_data_field_book_filename.delta ASC
";

$_vars["sql"]["getBookUrl"] = "
SELECT 
field_data_field_url.entity_id,
field_data_field_url.entity_type,
field_data_field_url.bundle,
field_data_field_url.delta,
field_data_field_url.field_url_value
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_field_url ON field_data_field_url.entity_id=node.nid
WHERE 
book.mlid in ( {{listNodesMlid}} ) ORDER BY field_data_field_url.delta ASC
";

$_vars["sql"]["getBookLinks"] = "
SELECT 
field_data_field_links.entity_id,
field_data_field_links.entity_type,
field_data_field_links.bundle,
field_data_field_links.delta,
field_data_field_links.field_links_value
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_field_links ON field_data_field_links.entity_id=node.nid
WHERE 
book.mlid in ( {{listNodesMlid}} ) ORDER BY field_data_field_links.delta ASC
";
/*
$_vars["sql"]["getTaxonomy"] = "
SELECT 
field_data_field_taxonomy.entity_id,
field_data_field_taxonomy.entity_type,
field_data_field_taxonomy.bundle,
field_data_field_taxonomy.delta,
field_data_field_taxonomy.field_taxonomy_tid,
taxonomy_term_data.name
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_field_taxonomy ON field_data_field_taxonomy.entity_id=node.nid
LEFT JOIN taxonomy_term_data ON taxonomy_term_data.tid=field_data_field_taxonomy.field_taxonomy_tid
WHERE 
book.mlid in ( {{listNodesMlid}} ) ORDER BY field_data_field_taxonomy.delta ASC
";
*/
/*
$_vars["sql"]["getTaxonomyAlpha"] = "
SELECT 
field_data_field_taxonomy_alpha.entity_id,
field_data_field_taxonomy_alpha.entity_type,
field_data_field_taxonomy_alpha.bundle,
field_data_field_taxonomy_alpha.delta,
field_data_field_taxonomy_alpha.field_taxonomy_alpha_tid,
taxonomy_term_data.name
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_field_taxonomy_alpha ON field_data_field_taxonomy_alpha.entity_id=node.nid
LEFT JOIN taxonomy_term_data ON taxonomy_term_data.tid=field_data_field_taxonomy_alpha.field_taxonomy_alpha_tid
WHERE 
book.mlid in ( {{listNodesMlid}} ) ORDER BY field_data_field_taxonomy_alpha.delta ASC
";
*/

$_vars["sql"]["getTaxonomyIndex"] = "SELECT nid,tid FROM taxonomy_index";
$_vars["sql"]["getTaxonomyTermData"] = "SELECT tid,vid,name,description,weight FROM taxonomy_term_data";
$_vars["sql"]["getTaxonomyTermHierarchy"] = "SELECT tid,parent FROM taxonomy_term_hierarchy";
$_vars["sql"]["getTaxonomyVocabulary"] = "SELECT vid,name,machine_name,description,hierarchy,weight FROM taxonomy_vocabulary";

//$_vars["log"] = "";

//exit();

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

	if (empty($_REQUEST['action']))	{
		view_form();
	} else {
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

	}//end elseif
	
}

//==================================== CONSOLE run
if ( $_vars["runType"] == "console") {
//print_r($argv);
//$_SERVER["argv"]
$_vars["console"] = true;

	echo "Export book info from DB (lib.sqlite)\n";
	echo "PHP version: ".$_vars["phpversion"]."\n";
echo "SAPI name: ".php_sapi_name();
echo "\n";
echo "PHP_SAPI: ".PHP_SAPI;
echo "\n";
	
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

//---------------------------------------------
// получить menu_links.mlid всех страниц книги 
//---------------------------------------------
function get_content() {
	global $db, $_vars;

	$sql = $_vars["sql"]["getBook"];
	$sql = str_replace("{{exportBookName}}", $_vars["exportBookName"], $sql);
//echo "get_content,sql = ".$sql;
//echo "<hr>";
	$result = runSql($db,  $sql);
	_log("-- get book info\n");
	

	$sql_mlid="";
	foreach ($result as $num => $row ){
		if ($num==0){
			$sql_mlid .= $row->mlid;
		} else {
			$sql_mlid .= ", ".$row->mlid;
		}
	}
	
	if ( !empty($sql_mlid) ) {
//$sql_mlid = "1734";
//echo "sql_mlid = ".$sql_mlid;
//echo "<br>";

		$xml_data = array();
		$xml_data["node"] = get_nodes($sql_mlid);
		
		$xml_data["book_filename"] = get_book_filename ($sql_mlid);
		$xml_data["field_url"] = get_field_url ($sql_mlid);
		$xml_data["field_links"] = get_field_links ($sql_mlid);
		
		//$xml_data["field_taxonomy"] = get_field_taxonomy ($sql_mlid);
		//$xml_data["field_taxonomy_alpha"] = get_field_taxonomy_alpha ($sql_mlid);
		
		get_taxonomy_index();
		get_taxonomy_term_data();
		get_taxonomy_term_hierarchy();
		get_taxonomy_vocabulary();

		return $xml_data;
	} else {
		return "error!";
	}

}//end get_content()

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


//-------------------------
// получить имена связанных файлов книг
//-------------------------
function get_book_filename($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getBookFileName"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
//echo "-- get book_filename\n";
//echo "get_book_filename, sql = ".$sql;
//echo "<hr>";
	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_book_filename()


//-------------------------
// получить ссылки связанных файлов книг
//-------------------------
function get_field_url ($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getBookUrl"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
_log("-- get field_url\n");

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_url()


//-------------------------
// 2.получить ссылки связанных файлов книг
//-------------------------
function get_field_links ($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getBookLinks"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
_log("-- get field_links\n");

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_links()

//-------------------------
// получить связанные с книгами термины таксономии
//-------------------------
function get_field_taxonomy ($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomy"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
_log("-- get_field_taxonomy\n");

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_taxonomy()


/*
//-------------------------
// получить связанные с книгами термины таксономии
//-------------------------
function get_field_taxonomy_alpha ($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyAlpha"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
//echo "-- get field_taxonomy_alpha\n";
//echo "get_field_taxonomy_alpha, sql = ".$sql;
//echo "<hr>";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_taxonomy_alpha()
*/

//-------------------------
// получить все термины таксономии
//-------------------------
function get_taxonomy_index(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyIndex"];
	$fresult = runSql($db,  $sql);

	$xml = "<taxonomy_index>\n";
	foreach ($fresult as $row ){
		$xml .=  "\t<record nid=\"".$row->nid."\" ";
		$xml .=  "tid=\"".$row->tid."\"";
		$xml .=  "/>\n";
		//$xml .= "\t</record>\n";
	}//next
	$xml .= "</taxonomy_index>\n\n";
	
	$_vars["xml"]["taxonomy_index"] = $xml;

_log("-- get taxonomy_index\n");
}//end get_taxonomy_index()


function get_taxonomy_term_data(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyTermData"];
	$fresult = runSql($db,  $sql);

	$xml = "<taxonomy_term_data>\n";
	foreach ($fresult as $row ){
		$xml .=  "\t<termin tid=\"".$row->tid."\" ";
		$xml .=  "vid=\"".$row->vid."\" ";
		$xml .=  "weight=\"".$row->weight."\"";
		$xml .=  ">\n";

		$xml .=  "\t\t<name>";
		$xml .=  $row->name;
		$xml .=  "</name>\n";

		if ( !empty($row->description) ) {
			$xml .=  "\t\t<description>";
			$xml .=  $row->description;
			$xml .=  "</description>\n";
		}
		
		$xml .= "\t</termin>\n";
	}//next
	$xml .= "</taxonomy_term_data>\n\n";
	$_vars["xml"]["taxonomy_term_data"] = $xml;
	
_log("-- get_taxonomy_term_data\n");
}//end get_taxonomy_term_data()


function get_taxonomy_term_hierarchy(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyTermHierarchy"];
	$fresult = runSql($db,  $sql);
	
	$xml = "<taxonomy_term_hierarchy>\n";
	foreach ($fresult as $row ){
		$xml .=  "\t<termin tid=\"".$row->tid."\" ";
		$xml .=  "parent=\"".$row->parent."\"";
		$xml .=  "/>\n";
		//$xml .= "\t</termin>\n";
	}//next
	$xml .= "</taxonomy_term_hierarchy>\n\n";
	$_vars["xml"]["taxonomy_term_hierarchy"] = $xml;
	
_log("-- get_taxonomy_term_hierarchy\n");
}//end get_taxonomy_term_hierarchy()

function get_taxonomy_vocabulary(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyVocabulary"];
	$fresult = runSql($db,  $sql);
	
	$xml = "<taxonomy_vocabulary>\n";
	foreach ($fresult as $row ){
		$xml .=  "\t<record vid=\"".$row->vid."\" ";
		$xml .=  "hierarchy=\"".$row->hierarchy."\" ";
		$xml .=  "weight=\"".$row->weight."\"";
		$xml .=  ">\n";

		$xml .=  "\t\t<name>";
		$xml .=  $row->name;
		$xml .=  "</name>\n";

		$xml .=  "\t\t<m_name>";
		$xml .=  $row->machine_name;
		$xml .=  "</m_name>\n";

		if ( !empty($row->description) ){
			$xml .=  "\t\t<description>";
			$xml .=  $row->description;
			$xml .=  "</description>\n";
		}
		
		$xml .= "\t</record>\n";
	}//next
	$xml .= "</taxonomy_vocabulary>\n\n";
	$_vars["xml"]["taxonomy_vocabulary"] = $xml;
	
_log("-- get_taxonomy_vocabulary\n");
}//end get_taxonomy_vocabulary()



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

/*
//----------------------------- table book_taxonomy
	$xml .= "<table_book_taxonomy>\n";
	foreach ($data["field_taxonomy"] as $row )
	{
		if (!empty($row->field_taxonomy_tid))
		{
			$entity_id = $row->entity_id;
			$delta = $row->delta; 

			$xml .=  "\t<item entity_id=\"".$entity_id."\" ";
			$xml .=  "delta=\"".$delta."\"";
			$xml .=  ">\n";
			$xml .=  "\t\t<termin tid=\"".$row->field_taxonomy_tid."\" ";
			$xml .=  ">";
			$xml .=  $row->name;
			$xml .=  "</termin>\n";
			$xml .= "\t</item>\n";
		}
	}//----------------------- end foreach
	$xml .= "</table_book_taxonomy>\n\n";
*/

/*
//----------------------------- table book_taxonomy_alpha
	$xml .= "<table_book_taxonomy_alpha>\n";
	foreach ($data["field_taxonomy_alpha"] as $row )
	{
		if (!empty($row->field_taxonomy_alpha_tid))
		{
			$entity_id = $row->entity_id;
			$delta = $row->delta; 

			$xml .=  "\t<item entity_id=\"".$entity_id."\" ";
			$xml .=  "delta=\"".$delta."\"";
			$xml .=  ">\n";
			$xml .=  "\t\t<termin tid=\"".$row->field_taxonomy_alpha_tid."\" ";
			$xml .=  ">";
			$xml .=  $row->name;
			$xml .=  "</termin>\n";
			$xml .= "\t</item>\n";
		}
	}//----------------------- end foreach
	$xml .= "</table_book_taxonomy_alpha>\n\n";
*/
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
