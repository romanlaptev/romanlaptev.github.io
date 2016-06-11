<?
//---------------------------
// Bootstrap Drupal.
//---------------------------
chdir ("../");
//echo getcwd();
//echo "<br>";
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//---------------------------

global $base_url;
//echo $base_url;
global $log;
//$log = "";

echo "<pre>";
//print_r($_SERVER);
print_r($_REQUEST);
//print_r($_FILES);
echo "</pre>";

/*
$db_name = "albums";
$username = "root";
$password = "master";
$server = "localhost";
*/

/*
//it-works.16mb.ru, albums
$db_name = "u754457009_db2";
$username = "u754457009_user2";
$password = "m2ster";
$server = "mysql.hostinger.ru";
*/

//директория с файлами для импорта
if (!empty($_REQUEST['dir']))
{
	$dir = $_REQUEST['dir'];
}
else
{
	//$dir ='../sites/default/files/imports';
	$dir ='sites/default/files/imports';
}

// Извлекаем параметры из запроса
//if (!isset($_REQUEST['action']) && empty($_REQUEST['action']))
if (empty($_REQUEST['action']))
  {
	$form=view_form(); // вывод формы
  }
else // Параметр action определен
  {
	$action = $_REQUEST['action'];

	switch ($action)
	  {
//==========================================================================
		case upload:
			if (!empty($_FILES['import_file']))
			{
$message = "<span class='ok'>-- Чтение данных из </span>".$_FILES['import_file']['name'];
$message .= "<br>";
				$file_arr = $_FILES['import_file'];

				$test1=0;
				$test1 = upload_file ($dir, $file_arr);
				if ($test1==1)
				{
					$test2 = test_file_format($dir, $file_arr);
/*
					if ($test2==1)
					{
echo "<span class='ok'>-- продолжаем импорт...</span>";
echo "<br>";
						$filename = $dir."/".$file_arr['name'];
						import_from_xml($filename);
					}
*/
//$redirect="<a href=\"javascript:location.href='".$_SERVER['SCRIPT_NAME']."'\">обновить список файлов</a>";
//$redirect="<script>location.href='".$_SERVER['SCRIPT_NAME']."'</script>";
//echo $redirect;
				}
				$form = view_form(); // вывод формы
			}
			else
			{
				$form = view_form_upload();
				$form .= view_form(); // вывод формы
			}
		break;
//==========================================================================
		case test_xml:
			$form = view_form(); // вывод формы
			if (!empty($_REQUEST['filename']))
			{
				$filename=$dir."/".$_REQUEST['filename'];
				//$log = test_xml($filename);
				test_xml($filename);
				//echo $out;
/*
echo "<script>
	var info = document.getElementById('info');
	alert(info.outerHTML);
	info.innerHTML = '".$out."';
</script>";
*/
			}
			else
			{
				$message = "<span class='error'>var filename is empty!!!!</span>";
				$message .= "<br>";
			}
		break;
//==========================================================================
		case import_xml:
			$form = view_form(); // вывод формы
			if (!empty($_REQUEST['filename']))
			{
				$filename = $dir."/".$_REQUEST['filename'];

				if (!empty($_REQUEST['vocabulary_vid']))
				{
					$vocabulary_vid = $_REQUEST['vocabulary_vid'];
//-------------------------------------- снова определить название словаря
global $db_prefix;
$query="SELECT name FROM ".$db_prefix."vocabulary WHERE vid=".$vocabulary_vid.";";
$res = db_query($query);
$row = db_fetch_object($res);
$vocabulary_name = $row->name;
//echo "vocabulary_name - ".$vocabulary_name;
//echo "<br>";
//------------------------------------------
				}
				
				if (!empty($_REQUEST['node_type']))
				{
					$node_type = $_REQUEST['node_type'];
					//$log = drupal_import_nodes_xml($filename,$node_type);
					drupal_import_nodes_xml($filename,$node_type);
				}
				else
				{
					$message = "<span class='error'>node_type is empty...</span>";
					$message .= "<br>";
				}
			}
			else
			{
				$message = "<span class='error'>var filename is empty!!!!</span>";
				$message .= "<br>";
			}
		break;
//==========================================================================
		case new_vocabulary:
			if (!empty($_REQUEST['new_vocabulary']))//Создание нового словаря
			{
				if (!empty($_REQUEST['node_type']))
				{
					$node_type = $_REQUEST['node_type'];
					$vocabulary_name = $_REQUEST['new_vocabulary'];
					$vocabulary_vid = drupal_new_vocabulary($node_type,$vocabulary_name);
				}
				else
				{
					$message = "<span class='error'>new vocabulary, node_type is empty...</span>";
					$message .= "<br>";
				}
			}
			$form = view_form();
		break;
//==========================================================================
		case vocabulary_import:
			$form = view_form();
			//$form2 = view_form_vocabulary_import();
			if (!empty($_REQUEST['filename']))
			{
				$filename = $dir."/".$_REQUEST['filename'];
				if (!empty($_REQUEST['vocabulary_vid']))
				{
					$vocabulary_vid = $_REQUEST['vocabulary_vid'];
					//$log = drupal_import_termins_xml($filename, $vocabulary_vid);
					drupal_import_termins_xml($filename, $vocabulary_vid);
				}
				else
				{
					$message = "<span class='error'>import, var vocabulary_vid is empty...</span>";
					$message .= "<br>";
				}
			}
			else
			{
				$message = "<span class='error'>var filename is empty!!!!</span>";
				$message .= "<br>";
			}
		break;
//==========================================================================
		case delete:
			$form = view_form(); // вывод формы
			if (!empty($_REQUEST['filename']))
			{
				$filename=$dir."/".$_REQUEST['filename'];
				if (unlink ($filename))
				{
					$message = "Remove  ".$filename;
					$message .= "<br>";
					$redirect="<script>location.href='".$_SERVER['SCRIPT_NAME']."'</script>";
					echo $redirect;
				}
			}
			else
			{
				$message = "<span class='error'>var filename is empty!!!!</span>";
				$message .= "<br>";
			}
		break;
//==========================================================================
	  }//------------------------------ end switch


  }//--------------------------------- end elseif action
