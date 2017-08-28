<?
//***************************************************************
// Формирование HTML-страницы с ссылками на статьи
// кодировка полученной страницы UTF8
//***************************************************************
function create_html_page($xml, $html_page,$charset, $page_content_start)
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

function view_xml ($xml)
  {
	global $url1,$url2,$url3,$url4;

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

//***************************************************************
// Загрузка HTML-страницы на хостинг
//***************************************************************
function ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir)
{
	$conn_id=ftp_connect($server,21,60);
	if ($conn_id)
	 {
		echo "Connect to $server<br>\n";
	 }
	else
		echo "Dont connect to $server<br>\n";

	$login_result=ftp_login($conn_id,$user,$pwd);
	if ($login_result)
	 {
		echo "Login in $server<br>\n";
	 }
	else
		echo "Dont login in $server<br>\n";

	ftp_pasv($conn_id, true);
    
	if ($dir!="")
	 {
		ftp_chdir($conn_id, $dir);
	 }

	if (ftp_put($conn_id,$remote_file,$local_file,FTP_ASCII))
	  {
		echo "succesfully uploaded $remote_file on $server<br>\n";
	 }
	else
		echo "Error uploaded $remote_file on $server<br>\n";

    ftp_quit($conn_id);
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
//$charset = "";
$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
<style>
body
{
	background:#999999;
}
a
{
	text-decoration:none;
	font-size:10pt;
}
.article
{
	float:left;
	width: 200px;
	height: 280px;
	margin:5px;
	border: 7px double black;
	background: #FFB515;
}
.article_num
{
/*	width:20px;*/
/*	float:left;*/
	padding: 6px;
}
.article_title
{
	border: 0px solid;
	float: left;
	margin-left: 5px;
	margin-right: 5px;
	margin-top: 0px;
	text-align: center;
	width: 200px;
	height:210px;
}
.article_links
{
	border: 0px solid;
	float: left;
	margin-left: 5px;
	margin-right: 5px;
	text-align: center;
	width: 200px;
}
.article_links a
{
/*
	border:1px solid black;
	margin: 5px;
	padding: 5px;
*/
}
.date
{
	clear:both;
	color: #FFFFFF;
}
</style>
</head>\n<body>\n";

$tpl_p2 = "</body>\n</html>\n";

echo $tpl_p1;

$url1="http://rlaptev.co.cc/ext/lib/comp/articles";
$url2="http://roman-laptev.ucoz.ru/articles";
//$url3="http://roman-laptev.hut1.ru/lib/articles";
$url4="http://roman-laptev.narod.ru/lib/articles";

//-----------------------------------------------------
// Считать из XML-файла данные 
//-----------------------------------------------------
$xml_file = "http://rlaptev.co.cc/www/xml/mydb.xml";
$xml = simplexml_load_file($xml_file);
if ($xml == FALSE) 
  {
	exit("Failed to open ".$xml_file);
  }

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

if  ($action == "view")
  {
	//$result = $xml->xpath('//article'); 
	//$num =  sizeof($result);
	//echo "<pre>";
	//print_r ($result);
	//echo "</pre>";
	view_xml ($xml);
  }

//**********************************************
// Записать результаты запроса в файл
//**********************************************
if  ($action == "save")
   {
	$html_page="list_articles.html";
	create_html_page($xml, $html_page,$charset,$tpl_p1);
	readfile ($html_page);
   }
// -------------------- end action

if  ($action == "convert")
   {
	$html_page="list_articles.html";
	if (!$file_utf8 = fopen($html_page, 'r'))
	  {
	 	print "Cannot open file ($html_page) for reading";
	 	exit;
	  }

	$html_page_utf8  = fread ($file_utf8, filesize ($html_page));
	fclose($file_utf8);

	$html_page_win = iconv("UTF-8", "windows-1251",$html_page_utf8);
	//echo $html_page_win;
	echo "convert source page UTF-8 in windows-1251 charset<br>";

	$html_page="list_articles_cp1251.html";
	if (!$file = fopen($html_page, 'w'))
	  {
	 	print "Cannot open file ($html_page) for writing";
	 	exit;
	  }
	fwrite($file, $html_page_win);
	fclose($file);

	echo "Save content in ".$html_page;
   }
// -------------------- end action

if  ($action == "upload")
   {
	$local_file='list_articles.html';
	$remote_file='list_articles.html';
	$server='roman-laptev.ucoz.ru';
	$user='0roman-laptev';
	$pwd='';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$local_file='list_articles_cp1251.html';
	$remote_file='list_articles.html';

	$server='ftp.narod.ru';
	$user='roman-laptev';
	$pwd='';
	$dir='lib';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='roman-laptev.hut1.ru';
	$user='romanla';
	$pwd='';
	$dir='WWW';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

//$ftp_server='nas';
//$ftp_username='roman';
//$ftp_pwd='';

	$server='rex.dax.ru';
	$user='u301005';
	$pwd='zh3oroyb';
	$dir='public_html';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='rex.hop.ru';
	$user='w336486';
	$pwd='wl9fgg4k';
	$dir='public_html';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='bookz.aiq.ru';
	$user='u335427';
	$pwd='3qd8do5i';
	$dir='public_html';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='lib.wallst.ru';
	$user='u335492';
	$pwd='b3nfr52w';
	$dir='public_html';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='rlaptev.far.ru';
	$user='w300020';
	$pwd='qpe3ca9m';
	$dir='public_html/uploads';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	//$ftp_server='vodovodoff.far.ru';
	//$ftp_username='w261665';
	//$ftp_pwd='bu884uif';

	$server='pub.fotoland.ru';
	$user='luser';
	$pwd='luserpass';
	$dir='';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

   }
// -------------------- end action
echo $tpl_p2;

?>

