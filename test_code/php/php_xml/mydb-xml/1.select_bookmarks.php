<?
//*************************************
// Вывести на страницу разделы закладок
//*************************************
function view_xml ($xml)
  {
	echo "<div>\n";
	for ($n1=0; $n1 < sizeof($xml->bookmarks->section); $n1++)
		{
			//echo $n1."<br>\n";
			//--------------------
			echo "<a href=javascript:processnode(\"section_".$n1."\")>";
			echo "<span>\n";
			echo $xml->bookmarks->section[$n1]['title'];
			echo "</span></a>\n";

//-----------------------------------------------------------------
			echo "<div style='display:none' class=\"section\" id=section_".$n1.">\n";
			echo "<p>\n";
			echo "<a href=\"#\" onClick=\"javascript:document.getElementById('section_".$n1."_edit').style.display = ''\"> edit</a>\n";
			echo "<a href=\"#\" onClick=\"javascript:document.getElementById('section_".$n1."').style.display = 'none'\"> x</a>\n";
			echo "</p>\n";

			for ($n2=0; $n2 < sizeof($xml->bookmarks->section[$n1]->a); $n2++)
				{
					echo $n2.".";
					echo "<a href=\"".$xml->bookmarks->section[$n1]->a[$n2]['href']."\" target=_blank>";
					echo $xml->bookmarks->section[$n1]->a[$n2]."</a><br/>\n";
				} //--------------------------- end for

			echo "</div>\n";

		} //--------------------------- end for
	echo "</div>\n";

  }
//-----------------------------------------------------end func

