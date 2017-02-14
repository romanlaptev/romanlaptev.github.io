<?
//***************************************************************
// Формирование HTML-страницы с ссылками на статьи
// кодировка полученной страницы UTF8
//***************************************************************
function create_html_page_articles($xml, $html_page,$charset, $page_content_start)
{
	global $url1,$url2,$url3,$url4;
	//--------------------------------------------------------------
	// Открыть файл для записи сформированной HTML-страницы
	//--------------------------------------------------------------
	if (!$file_out = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page)";
	 	return;
	  }

	fwrite($file_out, $page_content_start);

	fwrite($file_out, "<div>\n");
	for ($n1=0; $n1 < sizeof($xml->articles->article); $n1++)
		{
			//fwrite($file_out, $n1.".");
			//fwrite($file_out, "<a href=\"".$xml->articles->article[$n1]->a['href']."\" target=_blank>");
			//fwrite($file_out, $xml->articles->article[$n1]->a."</a><br/>\n");

			fwrite($file_out,"<div class=\"article\">\n");

				fwrite($file_out, "<div class=\"article_num\">\n");
				fwrite($file_out, ($n1+1).".");
				fwrite($file_out,"</div>\n");

				fwrite($file_out, "<div class=\"article_title\">\n");
				fwrite($file_out, $xml->articles->article[$n1]->section."<br>\n");
				fwrite($file_out, $xml->articles->article[$n1]->journal."<br>\n");
				fwrite($file_out, $xml->articles->article[$n1]->author."<br>\n");
				fwrite($file_out, $xml->articles->article[$n1]->a."\n");
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div  class=\"article_links\">\n");
				if (isset($url1))
				  {
					$url11=$url1."/".$xml->articles->article[$n1]->a['href'];
					fwrite($file_out,"<a href=\"".$url11."\" target=_blank> url1 </a>\n");
				  }

				if (isset($url2))
				  {
					$url21=$url2."/".$xml->articles->article[$n1]->a['href'];
					fwrite($file_out,"<a href=\"".$url21."\" target=_blank> url2 </a>\n");
				  }

				if (isset($url3))
				  {
					$url31=$url3."/".$xml->articles->article[$n1]->a['href'];
					fwrite($file_out, "<a href=\"".$url31."\" target=_blank> url3 </a>\n");
				  }

				if (isset($url4))
				  {
					$url41=$url4."/".$xml->articles->article[$n1]->a['href'];
					fwrite($file_out, "<a href=\"".$url41."\" target=_blank> url4 </a>\n");
				  }

				fwrite($file_out, "</div>\n");

			fwrite($file_out,"</div>\n");

		} //--------------------------- end for
	$today = date("H:i:s, d.m.Y");
	fwrite($file_out, "<div class=\"date\">\n");
	fwrite($file_out,"Last modified: <b>" . $today."</b></br>\n");
	fwrite($file_out, "</div>\n");

	fwrite($file_out, "</div>\n");


	$page_content_end = "</body></html>";
	fwrite($file_out, $page_content_end);
   
	print "Success, wrote to file $html_page";
	fclose($file_out);
}//----------------------------------- end func

function view_xml_articles ($xml)
  {
	global $url1,$url2,$url3,$url4;

	echo "view_xml_articles\n";
	echo "<div>\n";
	for ($n1=0; $n1 < sizeof($xml->articles->article); $n1++)
		{
			//echo $n1."<br>\n";
			echo "<div class=\"article\">\n";

				echo "<div class=\"article_num\">\n";
				echo ($n1+1).".";
				echo "</div>\n";

				echo "<div class=\"article_title\">\n";
				echo $xml->articles->article[$n1]->section."<br>\n";
				echo $xml->articles->article[$n1]->journal."<br>\n";
				echo $xml->articles->article[$n1]->author."<br>\n";
				echo $xml->articles->article[$n1]->a."\n";
				echo "</div>\n";

				echo "<div  class=\"article_links\">\n";
				if (isset($url1))
				  {
					$url11=$url1."/".$xml->articles->article[$n1]->a['href'];
					echo "<a href=\"".$url11."\" target=_blank> url1 </a>\n";
				  }

				if (isset($url2))
				  {
					$url21=$url2."/".$xml->articles->article[$n1]->a['href'];
					echo "<a href=\"".$url21."\" target=_blank> url2 </a>\n";
				  }

				if (isset($url3))
				  {
					$url31=$url3."/".$xml->articles->article[$n1]->a['href'];
					echo "<a href=\"".$url31."\" target=_blank> url3 </a>\n";
				  }

				if (isset($url4))
				  {
					$url41=$url4."/".$xml->articles->article[$n1]->a['href'];
					echo "<a href=\"".$url41."\" target=_blank> url4 </a>\n";
				  }
				echo "</div>\n";

			echo "</div>\n";
		} //--------------------------- end for
	echo "</div>\n";
  }
