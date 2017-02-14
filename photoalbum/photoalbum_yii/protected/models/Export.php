<?php
class Export 
{
	public function get_termins()
	{
//echo "public function get_termins()";
//echo "<br>";
		$connection=Yii::app()->db; 
		//$db_prefix = 'photoalbum_';

		$sql="
-- получить термины словаря таксономии (level 0)
SELECT
	photoalbum_term_data.tid,
	photoalbum_term_data.vid,
	photoalbum_term_data.name,
	photoalbum_term_data.description,
	photoalbum_term_data.weight, 
	photoalbum_term_hierarchy.parent
FROM 
	photoalbum_term_data
LEFT JOIN 
	photoalbum_vocabulary ON photoalbum_vocabulary.name='".Yii::app()->params['vocabulary_name']."'
LEFT JOIN 
	photoalbum_term_hierarchy ON photoalbum_term_hierarchy.tid=photoalbum_term_data.tid
WHERE 
	photoalbum_term_data.vid=photoalbum_vocabulary.vid AND photoalbum_term_hierarchy.parent=0
ORDER BY 
	photoalbum_term_data.weight";

	        $command = $connection->createCommand($sql);
	        $reader = $command->query();

		$termins = array();
		foreach ($reader as $termin)
		{
			$termins[] = $termin;
		}

		for($n1=0;$n1<count($termins);$n1++)
		//for($n1=0;$n1<1;$n1++)
		{
			$termins[$n1]['child'] = Export::get_child_termins($termins[$n1]['tid']);
		}
//echo "termins = <pre>";
//print_r($termins);
//echo "</pre>";

		return $termins;
	}//------------------------- end func