//*************************************
// Вывести в скрытый div форму редактирования
//*************************************
function edit_xml ($xml)
  {
	echo "<div>\n";
	for ($n1=0; $n1 < sizeof($xml->bookmarks->section); $n1++)
		{
			//echo $n1."<br>\n";
			//--------------------

			echo "<div style='display:none' class=\"section_edit\" id=section_".$n1."_edit>\n";
			echo "<p>\n";
			echo "<a href=\"#\" onClick=\"javascript:document.getElementById('section_".$n1."_edit').style.display = 'none'\"> x</a>\n";
			echo "</p>\n";

			echo "<form method=\"post\" name=\"form_edit_xml_".$n1."\" action=\"".basename($_SERVER['SCRIPT_NAME'])."\">\n";
			echo "<fieldset>\n";
			echo "<legend> Редактирование ".$xml->bookmarks->section[$n1]['title']."</legend>\n";
			echo "<input type='button' name='remove_bookmark' value='remove bookmark' onClick='javascript:add_elm();'>";
			echo "<input type='button' name='insert_bookmark' value='insert bookmark'>";
			echo "<table>\n";
			echo "<tr>\n";
			echo "<td> link		</td>\n";
			//echo "<td>target	</td>\n";
			echo "<td>text		</td>\n";
			echo "<td>check	</td>\n";
			echo "</tr>\n";

			for ($n2=0; $n2 < sizeof($xml->bookmarks->section[$n1]->a); $n2++)
				{
					echo "<tr>\n";

					echo "<td>\n";
					$name=$xml->bookmarks->section[$n1]['keyword']."_href[$n2]";
					$href=$xml->bookmarks->section[$n1]->a[$n2]['href'];
echo "<input type=\"text\" value=\"".$href."\" name=\"$name\" onChange=\"javascript:change_text('$name');this.style.color = 'red';\">\n";
					echo "</td>\n";

					echo "<td>\n";
					$name=$xml->bookmarks->section[$n1]['keyword']."_text[$n2]";
					$value=$xml->bookmarks->section[$n1]->a[$n2];
echo "<input type=\"text\" value=\"".$value."\" name=\"$name\" onChange=\"javascript:change_text('$name');this.style.color = 'red';\">\n";
					echo "</td>\n";

					echo "<td>\n";
					echo "<input type='checkbox' value='' name=\"".$xml->bookmarks->section[$n1]['keyword']."_check[$n2]\">\n";
					echo "</td>\n";

					echo "</tr>\n";

				} //--------------------------- end for

			echo "</table>\n";

			echo "<input type=\"hidden\" name=section_name value=\"".$xml->bookmarks->section[$n1]['keyword']."\">";
			echo "<input type=\"submit\" name=action value=\"save changes\">";
			echo "</fieldset>";
			echo "</form>\n";
			echo "</div>\n";
//-----------------------------------------------------------------

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
function change_text(name)
{
	//alert ('Change text!'+name);
	//document.getElementById('+name+').style.color = 'red';
	//var frm = document.form_edit_xml_0;
	//frm.elements[name].style.color='red';
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
function add_elm ()
{
	alert ('add elm');
	document.form_edit_xml_0.innerHTML = document.form_edit_xml_0.innerHTML + \"<input type='button' name='arr_id' value='test'>\";
}
</script>
</head>\n<body>\n";
$tpl_p2 = "</body>\n</html>\n";

echo $tpl_p1;

//$xml_file = "http://rlaptev.co.cc/www/xml/menu.xml";
$xml_file = "mydb.xml";

//$bookmarks =  $xml->bookmarks; 
//echo "<pre>";
//print_r ($xml);
//print_r ($bookmarks);
//echo "</pre>";

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
	view_xml ($xml); // Вывести на страницу раздел bookmarks
	edit_xml ($xml); // Вывести в скрытый div форму редактирования
  }


if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

//*******************************************************************
// Записать изменения в XML-документ
//*******************************************************************
if  ($action == "save changes")
   {
echo "<pre>";
//print_r ($_REQUEST);
print_r ($_POST);
//print_r ($_SERVER);
echo "</pre>";

	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) 
	  {
		exit("Failed to open ".$xml_file);
	  }
	else
	  echo "Use SimpleXML for write data in ".$xml_file."<br>\n"; 

	if (isset($_REQUEST['section_name']))
	  {
		$section_name=$_REQUEST['section_name']; 
	  }
	else
		exit("<font color='red'>Error. section_name undefined</font>");

// Найти в разделах закладок, редактируемый раздел 
	for ($n1=0; $n1 < sizeof($xml->bookmarks->section); $n1++)
		{
			if ($section_name == $xml->bookmarks->section[$n1]['keyword'])
			  {
				echo "Edit ".$xml->bookmarks->section[$n1]['keyword'];
			  }
		} //--------------------------- end for
/*
	$menu2 =  $xml->menu[1]; // считать menu2
	//--------------------
	for ($n1=0; $n1 < sizeof($menu2); $n1++)
		{

			$xml->menu[1]->item[$n1]->a['href']=$_POST['href'][$n1];
			$xml->menu[1]->item[$n1]->a['target']=$_POST['target'][$n1];
			$xml->menu[1]->item[$n1]->a=$_POST['text'][$n1];

			if (strlen($_POST['status_box'][$n1]) == 0) // снята отметка с checkbox 
			  {
				$xml->menu[1]->item[$n1]['status']='off';
			  }
			else
				$xml->menu[1]->item[$n1]['status']=$_POST['status_box'][$n1];

			//echo $xml->menu[1]->item[$n1]->a['href']."  ";
			//echo $xml->menu[1]->item[$n1]->a['target']."  ";
			//echo $xml->menu[1]->item[$n1]->a."  ";
			//echo $xml->menu[1]->item[$n1]['status']."<hr>";
		} //--------------------------- end for

	copy ($xml_file, $xml_file.'.bak');  // создать резервную копию
	$xml->asXML($xml_file);
*/
   }
// -------------------- end action

//if  ($action == "edit")
//   {
	//edit_xml ($xml_file); // Вывести на страницу форму редактирования menu2
//   }
// -------------------- end action

echo $tpl_p2;

?>