//-----------------------------------------------------end func
//===================================================================== end section

//***************************************************************
// Формирование HTML-страницы с ссылками на статьи
// кодировка полученной страницы UTF8
//***************************************************************
function create_html_page_books($xml, $html_page,$charset, $page_content_start)
{
	global $url1,$url2,$url3,$url4;
	//--------------------------------------------------------------
	// Открыть файл для записи сформированной HTML-страницы
	//--------------------------------------------------------------
	if (!$file_out = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page)";
	 	return;
	  }

	fwrite($file_out, $page_content_start);

	fwrite($file_out, "<div>\n");
	for ($n1=0; $n1 < sizeof($xml->books->book); $n1++)
		{
			//fwrite($file_out, $n1.".");
			//fwrite($file_out, "<a href=\"".$xml->articles->article[$n1]->a['href']."\" target=_blank>");
			//fwrite($file_out, $xml->articles->article[$n1]->a."</a><br/>\n");
			fwrite($file_out,"<div class=\"book\">\n");

				fwrite($file_out, "<div class=\"book_num\">\n");
				fwrite($file_out, ($n1+1).".");
				fwrite($file_out,"</div>\n");

				fwrite($file_out, "<div class=\"book_title\">\n");
				fwrite($file_out, "<div class=\"author\">".$xml->books->book[$n1]['author']."</div>");
				fwrite($file_out,  $xml->books->book[$n1]->a."\n");
				fwrite($file_out,  "</div>\n");


				fwrite($file_out,  "<div  class=\"book_links\">\n");
				if (isset($url1))
				  {
					$url11=$url1."/".$xml->books->book[$n1]->a['href'];
					fwrite($file_out,  "<a href=\"".$url11."\" target=_blank> url </a>\n");
				  }
				if (isset($url2))
				  {
					$url21=$url2."/".$xml->books->book[$n1]->a['href'];
					fwrite($file_out,  "<a href=\"".$url21."\" target=_blank> url </a>\n");
				  }
				if (isset($url3))
				  {
					$url31=$url3."/".$xml->books->book[$n1]->a['href'];
					fwrite($file_out,  "<a href=\"".$url31."\" target=_blank> url </a>\n");
				  }
				if (isset($url4))
				  {
					$url41=$url4."/".$xml->books->book[$n1]->a['href'];
					fwrite($file_out,  "<a href=\"".$url41."\" target=_blank> url </a>\n");
				  }
				fwrite($file_out,  "</div>\n");

			fwrite($file_out,"</div>\n");
		} //--------------------------- end for


	fwrite($file_out, "</div>\n");

	$today = date("H:i:s, d.m.Y");

	fwrite($file_out, "<div class=\"date\">\n");
	fwrite($file_out,"Last modified: <b>" . $today."</b></br>\n");
	fwrite($file_out, "</div>\n");

	$page_content_end = "</body></html>";
	fwrite($file_out, $page_content_end);
   
	print "Success, wrote to file $html_page";
	fclose($file_out);

}//----------------------------------- end func

