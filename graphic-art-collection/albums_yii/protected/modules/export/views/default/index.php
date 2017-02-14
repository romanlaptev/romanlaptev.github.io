<?php
/* @var $this DefaultController */

$this->breadcrumbs=array(
	$this->module->id,
);
?>
<h1><?php echo $this->uniqueId . '/' . $this->action->id; ?></h1>


<?php
echo CHtml::link("export photo from yandex.fotki",array('/export/ya'));
?>
