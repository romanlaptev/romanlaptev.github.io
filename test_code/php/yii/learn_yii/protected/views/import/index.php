<h1>import</h1>
<!--
<div class="form">
<?php
	$form=$this->beginWidget('CActiveForm');
	//echo $form->errorSummary($model);
?>
	<div class="row">
<?php
	//echo CHtml::activeLabel( $model, 'username' );
	//echo CHtml::activeTextField( $model, 'username' );
?>
	</div>
	<div class="row">
<?php
	//echo CHtml::activeLabel( $model, 'password' );
	//echo CHtml::activePasswordField( $model, 'password' );
?>
	</div>
	<div class="row remember">
<?php
	//echo CHtml::activeCheckBox ( $model, 'rememder' );
	//echo CHtml::activeLabel( $model, 'remember' );
?>
	</div>
	<div class="row submit">
<?php
	echo CHtml::submitButton ( 'Enter' );
?>
	</div>
<?php
	$this->endWidget();
?>
</div>
-->

<?php
       $form=$this->beginWidget('CActiveForm', array(
        'id'=>'upload-form',
         'enableAjaxValidation'=>true,
             'htmlOptions' => array('enctype' => 'multipart/form-data'),
        )); 
?>
	<div>
        <?php echo $form->labelEx($model,'upload_file'); ?>
        <?php echo $form->fileField($model,'upload_file'); ?>
        <?php echo $form->error($model, 'upload_file'); ?>
	</div>
        <hr>
        <?php  echo CHtml::submitButton('Upload XML',array("class"=>"")); ?>
        <?php echo $form->errorSummary($model); ?>
    </div>

<?php
        $this->endWidget();
?>

<style>
.log p {
  margin: 0 !important;
  padding-left: 15px;
}
.ok
{
color:green;
font-size:150%;
}
.error
{
color:red;
font-size:150%;
}
</style>

<div class="row log">
<?php 
if ( !empty($messages) )
{
	foreach ( $messages as $message)
	{
		echo "<p class='ok'> - ".$message."</p> ";
	}
}
?>
</div>

<div class="row log">
<?php 
if ( !empty($errors) )
{
	foreach ( $errors as $error)
	{
		echo "<p class='error'> - ".$error."</p> ";
	}
}
?>
</div>


