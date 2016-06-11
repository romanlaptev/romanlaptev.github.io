<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Content Type Photogallery Images',
);

$this->menu=array(
	array('label'=>'Create Content_type_photogallery_image', 'url'=>array('create')),
	array('label'=>'Manage Content_type_photogallery_image', 'url'=>array('admin')),
);
?>

<h1>Content Type Photogallery Images</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
