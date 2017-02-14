<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $model Content_type_photogallery_image */

$this->breadcrumbs=array(
	'Content Type Photogallery Images'=>array('index'),
	$model->vid=>array('view','id'=>$model->vid),
	'Update',
);

$this->menu=array(
	array('label'=>'List Content_type_photogallery_image', 'url'=>array('index')),
	array('label'=>'Create Content_type_photogallery_image', 'url'=>array('create')),
	array('label'=>'View Content_type_photogallery_image', 'url'=>array('view', 'id'=>$model->vid)),
	array('label'=>'Manage Content_type_photogallery_image', 'url'=>array('admin')),
);
?>

<h1>Update Content_type_photogallery_image <?php echo $model->vid; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>