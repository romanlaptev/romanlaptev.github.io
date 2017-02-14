<style>
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	font-weight:bold;
	color:green;
}
.warning
{
	font-weight:bold;
	color:blue;
}
</style>

<div class="node<?php if ($sticky) { print " sticky"; } ?><?php if (!$status) { print " node-unpublished"; } ?>">
  <?php print $picture ?>
  <?php if ($page == 0): ?>
    <h1 class="title"><a href="<?php print $node_url ?>"><?php print $title ?></a></h1>
  <?php endif; ?>
    <span class="submitted"><?php print $submitted ?></span>
    <div class="taxonomy"><?php print $terms ?></div>

	<div class="content">node-photogallery_image.tpl.php

<!-- Zoom image -->
<?php
foreach($node->taxonomy as $item )
{
	if( $item->name == "zoom" )
	{
		global $base_url;
		$zoomify_viewer_path = $base_url . "/albums_xml/zoomify";
		$optional_params = "zSkinPath=" . $base_url . "/albums_xml/zoomify/Assets/Skins/Default";

		if (!empty($node->field_zoom_img[0]["value"]))
		{
			$zoom_img_path = $node->field_zoom_img[0]["value"];
?>	
<script type="text/javascript" src="<?php echo $zoomify_viewer_path;?>/ZoomifyImageViewer.js"></script>
<style type="text/css">
#zoomContainer{
	width:900px; 
	height:550px; 
	margin:auto; 
	border:1px; 
	border-style:solid; 
	border-color:#696969;
} 
</style>
<script type="text/javascript">
Z.showImage("zoomContainer", "<?php echo $zoom_img_path;?>", "<?php echo $optional_params;?>"); 
</script>
<div id="zoomContainer"></div>
<?php
		}
	}
}//next node termin
?>


<!-- prepare preview images -->
<?php 
//echo "<pre>";
//print_r($content);
//echo "</pre>";
//print htmlspecialchars($content);
	print $content;

//echo "<pre>";
//print_r($node);
//print_r($node->content['body']);
//echo "</pre>";
	//echo $node->content['body']['#value'];

	//global $base_url;
	
	//файловый путь к прикрепленным к ноде изображениям
	$fs_root = getcwd();
//echo "fs_root = ".$fs_root;
//echo "<br>";
	$fs_root_src = $fs_root."/sites/default/files";
//echo "fs_root_src = ".$fs_root_src;
//echo "<br>";
	$img_subfolder="gallery_images";
	$imagecache_location = "imagecache";

	if (!empty($node->field_preview_img_preset[0]['value']))
	{
		$preset_preview_name = trim($node->field_preview_img_preset[0]['value']);
	}
	else
		$preset_preview_name = "preview_img_preset";
	$preset_medium_name = "w1024";

	//файловый путь папки изображений контента
	if (!empty($node->field_content_location[0]['value']))
	{
		$fs_root_dest = trim($node->field_content_location[0]['value']);
	}
	else
		$fs_root_dest = '/mnt/wd160/documents/0_sites/site_graphics';
//echo "fs_root_dest = ".$fs_root_dest;
//echo "<br>";

	//получить файловый путь к изображениям и иконкам, из текстового поля ноды
	$url_original = trim($node->field_original_img[0]['value']);
	$url_medium = trim($node->field_big_img[0]['value']);
	$url_preview = trim($node->field_preview_img[0]['value']);
