<?
// *****************************************
// start Element
// *****************************************
function startElement($parser, $name, $attrs) 
  {
    global $map_array;

    $num=xml_get_current_line_number ($parser);
    echo "<br>".$num."  <b>".$name."</b>";

    if ($htmltag = $map_array[$name])
      {
        print "<$htmltag>";
      }
  }

// *****************************************
// end Element
// *****************************************
function endElement($parser, $name) 
  {
    global $map_array;

    $num=xml_get_current_line_number ($parser);
    echo "<b>".$name."</b><br>";

    if ($htmltag = $map_array[$name]) 
      {
        print "</$htmltag>";
      }
   }

function characterData($parser, $data) {
    print $data;
}

// *****************************************

$file = "news.xml";
if (!($fp = fopen($file, "r"))) 
  {
    die("could not open XML input");
  }

// create an XML parser
$xml_parser = xml_parser_create();

// set options in an XML parser
xml_parser_set_option ($xml_parser, XML_OPTION_CASE_FOLDING, true);

// set up start and end element handlers
xml_set_element_handler ($xml_parser, "startElement", "endElement");

// set up character data handler
xml_set_character_data_handler ($xml_parser, "characterData");

while ($data = fread($fp, 4096)) 
{

    if (!xml_parse ($xml_parser, $data, feof($fp)) ) 
      {
        die (sprintf ("XML error: %s at line %d", xml_error_string (xml_get_error_code ($xml_parser) ), xml_get_current_line_number ($xml_parser)));
      }
}

xml_parser_free($xml_parser);

?>