//=================================================================================

//====================
// FUNCTIONS
//====================

//-------------------------
// вывод загруженных файлов для импорта
//-------------------------
/*
function scan_import_folders($dir)
{

	echo "<form method=post name=form_import_files action='".$_SERVER['SCRIPT_NAME']."'>
<fieldset>
	<legend><b>Список файлов для импорта</b></legend>
		<div class='section'>";
echo "index of ".$dir;
echo "<br>";
	echo "<ul>";
	$handle  = opendir($dir);
	while (false !== ($filename = readdir($handle))) 
	{
		if (($filename!=".") && ($filename!=".."))
		{
			if (is_dir($dir."/".$filename)) 
			{ 
				$num_dir=$num_dir+1;
echo "+".$filename;
echo "<br>";
			}
//----------------------------------------------------------------------------------------------
			if (is_file($dir."/".$filename)) 
			{ 
				$num_file=$num_file+1;
//echo "<li>".$filename." <a href='".$_SERVER['SCRIPT_NAME']."?action=import_xml&filename=".$filename."'>импорт</a> |";
//echo "<a href='".$_SERVER['SCRIPT_NAME']."?action=delete&filename=".$filename."'>удалить</a></li>";
				echo "<input type=checkbox name=filename value='".$filename."'/>".$filename."<br>";
			}
		}
	}//----------------------- end while
	echo "
<select size=4 name=action onChange='javascript:document.forms.form_import_files.submit();'>
	<option value='' selected></option>
	<option value='import_xml'> import_xml</option>
	<option value='import_xml_albums'> import_xml_albums</option>
	<option value='delete'> delete</option>
</select>";
	echo "</ul>";
	print "<b> Directory: ".$num_dir."<br> Files: </b>".$num_file."<br>";
	echo "</div>
	</fieldset>
</form>";

   closedir ($handle);

} //-------------------------- end func
*/
function drupal_scan_import_folders($dir)
{
	$out = "";
	$out .= "index of ".$dir;
	$out .= "<br>";
	$out .= "<ul>";

	//$dir = "sites/default/files/imports";
	//$dir = "/mnt/disk2/temp";
	//$mask='\.*.css';
	$mask='\.*';
	$nomask = array('.', '..', 'CVS');
	$callback = 0;
	//$recurse = TRUE;
	$recurse = false;
	$key = 'filename';
	$min_depth = 0;
	$depth = 0;
	$files = file_scan_directory($dir, $mask, $nomask, $callback, $recurse, $key, $min_depth, $depth);
//echo "<pre>";
//print_r($files);
//echo "</pre>";
/*
Array
(
    [export_photogallery_image_nodes] => stdClass Object
        (
            [filename] => sites/default/files/imports/export_photogallery_image_nodes.xml
            [basename] => export_photogallery_image_nodes.xml
            [name] => export_photogallery_image_nodes
        )

)

*/
	foreach ($files as $file)
	{
		$out .= "<input type=radio name=filename value='".$file->basename."'/>".$file->basename.", ";
		$out .= "<a href='".$_SERVER['SCRIPT_NAME']."?action=delete&filename=".$file->basename."'>удалить</a>, ";
		$out .= "<a href='".$_SERVER['SCRIPT_NAME']."?action=test_xml&filename=".$file->basename."'>проверить</a><br>";
	}
	$out .= "</ul>";
	return $out;
} //-------------------------- end func


