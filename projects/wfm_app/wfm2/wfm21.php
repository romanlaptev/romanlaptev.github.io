<?
function top_page()
{
echo <<<EOF
<html>
<head>
	<meta http-equiv=Expires content=0>
	<meta http-equiv=Pragma content=no-cache>
	<title> web file-manager </title>
<!--
<meta content="charset=windows-1251">
-->
	<meta charset="utf-8">
	<link rel=stylesheet href=css/wfm.css type=text/css>
	<script src="js/wfm.js"></script>
</head>
<body>
EOF;
}

function bottom_page()
{
echo <<<EOF
</body>
</html>
EOF;
}

//****************************************
// Вывести атрибуты файла
// ****************************************
function dump_file ($file,$name_div)
  {
	echo "<td>\n";
	$size_kb = round (filesize($file) / 1024,2);
	$size_mb = round ($size_kb / 1024,2);
	echo $size_mb." Mb (".$size_kb." Kb)";
	echo "</td>\n";

	echo "<td>\n";
	$perms=substr(sprintf('%o', fileperms($file)), -4);
	echo $perms;
//	$perms=sprintf('%b', fileperms($file));

	$owner_perms=substr(sprintf('%b', fileperms($file)), -9,3);
	$group_perms=substr(sprintf('%b', fileperms($file)), -6,3);
	$other_perms=substr(sprintf('%b', fileperms($file)), -3);

	print "<a href='javascript:processnode2(\"fileperms".$name_div."\")'> x </a><br/>\n";
	print "<div style='display: none; background-color: palegreen;	font-size:  10pt;' id='fileperms".$name_div."'>\n";

	print "<form name=form_perm method=post action=\"".basename($_SERVER['PHP_SELF']). "\" target=_blank>\n";
	print "<input type=text  size=\"3\" name=rights value=\"777\">\n";
	print "<input type=hidden  name=ch_filename value=\"$file\">\n";
	print "<input type=submit name=action value='chmod'><br><br>\n"; 

// Создать таблицу checkboxes с информацией о правах доступа
/*
	echo "<table border=\"1\" align=center valign=top cellpadding=0 cellspacing=0>\n";

	echo "<tr><td colspan=\"3\">Owner</td></tr>\n";
	echo "<tr><td>";
	echo "</td></tr>\n";
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
*/

	print "</form>\n";
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

//echo "fs_root=".$fs_root;
//echo "<br>\n";
//echo "fs_path=".$fs_path;
//echo "<br>\n";
//echo "dir_path=".$dir_path;
//echo "<br>\n";
//echo  "server_root=".$server_root;
//echo "<br>\n";

	$df = disk_free_space($fs_root);
	$df_mb = round((($df/1024)/1024),2);
	$df_gb = round($df_mb/1024,2);

	$ds = disk_total_space($fs_root);
	$ds_mb = round((($ds/1024)/1024),2);
	$ds_gb = round($ds_mb/1024 ,2);
	echo "
<a href='#' onclick='document.getElementById(\"system-disk-info\").style.display=\"block\";'>system-disk-info</a>
<div id='system-disk-info'>
<a href='#' onclick='document.getElementById(\"system-disk-info\").style.display=\"none\";'>x</a>";
	echo "<ul>\n";
	echo "disk_free_space $fs_root = ".$df_gb." Gb (".$df_mb." Mb)<br>\n";
	echo "disk_total_space $fs_root = ".$ds_gb." Gb (".$ds_mb." Mb)<br>\n";
	echo "</ul>\n";
	echo "</div><br>\n";

         // узнать права доступа и время модификации папки
//$perms=substr(sprintf('%o', fileperms($fs_path)), -4);
//$mtime=filemtime($fs_path);
//$mmmtime=date ("F d Y H:i:s.", $mtime);

	//-------------------------------------------------------
	// Возврат на верхний уровень файловой системы
	//--------------------------------------------------------
	$n1= strrpos($dir_path, "/"); //поиск последней позиции, где встречается символ "/".
	$up = substr($dir_path, 0, $n1);

	$script_name = basename($_SERVER['PHP_SELF']);
	$server_name = $_SERVER['SERVER_NAME'];

	$path_arr = explode("/",$dir_path);
	$path_html = "";
	$path = "";
	$n1=0;
	foreach ($path_arr as $item)
	{
		if ($n1>0)
		{
			$path .= "/".$item;
		}
		$path_html .= "<a href='$script_name?action=list_dir&dir_path=$path'>$item</a>/";
		$n1++;
	}

print <<<EOF
<a href="$script_name?action=list_dir">[root]</a>&nbsp;
<a href="$script_name?action=list_dir&dir_path=$up">[up]</a>
<br>

	Index of $fs_root<b>$path_html</b>&nbsp;&nbsp;&nbsp;

	<form name=form_ls method=post action="$script_name">
	<input type=text size=120 name="d_path" value="$dir_path">
	<table>
		<tr>
EOF;

	#--------------------------------------------------------
	# Выбор действия над отмеченным файлом
	#--------------------------------------------------------
	print "
			<td>
<input type=submit name=group_action value='delete' onClick='javascript:document.form_ls.submit();'>
<input type=button onClick='javascript:select_checkbox();' value='select all files'>
<input type=button onClick='javascript:clear_checkbox();' value='clear all'>
<input type=text  name=newfoldername value='newfolder'>
<input type=submit name=action value='mkdir'>
<br><br>
			</td>
		</tr>
	</table>
";

echo "
<table border=1 cellpadding='5' cellspacing='0' width='100%' align=center>
	<tr class='head'>
		<td width='35%'>
			<b> file </b>
		</td>

		<td width='2%'>
			<b>action</b>
		</td>

		<td width='10%'>
			<b> filesize </b>
		</td>

		<td width='5%'>
			<b> fileperms </b>
		</td>

		<td width='10%'>
			<b> filegroup </b>
		</td>
							       
		<td width='10%'>
			<b> fileowner </b>
		</td>
							       
		<td>
			<b> filemtime </b>
		</td>
							       
	</tr>";

	$num_dir = 0;
	$num_file = 0;

	$tr_class = "even";
	$dir = opendir ($fs_path);
	while ($file = readdir ($dir)) 
	{
		if (($file !=".") && ($file != ".."))
		{

			//$filename = str_replace (" ","%20",$file);
			$filename = str_replace ("&","%26",$file);
			$filename = str_replace ("'","%27",$filename);
			//$filename = rawurlencode($filename);
			//$filename = htmlentities($filename, ENT_QUOTES);

			//$dir_path = rawurlencode($dir_path);
			//$dir_path = htmlentities($dir_path, ENT_QUOTES);

			$url = $server_root."/".$dir_path."/".$filename;
			$local_url = "file://".$dir_path."/".$filename;
// -----------------------------------------------------
			echo "<tr class=".$tr_class.">\n";
			if ($tr_class == "even")
			{
				$tr_class="odd";
			}
			else
			{
				$tr_class="even";
			}

			if (is_dir($fs_path."/".$file)) 
			{
				$num_dir++;
				echo "
		<td>
			<div class='folder'>
	<a href='$script_name?action=list_dir&dir_path=$dir_path/$filename'> + <b>$file</b></a>
			</div>
			<div class='file-action'>
open folder from: 
				<a href='$url' target=_blank>http</a>
				<a href='$local_url' target=_blank>file</a>
				<br>
				<a href='$script_name?action=rename&filename=$dir_path/$filename'> rename </a>
				<a href='$script_name?action=delete&filename=$dir_path/$filename'> delete </a>
			</div>
		</td>\n";

				print "
		<td align=center>
			<input type=checkbox name='foldername[]' value='$filename'>
		</td>";

				dump_file ($fs_path."/".$file,$file);// Вывести атрибуты файла
 	               }
// -----------------------------------------------------
 			if (is_file($fs_path."/".$file)) 
			{ 
				$num_file++;
				echo "
		<td>
			<div class='file'>".$file."<br></div>
			<div class='file-action' id='file".$num_file."'>
				open file from: 
				<a href='$url' target=_blank>http</a>
				<a href='$local_url' target=_blank>file</a>
				<br>
<a href='$script_name?action=edit&filename=$dir_path/$filename' target=_blank> edit </a>
<a href='$script_name?action=rename&filename=$dir_path/$filename'> rename </a>
<a href='$script_name?action=delete&filename=$dir_path/$filename'> delete </a>
			</div>
		</td>\n";

				print "
		<td>
			<input type=checkbox name='filename[]' value='$filename'>
		</td>";

				dump_file ($fs_path."/".$file, $file);// Вывести атрибуты файла
			}
// -----------------------------------------------------
	        echo "</tr>\n";
		}//-------------------------- end if
	}//--------------------------- end while
									     
	echo "</table>\n";
	print "</form>\n";
	closedir ($dir);
  }
