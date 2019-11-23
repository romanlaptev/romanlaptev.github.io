<?
//****************************
// MAIN
//****************************
echo "<pre>";
print_r ($_REQUEST);
//print_r ($_POST);
//print_r ($_SERVER);
echo "</pre>";

echo "<h1>Test SimpleXML</h1>";
echo "<br>";

//-----------------------------------------------------
// —читать из XML-файла данные 
//-----------------------------------------------------
$xml_file = "../pages/xml/db_site.xml";
$xml = simplexml_load_file($xml_file);
if ($xml == FALSE) 
  {
	exit("Failed to open ".$xml_file);
  }

echo "<pre>";
print_r ($xml);
echo "</pre>";

?>
