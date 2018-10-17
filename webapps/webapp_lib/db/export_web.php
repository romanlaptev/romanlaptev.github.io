﻿<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//echo "</pre>";
//exit();

$action = "";

$_vars=array();
//$_vars["filename"] = "export_lib.xml";
//$_vars["sqlite_path"] = "sqlite:/home/www/sites/lib/cms/db/lib.sqlite";
//$_vars["exportBookName"] = "библиотека";

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

$_vars["log"] = "";

if (empty($_REQUEST['action']))
{
	$form = view_form(); // вывод формы
echo <<<EOF
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<style>
legend
{
	color:green;
	font-size:16px;
}
.section
{
	/*border:1px solid;*/
	margin:20px;
	padding:5px;
	width:870px;
}
.param
{
	color:darkblue;
}
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	color:green;
}
.warning
{
	color:#ffffff;
	background:darkred;
	font-style:italic;
}
#message
{
}
#form
{
}
#log
{
	border: 1px solid;
	min-height: 100px;
	padding:10px;
}
</style>
</head>
<body>

<div id='form'>$form</div>

</body>
</html>
EOF;

} else {
	$action = $_REQUEST['action'];
	switch ($action)	{
		case "export":
			if (!empty($_REQUEST['filename']))	{
				$_vars["filename"] = $_REQUEST['filename'];
				$_vars["exportBookName"] = $_REQUEST['book_title'];
				$_vars["sqlite_path"] = $_REQUEST['sqlite_path'];

				$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");

				$book =array();
				$book = get_content();
/*
echo "book = <pre>";
print_r($book);
echo "</pre>";
*/
				if ( !empty($book) ){
					write_xml($book);
				}
			} else {
				$_vars["log"] = "<span class='error'>var filename is empty!!!!</span>";
				$_vars["log"] .= "<br>";
			}
		break;
	}//------------------------------ end switch

}//--------------------------------- end elseif action


//====================
// FUNCTIONS
//====================
function view_form(){
	$out="";
//------------------------------------- form
	$out .= "<h2>Export lib database , drupal book to xml file</h2>";
	$out .= "<form method=post name=form_export action=''>
<fieldset><legend><b>export params</b></legend>";

	$out .= "<div class='section'>";
	$out .= "filename: <input type=text name=filename size=40 value='export_lib.xml'/><br>";
	$out .= "sqlite_path: <input type=text name=sqlite_path size=60 value='sqlite:/home/www/sites/lib/cms/db/lib.sqlite'/><br>";
	$out .= "book_title: <input type=text name=book_title size=20 value='библиотека'/>";
	$out .= "</div>";

	$out .= "<input type=hidden name=action value='export'/>";
	$out .= "<input type=submit value='export'>";
	$out .= "</fieldset></form>";

	return $out;
}//----------------------- end func


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
function get_content(){
	global $db, $_vars;

	$sql = $_vars["sql"]["getBook"];
	$sql = str_replace("{{exportBookName}}", $_vars["exportBookName"], $sql);
	
//echo "get_content,sql = ".$sql;
//echo "<hr>";
	$result = runSql($db,  $sql);
	
	$sql_mlid="";
	foreach ($result as $num => $row ){
		if ($num==0){
			$sql_mlid .= $row->mlid;
		} else {
			$sql_mlid .= ", ".$row->mlid;
		}
	}
	if ( !empty($sql_mlid) ){
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
		$xml_data["taxonomy_index"] = get_taxonomy_index ();
		$xml_data["taxonomy_term_data"] = get_taxonomy_term_data ();
		$xml_data["taxonomy_term_hierarchy"] = get_taxonomy_term_hierarchy ();
		$xml_data["taxonomy_vocabulary"] = get_taxonomy_vocabulary ();

		return $xml_data;
	}
}//end get_content()