//-----------------------------------------------------end func

//***************************************
// MAIN 
//***************************************
//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//echo "</pre>";

$fs_root="/";
//$fs_root=$_SERVER['DOCUMENT_ROOT'];
$server_root="http://".$_SERVER['SERVER_NAME'];

top_page();

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }
else
  {
	$action="list_dir"; 
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

	if ($fs_root != '/')
	{
		$fs_path=$fs_root.$dir_path;
	}
	else
	{
		$fs_path=$dir_path;
	}
}

if ($dir_path == "")
{
//	 echo "<font color=\"red\"><h2> dir_path is empty... </h2></font>";
//       exit ();
	$fs_path=$fs_root;
}


//Log messages
if (!empty($_REQUEST['log']))
{
	echo "
<div class='log' id='log-messages'>
<a href='#' id='close' onclick='document.getElementById(\"log-messages\").style.display=\"none\";'>x</a>
<h2>Log message</h2>".$_REQUEST['log']."</div>";
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
        echo "write in $dir_path with $perms";

//	if ($perms=='0777')
//             {
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
		//echo "<script>window.opener.location.reload();</script>";
//            }
//	else 
//           {
//                echo "Cannot write in $dir_path with $perms";
//           }

  }
// -----------------------------------------------------end if action upload

# ****************************************
# удаление файла 
# ****************************************
if ($action == "delete")
{
	$log="";
	if (isset($_REQUEST['filename']))
	{
		$filename=$_REQUEST['filename']; 
		$short_filename=$_REQUEST['filename']; 

		if ($fs_root != "/")
		{
			$filename=$fs_root.$filename; 
		}

//		$filename=rawurlencode($filename);

		if (is_dir($filename))
		{
			if (rmdir($filename))
			  {
				$log .= "<span class='ok'>Rmdir</span> $filename <br>\n";
			  }
			else
			{
				$res=false;
				$res=RemoveTree($filename);
				if ($res)
				{
					$log .= "<span class='ok'>remove tree </span> $filename <br>\n";
				}
				else
					$log .= "<span class='error'>cant rmdir </span> $filename <br>\n";
			}
		}

		if (is_file($filename))
		{
			if (unlink ($filename))
			  {
				$log .= "<span class='ok'>Unlink</span> $filename <br>\n";
			  }
			else
			 	$log .= "<span class='error'>cant unlink </span> $filename <br>\n";
		}

		$tmp = basename($short_filename);
		$fpath = str_replace("/".$tmp,"",$short_filename);
	}
	else
	{
		$log .= "<span class='error'>filename undefined... </span>";
	}

	//echo "<script>window.opener.location.reload();</script>";

	$fpath = str_replace ("&","%26",$fpath);

	$script_name = $_SERVER['PHP_SELF'];
	$redirect_url = "http://".$_SERVER['SERVER_NAME'];
	$redirect_url .= $script_name."?action=list_dir&dir_path=".$fpath;
	$redirect_url .= "&log=".rawurlencode($log);
echo "redirect_url - ".$redirect_url;
echo "<br>";
	//header("Location:$redirect_url");
	echo("<script>location.href='$redirect_url'</script>");

}
// -----------------------------------------------------end if action delete
function RemoveTree($dir) 
{ 
	$handle = opendir($dir) or die("Can't open directory $dir"); 
	while (false !== ($file = readdir($handle))) 
	{ 
		if ($file != "." && $file != "..") 
		{ 
			if(is_file($dir."/".$file)) 
			{ 
				if(unlink($dir."/".$file)) 
				{
echo "unlink ".$file;
echo "<br>";
				} 
			} 
			if(is_dir($dir."/".$file)) 
			{ 
				RemoveTree($dir."/".$file);
				if(rmdir($dir."/".$file))
				{
echo "rmdir ".$file;
echo "<br>";
				} 
			} 
			
		} 
	} 
	closedir($handle); 
	
	if(rmdir($dir))
	{
echo "rmdir ".$file;
echo "<br>";
		return true;
	} 
}//--------------------- end func
	

										       
//*******************************************************************
//  Групповое удаление  файлов
//*******************************************************************
if  ($group_action == "delete")
  {
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

	if (!empty($_REQUEST['d_path']))
	{
//---------------------------------------------------------------------
		$fpath =  $_REQUEST['d_path'];
		$short_fpath = $fpath; 
		if ($fs_root != "/")
		{
			$oldfile = $fs_root.$oldfile; 
			$fpath = $fs_root.$fpath; 
		}

		$log = "";
		$n2 = sizeof($_POST['foldername']);
		for ($n1=0; $n1<$n2; $n1++)
		   {
			$foldername =  $fpath."/".$_POST['foldername'][$n1];
			if (!rmdir ($foldername))
			   {
				$log .= "<span class='error'>cant remove </span> $foldername <br>\n";
			   }
			else
				$log .= "<span class='ok'>Delete></span> $foldername  <br>\n"; 
		   } // ------------------ end for

//---------------------------------------------------------------------
		$n2 = sizeof($_POST['filename']);
		for ($n1=0; $n1<$n2; $n1++)
		   {
			$filename =  $fpath."/".$_POST['filename'][$n1];
			echo "Delete $filename <br>\n";
			if (!unlink ($filename))
			   {
				$log .= "<span class='error'>cant remove </span> $filename <br>\n";
			   }
			else
				$log .= "<span class='ok'>Delete</span> $filename  <br>\n"; 
		   } // ------------------ end for

		$fpath = str_replace ("&","%26",$fpath);

		$script_name = $_SERVER['PHP_SELF'];
		$redirect_url = "http://".$_SERVER['SERVER_NAME'];
		$redirect_url .= $script_name."?action=list_dir&dir_path=".$short_fpath;
		$redirect_url .= "&log=".rawurlencode($log);
//echo "redirect_url - ".$redirect_url;
//echo "<br>";
		//header("Location:$redirect_url");
		echo("<script>location.href='$redirect_url'</script>");

	}//------------------------- end if

  }