function view_xml_books ($xml)
  {
	global $url1,$url2,$url3,$url4;

	echo "<div>\n";
	for ($n1=0; $n1 < sizeof($xml->books->book); $n1++)
		{
			//echo $n1."<br>\n";
			echo "<div class=\"book\">\n";

				echo "<div class=\"book_num\">\n";
				echo ($n1+1).".";
				echo "</div>\n";

				echo "<div class=\"book_title\">\n";
				echo "<div class=\"author\">".$xml->books->book[$n1]['author']."</div>";
				echo $xml->books->book[$n1]->a."\n";
				echo "</div>\n";

				echo "<div  class=\"book_links\">\n";
				if (isset($url1))
				  {
					$url11=$url1."/".$xml->books->book[$n1]->a['href'];
					echo "<a href=\"".$url11."\" target=_blank> url </a>\n";
				  }
				if (isset($url2))
				  {
					$url21=$url2."/".$xml->books->book[$n1]->a['href'];
					echo "<a href=\"".$url21."\" target=_blank> url </a>\n";
				  }
				if (isset($url3))
				  {
					$url31=$url3."/".$xml->books->book[$n1]->a['href'];
					echo "<a href=\"".$url31."\" target=_blank> url </a>\n";
				  }
				if (isset($url4))
				  {
					$url41=$url4."/".$xml->books->book[$n1]->a['href'];
					echo "<a href=\"".$url41."\" target=_blank> url </a>\n";
				  }

				echo "</div>\n";

			echo "</div>\n";
		} //--------------------------- end for
	echo "</div>\n";
  }
//-----------------------------------------------------end func
//===================================================================== end section

//***************************************************************
// Формирование HTML-страницы с ссылками на статьи
// кодировка полученной страницы UTF8
//***************************************************************
function create_html_page_music($xml, $html_page,$charset, $page_content_start)
{
	//--------------------------------------------------------------
	// Открыть файл для записи сформированной HTML-страницы
	//--------------------------------------------------------------
	if (!$file_out = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page)";
	 	return;
	  }

	fwrite($file_out, $page_content_start);
	fwrite($file_out, "<div class=\"main\">\n");
//----------------------------------------
	for ($n1=0; $n1 < sizeof($xml->music->track); $n1++)
		{
			fwrite($file_out, "<div class=\"track\">\n");

				fwrite($file_out, "<div class=\"track_num\">\n");
				fwrite($file_out, ($n1+1).".");
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div class=\"track_title\">\n");
				fwrite($file_out, $xml->music->track[$n1]->author."<br>");
				fwrite($file_out, $xml->music->track[$n1]->album." (".$xml->music->track[$n1]->album['year'].")<br>");
				fwrite($file_out, $xml->music->track[$n1]->name);
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div  class=\"track_links\">\n");
				$num =  $n1+1;
				$result = $xml->xpath('//music/track['.$num.']/a'); 
				for ($n2=0; $n2<sizeof($result); $n2++)
				  {
					$url=$result[$n2]['href'];
					fwrite($file_out,  "<a href=\"".$url."\" target=_blank> url </a>\n");
				  }
				fwrite($file_out, "</div>\n");
			fwrite($file_out, "</div>\n");
		} //--------------------------- end for
	fwrite($file_out, "</div>\n");
//----------------------------------------

	$today = date("H:i:s, d.m.Y");
	fwrite($file_out, "<div class=\"date\">\n");
	fwrite($file_out,"Last modified: <b>" . $today."</b></br>\n");
	fwrite($file_out, "</div>\n");

	$page_content_end = "</body></html>";
	fwrite($file_out, $page_content_end);
   
	print "Success, wrote to file $html_page";
	fclose($file_out);

}//----------------------------------- end func

function view_xml_music ($xml)
  {
	//global $url1,$url2,$url3,$url4;

	echo "<div class=\"main\">\n";
	for ($n1=0; $n1 < sizeof($xml->music->track); $n1++)
		{
			//echo $n1."<br>\n";
			echo "<div class=\"track\">\n";

				echo "<div class=\"track_num\">\n";
				echo ($n1+1).".";
				echo "</div>\n";

				echo "<div class=\"track_title\">\n";
				echo $xml->music->track[$n1]->author."<br>";
				echo $xml->music->track[$n1]->album." (".$xml->music->track[$n1]->album['year'].")<br>";
				echo $xml->music->track[$n1]->name;
				echo "</div>\n";

				echo "<div  class=\"track_links\">\n";

				$num =  $n1+1;
				$result = $xml->xpath('//music/track['.$num.']/a'); 
//echo "<pre>";
//print_r ($result);
//echo "</pre>";
//					$url=$result[0]['href'];
//					echo $url;
//exit;
				for ($n2=0; $n2<sizeof($result); $n2++)
				  {
					$url=$result[$n2]['href'];
					echo "<a href=\"".$url."\" target=_blank> url </a>\n";
				  }
				echo "</div>\n";


			echo "</div>\n";
		} //--------------------------- end for
	echo "</div>\n";
  }
