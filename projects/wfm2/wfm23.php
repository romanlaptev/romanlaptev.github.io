<?php
// Добавлять в отчет все PHP ошибки
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//***************************************
// MAIN 
//***************************************
echo "<pre>";
print_r($_REQUEST);
//print_r($_SERVER);
echo "</pre>";
$server_root="http://".$_SERVER['SERVER_NAME'];

if ( !empty($_REQUEST['action']))
{
	$action = $_REQUEST['action']; 
}
else
{
	$action=""; 
}

if ( !empty($_REQUEST['dir_path']) )
{
	$dir_path = $_REQUEST['dir_path']; 
	$fs_path = $dir_path;
}
else
{
	if ( !empty($_REQUEST['init_dir']) )
	{
		$fs_init_dir = $_REQUEST['init_dir'];
		$dir_path = $fs_init_dir; 
		$fs_path = $dir_path;
	}
	else
	{
		$fs_init_dir = dirname(__FILE__);
		//$fs_init_dir = $_SERVER['DOCUMENT_ROOT'];
		$dir_path = $fs_init_dir; 
		$fs_path = $dir_path;
	}
}

if ($dir_path == "/")
{
	$dir_path = "";
}

$log = "";
$html_dialog = "";
$html_editor = "";

//****************************************
// Загрузить файл в текущий каталог
//****************************************
if ($action == "select_upload")
{
	$upload_max_filesize = ini_get('upload_max_filesize'); 
	$html_dialog = view_form_upload( $upload_max_filesize );
}// -------------------end if action upload

if ($action == "upload")
{
//echo "<pre>";
//print_r($_FILES);
//echo "</pre>";
    $perms=substr(sprintf('%o', fileperms($fs_path)), -4);
	if (is_writable($fs_path))
	{
$log .= "write in $fs_path ($perms) ";
        $file_arr = $_FILES["upload_file"];
		$errors ="";
		switch ($file_arr['error'])
		{
		        case 0:
$errors .= "UPLOAD_ERR_OK, Ошибок не возникло, файл был успешно загружен на сервер.";
$errors .= ' Код ошибки: ' . $file_arr['error'];
					if ( is_uploaded_file ($file_arr['tmp_name']) )
					{
						$uploaded_file = $fs_path."/".$file_arr['name'];
						if ( move_uploaded_file( $file_arr['tmp_name'], $uploaded_file ) )
						{
$log .= "<div class='ok'>".$file_arr['name'].", size= ".$file_arr['size']." bytes upload successful</div>";
						}
						else
						{
$log .= "<div class='error'>".$file_arr['name'].", size= ".$file_arr['size']." bytes not upload</div>";
						}
					}
		        break;

				case 1:
						$error = $file_arr['error'];
$errors .= 'Ошибка UPLOAD_ERR_INI_SIZE, Размер принятого файла превысил максимально допустимый размер, который задан директивой upload_max_filesize конфигурационного файла php.ini.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 2:
$errors .= 'Ошибка UPLOAD_ERR_FORM_SIZE,  Размер загружаемого файла превысил значение MAX_FILE_SIZE, указанное в HTML-форме.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 3:
$errors .= 'Ошибка UPLOAD_ERR_PARTIAL, Загружаемый файл был получен только частично.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 4:
$errors .= 'Ошибка UPLOAD_ERR_NO_FILE,  Файл не был загружен.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 6:
$errors .= 'Ошибка UPLOAD_ERR_NO_TMP_DIR, Отсутствует временная папка. Добавлено в PHP 4.3.10 и PHP 5.0.3.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 7:
$errors .= 'Ошибка UPLOAD_ERR_CANT_WRITE, Не удалось записать файл на диск. Добавлено в PHP 5.1.0.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

				case 8:
$errors .= 'Ошибка UPLOAD_ERR_EXTENSION, PHP-расширение остановило загрузку файла. PHP не предоставляет способа определить какое расширение остановило загрузку файла; в этом может помочь просмотр списка загруженных расширений из phpinfo(). Добавлено в PHP 5.2.0.';
$errors .= ' Код ошибки: ' . $file_arr['error'];
				break;

		}//------------------------ end switch
$log .= $errors;

	}
	else 
	{
$log .= "<div class='error'>Cannot write in $fs_path ($perms)</div>";
	}


}// -------------------end if action upload

