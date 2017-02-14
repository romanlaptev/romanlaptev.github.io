<html>
<head>
<title>DOM</title>
</head>
<body>
<table>

<?php
$filename = "test_video.xml";

// создаем новый объект XML
//$dom = domxml_open_file($filename); 

$dom = new DOMDocument();
$dom->load($filename);

// Инициализируем
//$xml->xpath_init(); 

//  создаем новый контекст, чтобы с помощью XPath ссылаться на узлы в дереве DOM
//$context = xpath_new_context($dom);
//$context = $dom->xpath_new_context($xml);
$context = $dom->xpath_new_context();

//Получим корневой объект
//$root = $dom->document_element();

// get the list of the nodes
//$nodes = $root->child_nodes();

// Create an XPath query.
// Note: you must define the namespace if the XML document has defined namespaces.
$xpath = new DOMXPath($dom);

//Создадим переменную, которая будет хранить команды XPath
//Выбирает все узлы под корневым (выбирает все узлы)
$query = "//*"; 
$nodeList = $xpath->query($query);

echo "start";
// xpath_eval —  Evaluates the XPath Location Path in the given string 
if ($path = xpath_eval($context,$query))
  {
	$tmpArray = $path->nodeset;
	while (list() = each($tmpArray)) 
	 {
		$i++;
		echo("<tr><td>");
		echo($tmpArray[$i]->name);
		echo($tmpArray[$i]);
		echo("</td><td>");
		echo( $tmpArray[$i] ->content ) ;
		echo("</td></tr>\n");
	 }
  }
else 
  {
    echo( "expression: $expr, is invalid\n");
  }

echo "end";
?>

</table>
</body>
</html>
