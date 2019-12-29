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

$_vars["appTitle"] = "Export playlists info from DB Drupal database to XML file";
$_vars["filename"] = "export_music.xml";
$sqlite_path = "sqlite:/home/www/sites/music/cms/music_drupal/db/music.sqlite";

$_vars["sql"]["getNodes"] = "
SELECT 
node.nid, 
node.title, 
node.type, 
node.created, 
node.changed, 
-- node.status,
field_data_field_file_location.field_file_location_value,
field_data_body.body_value
FROM node
LEFT JOIN field_data_field_file_location ON field_data_field_file_location.entity_id=node.nid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid
WHERE 
node.status=1 AND 
node.type IN ('playlist');
";


$_vars["sql"]["getTitle"] = "
SELECT 
field_data_field_title.field_title_value
-- field_data_field_title.delta 
FROM field_data_field_title 
WHERE field_data_field_title.entity_id={{nodeNid}};
";

$_vars["sql"]["getPictures"] = "
SELECT 
field_data_field_img_cover.field_img_cover_value
FROM field_data_field_img_cover
WHERE field_data_field_img_cover.entity_id={{nodeNid}};
";

$_vars["sql"]["getLinks"] = "
SELECT 
field_data_field_related_links.field_related_links_value
FROM field_data_field_related_links
WHERE field_data_field_related_links.entity_id={{nodeNid}};
";

$_vars["sql"]["getNodeTags"] = "
SELECT
taxonomy_term_data.vid,
taxonomy_index.tid,
taxonomy_vocabulary.name,
taxonomy_term_data.name
FROM taxonomy_index
LEFT JOIN taxonomy_term_data ON taxonomy_term_data.tid=taxonomy_index.tid
LEFT JOIN taxonomy_vocabulary ON taxonomy_vocabulary.vid=taxonomy_term_data.vid
WHERE taxonomy_index.nid={{nodeNid}};
";

$_vars["sql"]["getTagsList"] = "
SELECT 
taxonomy_term_data.tid, 
taxonomy_term_data.vid, 
taxonomy_term_data.name, 
taxonomy_term_data.description
FROM taxonomy_term_data 
WHERE 
taxonomy_term_data.tid IN (SELECT DISTINCT(taxonomy_index.tid) FROM taxonomy_index);
";

$_vars["sql"]["getTagGroups"] = "
SELECT vid, name FROM taxonomy_vocabulary;
";

//==================================
$_vars["export_tpl"] = '<?xml version="1.0" encoding="UTF-8" ?>
<xroot>
	<database name="music">
{{tag_groups}}
{{tag_list}}
{{nodelist}}
	</database>
</xroot>';

$_vars["tpl_node"] = '<video type="{{type}}">
	<title>{{title}}</title>
	{{images}}
	{{related_links}}
	{{tags}}
	<published format="dd:mm:yyyy hh:mm:ss">{{published}}</published>
	<updated format="dd:mm:yyyy hh:mm:ss">{{updated}}</updated>
</video>';

$_vars["tpl_item"] = '<item>{{text}}</item>';

$_vars["tpl_images"] = '<images>{{list}}</images>';
$_vars["tpl_image"] = '<img src="{{source}}"/>';

$_vars["tpl_links"] = '<related_links>{{list}}</related_links>';
$_vars["tpl_links_item"] = '<li>{{source}}</li>';

$_vars["tplNodeTags"] = '<tags>{{list}}</tags>';
$_vars["tplNodeTagsItem"] = '<item vid="{{vid}}" tid="{{tid}}" group_name="{{group_name}}">{{name}}</item>';

