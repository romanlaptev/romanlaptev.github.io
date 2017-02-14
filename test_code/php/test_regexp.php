<?php
$str = 'test';
if (preg_match("|(.*)|sei", $str, $arr))
{
echo $arr[1];
}
echo "<br>";


//----------------------------
$text = '<a target="_blank" href="http://qdec-demo9.loc/files/crop_image/crop.php?src=files/images/production/fotooboi/pre_320/WP-14-1009.jpg&amp;x=90&amp;y=121&amp;w=130&amp;h=108" id="crop-url">Ссылка на выбранный фрагмент</a>';
//$pattern = '/href="(.+)"/';
$pattern = '/href=\"([^\"]*)\"/';

echo $pattern;
preg_match($pattern, $text, $matches);

echo "<pre>";
print_r($matches);
echo "</pre>";

$href = $matches[1];
echo $href;

?>