# ****************************************
# удаление выбранных файлов и папок
# ****************************************
if ($action == "delete")
{
		if ( !empty($_REQUEST['foldername']) )
		{
				$n2 = count($_REQUEST['foldername']);
				for ($n1=0; $n1 < $n2; $n1++)
				{
					$foldername =  $_REQUEST['foldername'][$n1];
					if (!rmdir ($foldername))
					{
						$log .= "<span class='error'>cant remove </span> $foldername <br>\n";
						$res = false;
						$res = RemoveTree($foldername);
						if ($res)
						{
							$log .= "<span class='ok'>remove tree </span> $foldername <br>\n";
						}
						else
							$log .= "<span class='error'>cant rmdir </span> $foldername <br>\n";
					}
					else
					{
						$log .= "<span class='ok'>Delete </span> $foldername  <br>\n"; 
					}
				} // ------------------ end for
		}//------------ end if

		//---------------------------------------------------------------------
		if ( !empty($_REQUEST['filename']) )
		{
				$n2 = count($_REQUEST['filename']);
				for ($n1=0; $n1<$n2; $n1++)
				{
					$filename = $_REQUEST['filename'][$n1];
					if (!unlink ($filename))
					{
						$log .= "<span class='error'>cant remove </span> $filename <br>\n";
					}
					else
					{
						$log .= "<span class='ok'>Delete</span> $filename  <br>\n"; 
					}
				} // ------------------ end for
		}//------------ end if

}// -----------------end if action delete


// ****************************************
// переименовать файл
// ****************************************
if ($action == "rename")
{
	if (isset($_REQUEST['filename']))
	{
		$filename=$_REQUEST['filename']; 
		if ( empty($_REQUEST['dir_path']) )
		{
			$dir_path="";
		}
		$html_dialog = view_form_rename( $dir_path, $filename );
	}
	else
	{
		$log .= "<span class='error'>filename undefined...</span>";
	}
}//--------------------------------end if action rename

if ($action == "change_name")
{
	if (!empty($_REQUEST['old_name']))
	  {
		$oldfile = $dir_path."/".$_REQUEST['old_name']; 
	  }
	else
	  {
		$log .= "<span class='error'>old name undefined... </span>";
	  }

	if (!empty($_REQUEST['new_name']))
	  {
		$newfile = $dir_path."/".$_REQUEST['new_name']; 
	  }
	else
	  {
		$log .= "<span class='error'>newfile undefined... </span>";
	  }

	if ( !empty($oldfile) && !empty($newfile) )
	{
		if (rename ($oldfile, $newfile))
		{
			$log .= "<span class='ok'>Rename</span> $oldfile to $newfile <br>\n";
		}
		else
		 	$log .= "<span class='error'>can't rename </span> $oldfile <br>\n";
	}
}//--------------------------------------end if action change_name

// ****************************************
//Создать каталог
// ****************************************
if ($action == "new_folder")
{
	$html_dialog = view_form_new_folder();
}// -------------------------------end if action

if ($action == "mkdir")
{
	if (isset($_REQUEST['newfoldername']))
	{
		$foldername = $_REQUEST['newfoldername']; 
		$foldername = $fs_path."/".$foldername; 
		$perms=substr(sprintf('%o', fileperms($fs_path)), -4);

		$mode = 0777;
		$recursive = true;
		if (mkdir ($foldername, $mode, $recursive))
		{
			$log .= "<div><span class='ok'>Mkdir</span> $foldername </div>\n";
		}
		else
		{
		 	$log .= "<div><span class='error'>cant mkdir </span> "
.$_REQUEST['newfoldername']." in $fs_path ($perms)</div>\n";
		}
	}
	else
	{
		$log .= "<div class='error'>folder name undefined...</div>";
	}

}// -------------------------------end if action mkdir