// -----------------------------------------------------end if action delete

// ****************************************
// переименовать файл
// ****************************************
if ($action == "rename")
{
	$log="";
	$script_name = $_SERVER['PHP_SELF'];
	if (isset($_REQUEST['filename']))
	  {
		$filename=$_REQUEST['filename']; 

echo <<<EOF
<form name=form_rename method=post action="$script_name">
oldfile:
<input type=text size=60 name=oldfile value="$filename"><br/>
newfile:
<input type=text size=60 name=newfile value="$filename">
<input type=hidden name=action value="change_name">
<input type=submit value="rename">
</form>
EOF;
	  }
	else
	  {
		$log .= "<span class='error'>filename undefined...</span";
	  }
}
// -----------------------------------------------------end if action rename

if ($action == "change_name")
{
	$log="";
	if (isset($_REQUEST['oldfile']))
	  {
		$oldfile=$_REQUEST['oldfile']; 
	  }
	else
	  {
		$log .= "<span class='error'>oldfile undefined... </span>";
	  }

	if (isset($_REQUEST['newfile']))
	  {
		$newfile=$_REQUEST['newfile']; 
	  }
	else
	  {
		$log .= "<span class='error'>newfile undefined... </span>";
	  }

	$short_newfile = $newfile; 
	if ($fs_root != "/")
	{
		$oldfile = $fs_root.$oldfile; 
		$newfile = $fs_root.$newfile; 
	}

	if (rename ($oldfile,$newfile))
	  {
		$log .= "<span class='ok'>Rename</span> $oldfile to $newfile <br>\n";
	  }
	else
	 	$log .= "<span class='error'>can't rename </span> $oldfile <br>\n";


	//echo "<script>window.opener.location.reload();</script>";

	$tmp = basename($short_newfile);
	$fpath = str_replace("/".$tmp,"",$short_newfile);
	$fpath = str_replace ("&","%26",$fpath);

	$script_name = $_SERVER['PHP_SELF'];
	$redirect_url = "http://".$_SERVER['SERVER_NAME'];
	$redirect_url .= $script_name."?action=list_dir&dir_path=".$fpath;
	$redirect_url .= "&log=".rawurlencode($log);
echo "redirect_url - ".$redirect_url;
echo "<br>";
	echo("<script>location.href='$redirect_url'</script>");

}
// -----------------------------------------------------end if action change_name

