<?php
//---------------------------
// Bootstrap Drupal.
//---------------------------
chdir ("../");
$fs_path = getcwd();

require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//---------------------------
//global $base_url;
global $log;

//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//echo "</pre>";


//директория с файлами для экспорта
if (!empty($_REQUEST['fs_path']))
{
	$fs_path = $_REQUEST['fs_path'];
	$url_path = $_REQUEST['url_path'];
}
else
{
	$fs_path = $fs_path.'/sites/default/files';
	$url_path = '../sites/default/files';
}

// Извлекаем параметры из запроса
//if (!isset($_REQUEST['action']) && empty($_REQUEST['action']))
if (empty($_REQUEST['action']))
  {
	$form = view_form(); // вывод формы
	$message = "<span class='error'>var action is empty...</span>";
	$message .= "<br>";
  }
else // Параметр action определен
  {
	$action = $_REQUEST['action'];

	switch ($action)
	  {
//==========================================================================
		case export:
			$form = view_form(); // вывод формы

			if (!empty($_REQUEST['filename']))
			{
				$filename = $_REQUEST['filename'];
				if (!empty($_REQUEST['vocabulary_vid']))
				{
					$vocabulary_vid = $_REQUEST['vocabulary_vid'];
//-------------------------------------- снова определить название словаря
global $db_prefix;
$query="SELECT name FROM ".$db_prefix."vocabulary WHERE vid=".$vocabulary_vid.";";
$res = db_query($query);
$row = db_fetch_object($res);
$vocabulary_name = $row->name;
//$log .= "vocabulary_name - ".$vocabulary_name;
//$log .= "<br>";
//------------------------------------------
				}

				if (!empty($_REQUEST['node_type']))
				{
					$node_type = $_REQUEST['node_type'];
					drupal_export_nodes_xml ($fs_path,
								$url_path,
								$filename,
								$vocabulary_vid,
								$node_type);
				}
				else
				{
					$message = "<span class='error'>node_type is empty...</span>";
					$message .= "<br>";
				}

			}
			else
			{
				$message = "<span class='error'>var filename is empty!!!!</span>";
				$message .= "<br>";
			}
		break;
//==========================================================================
	  }//------------------------------ end switch

  }//--------------------------------- end elseif action
//=================================================================================

//====================
// FUNCTIONS
//====================
//-------------------------
// ФОРМЫ 
//-------------------------
function view_form()
{
	global $fs_path,$url_path;
	date_default_timezone_set('Asia/Novosibirsk');
	$out="";
//------------------------------------- form
	//$out .= "<div id='info'>info messages</div>";
	$out .= "<form method=post name=form_export action='".$_SERVER['SCRIPT_NAME']."'>
<fieldset><legend><b>Параметры экспорта</b></legend>";

	$out .= "<div class='section'>";
	$out .= "fs_path: <input type=text name=fs_path size=60 value='".$fs_path."'/><br>";
	$out .= "/mnt/disk2/temp<br>";
	$out .= "url_path: <input type=text name=url_path size=60 value='".$url_path."'/><br>";

	$out .= "filename: <input type=text name=filename size=40 value='export_".date('d-m-Y_H-i').".xml'/>";

	$out .= "</div>";

//------------------------------------- taxonomy
	$out .= "<div class='section'><b>Словари таксономии.</b><br>";
	$out .= drupal_view_vocabulary_list(); //вывод имеющихся словарей таксономии
	$out .= "</div>";


//------------------------------------- nodes
	$out .= "<div class='section'><b>Типы материалов.</b><br>";
	$out .= drupal_view_node_type();
	$out .= "</div>";

	$out .= "<div class='section'><b>action</b><br>";
	$out .= "<input type=radio name=action value='export'>export<br>";
	$out .= "</div>";
	
	$out .= "<input type=submit value='submit'>";
	$out .= "</fieldset></form>";

	return $out;
} //-------------------------- end func

//------------------------------------ 
//список типов материалов
//------------------------------------ 
function drupal_view_node_type()
{
	global $db_prefix;
	$out = "";
	$query = "SELECT * FROM ".$db_prefix."node_type;";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
		$out .= "<input type=radio name=node_type value='".$row->type."'/>".$row->type.", ".$row->name."<br>";
	}
	
	return $out;
} //-------------------------- end func


