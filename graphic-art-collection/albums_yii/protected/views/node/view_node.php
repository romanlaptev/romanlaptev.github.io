<?php
/* @var $this NodeController */
/* @var $model Node */

$this->breadcrumbs=array(
	'Nodes'=>array('index'),
	//$model->title,
);

if (!Yii::app()->user->isGuest)
{
	$this->menu=array(
		array('label'=>'List Node', 'url'=>array('index')),
		array('label'=>'Create Node', 'url'=>array('create')),
		array('label'=>'Update Node', 'url'=>array('update', 'id'=>$model->nid)),
		array('label'=>'Delete Node', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->nid),'confirm'=>'Are you sure you want to delete this item?')),
		array('label'=>'Manage Node', 'url'=>array('admin')),
	);
}
else
{
	$this->menu=array(
		array('label'=>'List Node', 'url'=>array('index')),
	);
}

//echo CHtml::encode($model->getAttributeLabel('title'));
//echo CHtml::encode($model->title);
	$rel_content_type_photogallery_image = $model->getRelated('nid');
	$rel_content_field_filename = $model->getRelated('content_field_filename_nid');
//echo "<pre>";
//print_r($rel_content_type_photogallery_image->attributes);
//print_r($rel_content_field_filename->attributes);
//echo "</pre>";

	echo "<h2>".$model->title."</h2>";
	echo "<div class='content_img'>";

	if (!empty($rel_content_field_filename->field_filename_value))
	{
		$img_preview_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_preview_img_value).
"/".trim($rel_content_field_filename->field_filename_value);

		$img_big_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_big_img_value).
"/".trim($rel_content_field_filename->field_filename_value);

		$img_original_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_original_img_value).
"/".trim($rel_content_field_filename->field_filename_value);
	}
	else
	{
		$img_preview_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_preview_img_value);

		$img_big_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_big_img_value);

		$img_original_url = Yii::app()->params['content_site'].
trim($rel_content_type_photogallery_image->field_original_img_value);
	}

	echo "<a href='".$img_big_url."' ";
	echo "title='".CHtml::encode($model->title)."' ";

	switch (Yii::app()->params['colorbox'])
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
			echo CHtml::encode($model->title);
			echo "</div>";
		break;
		default:
			echo ">";
	}//------------------------------- end switch

	echo "<img src='".$img_preview_url."' ";
	echo "alt='".CHtml::encode($model->title)."' ";
	echo "border='0' />";
	echo "</a>";

	echo '<p class="img-resize">увеличить: ';
	echo '<a href="'.$img_big_url.'">big size</a> | ';
	echo '<a href="'.$img_original_url.'">original size</a>';
	echo '</p>';
//------------------------------------------
//echo Yii::app()->params['colorbox'];
//echo "<br>";

	echo "</div>";
?>
