<?
//*************************************
// Вывести на страницу форму редактирования menu2
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
	  echo "Use SimpleXML for read data from ".$xml_file."<br>\n"; 

	//$result = $xml->xpath('//main/menu'); 
	$menu2 =  $xml->menu[1]; // считать menu2

	echo "<br>\n";
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
  }
//-----------------------------------------------------end func
 

//****************************
// MAIN
//****************************
//echo "<pre>";
//print_r ($_REQUEST);
//print_r ($_POST);
//echo "</pre>";

//$xml_file = "http://rlaptev.co.cc/www/xml/menu.xml";
$xml_file = "menu.xml";
$charset = "utf-8";
$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
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
</script>
</head>\n<body>\n";
$tpl_p2 = "</body>\n</html>\n";
echo $tpl_p1;

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

view_xml ($xml_file); // Вывести на страницу форму редактирования menu2

echo $tpl_p2;

?>

