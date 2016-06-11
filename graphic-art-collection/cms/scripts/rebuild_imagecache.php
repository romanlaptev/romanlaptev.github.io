<?
//---------------------------
// Bootstrap Drupal.
//---------------------------
chdir ("../");
$fs_path = getcwd();
echo $fs_path;

require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//---------------------------
if (module_exists('imagecache'))
{
	global $base_url;
	echo "<h2>create imagechache icons</h2>";

	$filename = 'satu_oli__spring_in_japan_by_magnusti781.jpg';
	$filepath = 'sites/default/files/category_pictures';
	$preset = 'h100';
	$alt = 'just a test image';
	$title = 'test image';
	echo "Preset <h2>".$preset."</h2>";
	$img = theme('imagecache', $preset, $filepath, $alt, $title, array('class' => 'child_categories_img'));
echo $img;
	//print theme('imagecache', $preset, $filepath);		
	//print "<img src='".$base_url."/sites/default/files/imagecache/".$preset."/category_pictures/".$filename."'>";
}
?>

