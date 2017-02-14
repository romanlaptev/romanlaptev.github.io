<?
//****************************
// MAIN
//****************************
$xml_file = "video.xml";
$html_page = "films.html";

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
if (!$file_out = fopen($html_page, 'w'))
  {
 	print "Cannot open file ($html_page)";
 	exit;
  }
//--------------------------------------------------------------

$result = $xml->xpath('//film'); 
$num_films =  sizeof($result);
//echo "<pre>";
//print_r ($result);
//echo "</pre>";

$charset = "utf-8";
//$charset = "windows-1251";

$page_content_p1 = "
<html><head>
<title> все фильмы, описания </title>
<meta http-equiv=Content-Type content=text/html; charset=$charset>
<link type=\"text/css\" rel=\"stylesheet\" href=\"style.css\"/>
</head>
<body>
<li><a href=\"films.html\"> все фильмы, описания </a>
<li><a href=\"filesharing_films.html\"> выборка фильмов, закачанных на файлообменники </a>
<li><a href=\"videoclips.html\"> выборка видеоклипов </a>
<hr>";

//fwrite($file_out, "<html><head>\n");
//fwrite($file_out, "<title> все фильмы, описания </title>\n");
//fwrite($file_out, "<meta http-equiv=Content-Type content=text/html; charset=$charset>\n");
//fwrite($file_out, "<link type=\"text/css\" rel=\"stylesheet\" href=\"style.css\"/>\n");
//fwrite($file_out, "</head>\n");
//fwrite($file_out, "<body>\n");

//fwrite($file_out, "<li><a href=\"films.html\"> все фильмы, описания </a>");
//fwrite($file_out, "<li><a href=\"filesharing_films.html\"> выборка фильмов, закачанных на файлообменники </a>");
//fwrite($file_out, "<li><a href=\"videoclips.html\"> выборка видеоклипов </a>");
//fwrite($file_out, "<hr>");

fwrite($file_out, $page_content_p1);


fwrite($file_out, "Number of film elements: $num_films<br>\n");

for ($n1=0; $n1< $num_films; $n1++)
  {
	if (strlen($result[$n1]['title']) > 0) // обработка, если есть названия фильма
	  {
		fwrite($file_out, "<div class=\"title\">$n1.");
		$name_film_rus =  $result[$n1]['title'];
		$name_film_eng = $result[$n1]['eng'];
		fwrite($file_out, "<h3>$name_film_rus</h3>$name_film_eng");
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"about\">");
		fwrite($file_out, "<b><i>Жанр: </i></b>");
		fwrite($file_out,  $result[$n1]->genre);
		fwrite($file_out, "<br>\n");

		fwrite($file_out, "<b><i>Создатели: </i></b>");
		fwrite($file_out, $result[$n1]->producer);
		fwrite($file_out, "<br>\n");

		fwrite($file_out, "<b><i>В ролях:  </i></b>");
		fwrite($file_out, $result[$n1]->roles);
		fwrite($file_out, "<br>\n");
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"description\">");
		fwrite($file_out, $result[$n1]->description);
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"location\">");

		fwrite($file_out, "<b><i>Размер: </i></b>");
		fwrite($file_out, $result[$n1]->filesize);
		fwrite($file_out, "<br>\n");

		fwrite($file_out, "<b><i>Ссылка для локальной сети: </i></b>");
		$links = $result[$n1]->location;
		$n3 = sizeof ($links->a);
		for ($n2=0; $n2 < $n3; $n2++)
		   {
			fwrite($file_out, "<a href=\"");
			fwrite($file_out, $links->a[$n2]['href']);
			fwrite($file_out, "\"> ");
			fwrite($file_out, $links->a[$n2]);
			fwrite($file_out, "</a><br/>");
		   }

		fwrite($file_out, "<b><i>Ссылка для скачивания с файлообменников: </i></b>");
		$links = $result[$n1]->filesharing;
		$n3 = sizeof ($links->a);
		for ($n2=0; $n2 < $n3; $n2++)
		   {
			fwrite($file_out, "<a href=\"");
			fwrite($file_out, $links->a[$n2]['href']);
			fwrite($file_out, "\"> ");
			fwrite($file_out, $links->a[$n2]);
			fwrite($file_out, "</a><br/>");
		   }
		fwrite($file_out, "</div>\n");
	  }//---------------- end if
  }//-------------------- end for
//--------------------------------------------------------------
    
print "Success, wrote to file $html_page";
fclose($file_out);

//$str1 = "Жанр: Комедия";
//$str2 = iconv("UTF-8", "windows-1251", $str1);
//print $str2;

//echo iconv("UTF-8", "windows-1251", $result[1]->description);

//readfile ($html_page);
?>