$_vars["tpl_tagList"] = '<taglist>{{list}}</taglist>';
$_vars["tpl_termin_item"] = '<tag tid="{{tid}}" vid="{{vid}}" name="{{name}}">{{description}}</tag>';


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
				if(!empty($_REQUEST['filename'])){
					$_vars["filename"] = $_REQUEST['filename'];
				}
				
				if(empty($_REQUEST['sqlite_path'])){
echo "<p> -- error, not found <b>sqlite_path</b></p>";
					exit();
				}
				//$_vars["exportBookName"] = $_REQUEST['book_title'];
				
				$_vars["sqlite_path"] = $_REQUEST['sqlite_path'];
				$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");
				
				_exportProcess();
				
				if( !empty($_vars["xml"]) ){
					writeXML($_vars["xml"]);
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

	echo $_vars["appTitle"]."\n";
	echo "PHP version: ".$_vars["phpversion"]."\n";
echo "SAPI name: ".php_sapi_name();
echo "\n";
echo "PHP_SAPI: ".PHP_SAPI;
echo "\n";
	
	//$_vars["exportBookName"] = $exportBookName;
	//$_vars["filename"] = $filename;
	$_vars["sqlite_path"] = $sqlite_path;
	
	$db = new PDO( $_vars["sqlite_path"] ) or die("Could not open database");

	//$_vars["nodes"] = getNodes( $_vars["sql"]["getNodes"] );
//echo "web:" . $_vars["web"];
//echo "\n";
//echo "console:" . $_vars["console"];
//echo "\n";
	_exportProcess();

	if ( !empty($_vars["xml"]) ) {
		if ( !file_exists( $_vars["filename"] ) ){
			writeXML($_vars["xml"]);
		} else {
			$oldfile = $_vars["filename"];
			$newfile = "_".$_vars["filename"];
			
			if (rename ($oldfile, $newfile)) {
				_log("- rename $oldfile (old version) to $newfile\n");
			} else {
				_log("- unable to rename file $oldfile\n");
			}
			writeXML($_vars["xml"]);
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

function _exportProcess(){
	global $db, $_vars;

	$_vars["films"] = getNodes( $_vars["sql"]["getNodes"] );
	getMultipleFields( 
		$_vars["sql"]["getTitle"], 
		$_vars["films"],
		"field_title_value", 
		"title" 
	);
	getMultipleFields( 
		$_vars["sql"]["getPictures"], 
		$_vars["films"],
		"field_img_cover_value", 
		"pictures" 
	);
	getMultipleFields( 
		$_vars["sql"]["getLinks"], 
		$_vars["films"],
		"field_url_value", 
		"links" 
	);
	getNodeTags( 
		$_vars["sql"]["getNodeTags"], 
		$_vars["films"],
		"tags" 
	);
	$_vars["video"] = _convertFields($_vars["films"]);

	if( !empty($_vars["video"]) ){
		$_vars["xml"] = formXML($_vars["video"]);
	}

//---------------------------
	$result = runSql($db, $_vars["sql"]["getTagsList"]);
	if( count( $result) > 0 ){
		$_vars["xml_tagList"] = formTagList($result);
		$_vars["xml"] = str_replace("{{tag_list}}", $_vars["xml_tagList"], $_vars["xml"]);
	}
//echo count($_vars["tags"]);
//echo "<br>";
//echo "<pre>";
//print_r( $_vars["tags"] );
//echo "</pre>";
//exit();


}//end _exportProcess()					


function getNodes( $sql ) {
	global $db, $_vars;
	$result = runSql($db,  $sql);
//_log("-- get node info\n");
	return $result;
}//end getNodes()


function getMultipleFields( $sql, $records, $fieldNameSrc, $fieldNameTrg ){
	global $db, $_vars;
	for( $n1 = 0; $n1 < count( $records ); $n1++){
		$record = $records[$n1];
		$sqlFields = str_replace("{{nodeNid}}", $record->nid, $sql);
//echo "SQL:".$sqlFields;
//echo "<br>";
		$result = runSql($db,  $sqlFields);
//echo "result = <pre>";
//print_r($result );
//echo "</pre>";
//echo "count result:".count( $result);
//echo "<br>";
			
		if( count( $result) > 0 ){
			$record->{$fieldNameTrg} = array();
			for( $n2 = 0; $n2 < count( $result ); $n2++){
				$record->{$fieldNameTrg}[] = $result[$n2]->{$fieldNameSrc};
			}//next
		}

	}//next
}//getMultipleFields()


function getNodeTags( $sql, $records, $fieldNameTrg ){
	global $db, $_vars;
	for( $n1 = 0; $n1 < count( $records ); $n1++){
		$record = $records[$n1];
		$sqlFields = str_replace("{{nodeNid}}", $record->nid, $sql);
		$result = runSql($db,  $sqlFields);

		if( count( $result) > 0 ){
			$record->{$fieldNameTrg} = array();
			for( $n2 = 0; $n2 < count( $result ); $n2++){
				$tag = new stdClass();
				$tag->tid = $result[$n2]->tid;
				$tag->name = $result[$n2]->name;
				//$tag->codename = $result[$n2]->codename;
				$record->{$fieldNameTrg}[] = $tag;
			}//next
		}

	}//next
}//getNodeTags()


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

			if( $key === "title"){
				$recordVideo["title"] = $field;
			}
			//if( $key === "title1"){
				//$recordVideo["title1"] = $field;
			//}
			//if( $key === "title2"){
				//$recordVideo["title2"] = $field;
			//}
			if( $key === "pictures"){
				if( !empty( $field ) ){
					$recordVideo["pictures"] = $field;
				}
			}
			if( $key === "links"){
				if( !empty( $field ) ){
					$recordVideo["links"] = $field;
				}
			}
			
			if( $key === "tags"){
				if( !empty( $field ) ){
					$recordVideo["tags"] = $field;
				}
			}

			if( $key === "type"){
				$recordVideo["type"] = $field;
			}
			//if( $key === "status"){
				//$recordVideo["public_status"] = $field;
			//}
			if( $key === "created"){
				$recordVideo["published"] = date('d-M-Y H:i:s', $field);
			}
			if( $key === "changed"){
				$recordVideo["updated"] = date('d-M-Y H:i:s', $field);
			}
			if( $key === "body_value"){
				if( !empty( $field ) ){
					$body = htmlspecialchars ($field);
	//echo $body;
	//echo "<br>";
//------------------------ filter
	$body = str_replace('', '', $body);
	$body = str_replace('&', '&amp;', $body);
//------------------------------

					$recordVideo["description"] = $body;
				}
			}


			if( $key === "field_creators_value" ){
				if( !empty( $field ) ){
					$recordVideo["creators"] = $field;
				}
			}

			if( $key === "field_producer_value"){
				if( !empty( $field ) ){
					$recordVideo["producer"] = $field;
				}
			}
			
			if( $key === "field_roles_value"){
				if( !empty( $field ) ){
					$recordVideo["roles"] = $field;
				}
			}
			
		}//next
		$newRecords[] = $recordVideo;
	}//next
	
	//$newRecords = $records;
	return $newRecords;
}//end _convertFields()



