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
$filename = "video.xml";

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
echo $xml->videoclip[1]['group'];
echo $xml->videoclip[1]['title'];
echo "<br>";
//--------------------------------------------------------------
echo $xml->videoclip[2]['group'];
echo $xml->videoclip[2]['title'];
echo "<br>";
//--------------------------------------------------------------

//echo "<pre>";
//print_r ($myarray);
//echo "<hr>";
//print_r ($myarray2);
//echo "</pre>";

//--------------------------------------------------------------
// Использование выражений XPath в методах SimpleXML
//--------------------------------------------------------------

$result = $xml->xpath('//videoclip'); 
echo "<pre>";
print_r ($result);
echo "</pre>";
//while ( list( , $node) = each($result)) 
//{ 
//   echo 'Название книги: '.iconv("UTF-8", "windows-1251", $node)."<br>"; 
//   echo 'Название: '.$node)."<br>"; 
//}



?>
</body>
</html>

