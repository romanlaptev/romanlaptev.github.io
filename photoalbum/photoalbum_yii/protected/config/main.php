<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'фотоальбом',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	),

	//'defaultController'=>'post',
	'defaultController'=>'site',

	// application components
	'components'=>array(
		/*
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		*/
		/*
		'db'=>array(
			'connectionString' => 'sqlite:protected/data/blog.db',
			'tablePrefix' => 'tbl_',
		),
		*/
		// uncomment the following to use a MySQL database
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=photoalbum',
			//'connectionString' => 'mysql:host=localhost;dbname=fr33805_db1',
			'emulatePrepare' => true,
			'username' => 'root',
			//'username' => 'fr33805_db1',
			'password' => 'master',
			//'password' => 'm2ster',
			'charset' => 'utf8',
			'tablePrefix' => 'photoalbum_',
		),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			//'showScriptName' => false,
			),
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
	//'params'=>require(dirname(__FILE__).'/params.php'),
	'params'=>array(
		//'datasource'=>'database',
		'datasource'=>'xml_file',
		'xml_fs_path'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..'
.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'xml',
		'xml_filename'=>'photoalbum.xml',
		'xml_url_path'=>'../../xml',
		'vocabulary_name'=>'Фотоальбомы',
		'book_name'=>'Фотоальбомы',
	),

);
