<html>
<head>
<title>DOM Travel Packages</title>
</head>

<body>
<h1>Travel Packages</h1>
<table>

<?php
	$doc = domxml_open_file( "./travel.xml");
	$context = xpath_new_context($doc);
	$root = $doc->document_element();
	$���� = "//*";

if ($path = xpath_eval($context,$expr))
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
/*
*/
	 }
  }
else 
  {
    echo( "expression: $expr, is invalid\n");
  }
?>

</table>
</body>
</html>
