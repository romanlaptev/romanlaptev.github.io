<?php
/* @var $this LessonController */
/* @var $model Lessons */
/*
$this->breadcrumbs=array(
	'Lessons'=>array('index'),
	'Create',
);
*/
/*
$this->menu=array(
	array('label'=>'Список уроков', 'url'=>array('index')),
	array('label'=>'Manage Lessons', 'url'=>array('admin')),
);
*/
?>

<h1>Новый урок</h1>

<?php 
$this->renderPartial('_form', array('model'=>$model, 'course'=>$course, 'courses_list'=>$courses_list) ); 
?>