function formXML( $records ){
	global $_vars;

/*
	if( file_exists( dirname(__FILE__)."/".$_vars["export_tpl"] ) ){
		$_vars["xml_template"] = file_get_contents( dirname(__FILE__)."/".$_vars["export_tpl"] );
//echo "<pre>";
//print_r($_vars);
//echo "</pre>";

	} else {
		echo "<p> -- error, not found <b>".dirname(__FILE__)."/".$_vars["export_tpl"] ."</b></p>";
		exit();
	}

$test = str_replace("{{title}}", "#title", $_vars["xml_template"]);
echo htmlspecialchars ( $test );
*/

/*
//http://php.net/manual/ru/ref.simplexml.php
	$filename = dirname(__FILE__)."/".$_vars["export_tpl"];
	$xmlTpl = simplexml_load_file($filename);
	if(!$xmlTpl){
		exit("Failed to open ".$filename);
	} else {
	  //echo "Use SimpleXML for read data from ".$xml_file."<br>\n"; 

echo "<pre>";
print_r($xmlTpl);
echo "</pre>";

echo sizeof($xmlTpl->database->video);
echo "<br>";
echo "Type:".$xmlTpl->database->video[0]["type"];
echo "<br>";
	  }
*/
	$nodeList = "";

	for( $n1 = 0; $n1 < count( $records ); $n1++)	{
		$record = $records[$n1];
//echo "<pre>";
//print_r($record);
//echo "</pre>";

		$node = $_vars["tpl_node"];

		$node = str_replace("{{type}}", $record["type"], $node);
		$node = str_replace("{{published}}", $record["published"], $node);
		$node = str_replace("{{updated}}", $record["updated"], $node);

		$creators="";
		if( isset($record["creators"]) ){
			$creators = str_replace("{{text}}", $record["creators"], $_vars["tpl_creators"]);
//------------------------ filter
			$creators = str_replace('&', '&amp;', $creators);
//------------------------------
		} 
		$node = str_replace("{{creators}}", $creators, $node);

		$producer="";
		if( isset($record["producer"]) ){
			$producer = str_replace("{{text}}", $record["producer"], $_vars["tpl_producer"]);
		} 
		$node = str_replace("{{producer}}", $producer, $node);


		$roles="";
		if( isset($record["roles"]) ){
			$roles = str_replace("{{text}}", $record["roles"]."\t", $_vars["tpl_roles"]);
		} 
		$node = str_replace("{{roles}}", $roles, $node);


		$description="";
		if( isset($record["description"]) ){
			$desc = trim( $record["description"] );
			$description = str_replace("{{text}}", $desc, $_vars["tpl_description"]);
		} 
		$node = str_replace("{{description}}", $description, $node);

//--------------- title
		$titles = "";
		for( $n2 =0; $n2 < count($record["title"]); $n2++ ){
			$title = $record["title"][$n2];
//------------------------ filter
			$title = str_replace('&', '&amp;', $title);
//------------------------------
			$titles .= "\n\t\t".str_replace("{{text}}", $title, $_vars["tpl_item"]);
		}
		$node = str_replace("{{title}}", $titles."\n", $node);
//---------------

//--------------- links
		$links = "";
		if( isset($record["links"]) ){
			for( $n2 =0; $n2 < count($record["links"]); $n2++ ){
				$link_str = $record["links"][$n2];
//------------------------ filter
				$link_str = str_replace('&', '&amp;', $link_str);
//------------------------------
				$links .= "\n\t\t".str_replace("{{source}}", $link_str, $_vars["tpl_links_item"]);
			}//next
			$links = str_replace("{{list}}", $links."\n\t", $_vars["tpl_links"]);
		}
		$node = str_replace("{{related_links}}", $links."\n", $node);
//---------------

//--------------- pictures
		$pics = "";
		if( isset($record["pictures"]) ){
			for( $n2 =0; $n2 < count($record["pictures"]); $n2++ ){
				$img_str = $record["pictures"][$n2];
				if( count($img_str) === 0){
					continue;
				}

				if( strpos( $img_str, "<img") !== false){
					//$img_str = htmlspecialchars($img_str);
					//$img_str = str_replace("&quot;&gt", "&quot;/&gt", $img_str);
					//$img_str = htmlspecialchars_decode($img_str);
//--------------------------- fix, get src 
//$pattern = '/href="(.+)"/';
$pattern = '/src=\"([^\"]*)\"/';
//echo $pattern;
preg_match($pattern, $img_str, $matches);
//echo "<pre>";
//print_r($matches);
//echo "</pre>";
$img_str = $matches[1];
//echo $img_src;
//---------------------------
					//$pics .= "\n\t\t". $img_str;
					$pics .= "\n\t\t".str_replace("{{source}}", $img_str, $_vars["tpl_image"]);
				} else {
					$pics .= "\n\t\t".str_replace("{{source}}", $img_str, $_vars["tpl_image"]);
				}
			}//next
			$pics = str_replace("{{list}}", $pics."\n\t", $_vars["tpl_images"]);
		}
		$node = str_replace("{{images}}", $pics."\n", $node);
//---------------

//--------------- tags
		$tags = "";
		if( isset($record["tags"]) ){
			for( $n2 =0; $n2 < count($record["tags"]); $n2++ ){
				$tid_str = $record["tags"][$n2]->tid;
				$tag_str = $record["tags"][$n2]->name;
				//$codename_str = $record["tags"][$n2]->codename;
				//$tags .= "\n\t\t".str_replace(["{{tid}}", "{{name}}", "{{codename}}"], [$tid_str, $tag_str, $codename_str], $_vars["tplNodeTagsItem"]);
				$tags .= "\n\t\t".str_replace(["{{tid}}", "{{name}}"], [$tid_str, $tag_str], $_vars["tplNodeTagsItem"]);
			}//next
			$tags = str_replace("{{list}}", $tags."\n\t", $_vars["tplNodeTags"]);
		}
		$node = str_replace("{{tags}}", $tags."\n", $node);
//---------------

		$nodeList .= "\n\n".$node;
	}//next


	$xml = str_replace("{{nodelist}}", $nodeList, $_vars["export_tpl"]);
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";

	return $xml;
}//end formXML()


