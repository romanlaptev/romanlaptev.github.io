<html>
<head>
<meta http-equiv=Expires content=0>
<META http-equiv=Pragma content=no-cache>
<title> web file-manager </title>
<!--
<meta content="charset=windows-1251">
-->
<meta content="charset=utf-8">

<script>
function select_checkbox()
 {
//   alert ("select all checkbox");
   var frm = document.form_ls;
   for (var n1=1; n1 < frm.elements.length; n1++)
      {
        var elmnt = frm.elements[n1];
        if (elmnt.type == 'checkbox')
          {
            elmnt.checked = true;
          }
      }
 }
//---------------end function

//-----------------------------------------------------------
// очистить помеченные checkbox
//-----------------------------------------------------------
function clear_checkbox ()
{
//     alert ("clear all checkbox");
      var frm = document.form_ls;
      for ( var n2=1; n2 < frm.elements.length; n2++)
         {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
         }
}
//-------------------------------------------enf function

function processnode2(nnodeid)
  {
	  if (document.getElementById(nnodeid).style.display == "none")
	    {
		document.getElementById(nnodeid).style.display = ""
	    }
	else
	   {
		document.getElementById(nnodeid).style.display = "none"
	   }
  }
//-------------------------------------------enf function

function make_backup_copy()
{
	if (document.forms.textbox.backup_copy.value == "1")
	  {
		document.forms.textbox.backup_copy.value = "0";
	  }
	else
		document.forms.textbox.backup_copy.value = "1";

//	alert (document.forms.textbox.backup_copy.value);
}
//-------------------------------------------enf function

function chmod(bit)
{
	document.write ("bit=", bit);
}
//-------------------------------------------enf function

</script>
</head>
<body>

<?
//****************************************
// Вывести атрибуты файла
// ****************************************
function dump_file ($file,$name_div)
  {
	echo "<td>\n";
	echo round (filesize($file) / 1024,2)." kb";
	echo "</td>\n";

	echo "<td>\n";
	$perms=substr(sprintf('%o', fileperms($file)), -4);
	echo $perms;
//	$perms=sprintf('%b', fileperms($file));

	$owner_perms=substr(sprintf('%b', fileperms($file)), -9,3);
	$group_perms=substr(sprintf('%b', fileperms($file)), -6,3);
	$other_perms=substr(sprintf('%b', fileperms($file)), -3);

// Создать таблицу checkboxes с информацией о правах доступа
	print "<a href='javascript:processnode2(\"fileperms".$name_div."\")'> x </a><br/>\n";
	print "<div style='display: none; background-color: palegreen;	font-size:  10pt;' id='fileperms".$name_div."'>\n";

//	print "<form name=form_perm method=post action=\"".basename($_SERVER['PHP_SELF']). "\" target=_blank>\n";
	echo "<table border=\"1\" align=center valign=top cellpadding=0 cellspacing=0>\n";

	echo "<tr><td colspan=\"3\">Owner</td></tr>\n";
	echo "<tr>\n";
	for ($m1=0; $m1<3; $m1++)
	  {
		if ($owner_perms[$m1]=="1")
		  {
			echo "<td><input type=\"checkbox\" name=\"ow$m1\" value=\"$owner_perms[$m1]\" checked onClick=\"chmod('$owner_perms[$m1]');\"></td>\n";
		  }
		if ($owner_perms[$m1]=="0")
		  {
			echo "<td><input type=\"checkbox\" name=\"ow$m1\" value=\"$owner_perms[$m1]\" onClick=\"chmod('$owner_perms[$m1]');\"></td>\n";
		  }
	  }
	echo "</tr>\n";

	echo "<tr><td colspan=\"3\">Group</td></tr>\n";
	echo "<tr>\n";
	for ($m1=0; $m1<3; $m1++)
	  {
		if ($group_perms[$m1]=="1")
		  {
			echo "<td><input type=\"checkbox\" name=\"gr$m1\" value=\"$group_perms[$m1]\" checked></td>\n";
		  }
		if ($group_perms[$m1]=="0")
		  {
			echo "<td><input type=\"checkbox\" name=\"gr$m1\" value=\"$group_perms[$m1]\"></td>\n";
		  }
	  }
	echo "</tr>\n";

	echo "<tr><td colspan=\"3\">Other</td></tr>\n";
	echo "<tr>\n";
	for ($m1=0; $m1<3; $m1++)
	  {
		if ($other_perms[$m1]=="1")
		  {
			echo "<td><input type=\"checkbox\" name=\"ot$m1\" value=\"$other_perms[$m1]\" checked></td>\n";
		  }
		if ($other_perms[$m1]=="0")
		  {
			echo "<td><input type=\"checkbox\" name=\"ot$m1\" value=\"$other_perms[$m1]\"></td>\n";
		  }
	  }
	echo "</tr>\n";

//	echo "
//<tr>
//<td colspan=\"3\" align=\"center\">
//<input type=\"submit\" value=\"chmod\" onClick=\"javascript:document.manage.op.value='chmodok';document.manage.submit()\">
//</td>
//</tr>";

	echo "</table>\n";
//	print "</form>\n";
	print "</div>\n";
	echo "</td>\n";

         echo "<td>\n";
         $group=filegroup($file);
//     echo $group;
//     print_r ( posix_getgrgid ($group));
        $str_group= posix_getgrgid ($group);
        print_r ($str_group[name]);
        echo "</td>\n";
							       
         echo "<td>\n";
         $owner=fileowner($file);
//      echo $owner;
         $str_owner= posix_getgrgid ($owner);
         print_r ($str_owner[name]);
         echo "</td>\n";

         echo "<td>\n";
         $mtime=filemtime($file);
         echo date ("F d Y H:i:s.", $mtime);
         echo "</td>\n";
  }
