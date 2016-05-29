<pre>
<?
//print_r($page);
//echo getcwd();
?>
</pre>

<?
/*
<!--[if IE]>
<link href="
<? echo $this->config->item('base_url') ?>
css/multicolumns-ie.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="
<? echo $this->config->item('base_url') ?>
js/css3-multi-column.js"></script>
<![endif]-->
*/
?>

<a name="top"></a>
<div id="container">
<!--
	<h1>
<?
	echo $page[0]->title;
?>
	</h1>
-->

	<div id="body">
		<div class="column">
<?
	//nl2br --  Вставляет HTML код разрыва строки перед каждым переводом строки 
	$body_value = $page[0]->body_value;
	//$body_value = nl2br($page[0]->body_value);
	//$body_value = preg_replace("/(\r\n){2}/", "<br/><br/>", $body_value); //если 2 перевода строки подряд
//-------------------------------

	$body_value = str_replace('[notes]', '<span class="notes">', $body_value);
	$body_value = str_replace('[/notes]', '</span>', $body_value);

	$body_value = str_replace('[picture_text]', '<span class="picture_text">', $body_value);
	$body_value = str_replace('[/picture_text]', '</span>', $body_value);

	$body_value = str_replace('[name]', '<span class="name">', $body_value);
	$body_value = str_replace('[/name]', '</span>', $body_value);

	$body_value = str_replace('[term]', '<span class="termin">', $body_value);
	$body_value = str_replace('[/term]', '</span>', $body_value);
//-------------------------------
	//echo $page[0]->body_value;
	echo $body_value;
?>
	</div><!-- end column -->
<?
	if (count($page['page_images']) > 0)
	{

//echo "page['page_images'] = <pre>";
//print_r($page['page_images']);
//echo "</pre>";

//----------------------------- сущ. копия имени файла прикрепленного изображения
		if (isset($page['page_images']['content_location']))
		{
//---------------- добавить к файлам изображений, файловый путь
			$original_path = $page['page_images']['content_location'][1]->field_content_location_value;
			$icon_styles = $page['page_images']['content_location'][2]->field_content_location_value;
	
			$thumbnail_path = $page['page_images']['content_location'][3]->field_content_location_value;
			$small_path = $page['page_images']['content_location'][4]->field_content_location_value;
			$medium_path = $page['page_images']['content_location'][5]->field_content_location_value;
			$large_path = $page['page_images']['content_location'][6]->field_content_location_value;
//------------------------------------------

			foreach ($page['page_images']['images'] as $image)
			{
//echo "image = <pre>";
//print_r($image);
//echo "</pre>";
				$image_title="";
				//если есть, извлечь название изображение
				$file_arr=explode("#",$image->field_content_files_value);
				if (count($file_arr)>1)
				{
					$filename = $file_arr[0];
					$image_title=$file_arr[1];
				}
				else
					$filename = $image->field_content_files_value;

				$img_original = $original_path."/".$filename;
				$img_thumbnail = $original_path."/".$icon_styles.$thumbnail_path."/".$filename;
				$img_small = $original_path."/".$icon_styles.$small_path."/".$filename;
				$img_medium = $original_path."/".$icon_styles.$medium_path."/".$filename;
				$img_large = $original_path."/".$icon_styles.$large_path."/".$filename;

				echo "<div class='book-img'>";

				echo "<a href='".$this->config->item('content_site').$img_medium."' ";
				if (!empty($image_title))
				{
					echo "title='".$image_title."' ";
				}

switch ($this->config->item('colorbox'))
{
	case 'lightbox':
		echo "rel='lightbox' >";
	break;

	case 'pirobox':
		echo "rel='gallery' class='pirobox_gall'>";
	break;

	case 'highslide':
		echo "class='highslide' onclick='return hs.expand(this)'>";
		echo "<div class='highslide-caption'>";
		if (!empty($image_title))
		{
			echo $image_title;
		}
		echo "</div>";
	break;
	default:
		echo ">";
}//------------------------------- end switch

				echo "<img src='".$this->config->item('content_site').$img_thumbnail."' ";
				if (!empty($image_title))
				{
					echo "alt='".$image_title."' ";
				}
				echo " border=0>";

				echo "</a>";

				echo '<p class="book-img-title">';
				if (!empty($image_title))
				{
					echo "<p>".$image_title."</p>";
				}
				echo 'увеличить: ';
				echo '<a href="'.$this->config->item('content_site').$img_medium.'">medium size</a>| ';
				echo '<a href="'.$this->config->item('content_site').$img_large.'">large size</a>| ';
				echo '<a href="'.$this->config->item('content_site').$img_original.'">original size</a> ';
				echo "</p>";

				echo "</div>";
			}//------------------------------- end foreach
		}
		else //----------------------------- сущ. прикрепленное изображение
		{
			foreach ($page['page_images']['images'] as $image)
			{
//echo "image = <pre>";
//print_r($image);
//echo "</pre>";
				$image_alt=$image->alt;
				$image_title=$image->title;
				$filename = $image->filename;

				$img_original = $image->img_original;
				$img_thumbnail = $image->img_thumbnail;
				$img_small = $image->img_small;
				$img_medium = $image->img_medium;
				$img_large = $image->img_large;

				echo "<div class='book-img-attached'>";

				echo "<a href='".$this->config->item('drupal_site_path').$img_medium."' ";
				if (!empty($image_title))
				{
					echo "title='".$image_title."' ";
				}

switch ($this->config->item('colorbox'))
{
	case 'lightbox':
		echo "rel='lightbox' >";
	break;

	case 'pirobox':
		echo "rel='gallery' class='pirobox_gall'>";
	break;

	case 'highslide':
		echo "class='highslide' onclick='return hs.expand(this)'>";
		echo "<div class='highslide-caption'>";
		if (!empty($image_title))
		{
			echo $image_title;
		}
		echo "</div>";
	break;
	default:
		echo ">";
}//------------------------------- end switch

				echo "<img src='".$this->config->item('drupal_site_path').$img_thumbnail."' ";
				if (!empty($image_alt))
				{
					echo "alt='".$image_alt."' ";
				}
				echo " border=0>";


				echo "</a>";

				echo '<p class="book-img-title">';
				if (!empty($image_title))
				{
					echo "<p>".$image_title."</p>";
				}
				echo 'увеличить: ';
				echo '<a href="'.$this->config->item('drupal_site_path').$img_medium.'">medium size</a>| ';
				echo '<a href="'.$this->config->item('drupal_site_path').$img_large.'">large size</a>| ';
				echo '<a href="'.$this->config->item('drupal_site_path').$img_original.'">original size</a> ';
				echo "</p>";

				echo "</div>";
			}//------------------------------- end foreach

		}//------------------------------- end elseif
	}//------------------------------- end if
?>
	<div style="clear:both"></div>
<?
	if (count($page['child']) > 0)
	{
		foreach ($page['child'] as $page)
		{
//echo "page = <pre>";
//print_r($page);
//echo "</pre>";
			echo "<li>";
			echo "<a href='"
.$this->config->item('base_url')
."index.php/book/get_page/?mlid=".$page->mlid."'>";
			echo $page->title;
			echo "</a>";
			echo "</li>";
		}
	}
?>
	<div style="clear:both"></div>
	</div><!-- end body -->
</div><!-- end container -->

