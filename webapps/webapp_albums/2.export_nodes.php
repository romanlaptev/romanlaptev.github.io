<?php
//---------------------------
// Bootstrap Drupal.
//---------------------------
chdir ("../");
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//---------------------------

//global $log;
//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//echo "</pre>";

$form = view_form();
$action = $_REQUEST['action'];
switch ($action)
{
	case export:
		process_export();
	break;
}

function process_export()
{
	global $log;
	if( empty ($_REQUEST['filename']) )
	{
		return $log = "<span class='error'>filename is empty...</span><br>";
	}

	if (empty($_REQUEST['vocabulary_vid']))
	{
		return $log = "<span class='error'>vocabulary_vid is empty...</span><br>";
	}

	if (empty($_REQUEST['node_type']))
	{
		return $log = "<span class='error'>node_type is empty...</span><br>";
	}

	$filename = $_REQUEST['filename'];
	$vocabulary_vid = $_REQUEST['vocabulary_vid'];
	$node_type = $_REQUEST['node_type'];
	drupal_export_nodes_xml ( $filename, $vocabulary_vid, $node_type);
}

function view_form()
{
	date_default_timezone_set('Asia/Novosibirsk');
	$out="";
	$out .= "<form method=post name=form_export action=''>
<fieldset><legend><b>Параметры экспорта</b></legend>";

	$out .= "<div class='section'>";
	$out .= "filename: <input type=text name=filename size=40 value='export_albums.xml'/>";
	$out .= "</div>";

	$out .= "<div class='section'><b>Словари таксономии.</b><br>";
	$out .= drupal_view_vocabulary_list(); //вывод имеющихся словарей таксономии
	$out .= "</div>";

	$out .= "<div class='section'><b>Типы материалов.</b><br>";
	$out .= drupal_view_node_type();
	$out .= "</div>";

	$out .= "<div class='section'><b>action</b><br>";
	$out .= "<ul>
	<li><input type=radio name=action value='export' checked='checked'>export</li>
</ul>";
	$out .= "</div>";
	
	$out .= "<input type=submit value='submit'>";
	$out .= "</fieldset></form>";

	return $out;
} //-------------------------- end func

function drupal_view_node_type()
{
	$out = "";
	$query = "SELECT * FROM node_type;";
	$res = db_query($query);
	$out .= "<ul>";
	while($row = db_fetch_object($res))
	{
		if( $row->type == "photogallery_image" )
		{
			$out .= "<li><input type=radio 
name=node_type  checked='checked' value='".$row->type."'/>".$row->type.", ".$row->name."</li>";
		}
		else
			$out .= "<li><input type=radio name=node_type value='".$row->type."'/>".$row->type.", ".$row->name."</li>";
	}
	$out .= "</ul>";
	return $out;
} //end drupal_view_node_type()

function drupal_view_vocabulary_list()
{
	$out = "";
	$query = "SELECT vid, name FROM vocabulary;";
	$res = db_query($query);
	$out .= "<ul>";
	while($row = db_fetch_object($res))
	{
		if( $row->vid == "1" )//галереи изображений
		{
			$out .= "<li><input type=radio 
name='vocabulary_vid'  checked='checked' value='".$row->vid."'/>".$row->name."</li>";
		}
		else
			$out .= "<li><input type=radio name='vocabulary_vid' value='".$row->vid."'/>".$row->name."</li>";
	}
	$out .= "</ul>";

	return $out;
} //end drupal_view_vocabulary_list()

function drupal_export_nodes_xml( $filename, $vid, $node_type )
{
	switch ($node_type)
	{
		case "photogallery_image":
			$output = "";
			$output .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
			$output .= "<albums>\n";

			if (!empty($vid))
			{
				$output .= export_taxonomy_vocabulary($vid);
			}

			$output .= export_nodes($node_type,$vid);
			$output .= "</albums>\n";

			if (!empty($output))
			{
				header('Content-Type:  application/xhtml+xml');
				header('Content-Disposition: attachment; filename='.$filename.'');
				header('Content-Transfer-Encoding: binary');
				header('Content-Length: '.strlen($output));
				echo $output;
			}
		break;
	}
}//end drupal_export_nodes_xml()

