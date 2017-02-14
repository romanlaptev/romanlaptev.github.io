<style>
.main-container
{
    margin: auto;
    width: 650px;
}

.album
{
	float:left;
	margin:10px;
}
</style>
<div class='main-container'>
	<div class='albums'>
<?php
	if (!empty($termins))
	{
	        foreach($termins as $termin)
        	{
//echo "<pre>";
//print_r($termin);
//print_r($termin->attributes);
//echo "</pre>";
			echo "<div class='album'>";

			$termin_img = "<img src='".
"/site-content/albums/termin_images/imagecache/category_pictures/"
.$termin['description']."' border='0'>";

			echo "	<div class='album-img'>";
			echo CHtml::link($termin_img,array('node/list','tid'=>$termin['tid']));
			echo "	</div>";

			echo "	<div class='album-name'>";
			echo CHtml::link($termin['name'],array('node/list','tid'=>$termin['tid']));
			echo "	</div>";

			echo "</div>";
        	}//-------------------------- end foreach
	}
?>
	</div><!-- end albums -->
	<div style="clear:both"></div>

	<div class='pager'>
<?
//---------------------------------------------- pager
	$this->widget('CLinkPager',array(
		'pages'=>$pages, 
		'maxButtonCount' => 25,
		'header' => '<b>Перейти к странице:</b><br><br>',
		)); 
//----------------------------------------------
?>
	</div>
</div>

