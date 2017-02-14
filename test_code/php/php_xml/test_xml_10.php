<?
 $filename = "test_video.xml";

// создаем новый объект XML
//$dom = domxml_open_file($filename); 
//  создаем новый контекст, чтобы с помощью XPath ссылаться на узлы в дереве DOM
//$context = xpath_new_context($dom);
//Получим корневой объект
//$root = $dom->document_element();

// заполняем объект Snodes дочерними узлами корневого
//$nodes = $root->child_nodes();

//Создадим переменную $ехрг, которая будет хранить команды XPath
//Выбирает все узлы под корневым (выбирает все узлы)
//$ехрг = "//*"; 

echo "<table>";
echo "<tr><td>";
echo "w" ;
echo "</td></tr>";
/*
if ($path = xpath_eval($context,$expr))
  {
	$tmpArray = $path->nodeset;
	while (list() = each($tmpArray)) 
	   {
		$n1++;
		echo("<tr><td>");
                echo($tmpArray[$n1]->name);
                echo("</td><td>");
                echo( $tmpArray[$n1] ->content ) ;
                echo("</td></tr>\n");
	 } 
else 
  {
	echo( "expression: $expr, is invalid\n");
  }
*/
echo "</table>";

?>
