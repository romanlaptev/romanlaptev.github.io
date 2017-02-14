<?php
/* @var $this Content_type_photogallery_imageController */
/* @var $data Content_type_photogallery_image */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('vid')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->vid), array('view', 'id'=>$data->vid)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('nid')); ?>:</b>
	<?php echo CHtml::encode($data->nid); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_num_page_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_num_page_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_author_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_author_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_create_date_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_create_date_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_style_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_style_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_genre_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_genre_value); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('field_technique_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_technique_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_img1_gallery_fid')); ?>:</b>
	<?php echo CHtml::encode($data->field_img1_gallery_fid); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_img1_gallery_list')); ?>:</b>
	<?php echo CHtml::encode($data->field_img1_gallery_list); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_img1_gallery_data')); ?>:</b>
	<?php echo CHtml::encode($data->field_img1_gallery_data); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_title_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_title_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_preview_img_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_preview_img_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_big_img_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_big_img_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_original_img_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_original_img_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_info_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_info_value); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_info_format')); ?>:</b>
	<?php echo CHtml::encode($data->field_info_format); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('field_preview_img_preset_value')); ?>:</b>
	<?php echo CHtml::encode($data->field_preview_img_preset_value); ?>
	<br />

	*/ ?>

</div>