//-----------------------------------------------------end func

function view_xml_video ($xml)
  {
	echo "<div class=\"main\">\n";
	for ($n1=0; $n1 < sizeof($xml->video->films->film); $n1++)
		{
			//echo $n1."<br>\n";
			echo "<div class=\"film\">\n";

				echo "<div class=\"film_title\">\n";
				$num =  $n1+1;
				echo $num;
				echo "<h2>";
				echo $xml->video->films->film[$n1]['title'];
				echo "</h2>";
				echo "</div>\n";

				echo "<div class=\"film_genre\">\n";
				echo $xml->video->films->film[$n1]->genre;
				echo "</div>\n";

				if ($xml->video->films->film[$n1]->img['src']!="")
				  {
					echo "<div class=\"film_img\">\n";
					echo "<img src=\"";
					echo $xml->video->films->film[$n1]->img['src'];
					echo "\">";
					echo "</div>\n";
				  }

				echo "<div class=\"film_producer\">\n";
				echo $xml->video->films->film[$n1]->producer;
				echo "</div>\n";

				echo "<div class=\"film_roles\">\n";
				echo $xml->video->films->film[$n1]->roles;
				echo "</div>\n";

				echo "<div class=\"film_description\">\n";
				echo $xml->video->films->film[$n1]->description;
				echo "</div>\n";

				//--------------------------------------------------------------------
				echo "<div class=\"film_links\">\n";

				echo "<div class=\"film_filesize\">\n";
				echo $xml->video->films->film[$n1]->filesize;
				echo "</div>\n";

				if ($xml->video->films->film[$n1]->location->a!="")
				  {
					echo "<div class=\"links_location\">\n";
					echo "Ссылка для локальной сети: </b><br/>\n";
					//echo $xml->video->films->film[$n1]->location;
					$result = $xml->xpath('//video/films/film['.$num.']/location/a'); 
//echo "<pre>";
//print_r ($result);
//echo "</pre>";
//					$url=$result[0]['href'];
//					echo $url;
//exit;
					for ($n2=0; $n2<sizeof($result); $n2++)
					  {
						$url=$result[$n2]['href'];
						echo "<a href=\"".$url."\" target=_blank>".$result[$n2]."</a><br/>\n";
					  }
					echo "</div>\n";
				  }
				//--------------------------------------------------------------------
				if ($xml->video->films->film[$n1]->filesharing->a!="")
				  {
					echo "<div class=\"links_filesharing\">\n";
					echo "Ссылка для скачивания с файлообменников: </b><br/>\n";
					//echo $xml->video->films->film[$n1]->filesharing;
					$result = $xml->xpath('//video/films/film['.$num.']/filesharing/a'); 
					for ($n2=0; $n2<sizeof($result); $n2++)
					  {
						$url=$result[$n2]['href'];
						echo "<a href=\"".$url."\" target=_blank>".$result[$n2]."</a><br/>\n";
					  }
					echo "</div>\n";
				  }

				echo "</div>\n";
				//--------------------------------------------------------------------

			echo "</div>\n";
		} //--------------------------- end for
	echo "</div>\n";
  }
//-----------------------------------------------------end func

function create_html_page_video($xml, $html_page,$charset, $page_content_start)
  {
	//--------------------------------------------------------------
	// Открыть файл для записи сформированной HTML-страницы
	//--------------------------------------------------------------
	if (!$file_out = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page)";
	 	return;
	  }

	fwrite($file_out, $page_content_start);
	fwrite($file_out, "<div class=\"main\">\n");