//-------------------------
// получить страницы книги
//-------------------------
function get_nodes ($sql_mlid){
	global $db, $_vars;
	$sql = $_vars["sql"]["getNodes"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
//echo "get_pages, sql = ".$sql;
//echo "<hr>";
	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_nodes()

//-------------------------
// получить имена связанных файлов книг
//-------------------------
function get_book_filename ($sql_mlid){
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
//echo "-- get field_url\n";
//echo "get_field_url, sql = ".$sql;
//echo "<hr>";

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
//echo "-- get field_links\n";
//echo "get_field_links, sql = ".$sql;
//echo "<hr>";

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
//echo "-- get_field_taxonomy\n";
//echo "get_field_taxonomy, sql = ".$sql;
//echo "<hr>";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_taxonomy()


//-------------------------
// получить связанные с книгами термины таксономии
//-------------------------
function get_field_taxonomy_alpha ($sql_mlid){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyAlpha"];
	$sql = str_replace("{{listNodesMlid}}", $sql_mlid, $sql);
//echo "-- get_field_taxonomy_alpha\n";
//echo "get_field_taxonomy_alpha, sql = ".$sql;
//echo "<hr>";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_field_taxonomy_alpha()

//-------------------------
// получить все термины таксономии
//-------------------------
function get_taxonomy_index(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyIndex"];
//echo "-- get_taxonomy_index\n";
//echo "get_taxonomy_index, sql = ".$sql;
//echo "<hr>";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_taxonomy_index()

function get_taxonomy_term_data(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyTermData"];
//echo "-- get_taxonomy_term_data\n";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_taxonomy_term_data()

function get_taxonomy_term_hierarchy(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyTermHierarchy"];
//echo "-- get_taxonomy_term_hierarchy\n";
	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_taxonomy_term_hierarchy()

function get_taxonomy_vocabulary(){
	global $db, $_vars;
	
	$sql = $_vars["sql"]["getTaxonomyVocabulary"];
//echo "-- get_taxonomy_vocabulary\n";

	$fresult = runSql($db,  $sql);
	return $fresult;
}//end get_taxonomy_vocabulary()



function write_xml($data){
	global $_vars;

	$xml="";
	$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
	$xml .= "<lib>\n";

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

//----------------------------- table taxonomy_index
	$xml .= "<table_taxonomy_index>\n";
	foreach ($data["taxonomy_index"] as $row )
	{
		$xml .=  "\t<item nid=\"".$row->nid."\" ";
		$xml .=  "tid=\"".$row->tid."\"";
		$xml .=  ">\n";
		$xml .= "\t</item>\n";
	}//----------------------- end foreach
	$xml .= "</table_taxonomy_index>\n\n";

//----------------------------- table taxonomy_term_data
	$xml .= "<table_taxonomy_term_data>\n";
	foreach ($data["taxonomy_term_data"] as $row )
	{
		$xml .=  "\t<termin tid=\"".$row->tid."\" ";
		$xml .=  "vid=\"".$row->vid."\" ";
		$xml .=  "weight=\"".$row->weight."\"";
		$xml .=  ">\n";

		$xml .=  "\t\t<name>";
		$xml .=  $row->name;
		$xml .=  "</name>\n";

if ( !empty($row->description) )
{
		$xml .=  "\t\t<description>";
		$xml .=  $row->description;
		$xml .=  "</description>\n";
}
		$xml .= "\t</termin>\n";
	}//----------------------- end foreach
	$xml .= "</table_taxonomy_term_data>\n\n";

//----------------------------- table taxonomy_term_hierarchy
	$xml .= "<table_taxonomy_term_hierarchy>\n";
	foreach ($data["taxonomy_term_hierarchy"] as $row )
	{
		$xml .=  "\t<termin tid=\"".$row->tid."\" ";
		$xml .=  "parent=\"".$row->parent."\"";
		$xml .=  ">\n";
		$xml .= "\t</termin>\n";
	}//----------------------- end foreach
	$xml .= "</table_taxonomy_term_hierarchy>\n\n";

//----------------------------- table taxonomy_vocabulary
	$xml .= "<table_taxonomy_vocabulary>\n";
	foreach ($data["taxonomy_vocabulary"] as $row )
	{
		$xml .=  "\t<item vid=\"".$row->vid."\" ";
		$xml .=  "hierarchy=\"".$row->hierarchy."\" ";
		$xml .=  "weight=\"".$row->weight."\"";
		$xml .=  ">\n";

		$xml .=  "\t\t<name>";
		$xml .=  $row->name;
		$xml .=  "</name>\n";

		$xml .=  "\t\t<m_name>";
		$xml .=  $row->machine_name;
		$xml .=  "</m_name>\n";

if ( !empty($row->description) )
{
		$xml .=  "\t\t<description>";
		$xml .=  $row->description;
		$xml .=  "</description>\n";
}
		$xml .= "\t</item>\n";
	}//----------------------- end foreach
	$xml .= "</table_taxonomy_vocabulary>\n\n";


//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";

	$xml .= "</lib>\n";
	//----------------------------------- write xml file
	if ( !empty($xml) )
	{
		header('Content-Type:  application/xhtml+xml');
		header('Content-Disposition: attachment; filename='.$_vars["filename"].'');
		header('Content-Transfer-Encoding: binary');
		//header('Content-Length: '.strlen($xml));
		echo $xml;
	}
	//-----------------------------------

}//end write_xml()

?>
