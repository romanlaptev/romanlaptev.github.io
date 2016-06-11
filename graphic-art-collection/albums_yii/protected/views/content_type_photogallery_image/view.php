<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $model Content_type_photogallery_image */

$this->breadcrumbs=array(
	'Content Type Photogallery Images'=>array('index'),
	$model->vid,
);

$this->menu=array(
	array('label'=>'List Content_type_photogallery_image', 'url'=>array('index')),
	array('label'=>'Create Content_type_photogallery_image', 'url'=>array('create')),
	array('label'=>'Update Content_type_photogallery_image', 'url'=>array('update', 'id'=>$model->vid)),
	array('label'=>'Delete Content_type_photogallery_image', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->vid),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Content_type_photogallery_image', 'url'=>array('admin')),
);
?>

<h1>View Content_type_photogallery_image #<?php echo $model->vid; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'vid',
		'nid',
		'field_num_page_value',
		'field_author_value',
		'field_create_date_value',
		'field_style_value',
		'field_genre_value',
		'field_technique_value',
		'field_img1_gallery_fid',
		'field_img1_gallery_list',
		'field_img1_gallery_data',
		'field_title_value',
		'field_preview_img_value',
		'field_big_img_value',
		'field_original_img_value',
		'field_info_value',
		'field_info_format',
		'field_preview_img_preset_value',
	),
)); ?>
