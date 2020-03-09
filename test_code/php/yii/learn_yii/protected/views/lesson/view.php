<?php
/* @var $this LessonController */
/* @var $model Lessons */
if ( !empty($course) )
{
	$this->breadcrumbs=array(
		'Курсы'=>array('course/index'),
		$course->title=>array('course/view','id'=>$course->course_id),
	);
}
else
{
	$this->breadcrumbs=array(
		'Курсы'=>array('course/index'),
	);
}


if ( !Yii::app()->user->isGuest )
{
	$this->menu=array(
		//array('label'=>'List Lessons', 'url'=>array('index')),
		//array('label'=>'Create Lessons', 'url'=>array('create')),
		array('label'=>'редактировать', 'url'=>array('update', 'id'=>$model->lesson_id)),
		array('label'=>'удалить', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->lesson_id),'confirm'=>'Are you sure you want to delete this item?')),
		//array('label'=>'Manage Lessons', 'url'=>array('admin')),
	);
}
?>

<h1><?php echo $model->title ?></h1>
<!--
<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'lesson_id',
		'course_id',
		'url',
		'title',
		'description',
	),
)); ?>
-->
<?php
if ( strpos( $model->url, "youtube"  ))
{
?>
<iframe src="<?php echo $model->url ?>"></iframe>
<?php
}
else
{
?>
<video src="<?php echo $model->url ?>" controls width="100%"></video>
<?php
}
?>

</div>
