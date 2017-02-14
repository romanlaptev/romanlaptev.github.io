<?
function test1()
{
	global $template;
	global $num_films;
	global $array1;

	$charset = "<meta http-equiv=Content-Type content=text/html; charset=utf-8>";
	// разбить код шаблона на строки, разделенные началом комментария
	$array1 = split ("<!-- -->", $template);
	echo "<pre>";
	print_r ($array1);
	echo "</pre>";

	// разбить подстроку шаблона на строки, разделенные концом комментария
	$array2 = split ("-->", $array1[1]);

	// ПЕЧАТЬ заголовка страницы в соответствии с шаблоном
	echo $array1[0];
	echo $charset;
	echo $array2[1];

	// Вставить в код страницы NUM_FILMS
	echo $num_films;
	//------------------------------------------------------

	$array2 = split ("-->", $array1[2]);
	echo $array2[1];
	//------------------------------------------------------

}//-------------------- end func

//****************************
// MAIN
//****************************
$xml_file = "video.xml";
$html_page = "films.html";
$html_template = "template_films.html";

//-----------------------------------------------------
// Считать из файла-шаблона, данные о разметке
//-----------------------------------------------------
$template_file=fopen($html_template,"r");
$template = fread ($template_file, filesize($html_template));
fclose($template_file);

//-----------------------------------------------------
// Считать из XML-файла данные 
//-----------------------------------------------------
if (file_exists($xml_file)) 
  {
	$xml = simplexml_load_file($xml_file);
//	echo "<pre>";
//	print_r($xml);
//	echo "</pre>";
  } 
else 
  {
	exit("Failed to open ".$xml_file);
  }

//--------------------------------------------------------------
// Открыть файл для записи сформированной HTML-страницы
//--------------------------------------------------------------
//if (!$file_out = fopen($html_page, 'w'))
//  {
// 	print "Cannot open file ($html_page)";
// 	exit;
//  }
//--------------------------------------------------------------

$result = $xml->xpath('//film'); 
$num_films =  sizeof($result);
//echo "<pre>";
//print_r ($result);
//echo "</pre>";

// Вывод шаблона
test1();

for ($n1=0; $n1< $num_films; $n1++)
  {
	if (strlen($result[$n1]['title']) > 0) // обработка, если есть названия фильма
	  {

		$array2 = split ("-->", $array1[3]);
		echo $n1;
		echo $array2[1];
		//------------------------------------------------------

		$array2 = split ("-->", $array1[4]);
		echo $array2[1];
		//------------------------------------------------------

		$name_film =  $n1.". ".$result[$n1]['title'].",  ".$result[$n1]['eng'];
//		fwrite($file_out, $name_film);
//		fwrite($file_out,"<br>");

//		fwrite($file_out, $result[$n1]->producer);
//		fwrite($file_out,"<br>");

//		fwrite($file_out, $result[$n1]->roles);
//		fwrite($file_out,"<br>");

//		fwrite($file_out, $result[$n1]->genre);
//		fwrite($file_out,"<br>");

//		fwrite($file_out, $result[$n1]->description);
//		fwrite($file_out,"<br>");

//		fwrite($file_out, $result[$n1]->filesize);
//		fwrite($file_out,"<br>");

//		$links = $result[$n1]->location;
//		$n3 = sizeof ($links->a);
//		for ($n2=0; $n2 < $n3; $n2++)
//		   {
//			fwrite($file_out, ".<a href=\"");
//			fwrite($file_out, $links->a[$n2]['href']);
//			fwrite($file_out, "\"> ");
//			fwrite($file_out, $links->a[$n2]);
//			fwrite($file_out, "<a><br/>");
//		   }

//		$links = $result[$n1]->filesharing;
//		$n3 = sizeof ($links->a);
//		for ($n2=0; $n2 < $n3; $n2++)
//		   {
//			fwrite($file_out, ".<a href=\"");
//			fwrite($file_out, $links->a[$n2]['href']);
//			fwrite($file_out, "\"> ");
//			fwrite($file_out, $links->a[$n2]);
//			fwrite($file_out, "<a><br/>");
//		   }
//		fwrite($file_out,"<hr>");
	  }//---------------- end if
  }//-------------------- end for
//--------------------------------------------------------------
    
//print "Success, wrote to file $html_page";
//fclose($file_out);

//readfile ($html_page);
?>

