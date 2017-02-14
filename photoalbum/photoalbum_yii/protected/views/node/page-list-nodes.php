<h1>list nodes</h1>
<style>
.child-termins
{
	margin-bottom:20px;
	text-align:center;
}
.child-termins li
{
	list-style:none;
	display:inline;
	margin:10px;
}
.child-termins li a
{
	text-decoration:none;
}
</style>

<?php
	if (!empty($error))
	{
echo "error = <pre>";
print_r($error);
echo "</pre>";
	}

//echo "nodes = <pre>";
//print_r($nodes);
//echo "</pre>";


if (!empty($nodes))
{

	if (count($nodes['child']>0))
	{
//-------------------------------- вывод дочерних терминов
//echo "child termins == <pre>";
//print_r($nodes['child']);
//echo "</pre>";
		echo "<div class='child-termins'>";
		echo "<ul>";
		foreach ($nodes['child'] as $child_termin)
		{
			echo "<li>";		
			echo CHtml::link($child_termin['name'],array('node/list','tid'=>$child_termin['tid']));
			echo "</li>";		
		}
		echo "</ul>";
		echo "</div>";
//-------------------------------------------
	}

	foreach ($nodes as $key=>$node)
	{
//echo "<pre>";
//print_r($node);
//echo "</pre>";
		echo "<div class='node-title'>";
		echo "<h2>".$node['title']."</h2>";
		echo "</div>";
		//foreach ($node['photos'] as $photo)
		//{
			$photo = $node['photos'][0];
			$preview_img = $photo['preview_img']."/".$photo['filename'];
			echo "<div class='preview-img'>";
			echo "<img src='".$preview_img."'>";
			echo "</div>";
		//}

		echo "<div class='node-link'>";
		echo "Всего изображений: ".count($node['photos']).", "; 
		echo CHtml::link("подробнее...",array('node/view','id'=>$node['nid']));
		echo "</div>";
		echo "<hr>";

	}
}


?>
