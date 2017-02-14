<?php
//------------------------------------- СЧИТАТЬ ИЗОБРАЖЕНИЯ ЗАПРОШЕННОГО АЛЬБОМА
//echo "count(albums) = ".count($albums);
//echo "<br>";
		$n2=0;
		for ($n1=0; $n1<count($albums); $n1++)
		{
//echo "tid = ".$tid;
//echo "<br>";
//echo "albums[".$n1."]['tid'] = ".$albums[$n1]['tid'];
//echo "<br>";
			if($albums[$n1]['tid'] == $tid)
			{
				$album_name = $albums[$n1]['title'];
//echo "album_name = ".$album_name;
//echo "<br>";
				$num_album = $n1;
//echo "num_album = ".$num_album;
//echo "<br>";
				foreach ($xml->album as $album)
				{
//echo $album['name']." ? ".$album_name;
//echo "<br>";
					if ((string)$album['name'] == $album_name)
					{
//echo strlen((string)$album['name'])." ? ".strlen($album_name);
//echo "<br>";
						$albums[$n1]['images'] = array();
						$n2=0;
						foreach ($album->node as $node)
						{
//echo $n2.". ";
//echo "node = <pre>";
//print_r($node);
//echo "</pre>";	
//echo "<br>";

				$albums[$n1]['images'][$n2]['nid'] = $node['nid'];
				$albums[$n1]['images'][$n2]['preview_img'] = (string)$node->preview_img;
				$albums[$n1]['images'][$n2]['big_img'] = (string)$node->big_img;
				$albums[$n1]['images'][$n2]['original_img'] = (string)$node->original_img;
				$albums[$n1]['images'][$n2]['title'] = (string)$node->title;
//echo "albums[$n1]['images'][$n2] = <pre>";
//print_r($albums[$n1]['images'][$n2]);
//echo "</pre>";	
//echo "<hr>";
							$n2++;
						}//-------------------- end foreach
					}
				}//-------------------- end foreach
			}
		}//-------------------- end for

//echo "count(albums[$num_album]['images'] = ".count($albums[$num_album]['images']);
//echo "<br>";
//echo "<pre>";
//print_r($albums[$num_album]);
//echo "</pre>";	

		$smarty->assign('num_album', $num_album);

//------------------------------------- ПАРАМЕТРЫ ПЕЙДЖЕРА
	$images_per_page = 6;
	$smarty->assign('images_per_page', $images_per_page);

//echo "num album images  = ".$n2;
//echo "<br>";
	$num_view_album_pages = ceil($n2 / $images_per_page);
//echo "num_view_album_pages  = ".$num_view_album_pages;
//echo "<br>";
	$smarty->assign('num_view_album_pages', $num_view_album_pages);

	$view_album_pages_start = $images_per_page * $page; //начальная страница списка изображений альбома
//echo "view_album_pages_start  = ".$view_album_pages_start;
//echo "<br>";
	$smarty->assign('view_album_pages_start', $view_album_pages_start);

	$view_album_pages_end = ($view_album_pages_start + $images_per_page)-1;//конечная страница списка изображений альбома
//echo "view_album_pages_end  = ".$view_album_pages_end;
//echo "<br>";
	$smarty->assign('view_album_pages_end', $view_album_pages_end);
?>