//-------------------------
// ФОРМЫ 
//-------------------------
function view_form()
{
	global $dir;
	$out="";
//------------------------------------- form
	//$out .= "<div id='info'>info messages</div>";
	$out .= "<form method=post name=form_nodes_import action='".$_SERVER['SCRIPT_NAME']."'>
<fieldset><legend><b>Параметры импорта</b></legend>";

	$out .= "<div class='section'>";
	$out .= drupal_scan_import_folders($dir); // вывод загруженных файлов для импорта
	$out .= "<a href='".$_SERVER['SCRIPT_NAME']."?action=upload'>загрузить</a><br>";
	$out .= "</div>";

//------------------------------------- taxonomy
	$out .= "<div class='section'><b>Словари таксономии.</b><br>";
	$out .= drupal_view_vocabulary_list(); //вывод имеющихся словарей таксономии
	$out .= "</div>";

	$out .= "<input type=radio name=action value='new_vocabulary'/>action, создать новый словарь с названием ";
	$out .= "<input type=text name=new_vocabulary value=''/><br>";
	//$out .= "<a href='".$_SERVER['SCRIPT_NAME']."?action=vocabulary_import'>импортировать термины</a><br>";
	$out .= "<input type=radio name=action value='vocabulary_import'/>action, импортировать термины<br>";
	$out .= "<input type=radio name=vocabulary_vid value=''/>не использовать таксономию<br>";

//------------------------------------- nodes
	$out .= "<div class='section'><b>Типы материалов.</b><br>";
	$out .= drupal_view_node_type();
	$out .= "</div>";
	$out .= "<input type=radio name=action value='import_xml'>action, import_xml<br>";
	
	$out .= "<input type=submit value='submit'>";
	$out .= "</fieldset></form>";

	return $out;
} //-------------------------- end func
//------------------------------------ 
//список типов материалов
//------------------------------------ 
function drupal_view_node_type()
{
	global $db_prefix;
	$out = "";
	$query = "SELECT * FROM ".$db_prefix."node_type;";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
		$out .= "<input type=radio name=node_type value='".$row->type."'/>".$row->type.", ".$row->name."<br>";
	}
	
	return $out;
} //-------------------------- end func

//------------------------------------ 
//список имеющихся словарей таксономии
//------------------------------------ 
function drupal_view_vocabulary_list()
{
	global $db_prefix;
	$out = "";
	$query = "SELECT * FROM ".$db_prefix."vocabulary;";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$out .= "<input type=radio name='vocabulary_vid' value='".$row->vid."'/>".$row->name."<br>";
	}
	//$out .= "<br>";
	return $out;
} //-------------------------- end func

/*
function view_form_vocabulary_import()
{
	$out = "";
	$out .= "<form method=post name=form_vocabulary action='".$_SERVER['SCRIPT_NAME']."'>";
	$out .= "<fieldset><legend><b>Импортировать термины</b></legend>";
	$out .= "<div class='section'>";
	global $db_prefix;
	$query = "SELECT * FROM ".$db_prefix."vocabulary;";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$out .= "<input type=radio name='vocabulary_vid' value='".$row->vid."'/>".$row->name."<br>";
	}
	$out .= "<input type=radio name=vocabulary_vid value=''/>Создать новый словарь с названием ";
	$out .= "<input type=text name=new_vocabulary value=''/><br>";
	$out .= "</div>";
	$out .= "</fieldset></form>";
	return $out;
} //-------------------------- end func
*/

function view_form_upload()
{
	global $dir;
	$out="";
//------------------------------------- upload form
	$out .= "
<form enctype='multipart/form-data' method=post name=form_upload action='".$_SERVER['SCRIPT_NAME']."'>
<fieldset><legend><b>Файл для импорта (формат XML)</b></legend>
		<div class='section'>
Директория импорта: <input type=text name=dir size=40 value='".$dir."'/><br>
Файл импорта: <input type=file name=import_file>
<input type=hidden name=action value='upload'>
<input type=submit value='Загрузить'>
		</div>";
	$out .= "</fieldset></form>";
	return $out;
} //-------------------------- end func

