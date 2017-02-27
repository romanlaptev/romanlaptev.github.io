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
$log = "";
$site_content = "";

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
	global $log, $site_content;
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
	
	$xml_format = $_REQUEST['xml_format'];
	//$site_content = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
	$site_content = $_REQUEST['site_content'];

	switch ($xml_format)
	{
		case 'XML':
			drupal_export_nodes_xml ( $filename, $vocabulary_vid, $node_type);
		break;
		case 'WXR':
			$data = array();
			$data["nodes"] = get_content($node_type, $vocabulary_vid);
			$data["taxonomy"] = get_taxonomy( $vocabulary_vid );
			$data["taxonomy_sort"] = sort_termin_hierarchy( $data["taxonomy"] );
//echo "<pre>";
//print_r($data["nodes"]);
//echo "</pre>";
			write_wxr($filename, $data);
		break;
	}// end switch
	
}

function view_form()
{
	//date_default_timezone_set('Asia/Novosibirsk');
	$out="";
	$out .= "<form method=post name=form_export action=''>";

	$out .= "<fieldset><legend><b>Параметры экспорта</b></legend>	
<div class='section'>
filename: <input type=text name=filename size=40 value='export_albums.xml'/>
</div>";

	$out .= "<div class='section'><b>Словари таксономии.</b><br>";
	$out .= drupal_view_vocabulary_list(); //вывод имеющихся словарей таксономии
	$out .= "</div>";

	$out .= "<div class='section'><b>Типы материалов.</b><br>";
	$out .= drupal_view_node_type();
	$out .= "</div>";

	$out .= "
<div class='section'>
<b>xml-format file export : </b><br>
	<ul>
		<li><input type='radio' name='xml_format'  value='XML' checked/> XML </li>
		<li><input type='radio' name='xml_format' value='WXR'/> WXR ( WordPress eXtended Rss  export/import )</li>
	</ul>
</div>";

	$out .= "<div class='section'><b>action</b><br>
<ul>
	<li><input type=radio name=action value='export' checked='checked'>export</li>
</ul>
</div>";

	$out .= "
<div class='section'><b>images site-content url : </b>
	<p><input type='text' name='site_content'  size='80' value='https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc'/></p>
</div>";

	//$site_content = "";

	$out .= "<input type=submit value='submit'>";
	$out .= "</fieldset>";
	
	$out .= "</form>";

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
			$xml = "";
			$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
			$xml .= "<albums>\n";

			if (!empty($vid))
			{
				$xml .= export_taxonomy_vocabulary($vid);
			}

			$xml .= export_nodes($node_type,$vid);
			$xml .= "</albums>\n";
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";
//exit();
			if (!empty($xml))
			{
				header('Content-Type:  application/xhtml+xml');
				header('Content-Disposition: attachment; filename='.$filename.'');
				header('Content-Transfer-Encoding: binary');
				header('Content-Length: '.strlen($xml)+1);
				echo $xml;
				exit();
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
	$res = db_query($query);
	//$n1=0;
	while ($row = db_fetch_object($res))
	{
		//if($n1 < 5)//!!!!!!!!!!!!!!!!!!!!!!!!!!
		//{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$output .= "\t<termin tid='".$row->tid
."' tid_parent='".$row->parent
."' weight='".$row->weight."'>\n";
			$name = htmlspecialchars ($row->name);
			$output .= "\t\t<term_name>".$name."</term_name>\n";
			if (!empty($row->description))
			{
				$name = htmlspecialchars ($row->description);
				$output .= "	<term_description>".$name."</term_description>\n";
			}
		$output .= "\t</termin>\n";
		//}
		//$n1++;
	}//end while
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

	$result = db_query($query);
	while ($row = db_fetch_object($result)) 
	{  
		$num++;

		for ($n1=0; $n1 < count($nid_arr); $n1++)
		{
			if ($row->nid == $nid_arr[$n1])
			{
				$num_double++;
			}
		}
		$nid_arr[]=$row->nid; //запомнить nid обработанной ноды
		

		if ($prev_tid==0) 
		{
			$output .= "	<album tid=\"".$row->tid."\" vid=\"".$row->vid."\" name=\"".htmlspecialchars ($row->name)."\">\n";
			$output .= add_node_picture($num,$row);
		}

		if (($row->tid != $prev_tid) && ($prev_tid>0)) 
		{
			$output .= "	</album>\n";
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


function write_wxr( $filename, $data )
{
	global $site_content;
	$pub_author = "drupal_export";
	
	$xml="";
	$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
	$xml .= "<rss version=\"2.0\" 
xmlns:excerpt=\"http://wordpress.org/export/1.2/excerpt/\" 
xmlns:content=\"http://purl.org/rss/1.0/modules/content/\" 
xmlns:wfw=\"http://wellformedweb.org/CommentAPI/\" 
xmlns:dc=\"http://purl.org/dc/elements/1.1/\" 
xmlns:wp=\"http://wordpress.org/export/1.2/\">\n";
	$xml .="<channel>\n";
	$xml .="\t<title></title>\n";
	$xml .="\t<link></link>\n";
	$xml .="\t<description/>\n";
	$xml .="\t<pubDate>" .date('D, d M Y H:i:s O'). "</pubDate>\n";
	$xml .="\t <language>ru</language>\n";
	$xml .="\t <wp:wxr_version>1.2</wp:wxr_version>\n";
	$xml .="\t <wp:base_site_url></wp:base_site_url>\n";
	$xml .="\t <wp:base_blog_url></wp:base_blog_url>\n";
	$xml .="\t <wp:author>\n";
	$xml .="\t\t <wp:author_login>". $pub_author ."</wp:author_login>\n";
	$xml .="\t\t  <wp:author_email></wp:author_email>\n";
	$xml .="\t\t  <wp:author_display_name><![CDATA[". $pub_author ."]]></wp:author_display_name>\n";
	$xml .="\t\t  <wp:author_first_name><![CDATA[]]></wp:author_first_name>\n";
	$xml .="\t\t  <wp:author_last_name><![CDATA[]]></wp:author_last_name>\n";
	$xml .="\t </wp:author>\n";
	
/*
            [21] => stdClass Object
                (
                    [tid] => 74
                    [name] => Джон Тенниел
                    [description] => 220px-john_tenniel00.jpg
                    [weight] => 1
                    [parent] => 73
                    [dst] => illustration/john-tenniel
                )
*/
	foreach ($data["taxonomy_sort"] as $row )
	{
		$xml .="\t <wp:category>\n";
		
		//$xml .="\t\t <wp:term_id>" .$row->tid. "</wp:term_id>\n";
		$xml .="\t\t <wp:term_id/>\n";
		
		$xml .="\t\t <wp:category_nicename>" .$row->dst. "</wp:category_nicename>\n";
		$category_parent_name = "";
		foreach ($data["taxonomy"] as $row2 )
		{
			if (  $row->parent == $row2->tid)
			{
				$category_parent_name = $row2->dst;
			}
		}//end foreach
		
		$xml .="\t\t <wp:category_parent>" .$category_parent_name. "</wp:category_parent>\n";
		$xml .="\t\t <wp:cat_name><![CDATA[" .$row->name. "]]></wp:cat_name>\n";
		
		$xml .="\t\t <wp:category_description><![CDATA[" .$row->description. "]]></wp:category_description>\n";
		
		$xml .="\t </wp:category>\n";
	}//----------------------- end foreach

/*
            [0] => stdClass Object
                (
                    [nid] => 7
                    [title] => Монахиня трапписткого ордена (The Trappistine), реклама ликера
                    [status] => 1
                    [created] => 1336007280
                    [changed] => 1440946283
                    [tid] => 2
                    [vid] => 1
                    [name] => Альфонс Муха
                    [teaser] => 
                    [body] => http://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BF%D0%BF%D0%B8%D1%81%D1%82%D1%8B
"Монахи некоторых северных монастырей зарабатывали на жизнь изготовлением ликёров, а в Бельгии — известного пива."
                    [field_author_value] => Альфонс Муха
                    [field_create_date_value] => 1897
                    [field_title_value] => Монахиня трапписткого ордена (The Trappistine), реклама ликера, 1897, Альфонс Муха
                    [field_preview_img_value] => /site-content/albums/gallery_images/imagecache/preview_gallery_img/gallery_images
                    [field_big_img_value] => /site-content/albums/gallery_images/imagecache/w1024/gallery_images
                    [field_original_img_value] => /site-content/albums/gallery_images
                    [field_img1_gallery_fid] => 
                    [field_info_value] => 
                    [fid] => 
                    [filepath] => 
                    [field_filename_value] => the-trappistine-1897.jpg
                )
*/
	
	foreach ($data["nodes"] as $row )
	{
		$nid = $row->nid;
		$title = htmlspecialchars($row->title);
		$created = date('Y-m-d H:i:s', $row->created);
		$pubdate = date('D, d M Y H:i:s O', $row->created);
		$changed = date('Y-m-d H:i:s', $row->changed);

		$xml .="\t <item>\n";
		$xml .="\t\t <title>" .$title. "</title>\n";
		$xml .="\t\t <link></link>\n";
		$xml .="\t\t <pubDate>" .$pubdate. "</pubDate>\n";
		$xml .="\t\t <dc:creator>". $pub_author ."</dc:creator>\n";
		$xml .="\t\t <guid isPermaLink=\"false\"></guid>\n";
		$xml .="\t\t <description>". $row->field_title_value ."</description>\n";
		
		$body = "";
		/*
		$body .= "<div id='node-info'>\n";
		$body .= "<ul>\n";
		$body .= "<li>". "field_create_date_value: ". $row->field_create_date_value.  "</li>\n";
		$body .= "<li>". "field_title_value: ". $row->field_title_value.  "</li>\n";
		$body .= "<li>". "field_preview_img_value: ". $row->field_preview_img_value.  "</li>\n";
		$body .= "<li>". "field_big_img_value: ". $row->field_big_img_value.  "</li>\n";
		$body .= "<li>". "field_original_img_value: ". $row->field_original_img_value.  "</li>\n";
		$body .= "<li>". "field_filename_value: ". $row->field_filename_value.  "</li>\n";
		$body .= "</ul>\n";
		$body .= "</div>\n";
		*/
		$img_url = $site_content . $row->field_big_img_value . "/" . $row->field_filename_value;
		$img_src = $site_content . $row->field_preview_img_value . "/" . $row->field_filename_value;
		$img_url_org = $site_content . $row->field_original_img_value . "/" . $row->field_filename_value;
		
		$body .= "<div class='thumbnail' style='text-align: center;'>\n";
		$body .= "<a href='$img_url' target='_blank'><img src='$img_src ' alt='$row->field_title_value'/></a>\n";
		$body .= "<div class='resize-links'>\n";
		$body .= "<span style='float: left;' class='big-size-link'><a href='$img_url' target='_blank'><b>увеличить</b></a></span>";
		$body .= "<span style='float: right;' class='full-size-link'><a href='$img_url_org'>view original image</a></span>\n";
		$body .= "</div>\n";
		$body .= "<div class='caption'>\n";
		$body .= "<a href='$img_url' target='_blank'><h3>$row->field_title_value</h3>\n<p>$row->field_create_date_value</p></a>\n";
		$body .= "</div>\n";
		$body .= "</div>\n";

		if (!empty($row->body))
		{
			$body .= htmlspecialchars ($row->body);
		}
		$xml .=  "<content:encoded><![CDATA[\n";
		$xml .=  $body."\n";
		$xml .=  "]]></content:encoded>\n";
			
		$xml .="\t\t <excerpt:encoded><![CDATA[]]></excerpt:encoded>\n";
		$xml .="\t\t <wp:post_id>" .$nid. "</wp:post_id>\n";
		$xml .="\t\t <wp:post_date>" .$created. "</wp:post_date>\n";
		$xml .="\t\t <wp:post_date_gmt>" .$changed. "</wp:post_date_gmt>\n";
		$xml .="\t\t <wp:comment_status>closed</wp:comment_status>\n";
		$xml .="\t\t <wp:ping_status>closed</wp:ping_status>\n";
		$xml .="\t\t <wp:post_name>" .$title. "</wp:post_name>\n";
		$xml .="\t\t <wp:status>publish</wp:status>\n"; // publish, draft, pending, private
		
		$xml .="\t\t <wp:post_parent>" .$plid. "</wp:post_parent>\n";
		
		$xml .="\t\t <wp:menu_order>0</wp:menu_order>\n";
		$xml .="\t\t <wp:post_type>post</wp:post_type>\n"; //post, page, media
		$xml .="\t\t <wp:post_password/>\n";
		$xml .="\t\t <wp:is_sticky>0</wp:is_sticky>\n";
		
		$category_name = $row->category_name;
		$category_nicename = $row->category_nicename;
		$xml .="\t\t <category domain=\"category\" nicename=\"$category_nicename\"><![CDATA[" .$category_name. "]]></category>\n";
		
		$xml .="\t </item>\n";
	}//----------------------- end foreach

	$xml .="</channel>\n";
	$xml .="</rss>\n";

/*
echo "<pre>";
echo htmlspecialchars($xml);
echo "</pre>";
*/

	if ( !empty($xml) )
	{
		header('Content-Type:  application/xhtml+xml');
		header('Content-Disposition: attachment; filename='.$filename.'');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: '.strlen($xml) +1 );
		echo $xml;
		exit();
	}

}//end write_wxr()


function get_taxonomy( $vid )
{
	$query = "SELECT 
term_data.tid, 
term_data.name, 
term_data.description, 
term_data.weight,
term_hierarchy.parent,
url_alias.dst
FROM term_data 
LEFT JOIN term_hierarchy ON term_hierarchy.tid=term_data.tid 
LEFT JOIN url_alias ON url_alias.src=CONCAT('taxonomy/term/',term_data.tid)
WHERE vid=".$vid.";";

	$res = db_query($query);
	$data =  array();
	while ($row = db_fetch_object($res))
	{
		$data[] = $row;
	}//end while

	return $data;
}//end get_taxonomy

function sort_termin_hierarchy($taxonomy_unsort_)
{
	global $taxonomy_unsort, $taxonomy_sort;
	$taxonomy_unsort = $taxonomy_unsort_;
	$taxonomy_sort = array();
	foreach ( $taxonomy_unsort as $termin )
	{
		if ( $termin->parent == 0 )
		{
			$taxonomy_sort[] = $termin;
			$parent_id = $termin->tid;
			$result = test_termin_hierarchy( $parent_id);
			if (!empty($result))
			{
				$taxonomy_sort[] = $result;
			}
		}
	}
	
	return $taxonomy_sort;
}//end func

function test_termin_hierarchy( $parent_id )
{
	global $taxonomy_unsort, $taxonomy_sort;
	foreach ( $taxonomy_unsort as $termin )
	{
		if ( $termin->parent == $parent_id )
		{
			$taxonomy_sort[] = $termin;
			$result = test_termin_hierarchy( $termin->tid );
			if (!empty($result))
			{
				$taxonomy_sort[] = $result;
			}
		}
	}
	
}//end func


function get_content( $node_type, $vid )
{
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
term_data.name as category_name,
term_url_alias.dst as category_nicename,
url_alias.dst as node_nicename,
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
LEFT JOIN url_alias ON url_alias.src=CONCAT('node/',node.nid)
LEFT JOIN url_alias as term_url_alias ON term_url_alias.src=CONCAT('taxonomy/term/',term_node.tid)
WHERE node.type='".$node_type."' AND term_data.vid='".$vid."' 
ORDER BY term_data.tid;";

	$res = db_query($query);
	$data =  array();
	while ($row = db_fetch_object($res))
	{
		$data[] = $row;
	}//end while

	return $data;
}//end get content
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

