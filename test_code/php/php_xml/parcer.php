<html>
<head>
<meta content="charset=utf-8">
</head>
<body>
<?
// $parser - уникальный идентификатор парсера
//     (т.к. мы можем использовать несколько парсеров)
// $name - имя обнаруженного элемента
// $attrs - массив атрибутов обнаруженного элемента
function startElement($parser, $name, $attrs)  
{
	global $num_startElement;
	global $num_videoclip;
	global $num_film;
	global $tagname;

	$num_startElement++;
//	echo "<b>Element: $name</b><br>";      // имя элемента
	$tagname=$name;

	if ($name == "VIDEOCLIP")
	  {
		if (sizeof($attrs)) 
		  {
			while (list($k, $v) = each($attrs)) 
			   {
				print $v." ";
			  }
			print "<br>";
		  }
	  }
}

// $parser - уникальный идентификатор парсера
// $name - имя обнаруженного элемента
function endElement($parser, $name) 
{
	global $num_endElement;
	global $tagname;

	$num_endElement++;
	$tagname	= "/".$name;
}

function characterData($parser, $data) 
{
	global $tagname;
//	echo $tagname."<br>";
	$tag_data = $data;

	if ($tagname == "FILESIZE")
	  {
//		echo strlen($tag_data);
		echo $tag_data."<br>";
	  }
	if ($tagname == "A")
	  {
		echo $tag_data."<br>";
	  }
	if ($tagname == "DESCRIPTION")
	  {
		echo $tag_data."<br>";
	  }
//	$tagname="";
}


//****************************
// MAIN
//****************************
$filename = "test_video.xml";
//$filename = "video.xml";
global $tag_data;
global $tagname;
$num_startElement=0;
$num_endElement=0;
$num_videoclip=0;
$num_film=0;
$n1=0;

$tagname="";
$tag_data="";

$xml_parser = xml_parser_create();
// События элементов возникают, когда XML-разборщик обнаруживает 
// начальный или конечный тэги. 
//Для начальных и конечных тэгов имеются отдельные обработчики.
xml_set_element_handler($xml_parser, "startElement", "endElement");
xml_set_character_data_handler($xml_parser, "characterData");

$file = fopen($filename,"r");
if(!file)
  {
    echo("Ошибка открытия файла $filename");
  }
else
 {
    $data = fread ($file,filesize($filename));
 }

xml_parse($xml_parser, $data, $test);
xml_parser_free($xml_parser);

//echo $tag_data."<br>";

?>
</body>
</html>