//----------------------------------------
	for ($n1=0; $n1 < sizeof($xml->video->films->film); $n1++)
		{
			fwrite($file_out, "<div class=\"film\">\n");
				fwrite($file_out, "<div class=\"film_title\">\n");
				$num =  $n1+1;
				fwrite($file_out, $num);
				fwrite($file_out, "<h2>");
				fwrite($file_out, $xml->video->films->film[$n1]['title']);
				fwrite($file_out, "</h2>");
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div class=\"film_genre\">\n");
				fwrite($file_out, $xml->video->films->film[$n1]->genre);
				fwrite($file_out, "</div>\n");

				if ($xml->video->films->film[$n1]->img['src']!="")
				  {
					fwrite($file_out, "<div class=\"film_img\">\n");
					fwrite($file_out, "<img src=\"");
					fwrite($file_out, $xml->video->films->film[$n1]->img['src']);
					fwrite($file_out, "\">");
					fwrite($file_out, "</div>\n");
				  }

				fwrite($file_out, "<div class=\"film_producer\">\n");
				fwrite($file_out, $xml->video->films->film[$n1]->producer);
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div class=\"film_roles\">\n");
				fwrite($file_out, $xml->video->films->film[$n1]->roles);
				fwrite($file_out, "</div>\n");

				fwrite($file_out, "<div class=\"film_description\">\n");
				fwrite($file_out, $xml->video->films->film[$n1]->description);
				fwrite($file_out, "</div>\n");

				//--------------------------------------------------------------------
				fwrite($file_out, "<div class=\"film_links\">\n");

				fwrite($file_out, "<div class=\"film_filesize\">\n");
				fwrite($file_out, $xml->video->films->film[$n1]->filesize);
				fwrite($file_out, "</div>\n");

				if ($xml->video->films->film[$n1]->location->a!="")
				  {
					fwrite($file_out, "<div class=\"links_location\">\n");
					fwrite($file_out, "Ссылка для локальной сети: </b><br/>\n");
					//echo $xml->video->films->film[$n1]->location;
					$result = $xml->xpath('//video/films/film['.$num.']/location/a'); 
					for ($n2=0; $n2<sizeof($result); $n2++)
					  {
						$url=$result[$n2]['href'];
						fwrite($file_out, "<a href=\"".$url."\" target=_blank>".$result[$n2]."</a><br/>\n");
					  }
					fwrite($file_out, "</div>\n");
				  }
				//--------------------------------------------------------------------
				if ($xml->video->films->film[$n1]->filesharing->a!="")
				  {
					fwrite($file_out, "<div class=\"links_filesharing\">\n");
					fwrite($file_out, "Ссылка для скачивания с файлообменников: </b><br/>\n");
					//echo $xml->video->films->film[$n1]->filesharing;
					$result = $xml->xpath('//video/films/film['.$num.']/filesharing/a'); 
					for ($n2=0; $n2<sizeof($result); $n2++)
					  {
						$url=$result[$n2]['href'];
						fwrite($file_out, "<a href=\"".$url."\" target=_blank>".$result[$n2]."</a><br/>\n");
					  }
					fwrite($file_out, "</div>\n");
				  }
				fwrite($file_out, "</div>\n");
				//--------------------------------------------------------------------
			fwrite($file_out, "</div>\n");
		} //--------------------------- end for
	fwrite($file_out, "</div>\n");
//----------------------------------------
	$today = date("H:i:s, d.m.Y");
	fwrite($file_out, "<div class=\"date\">\n");
	fwrite($file_out,"Last modified: <b>" . $today."</b></br>\n");
	fwrite($file_out, "</div>\n");

	$page_content_end = "</body></html>";
	fwrite($file_out, $page_content_end);
   
	print "Success, wrote to file $html_page";
	fclose($file_out);
  }
//-----------------------------------------------------end func
//===================================================================== end section

//**********************************************
// перекодировка файла страницы в windows-1251
// и запись потд тем же именем
//**********************************************
function utf8_to_win($html_page)
{
	if (!$file_utf8 = fopen($html_page, 'r'))
	  {
	 	print "Cannot open file ($html_page) for reading";
	 	exit;
	  }

	$html_page_utf8  = fread ($file_utf8, filesize ($html_page));
	fclose($file_utf8);

	$html_page_win = iconv("UTF-8", "windows-1251",$html_page_utf8);
	//echo $html_page_win;
	echo "<br>";
	echo "convert source page UTF-8 in windows-1251 charset<br>";

	// запись страницы в кодировке windows-1251 в тот же файл
	if (!$file = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page) for writing";
	 	exit;
	  }
	fwrite($file, $html_page_win);
	fclose($file);

	echo "Save content in ".$html_page;
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

// Извлекаем параметры из запроса
if (!isset($_REQUEST['section']))
  {
	echo "<font color=red> Need section...... </font>";
	echo "http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']."?section =\"articles\" or \"books\" or \"music\"";
	exit();
  }