function formTagList( $records ){
	global $_vars;
	
	$tagList = "";

	for( $n1 = 0; $n1 < count( $records ); $n1++)	{
		$record = $records[$n1];
//echo "<pre>";
//print_r($record);
//echo "</pre>";

		$tag = $_vars["tpl_termin_item"];

		$tag = str_replace("{{tid}}", $record->tid, $tag);
		$tag = str_replace("{{vid}}", $record->vid, $tag);
		$tag = str_replace("{{name}}", $record->name, $tag);

		$description="";
		if( isset($record->description) ){
			$description = trim( $record->description );
		} 
		$tag = str_replace("{{description}}", $description, $tag);

		$tagList .= "\n\t".$tag;
	}//next

	$node = str_replace("{{list}}", $tagList."\n", $_vars["tpl_tagList"]);
	
	return $node;
}//end formTagList()



function writeXML($xml){
	global $_vars;

	if( !empty($xml) ){
		if( $_vars["runType"] == "web") {
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
}//end writeXML()


function view_form(){
	global $_vars;
	//global $exportBookName;
	global $sqlite_path;
	
echo "
<html>
<head>
	<meta http-equiv='content-type' content='text/html; charset=utf-8'/>
	<link rel='stylesheet' href='../css/bootstrap337.min.css'/>
</head>
<body>

<div class='container'>
	<div class='page-header'>
		<h2>".$_vars["appTitle"]."</h2>
	</div>
	
	<form method=post name='form_export' action='' class='form'>
		<fieldset>
		
<legend>Export params:</legend>
		<div class=class='form-group'>
 
<div>
	<label>filename</label>
	<input 
	type='text'
	name='filename'
	value='".$_vars["filename"]."'
	class='form-control'/>
</div>

<div>
	<label>sqlite_path</label>
	<input 
	class='form-control'
	type='text' 
	name='sqlite_path' 
	size='80'
	value='".$sqlite_path."'/>
</div>
<pre>
sqlite:/home/www/sites/music/cms/music_drupal/db/music.sqlite
sqlite:/mnt/d2/temp/music.sqlite
</pre>
		</div>

		<input type=hidden name='action' value='export'/>
		<input type=submit value='export' class='btn btn-large btn-primary'/>
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
