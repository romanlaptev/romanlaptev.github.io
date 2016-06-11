<?php
/* @var $this SiteController */

//$this->pageTitle=Yii::app()->name;

/*
echo "<pre>";
//print_r($nodes);
print_r($nodes[0]);
//+++print_r($nodes[0]['_alias']);

//print_r($nodes[0]->tableSchema);
//print_r($nodes[0]->tableSchema->columns);
//+++++++++print_r($nodes[0]->tableSchema->relations);

//print_r($nodes[0]['attributes']);
//print_r($nodes[0]->attributes);
//print_r($nodes[0]->related);
//+++++print_r($nodes[0]->nid);
echo "</pre>";
echo $nodes[0]->title;
echo "<br>";
*/

//$relations=$nodes[0]->getRelated('nid');
//$relations=$nodes[0]->getRelated('content_field_filename_nid');
//echo "r - <pre>";
//print_r($relations->attributes);
//echo "</pre>";
//echo $relations->field_preview_img_value;
//echo "<br>";

echo "Total nodes:".$total;
echo "<hr>";

if (!empty($nodes))
{

	foreach ($nodes as $key=>$item)
	{
//echo "<pre>";
//print_r($item);
//echo "</pre>";
		$rel_content_type_photogallery_image = $item->getRelated('nid');
		$rel_content_field_filename = $item->getRelated('content_field_filename_nid');
/*
    [field_num_page_value] => 82
    [field_author_value] => 
    [field_create_date_value] => 1844
    [field_style_value] => 
    [field_genre_value] => 
    [field_technique_value] => 
    [field_img1_gallery_fid] => 
    [field_img1_gallery_list] => 
    [field_img1_gallery_data] => 
    [field_title_value] => Доставка картин, Жан Гранвиль, 1844
    [field_preview_img_value] => /content/albums/book_illustrate/imagecache/preview_gallery_img
    [field_big_img_value] => /content/albums/book_illustrate/imagecache/w1024
    [field_original_img_value] => /content/albums/book_illustrate
    [field_info_value] => 
    [field_info_format] => 
    [field_preview_img_preset_value] => preview_gallery_img_album

field_filename_value
*/

		echo "<div>";

		echo "<img src='";
		if (!empty($rel_content_field_filename->field_filename_value))
		{
$filepath = trim($rel_content_type_photogallery_image->field_preview_img_value).
"/".trim($rel_content_field_filename->field_filename_value);
			echo $filepath;
		}
		else
		{
			echo trim($rel_content_type_photogallery_image->field_preview_img_value);
		}

		echo "' width='200'>";
		echo "</div>";

		echo "<div>";

//echo $item->nid.". ";
		//echo CHtml::link($item->title, array('node/view&id='.$item->nid));
		echo CHtml::link($item->title, array('node/view?id='.$item->nid));
//echo "<pre>";
//print_r($rel_content_field_filename->attributes);
//echo "</pre>";

		echo "</div>";

	}


}
//---------------------------------------------- pager
	$this->widget('CLinkPager',array(
		'pages'=>$pages, 
		'maxButtonCount' => 25,
		'header' => '<b>Перейти к странице:</b><br><br>',
		)); 
//----------------------------------------------
?>