// ****************************************
// изменить права доступа
// ****************************************
if ($action == "chmod")
  {
	if ( !empty($_REQUEST['chmod_file']) )
	{
		$filename = $_REQUEST['chmod_file']; 
		if ( !empty($_REQUEST['rights']) )
		{
			if ( !empty($_REQUEST['files']) )
			{
//---------- определить индекс файла для смены прав, а затем права для замены
				$n2 = count($_REQUEST['files']);
				for ($n1=0; $n1 < $n2; $n1++)
				{
					$item =  $_REQUEST['files'][$n1];
					if ( $item == $filename )
					{
//echo "index".$n1;
//echo "<br>";
//echo "file - ". $_REQUEST['files'][$n1];;
//echo "<br>";
						$rights = $_REQUEST['rights'][$n1];
//echo "new right - ".$rights;
//echo "<br>";
						if (chmod ($filename, octdec($rights)))
						{
							$log .= "<span class='ok'>changed rights success for $filename</span>";
						}
						else
						{
							$log .= "<span class='red'><h2> changed rights failed for $filename</h2></span>";
						}

					}
				} // ------------------ end for
//--------------------------------------------------------------------------------------------
			}
			else
			{
				$log .= "<span class='error'>files undefined for chmod $filename</span>";
			}
		}
		else
		{
			$log .= "<span class='error'>rights undefined for chmod $filename</span>";
		}
	}
	else
	{
		$log .= "<span class='error'>cmod filename undefined...</span>";
	}

}// ---------------------end if action chmod

// ****************************************
//Редактировать текстовую форму
// ****************************************
if ($action == "edit")
{
	//****************************************
	// Извлекаем параметры из запроса
	//****************************************
	if (isset($_REQUEST['filename']))
	{
		$filename = $_REQUEST['filename']; 
		$full_filename = $dir_path."/".$filename; 
	//	$filename=rawurlencode($filename);
	}
	else
	{
		$log .= "<span class='error'>filename undefined...</span>";
	}
	  
	$file = fopen( $full_filename, "r+");
	if ( !$file )
	{
		$log .= "<span class='error'>fopen error in $full_filename</span>";
	}
	else
	{
		//$file_content = fread ($file, filesize($full_filename) );
		$file_content = file_get_contents( $full_filename );
		if ( $file_content )
		{
			// Заменить html special chars (кавычки, слеши...) на код, для правильного отображения в форме
			//$textbox =  htmlspecialchars ($file_content);
			$textbox = $file_content;
			$html_editor = view_edit_file( $full_filename, $textbox );
		}
		else
		{
			$log .= "<span class='error'>file_get_contents() error $full_filename </span>";
		}

	}
	fclose ($file);

}// -------------------------------end if action edit

// ****************************************
// Сохранить текстовую форму в файл
//****************************************
if ($action == "save_changes")
{
	//****************************************
	// Извлекаем параметры из запроса POST
	//****************************************
	if (isset($_POST['full_filename']))
	{
		$filename=$_POST['full_filename']; 
		//		$filename=rawurlencode($filename);

		if (isset ($_POST['textbox']) )
		{
			$textbox=$_POST['textbox']; 
			//echo "magic_quotes_gpc (экранирование кавычек в тексте формы) = ".get_magic_quotes_gpc();
			if (get_magic_quotes_gpc()) 
			{
				// отмена экранирования кавычек в тексте формы
				$textbox = stripslashes($textbox);
			}

		} 
		else
		{
			$log .= "<span class='error'>var textbox is not set...</span>";
		}

		if (isset ($_POST['backup_copy']) )
		{
		// ****************************************
		//создать резервную копию файла
		//****************************************
			if (!copy ($filename, $filename.'.bak')) 
			{
				$log .= "<span class='error'>failed to copy $file...</span>";
			}
		}

//$textbox=htmlspecialchars ($textbox);
//print "textbox= ".$textbox."<br>";
		//Запись переменной (отредактированое содержимое формы) в файл
	/*
		$file = fopen ($filename,"w");
		if ( !$file )
		{
			$log .= "<span class='error'>write error in $filename</span>";
		}
		else
		{
			fwrite ($file, $textbox);
		}
		fclose ($file);
	*/
		$num_bytes = file_put_contents ($filename, $textbox);
		if ( $num_bytes)
		{
			$log .= "<span class='ok'>Write $num_bytes in $filename</span>";
		}
		else
		{
			$log .= "<span class='ok'>Write $num_bytes in $filename</span>";
		}

	}
	else
	{
		$log .= "<span class='error'>filename undefined...</span>";
	}

}// -----------------------end if action save_changes

	// Сформировать индексную страницу текущего каталога
	$left_panel = filelist ( $fs_path );  
	$right_panel = "";//filelist ( $fs_path );  
	view_page( $left_panel, $right_panel );





