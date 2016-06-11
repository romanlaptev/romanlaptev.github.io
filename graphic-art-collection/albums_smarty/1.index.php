<?
//$_SERVER['REQUEST_URI']='index.php';

//echo "2.REQUEST_URI = ".$_SERVER['REQUEST_URI'];
//echo "<br>";

//echo "REQUEST = <pre>";
//print_r($_REQUEST);
//echo "</pre>";

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
	if (file_exists($_SERVER['DOCUMENT_ROOT']."/log"))
	{
		if (!empty($log_file))
		{
			$page=$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
			$vizit_date = date ("l dS of F Y h:i:s A");
			$buffer = $vizit_date.", ".$_SERVER["REMOTE_ADDR"].", ".$page."\n";
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
//----------------------------------------------
	if (isset($_REQUEST['tid']))
	{
		$tid = $_REQUEST['tid'];
		$smarty->assign('tid', $tid);
	}
	if (isset($_REQUEST['nid']))
	{
		$nid = $_REQUEST['nid'];
		$smarty->assign('nid', $nid);
	}

	//if (!empty($_REQUEST['image']))
	//{
	//	$smarty->assign('image_title', $_REQUEST['image']);
	//}

	if (!empty($_REQUEST['content']))
	{
		$content =$_REQUEST['content'];
	}
	else
	{
		$content = 'list-albums';
		//$content = 'view-album';
		//$content = 'view-image';
	}
	$smarty->assign('content', $content);

	if (!empty($_REQUEST['page']))
	{
		$page = $_REQUEST['page'];
		$smarty->assign('page', $_REQUEST['page']);
	}
	else
		$page = 0;


	//if ($_SERVER['REQUEST_URI']=='/smarty_site/album_76')
	$pos = strpos($_SERVER['REQUEST_URI'], "album");
	if ($pos)
	{
//echo "3.REQUEST_URI = ".$_SERVER['REQUEST_URI'];
//echo "<br>";
		$content = 'view-album';
		$smarty->assign('content', $content);
		
		$tid_arr=explode("_",$_SERVER['REQUEST_URI']);
echo "tid_arr = <pre>";
print_r($tid_arr);
echo "</pre>";
		$tid = $tid_arr[2];
		$smarty->assign('tid', $tid);
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
//-------------------------------------
	$smarty->assign('albums', $albums);
//================================================= 
	$smarty->assign('breadcrumb', $breadcrumb);
	$smarty->display('index.tpl');

?>