//-----------------------------------------------------end func
//*********************************************************************************
// Сформировать индексную страницу текущего каталога
//*********************************************************************************
function ls ($fs_path)
  {
	global $fs_root;
	global $server_root;
	global $dir_path;

//	echo "fs_root=".$fs_root;
//	echo "<br>\n";
//	echo "fs_path=".$fs_path;
//	echo "<br>\n";
//	echo "dir_path=".$dir_path;
//	echo "<br>\n";
//	echo  "server_root=".$server_root;
//	echo "<br>\n";

	$df = disk_free_space($fs_root);
	$df = round((($df/1024)/1024),2);
	echo "<ul>\n";
	echo "disk_free_space $fs_root = ".$df." mb <br>\n";
	$ds = disk_total_space($fs_root);
	$ds = round((($ds/1024)/1024),2);
	echo "disk_total_space $fs_root = ".$ds." mb<br>\n";
	echo "</ul>\n";

         // узнать права доступа и время модификации папки
        $perms=substr(sprintf('%o', fileperms($fs_path)), -4);
        $mtime=filemtime($fs_path);
        $mmmtime=date ("F d Y H:i:s.", $mtime);

	echo "Index of <b>$dir_path ($perms, $mmmtime)</b><br>\n";
	//-------------------------------------------------------
	// Возврат на верхний уровень файловой системы
	//--------------------------------------------------------
	$n1= strrpos($dir_path, "/"); //поиск последней позиции, где встречается символ "/".
	$up = substr($dir_path, 0, $n1);

	print "<form name=form_ls method=post action=\"".basename($_SERVER['PHP_SELF']). "\" target=_blank>\n";
	print "<input type=hidden size=30 name=\"fs_path_desc\" value=\"".$fs_root.$dir_path."\">\n";
	print "<table cellpadding=\"10\" cellspacing=\"0\">\n";
	print "<tr>\n";
	print "<td align=left>\n";
	echo "<a href=\"".basename($_SERVER['PHP_SELF']). "?action=list_dir&dir_path=$up\"> up </a>\n";
	print "</td>\n";
	#--------------------------------------------------------
	# Выбор действия над отмеченным файлом
	#--------------------------------------------------------
	print "<td align=left>\n";

//	print "<select name=group_action onChange=''>\n";
//	print "<option value=select selected> select action         </option>\n";
//	print "<option value=delete> delete files          </option>\n";
//	print "<option value=play> play media file  </option>\n";
//	print "</select>\n";

	print "<input type=submit name=group_action value=\"delete\" onClick=\"javascript:document.form_ls.submit()\">\n";

	print "<input type=button onClick='javascript:select_checkbox();' value=\"select all files\">\n";
	print "<input type=button onClick='javascript:clear_checkbox();' value=\"clear all\">\n";

//	$s1=$server_root."/".$_SERVER['SCRIPT_NAME'];
//	print "<a href=\"$s1?action=mkdir\" target=_blank> mkdir      </a>\n";
//	print "<form name=form_mkdir method=post action=\"".basename($_SERVER['PHP_SELF']). "\" target=_blank>\n";
	print "<input type=text  name=foldername value=\"newfolder\">\n";
	print "<input type=submit name=action value='mkdir'><br><br>\n"; 
//	print "</form>\n";
   
	print "</td>\n";
	print "</tr>\n";
	print "</table>\n";

	echo "<table border=1 cellpadding=\"5\" cellspacing=0 width=100% align=center>\n";
        echo "<tr>\n";

        echo "<td width=\"2%\">\n";
        echo "<b>action</b>\n";
        echo "</td>\n";

        echo "<td width=\"35%\">\n";
        echo "<b> file </b>";
        echo "</td>\n";

        echo "<td width=\"10%\">\n";
        echo "<b> filesize </b>";
        echo "</td>\n";

        echo "<td width=\"5%\">\n";
        echo "<b> fileperms </b>";
        echo "</td>\n";

        echo "<td width=\"10%\">\n";
        echo "<b> filegroup </b>";
        echo "</td>\n";
							       
        echo "<td width=\"10%\">\n";
        echo "<b> fileowner </b>";
        echo "</td>\n";
							       
        echo "<td>\n";
        echo "<b> filemtime </b>";
        echo "</td>\n";
							       
        echo "</tr>\n";
	$num_dir = 0;
	$num_file = 0;

	$dir = opendir ($fs_path);
	while ($file = readdir ($dir)) 
	   {
	     if (($file !=".") && ($file != ".."))
	       {
// -----------------------------------------------------
 	             if (is_dir($fs_path."/".$file)) 
	               {
			$num_dir++;
		        echo "<tr>\n";

			print "<td align=center>\n";
			echo "+";
			print "</td>";

//		        echo "<td colspan=\"6\">\n";
		        echo "<td>\n";
		        echo "<a href=\"".basename($_SERVER['PHP_SELF']). "?action=list_dir&dir_path=$dir_path/$file\"> $file </a><br>";
		        echo "</td>\n";
			dump_file ($fs_path."/".$file,$file);// Вывести атрибуты файла
		        echo "</tr>\n";
 	               }
// -----------------------------------------------------
// -----------------------------------------------------
 	             if (is_file($fs_path."/".$file)) 
	               { 
			$num_file++;
		        echo "<tr>\n";

			print "<td align=center>\n";
//			print "<input type=checkbox name=\"file".$num_file."\" value=\"$file\">\n";
			print "<input type=checkbox name=\"filename[]\" value=\"$file\">\n";

			$s1=$server_root."/".$_SERVER['SCRIPT_NAME'];
			$filename= $dir_path."/".$file;
			print "<a href='javascript:processnode2(\"file".$num_file."\")'> x </a><br/>\n";
			print "<div style='display: none; background-color: palegreen;	font-size:  10pt;' id='file".$num_file."'>\n";
			print "<a href=\"$s1?action=edit&filename=$filename\" target=_blank> edit      </a><br/>\n";
			print "<a href=\"$s1?action=rename&filename=$filename\" target=_blank> rename      </a><br/>\n";
			print "<a href=\"$s1?action=delete&filename=$filename\" target=_blank> delete   </a><br/>\n";
//			print "<a href=$s1?action=play&song=" .$url." target=_blank> play media file   </a><br/>\n";
			print "</div>\n";
			print "</td>\n";

		        echo "<td>\n";
			$url = $server_root."/".$dir_path."/".$file;
/*
			//-----------------------------------------------------------------------------------------------------------------------
			// перевод строки в hex-символы (русские названия преобразуются в hex)
			$str_exp = explode("/", $url);
			//        print_r($str_exp)."<br>\n";
			$url_name = $str_exp[sizeof($str_exp)-1];
			// нужно пропускать первый элемент строки (http:)
			for ($n2=1; $n2 < sizeof($str_exp); $n2++)
			    {
				$str_exp[$n2]=rawurlencode($str_exp[$n2]); 
				//   echo  $str_exp[$n2]."<br>\n";
			    }
			$url = implode("/", $str_exp);
			print_r($url)."<br>\n";
*/
//		        echo "<a href=\"$server_root/$dir_path/$file\"> $file </a><br>";
		        echo "<a href=\"$url\"> $file </a><br>";
		        echo "</td>\n";

 			dump_file ($fs_path."/".$file, $file);// Вывести атрибуты файла
		        echo "</tr>\n";
		       }
// -----------------------------------------------------
               }
	}
									     
	echo "</table>\n";
	print "</form>\n";
	closedir ($dir);
  }