//======================================= FUNCTIONS 
function view_page( $left_panel, $right_panel)
{
	global $html_dialog;
	global $html_editor;
	global $log;
echo <<<EOF
<html>
<head>
	<meta http-equiv=Expires content=0>
	<meta http-equiv=Pragma content=no-cache>
	<title>web file-manager</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/wfm.css" type="text/css">
	<script src="js/wfm.js"></script>
</head>
<body>
	<div class="row log" id="log-messages">$log</div>

	<div class="row dialog">
$html_dialog
	</div>

	<div class="row editor">
$html_editor
	</div>

	<div class="row">
		<div class="panel">
$left_panel
		</div> <!-- end panel -->

		<div class="panel">
$right_panel
		</div> <!-- end panel -->
	</div> 

</body>
</html>
EOF;
}


function view_filelist( $path_html, $up, $html_filelist)
{
return '
<form name="form_filelist" method="post" action="" target="">
	<div class="row">
		<a href="?init_dir=/">[root]</a>&nbsp;
		<a href="?dir_path='.$up.'">[up]</a>
	</div>
	<div class="row">
		Index of <b>'.$path_html.'</b>
	</div>

	<div class="row file-action">
		<input type=button onClick="javascript:select_checkbox();" value="select all files">
		<input type=button onClick="javascript:clear_checkbox();" value="clear all">
		<input type=submit name="action" value="new_folder">
		<input type=submit name="action" value="delete">
		<input type=submit name="action" value="select_upload">
	</div>

	<div class="row head-filelist">
		<div class="columns  col-action">
			<b>v</b>
		</div>

		<div class="columns col-file">
			<b> file </b>
		</div>

		<div class="columns col-filesize">
			<b> filesize </b>
		</div>

		<div class="columns col-fileperms">
			<b> fileperms </b>
		</div>

		<div class="columns col-filegroup">
			<b> filegroup </b>
		</div>

		<div class="columns col-fileowner">
			<b> fileowner </b>
		</div>
							       
		<div class="columns col-filetime">
			<b> filemtime </b>
		</div>
	</div><!-- end head filelist-->

	<div class="row filelist">'.$html_filelist. '</div>

</form>
';
}//-------------- end func

function view_file_attr( $dir_path, $file, $file_attr )
{
	$size_kb = $file_attr["size_kb"];
	$size_mb = $file_attr["size_mb"];
	$octal_perms = $file_attr["octal_perms"];
	$full_perms_info = $file_attr["full_perms_info"];
	$filegroup = $file_attr["filegroup"];
	$fileowner = $file_attr["fileowner"];
	$filetime = $file_attr["filetime"];
return '
<div class="columns col-filesize">
	<div class="filesize">'.	$size_mb.' Mb ('.$size_kb.' Kb)</div>
</div>
<div class="columns col-fileperms">
	<div class="fileperms">
		<p class="full-perms">'.$full_perms_info.'</p>
		<div class="fileperms-info">
				<input type="text" size="3" name="rights[]" value="'.$octal_perms.'">
				<input type="hidden" name="files[]" value="'.$dir_path.'/'.$file.'">
				<input type="radio" name="chmod_file" value="'.$dir_path.'/'.$file.'">
				<input type="submit" name="action" value="chmod">
		</div>
	</div>
</div>

<div class="columns col-filegroup">
	<div class="filegroup">'.$filegroup.'</div>
</div>
<div class="columns col-fileowner">
	<div class="fileowner">'.$fileowner.'</div>
</div>
<div class="columns col-filetime">
	<div class="filetime">'.$filetime.'</div>
</div>
';
}//---------------------- end func

