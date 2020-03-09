<?php
/* @var $this LessonController */
/* @var $model Lessons */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'lessons-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Поля со знаком  <span class="required">*</span> обязательны.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'course_id'); ?>
<?php 
		if ( !empty($course) )//поле используется при создании урока, заполнение поля принадлежности к курсу
		{
			//echo $form->textField($model,'course_id',array('value'=>$course->course_id, 'size'=>6,'maxlength'=>6)); 
			echo CHtml::dropDownList('Lessons[course_id]',
						$course->course_id,
						$courses_list,
						 array('empty' => 'Выберите курс из списка')
					);
		}
		else
		{
			//echo $form->textField($model,'course_id',array('size'=>6,'maxlength'=>6)); 
			echo CHtml::dropDownList('Lessons[course_id]',
						0,
						$courses_list,
						 array('empty' => 'Выберите курс из списка')
					);
		}
?>
		<?php echo $form->error($model,'course_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'url'); ?>
		<?php echo $form->textField($model,'url',array('size'=>60,'maxlength'=>255)); ?>
		<?php echo $form->error($model,'url'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'title'); ?>
		<?php echo $form->textField($model,'title',array('size'=>60,'maxlength'=>255)); ?>
		<?php echo $form->error($model,'title'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'description'); ?>
		<?php echo $form->textArea($model,'description',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'description'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Сохранить' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->
