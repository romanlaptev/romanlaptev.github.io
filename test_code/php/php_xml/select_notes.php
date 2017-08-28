<?
//*************************************
// Вывести на страницу разделы закладок
//*************************************
function view_xml ($xml)
  {
	echo "<div>\n";
	for ($n1=0; $n1 < sizeof($xml->notes->section); $n1++)
		{
			//echo $n1."<br>\n";
			//--------------------
			echo "<a href=javascript:processnode(\"section_".$n1."\")>";
			echo "<span>\n";
			echo $xml->notes->section[$n1]['title'];
			echo "</span></a>\n";

//-----------------------------------------------------------------
			echo "<div style='display:none' class=\"section\" id=section_".$n1.">\n";
			echo "<p>\n";
echo "<a href=\"".basename($_SERVER['SCRIPT_NAME'])."?action=edit&section_name=".$xml->notes->section[$n1]['keyword']."\"> edit</a>\n";
			echo "<a href=\"#\" onClick=\"javascript:document.getElementById('section_".$n1."').style.display = 'none'\"> x</a>\n";
			echo "</p>\n";

			for ($n2=0; $n2 < sizeof($xml->notes->section[$n1]->note); $n2++)
				{
					echo $n2.".";
					echo "<pre>";
					//echo $xml->notes->section[$n1]->note[$n2]."<br/>\n";
					echo $xml->notes->section[$n1]->note[$n2]->h3."<br/>\n";
					echo $xml->notes->section[$n1]->note[$n2]->a['href']."<br/>\n";
					echo $xml->notes->section[$n1]->note[$n2]->a."<br/>\n";
					echo $xml->notes->section[$n1]->note[$n2]->pre."<br/>\n";
					echo $xml->notes->section[$n1]->note[$n2]."<br/>\n";

					echo "</pre>";
				} //--------------------------- end for

			echo "</div>\n";

		} //--------------------------- end for
	echo "</div>\n";

  }
//-----------------------------------------------------end func


//****************************
// MAIN
//****************************
//echo "<pre>";
//print_r ($_REQUEST);
//print_r ($_POST);
//print_r ($_SERVER);
//echo "</pre>";

$charset = "utf-8";
$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<style>
a
{
	text-decoration:none;
	font-size:10pt;
}
p
{
	text-align:right;
	margin-top:0;
	margin-right: 15px;
	padding-bottom:10px;
}
span
{
	background:#9999CC;
	border: 2px outset blue;
	display: block;
	float: left;
	height: 50px;
	width: 145px;
	margin:2px;
	text-align:center;
	word-wrap: break-word;
}
div.section
{
	background:palegreen;
	border:7px outset green;
	position: absolute;
	top: 20px;
	left: 20px;
	padding-top:2px;
	padding-bottom: 10px;
    padding-left: 20px;
    margin-right: 15px;
}

div.section_edit
{
	background:bisque;
	border:7px outset maroon;
	position: absolute;
	top: 25px;
	left: 25px;
	padding-top:2px;
	padding-bottom: 10px;
    padding-left: 20px;
    margin-right: 15px;
}
</style>

<script>
function change_text(name,text)
{
	// добавить измененный текст в список переменых для POST-отправки
	document.form_post_values.innerHTML = 
document.form_post_values.innerHTML + \"<input type='hidden' name='\"+name+\"' value='\"+text+\"'>\";
}
//---------------------- end func

function init_section_name(section_name)
{
	document.form_post_values.innerHTML = 
document.form_post_values.innerHTML + \"<input type='text' name='section_name' value='\"+section_name+\"'>\";

}
//---------------------- end func

function processnode(nnodeid)
{
	if (document.getElementById(nnodeid).style.display == \"none\")
	  {
		document.getElementById(nnodeid).style.display = \"\"
	  }
	else
	 {
		document.getElementById(nnodeid).style.display = \"none\"
	 }
}
//---------------------- end func

</script>
</head>\n<body>\n";
$tpl_p2 = "</body>\n</html>\n";

echo $tpl_p1;

//$xml_file = "http://rlaptev.co.cc/www/xml/menu.xml";
$xml_file = "mydb2.xml";

//-----------------------------------------------------
// Считать из XML-файла данные 
//-----------------------------------------------------
$xml = simplexml_load_file($xml_file);
if ($xml == FALSE) 
  {
	exit("Failed to open ".$xml_file);
  }
else
  {
  //echo "Use SimpleXML for read data from ".$xml_file."<br>\n"; 
	view_xml ($xml); // Вывести на страницу раздел  notes
  }

//$notes =  $xml->notes; 
//echo "<pre>";
//print_r ($xml);
//print_r ($notes);
//echo "</pre>";

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

echo $tpl_p2;

?>