function view_file_info( $file, 
						$num_file, 
						$url, 
						$local_url, 
						$dir_path, 
						//$fs_path,
						$filename,
						$file_attr,
						$line_class
						)
{
	//global $fs_init_dir;
	$html= "
<div class='$line_class row filelist-row'>
		<div class='columns col-action'>
			<input type='checkbox' name='filename[]' value='$dir_path/$filename'>
		</div>
		<div class='columns col-file'>
			<div class='file'>".$file."</div>
			<div class='file-action' id='file".$num_file."'>
				<a href='$url' target=_blank>open http</a>
				<a href='$url' download=''>download file</a>
<!--
				<a href='$local_url' target=_blank>file</a>
				<br>
<a href='?action=test_delete&dir_path=$dir_path&filename=$filename'> delete </a>
-->
<a href='?action=edit&dir_path=$dir_path&filename=$filename' target=''> edit </a>
<a href='?action=rename&dir_path=$dir_path&filename=$filename'> rename </a>
			</div>
		</div>
";
	$html .= view_file_attr( $dir_path, $file, $file_attr );
	$html .=  "</div>";
	return $html;
}//-------------- end func


function view_folder_info( $file, 
						$num_file, 
						$url, 
						$local_url, 
						$dir_path, 
						//$fs_path,
						$filename,
						$file_attr,
						$line_class
						)
{
	//global $fs_init_dir;
	$html = "
	<div class='$line_class row filelist-row'>
		<div class='columns col-action'>
			<input type='checkbox' name='foldername[]' value='$dir_path/$filename'>
		</div>
		<div class='columns col-file'>
			<div class='folder'>
<a href='?dir_path=$dir_path/$filename'> + <b>$file</b></a>
			</div>
			<div class='file-action'>
				<a href='$url' target=_blank>open http</a>
<!--
				<a href='$local_url' target=_blank>file</a>
				<br>
				<a href='?action=test_delete&dir_path=$dir_path&filename=$filename'> delete </a>
-->
				<a href='?action=rename&dir_path=$dir_path&filename=$filename'> rename </a>
			</div>
		</div>";
	$html .= view_file_attr( $dir_path, $file, $file_attr );
	$html .=  "</div>";
	return $html;
}//-------------- end func

function view_form_rename( $dir_path, $filename )
{
return '
<form name=form_rename method=post action="">
	<div class="modal hide" id="modal-rename" role="dialog" tabindex="-1">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h3>change filename</h3>
		</div>
		<div class="modal-body">
			<div class="pull-left">
<input type="hidden" name="old_name" value="'.$filename.'">
<div>
enter new name: '.$dir_path.'/<input type="text" name="new_name" value="'.$filename.'">
<input type="hidden" name="dir_path" value="'.$dir_path.'">
</div>
			</div>
			<div class="pull-left">
<!--
				<a href="#" class="btn btn-primary action-btn">rename</a>
-->
<input type=hidden name="action" value="change_name">
<input type="submit" value="rename">
			</div>
		</div>
	</div>
</form>
';
}//-------------- end func

function view_form_new_folder()
{
return '
<form name="form_new_folder" method="post" action="">
	<div 
class="modal hide fade" 
id="modal-mkdir" 
role="dialog" 
tabindex="-1" 
aria-labelledby="myModalLabel" 
aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h3 id="myModalLabel">create new folder</h3>
		</div>
		<div class="modal-body">
			<div class="pull-left">
enter folder name: 
<input type="text"  name="newfoldername" value="newfolder">
			</div>
			<div class="pull-left">
<!--
				<a href="#" class="btn btn-primary action-btn">create</a>
-->
<input type=hidden name=action value="mkdir">
<input type=submit value="create">
			</div>
		</div>
	</div>

</form>
';
}//-------------- end func

function view_form_upload( $upload_max_filesize )
{
return '
	<div class="row upload-action">
		<form method="post" enctype="multipart/form-data" action="" target="">
			<input type="file" name="upload_file" size="30">
			<input type="hidden" name="action" value="upload">
<!--
			<input name="MAX_FILE_SIZE" value="512" type="hidden"/> 
-->
			<input type="submit" value="upload">
			upload_max_filesize = '.$upload_max_filesize.'
		</form>
	</div>
';
}//-------------- end func

function view_edit_file( $full_filename, $textbox )
{
return '
	<form name="form_edit" method="post"  action="">
		<div>
			<input type="text" size=120 name="full_filename" value="'.$full_filename.'">
		</div>
		<div>
			<input type="submit" name="action" value="save_changes">
			<input type="checkbox"  name="backup_copy" />make backup copy
		</div>
		<div>
			<textarea name="textbox" id="textbox" rows=40 cols=140>
'.$textbox.'
			</textarea>
		</div>
	</form>
';
}//----------------end func

