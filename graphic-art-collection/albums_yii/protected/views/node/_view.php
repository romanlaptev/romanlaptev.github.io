<?php
/* @var $this NodeController */
/* @var $data Node */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('nid')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->nid), array('view', 'id'=>$data->nid)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('vid')); ?>:</b>
	<?php echo CHtml::encode($data->vid); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('type')); ?>:</b>
	<?php echo CHtml::encode($data->type); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('language')); ?>:</b>
	<?php echo CHtml::encode($data->language); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('title')); ?>:</b>
	<?php echo CHtml::encode($data->title); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('uid')); ?>:</b>
	<?php echo CHtml::encode($data->uid); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('created')); ?>:</b>
	<?php echo CHtml::encode($data->created); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('changed')); ?>:</b>
	<?php echo CHtml::encode($data->changed); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('comment')); ?>:</b>
	<?php echo CHtml::encode($data->comment); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('promote')); ?>:</b>
	<?php echo CHtml::encode($data->promote); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('moderate')); ?>:</b>
	<?php echo CHtml::encode($data->moderate); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('sticky')); ?>:</b>
	<?php echo CHtml::encode($data->sticky); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('tnid')); ?>:</b>
	<?php echo CHtml::encode($data->tnid); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('translate')); ?>:</b>
	<?php echo CHtml::encode($data->translate); ?>
	<br />

	*/ ?>

</div>