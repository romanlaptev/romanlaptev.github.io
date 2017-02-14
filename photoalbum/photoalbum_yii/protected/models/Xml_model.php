<?php

class Xml_model
{
	public function __construct()
	{
//echo "class Xml_model, function __construct()";
//echo "<br>";
	}

	public function get_termins()
	{
		$filename = Yii::app()->params['xml_fs_path']."/".Yii::app()->params['xml_filename'];
		if (file_exists($filename))
		{
			$xml = simplexml_load_file($filename);
			if ($xml == FALSE) 
			{
				exit("Failed to open ".$filename);
	  		}

			$termins = array();
			$n1=0;
			foreach ($xml->taxonomy_vocabulary->termin as $termin)
			{
//echo "termin == <pre>";
//print_r($termin);
//echo "</pre>";
				$termins[$n1]['tid'] = (int)$termin['tid'];
				$termins[$n1]['vid'] = (int)$termin['vid'];
				$termins[$n1]['parent'] = (int)$termin['parent'];
				$termins[$n1]['weight'] = (int)$termin['weight'];
				$termins[$n1]['name'] = (string)$termin->term_name;

				$termins[$n1]['child'] = Xml_model::get_child_termins($termin);
				$n1++;
				
			}
			return $termins;
		}
	}//----------------------------------- end func

	private function get_child_termins($termin)
	{
		foreach ($termin->termin as $xml_child_termin)
		{
			$child_termin = array();
			$child_termin['tid'] = (int)$xml_child_termin['tid'];
			$child_termin['vid'] = (int)$xml_child_termin['vid'];
			$child_termin['parent'] = (int)$xml_child_termin['parent'];
			$child_termin['weight'] = (int)$xml_child_termin['weight'];
			$child_termin['name'] = (string)$xml_child_termin->term_name;

			if (count($xml_child_termin->termin)>0)
			{
				$child_termin['child'] = Xml_model::get_child_termins($xml_child_termin);
			}

			$child_termins[] = $child_termin;
		}
		return $child_termins;
	}//----------------------------------- end func

	private function search_termin($xml,$tid)
	{
//echo "xml == <pre>";
//print_r($xml->termin[3]);
//echo "</pre>";
		$termin_arr = array();
		foreach ($xml->termin as $termin)
		{
			if ((int)$termin['tid'] == $tid)
			{
				$termin_arr['tid'] = (int)$termin['tid'];
				$termin_arr['vid'] = (int)$termin['vid'];
				$termin_arr['parent'] = (int)$termin['parent'];
				$termin_arr['weight'] = (int)$termin['weight'];
				$termin_arr['name'] = (string)$termin->term_name;
	
				$termin_arr['child'] = Xml_model::get_child_termins($termin);
			}
			else
			{
				$termin_arr = Xml_model::search_child_termins($termin,$tid);
			}

			if (count($termin_arr)>0)
			{
				return $termin_arr;
			}
		}

	}//----------------------------------- end func

	private function search_child_termins($termin,$tid)
	{

		$termin_arr = array();
		foreach ($termin->termin as $xml_child_termin)
		{
			if ((int)$xml_child_termin['tid'] == $tid)
			{
				$termin_arr['tid'] = (int)$xml_child_termin['tid'];
				$termin_arr['vid'] = (int)$xml_child_termin['vid'];
				$termin_arr['parent'] = (int)$xml_child_termin['parent'];
				$termin_arr['weight'] = (int)$xml_child_termin['weight'];
				$termin_arr['name'] = (string)$xml_child_termin->term_name;
	
				$termin_arr['child'] = Xml_model::get_child_termins($xml_child_termin);

			}
			else
			{
				$termin_arr = Xml_model::search_child_termins($xml_child_termin,$tid);
			}

			if (count($termin_arr)>0)
			{
				return $termin_arr;
			}
		}

	}//----------------------------------- end func

	public function get_nodes($tid)
	{
		$filename = Yii::app()->params['xml_fs_path']."/".Yii::app()->params['xml_filename'];
		if (file_exists($filename))
		{
			$xml = simplexml_load_file($filename);
			if ($xml == FALSE) 
			{
				exit("Failed to open ".$filename);
	  		}
			
			$nodes = array();
			foreach ($xml->nodes->node as $node)
			{
//echo "node == <pre>";
//print_r($node);
//echo "</pre>";
				$node_arr = array();
				foreach ($node->term_node as $term_node)
				{
					if ((int)$term_node['tid'] == $tid)
					{
						$node_arr['nid'] = (int)$node['nid'];
						$node_arr['title'] = (string)$node['title'];
						$node_arr['type'] = (string)$node['type'];
						$node_arr['status'] = (string)$node['status'];
						$node_arr['created'] = (string)$node['created'];

						$term_node_arr = array();
						for($n1=0; $n1<count($node->term_node); $n1++)
						{
							$term_node_arr[$n1]['tid']=(int)$node->term_node[$n1]['tid'];
							$term_node_arr[$n1]['name']=(string)$node->term_node[$n1];
						}
						$node_arr['term_node'] = $term_node_arr;

						$photos_arr = array();
						for($n1=0; $n1<count($node->photos->photo); $n1++)
						{
		$photos_arr[$n1]['fid']=(int)$node->photos->photo[$n1]['fid'];
		$photos_arr[$n1]['filename']=(string)$node->photos->photo[$n1]->filename;
		$photos_arr[$n1]['preview_img']=(string)$node->photos->photo[$n1]->preview_img;
		$photos_arr[$n1]['big_img']=(string)$node->photos->photo[$n1]->big_img;
		$photos_arr[$n1]['original_img']=(string)$node->photos->photo[$n1]->original_img;
if(isset($node->photos->photo[$n1]->alt))
{
	$photos_arr[$n1]['alt']=(string)$node->photos->photo[$n1]->alt;
}
if(isset($node->photos->photo[$n1]->title))
{
	$photos_arr[$n1]['title']=(string)$node->photos->photo[$n1]->title;
}
						}
						$node_arr['photos'] = $photos_arr;


						$nodes[]=$node_arr;
					}
				}
			}

//------------------------------------- получить дочернии термины термина ноды
			$termin = Xml_model::search_termin($xml->taxonomy_vocabulary,$tid);
			if (count($termin['child'])>0)
			{
				$nodes['child'] = $termin['child'];
			}
//-------------------------------------
			return $nodes;
		}
	}//----------------------------------- end func

}

?>