//-------------------------
// ЗАГРУЗИТЬ ФАЙЛ
//-------------------------
function upload_file($dir, $file_arr)
{
//echo "file_arr = <pre>";
//print_r($file_arr);
//echo "</pre>";
	global $message;
    if (file_exists($dir))
    {
		$res=0;
		$perms=substr(sprintf('%o', fileperms($dir)), -4);
        if (is_writable ($dir))
        {
		$message .= "-- Upload folder ".$dir.", <span class='ok'>is_writable</span>, ($perms)";
		$message .= "<br>";
                if(isset($file_arr))
                  {
                        $errors ="";
                        switch ($file_arr['error'])
                        {
                                case 0:
$message .= "-- <span class='ok'>UPLOAD_ERR_OK</span>, Ошибок не возникло.";
$message .= "<br>";
                                        if (is_uploaded_file($file_arr['tmp_name']))
                                        {
                                                if (move_uploaded_file($file_arr['tmp_name'], $dir."/".$file_arr['name']))
                                                {
$message .= $dir."/".$file_arr['name'].", size= ".$file_arr['size']." bytes <span class='ok'>move_uploaded_file ok</span>";
$message .= "<br>";
                                                }
                                                else
                                                {
							$errors .= "move_uploaded_file error";
                                                }
                                        }
					$res=1;
                                break;

                                case 1:
                                        $error = $file_arr['error'];
$errors .= 'Ошибка UPLOAD_ERR_INI_SIZE, Размер принятого файла превысил максимально допустимый размер, который задан директивой upload_max_filesize конфигурационного файла php.ini.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 2:
                                        $error = $file_arr['error'];
                                        $errors .= 'Ошибка UPLOAD_ERR_FORM_SIZE,  Размер загружаемого файла превысил значение MAX_FILE_SIZE, указанное в HTML-форме.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 3:
                                        $error = $file_arr['error'];
                                        $errors .= 'Ошибка UPLOAD_ERR_PARTIAL, Загружаемый файл был получен только частично.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 4:
                                        $error = $file_arr['error'];
                                        $errors .= 'Ошибка UPLOAD_ERR_NO_FILE,  Файл не был загружен.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 6:
                                        $error = $file_arr['error'];
                                        $errors .= 'Ошибка UPLOAD_ERR_NO_TMP_DIR, Отсутствует временная папка. Добавлено в PHP 4.3.10 и PHP 5.0.3.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 7:
                                        $error = $file_arr['error'];
                                        $errors .= 'Ошибка UPLOAD_ERR_CANT_WRITE, Не удалось записать файл на диск. Добавлено в PHP 5.1.0.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                                case 8:
                                        $error = $file_arr['error'];
$errors .= 'Ошибка UPLOAD_ERR_EXTENSION, PHP-расширение остановило загрузку файла. PHP не предоставляет способа определить какое расширение остановило загрузку файла; в этом может помочь просмотр списка загруженных расширений из phpinfo(). Добавлено в PHP 5.2.0.';
                                        $errors .= ' Код ошибки: ' . $error;
                                break;

                        }//------------------------ end switch
                        if (!empty($errors))
                          {
				$message .= "<span class=error>".$errors."</span>";
				$message .= "<br>";
                          }
                  }

        }
        else
        {
		$message .= "<span class='error'>Error</span>, upload folder ".$dir."("
.$perms."), <span class='error'>no is_writable</span><br>";
		$message .= "<br>";
        }//------------------------ end if
    }
    else
    {
		$message .= "<span class='error'>Error</span>, upload folder ".$dir
."<span class='error'>not exist</span><br>";
		$message .= "<br>";
	}//------------------------ end if
	return $res;
} //-------------------------- end func

//------------------------------------
// Проверить формат файла для импорта
//------------------------------------
function test_file_format($dir, $file_arr)
{
	global $message;
	$res=0;
	$filename = $dir."/".$file_arr['name'];
	$type = $file_arr['type'];
	if ($type == 'text/xml')
	{
		$message .= "<span class=\'ok\'>-- OK, формат файла XML</span>";
		$message .= "<br>";
		//echo $out;
/*
echo "<script>
	var info = document.getElementById('upload_info');
	alert(info.outerHTML);
	info.innerHTML = '".$out."';
</script>";
*/
		$res=1;
	}
	else
	{
		$message .= "<span class='error'>-- Error,  для импорта нужен XML файл!!!</span>";
		$message .= "<br>";
		if (unlink ($filename))
		{
			$message .= "Remove  ".$filename;
			$message .= "<br>";
		}
	}//------------------------------------- end elseif
	return $res;
} //-------------------------- end func

//------------------------------------
// Проверка файла импорта (подсчет нод, терминов)
//------------------------------------
function test_xml($filename)
{
	global $log;
	$xml = simplexml_load_file($filename);
	if ($xml == FALSE) 
	{
		exit("Failed to open ".$filename);
	}
//echo "<pre>";
//print_r ($xml);
//echo "</pre>";

//$num_items = 2;
//---------------------------------------------------------------------
	$n1=0;
	$num_nodes=0;
	foreach ($xml->album as $album)
	{
		$n1++;
//echo $n1.". ".$album[@name];
//echo "<br>";
		$n2=0;
//echo "		<ul>";
		foreach ($album->node as $node)
		{
			$n2++;
//echo $n2.". ".$node->title;
//echo "<br>";
		}
		$num_nodes = $num_nodes + $n2;
//echo "		</ul>";

	}//----------------- end foreach

	$num_albums=$n1;
	//$out = "";
	$log .= "В XML-файле найдено: "; 
	$log .= "<ul>";

	$log .= "альбомов - ".$num_albums; 
	$log .= "<br>";
	$log .= "изображений - ".$num_nodes; 
	$log .= "<br>";

	$log .= "</ul>";
//---------------------------------------------------------------------
	//return $out;
} //-------------------------- end func

