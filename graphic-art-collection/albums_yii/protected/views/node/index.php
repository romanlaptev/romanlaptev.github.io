<?php
/* @var $this NodeController */
/* @var $dataProvider CActiveDataProvider */


$this->breadcrumbs=array(
	'Nodes',
);

if (isset($termin))
{
	$this->breadcrumbs=array(
		$termin,
	);
}

if (!Yii::app()->user->isGuest)
{
	$this->menu=array(
		array('label'=>'Create Node', 'url'=>array('create')),
		array('label'=>'Manage Node', 'url'=>array('admin')),
	);
}

if (count($child_termins)>0)
{
	for($n1=0;$n1<count($child_termins);$n1++)
	{
//echo $child_termins[$n1]['name'];
		echo "<li>";		
		echo CHtml::link($child_termins[$n1]['name'],array('node/list','tid'=>$child_termins[$n1]['tid']));
		echo "</li>";		
	}
}

echo "<hr>";
echo "Всего изображений:".$total;
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
		$rel_term_node = $item->getRelated('term_node');

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
		//echo CHtml::link($item->title, array('node/view?id='.$item->nid));
		echo CHtml::link($item->title,array('node/view','id'=>$item->nid));
//echo "<pre>";
//print_r($rel_content_type_photogallery_image->attributes);
//print_r($rel_content_field_filename->attributes);
//print_r($rel_term_node->attributes);
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

/*
$this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 
*/
?>
