<?
//echo "REQUEST = <pre>";
//print_r($_REQUEST);
//echo "</pre>";
//echo "REQUEST_URI = ".$_SERVER['REQUEST_URI'];
//echo "<br>";

	require 'smarty/Smarty.class.php';
	$smarty = new Smarty();
//echo "smarty:<pre>";
//print_r($smarty);
//echo "</pre>";

	$smarty->template_dir = './templates/';
	$smarty->compile_dir = './templates/compile/';
	$smarty->cache_dir = './templates/cache/';

//$smarty->debugging = true;
//$smarty->compile_check = true;
//$smarty->clear_compiled_tpl('left_menu.tpl');

	$smarty->caching = false;
//$smarty->error_reporting = E_ALL; // LEAVE E_ALL DURING DEVELOPMENT
//$smarty->debugging = true;
	require 'config.php';
//----------------------------------------------
//echo $_SERVER['DOCUMENT_ROOT']."/log";
//echo "<br>";
	if (file_exists($_SERVER['DOCUMENT_ROOT']."/log"))
	{
		if (!empty($log_file))
		{
			$url = $_SERVER['HTTP_REFERER'];
			$page=$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
			$vizit_date = date ("l dS of F Y h:i:s A");
			$buffer = $vizit_date.", ".$_SERVER["REMOTE_ADDR"].", ".$page;
			$buffer .= ", ".$url."\n";
//echo $buffer;
			$filename=$_SERVER['DOCUMENT_ROOT']."/".$log_file;
			$file = fopen ($filename,"a+");
			if ( $file )
			{
				fwrite ($file, $buffer);
			}
			fclose ($file); 
		}
	}
//---------------------------------------------- обработка url
	$pos=0;
	$pos = strpos($_SERVER['REQUEST_URI'], "?");
	if ($pos==0) // если в url нет параметров
	{
//----------------------------------		
		$arr = explode("/",$_SERVER['REQUEST_URI']);
//echo "count(arr) = ".count($arr);
//echo "<br>";
//echo "arr = <pre>";
//print_r($arr);
//echo "</pre>";
		//$url = explode("_",$arr[1]);
		$url = explode("_",$arr[count($arr)-1]);//для разбора параметров, взять последний элемент url
//echo "url = <pre>";
//print_r($url);
//echo "</pre>";
		for ($n1=0;$n1<count($url);$n1++)
		{
			if ($url[$n1]=='view-album')
			{
				$content = $url[$n1];
				$tid = $url[$n1+1];//номер альбома взять из следущего элемента массива url
			}

			if ($url[$n1]=='list-albums')
			{
				$content = $url[$n1];
				$tid = $url[$n1+1];//номер альбома взять из следущего элемента массива url
			}
			
			if ($url[$n1]=='page')
			{
				$page = $url[$n1+1];//номер страницы взять из следущего элемента массива url
			}

			if ($url[$n1]=='view-image')
			{
				$content = $url[$n1];
				$nid = $url[$n1+1];//номер изображения взять из следущего элемента массива url
			}
		}
//----------------------------------		
	}
	

//---------------------------------- анализ найденных GET и POST переменных
	if (isset($_REQUEST['tid']))
	{
		$tid = $_REQUEST['tid'];
	}
	if (isset($_REQUEST['nid']))
	{
		$nid = $_REQUEST['nid'];
	}

	if (!empty($_REQUEST['content']))
	{
		$content =$_REQUEST['content'];
	}

	if (!empty($_REQUEST['page']))
	{
		$page = $_REQUEST['page'];
	}

//------------------------------------- Считать из XML-файла данные 
	$xml = simplexml_load_file($xml_file);
	if ($xml == FALSE) 
	  {
		exit("Failed to open ".$xml_file);
	  }
//echo "xml == <pre>";
//print_r($xml);
//echo "</pre>";
	$num_termins = count($xml->taxonomy_vocabulary->termin);
//echo "num_termins  = ".$num_termins;
//echo "<br>";
	$num_albums = count($xml->album);
//echo "num_albums = ".$num_albums;
//echo "<br>";


//------------------------------------- ПОДГОТОВИТЬ ВЫВОД СПИСКА АЛЬБОМОВ
	require_once "lib/list-albums.php";
	if ($content == 'list-albums')
	{
		$breadcrumb .= " > Альбомы";
	}//---------------------------- end if

//------------------------------------- СЧИТАТЬ список ИЗОБРАЖЕНИй ЗАПРОШЕННОГО АЛЬБОМА
	require_once "lib/view-album.php";
	if ($content == 'view-album')
	{
		$breadcrumb .= " > ".$album_name;
	}//---------------------------- end if

//------------------------------------- СЧИТАТЬ ИЗОБРАЖЕНИе АЛЬБОМА
	if ($content == 'view-image')
	{
		require_once "lib/view-image.php";
	}//---------------------------- end if

//------------------------------------- Сменить кодировку переменным вывода
	if ($charset == "windows-1251")
	{
		$breadcrumb = iconv("UTF-8", "windows-1251",$breadcrumb);
//echo "breadcrumb = ".$breadcrumb;
//echo "<br>";
		for ($n1=0; $n1<count($albums); $n1++)
		{
			$albums[$n1]['title'] = iconv("UTF-8", "windows-1251",$albums[$n1]['title']);
			if (is_array($albums[$n1]['images']))
			{
				for ($n2=0; $n2<count($albums[$n1]['images']); $n2++)
				{
$albums[$n1]['images'][$n2]['preview_img'] = iconv("UTF-8", "windows-1251",$albums[$n1]['images'][$n2]['preview_img']);
$albums[$n1]['images'][$n2]['title'] = iconv("UTF-8", "windows-1251",$albums[$n1]['images'][$n2]['title']);
				}
			}
		}//-------------------- end foreach
	}
//echo "albums == <pre>";
//print_r($albums);
//echo "</pre>";

//echo "content = ".$content;
//echo "<br>";
//echo "page = ".$page;
//echo "<br>";
//echo "tid = ".$tid;
//echo "<br>";
//-------------------------------------
	$smarty->assign('tid', $tid);
	$smarty->assign('page',$page);
	$smarty->assign('nid', $nid);
	$smarty->assign('content', $content);
	$smarty->assign('albums', $albums);
//================================================= 
	$smarty->assign('breadcrumb', $breadcrumb);
	$smarty->display('index.tpl');

?>
