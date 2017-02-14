<?php
//echo "view-image.php";
//echo "<br>";

foreach ($xml->album as $album)
{
	foreach ($album->node as $node)
	{
		if ((int)$node['nid'] == $nid)
		{
			$node_arr = array();
			$node_arr['title'] = $node->title;
			$node_arr['preview_img'] = $node->preview_img;
			$node_arr['big_img'] = $node->big_img;
			$node_arr['body'] = $node->body;

		}//-------------------- end if

	}//-------------------- end foreach
}//-------------------- end foreach

//------------------------------------- Сменить кодировку переменным вывода
if (isset($node_arr))
{
	if ($charset == "windows-1251")
	{
		$node_arr['title'] = iconv("UTF-8", "windows-1251",$node_arr['title']);
		$node_arr['body'] = iconv("UTF-8", "windows-1251",$node_arr['body']);
	}
	$smarty->assign('node', $node_arr);
}

//echo "node_arr = <pre>";
//print_r($node_arr);
//echo "</pre>";

?>