function drupal_import_nodes_xml($filename, $node_type)
{
	global $log;
	global $db_prefix;
	$xml = simplexml_load_file($filename);
	if ($xml == FALSE) 
	{
		exit("Failed to open ".$filename);
	}
//echo "<pre>";
//print_r ($xml);
//echo "</pre>";
//$num_items = 2;
//---------------------------------------------------------------------
	$n1=0;
	$num_nodes=0;
	foreach ($xml->album as $album)
	{
		$n1++;
//echo $n1.". ".$album[@name];
//echo "<br>";
		$n2=0;
//echo "		<ul>";
		foreach ($album->node as $node)
		{
			$n2++;
//echo $n2.". ".$node->title;
//echo "<br>";
		}
		$num_nodes = $num_nodes + $n2;
//echo "		</ul>";

	}//----------------- end foreach

	$num_albums=$n1;
	//$log = "";
	$log .= "В XML-файле найдено: "; 
	$log .= "<ul>";

	$log .= "альбомов - ".$num_albums; 
	$log .= "<br>";
	$log .= "изображений - ".$num_nodes; 
	$log .= "<br>";

	$log .= "</ul>";
//---------------------------------------------------------------------

	//db_connect();
	
//---------------------- запрос материалов
	$query = "SELECT * FROM ".$db_prefix."node WHERE type='".$node_type."';";
echo $query;
echo "<br>";
	
	$num_nodes_db=0;

	//$node_res = mysql_query($query) or die("<font color=red>Query error: </font>".mysql_error());
	//$num_nodes_db = mysql_num_rows($node_res);

	$node_res = db_query($query);
	$node_arr=array();
	while ($row = db_fetch_object($node_res))
	{
		$num_nodes_db++;
		$node_arr[]=$row;
	}//---------------------- end while
//echo "1.node_arr<pre>";
//print_r($node_arr);
//echo "</pre>";

	$log .= "В базе данных найдено: "; 
	$log .= "<ul>";

	$log .= "материалов - ".$num_nodes_db; 
	$log .= "<br>";

	$log .= "</ul>";
//--------------------------------------------------------
	// Обновление или создание материала
	$num_node=0;
	foreach ($xml->album as $album)
	{
		foreach ($album->node as $node_xml)
		{
			$num_node++;
			//$log .= test_node($num_node,
			$test = test_node($num_node,
					$node_type,
					$node_xml,
					$node_arr);
						//$node_res);
			//mysql_data_seek($node_res, 0);
			if ($test == 1)
			{
				$log .= "в базе данных <span class='ok'>найден соответ. материал</span> "
."<a href='".$base_url."/node/".$test_row->nid."'>".$test_row->title."</a>";
				$log .= update_node(); //обновить ноду, если в XML более поздняя дата изменения изображения
				$log .= "<br>";
			}
			else
			{
				$log .= "в базе данных <span class='error'>нет соответствий</span>";
				$log .= "<br>";
				$log .= new_node($node_type,$node_xml);
//после создания нового материала нужно обновлять данные $node_arr, 
//выполнять select таблицы node 
//или выполнить проверку дубликатов материала перед созданием материала
			}

		}

	}//----------------- end foreach
//echo "llogg = ".$log;
	//return $log;
} //-------------------------- end func

/*
function db_connect()
{
	global $db_name;
	global $username;
	global $password;
	global $server;

	$db = mysql_connect ($server, $username, $password);
	if ($db)
	{
		mysql_query('SET NAMES utf8');

//character_set_client = latin1 / utf8
//mysql_query("SET CHARACTER_SET_CLIENT=utf8");

//character_set_connection = latin1 / utf8
//mysql_query("SET CHARACTER_SET_CONNECTION=utf8");

//character_set_database = latin1 / utf8

//character_set_results = latin1 / utf8
//character_set_server = latin1 / utf8

//collation_connection = latin1_swedish_ci / utf8_unicode_ci
//collation_database = latin1_swedish_ci / utf8_unicode_ci
//collation_server = latin1_swedish_ci / utf8_unicode_ci

		echo "-- <font color=green>Connect to the </font>".$server;
		echo "<br>";
//-----------------------------------------------------------
		if (!mysql_select_db($db_name))
		{
			echo "-- <font color=red>Dont select database </font>".$db_name;
			echo "<br>";
		}
	}
	else
  	{
		echo "-- <font color=red>Dont connect to the  </font>".$server;
		echo "<br>";
	}

} //-------------------------- end func
*/

//-----------------------------------
// Обновление или создание материала
//-----------------------------------
function test_node($num_node,
			$node_type,
			$node_xml,
			$node_arr)
			//$node_res)
{
//echo "2.node_arr<pre>";
//print_r($node_arr);
//echo "</pre>";
	global $base_url;
	global $log;
	$test=0;
	//$log = "";
$log .= "count(node_arr) == ".count($node_arr);
$log .= "<br>";
	$log .= $num_node.". Проверяем изображение с заголовком ".$node_xml->title;
	$log .= "<br>";

	//$num_rows = mysql_num_rows($node_res);
	//if ($num_rows > 0)
	//{
		//while ($row = mysql_fetch_assoc($node_res))
		for ($n1=0; $n1 < count($node_arr); $n1++)
		{
$log .= " - ".$n1."проверяем ".$node_xml->title." и ".$node_arr[$n1]->title;
$log .= "<br>";
			//if ($node_title == $row['title'])
			if ($node_xml->title == $node_arr[$n1]->title)
			{
				$test=1;
				$test_row=$node_arr[$n1];
			}
		}//---------------------- end while
/*
		if ($test == 1)
		{
			$log .= "в базе данных <span class='ok'>найден соответ. материал</span> "
."<a href='".$base_url."/node/".$test_row->nid."'>".$test_row->title."</a>";
			$log .= update_node(); //обновить ноду, если в XML более поздняя дата изменения изображения
			$log .= "<br>";
		}
		else
		{
			$log .= "в базе данных <span class='error'>нет соответствий</span>";
			$log .= "<br>";
			$log .= new_node($node_type,$node_xml);
//после создания нового материала нужно обновлять данные $node_arr, 
//выполнять select таблицы node 
//или выполнить проверку дубликатов материала перед созданием материала
		}
*/
	//}//---------------------- end if

	$log .= "<br>";
	$log .= "<br>";
	return $test;
} //-------------------------- end func

