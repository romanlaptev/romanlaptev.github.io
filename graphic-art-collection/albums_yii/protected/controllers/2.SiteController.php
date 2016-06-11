<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		$this->pageTitle = "Альбомы - главная";

		$criteria=new CDbCriteria;
		//$criteria->alias = 'node';
		$criteria->select='title';
		//$criteria->select='node.nid, node.title, content_type_photogallery_image.field_preview_img_value';
		$criteria->condition='type=:type';
		$criteria->params=array(':type'=>'photogallery_image');
		$criteria->order = 'created DESC';
		//$criteria->join = 'LEFT JOIN content_type_photogallery_image ON content_type_photogallery_image.nid=node.nid';
		$criteria->with = 'nid';
		$criteria->with = 'content_field_filename_nid';

		$pages=new CPagination(Node::model()->count($criteria));
		$pages->pageSize=5;
		$pages->applyLimit($criteria);

		$all_nodes = Node::model()->findAll($criteria);
		//$all_nodes = Node::model()->with('nid')->findAll($criteria);
//echo "all_nodes - <pre>";
//print_r($all_nodes);
//echo "</pre>";
/*
		$node_type="photogallery_image";
		$vid=1;
		$sql ="
-- получить ноды с прикрепленным изображением 
SELECT 
node.nid, 
node.title, 
node.status, 
node.created, 
node.changed, 
term_node.tid,
-- term_data.tid,
term_data.vid,
term_data.name,
node_revisions.teaser, 
node_revisions.body, 
content_type_photogallery_image.nid, 
content_type_photogallery_image.field_author_value, 
content_type_photogallery_image.field_create_date_value, 
content_type_photogallery_image.field_style_value, 
content_type_photogallery_image.field_genre_value, 
content_type_photogallery_image.field_technique_value, 
content_type_photogallery_image.field_title_value, 
content_type_photogallery_image.field_preview_img_value, 
content_type_photogallery_image.field_big_img_value, 
content_type_photogallery_image.field_original_img_value, 
content_type_photogallery_image.field_img1_gallery_fid, 
content_type_photogallery_image.field_info_value,
files.fid, 
files.filepath, 
content_field_filename.field_filename_value 
FROM node 
LEFT JOIN node_revisions ON node_revisions.nid=node.nid 
LEFT JOIN content_type_photogallery_image ON content_type_photogallery_image.nid=node.nid 
LEFT JOIN files ON files.fid=content_type_photogallery_image.field_img1_gallery_fid 
LEFT JOIN term_node ON term_node.nid=node.nid 
LEFT JOIN term_data ON term_data.tid=term_node.tid
LEFT JOIN content_field_filename ON content_field_filename.nid=node.nid
WHERE node.type='".$node_type."' AND term_data.vid='".$vid."' 
ORDER BY term_data.tid;
";
		$all_nodes = Node::model()->findAllBySql($sql);
*/
		$this->render('index', array(
				'nodes' => $all_nodes, 
				'pages' => $pages,
				'total' => $pages->itemCount,
				));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
}