//-----------------------------------------------------end func

//***************************************
// MAIN 
//***************************************
// echo "Uploader....<br>\n";

// echo "<pre>";
// print_r ($_REQUEST);
// echo "</pre>";

//echo "<pre>";
//print_r ($_POST);
//echo "</pre>";

// echo "<pre>";
// print_r ($_SERVER);
// echo "</pre>";

//$fs_root="/";
$fs_root=$_SERVER['DOCUMENT_ROOT'];
$server_root="http://".$_SERVER['SERVER_NAME'];

//$server_root="http://192.168.0.11";
//$server_root="http://roman-laptev.hut1.ru";
//$server_root="http://rlaptev.far.ru";
//$server_root="http://rex.hop.ru";
//$server_root="http://rex.dax.ru";

//    $dir_path="/home/r/roman-laptev.hut1.ru/WWW/uploads";
//    $http_path="http://roman-laptev.hut1.ru/uploads";

//    $dir_path="/mnt/disk2/documents/uploads";
//    $http_path="http://mycomp/documents/uploads";
//    $dir_path="/home/far/r/l/a/rlaptev/public_html/uploads";
//    $http_path="http://rlaptev.far.ru/uploads";
//    $dir_path=$fs_root  + "/" + "uploads";
//    $http_path=$server_root  + "/" + "uploads";

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

