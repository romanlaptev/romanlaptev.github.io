<?php
/* @var $this NodeController */
/* @var $model Node */

$this->breadcrumbs=array(
	'Nodes'=>array('index'),
	$model->title=>array('view','id'=>$model->nid),
	'Update',
);

$this->menu=array(
	array('label'=>'List Node', 'url'=>array('index')),
	array('label'=>'Create Node', 'url'=>array('create')),
	array('label'=>'View Node', 'url'=>array('view', 'id'=>$model->nid)),
	array('label'=>'Manage Node', 'url'=>array('admin')),
);
?>

<h1>Update Node <?php echo $model->nid; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>