<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Альбомы',
	//'defaultController'=>'node',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),

	'modules'=>array(
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'master',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		'admin'=>array(),		
		'export'=>array(),		
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		// uncomment the following to enable URLs in path-format
		'urlManager'=>array(
			'showScriptName' => false,
			'urlFormat'=>'path',
			'rules'=>array(
				//'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				//'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				//'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),

		
		// uncomment the following to use a MySQL database
		'db'=>array(
	        'class'=>'system.db.CDbConnection',
			'connectionString' => 'mysql:host=localhost;dbname=art',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => 'master',
			'charset' => 'utf8',
		),

/*
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=fr33805_db1',
			'emulatePrepare' => true,
			'username' => 'fr33805_db1',
			'password' => 'm2ster',
			'charset' => 'utf8',
			'tablePrefix' => '',
		),
*/		
		'db2'=>array(
	        'class'=>'system.db.CDbConnection',
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/ext_data.db',
		),


		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'roman-laptev@yandex.ru',
		//'colorbox'=>'lightbox',
		'colorbox'=>'pirobox',
		//'colorbox'=>'highslide',
		//'content_site'=>'',
		//'content_site'=> 'http://mycomp/',
		//'content_site'=> 'http://gravura.ts6.ru/',
		//'content_site'=> 'http://vhost.tw1.ru/',
		'vocabulary_name'=>'галереи изображений',
	),


);
