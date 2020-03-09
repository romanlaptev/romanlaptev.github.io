<?php
/*
$this->breadcrumbs=array(
	'Lessons'=>array('index'),
	'Create',
);
*/
/*
$this->menu=array(
	array('label'=>'List Lessons', 'url'=>array('index')),
	array('label'=>'Manage Lessons', 'url'=>array('admin')),
);
*/
?>

<h1>Новый курс</h1>
<?php $this->renderPartial('_form', array('model'=>$model)); ?>
