<?php

class CourseController extends Controller
{
	public function actionIndex()
	{
		$courses = Courses::model()->findAll();
		$this->render('index', array(
				'courses'=>$courses
				));
	}


	public function actionView( $id )
	{
/*
		if ( !empty($_REQUEST['course_id']) )
		{
			$course_id = Yii::app()->request->getParam('course_id');
		}
*/
//1
			//$lessons = Lessons::model()->findAll("course_id = :course_id", array(":course_id" => $id));
//2
			$criteria=new CDbCriteria;
			$criteria->condition='course_id=:course_id';
			$criteria->params=array(':course_id'=>$id);  // задаем параметры
			$lessons=Lessons::model()->findAll($criteria);

			$course = Courses::model()->find("course_id = :course_id", array(":course_id" => $id));

			$this->render('view', array(
					'lessons'=>$lessons,
					'course'=>$course
					));

	}

	//public function actionAdd()
	//{
/*
    // создаем экземпляр класса модели (Posts)
    $date = new Posts();            
    // поле title заполняем нужным нам значением
    // предполагаеться что title это существующее поле в таблице post
    $date->title = "Заголовок";
    // поле date заполняем текущей датой
    // предполагаеться что title это существующее поле в таблице post
    $date->date     = date("Y-m-d");
    // добавялем в базу. 
    $date->save();   // или $date->insert();
*/
	//}
	public function actionCreate()
	{
		$model=new Courses;
		if(isset($_POST['Courses']))
		{
			$model->attributes=$_POST['Courses'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->course_id));
		}
		$this->render('create',array(
			'model'=>$model,
		));
	}


//updateAll
//updateByPk
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		if(isset($_POST['Courses']))
		{
			$model->attributes=$_POST['Courses'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->course_id));
		}
		$this->render('update',array(
			'model'=>$model,
		));
	}


//delete
//deleteAll
//deleteByPk
//beforeDelete
//afterDelete
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('index'));
	}

	public function loadModel($id)
	{
		$model=Courses::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}


}