	private function get_child_termins($tid)
	{
//echo "public function get_child_termins()";
//echo "<br>";
		$sql="
-- получить дочернии термины
SELECT
	photoalbum_term_data.tid,
	photoalbum_term_data.vid,
	photoalbum_term_data.name,
	photoalbum_term_data.description,
	photoalbum_term_data.weight, 
	photoalbum_term_hierarchy.parent
FROM 
	photoalbum_term_data
LEFT JOIN 
	photoalbum_vocabulary ON photoalbum_vocabulary.name='".Yii::app()->params['vocabulary_name']."'
LEFT JOIN 
	photoalbum_term_hierarchy ON photoalbum_term_hierarchy.tid=photoalbum_term_data.tid
WHERE 
	photoalbum_term_data.vid=photoalbum_vocabulary.vid 
AND 
	photoalbum_term_hierarchy.tid IN
	(
		SELECT photoalbum_term_hierarchy.tid 
		FROM photoalbum_term_hierarchy 
		WHERE photoalbum_term_hierarchy.parent=".$tid."
	)
ORDER BY photoalbum_term_data.weight
";

//echo "sql = ".$sql;
//echo "<br>";
		$connection = Yii::app()->db; 
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
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
				$termin['child']=Export::get_child_termins($termin['tid']);
				$child_termins[]=$termin;
			}
		}
		return $child_termins;
	}//------------------------- end func

	public function prep_xml_termins($xml_data)
	{
//echo "xml_data: <pre>";
//print_r($xml_data);
//echo "</pre>";
		$xml = "";
		$xml .= "<taxonomy_vocabulary>\n";
	        foreach($xml_data as $termin)
        	{
//echo "<pre>";
//print_r($termin);
//echo "</pre>";
			$xml .= "\t<termin tid='".$termin['tid'].
"' vid='".$termin['vid'].
"' parent='".$termin['parent'].
"' weight='".$termin['weight']."'>\n";
			$xml .= "\t<term_name>";
			$xml .= trim($termin['name']);
			$xml .= "</term_name>\n";
			
			if (!empty($termin['description']))
			{
				$xml .= "\t<term_description>\n";
				$xml .= trim($termin['description'])."\n";
				$xml .= "</term_description>\n";
			}

			if (!empty($termin['child']))
			{
				$tab = "\t\t";
				$xml .= Export::recursion_termins($termin['child'],$tab);
			}

			$xml .= "\t</termin>\n";
        	}//-------------------------- end foreach
		$xml .= "</taxonomy_vocabulary>\n";

/*
		//-------------------------------------- write XML
		$fs_path = Yii::app()->params['xml_fs_path'];
		$filename = Yii::app()->params['xml_filename'];
		$url_path = Yii::app()->params['xml_url_path'];

		$num_bytes = file_put_contents ($fs_path."/".$filename, $xml);
		if ($num_bytes > 0)
		{
$data['messages'] .= "<span class='ok'>Write </span>".$num_bytes." bytes  in ".$filename;
$data['messages'] .= "<br>";
$data['messages'] .= "<a href='".$url_path."/".$filename."'>".$filename."</a>";
//echo "<pre>";
//readfile ($output_filename);
//echo "</pre>";
		}
		else
		{
$data['errors'] .= getcwd();
$data['errors'] .= "<br>";
$data['errors'] .= "<span class='error'>Write error in </span>".$filename;
$data['errors'] .= "<br>";
		}

echo $data['messages'];
echo $data['errors'];*/
		return $xml;
	}

	private function recursion_termins($child_termin,$tab)
	{
//echo "function recursion_termins($child_termin)";
//echo "<br>";
		$xml = "";
	        foreach($child_termin as $termin)
        	{
//echo "termin<pre>";
//print_r($termin);
//echo "</pre>";
			$xml .= $tab."<termin tid='".$termin['tid'].
"' vid='".$termin['vid'].
"' parent='".$termin['parent'].
"' weight='".$termin['weight']."'>\n".$tab;
			$xml .= "<term_name>";
			$xml .= trim($termin['name']);
			$xml .= "</term_name>\n";
			
			if (!empty($termin['description']))
			{
				$xml .= $tab."<term_description>\n";
				$xml .= trim($termin['description'])."\n";
				$xml .= "</term_description>\n";
			}

//echo "count child termins = ".count($termin['child']);
//echo "<br>";
			if (!empty($termin['child']))
			//if (count($termin['child']) > 0)
			{
				$tab .= "\t";
				$xml .= Export::recursion_termins($termin['child'],$tab);
			}

			$xml .= $tab."</termin>\n";

        	}//-------------------------- end foreach
		return $xml;
	}//----------------------- end func


	public function get_all_nodes()
	{
		$connection=Yii::app()->db; 
		$sql="
-- получить все ноды
SELECT
	node.nid,
	node.vid,
	node.type,
	node.title,
	node.status,
	node.created,
	node_revisions.body
FROM photoalbum_node as node
LEFT JOIN 
	photoalbum_node_revisions as node_revisions ON node_revisions.nid = node.nid
WHERE node.type='photo' 
ORDER BY node.created ASC
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();

		$nodes = array();
		foreach ($reader as $node)
		{
			//$node['term_node'][] = 1;
			//$node['term_node'][] = 2;
			//$node['term_node'][] = 3;
			//$node['photos'][] = "photo.jpg";
			$nodes[] = $node;
		}
//-------------------------------------
		$sql="
-- получить все термины нод
SELECT
	term_node.nid,
	term_node.tid,
	term_data.name
FROM photoalbum_term_node as term_node
LEFT JOIN photoalbum_term_data as term_data ON term_data.tid=term_node.tid
ORDER BY nid ASC
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
		$term_nodes = array();
		foreach ($reader as $term_node)
		{
			$term_nodes[] = $term_node;
		}
//-------------------------------------

		$sql="
-- получить все изображения нод(имя файла,описание) 
SELECT
	field_image_photo.nid,
	files.fid,
	files.filename,
	field_image_photo.field_image_photo_data
FROM 
	photoalbum_files as files
LEFT JOIN 
	photoalbum_content_field_image_photo as field_image_photo ON field_image_photo.field_image_photo_fid = files.fid
WHERE
	files.fid = field_image_photo.field_image_photo_fid
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
		$img_nodes = array();
		foreach ($reader as $img_node)
		{
			$img_nodes[] = $img_node;
		}
//-------------------------------------
		for ($n1=0; $n1 < count($nodes); $n1++)
		{
			$n3=0;
			for ($n2=0; $n2 < count($term_nodes); $n2++)
			{
				if ($nodes[$n1]['nid'] == $term_nodes[$n2]['nid'])
				{
					$n3++;
					$nodes[$n1]['term_node'][$n3]['tid'] = $term_nodes[$n2]['tid'];
					$nodes[$n1]['term_node'][$n3]['name'] = $term_nodes[$n2]['name'];
				}
			}

			for ($n3=0; $n3 < count($img_nodes); $n3++)
			{
				if ($nodes[$n1]['nid'] == $img_nodes[$n3]['nid'])
				{
					$nodes[$n1]['photos'][] = $img_nodes[$n3];
				}
			}

		}
//-------------------------------------

		return $nodes;
	}//----------------------- end func


	public function prep_xml_nodes($xml_data)
	{
		$xml = "";
		$xml .= "<nodes>\n";
	        foreach($xml_data as $node)
        	{
//echo "<pre>";
//print_r($node);
//echo "</pre>";
			$xml .= "\t<node nid='".$node['nid'].
"' title='".$node['title'].
"' type='".$node['type'].
"' status='".$node['status'].
"' created='".date("D,d.m.Y H:i:s",$node['created']).
"'>\n";
			//for ($n1=0; $n1 < count($node['term_node']); $n1++)
			foreach ($node['term_node'] as $term_node)
			{
				$xml .= "\t\t<term_node tid='".$term_node['tid']."'>";
				$xml .= trim($term_node['name']);
				$xml .= "</term_node>\n";
			}
			if (!empty( $node['body'] ))
			{
				$body = $node['body'];
				$body = htmlspecialchars ($body);

	//------------------------ filter
				$body = str_replace('', '', $body);
				$body = str_replace('&', '&amp;', $body);
	//------------------------------

				$xml .=  "\t\t<body>\n";
				$xml .=  $body."\n";
				$xml .=  "\t\t</body>\n";
			}


	if (isset($node['photos']))
	{
			$xml .= "\t\t<photos>\n";
			foreach ($node['photos'] as $photo)
			{
				$xml .= "\t\t\t<photo nid='".$photo['nid']."' fid='".$photo['fid']."'>\n";

				$xml .= "\t\t\t\t<filename>";
				$xml .= trim($photo['filename']);
				$xml .= "</filename>\n";
/*
				$xml .= "\t\t\t\t<preview_img>";
				$xml .= trim($photo['field_preview_img_value']);
				$xml .= "</preview_img>\n";

				$xml .= "\t\t\t\t<big_img>";
				$xml .= trim($photo['field_big_img_value']);
				$xml .= "</big_img>\n";

				$xml .= "\t\t\t\t<original_img>";
				$xml .= trim($photo['field_original_img_value']);
				$xml .= "</original_img>\n";
*/
				$photo_data = unserialize($photo['field_image_photo_data']);
				if (!empty($photo_data['description']))
				{
					$xml .= "\t\t\t\t<description>";
					$xml .= trim($photo_data['description']);
					$xml .= "</description>\n";
				}

				if (!empty($photo_data['alt']))
				{
					$xml .= "\t\t\t\t<alt>";
					$xml .= trim($photo_data['alt']);
					$xml .= "</alt>\n";
				}

				if (!empty($photo_data['title']))
				{
					$xml .= "\t\t\t\t<title>";
					$xml .= trim($photo_data['title']);
					$xml .= "</title>\n";
				}

				$xml .= "\t\t\t</photo>\n";
			}
			$xml .= "\t\t</photos>\n";
	}
			
			$xml .= "\t</node>\n";
        	}//-------------------------- end foreach
		$xml .= "</nodes>\n";

		return $xml;
	}



	public function get_path_photos()
	{
		$connection=Yii::app()->db; 
		$sql="
-- получить пути расположения файлов изображений 
SELECT
	path_photo.nid,
	path_photo.field_preview_img_value, 
	path_photo.field_big_img_value, 
	path_photo.field_original_img_value 
FROM 
	photoalbum_content_type_photo as path_photo
WHERE
	path_photo.field_preview_img_value IS NOT NULL
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
		$img_nodes = array();
		foreach ($reader as $item)
		{
			$path_photos[] = $item;
		}
		return $path_photos;
	}//----------------------- end func

	public function prep_xml_path_photos($xml_data)
	{
		$xml = "";
		$xml .= "<path_photos>\n";
	        foreach($xml_data as $item)
        	{
			$xml .= "\t<paths nid='".$item['nid']."'>\n";

			$xml .= "\t\t<preview_img>";
			$xml .= trim( $item['field_preview_img_value'] );
			$xml .= "</preview_img>\n";

			$xml .= "\t\t<big_img>";
			$xml .= trim( $item['field_big_img_value'] );
			$xml .= "</big_img>\n";

			$xml .= "\t\t<original_img>";
			$xml .= trim( $item['field_original_img_value'] );
			$xml .= "</original_img>\n";

			$xml .= "\t</paths>\n";
        	}//-------------------------- end foreach
		$xml .= "</path_photos>\n";
		return $xml;
	}//----------------------- end func


	public function get_filename_info()
	{
		$connection=Yii::app()->db; 
		$sql="
-- получить имена файлов для изображений нод (если информация о файлах в полях field_filename_photo_value) 
SELECT
	filename_photo.nid,
	filename_photo.field_filename_photo_value, 
	filename_photo.delta 
FROM 
	photoalbum_content_field_filename_photo as filename_photo
WHERE
	filename_photo.field_filename_photo_value IS NOT NULL
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
		$img_nodes = array();
		foreach ($reader as $item)
		{
			$filename_info[] = $item;
		}
		return $filename_info;
	}//----------------------- end func

	public function prep_xml_filename_info($xml_data)
	{
		$xml = "";
		$xml .= "<filename_info>\n";
	        foreach($xml_data as $item)
        	{
			$value = htmlspecialchars ( $item['field_filename_photo_value'] );
			//------------------------ filter
			//$value = str_replace('&', '&amp;', $value);
			//------------------------------

			$xml .= "\t<filename_photo nid='".$item['nid'].
"' value='".$value.
"' delta='".$item['delta'].
"'>";
			$xml .= "</filename_photo>\n";
        	}//-------------------------- end foreach
		$xml .= "</filename_info>\n";
		return $xml;
	}//----------------------- end func


	public function get_book_pages()
	{
		$connection=Yii::app()->db; 
		$sql="
-- получить все страницы подшивки Фотоальбомы
SELECT
	menu_links.mlid, 
	menu_links.plid, 
	book.nid, 
	-- book.bid, 
	-- menu_links.link_path,
	menu_links.link_title,
	menu_links.weight,
	menu_links.depth,
	menu_links.has_children
FROM 
	photoalbum_menu_links as menu_links
LEFT JOIN 
	 photoalbum_book as book ON book.mlid=menu_links.mlid 
WHERE
	module='book' AND book.bid=(
		SELECT node.nid FROM photoalbum_node as node WHERE node.title LIKE '".Yii::app()->params['book_name']."'
			AND node.type='book')
ORDER BY 
	menu_links.weight ASC;
";
	        $command = $connection->createCommand($sql);
	        $reader = $command->query();
		$img_nodes = array();
		foreach ($reader as $item)
		{
			$book_pages[] = $item;
		}
		return $book_pages;
	}//----------------------- end func

	public function prep_xml_book_pages($xml_data)
	{
		$xml = "";
		$xml .= "<book_pages>\n";
	        foreach($xml_data as $item)
        	{
			$title = htmlspecialchars ( $item['link_title'] );
			//------------------------ filter
			$title = str_replace('&', '&amp;', $title);
			//------------------------------

			$xml .= "\t<book_page nid='".$item['nid'].
"' mlid='".$item['mlid'].
"' plid='".$item['plid'].
"' link_title='".$title.
"' weight='".$item['weight'].
"' depth='".$item['depth'].
"' has_children='".$item['has_children'].
"'>";
			$xml .= "</book_page>\n";
        	}//-------------------------- end foreach
		$xml .= "</book_pages>\n";
		return $xml;
	}//----------------------- end func




	public function write_xml($xml)
	{
		$filename = Yii::app()->params['xml_filename'];
/*
		$fs_path = Yii::app()->params['xml_fs_path'];
		$url_path = Yii::app()->params['xml_url_path'];
		$num_bytes = file_put_contents ($fs_path."/".$filename, $xml);
		if ($num_bytes > 0)
		{
$data['messages'] .= "<span class='ok'>Write </span>".$num_bytes." bytes  in ".$fs_path."/".$filename;
$data['messages'] .= "<br>";
$data['messages'] .= "<a href='".$url_path."/".$filename."' target=_blank>".$filename."</a>";
		}
		else
		{
$data['errors'] .= getcwd();
$data['errors'] .= "<br>";
$data['errors'] .= "<span class='error'>Write error in </span>".$filename;
$data['errors'] .= "<br>";
		}

*/
		header('Content-Type:  application/xhtml+xml');
		header('Content-Disposition: attachment; filename='.$filename.'');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: '.strlen($xml));
		echo $xml;

$data['messages'] .= "<span class='ok'>Saved </span> xml data in ".$filename;
$data['messages'] .= "<br>";

//echo $data['messages'];
//echo $data['errors'];
		return $data;

	}

}//-------------------------- end class

?>
