<?php
/* @var $this NodeController */
/* @var $model Node */

$this->breadcrumbs=array(
	'Nodes'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Node', 'url'=>array('index')),
	array('label'=>'Manage Node', 'url'=>array('admin')),
);
?>

<h1>Create Node</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>