//****************************************
// Вывести атрибуты файла
// ****************************************
function dump_file ($file)
{
return;
	$file_attr=array();

	$file_attr["size_kb"] = round (filesize($file) / 1024,2);
	$file_attr["size_mb"] = round ($file_attr["size_kb"] / 1024,2);

	$file_attr["octal_perms"] = substr(sprintf('%o', fileperms($file)), -4);
//======= Получение строки полных прав доступа
	$perms = fileperms( $file );
	$file_attr["full_perms_info"] = get_full_perms_info( $perms );
//=============================

    $group=filegroup($file);
//echo $group;
//print_r ( posix_getgrgid ($group));
    $str_group= posix_getgrgid ($group);
	$file_attr["filegroup"] = $str_group["name"];

    $owner=fileowner($file);
//echo $owner;
	$str_owner= posix_getgrgid ($owner);
//print_r ($str_owner[name]);
	$file_attr["fileowner"] = $str_owner["name"];

    $mtime=filemtime($file);
	$file_attr["filetime"] = date ("F d Y H:i:s.", $mtime);

	return $file_attr;

}//----------------end func


// Получение строки полных прав доступа, http://php.net/manual/ru/function.fileperms.php
function get_full_perms_info( $perms )
{
	if (($perms & 0xC000) == 0xC000) {
		// Сокет
		$info = 's';
	} elseif (($perms & 0xA000) == 0xA000) {
		// Символическая ссылка
		$info = 'l';
	} elseif (($perms & 0x8000) == 0x8000) {
		// Обычный
		$info = '-';
	} elseif (($perms & 0x6000) == 0x6000) {
		// Специальный блок
		$info = 'b';
	} elseif (($perms & 0x4000) == 0x4000) {
		// Директория
		$info = 'd';
	} elseif (($perms & 0x2000) == 0x2000) {
		// Специальный символ
		$info = 'c';
	} elseif (($perms & 0x1000) == 0x1000) {
		// Поток FIFO
		$info = 'p';
	} else {
		// Неизвестный
		$info = 'u';
	}

	// Владелец
	$info .= (($perms & 0x0100) ? 'r' : '-');
	$info .= (($perms & 0x0080) ? 'w' : '-');
	$info .= (($perms & 0x0040) ?
		        (($perms & 0x0800) ? 's' : 'x' ) :
		        (($perms & 0x0800) ? 'S' : '-'));

	// Группа
	$info .= (($perms & 0x0020) ? 'r' : '-');
	$info .= (($perms & 0x0010) ? 'w' : '-');
	$info .= (($perms & 0x0008) ?
		        (($perms & 0x0400) ? 's' : 'x' ) :
		        (($perms & 0x0400) ? 'S' : '-'));

	// Мир
	$info .= (($perms & 0x0004) ? 'r' : '-');
	$info .= (($perms & 0x0002) ? 'w' : '-');
	$info .= (($perms & 0x0001) ?
		        (($perms & 0x0200) ? 't' : 'x' ) :
		        (($perms & 0x0200) ? 'T' : '-'));

	return $info;

}//------------------- end func

