<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

	<!-- blueprint CSS framework -->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/print.css" media="print" />
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/form.css" />

	<title><?php 
echo CHtml::encode(Yii::app()->name);
//echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

<div class="container" id="page">

	<div id="header">
		<div id="logo">
			<h2><a href="<?php echo Yii::app()->baseUrl?>"><?php echo CHtml::encode(Yii::app()->name); ?></a></h2>
		</div>
	</div><!-- header -->
<?php
//echo  Yii::app()->controller->id;
//echo "<br>";
//echo  Yii::app()->controller->action->id;
//echo "<br>";
$visible_course_item = true;
if ( Yii::app()->controller->id == "course" && Yii::app()->controller->action->id == "index" )
{
	$visible_course_item = false;
}
?>
	<div id="mainmenu">
		<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				//array('label'=>'Home', 'url'=>array('/site/index'), 'visible'=>Yii::app()->controller->action->id != 'index' ),
array(
	'label'=>'Курсы', 
	'url'=>array('/course/index'), 
	'visible'=>$visible_course_item,
/*
	'items'=>array
		(
		  array('label'=>'Добавить курс', 'url'=>array('/course/add')),
		)
*/
),
				array( 'label'=>'Уроки', 'url'=>array('/lesson/list'), 'visible'=>Yii::app()->user->isGuest ),
				array( 'label'=>'Уроки', 'url'=>array('/lesson/admin'), 'visible'=>!Yii::app()->user->isGuest ),
				array( 'label'=>'Экспорт', 
						'url'=>array('/export/export'),//, 'view'=>'index'), 
						'visible'=>!Yii::app()->user->isGuest ),
				array( 'label'=>'Импорт', 
						'url'=>array('/import/index', 'view'=>'index'),
						 'visible'=>!Yii::app()->user->isGuest ),
array('label'=>'Авторизация', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest, 'itemOptions'=>array('class' => 'topmenu-link right') ),
array('label'=>'Выход ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest, 'itemOptions'=>array('class' => 'topmenu-link right'))
			),
		)); ?>
	</div><!-- mainmenu -->
	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
			'homeLink'=>false 
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>

	<div class="clear"></div>

	<div id="footer"></div><!-- footer -->

</div><!-- page -->

</body>
</html>
