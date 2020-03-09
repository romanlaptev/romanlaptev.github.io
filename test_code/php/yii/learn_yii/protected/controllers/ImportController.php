<?php
class ImportController extends Controller
{
	private $log;

	public function init() 
	{
		$this->log['messages'] = "";
		$this->log['errors'] = "";
	 }

	public function actionIndex()
	{
		$model = new Import;

		if ( isset( $_POST['Import'] ) )
		{
			$model->attributes = $_POST['Import'];
			if ( !empty($_FILES['Import']['tmp_name']['upload_file']) )
			{
				if ( $_FILES['Import']['type']['upload_file']  == 'text/xml' )
				{
					$file = CUploadedFile::getInstance( $model, 'upload_file' );

					$upload_filename = $_FILES['Import']['name']['upload_file'];
					$file->saveAs( Yii::getPathofAlias("webroot") ."/upload/".$upload_filename);

					$xml_file = Yii::getPathofAlias("webroot") ."/upload/". $_FILES['Import']['name']['upload_file'];
					$this->log['messages'][] = $xml_file . " was sucсessfuly uploaded ";

					$this->processImport( $xml_file );//start import
				}
				else
				{
					$this->log['errors'][]  = "Wrong filetype, only XML allowed.";
				}
			}
			else
			{
				$this->log['errors'][] = "Error uploaded ".$_FILES['Import']['name']['upload_file'];
			}
		}

		$params=array(
			"model"=>$model,
			'messages'=>$this->log['messages'],
			'errors'=>$this->log['errors'],
		);
		$this->render("index", $params );
	}

	private function processImport( $xml_file )
	{
		$this->log['messages'][] =  "start process import";
		if (file_exists($xml_file)) 
		{
			$xml = simplexml_load_file( $xml_file );
//echo "<pre>";
//print_r( $xml->courses );
//echo "</pre>";
//------------------------------------
/*
			$num = Courses::model()->deleteAll();
			$this->log['messages'][] =  "Table courses, deleted $num rows";

			$num = Lessons::model()->deleteAll();
			$this->log['messages'][] =  "Table lessons, deleted $num rows";
*/
			Yii::app()->db->createCommand()->truncateTable( Courses::model()->tableName() );
			$this->log['messages'][] =  "truncateTable courses";
			Yii::app()->db->createCommand()->truncateTable( Lessons::model()->tableName() );
			$this->log['messages'][] =  "truncateTable lessons";
//------------------------------------
			$model=new Courses;
			foreach ( $xml->courses->course as $key=>$course )
			{
				$model->isNewRecord = true;
				$model->course_id = $course["id"];
				$model->title = $course->title;
				$model->description = $course->description;
				$model->save();
			} //--------------- end foreach
			$this->log['messages'][] =  "Table Courses, inserted ".$model->count()." records";
//------------------------------------
			$model=new Lessons;
			foreach ( $xml->lessons->lesson as $key=>$lesson )
			{
				$model->isNewRecord = true;
				$model->lesson_id = null;
				$model->course_id = $lesson["course_id"];
				$model->url = $lesson->url;
				$model->title = $lesson->title;
				$model->description = $lesson->description;
				$model->save();
			} //--------------- end foreach
			$this->log['messages'][] =  "Table Lessons, inserted ".$model->count()." records";
		} 
		else 
		{
			$this->log['errors'][] =  "Failed to open $xml_file";
		}

	}//------------------------- end func


}
?>
