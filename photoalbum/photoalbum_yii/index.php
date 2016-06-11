<?php
$yii=dirname(__FILE__).'/../../../php/frameworks/yii/framework/yii.php';
//echo "yii path = ".$yii;
//echo "<br>";
//exit();

$config=dirname(__FILE__).'/protected/config/main.php';

// remove the following line when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
require_once($yii);

Yii::createWebApplication($config)->run();