//****************************************************
// Сформировать индексную страницу текущего каталога
//****************************************************
function filelist ($fs_path)
{
	//global $fs_init_dir;
	global $server_root;
	global $dir_path;

//echo "fs_init_dir = ".$fs_init_dir;
//echo "<br>\n";
//echo "fs_path=".$fs_path;
//echo "<br>\n";
echo "dir_path=".$dir_path;
echo "<br>\n";
//echo  "server_root=".$server_root;
//echo "<br>\n";
	global $path_html;
	global $up;
	$html = "";
	$html_filelist = "";

	//-------------------------------------------------------
	// Возврат на верхний уровень файловой системы
	//--------------------------------------------------------
	$n1= strrpos($dir_path, "/"); //поиск последней позиции, где встречается символ "/".
//echo "n1=".$n1;
//echo "<br>\n";
	if ( $n1 == 0 )
	{
		$n1 = 1;//для последнего слэша определить длину подстроки
	}
	$up = substr($dir_path, 0, $n1);

	//$script_name = basename($_SERVER['PHP_SELF']);
	$server_name = $_SERVER['SERVER_NAME'];

	$path_arr = explode("/",$dir_path);	
echo "<pre>";
print_r($path_arr);
echo "</pre>";	
	$path_html = "";
	$path = "";
	$n1=0;
	foreach ($path_arr as $item)
	{
		if ($n1>0)
		{
			$path .= "/".$item;
		}
		if ( !empty($item) )
		{
			$path_html .= "/<a href='?dir_path=$path'>$item</a>";
		}
		$n1++;
	}


	//$html .= view_filelist_top();
	$num_dir = 0;
	$num_file = 0;

	$line_class = "even";
	$dir = opendir ($fs_path);
	while ($file = readdir ($dir)) 
	{
		if (($file !=".") && ($file != ".."))
		{
			if (is_dir($fs_path."/".$file)) 
			{
				//$filename = str_replace (" ","%20",$file);
				$filename = str_replace ("&","%26",$file);
				$filename = str_replace ("'","%27",$filename);
				//$filename = rawurlencode($filename);
				//$filename = htmlentities($filename, ENT_QUOTES);

				//$dir_path = rawurlencode($dir_path);
				//$dir_path = htmlentities($dir_path, ENT_QUOTES);

				$url = $server_root.$dir_path."/".$filename;
				$local_url = "file://".$dir_path."/".$filename;
	// -----------------------------------------------------
	// Получить атрибуты файла
				$file_attr = dump_file ($fs_path."/".$file);
	// -----------------------------------------------------
				$num_dir++;
				$html_filelist .= view_folder_info( $file, 
								$num_file, 
								$url, 
								$local_url, 
								$dir_path, 
								//$fs_path,
								$filename,
								$file_attr,
								$line_class
								);
				if ($line_class == "even")
				{
					$line_class="odd";
				}
				else
				{
					$line_class="even";
				}
			}
// -----------------------------------------------------

		}//-------------------------- end if
	}//--------------------------- end while


	$dir = opendir ($fs_path);
	while ($file = readdir ($dir)) 
	{
		if (($file !=".") && ($file != ".."))
		{
 			if (is_file($fs_path."/".$file)) 
			{ 
				$filename = str_replace ("&","%26",$file);
				$filename = str_replace ("'","%27",$filename);
				$url = $server_root.$dir_path."/".$filename;
				$local_url = "file://".$dir_path."/".$filename;
	// -----------------------------------------------------
	// Получить атрибуты файла
				$file_attr = dump_file ($fs_path."/".$file);
	// -----------------------------------------------------
				$num_file++;
				$html_filelist .= view_file_info( $file, 
								$num_file, 
								$url, 
								$local_url, 
								$dir_path, 
								//$fs_path,
								$filename,
								$file_attr,
								$line_class
								);
				if ($line_class == "even")
				{
					$line_class="odd";
				}
				else
				{
					$line_class="even";
				}
			}
		}//-------------------------- end if
	}//--------------------------- end while

	//$html .= view_filelist_bottom();
	$html .= view_filelist( $path_html, $up, $html_filelist );
	closedir ($dir);
	return $html;
}//------------------------------------------end func


function RemoveTree( $dir ) 
{ 
	global $log;
	$handle = opendir($dir) or die("Can't open directory $dir"); 
	while (false !== ($file = readdir($handle))) 
	{ 
		if ($file != "." && $file != "..") 
		{ 
			if(is_file($dir."/".$file)) 
			{ 
				if(unlink($dir."/".$file)) 
				{
//echo "unlink ".$file;
//echo "<br>";
					$log .= "unlink ".$file;
					$log .= "<br>";
				} 
			} 
			if(is_dir($dir."/".$file)) 
			{ 
				RemoveTree($dir."/".$file);
				if(rmdir($dir."/".$file))
				{
//echo "rmdir ".$file;
//echo "<br>";
					$log .= "rmdir ".$file;
					$log .= "<br>";
				} 
			} 
			
		} 
	} 
	closedir($handle); 
	
	if(rmdir($dir))
	{
//echo "rmdir ".$file;
//echo "<br>";
		$log .= "rmdir ".$dir;
		$log .= "<br>";
		return true;
	} 
}//--------------------- end func


?>

