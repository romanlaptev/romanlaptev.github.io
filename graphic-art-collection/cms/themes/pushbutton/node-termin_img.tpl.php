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

	<div class="content">
<?php 
//error_reporting(E_ALL);

//echo "arg(0) == ".arg(0);
//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//echo "</pre>";

//echo "<pre>";
//print_r($node);
//print_r($node->content['body']);
//print_r($node->field_termin_images_location[0]);
//print_r($node->field_termin_image[0]);
//echo "</pre>";
//echo $node->content['body']['#value'];
//--------------------------------------------------------------------------------

	global $base_url;
	
	//файловый путь к прикрепленным к ноде изображениям
	$fs_root = getcwd();
//echo "fs_root = ".$fs_root;
//echo "<br>";
	$fs_root_src = $fs_root."/sites/default/files";
//echo "fs_root_src = ".$fs_root_src;
//echo "<br>";
	$img_subfolder="termin_images";
	$imagecache_location = "imagecache";
	$preset_preview_name = "h100";
	$preset_medium_name = "category_pictures";
	

	//файловый путь папки изображений контента
	if (!empty($node->field_termin_images_location[0]['value']))
	{
		$fs_root_dest = trim($node->field_termin_images_location[0]['value']);
	}
	else
		$fs_root_dest = '/mnt/wd160/documents/0_sites/site_graphics';
//echo "fs_root_dest = ".$fs_root_dest;
//echo "<br>";


	//получить файловый путь к изображениям и иконкам, из текстового поля ноды
	$url_original = trim($node->field_termin_images_location[1]['value']);
	$url_medium = trim($node->field_termin_images_location[2]['value']);
	$url_preview = trim($node->field_termin_images_location[3]['value']);


	$out ="";
	if (isset($node->field_termin_image[0]['filename']))
	{
		//for ($n1=0;$n1<count($node->field_termin_image);$n1++)
		//{
			$filename = $node->field_termin_image[0]['filename'];
echo "filename = ".$filename;
echo "<br>";

		$filepath = $node->field_termin_image[0]['filepath'];
		$img_title = $node->field_termin_image[0]['data']['title'];
		$alt = $node->field_termin_image[0]['data']['alt'];

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
						$alt = "";
						$img_title = "";
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
						$alt = "";
						$img_title = "";
						$preset_name = $preset_medium_name;
						$src_file = $img_subfolder."/".$filename;
						$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
					//}
					//else
						//$remove_medium_img = 1;
			}

//=============================================================================
			if (
				($remove_preview_img == 1) &&
				($remove_medium_img == 1)
			)
			{
/*
echo " remove_preview_img = ".$remove_preview_img;
echo " remove_medium_img = ".$remove_medium_img;
echo "<br>";
				$out .= remove_img($source_file_preview_img); 
				$out .= remove_img($source_file_medium_img); 
				$out .= remove_img($source_file_original_img); 
*/
			}

echo $out;
		}//----------------- end if
//=============================================================================
		//}//--------------- end for
echo "<img src='".$preview_img."'><br>";
echo "<img src='".$medium_img."'><br>";
	}//------------------------- end if

//--------------------------------------------------------------------------------
//echo "<pre>";
//print_r($content);
//echo "</pre>";
//print htmlspecialchars($content);
	print $content;
?>
	</div>

    <?php if ($links): ?>
    <div class="links">&raquo; <?php print $links ?></div>
    <?php endif; ?>
</div>