//echo "url_preview = ".$url_preview;
//echo "<br>";

	$out ="";
	if (isset($node->field_img1_gallery[0]['filename']))
	{
		//for ($n1=0;$n1<count($node->field_termin_image);$n1++)
		//{
			$filename = $node->field_img1_gallery[0]['filename'];
			//$filename = $node->field_filename[0]['value'];
echo "filename = ".$filename;
echo "<br>";

		//$filepath = $node->field_img1_gallery[0]['filepath'];
		$img_title = $node->field_img1_gallery[0]['data']['title'];
		$alt = $node->field_img1_gallery[0]['data']['alt'];

		$preview_img = $url_preview."/".$filename;
//echo "preview_img = ".$preview_img;
//echo "<br>";
		$medium_img = $url_medium."/".$filename;
//echo "medium_img = ".$medium_img;
//echo "<br>";
		$original_img = $url_original."/".$filename;
//echo "original_img = ".$original_img;
//echo "<br>";
//===================================================================================
// скопировать изображение ноды в папку контента (см. template.php) и создать иконки
//===================================================================================
		$source_file_original_img = $fs_root_src."/".$img_subfolder."/".$filename;
		$dest_file = $fs_root_dest.$original_img;
		if (file_exists($source_file_original_img))
		{
			$res_copy_original_img = 0;
			$res_copy_original_img = copy_img ($source_file_original_img, $dest_file); 
//-----------------------------------------------------------------------------
			$remove_preview_img = 0;
			$source_file_preview_img = $fs_root_src."/"
.$imagecache_location."/"
.$preset_preview_name."/"
.$img_subfolder."/"
.$filename;
///mnt/transcend/0_sites/albums/sites/default/files/imagecache/h100/termin_images/biopic.jpg
			$dest_file = $fs_root_dest.$preview_img;
//echo "dest_file = ".$dest_file;
//echo "<br>";

			if (file_exists($source_file_preview_img))
			{
					// скопировать изображение иконки в папку контента
					$res_copy_preview_img = 0;
					$res_copy_preview_img = copy_img ($source_file_preview_img, $dest_file); 

					if ($res_copy_preview_img == 1)
					{
//echo " res_copy_preview_img = ".$res_copy_preview_img;
//echo "<br>";
						//$out .= remove_img($source_file_preview_img); 
						$remove_preview_img = 1;
					}

			}
			else // создать иконку
			{
					//if (!file_exists($dest_file))
					//{
						//$alt = "";
						//$img_title = "";
						$preset_name = $preset_preview_name;
						$src_file = $img_subfolder."/".$filename;
						$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
					//}
					//else
						//$remove_preview_img = 1;
			}
//-----------------------------------------------------------------------------
			$remove_medium_img = 0;
			$source_file_medium_img = $fs_root_src."/"
.$imagecache_location."/"
.$preset_medium_name."/"
.$img_subfolder."/"
.$filename;
			$dest_file = $fs_root_dest.$medium_img;
			if (file_exists($source_file_medium_img))
			{
					// скопировать изображение ноды в папку контента
					$res_copy_medium_img = 0;
					$res_copy_medium_img = copy_img($source_file_medium_img, $dest_file); 

					if ($res_copy_medium_img == 1)
					{
//echo " res_copy_medium_img = ".$res_copy_medium_img;
//echo "<br>";
						//$out .= remove_img($source_file_medium_img); 
						$remove_medium_img = 1;
					}

			}
			else // создать иконку
			{
//echo "2.medium_img = ".$medium_img;
//echo "<br>";
					//if (!file_exists($dest_file))
					//{
						//$alt = "";
						//$img_title = "";
						$preset_name = $preset_medium_name;
						$src_file = $img_subfolder."/".$filename;
						$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
					//}
					//else
						//$remove_medium_img = 1;
			}

//=============================================================================
/*
			if (
				($remove_preview_img == 1) &&
				($remove_medium_img == 1)
			)
			{
echo " remove_preview_img = ".$remove_preview_img;
echo " remove_medium_img = ".$remove_medium_img;
echo "<br>";
				$out .= remove_img($source_file_preview_img); 
				$out .= remove_img($source_file_medium_img); 
				$out .= remove_img($source_file_original_img); 
			}
*/
echo $out;
		}//----------------- end if
//=============================================================================

//----------------------------------------------------------------------------------
		//Вывод изображения ноды в лайтбоксе
		echo "
<div class='img_content'>
<a rel='lightbox' href='".$medium_img."' title='".$img_title."'>
<img src='".$preview_img."' alt='".$alt."'></a>
<br>
<a href='".$original_img."'>view original img</a>
<p>".$img_title."</p>
</div>";

//----------------------------------------------------------------------------------
		//}//--------------- end for
	}//------------------------- end if
//==============================================================================================

//==============================================================================================
	if (!empty($node->field_filename[0]['value']))
	{
		$filename = $node->field_filename[0]['value'];
//echo "filename = ".$filename;
//echo "<br>";
		$img_title = $node->field_title[0]['value'];
//echo "img_title = ".$img_title;
//echo "<br>";
		$alt = $img_title;
		$preview_img = $url_preview."/".$filename;
		$medium_img = $url_medium."/".$filename;
//echo "medium_img = ".$medium_img;
//echo "<br>";
		$original_img = $url_original."/".$filename;

		//Вывод изображения ноды в лайтбоксе
		echo "
<div class='img_content'>
<a rel='lightbox' href='".$medium_img."' title='".$img_title."'>
<img src='".$preview_img."' alt='".$alt."'></a>
<br>
<a href='".$original_img."'>view original img</a>
<p>".$img_title."</p>
</div>";

	}//------------------------- end if
//==============================================================================================

?>
	</div>


    <?php if ($links): ?>
    <div class="links">&raquo; <?php print $links ?></div>
    <?php endif; ?>
</div>
