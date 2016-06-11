<?php
//date_default_timezone_set('Asia/Novosibirsk');
?>

<h1>page2</h1>

<?php
echo $node->title;
echo "<br>";

	foreach ($node_img as $image)
	{
//echo "image = <pre>";
//print_r($image);
//echo "</pre>";
		$img_url = $image['field_preview_img_value']."/".$image['filename'];
		echo "<img src='".$img_url."'></a>";
		echo "<br>";
	}
?>
