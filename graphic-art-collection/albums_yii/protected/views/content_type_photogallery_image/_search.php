<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $model Content_type_photogallery_image */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'vid'); ?>
		<?php echo $form->textField($model,'vid',array('size'=>10,'maxlength'=>10)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'nid'); ?>
		<?php echo $form->textField($model,'nid',array('size'=>10,'maxlength'=>10)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_num_page_value'); ?>
		<?php echo $form->textField($model,'field_num_page_value'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_author_value'); ?>
		<?php echo $form->textArea($model,'field_author_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_create_date_value'); ?>
		<?php echo $form->textArea($model,'field_create_date_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_style_value'); ?>
		<?php echo $form->textArea($model,'field_style_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_genre_value'); ?>
		<?php echo $form->textArea($model,'field_genre_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_technique_value'); ?>
		<?php echo $form->textArea($model,'field_technique_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_img1_gallery_fid'); ?>
		<?php echo $form->textField($model,'field_img1_gallery_fid'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_img1_gallery_list'); ?>
		<?php echo $form->textField($model,'field_img1_gallery_list'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_img1_gallery_data'); ?>
		<?php echo $form->textArea($model,'field_img1_gallery_data',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_title_value'); ?>
		<?php echo $form->textArea($model,'field_title_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_preview_img_value'); ?>
		<?php echo $form->textArea($model,'field_preview_img_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_big_img_value'); ?>
		<?php echo $form->textArea($model,'field_big_img_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_original_img_value'); ?>
		<?php echo $form->textArea($model,'field_original_img_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_info_value'); ?>
		<?php echo $form->textArea($model,'field_info_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_info_format'); ?>
		<?php echo $form->textField($model,'field_info_format',array('size'=>10,'maxlength'=>10)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'field_preview_img_preset_value'); ?>
		<?php echo $form->textArea($model,'field_preview_img_preset_value',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->