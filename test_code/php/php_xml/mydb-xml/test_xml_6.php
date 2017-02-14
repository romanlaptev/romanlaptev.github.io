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

$data = file_get_contents("news.xml");
//print ($data);

$xml_parser = xml_parser_create(); // create an XML parser
xml_parser_set_option ($xml_parser, XML_OPTION_CASE_FOLDING, true); // set options in an XML parser
xml_set_element_handler ($xml_parser, "startElement", "endElement"); // set up start and end element handlers
//xml_set_character_data_handler ($xml_parser, "characterData");// set up character data handler

xml_parse ($xml_parser, $data) ;

xml_parser_free($xml_parser);
?>