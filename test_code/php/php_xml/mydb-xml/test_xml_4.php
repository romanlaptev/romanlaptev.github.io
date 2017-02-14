<?

//$simple = "<para><note>simple note</note></para>";

$simple = file_get_contents("news.xml");
//print_r ($simple);

// create an XML parser
$xml_parser = xml_parser_create();
xml_parse_into_struct($xml_parser, $simple, $vals, $index);

xml_parser_free($xml_parser);

echo "Index array\n";
print_r($index);
echo "<hr>";

print_r($vals);

echo "<hr>";
echo sizeof($vals);

echo "tag =    ".$vals[0][tag]."<br>";
echo "type =   ".$vals[0][type]."<br>";
echo "level =  ".$vals[0][level]."<br>";
echo "value =  ".$vals[0][value]."<br>";
echo "<hr>";

echo "tag =    ".$vals[1][tag]."<br>";
echo "type =   ".$vals[1][type]."<br>";
echo "level =  ".$vals[1][level]."<br>";
echo "value =  ".$vals[1][value]."<br>";
echo "<hr>";

?>