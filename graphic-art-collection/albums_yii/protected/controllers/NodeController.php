<?php

class NodeController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view','list'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{

		//$this->render('view',array(
		//	'model'=>$this->loadModel($id),
		//));
		$this->render('view_node',array(
			'model'=>$this->loadModel_mod($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Node;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Node']))
		{
			$model->attributes=$_POST['Node'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->nid));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Node']))
		{
			$model->attributes=$_POST['Node'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->nid));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
/*
		$dataProvider=new CActiveDataProvider('Node');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
*/
		$criteria=new CDbCriteria;
		$criteria->select='title';
		$criteria->condition='type=:type';
		$criteria->params=array(':type'=>'photogallery_image');
		$criteria->order = 'created DESC';
		//$criteria->with = 'nid';
		//$criteria->with = 'content_field_filename_nid';
		$criteria->with = array('nid','content_field_filename_nid');

		$pages=new CPagination(Node::model()->count($criteria));
		$pages->pageSize=5;
		$pages->applyLimit($criteria);

		$nodes = Node::model()->findAll($criteria);
		$this->render('index',array(
			'nodes'=>$nodes,
			'pages' => $pages,
			'total' => $pages->itemCount,
		));
	}

	public function actionList()
	{
//echo "class NodeController, public function actionList()";
//echo "<br>";

// получить список нод, связанных с термином
		$criteria = new CDbCriteria;
		$criteria->select='title';
		$criteria->condition='tid=:tid AND type=:type';
		$criteria->params=array(':tid'=>$_REQUEST['tid'],':type'=>'photogallery_image');
		$criteria->with = array('nid','content_field_filename_nid','term_node');
		$criteria->order = 'nid.field_num_page_value ASC';

		$pages=new CPagination(Node::model()->count($criteria));
		$pages->pageSize=5;
		$pages->applyLimit($criteria);
		$nodes = Node::model()->findAll($criteria);

// получить имя термина
		$criteria = new CDbcriteria;
		$criteria->select='name';
		$criteria->condition='tid=:tid';
		$criteria->params=array(':tid'=>$_REQUEST['tid']);
		$termin = Term_data::model()->find($criteria);
//echo "termin - <pre>";
//print_r($termin);
//echo "</pre>";
//echo "name = ".$termin->name;
//echo "<br>";

// получить список дочерних терминов
		$criteria = new CDbcriteria;
		$criteria->select = 'tid,name,description,weight';
		$criteria->with = 'term_hierarchy';
		$criteria->condition='term_hierarchy.parent=:tid';
		$criteria->params = array(':tid'=>$_REQUEST['tid']);
		$criteria->order = "weight ASC";
		$child_termins_res = Term_data::model()->findAll($criteria);

		$child_termins = array();
		foreach ($child_termins_res as $key=>$item)
		{
//echo "item - <pre>";
//print_r($item);
//print_r($item->attributes);
//echo "</pre>";
//echo $item->name;
//echo "<br>";
			$child_termins[] = $item->attributes;
		}

		$this->render('index',array(
			'nodes'=>$nodes,
			'pages' => $pages,
			'total' => $pages->itemCount,
			'termin' => $termin->name,
			'child_termins' => $child_termins,
		));

	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Node('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Node']))
			$model->attributes=$_GET['Node'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Node the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Node::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	public function loadModel_mod($id)
	{
//echo "public function loadModel_mod($id)";
//echo "<br>";
		$model=Node::model()->with('nid')->with('content_field_filename_nid')->findByPk($id);
//echo "model - <pre>";
//print_r($model);
//echo "</pre>";
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Node $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='node-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

}
