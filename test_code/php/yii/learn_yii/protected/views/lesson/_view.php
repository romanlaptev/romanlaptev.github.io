<?php
/* @var $this LessonController */
/* @var $data Lessons */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('lesson_id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->lesson_id), array('view', 'id'=>$data->lesson_id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('course_id')); ?>:</b>
	<?php echo CHtml::encode($data->course_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('url')); ?>:</b>
	<?php echo CHtml::encode($data->url); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('title')); ?>:</b>
	<?php echo CHtml::encode($data->title); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('description')); ?>:</b>
	<?php echo CHtml::encode($data->description); ?>
	<br />


</div>