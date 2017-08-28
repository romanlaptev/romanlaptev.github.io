<?
//*************************************
// Вывести на страницу menu2
//*************************************
function view_xml ($xml_file)
  {
	//-----------------------------------------------------
	// Считать из XML-файла данные 
	//-----------------------------------------------------
	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) 
	  {
		exit("Failed to open ".$xml_file);
	  }
	else
	  //echo "Use SimpleXML for read data from ".$xml_file."<br>\n"; 

	$menu2 =  $xml->menu[1]; // считать menu2

	//echo "<p><a href=\"".basename($_SERVER['SCRIPT_NAME'])."?action=edit\">edit</a></p>\n";
	echo "<p><a href=\"#\" onClick=\"javascript:document.getElementById('div_edit_xml').style.display = ''\"> edit</a></p>\n";
	echo "<div class=\"menu2\">\n";
	//--------------------
	for ($n1=0; $n1 < sizeof($menu2); $n1++)
		{
			echo "<p><a href=\"".$menu2->item[$n1]->a['href']."\" target=\"".$menu2->item[$n1]->a['target']."\">".$menu2->item[$n1]->a."</a></p>\n";
		} //--------------------------- end for
	echo "</div>\n";
  }
//-----------------------------------------------------end func

//*************************************
// Вывести на страницу форму редактирования menu2
//*************************************
function edit_xml ($xml_file)
  {
	//-----------------------------------------------------
	// Считать из XML-файла данные 
	//-----------------------------------------------------
	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) 
	  {
		exit("Failed to open ".$xml_file);
	  }
	else
	  //echo "Use SimpleXML for read data from ".$xml_file."<br>\n"; 

	//$result = $xml->xpath('//main/menu'); 
	$menu2 =  $xml->menu[1]; // считать menu2

	echo "<div style='display:visible' class=\"edit_xml\" id='div_edit_xml'>\n";
	echo "<br>\n";
	echo "<p><a href=\"#\" onClick=\"javascript:document.getElementById('div_edit_xml').style.display = 'none'\"> x</a></p>\n";
	echo "<form method=\"post\" name=\"form_edit_xml\" action=\"".basename($_SERVER['SCRIPT_NAME'])."\">\n";
	echo "<fieldset>\n";
	echo "<legend> Редактирование меню (XML) ".$xml[1]['title']."</legend>\n";

	echo "<table>\n";
	echo "<tr>\n";
	echo "<td> link		</td>\n";
	echo "<td>target	</td>\n";
	echo "<td>text		</td>\n";
	echo "<td>status	</td>\n";
	echo "</tr>\n";
	//--------------------
	for ($n1=0; $n1 < sizeof($menu2); $n1++)
		{
			echo "<tr>\n";

			echo "<td>\n";
			echo "<input type=\"text\" value=\"".$menu2->item[$n1]->a['href']."\" name=\"href[$n1]\">\n";
			echo "</td>\n";

			echo "<td>\n";
			echo "<input type=\"text\" value=\"".$menu2->item[$n1]->a['target']."\" name=\"target[$n1]\">\n";
			echo "</td>\n";

			echo "<td>\n";
			echo "<input type=\"text\" value=\"".$menu2->item[$n1]->a."\" name=\"text[$n1]\">\n";
			echo "</td>\n";

			echo "<td>\n";
			$status = $menu2->item[$n1]['status'];
			if ($status == 'on')
			  {
				echo "<input type=\"checkbox\" value=\"".$status."\" name=\"status_box[$n1]\" checked onClick=\"change_status($n1);\">\n";
				//echo "<input type=\"text\" value=\"".$status."\" name=\"status_text[$n1]\" size=\"2\">\n";
			  }
			else
			  {
				echo "<input type=\"checkbox\" value=\"".$status."\" name=\"status_box[$n1]\" onClick=\"change_status($n1);\">\n";
				//echo "<input type=\"text\" value=\"".$status."\" name=\"status_text[$n1]\" size=\"2\">\n";
			  }

			echo "</td>\n";

			echo "</tr>\n";
		} //--------------------------- end for

	echo "</table>\n";

	echo "<input type=\"submit\" name=action value=\"save changes\">";
	echo "</fieldset>";
	echo "</form>\n";
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

//$xml_file = "http://rlaptev.co.cc/www/xml/menu.xml";
$xml_file = "menu.xml";
$charset = "utf-8";
$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<style>

.menu1
{
	margin:10px;
	padding:10px;

	background:#072F07;
	color:white;

	border-style:double;
	border-color: green;
	border-top-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 3px;
	border-left-width: 0px;
}

.menu2
{
	float:left;
	border:5px double green;
	background: wheat; 		
	color: white;
	width: 150px;
	padding-top:1px;
	padding-bottom:1px;
}

.menu2 p
{
	width:120px;
	height: 45px;
	margin-left: auto;
	margin-right: auto;
	/*padding-left: 5px;*/

	font-style: normal;
	font-family: Verdana, Arial, Helvetica, sans-serif;
	text-decoration: none;
	color: white;

	background: darkgreen; 		

	border-right: #000000 1px solid;
	border-top: #ffffff 1px solid;
	border-left: #ffffff 1px solid;
	border-bottom: #000000 1px solid;

	text-align: center;
	/*vertical-align:middle;*/
}

A:link 
{
    color:orange;
}

A:visited 
{
    color:orange;
}

A:hover 
{
    color:orange;
}
</style>

<script>
function change_status(num)
{
	//alert (num);
	var frm = document.form_edit_xml;

	var st_box = 'status_box['+num+']';
	if (frm.elements[st_box].value == 'off')
	  {
		//alert ('checked');
		frm.elements[st_box].value='on';

		//var elmnt = 'status_text['+num+']';
		//frm.elements[elmnt].value='on';
	  }
	else
	  {
		//alert ('unchecked');
		frm.elements[st_box].value='off';

		//var elmnt = 'status_text['+num+']';
		//frm.elements[elmnt].value='off';
	  }
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

view_xml ($xml_file); // Вывести на страницу menu2
edit_xml ($xml_file); // Вывести на страницу форму редактирования menu2

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

//*******************************************************************
// Записать изменения в XML-документ
//*******************************************************************
if  ($action == "save changes")
   {
	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) 
	  {
		exit("Failed to open ".$xml_file);
	  }
	else
	  echo "Use SimpleXML for write data in ".$xml_file."<br>\n"; 

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
   }
// -------------------- end action

//if  ($action == "edit")
//   {
	//edit_xml ($xml_file); // Вывести на страницу форму редактирования menu2
//   }
// -------------------- end action

echo $tpl_p2;

?>

