<?
//***************************************************************
// Формирование HTML-страницы с данными о фильмах
// кодировка полученной страницы UTF8
//***************************************************************
function create_html_page_utf8($page_content_p1)
{
	global $html_page;
	global $charset;
	global $result;
	global $num_films;
	global $label_genre;
	global $label_producer;
	global $label_roles;
	global $label_filesize;
	global $label_links_text_local;
	global $label_links_text_filesharing;

//--------------------------------------------------------------
// Открыть файл для записи сформированной HTML-страницы
//--------------------------------------------------------------
if (!$file_out = fopen($html_page, 'w'))
  {
 	print "Cannot open file ($html_page)";
 	exit;
  }
//--------------------------------------------------------------
fwrite($file_out, $page_content_p1);

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
//		fwrite($file_out, "<b><i>Жанр: </i></b>");
		fwrite($file_out, $label_genre);
		fwrite($file_out,  $result[$n1]->genre);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, "<b><i>Создатели: </i></b>");
		fwrite($file_out, $label_producer);
		fwrite($file_out, $result[$n1]->producer);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, "<b><i>В ролях:  </i></b>");
		fwrite($file_out, $label_roles);
		fwrite($file_out, $result[$n1]->roles);
		fwrite($file_out, "<br>\n");
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"description\">");
		fwrite($file_out, $result[$n1]->description);
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"location\">");

//		fwrite($file_out, "<b><i>Размер: </i></b>");
		fwrite($file_out, $label_filesize);
		fwrite($file_out, $result[$n1]->filesize);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, "<b><i>Ссылка для локальной сети: </i></b>");
		fwrite($file_out, $label_links_text_local);
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

//		fwrite($file_out, "<b><i>Ссылка для скачивания с файлообменников: </i></b>");
		fwrite($file_out, $label_links_text_filesharing);
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

$page_content_end = "</body></html>";
fwrite($file_out, $page_content_end);
    
print "Success, wrote to file $html_page";
fclose($file_out);

}//----------------------------------- end func

//***************************************************************
// Формирование HTML-страницы с данными о фильмах
// кодировка полученной страницы windows-1251
//***************************************************************
function create_html_page_win($page_content_p1)
{
	global $html_page;
	global $charset;
	global $result;
	global $num_films;
	global $label_genre;
	global $label_producer;
	global $label_roles;
	global $label_filesize;
	global $label_links_text_local;
	global $label_links_text_filesharing;
//--------------------------------------------------------------
// Открыть файл для записи сформированной HTML-страницы
//--------------------------------------------------------------
if (!$file_out = fopen($html_page, 'w'))
  {
 	print "Cannot open file ($html_page)";
 	exit;
  }
//--------------------------------------------------------------

//$str1 = "Жанр: Комедия";
//$str2 = iconv("UTF-8", "windows-1251", $str1);
//print $str2;

//echo iconv("UTF-8", "windows-1251", $result[1]->description);

fwrite($file_out, $page_content_p1);

for ($n1=0; $n1< $num_films; $n1++)
  {
	if (strlen($result[$n1]['title']) > 0) // обработка, если есть названия фильма
	  {
		fwrite($file_out, "<div class=\"title\">$n1.");
		$name_film_rus =  iconv("UTF-8", "windows-1251",$result[$n1]['title']);
		$name_film_eng = $result[$n1]['eng'];
		fwrite($file_out, "<h3>$name_film_rus</h3>$name_film_eng");
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"about\">");

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>Жанр: </i></b>"));
		fwrite($file_out, $label_genre);

		$genre = iconv("UTF-8", "windows-1251",$result[$n1]->genre);
		fwrite($file_out,  $genre);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>Создатели: </i></b>"));
		fwrite($file_out, $label_producer);

		$producer = iconv("UTF-8", "windows-1251",$result[$n1]->producer);
		fwrite($file_out, $producer);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>В ролях:  </i></b>"));
		fwrite($file_out, $label_roles);

		$roles = iconv("UTF-8", "windows-1251",$result[$n1]->roles);
		fwrite($file_out, $roles);
		fwrite($file_out, "<br>\n");
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"description\">");
		$description =  iconv("UTF-8", "windows-1251",$result[$n1]->description);
		fwrite($file_out, $description);
		fwrite($file_out, "</div>\n");

		fwrite($file_out, "<div class=\"location\">");

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>Размер: </i></b>"));
		fwrite($file_out, $label_filesize);

		$filesize = iconv("UTF-8", "windows-1251",$result[$n1]->filesize);
		fwrite($file_out, $filesize);
		fwrite($file_out, "<br>\n");

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>Ссылка для локальной сети: </i></b>"));
		fwrite($file_out, $label_links_text_local);

		$links = $result[$n1]->location;
		$n3 = sizeof ($links->a);
		for ($n2=0; $n2 < $n3; $n2++)
		   {
			fwrite($file_out, "<a href=\"");
			$links_href = $links->a[$n2]['href'];
			fwrite($file_out, $links_href);
			fwrite($file_out, "\"> ");
			$links_text = $links->a[$n2];
			fwrite($file_out, iconv("UTF-8", "windows-1251",$links_text));
			fwrite($file_out, "</a><br/>");
		   }

//		fwrite($file_out, iconv("UTF-8", "windows-1251","<b><i>Ссылка для скачивания с файлообменников: </i></b>"));
		fwrite($file_out, $label_links_text_filesharing);

		$links = $result[$n1]->filesharing;
		$n3 = sizeof ($links->a);
		for ($n2=0; $n2 < $n3; $n2++)
		   {
			fwrite($file_out, "<a href=\"");
			$links_href = $links->a[$n2]['href'];
			fwrite($file_out, $links_href);
			fwrite($file_out, "\"> ");
			$links_text = $links->a[$n2];
			fwrite($file_out, iconv("UTF-8", "windows-1251",$links_text));
			fwrite($file_out, "</a><br/>");
		   }
		fwrite($file_out, "</div>\n");
	  }//---------------- end if
  }//-------------------- end for