//-------------------------------------------------------------------
//обновить  материал, если в XML более поздняя дата изменения изображения
//-------------------------------------------------------------------
function update_node()
{
$output = "";
$output .= ", пропускаем импорт...";
//$output .= "обновить материал";
//$output .= "<br>";

	return $output;
} //-------------------------- end func

//-------------------------------------------------------------------
//Создать  материал из  XML-полей изображения
//-------------------------------------------------------------------
function new_node($node_type,$node_xml)
{
//echo "node_xml = <pre>";
//print_r($node_xml);
//echo "</pre>";
	$out="";
	$test_tid = 0;//по умолчанию не использовать таксономию

	global $vocabulary_vid, $vocabulary_name;
	
//$out .= "vocabulary_vid = ".$vocabulary_vid;
//$out .= "<br>";
//$out .= "vocabulary_name = ".$vocabulary_name;
//$out .= "<br>";

	if (!empty($vocabulary_vid))
	{
		if (!empty($node_xml->termin))
		{
//echo "!empty = ".$node_xml->termin;
//echo "<br>";
//----------------------- проверка существования термна
// узнать tid для существующего термина или создать новый термин
			$test_tid = drupal_test_termin($vocabulary_vid, 
						$node_xml->termin, 
						$node_xml->termin[@tid]);
			if ($test_tid==0)
			{
				$out .= "<span class='error'>";
				$out .= "В словаре ".$vocabulary_name.", нет термина";
				$out .= "</span> ".$node_xml->termin;
				$out .= "<br>";
//$out .= "Добавление в словарь ".$vocabulary_name.", термина ".$node_xml->termin;
				$out .= "Пропускаем импорт для ".$node_xml->title;
				$out .= "<br>";
				return $out;
			}

			if ($test_tid > 0)
			{
				$out .= "В словаре ".$vocabulary_name
.", <span class='ok'>найден термин </span>".$node_xml->termin.", (tid=".$test_tid.")";
				$out .= "<br>";
			}

		}
	}

	$out .= "Создать  материал";
	$out .= "<br>";
/*
SimpleXMLElement Object
(
    [@attributes] => Array
        (
            [num] => 1
            [nid] => 7
        )

    [status] => 1
    [created] => 03-May-2012 01:08:00
    [changed] => 24-Oct-2012 14:55:24
    [title] => Монахиня трапписткого ордена (The Trappistine), реклама ликера
    [termin] => Альфонс Муха
    [author] => Альфонс Муха
    [field_title_value] => Монахиня трапписткого ордена (The Trappistine), реклама ликера, 1897
    [body] => http://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BF%D0%BF%D0%B8%D1%81%D1%82%D1%8B
"Монахи некоторых северных монастырей зарабатывали на жизнь изготовлением ликёров, а в Бельгии — известного пива."
    [year] => 1897
    [style] => Ар Нуво (Модерн)
    [genre] => портрет
    [technique] => Литография
    [preview_img] => /content/albums/gallery_images/imagecache/preview_gallery_img/gallery_images/the-trappistine-1897.jpg
    [big_img] => /content/albums/gallery_images/imagecache/w1024/gallery_images/the-trappistine-1897.jpg
    [original_img] => SimpleXMLElement Object
        (
        )

)
*/

	$node = new stdClass();
	$node->type = $node_type;
	$node->title = $node_xml->title;

	//if (!empty($node_xml->teaser))
	//{
		$node->teaser = $node_xml->teaser;
	//}

//--------------------------------
	$body = "";

	if (!empty($node_xml->body))
	{
		$body .= $node_xml->body;
	}

	$body .= "<termin>".$node_xml->termin."</termin>";
	$body .= "\n";

	$body .= "<author>".$node_xml->author."</author>";
	$body .= "\n";

	$body .= "<field_title_value>".$node_xml->field_title_value."</field_title_value>";
	$body .= "\n";

	$body .= "<year>".$node_xml->year."</year>";
	$body .= "\n";

	$body .= "<style>".$node_xml->style."</style>";
	$body .= "\n";

	$body .= "<genre>".$node_xml->genre."</genre>";
	$body .= "\n";

	$body .= "<technique>".$node_xml->technique."</technique>";
	$body .= "\n";

	$body .= "<preview_img>".$node_xml->preview_img."</preview_img>";
	$body .= "\n";

	$body .= "<big_img>".$node_xml->big_img."</big_img>";
	$body .= "\n";

	$body .= "<original_img>".$node_xml->original_img."</original_img>";
	$body .= "\n";

	$body .= "<created>".$node_xml->created."</created>";
	$body .= "\n";

	$body .= "<changed>".$node_xml->changed."</changed>";
	$body .= "\n";

	$node->body = $body;
//--------------------------------

	if ($test_tid > 0)
	{
		$node->taxonomy[] = array($test_tid);
	}

	$node->field_author[]['value'] = $node_xml->author;
	$node->field_title[]['value'] = $node_xml->field_title_value;
	$node->field_year[]['value'] = $node_xml->year;
	$node->field_style[]['value'] = $node_xml->style;
	$node->field_genre[]['value'] = $node_xml->genre;
	$node->field_technique[]['value'] = $node_xml->technique;

	//$node->created = $node_xml->created[@timestamp];
	//$node->changed = $node_xml->changed[@timestamp];
	//$node->timestamp

	$node->uid = 1;                  // id автора
	$node->format = 2;
	
	if (!empty($node_xml->status))
	{
		$node->status = $node_xml->status;
	}
	else
		$node->status = 0;     // 1 - опубликовано, 0 - нет

 	node_save($node);

	$out .= "Добавлен материал "
." <a href='".$base_url."/node/".$node->nid."' target=_blank><b>".$node->title."</b></a> в раздел <b>"
.$node_xml->termin."</b>";
	$out .= "<br>";

/*
echo "<pre>";
print_r($node);
echo "</pre>";
stdClass Object
(
    [type] => photogallery_image
    [title] => SimpleXMLElement Object
        (
            [0] => Король Кастилии Альфонсо
        )

    [teaser] => SimpleXMLElement Object
        (
            [0] => 
Король Кастилии Альфонсо - поэт и музыкант
view img_original


        )

    [body] => SimpleXMLElement Object
        (
            [0] => 
http://www.liveinternet.ru/community/2281209/post115196341/
        )

    [taxonomy] => Array
        (
            [0] => Array
                (
                    [0] => SimpleXMLElement Object
                        (
                            [0] => 87
                        )

                )

        )

    [uid] => 1
    [status] => SimpleXMLElement Object
        (
            [0] => 1
        )

    [book] => Array
        (
            [mlid] => 
        )

    [field_img1_gallery] => Array
        (
            [0] => 
        )

    [field_preview_img] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )

    [field_big_img] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )

    [field_original_img] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )

    [field_title] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )

    [field_num_page] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )


    [field_create_date] => Array
        (
            [0] => Array
                (
                    [value] => 
                )

        )



    [is_new] => 1
    [log] => 
    [created] => 1352030830
    [changed] => 1352030830
    [timestamp] => 1352030830
    [format] => 0
    [vid] => 253
    [language] => 
    [comment] => 0
    [promote] => 0
    [moderate] => 0
    [sticky] => 0
    [tnid] => 0
    [translate] => 0
    [nid] => 253
)

*/
	return $out;
} //-------------------------- end func

