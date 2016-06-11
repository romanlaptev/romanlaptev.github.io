<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $model Content_type_photogallery_image */

$this->breadcrumbs=array(
	'Content Type Photogallery Images'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Content_type_photogallery_image', 'url'=>array('index')),
	array('label'=>'Manage Content_type_photogallery_image', 'url'=>array('admin')),
);
?>

<h1>Create Content_type_photogallery_image</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>