// ****************************************
//Создать каталог
// ****************************************
if ($action == "mkdir")
{
	$log="";
	if (isset($_REQUEST['newfoldername']))
	{
		$foldername = $_REQUEST['newfoldername']; 
		$fpath = $_REQUEST['d_path'];
		if ($fs_root != "/")
		{
			$foldername = $fs_root.$fpath."/".$foldername; 
		}
		else
			$foldername = $fpath."/".$foldername; 

		$perms=substr(sprintf('%o', fileperms($d_path)), -4);
		if (mkdir ($foldername,0,true))
		{
			$log .= "<span color='ok'>Mkdir</span> $foldername <br>\n";
		}
		else
		{
		 	$log .= "<span color='error'>cant mkdir </span> "
.$_REQUEST['newfoldername']." in $d_path with permissons $perms<br>\n";
		}

	}
	else
	{
		$log .= "<font color=\"red\"><h2> folder name undefined... </h2></font>";
	}


	//echo "<script>window.opener.location.reload();</script>";

	$fpath = str_replace ("&","%26",$fpath);

	$script_name = $_SERVER['PHP_SELF'];
	$redirect_url = "http://".$_SERVER['SERVER_NAME'];
	$redirect_url .= $script_name."?action=list_dir&dir_path=".$fpath;
	$redirect_url .= "&log=".rawurlencode($log);
echo "redirect_url - ".$redirect_url;
echo "<br>";
	echo("<script>location.href='$redirect_url'</script>");

}
// -----------------------------------------------------end if action mkdir

