<?php
/* @var $this LessonController */
/* @var $model Lessons */

$this->breadcrumbs=array(
	'Lessons'=>array('index'),
	$model->title=>array('view','id'=>$model->lesson_id),
);
/*
$this->menu=array(
	array('label'=>'List Lessons', 'url'=>array('index')),
	array('label'=>'Create Lessons', 'url'=>array('create')),
	array('label'=>'View Lessons', 'url'=>array('view', 'id'=>$model->lesson_id)),
	array('label'=>'Manage Lessons', 'url'=>array('admin')),
);
*/
?>

<h1>Редактировать урок "<?php echo $model->title; ?>"</h1>

<?php 
$this->renderPartial('_form', array('model'=>$model, 'course'=>$course, 'courses_list'=>$courses_list) ); 
?>
