<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

class SiteController extends Controller
{
	//public $layout='column1';

	public function actionIndex()
	{
//echo "public function actionIndex()";
//echo "<br>";

		//Creates a new model.
		//$node = new Node;
//echo "node = <pre>";
//print_r($node);
//echo "</pre>";

		//$node_titles = new Node('title');
//echo "node_titles = <pre>";
//print_r($node_titles);
//echo "</pre>";
//----------------------------------

		//$test = Node::model()->find('nid=:nid', array(':nid'=>10));		

		//$condition='nid=:nid';
		//$params[':nid']=10;
		//$test = Node::model()->find($condition,$params);
//echo $test->title;
//echo "<br>";
//echo "test = <pre>";
//print_r($test);
//echo "</pre>";

		//$results = Node::model()->findAllBySql("SELECT * FROM photoalbum_node WHERE nid<'10'");
//echo "results = <pre>";
//print_r($results);
//echo "</pre>";
		//foreach ($results as $result)
		//{
		//	echo $result->title;
		//	echo "<br>";
		//}
//--------------------------------------

		$connection=Yii::app()->db; 
		//$connection->active=true;

		$db_prefix = 'photoalbum_';
		$sql='select * from '.$db_prefix.'node';

	        $command=$connection->createCommand($sql);
	        $reader=$command->query();

		$nodes=array();
	        foreach($reader as $row)
	        {
//echo "<pre>";
//print_r($row);
//echo "</pre>";
			$nodes[]=$row['title'];
	        }

		//$connection->active=false;  // close connection
//------------------------------------------------
		$params=array('nodes'=>$nodes,
				'error'=>'no errors....',
			);

		$this->render('page1',$params);
	}


	/**
	 * Declares class-based actions.
	 */
/*
	public function actions()
	{
echo "public function actions()";
echo "<br>";
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
*/

	/**
	 * This is the action to handle external exceptions.
	 */

	public function actionError()
	{
echo "public function actionError()";
echo "<br>";
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}


}//-------------------------- end class