function export_taxonomy_vocabulary($vid)
{
	//global $log,$message;
	$output .= "<taxonomy_vocabulary>\n";

//---------------------- экспорт терминов
	$query = "SELECT 
term_data.tid, 
term_data.name, 
term_data.description, 
term_data.weight,
term_hierarchy.parent
FROM term_data 
LEFT JOIN term_hierarchy ON term_hierarchy.tid=term_data.tid 
WHERE vid=".$vid.";";
$message .= $query;
$message .= "<br>";
	//$res = mysql_query($query) or die("<font color=red>Query error: </font>".mysql_error());
	$res = db_query($query);
	//if (mysql_num_rows($res) > 0)
	//{
		//while ($row = mysql_fetch_assoc($res))
		while ($row = db_fetch_object($res))
		{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
			//$output .= "<termin tid='".$row['tid']."'>";
			//$output .= $row['name'];
			$output .= "<termin tid='".$row->tid
."' tid_parent='".$row->parent
."' weight='".$row->weight."'>\n";

			//$output .= $row->name;
			$name = htmlspecialchars ($row->name);
			$output .= "	<term_name>".$name."</term_name>\n";

			if (!empty($row->description))
			{
				$name = htmlspecialchars ($row->description);
				$output .= "	<term_description>".$name."</term_description>\n";
			}

			$output .= "</termin>\n";
		}//------------------------ end while
	//}
//---------------------------------------
	$output .= "</taxonomy_vocabulary>\n";

	return $output;
}//----------------------------- end func


function export_nodes($node_type, $vid)
{
	//global $log,$message;
	$query = "
-- получить ноды с прикрепленным изображением 
SELECT 
node.nid, 
node.title, 
node.status, 
node.created, 
node.changed, 
term_node.tid,
-- term_data.tid,
term_data.vid,
term_data.name,
node_revisions.teaser, 
node_revisions.body, 
content_type_photogallery_image.nid, 
content_type_photogallery_image.field_author_value, 
content_type_photogallery_image.field_create_date_value, 
-- content_type_photogallery_image.field_style_value, 
-- content_type_photogallery_image.field_genre_value, 
-- content_type_photogallery_image.field_technique_value, 
content_type_photogallery_image.field_title_value, 
content_type_photogallery_image.field_preview_img_value, 
content_type_photogallery_image.field_big_img_value, 
content_type_photogallery_image.field_original_img_value, 
content_type_photogallery_image.field_img1_gallery_fid, 
content_type_photogallery_image.field_info_value,
files.fid, 
files.filepath, 
content_field_filename.field_filename_value 
FROM node 
LEFT JOIN node_revisions ON node_revisions.nid=node.nid 
LEFT JOIN content_type_photogallery_image ON content_type_photogallery_image.nid=node.nid 
LEFT JOIN files ON files.fid=content_type_photogallery_image.field_img1_gallery_fid 
LEFT JOIN term_node ON term_node.nid=node.nid 
LEFT JOIN term_data ON term_data.tid=term_node.tid
LEFT JOIN content_field_filename ON content_field_filename.nid=node.nid
WHERE node.type='".$node_type."' AND term_data.vid='".$vid."' 
ORDER BY term_data.tid;";

	$num=0;
	$num_double=0;
	$prev_tid=0;
	$output="";
	//$output .= "	<album>start\n";

	$result = db_query($query);
	while ($row = db_fetch_object($result)) 
	{  
		$num++;

		for ($n1=0; $n1 < count($nid_arr); $n1++)
		{
			if ($row->nid == $nid_arr[$n1])
			{
//$log .= "<span class='warning'>Найден дубликат (материал с несколькими терминами)</span>";
//$log .= ", <a href='/node/".$row->nid."'>".$row->title."</a>";
//$log .= ", термин - ".$row->name;
//$log .= "<br>";
				$num_double++;
			}
		}
		$nid_arr[]=$row->nid; //запомнить nid обработанной ноды
		

		if ($prev_tid==0) 
		{
			//$output .= "	<album tid=\"".$row->tid."\" name=\"".htmlspecialchars ($row->name)."\">\n";
			$output .= "	<album tid=\"".$row->tid."\" vid=\"".$row->vid."\" name=\"".htmlspecialchars ($row->name)."\">\n";
			$output .= add_node_picture($num,$row);
		}

		if (($row->tid != $prev_tid) && ($prev_tid>0)) 
		{
			$output .= "	</album>\n";
			//$output .= "	<album name=\"".htmlspecialchars ($row->name)."\">\n";
			//$output .= "	<album tid=\"".$row->tid."\" name=\"".htmlspecialchars ($row->name)."\">\n";
			$output .= "	<album tid=\"".$row->tid."\" vid=\"".$row->vid."\" name=\"".htmlspecialchars ($row->name)."\">\n";
			$output .= add_node_picture($num,$row);
		}

		if ($row->tid == $prev_tid) 
		{
			$output .= add_node_picture($num,$row);
		}
		$prev_tid = $row->tid; //запомнить термин обработанной ноды
//echo "prev_tid = ".$prev_tid;
//echo "<br>";
	} //------------------------------ end while
	$output .= "	</album>\n";

	$output = str_replace("'", "&#39;", $output); //замена апострофа его кодом
	//$message .= "Выполнен экспорт ".$num." нод";
	//$message .= "<br>";
	//$message .= "дубликатов (материал с несколькими терминами) ".$num_double;
	//$message .= "<br>";
	return $output;
}//----------------------------- end func

