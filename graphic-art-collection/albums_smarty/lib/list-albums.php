<?php
//------------------------------------- СЧИТАТЬ СПИСОК АЛЬБОМОВ
	$albums = array();
	$n1=0;
	$num_parent_termins = 0;
	foreach ($xml->taxonomy_vocabulary->termin as $termin)
	{
		//$albums[$n1]['title'] = $termin['weight'].". ".$termin->term_name;
		$albums[$n1]['title'] = $termin->term_name;
		$albums[$n1]['description'] = $termin->term_description;
		$albums[$n1]['tid'] = $termin['tid'];
		$albums[$n1]['tid_parent'] = $termin['tid_parent'];
		$albums[$n1]['weight'] = (int)$termin['weight'];
//echo "albums[".$n1."]['weight'] = ".$albums[$n1]['weight'];
//echo "<br>";
		$n1++;

		if($termin['tid_parent']==0)
		{
			$num_parent_termins++;
//echo "num_parent_termins = ".$num_parent_termins;
//echo "<br>";
		}
	}//-------------------- end foreach

//------------------------------------- ПАРАМЕТРЫ ПЕЙДЖЕРА
	$termins_per_page = 6;
	$smarty->assign('termins_per_page', $termins_per_page);

	//$images_per_page = 6;
	//$smarty->assign('images_per_page', $images_per_page);

	if ($content == 'list-albums')
	{
		$num_album_pages = ceil($num_parent_termins / $termins_per_page);
	}
	
	//if ($content == 'view-album')
	//{
		//$num_album_pages = ceil($num_termins / $termins_per_page);
	//}
//echo "num_album_pages  = ".$num_album_pages;
//echo "<br>";

	$smarty->assign('num_album_pages', $num_album_pages);

	$start = $termins_per_page * $page; //начальный альбом  для страницы списка альбомов
//echo "start  = ".$start;
//echo "<br>";
	$smarty->assign('start', $start);

	$end = ($start + $termins_per_page)-1;//конечный альбом
//echo "end  = ".$end;
//echo "<br>";
	$smarty->assign('end', $end);

//------------------------------------- СОРТИРОВАТЬ ТЕРМИНЫ ПО ВЕСУ
	for ($n2=0; $n2<($num_termins-1); $n2++)
	//for ($n2=0; $n2<($num_parent_termins-1); $n2++)
	//for ($n4=0; $n4 < 18; $n4++)
	{
		for ($n1=0; $n1<($num_termins-1); $n1++)
		//for ($n1=0; $n1<($num_parent_termins-1); $n1++)
		//for ($n1=0; $n1 < 18; $n1++)
		{
			$test = $albums[$n1]['weight'];
			if ($test > $albums[$n1+1]['weight'])
			{
				$albums[$n1]['weight'] = $albums[$n1+1]['weight'];
				$albums[$n1+1]['weight'] = $test;
				
				$test_title = $albums[$n1]['title'];
				$test_desc = $albums[$n1]['description'];
				$test_tid = $albums[$n1]['tid'];
				$test_tid_parent = $albums[$n1]['tid_parent'];
				
				$albums[$n1]['title'] = $albums[$n1+1]['title'];
				$albums[$n1]['description'] = $albums[$n1+1]['description'];
				$albums[$n1]['tid'] = $albums[$n1+1]['tid'];
				$albums[$n1]['tid_parent'] = $albums[$n1+1]['tid_parent'];
				
				$albums[$n1+1]['title'] = $test_title;
				$albums[$n1+1]['description'] = $test_desc;
				$albums[$n1+1]['tid'] = $test_tid;
				$albums[$n1+1]['tid_parent'] = $test_tid_parent;
			}
		}//---------------------- end for
	}//---------------------- end for
?>
