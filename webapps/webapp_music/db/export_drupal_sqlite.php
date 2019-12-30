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
$_vars["dbPath"] = "sqlite:/home/www/sites/music/cms/music_drupal/db/music.sqlite";

$_vars["sql"]["getNodes"] = "
SELECT 
node.nid, 
node.title, 
node.type, 
node.created, 
node.changed, 
-- node.status,
-- field_data_field_file_location.field_file_location_value,
field_data_body.body_value
FROM node
-- LEFT JOIN field_data_field_file_location ON field_data_field_file_location.entity_id=node.nid
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

$_vars["sql"]["getImages"] = "
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
taxonomy_vocabulary.name as group_name,
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
taxonomy_vocabulary.name as group_name,
taxonomy_term_data.name 
FROM taxonomy_term_data 
LEFT JOIN taxonomy_vocabulary ON taxonomy_vocabulary.vid=taxonomy_term_data.vid
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

$_vars["tplNode"] = '<node type="{{type}}">
	<title>{{playlist_titles}}</title>
	{{images}}
	{{related_links}}
	{{nodeTags}}
	<published format="dd:mm:yyyy hh:mm:ss">{{published}}</published>
	<updated format="dd:mm:yyyy hh:mm:ss">{{updated}}</updated>
</node>';

$_vars["tpl_item"] = '<item>{{text}}</item>';

$_vars["tpl_images"] = '<images>{{list}}</images>';
$_vars["tpl_image"] = '<img src="{{source}}"/>';

$_vars["tpl_links"] = '<related_links>{{list}}</related_links>';
$_vars["tpl_links_item"] = '<li>{{source}}</li>';

$_vars["tplNodeTags"] = '<tags>{{list}}</tags>';
$_vars["tplNodeTagsItem"] = '<item vid="{{vid}}" tid="{{tid}}" group_name="{{group_name}}">{{name}}</item>';

$_vars["tplTagList"] = '<taglist>{{list}}</taglist>';
$_vars["tplTagListItem"] = '<tag tid="{{tid}}" vid="{{vid}}" group_name="{{group_name}}">{{name}}</tag>';


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
				
				if(empty($_REQUEST['db_path'])){
$logMsg = "-- error, not found <b>db_path</b>";
echo $logMsg."\n";
					exit();
				}
				
				$_vars["dbPath"] = $_REQUEST['db_path'];
				$db = new PDO( $_vars["dbPath"] ) or die("Could not open database");
				
				_exportProcess();
exit();				
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

	_log( $_vars["appTitle"] );

	$logMsg = "PHP version: ".phpversion();
	_log( $logMsg );

	$logMsg = "SAPI name: ".php_sapi_name();
	_log( $logMsg );

	$logMsg = "PHP_SAPI: ".PHP_SAPI;
	_log( $logMsg );

	//$logMsg = "Drupal version: ".VERSION;
	//_log( $logMsg );
	
	$db = new PDO( $_vars["dbPath"] ) or die("Could not open database");

	_exportProcess();

	if ( !empty($_vars["xml"]) ) {
		if ( !file_exists( $_vars["filename"] ) ){
			writeXML($_vars["xml"]);
		} else {
			$oldfile = $_vars["filename"];
			$newfile = "_".$_vars["filename"];
			
			if (rename ($oldfile, $newfile)) {
				$logMsg = "- rename $oldfile (old version) to $newfile";
				_log( $logMsg );
			} else {
				$logMsg = "- unable to rename file $oldfile";
				_log( $logMsg );
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
		echo $message."\n";
	}
	if ( $_vars["runType"] == "web") {
		//echo "<div class='alert alert-info'>".$message."</div>";
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

	$_vars["nodes"] = getNodes( $_vars["sql"]["getNodes"] );
	
//get text fields	
	getMultipleFields( 
		$_vars["sql"]["getTitle"], 
		$_vars["nodes"],
		"field_title_value", 
		"playlist_titles" 
	);
	
	getMultipleFields( 
		$_vars["sql"]["getImages"], 
		$_vars["nodes"],
		"field_img_cover_value", 
		"images" 
	);
	
	getMultipleFields( 
		$_vars["sql"]["getLinks"], 
		$_vars["nodes"],
		"field_related_links_value", 
		"related_links" 
	);
	
//get taxonomy fields	
	getNodeTags( 
		$_vars["sql"]["getNodeTags"], 
		$_vars["nodes"],
		"tags" 
	);
print_r($_vars);
exit();
	
	$_vars["video"] = _convertFields($_vars["nodes"]);

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
_log("-- get node info");
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
				$tag->group_name = $result[$n2]->group_name;
				$tag->name = $result[$n2]->name;
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

			if( $key === "playlist_titles"){
				$recordVideo["playlist_titles"] = $field;
			}

			if( $key === "images"){
				if( !empty( $field ) ){
					$recordVideo["images"] = $field;
				}
			}
			if( $key === "relative_links"){
				if( !empty( $field ) ){
					$recordVideo["relative_links"] = $field;
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

$test = str_replace("{{playlist_titles}}", "#title", $_vars["xml_template"]);
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

		$node = $_vars["tplNode"];

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
		$node = str_replace("{{playlist_titles}}", $titles."\n", $node);
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
				$groupNameStr = $record["tags"][$n2]->group_name;
				$tag_str = $record["tags"][$n2]->name;
				$tags .= "\n\t\t".str_replace(
					["{{tid}}", "{{group_name}}", "{{name}}"], 
					[$tid_str, $groupNameStr, $tag_str], 
					$_vars["tplNodeTagsItem"]);
			}//next
			$tags = str_replace("{{list}}", $tags."\n\t", $_vars["tplNodeTags"]);
		}
		$node = str_replace("{{nodeTags}}", $tags."\n", $node);
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

		$tag = $_vars["tplTagListItem"];

		$tag = str_replace("{{tid}}", $record->tid, $tag);
		$tag = str_replace("{{vid}}", $record->vid, $tag);
		$tag = str_replace("{{group_name}}", $record->group_name, $tag);
		$tag = str_replace("{{name}}", $record->name, $tag);

		$tagList .= "\n\t".$tag;
	}//next

	$node = str_replace("{{list}}", $tagList."\n", $_vars["tplTagList"]);
	
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
	<label>db_path</label>
	<input 
	class='form-control'
	type='text' 
	name='db_path' 
	size='80'
	value='".$_vars["dbPath"]."'/>
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
