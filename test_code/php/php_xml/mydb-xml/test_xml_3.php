<?

$map_array = array(
    "BOLD"     => "B",
    "EMPHASIS" => "I",
    "LITERAL"  => "TT"
);

// *****************************************
function startElement_1($parser, $name, $attrs) {
    global $depth;
    for ($i = 0; $i < $depth[$parser]; $i++) {
        print "  ";
    }
    print "$name\n";
    $depth[$parser]++;
}

function endElement_1($parser, $name) {
    global $depth;
    $depth[$parser]--;
}

// *****************************************

function startElement_2($parser, $name, $attrs) {
    global $map_array;

echo "<br>startElement";

    if ($htmltag = $map_array[$name]) {
        print "<$htmltag>";
    }
}

function endElement_2($parser, $name) {
    global $map_array;

echo "endElement<br>";

    if ($htmltag = $map_array[$name]) {
        print "</$htmltag>";
    }
}

function characterData($parser, $data) {
    print $data;
}

// *****************************************

// create an XML parser
$xml_parser = xml_parser_create();

// set up start and end element handlers
xml_set_element_handler ($xml_parser, "startElement_1", "endElement_1");

$file = "news.xml";
if (!($fp = fopen($file, "r"))) 
  {
    die("could not open XML input");
  }


while ($data = fread($fp, 4096)) 
  {

// start parsing an XML document
    if (!xml_parse ($xml_parser, $data, feof($fp))) 
      {
        die (sprintf ("XML error: %s at line %d", xml_error_string(xml_get_error_code($xml_parser)), xml_get_current_line_number($xml_parser)));
     }

  }
xml_parser_free($xml_parser);

// *****************************************

$xml_parser = xml_parser_create();

// use case-folding so we are sure to find the tag in $map_array

// set options in an XML parser
xml_parser_set_option ($xml_parser, XML_OPTION_CASE_FOLDING, true);

// set up start and end element handlers
xml_set_element_handler ($xml_parser, "startElement_2", "endElement_2");

// set up character data handler
xml_set_character_data_handler ($xml_parser, "characterData");

if (!($fp = fopen($file, "r"))) 
  {
    die("could not open XML input");
  }

while ($data = fread($fp, 4096)) 
{
    if (!xml_parse ($xml_parser, $data, feof($fp)) ) 
      {
        die (sprintf ("XML error: %s at line %d", xml_error_string (xml_get_error_code ($xml_parser) ), xml_get_current_line_number ($xml_parser)));
      }
}
xml_parser_free($xml_parser);

?>