//--------------------------------------------------------------
$page_content_end = "</body></html>";
fwrite($file_out, $page_content_end);
    
print "Success, wrote to file $html_page";
fclose($file_out);

}//----------------------------------- end func

//****************************
// MAIN
//****************************
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";

// Извлекаем параметры из запроса
if (!isset($_REQUEST['charset']))
  {
	echo "<font color=red> Need CHARSET...... </font>";
	echo "http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']."?charset =\"utf-8\" or \"windows-1251\"";
	exit();
  }
$charset = $_REQUEST['charset'];

$xml_file = "http://rlaptev.co.cc/www/video/video.xml";
$html_page = "films.html";
$page_content_p1 = "
<html><head>
<title> все фильмы, описания </title>
<meta http-equiv=Content-Type content=text/html; charset=$charset>
<!--
<link type=\"text/css\" rel=\"stylesheet\" href=\"style.css\"/>
-->
<style>
title
{
	width:80%;
	margin: 10px; 
	padding: 10px;
	text-align:center;
}

.about
{
	width: 80%; 
	margin-left: 15px;
	padding: 0px;
	text-align:left;
}

.description
{
	width: 80%; 
      	background-color:#D0CCD5;
	color:000000;
/*
      	border-style:solid;
      	border-color:black;
      	border-width:thin;
*/
	margin: 10px; 
	padding: 10px;
	text-align:justify;
}

.location
{
	width: 80%; 
	margin-left: 15px;
	padding: 0px;
	text-align:left;
}
</style>
</head>
<body>
<li><a href=\"films.html\"> все фильмы, описания </a>
<li><a href=\"filesharing_films.html\"> выборка фильмов, закачанных на файлообменники </a>
<li><a href=\"videoclips.html\"> выборка видеоклипов </a>
<hr>
Number of film elements: $num_films<br>\n";


//-----------------------------------------------------
// Считать из XML-файла данные 
//-----------------------------------------------------
//if (file_exists($xml_file)) 
//  {
//	$xml = simplexml_load_file($xml_file);
//	echo "<pre>";
//	print_r($xml);
//	echo "</pre>";
//  } 
//else 
//  {
//	exit("Failed to open ".$xml_file);
//  }

$xml = simplexml_load_file($xml_file);
if ($xml == FALSE) 
  {
	exit("Failed to open ".$xml_file);
  }
else
  echo "Use SimpleXML for read data from ".$xml_file."<br>"; 

$result = $xml->xpath('//film'); 
$num_films =  sizeof($result);
//echo "<pre>";
//print_r ($result);
//echo "</pre>";

if ($charset == "windows-1251")
  {
	$page_content_p1 = iconv("UTF-8", "windows-1251",$page_content_p1);
	$label_genre  =	iconv("UTF-8", "windows-1251","<b><i>Жанр: </i></b>");
	$label_producer  = iconv("UTF-8", "windows-1251","<b><i>Создатели: </i></b>");
	$label_roles  = iconv("UTF-8", "windows-1251","<b><i>В ролях:  </i></b>");
	$label_filesize = iconv("UTF-8", "windows-1251","<b><i>Размер: </i></b>");
	$label_links_text_local = iconv("UTF-8", "windows-1251","<b><i>Ссылка для локальной сети: </i></b>");
	$label_links_text_filesharing = iconv("UTF-8", "windows-1251","<b><i>Ссылка для скачивания с файлообменников: </i></b>");
	create_html_page_win($page_content_p1);
  }

if ($charset == "utf-8")
  {
	$label_genre  =	"<b><i>Жанр: </i></b>";
	$label_producer  = "<b><i>Создатели: </i></b>";
	$label_roles  = "<b><i>В ролях:  </i></b>";
	$label_filesize = "<b><i>Размер: </i></b>";
	$label_links_text_local = "<b><i>Ссылка для локальной сети: </i></b>";
	$label_links_text_filesharing = "<b><i>Ссылка для скачивания с файлообменников: </i></b>";
	create_html_page_utf8($page_content_p1);
  }

readfile ($html_page);
?>

