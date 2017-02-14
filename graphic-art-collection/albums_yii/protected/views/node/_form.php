<?php
/* @var $this NodeController */
/* @var $model Node */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'node-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'vid'); ?>
		<?php echo $form->textField($model,'vid',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'vid'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'type'); ?>
		<?php echo $form->textField($model,'type',array('size'=>32,'maxlength'=>32)); ?>
		<?php echo $form->error($model,'type'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'language'); ?>
		<?php echo $form->textField($model,'language',array('size'=>12,'maxlength'=>12)); ?>
		<?php echo $form->error($model,'language'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'title'); ?>
		<?php echo $form->textField($model,'title',array('size'=>60,'maxlength'=>255)); ?>
		<?php echo $form->error($model,'title'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'uid'); ?>
		<?php echo $form->textField($model,'uid'); ?>
		<?php echo $form->error($model,'uid'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'status'); ?>
		<?php echo $form->textField($model,'status'); ?>
		<?php echo $form->error($model,'status'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'created'); ?>
		<?php echo $form->textField($model,'created'); ?>
		<?php echo $form->error($model,'created'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'changed'); ?>
		<?php echo $form->textField($model,'changed'); ?>
		<?php echo $form->error($model,'changed'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'comment'); ?>
		<?php echo $form->textField($model,'comment'); ?>
		<?php echo $form->error($model,'comment'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'promote'); ?>
		<?php echo $form->textField($model,'promote'); ?>
		<?php echo $form->error($model,'promote'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'moderate'); ?>
		<?php echo $form->textField($model,'moderate'); ?>
		<?php echo $form->error($model,'moderate'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'sticky'); ?>
		<?php echo $form->textField($model,'sticky'); ?>
		<?php echo $form->error($model,'sticky'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'tnid'); ?>
		<?php echo $form->textField($model,'tnid',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'tnid'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'translate'); ?>
		<?php echo $form->textField($model,'translate'); ?>
		<?php echo $form->error($model,'translate'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->