<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

class SiteController extends Controller
{
	//public $layout='column1';

	public function actionTest()
	{
echo "class SiteController, public function actionTest()";
echo "<br>";
/*
		$sql="
-- получить menu_links.mlid страниц 1-го уровня
SELECT menu_links.mlid FROM menu_links WHERE menu_links.plid IN 
-- (SELECT menu_links.mlid FROM menu_links WHERE link_title LIKE '%Графика Ганса Гольбейна Младшего%')
(481)
ORDER BY weight ASC;
";
*/
		$sql="SELECT title FROM photoalbum_node WHERE title like '%город%'";
echo "sql = ".$sql;
echo "<br>";
		$connection=Yii::app()->db; 
	        $command=$connection->createCommand($sql);
	        $reader=$command->query();
echo "count - ".$reader->rowCount;
echo "<br>";

		foreach ($reader as $row)
		{
echo "row = <pre>";
print_r($row);
echo "</pre>";
		}

	}

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
		$termins = $this->get_termins();
//echo "termins = <pre>";
//print_r($termins);
//echo "</pre>";
		$params=array('termins'=>$termins,
				'error'=>'',
			);
		$this->render('page-view-termins',$params);
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
//echo "public function actionError()";
//echo "<br>";
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}

	public function get_termins()
	{
//echo "public function get_termins()";
//echo "<br>";
		if (Yii::app()->params['datasource']=='database')
		{
			$connection=Yii::app()->db; 
			$db_prefix = 'photoalbum_';

			$sql="
-- получить термины словаря таксономии (level 0)
SELECT
photoalbum_term_data.tid,
photoalbum_term_data.vid,
photoalbum_term_data.name,
photoalbum_term_data.description,
photoalbum_term_data.weight, 
photoalbum_term_hierarchy.parent
FROM photoalbum_term_data
INNER JOIN photoalbum_vocabulary ON photoalbum_vocabulary.name='Фотоальбомы'
LEFT JOIN photoalbum_term_hierarchy ON photoalbum_term_hierarchy.tid=photoalbum_term_data.tid
WHERE 
photoalbum_term_data.vid=photoalbum_vocabulary.vid AND photoalbum_term_hierarchy.parent=0
ORDER BY photoalbum_term_data.weight";
			//$results = Node::model()->findAllBySql($sql);
			//return $results;

		        $command=$connection->createCommand($sql);
		        $reader=$command->query();

			$termins=array();
			foreach ($reader as $termin)
			{
				$termins[]=$termin;
			}

			for($n1=0;$n1<count($termins);$n1++)
		//for($n1=0;$n1<1;$n1++)
			{
				$termins[$n1]['child']=$this->get_child_termins($termins[$n1]['tid']);
			}

			return $termins;
		}

		if (Yii::app()->params['datasource']=='xml_file')
		{
//echo "Read data from xmlfile";
//echo "<br>";
			$xml_model = new Xml_model;
			$termins = $xml_model->get_termins();
			return $termins;
		}

	}//------------------------- end func

	public function get_child_termins($tid)
	{
		$sql="
-- получить дочернии термины
SELECT
photoalbum_term_data.tid,
photoalbum_term_data.vid,
photoalbum_term_data.name,
photoalbum_term_data.description,
photoalbum_term_data.weight, 
photoalbum_term_hierarchy.parent
FROM photoalbum_term_data
INNER JOIN photoalbum_vocabulary ON photoalbum_vocabulary.name='Фотоальбомы'
LEFT JOIN photoalbum_term_hierarchy ON photoalbum_term_hierarchy.tid=photoalbum_term_data.tid
WHERE 
photoalbum_term_data.vid=photoalbum_vocabulary.vid AND photoalbum_term_hierarchy.tid IN -- ВЛОЖЕННЫЙ ЗАПРОС
(
	SELECT photoalbum_term_hierarchy.tid 
	FROM photoalbum_term_hierarchy 
	WHERE photoalbum_term_hierarchy.parent=".$tid."
)
ORDER BY photoalbum_term_data.weight
";
//echo "sql = ".$sql;
//echo "<br>";
		$connection=Yii::app()->db; 
	        $command=$connection->createCommand($sql);
	        $reader=$command->query();
//echo "count - ".$reader->rowCount;
//echo "<br>";
		$child_termins=array();
		if ($reader->rowCount>0)
		{
			foreach ($reader as $termin)
			{
//echo "termin = <pre>";
//print_r($termin);
//echo "</pre>";
				$termin['child']=$this->get_child_termins($termin['tid']);
				$child_termins[]=$termin;
			}
		}
		//else
		//{
			return $child_termins;
		//}
	}//------------------------- end func

	public function actionExport()
	{
//echo "public function actionExport()";
//echo "<br>";
		$export_model = new Export;
		$termins = Export::get_termins();
		$nodes = Export::get_all_nodes();
		$path_photos = Export::get_path_photos();
		$filename_info = Export::get_filename_info();
		$book_pages = Export::get_book_pages();
//echo "<pre>";
//print_r($book_pages);
//echo "</pre>";
//exit;
		$xml = "";
		$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
		$xml .= "<photoalbum date-update='".date('d.m.Y, H:i')."'>\n";
		$xml .= Export::prep_xml_termins( $termins );
		$xml .= Export::prep_xml_nodes( $nodes );
		$xml .= Export::prep_xml_path_photos( $path_photos );
		$xml .= Export::prep_xml_filename_info( $filename_info );
		$xml .= Export::prep_xml_book_pages( $book_pages );

		$xml .= "</photoalbum>\n";
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";
//exit;
		if (!empty($xml))
		{
			$data = Export::write_xml($xml);
			$params=array('messages'=>$data['messages'],
					'errors'=>$data['errors'],
			);
			$this->render('page1',$params);
		}
		else
		{
echo "Export error!";
echo "<br>";
			$this->render('page1');
		}

	}

}//-------------------------- end class