function add_node_picture($num, $row)
{
	//global $log, $message;
	$output="";
//$log .= $num.". Экспорт <a href='/node/".$row->nid."'>".$row->title."</a>";
//$log .= ", термин - ".$row->name;
//$log .= "<br>";

	if ($row->status==0)
	{
		return;
	}

	$output .= "	<node num=\"".$num."\" nid=\"".$row->nid."\">\n";
	$output .= "		<status>".$row->status."</status>\n";
	$output .= "		<created timestamp=\"".$row->created."\">".date('d-M-Y H:i:s', $row->created)."</created>\n";
	$output .= "		<changed timestamp=\"".$row->changed."\">".date('d-M-Y H:i:s', $row->changed)."</changed>\n";

	$title = htmlspecialchars ($row->title);
	$output .= "		<title>".$title."</title>\n";

	$termin = htmlspecialchars ($row->name);
	$output .= "		<termin tid=\"".$row->tid."\">".$termin."</termin>\n";

	$author = htmlspecialchars ($row->field_author_value);
	$output .= "		<author>".$author."</author>\n";
	$field_title_value = htmlspecialchars ($row->field_title_value);
	$output .= "		<field_title_value>".$field_title_value."</field_title_value>\n";

	if (!empty($row->teaser))
	{
		$teaser = htmlspecialchars ($row->teaser);
		$output .= "		<teaser>".$teaser."</teaser>\n";
	}
/*
	if (!empty($row->body))
	{
		$body = htmlspecialchars ($row->body);
		$output .= "		<body>".$body."</body>\n";
	}
*/
	if (!empty($row->field_info_value))
	{
		$field_info_value = htmlspecialchars ($row->field_info_value);
		$output .= "		<body>".$field_info_value."</body>\n";
	}

	$output .= "		<year>".$row->field_create_date_value."</year>\n";

	//$style = htmlspecialchars ($row->field_style_value);
	//$output .= "		<style>".$style."</style>\n";

	//$genre = htmlspecialchars ($row->field_genre_value);
	//$output .= "		<genre>".$genre."</genre>\n";

	//$technique = htmlspecialchars ($row->field_technique_value);
	//$output .= "		<technique>".$technique."</technique>\n";

	$preview_img = htmlspecialchars(trim($row->field_preview_img_value));
	$big_img = htmlspecialchars(trim($row->field_big_img_value));
	$original_img = htmlspecialchars(trim($row->field_original_img_value));
	if (!empty($row->field_filename_value))
	{
		$preview_img .= '/'.$row->field_filename_value;
		$big_img .= '/'.$row->field_filename_value;
		$original_img .= '/'.$row->field_filename_value;
	}

	$output .= "		<preview_img>".$preview_img."</preview_img>\n";
	$output .= "		<big_img>".$big_img."</big_img>\n";
	$output .= "		<original_img>".$original_img."</original_img>\n";

	$output .= "	</node>\n";
	return $output;
}//-------------------------- end func

?>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<style>
legend
{
	color:green;
	font-size:16px;
}
.error{
	font-weight:bold;
	color:red;
}

.section {
  margin: 10px;
  padding: 5px;
}
.section > ul {
  padding-left: 0;
}
.section li {
  list-style: none outside none;
}
	</style>
</head>
<body>
	<h2>Export albums database , Drupal termins, nodes to xml file</h2>
<!--
	<div id='message'><?php echo $message; ?></div>
-->
	<div id='form'><?php echo $form; ?></div>
	<div id='log'><?php echo $log; ?></div>

</body>
</html>