// ****************************************
// изменить права доступа
// ****************************************
if ($action == "chmod")
  {
	if (isset($_REQUEST['ch_filename']))
	  {
		$filename=$_REQUEST['ch_filename']; 
		echo $filename;
	  }
	else
	  {
		echo "<font color=\"red\"><h2> file name undefined... </h2></font>";
		exit ();
	  }

	if (isset($_REQUEST['rights']))
	  {
		$rights=$_REQUEST['rights']; 
	  }
	else
	  {
		echo "<font color=\"red\"><h2> rights undefined... </h2></font>";
		exit ();
	  }

	if (chmod ($filename, octdec($rights)))
	  {
		echo "<font color=\"green\"><h2> changed rights success... </h2></font>";
	  }
	else
	  {
		echo "<font color=\"red\"><h2> changed rights failed... </h2></font>";
	  }
}
// -----------------------------------------------------end if action chmod

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
	$value = $_REQUEST['filename'];

print <<<EOF
<form  name='textbox' method=post  action=$s1>
<table border=0 width=95%>
	<tr>
		<td valign=top width=5>
		</td>
		<td valign=top>
<input type=text size=50 name=filename value='$value'>
<input type=submit name=action value='save_changes'><br><br>
<input type='button' size=10 onclick='getElementById("textbox").value = "";' value='clear'/>
<input type='checkbox'  name='backup_copy' value='0' onclick='make_backup_copy();'/>backup copy
		</td>
	</tr>

	<tr>
		<td valign=top width=5>
		</td>
		<td>
			<textarea name="textbox" id="textbox" rows=40 cols=140>
EOF;

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

print <<<EOF
			</textarea>
		</td>
	</tr>
</table>
</form>
EOF;

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

bottom_page();

?>