if (isset($_REQUEST['group_action']))
  {
	$group_action=$_REQUEST['group_action']; 
  }

if (!isset($_REQUEST['dir_path']))
   {
//	echo "<font color=\"red\"><h2> dir_path undefined... </h2></font>";
	$fs_path=$fs_root;
//	exit ();
   }
else
  {
	$dir_path=$_REQUEST['dir_path']; 
	//$fs_path=$fs_root."/".$dir_path;
	$fs_path=$fs_root.$dir_path;
  }

if ($dir_path == "")
   {
//	 echo "<font color=\"red\"><h2> dir_path is empty... </h2></font>";
//       exit ();
	$fs_path=$fs_root;
   }

//*******************************************************************
// Сформировать индексную страницу текущего каталога
//*******************************************************************
if  ($action == "list_dir")
   {
// file_uploads
//upload_max_filesize
//max_input_time
//memory_limit
//max_execution_time
//post_max_size 
	$upload_max_filesize = ini_get('upload_max_filesize'); 
	echo "upload_max_filesize = ".$upload_max_filesize."<br>"; 
	echo "<form method=\"post\" enctype=\"multipart/form-data\" action=\"".basename($_SERVER['SCRIPT_NAME'])."?action=upload&dir_path=$dir_path\"  target=_blank>
<input type=\"file\" name=\"FILE\" size=\"30\">
<input type=\"submit\" value=\"upload\">
</form>
<hr>\n";

	ls ($fs_path);  // Сформировать индексную страницу текущего каталога
   }
// -----------------------------------------------------end if action list dir

//****************************************
// Загрузить файл в текущий каталог
//****************************************
if ($action == "upload")
  {
	echo "<pre>";
	print_r($_FILES);
	echo "</pre>";

        $perms=substr(sprintf('%o', fileperms($fs_path)), -4);
	if ($perms=='0777')
             {
	  	if ($_FILES['FILE']['size'])
	  	  {
			//    if ($_FILES['FILE']['size']) !=0 AND ($_FILES['FILE']['size']) < 1024000
			//      {
				       if (is_uploaded_file($_FILES['FILE']['tmp_name'])) 
				         {
				           //if (move_uploaded_file($_FILES['FILE']['tmp_name'], $fs_path."/".basename($_FILES['FILE']['name'])))
				           if (move_uploaded_file($_FILES['FILE']['tmp_name'], $fs_path."/".$_FILES['FILE']['name']))
  					       {
						  echo $_FILES['FILE']['name'].", size= ".$_FILES['FILE']['size']." bytes upload successful<br>";
 					       }
					 }
			//      }
		  }
	       	//echo "<script>location.assign('".basename($_SERVER['SCRIPT_NAME'])."?action=list_dir&dir_path=".$dir_path."')</script>";
		echo "<script>window.opener.location.reload();</script>";
            }
	else 
           {
                echo "Cannot write in $dir_path with $perms";
           }

  }
// -----------------------------------------------------end if action upload

