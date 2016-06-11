<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

class NodeController extends Controller
{
	public function actionIndex()
	{
echo "class NodeController, public function actionIndex()";
echo "<br>";
	}

	public function actionView()
	{
//echo "class NodeController, public function actionView()";
//echo "<br>";
		if (!empty($_REQUEST['nid']))
		{
			//$node = $this->get_node(167);
			$node = $this->get_node($_REQUEST['nid']);
			$node_img = $this->get_node_img($node->nid);
			$params=array('node'=>$node,
					'node_img'=>$node_img,
				);
			$this->render('page-view-node',$params);
		}
	}

	public function actionList()
	{
//echo "class NodeController, public function actionList()";
//echo "<br>";
		$nodes = $this->get_nodes();
		$params=array('nodes'=>$nodes,
				'error'=>'',
			);
		$this->render('page-list-nodes',$params);

	}

	public function get_nodes()
	{
//echo "public function get_nodes()";
//echo "<br>";
		//$sql="SELECT * FROM photoalbum_node WHERE type = 'photo'";
		if (Yii::app()->params['datasource']=='database')
		{
			$sql="SELECT * FROM photoalbum_node";
			$nodes = Node::model()->findAllBySql($sql);
//echo "results = <pre>";
//print_r($results);
//echo "</pre>";
			return $nodes;
		}

		if (Yii::app()->params['datasource']=='xml_file')
		{
			$xml_model = new Xml_model;
			$nodes = $xml_model->get_nodes($_REQUEST['tid']);
			return $nodes;
		}

	}//------------------------- end func

	public function get_node($nid)
	{
//echo "public function get_node()";
//echo "<br>";
		//$test = Node::model()->find('nid=:nid', array(':nid'=>10));		
		$condition='nid=:nid';
		$params[':nid']=$nid;
		$node = Node::model()->find($condition,$params);
		return $node;
	}//------------------------- end func

	public function get_node_img($nid)
	{
//echo "public function get_node_img()";
//echo "<br>";
		$connection=Yii::app()->db; 
		//$connection->active=true;

		$db_prefix = 'photoalbum_';
		//$sql='select * from '.$db_prefix.'node';
		$sql="
-- получить изображения ноды
SELECT
photoalbum_files.fid,
photoalbum_files.filename,
-- photoalbum_content_type_photo.field_content_location_value, 
photoalbum_content_type_photo.field_preview_img_value, 
photoalbum_content_type_photo.field_big_img_value, 
photoalbum_content_type_photo.field_original_img_value 
FROM photoalbum_files
LEFT JOIN photoalbum_node ON photoalbum_node.nid=$nid
-- LEFT JOIN photoalbum_node ON photoalbum_node.title LIKE 'Диксон, остров'
LEFT JOIN photoalbum_content_field_image_photo ON photoalbum_content_field_image_photo.nid=photoalbum_node.nid
LEFT JOIN photoalbum_content_type_photo ON photoalbum_content_type_photo.nid=photoalbum_node.nid
WHERE
photoalbum_files.fid=photoalbum_content_field_image_photo.field_image_photo_fid
";

	        $command=$connection->createCommand($sql);
	        $reader=$command->query();

		//$node_img=array();
	        //foreach($reader as $row)
	        //{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
			//$node_img[]=$row;
	        //}

		//$connection->active=false;  // close connection
		//return $node_img;
		return $reader;

	}//------------------------- end func

}
