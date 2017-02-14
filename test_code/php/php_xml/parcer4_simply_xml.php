<html>
<head>
<meta content="charset=utf-8">
</head>
<body>
<?

//****************************
// MAIN
//****************************
//$filename = "data.xml";
$filename = "test_video.xml";

if (file_exists($filename)) 
  {
	$xml = simplexml_load_file($filename);
//	echo "<pre>";
//	print_r($xml);
//	echo "</pre>";
  } 
else 
  {
	exit('Failed to open $filename');
  }

//$myarray = (array)$xml;
//$myarray2 = (array)$xml->videoclip[0];
//$myarray = array( (string)$xml);
//--------------------------------------------------------------
echo $xml->videoclip[0]['group'];
echo $xml->videoclip[0]['title'];
echo "<br>";

echo $xml->videoclip[0]->description;
echo "<br>";

echo $xml->videoclip[0]->filesize;
echo "<br>";

echo "<a href=\"";
echo $xml->videoclip[0]->location->a[0]['href'];
echo "\"> ";
echo $xml->videoclip[0]->location->a;
echo "<a><br/>";

echo "<a href=\"";
echo $xml->videoclip[0]->filesharing->a[0]['href'];
echo "\"> ";
echo $xml->videoclip[0]->filesharing->a[0];
echo "<a><br/>";

echo "<a href=\"";
echo $xml->videoclip[0]->filesharing->a[1]['href'];
echo "\"> ";
echo $xml->videoclip[0]->filesharing->a[1];
echo "<a><br/>";

//--------------------------------------------------------------
echo $xml->videoclip[1]['group'];
echo $xml->videoclip[1]['title'];
echo "<br>";

echo $xml->videoclip[1]->description;
echo "<br>";

echo $xml->videoclip[1]->filesize;
echo "<br>";

echo "<a href=\"";
echo $xml->videoclip[1]->location->a[1]['href'];
echo "\"> ";
echo $xml->videoclip[1]->location->a;
echo "<a><br/>";

echo "<a href=\"";
echo $xml->videoclip[1]->filesharing->a[0]['href'];
echo "\"> ";
echo $xml->videoclip[1]->filesharing->a[0];
echo "<a><br/>";

echo "<a href=\"";
echo $xml->videoclip[1]->filesharing->a[1]['href'];
echo "\"> ";
echo $xml->videoclip[1]->filesharing->a[1];
echo "<a><br/>";

//--------------------------------------------------------------

//echo "<pre>";
//print_r ($myarray);
//echo "<hr>";
//print_r ($myarray2);
//echo "</pre>";


?>
</body>
</html>

