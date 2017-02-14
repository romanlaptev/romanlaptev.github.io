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
//	echo "<b>Element: $name</b><br>";      // имя элемента
	echo "<font color=\"green\">"; 
	echo "<br>&lt;$name";      // имя элемента
	echo "</font>"; 
	foreach ($attrs as $attr => $value) 
	    {
		// выводим имя атрибута и его значение
//		echo 'Attribute: '.$attr.' = '.$value.'<br>';
		echo "<font color=\"green\">"; 
		echo " ".$attr."=";
		echo "</font>"; 
		echo $value;
	    }
	echo "<font color=\"green\">"; 
	echo "&gt;";      // имя элемента
	echo "</font>"; 
}

// $parser - уникальный идентификатор парсера
// $name - имя обнаруженного элемента
function endElement($parser, $name) 
{
	echo "<font color=\"green\">"; 
	echo "<br>&lt;/$name&gt;<br>";      // имя элемента
	echo "</font>"; 
}

function characterData($parser, $data) 
{
    print $data;
}

//function stringElement($parser, $data) 
//{
//   echo 'String: '.$data.'<br>'; // выводим строку
//}

//****************************
// MAIN
//****************************
//$filename = "data.xml";
$filename = "test_video.xml";

$xml_parser = xml_parser_create();

// События элементов возникают, когда XML-разборщик обнаруживает 
// начальный или конечный тэги. 
//Для начальных и конечных тэгов имеются отдельные обработчики.
xml_set_element_handler($xml_parser, "startElement", "endElement");
xml_set_character_data_handler($xml_parser, "characterData");
//xml_set_character_data_handler($xml_parser, "stringElement");

if (!($fp =  fopen($filename,  "r"))) 
{
    die("could not open XML input");
}

while ($data = fgets($fp)) 
{
//  echo $data;
  if (!xml_parse($xml_parser, $data, feof($fp))) 
    {
//	echo "<br>XML Error: ".xml_error_string(xml_get_error_code($xml_parser));
//	echo " at line ".xml_get_current_line_number($xml_parser);
	break;
  }
}

xml_parser_free($xml_parser);
?>
</body>
</html>

