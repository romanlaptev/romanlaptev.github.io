<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $model Content_type_photogallery_image */

$this->breadcrumbs=array(
	'Content Type Photogallery Images'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Content_type_photogallery_image', 'url'=>array('index')),
	array('label'=>'Create Content_type_photogallery_image', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#content-type-photogallery-image-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Content Type Photogallery Images</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'content-type-photogallery-image-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'vid',
		'nid',
		'field_num_page_value',
		'field_author_value',
		'field_create_date_value',
		'field_style_value',
		/*
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
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