# ****************************************
# удаление файла 
# ****************************************
 if ($action == "delete")
   {
	if (isset($_REQUEST['filename']))
	  {
		$filename=$_REQUEST['filename']; 
		$filename=$fs_root.$filename; 
//		$filename=rawurlencode($filename);
	  }
	else
	  {
		echo "<font color=\"red\"><h2> filename undefined... </h2></font>";
		exit ();
	  }

	if (unlink ($filename))
	  {
		echo "Delete $filename <br>\n";
	  }
	else
	 	echo "<font color=red>cant remove </font> $filename <br>\n";

	echo "<script>window.opener.location.reload();</script>";
   }
// -----------------------------------------------------end if action delete
											       
//*******************************************************************
//  Групповое удаление  файлов
//*******************************************************************
if  ($group_action == "delete")
  {
//	echo "delete"; 

//	echo "<script>
//num = window.opener.document.forms.form_ls.group_action.selectedIndex;
//document.write (num);
//a = window.opener.document.forms.form_ls.group_action[num].value;
//document.write (a);
//</script>";

	echo "<script>
//-----------------------------------------------------------
// очистить помеченные checkbox
//-----------------------------------------------------------
var frm = window.opener.document.form_ls;
for ( var n2=1; n2 < frm.elements.length; n2++)
     {
          var elmnt = frm.elements[n2];
          if  (elmnt.type=='checkbox') 
            {
              elmnt.checked = false;
            }
     }
// установить выбор групповых операций в нач. положение
//window.opener.document.forms.form_ls.group_action[0].selected=true;
window.opener.location.reload();
</script>";

//	foreach ($_POST as $key => $value )
//	   {
//	       echo $key."<br>";
//	       echo $value."<br>";
//	   }

	$n2 = sizeof($_POST['filename']);
	for ($n1=0; $n1<$n2; $n1++)
	   {
		$filename =  $_POST['fs_path_desc']."/".$_POST['filename'][$n1];
//		echo "Delete $filename <br>\n";
		if (!unlink ($filename))
	           {
			echo "<font color=red>cant remove </font> $filename <br>\n";
	           }
		else
			print "<b>Delete</b> $filename  <br>\n"; 
	   } // ------------------ end for
  }
// -----------------------------------------------------end if action delete

// ****************************************
// переименовать файл
// ****************************************
if ($action == "rename")
  {
	if (isset($_REQUEST['filename']))
	  {
		$filename=$_REQUEST['filename']; 
		$filename=$fs_root.$filename; 
	  }
	else
	  {
		echo "<font color=\"red\"><h2> filename undefined... </h2></font>";
		exit ();
	  }

   print "<form name=form_rename method=post action=".basename($_SERVER['SCRIPT_NAME']).">\n";
   print "oldfile:\n";
   print "<input type=text size=60 name=oldfile value=\"$filename\"><br/>\n";
   print "newfile:\n";
   print "<input type=text size=60 name=newfile value=\"$filename\">\n";
   print "<input type=hidden name=action value=\"change_name\">\n";
   print "<input type=submit value=\"rename\">\n";
   print "</form>\n";
  }
// -----------------------------------------------------end if action rename

if ($action == "change_name")
  {
//	echo "rename......";
	if (isset($_REQUEST['oldfile']))
	  {
		$oldfile=$_REQUEST['oldfile']; 
	  }
	else
	  {
		echo "<font color=\"red\"><h2> oldfile undefined... </h2></font>";
		exit ();
	  }

	if (isset($_REQUEST['newfile']))
	  {
		$newfile=$_REQUEST['newfile']; 
	  }
	else
	  {
		echo "<font color=\"red\"><h2> newfile undefined... </h2></font>";
		exit ();
	  }

	if (rename ($oldfile,$newfile))
	  {
		echo "rename $oldfile to $newfile <br>\n";
	  }
	else
	 	echo "<font color=red>cant rename </font> $oldfile <br>\n";

	echo "<script>window.opener.location.reload();</script>";
  }
// -----------------------------------------------------end if action change_name

