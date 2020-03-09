<?php
class ExportController extends Controller
{
	public $xml_filename;

	public function __construct()
	{
		$this->xml_filename = "export.xml";
		parent::__construct("export");
	}
/*
	public function init() {
	       echo "HELLO";
	   }
*/
	public function actionIndex()
	{
		$this->render("index");
	}

	public function actionExport()
	{
		$courses = Courses::model()->findAll();
		$xml_data["courses"] = $courses;

		$lessons = Lessons::model()->findAll();
		if($lessons===null)
			throw new CHttpException(404,'Error, empty $lessons = Lessons::model()->findAll() .');
		$xml_data["lessons"] = $lessons;

		$xml = "";
		$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
		$xml .= "<xml_data date-update=\"".date('d.m.Y, H:i')."\">\n";
		$xml .= $this->prep_xml( $xml_data );
		$xml .= "</xml_data>\n";
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";

		if (!empty($xml))
		{
			$this->write_xml( $xml );
		}
		else
		{
			$data['messages'] = "";
			$data['errors'] = "Export error,  empty xml....";
			$params=array('messages'=>$data['messages'],
					'errors'=>$data['errors'],
			);
			$this->render('export',$params);
		}

	}

	private function prep_xml( $xml_data )
	{
//echo "<pre>";
//print_r( $xml_data );
//echo "</pre>";
		$xml = "";
		$xml .= "\t<courses>\n";
		foreach ( $xml_data["courses"] as $key=>$course )
		{
			$xml .= "\t\t<course id=\"" .$course->course_id. "\">\n";
			$xml .= "\t\t\t<title>";
			$xml .= $course->title;
			$xml .= "</title>\n";
			$xml .= "\t\t\t<description>";
			$xml .= $course->description;
			$xml .= "</description>\n";
			$xml .= "\t\t</course>\n";
		}
		$xml .= "\t</courses>\n";

		$xml .= "\t<lessons>\n";
		foreach ( $xml_data["lessons"] as $key=>$lesson )
		{
			$xml .= "\t\t<lesson id=\"" .$lesson->lesson_id. "\" course_id=\"" .$lesson->course_id. "\">\n";
			$xml .= "\t\t\t<title>";
			$xml .= $lesson->title;
			$xml .= "</title>\n";
			$xml .= "\t\t\t<description>";
			$xml .= $lesson->description;
			$xml .= "</description>\n";
			$xml .= "\t\t\t<url>";
			$xml .= $lesson->url;
			$xml .= "</url>\n";
			$xml .= "\t\t</lesson>\n";
		}
		$xml .= "\t</lessons>\n";

		return $xml;
	}

	private function write_xml($xml)
	{
		header('Content-Type:  application/xhtml+xml');
		header('Content-Disposition: attachment; filename='.$this->xml_filename.'');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: '.strlen($xml));
		echo $xml;
	}

}
?>