//------------------------------
//проверка существования термна
//------------------------------
function drupal_test_termin($vid, 
			$name, 
			$tid)
{
	//$log .= "Ищем в словаре ".$name.", (vid=".$vid.") термин ".$termin.", (tid=".$tid.")";
	//$log .= "<br>";
	
	global $log;
	global $db_prefix;
	$query = "SELECT * FROM ".$db_prefix."term_data WHERE vid=".$vid." AND name='".$name."';";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	while($row = db_fetch_object($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		$test_tid = $row->tid;
	}//-------------------- end while
	return $test_tid;

} //-------------------------- end func

function drupal_new_vocabulary($node_type,$vocabulary_name)
{
	global $db_prefix;
	$query="INSERT INTO ".$db_prefix."vocabulary 
(`vid`, 
`name`, 
`description`, 
`help`, 
`relations`, 
`hierarchy`, 
`multiple`, 
`required`, 
`tags`, 
`module`, 
`weight`) VALUES (NULL, '".$vocabulary_name."', NULL, '', '0', '0', '0', '0', '0', '', '0');
";
//echo $query;
//echo "<br>";
	$res=db_query($query);

//------------------------------------------ определить vid нового словаря
	$query="SELECT vid FROM ".$db_prefix."vocabulary WHERE name='".$vocabulary_name."';";
//echo $query;
//echo "<br>";
	$res = db_query($query);
	$row = db_fetch_object($res);
//echo "row = <pre>";
//print_r($row);
//echo "</pre>";
	$vid = $row->vid;
	
	$query="INSERT INTO ".$db_prefix."vocabulary_node_types (`vid`, `type`) VALUES ('".$vid."', '".$node_type."');";
//echo $query;
//echo "<br>";
	$res = db_query($query);
//------------------------------------------

	return $vid;
} //-------------------------- end func

function drupal_import_termins_xml($filename, $vid)
{
	global $log;
	global $db_prefix;
//---------------------- получить уже существующие в базе термины
	$query = "SELECT tid, name, description FROM ".$db_prefix."term_data WHERE vid=".$vid.";";
//echo $query;
//echo "<br>";
	$res = db_query($query);

	$db_termin_arr="";
	while ($row = db_fetch_object($res))
	{
		$db_termin_arr[]=$row;
	}
//echo "db_termin_arr = <pre>";
//print_r($db_termin_arr);
//echo "</pre>";
	
//---------------------- получить термины из XML-файла
	$xml = simplexml_load_file($filename);
	if ($xml == FALSE) 
	{
		exit("Failed to open ".$filename);
	}
//echo "<pre>";
//print_r ($xml);
//echo "</pre>";
	
	//$out = "";
	$log .= "<ul>";
	//сравнить термин из xml-файла с терминами словаря 
	$log .= compare_termins($xml,0,$db_termin_arr,$vid);
	$log .= "</ul>";
	//return $out;
} //-------------------------- end func


//-------------------------------------
//рекурсивно сравнить термин из и xml-файла с терминами словаря 
//-------------------------------------
function compare_termins($xml,$tid_parent, 
				$db_termin_arr, 
				$vid)
{
	foreach ($xml->taxonomy_vocabulary->termin as $termin)
	{
		$num++;
		if ((string)$termin[@tid_parent] == $tid_parent)
		{
//$out .= "(string)termin[@tid_parent], ".(string)$termin[@tid_parent];
//$out .= " == ";
//$out .= "tid_parent, ".$tid_parent;
//$out .= "<br>";
			$out .= "<li>";
			$out .= $termin->term_name;
			$out .= "<ul>";
			
//----------------------- создание термина, если не существует в базе данных
			$out .= drupal_test2_termin($xml,$db_termin_arr,
							$termin->term_name,
							$termin[@tid_parent],
							$vid);
//------------------------------------------------

			$out .= compare_termins($xml,$termin[@tid],$db_termin_arr,$vid);
			$out .= "</ul>";
			$out .= "</li>";
		}
	}//----------------- end foreach
	return $out;
} //-------------------------- end func

//-------------------------------------
//создание термина, если не существует
//-------------------------------------
function drupal_test2_termin($xml, 
				$db_termin_arr,
				$term_name,
				$tid_parent,
				$vid)
{
	global $db_prefix;
	$termin_exist = 0;
	for ($n1=0; $n1<count($db_termin_arr); $n1++)
	{
		//$out .= $n1.". ";
		//$test1 = strtolower($db_termin_arr[$n1]->name);
		//$test2 = strtolower($termin->term_name);
		//$out .= $test1.", ".$test2;
		//$out .= "<br>";
		$test1 = $db_termin_arr[$n1]->name;
		$test2 = $term_name;
		if ($test1 == $test2)
		{
$out .= "<span class='warning'>".$test1." == ".$test2.", пропускаем...</span>";
$out .= "<br>";
			$termin_exist = 1;
		}
	}//------------------- end for
	
	if ($termin_exist == 0)
	{
		$query = "INSERT INTO ".$db_prefix."term_data 
(`tid`, `vid`, `name`, `description`, `weight`) 
VALUES (NULL, '".$vid."', '".$term_name."', NULL, '0');";
//echo $query;
//echo "<br>";
		$res = db_query($query);

		$query = "SELECT tid FROM ".$db_prefix."term_data WHERE name='".$term_name."';";
//echo $query;
//echo "<br>";
		$res = db_query($query);
		$row = db_fetch_object($res);
//echo "<pre>";
//print_r($row);
//echo "</pre>";

//---------- определить имя родительского термина, а затем tid родительского термина
		$parent_name="";
		if ($tid_parent > 0)
		{
			foreach ($xml->taxonomy_vocabulary->termin as $termin)
			{
				if ((string)$termin[@tid] == $tid_parent)
				{
					$parent_name=$termin->term_name;
				}
			}
			if (!empty($parent_name))
			{
				$query = "SELECT tid FROM ".$db_prefix."term_data WHERE name='".$parent_name."';";
//echo "определить tid родительского термина - ".$query;
//echo "<br>";
				$res_parent = db_query($query);
				$row2 = db_fetch_object($res_parent);
				$tid_parent = $row2->tid;
			}
			else
				$tid_parent = 0;
		}
//----------------------------------------------------------------------------------
		$query = "INSERT INTO ".$db_prefix."term_hierarchy (`tid`, `parent`) VALUES 
('".$row->tid."', '".$tid_parent."');";
//echo $query;
//echo "<br>";
		$res = db_query($query);
	}//------------------------------------ end if

	return $out;
}//------------------------ end func

?>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<style>
legend
{
	color:green;
	font-size:16px;
}
.section
{
	border:1px solid;
	margin:20px;
	padding:5px;
	width:870px;
}
.param
{
	color:darkblue;
}
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	color:green;
}
.warning
{
	color:blue;
}
#info_message
{
	border: 1px solid;
	min-height: 30px;
/*
	background:darkred;
	position:absolute;
	top:20px;
	right:20px;
    float: right;
    width: 250px;	
*/
}
#form
{
}
#log
{
	border: 1px solid;
	min-height: 100px;
}
	</style>
</head>
<body>

<div id='info_message'><?php echo $message; ?></div>
<div id='form'><?php echo $form; ?></div>
<div id='form2'><?php echo $form2; ?></div>
<div id='log'><?php echo $log; ?></div>

</body>
</html>