// ****************************************
//Создать каталог
// ****************************************
if ($action == "mkdir")
  {
	if (isset($_REQUEST['foldername']))
	  {
		$foldername=$_REQUEST['foldername']; 
		$fs_path_desc=$_REQUEST['fs_path_desc'];
		$foldername= $fs_path_desc."/".$foldername; 
	  }
	else
	  {
		echo "<font color=\"red\"><h2> folder name undefined... </h2></font>";
		exit ();
	  }

       $perms=substr(sprintf('%o', fileperms($fs_path_desc)), -4);
	if (mkdir ($foldername))
	  {
		echo "Mkdir $foldername <br>\n";
	  }
	else
	 	echo "<font color=red>cant rmdir </font> ".$_REQUEST['foldername']."  in $fs_path_desc with permissons $perms\n";

	echo "<script>window.opener.location.reload();</script>";
  }
// -----------------------------------------------------end if action mkdir

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
		$filename=$_REQUEST['filename']; 
		$filename=$fs_root.$filename; 
//		$filename=rawurlencode($filename);
	  }
	else
	  {
		echo "<font color=\"red\"><h2> filename undefined... </h2></font>";
		exit ();
	  }

	$s1=$server_root."/".$_SERVER['SCRIPT_NAME'];
	print "<form  name=\"textbox\" method=post  action=$s1>\n"; 
	print "<table border=0 width=95%>\n"; 
	print "<tr>\n"; 
	print "<td valign=top width=5>\n"; 
	print "</td>\n"; 
	print "<td valign=top>\n"; 
	print "<input type=text size=50 name=filename value='".$_REQUEST['filename']."'>\n"; 
	print "<input type=submit name=action value='save_changes'><br><br>\n"; 
	print "<input type='button' size=10 onclick=\"getElementById('textbox').value = '';\" value='clear'/>\n"; 
	print "<input type='checkbox'  name=\"backup_copy\" value='0' onclick=\"make_backup_copy();\"/>backup copy\n"; 
	print "</td>\n"; 
	print "</tr>\n"; 

	print "<tr>\n"; 
	print "<td valign=top width=5>\n"; 
	print "</td>\n"; 

	print "<td>\n"; 
	print "<textarea name=\"textbox\" id=\"textbox\" rows=40 cols=140>\n"; 

	$file = fopen ($filename,"r+");
	if ( !$file )
	  {
		echo ("read error in ".$filename);
	  }
	else
	  {
		$textbox = fread ($file, filesize ($filename));
	  }
	fclose ($file);
    
	// Заменить html special chars (кавычки, слеши...) на код, для правильного отображения в форме
	echo htmlspecialchars ($textbox);
	//    echo $textbox;

	print "</textarea>\n"; 
	print "</td>\n"; 
	print "</tr>\n"; 

	print "</table>\n"; 
	print "</form>\n"; 

  }
// -----------------------------------------------------end if action edit

// ****************************************
// Сохранить текстовую форму в файл
//****************************************
if ($action == "save_changes")
  {
//****************************************
// Извлекаем параметры из запроса POST
//****************************************
	if (isset($_POST['filename']))
	  {
		$filename=$_POST['filename']; 
		$filename=$fs_root.$filename; 
//		$filename=rawurlencode($filename);
	  }
	else
	  {
		echo "<font color=\"red\"><h2> filename undefined... </h2></font>";
		exit ();
	  }

	if (isset ($_POST['textbox']) )
	  {
		$textbox=$_POST['textbox']; 
		echo "magic_quotes_gpc (экранирование кавычек в тексте формы) = ".get_magic_quotes_gpc();
		if (get_magic_quotes_gpc()) 
		  {
			// отмена экранирования кавычек в тексте формы
			$textbox = stripslashes($textbox);
		  }
	  } 
	else
	  {
		exit ("<font color=\"red\"><b> var textbox is not set </b></font><br>"); 
	  }


	if (isset ($_POST['backup_copy']) )
	  {
	// ****************************************
	//создать резервную копию файла
	//****************************************
		if (!copy ($filename, $filename.'.bak')) 
		  {
			print ("<font color=\"red\"><h2> failed to copy $file...</h2></font>\n");
		  }
	  }

	print "<h1>save_changes in ".$filename. "</h1>\n"; 
	//$textbox=htmlspecialchars ($textbox);
	//print "textbox= ".$textbox."<br>";
	//Запись переменной (отредактированое содержимое формы) в файл
	$file = fopen ($filename,"w");
	if ( !$file )
	   {
		echo("write error in $filename <br>\n");
	   }
	else
	  {
		fwrite ($file, $textbox);
	  }
	fclose ($file);
	echo "Size: ".filesize ($filename);

	echo "<script>window.opener.location.reload();</script>";
  }
// -----------------------------------------------------end if action save_changes

?>

</body>
</html>