function drupal_export_nodes_xml($fs_path,
				$url_path,
				$filename,
				$vid,
				$node_type)
{
	global $log,$message;
	$log .= "<h2>export ".$node_type." nodes in ".$filename."</h2>";

	switch ($node_type)
	{
		case "video":
			$log .= export_taxonomy_vocabulary('ФильмЫ');// словарь таксономии Фильмы
			export_video_nodes();
		break;
		case "photogallery_image":
//$dir = "/home/vol12/500mb.net/runet_11119978/htdocs/albums/0_export";
//$dir = "/home/u754457009/public_html/albums/0_export"; //albums.vhost.16mb.com
//$dir = "0_export";
			$output = "";
			$output .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
			$output .= "<albums>\n";

			if (!empty($vid))
			{
				$output .= export_taxonomy_vocabulary($vid);
			}

			$output .= export_nodes($node_type,$vid);
			$output .= "</albums>\n";
//-------------------------------------- write XML
			if (!empty($output))
			{
//echo $output;
				$num_bytes = file_put_contents ($fs_path."/".$filename, $output);
				if ($num_bytes > 0)
				{
$message .= "-- <span class='ok'>Write </span>".$num_bytes." bytes  in ".$filename;
$message .= "<br>";
//$log .= "base_url = ".$base_url;
//$log .= "<br>";
		
$message .= "<a href='".$url_path."/".$filename."'>".$filename."</a>";
//echo "<pre>";
//readfile ($output_filename);
//echo "</pre>";
				}
				else
				{
$message .= getcwd();
$message .= "<br>";
$message .= "-- <span class='error'>Write error in </span>".$filename;
$message .= "<br>";
				}
			}
//--------------------------------------
		break;
	}//------------------------------------- end switch


}//--------------------------- end func

//------------------------------------ 
//список имеющихся словарей таксономии
//------------------------------------ 
function drupal_view_vocabulary_list()
{
	global $db_prefix;
	$out = "";
	$query = "SELECT * FROM ".$db_prefix."vocabulary;";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$out .= "<input type=radio name='vocabulary_vid' value='".$row->vid."'/>".$row->name."<br>";
	}
	//$out .= "<br>";
	return $out;
} //-------------------------- end func


function export_taxonomy_vocabulary($vid)
{
	global $log,$message;
	$output .= "<taxonomy_vocabulary>\n";
//---------------------- по названию, определить vid словаря таксономии
/*
	//D7 $query = "SELECT vid, name FROM taxonomy_vocabulary WHERE UPPER(name)=UPPER('".$vocabulary."');";
	$query = "SELECT vid, name FROM vocabulary WHERE UPPER(name)=UPPER('".$vocabulary."');";
	//$res = mysql_query($query) or die("<font color=red>Query error: </font>".mysql_error());
	$res = db_query($query);
	//if (mysql_num_rows($res) > 0)
	if ($row = db_fetch_object($res))
	{
		//$row = mysql_fetch_assoc($res);
		//$vid = $row['vid'];
		$vid = $row->vid;
		$message .= "-- <font color=green>Find vocabulary ".$vocabulary."</font>, vid=".$vid;
		$message .=  "<br>";
	}
	else 
	{
		$message .= "<font color=red>Error: </font>not find vocabulary ".$vocabulary;
		//exit();
	}
*/
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

function export_video_nodes()
{
}//----------------------------- end func

function export_nodes($node_type, $vid)
{
	global $log,$message;
//-------------------------------------- create XML
	//$query = "SELECT * FROM node WHERE type='".$node_type."';";
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
content_type_photogallery_image.field_style_value, 
content_type_photogallery_image.field_genre_value, 
content_type_photogallery_image.field_technique_value, 
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
echo $query;
echo "<br>";
//$message .= $query;
//$message .= "<br>";

	$num=0;
	$num_double=0;
	$prev_tid=0;
	$output="";
	//$output .= "	<album>start\n";

	$result = db_query($query);
	while ($row = db_fetch_object($result)) 
	{  
echo "<pre>";
print_r($row);  
echo "</pre>";
		$num++;

		for ($n1=0; $n1 < count($nid_arr); $n1++)
		{
			if ($row->nid == $nid_arr[$n1])
			{
$log .= "<span class='warning'>Найден дубликат (материал с несколькими терминами)</span>";
$log .= ", <a href='/node/".$row->nid."'>".$row->title."</a>";
$log .= ", термин - ".$row->name;
$log .= "<br>";
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
	$message .= "Выполнен экспорт ".$num." нод";
	$message .= "<br>";
	$message .= "дубликатов (материал с несколькими терминами) ".$num_double;
	$message .= "<br>";
	return $output;
}//----------------------------- end func

function add_node_picture($num,$row)
{
	global $log,$message;
	$output="";
//echo "<pre>";
//print_r($row);
//echo "</pre>";
$log .= $num.". Экспорт <a href='/node/".$row->nid."'>".$row->title."</a>";
$log .= ", термин - ".$row->name;
$log .= "<br>";

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

	$style = htmlspecialchars ($row->field_style_value);
	$output .= "		<style>".$style."</style>\n";

	$genre = htmlspecialchars ($row->field_genre_value);
	$output .= "		<genre>".$genre."</genre>\n";

	$technique = htmlspecialchars ($row->field_technique_value);
	$output .= "		<technique>".$technique."</technique>\n";


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

//[field_img1_gallery_fid] => 
//[fid] => 
//[filepath] => 
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
.section
{
	border:1px solid;
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
	border: 1px solid;
	min-height: 30px;
	padding:20px;
/*
	background:darkred;
	position:absolute;
	top:20px;
	right:20px;
    float: right;
    width: 250px;	
*/
}
#form
{
}
#log
{
	border: 1px solid;
	min-height: 100px;
	padding:20px;
}
	</style>
</head>
<body>

<div id='message'><?php echo $message; ?></div>
<div id='form'><?php echo $form; ?></div>
<div id='log'><?php echo $log; ?></div>

</body>
</html>