$section = $_REQUEST['section'];

if (!isset($_REQUEST['charset']))
  {
	echo "<font color=red> Need CHARSET...... </font>";
	echo "http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']."?charset =\"utf-8\" or \"windows-1251\"";
	exit();
  }
$charset = $_REQUEST['charset'];

//if (isset($_REQUEST['action']))
//  {
//	$action=$_REQUEST['action']; 
//  }

//-----------------------------------------------------
// Считать из XML-файла данные 
//-----------------------------------------------------
$xml_file = "http://12nov.co.cc/www/xml/mydb.xml";
$xml = simplexml_load_file($xml_file);
if ($xml == FALSE) 
  {
	exit("Failed to open ".$xml_file);
  }

switch ($section)
  {
	case video: 
		$title = "каталог фильмов";
		$style = "../pages/css/list_video.css";

		$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<title>$title</title>
<link rel=stylesheet href=$style type=text/css>
</head>\n
<body>
<div align='center'><a href='javascript:history.back();'>home</a></div>\n";

		$tpl_p2 = "</body>\n</html>\n";
		echo $tpl_p1;

		$html_page="../pages/list_video.html";
		//view_xml_video ($xml);
		create_html_page_video ($xml, $html_page,$charset,$tpl_p1);
		if  ($charset == "windows-1251") // перекодировка файла страницы в windows-1251
		   {
			utf8_to_win($html_page);
		   }
		readfile ($html_page);

		break;

	case articles: 
		$title = "Статьи из журналов";
		$style = "css/list_articles.css";

		$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<title>$title</title>
<link rel=stylesheet href=$style type=text/css>
</head>\n
<body>
<div align='center'><a href='javascript:history.back();'>home</a></div>\n";

		$tpl_p2 = "</body>\n</html>\n";
		echo $tpl_p1;

		$url1="http://12nov.co.cc/ext/lib/comp/articles";
		$url2="http://roman-laptev.ucoz.ru/articles";
		//$url3="http://roman-laptev.hut1.ru/lib/articles";
		$url4="http://roman-laptev.narod.ru/lib/articles";

		$html_page="../pages/list_articles.html";

		//$action == "save";
		//view_xml_articles ($xml);

		create_html_page_articles ($xml, $html_page,$charset,$tpl_p1);
		if  ($charset == "windows-1251") // перекодировка файла страницы в windows-1251
		   {
			utf8_to_win($html_page);
		   }
		readfile ($html_page);
		break;

	case books: 
		$title = "Список книг";
		$style = "css/list_books.css";

		$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<title>$title</title>
<link rel=stylesheet href=$style type=text/css>
</head>\n
<body>
<div align='center'><a href='javascript:history.back();'>home</a></div>\n";

		$tpl_p2 = "</body>\n</html>\n";
		echo $tpl_p1;

		$url1="http://12nov.co.cc/ext";
		//$url2="http://roman-laptev.ucoz.ru";
		//$url3="http://roman-laptev.hut1.ru";
		$url3="http://rlaptev.far.ru";
		$url4="http://roman-laptev.narod.ru";

		$html_page="../pages/list_books.html";

		//$action == "save";
		//view_xml_books ($xml);
		create_html_page_books ($xml, $html_page,$charset,$tpl_p1);
		if  ($charset == "windows-1251") // перекодировка файла страницы в windows-1251
		   {
			utf8_to_win($html_page);
		   }
		readfile ($html_page);
		break;

	case music: 
		$title = "list music";
		$style = "css/list_music.css";

		$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<title>$title</title>
<link rel=stylesheet href=$style type=text/css>
</head>\n
<body>
<div align='center'><a href='javascript:history.back();'>home</a></div>\n";

		$tpl_p2 = "</body>\n</html>\n";
		echo $tpl_p1;

		//$action == "save";

		$html_page="../pages/list_music.html";
		//view_xml_music ($xml);
		create_html_page_music ($xml, $html_page,$charset,$tpl_p1);
		if  ($charset == "windows-1251") // перекодировка файла страницы в windows-1251
		   {
			utf8_to_win($html_page);
		   }
		readfile ($html_page);
		break;

  }

echo $tpl_p2;
?>

