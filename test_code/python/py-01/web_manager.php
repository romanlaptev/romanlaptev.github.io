<?php
//#!/opt/bin/php
//echo "Content-type: text/html\n";
//echo "\n";

//****************************************
// Вывести атрибуты файла
// ****************************************
function dump ($st)
  {
// отображаем только ассоциативную часть
//   echo "<pre>";
//   print_r(array_slice($st, 13));
//   echo "</pre>";

   $dev = $st[0];		 //device/устройство
   $ino = $st[1]; 		//inode
   $mode = $st[2];		//метод защиты inode
   $nlink = $st[3];		//количество ссылок
   $uid = $st[4];		//user id владельца
   $gid = $st[5];		//group id владельца
   $rdev = $st[6];		//тип устройства, если inode device
   $size = $st[7];		//размер в байтах
   $atime = $st[8];		//время последнего доступа
   $mtime = $st[9];	//время последней модификации
   $ctime = $st[10];	//время последнего изменения
   $blksize = $st[11];	// blocksize для файловой системы I/O
   $blocks = $st[12];	// количество выделенных блоков

//   date_default_timezone_set('Asia/Novosibirsk');
   $n1 = $size /1024;
   $n2 = round( $n1,2);
   print "<td>".$n2. "</td>"; // size
   print "<td class=e5-2>".$uid."</td>";
   print "<td class=e5-2>".$gid."</td>";
//#   print "<td>", time.ctime(ctime),"</td>" #- created
//#   print "<td>", time.ctime(atime),"</td>" #- last accessed
   print "<td class=e5-2>".date ("j M Y H:i:s",$mtime)."</td>"; #- last modified
//   print "<td class=e5-2>", oct(mode),"</td>" #- mode
//#   print "<td>", ino, dev,"</td>" #- inode/dev
   }
//-----------------------------------------------------
//****************************************
// Вывести атрибуты файла и запись в файл
// ****************************************
function dump_file ($st, $file1)
  {

   $dev = $st[0];		 //device/устройство
   $ino = $st[1]; 		//inode
   $mode = $st[2];		//метод защиты inode
   $nlink = $st[3];		//количество ссылок
   $uid = $st[4];		//user id владельца
   $gid = $st[5];		//group id владельца
   $rdev = $st[6];		//тип устройства, если inode device
   $size = $st[7];		//размер в байтах
   $atime = $st[8];		//время последнего доступа
   $mtime = $st[9];	//время последней модификации
   $ctime = $st[10];	//время последнего изменения
   $blksize = $st[11];	// blocksize для файловой системы I/O
   $blocks = $st[12];	// количество выделенных блоков

//   date_default_timezone_set('Asia/Novosibirsk');
   $n1 = $size /1024;
   $n2 = round( $n1,2);

   fwrite($file1,"<td>".$n2. "</td>\n"); // size
   fwrite($file1,"<td class=e5-2>".$uid."</td>\n");
   fwrite($file1,"<td class=e5-2>".$gid."</td>\n");
   fwrite($file1,"<td class=e5-2>".date ("j M Y H:i:s",$mtime)."</td>\n");
   }
//-----------------------------------------------------


//*********************************************************************************
// Сформировать индексную страницу текущего каталога
//*********************************************************************************
function ls ($fs_path)
  {
//    print $fs_path;
   global $server_root; 
   global $dir_path; 
   global $top_title; 
   global $name_script; 

   print "<html>\n";
   print "<head>\n";
   print "<title>".$server_root .$dir_path."</title>\n";
   print "<meta http-equiv=Expires content=0>\n";
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>\n";
   print "<link rel=STYLESHEET href=".$server_root ."/css/style.css type=text/css>\n";
   print "</head>\n";
   print "<body>\n";

//   print "<script language=JavaScript src=".$server_root."/js/p1.js></script>\n";
   print "<script language=JavaScript src=".$server_root."/js/config.js></script>\n";
   print "<script language=JavaScript src=".$server_root."/js/functions.js></script>\n";

   print "<table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100% align=center>\n";
   print "   <tr>\n";
   print "     <td class=".$top_title." align=center>\n";
   print $server_root .$dir_path;
   print "     </td>\n";
   print "   </tr>\n";
   print "</table>\n";

//-------------------------------------------------------
// Возврат на верхний уровень файловой системы
//--------------------------------------------------------
   $n1= strrpos($dir_path, "/"); //поиск последней позиции, где встречается символ "/".
   $url = substr($dir_path, 0, $n1);

   print "<table border=0 cellpadding=0 cellspacing=10 width=100% align=center>\n";
   print "<tr>\n";
   print "<td width=20%>\n";
   print "<a href=".$server_root."/cgi-bin/".$name_script."?action=list_dir&dir_path=".$url."> up </a>\n";
   print "</td>";

   print "<form name=form_ls method=post action=>\n";

   print "<td>\n";
   print "<input type=text size=60 name=desc value=\"description\">\n";
//   print "<div id=desc style=\"position: absolute; left: 500px; top: 70px; visibility: hidden\">\n";
//   print "<p>\n";
//   print "filename\n";
//   print "</p>\n";
//   print "</div>\n";
   print "</td>";

//--------------------------------------------------------
// Выбор действия над отмеченным файлом
//--------------------------------------------------------
   print "<td align=right>\n";
   print "<select name=change_action onChange='javascript:select_change_action();'>\n";
   print "<option value=select selected> select action         </option>\n";
   print "<option value=add> add file          </option>\n";
   print "<option value=delete> delete file          </option>\n";
   print "<option value=edit> edit file          </option>\n";
   print "</select>";

   print "</tr>\n";
   print "</table>\n";

   print "<table border=1 cellpadding=0 cellspacing=0 width=100% align=center>\n";
   print "<tr>\n";
   print "<td class=broun2 width=20%><b> Filename </b></td>\n";
   print "<td class=broun2 width=5%><b> size, kb </b></td>\n";
   print "<td class=broun2 width=5%><b> uid </b></td>\n";
   print "<td class=broun2 width=5%><b> gid </b></td>\n";
//   # print "<td class=broun2 width=15%><b> created </b></td>\n";
//   # print "<td class=broun2 width=15%><b> last accessed </b></td>\n" ;
   print "<td class=broun2 width=15%><b> last modified </b></td>\n";
//   print "<td class=broun2 width=5%><b> mode </b></td>\n";
//   # print "<td class=broun2 width=10%><b> inode/dev </b></td>\n";
   print "<td class=broun2 width=5%><b> action </b></td>\n";
   print "</tr>";

   $dh  = opendir($fs_path);
   while (false !== ($filename = readdir($dh))) 
     {
       print "<tr>\n";
       $fstat = stat($fs_path."/".$filename); // gather statistics

       if (($filename!=".") && ($filename!=".."))
         {
             //$filename = urlencode($filename);

             if (is_dir ($fs_path."/".$filename) ) 
               { 
                 print "<td><a href=".$server_root."/cgi-bin/".$name_script."?action=list_dir&dir_path=".$dir_path."/".$filename."> + ".$filename."</a></td>\n";
                 dump($fstat);
                 print "<td align=center>&nbsp</td>\n";
               }
//----------------------------------------------------------------------------------------------
             if (is_file($fs_path."/".$filename)) 
               { 
/*
//----------------------------------------------------------------------------------------------
// Формирование текста описания, на основе содержания заголовка страницы
//----------------------------------------------------------------------------------------------
                  $desc='';
                  $handle = fopen($fs_path."/".$filename,"r");
                  if (!$handle)
                    {
                       echo("Open ".$fs_path."/".$filename." error");
                    } 
                  else
                   {
                      $buffer = fread($handle,1000);
                      $start_pos = strpos($buffer,"<title>") + strlen("<title>"); // поиск тега <title> и определение нач. позиции текста заголовка
                      $end_pos = strpos($buffer,"</title>"); // поиск тега </title>
                      for ($n2=$start_pos; $n2 < $end_pos; $n2++)
                         {
                            $desc = $desc.htmlspecialchars($buffer[$n2]);
                         }
                   }
                 fclose ($handle);

                 if (strlen ($desc) == 0)
                   {
                     $desc = "no description";
                   } 
//----------------------------------------------------------------------------------------------
*/
                  $desc = "no description";
                  print "<td><a href=".$server_root.$dir_path."/".rawurlencode($filename)." onMouseOver=\"showDesc('$desc')\">&nbsp;&nbsp;&nbsp;".$filename."</a></td>\n";
                  dump($fstat);
                  print "<td align=center>\n";
                  print "<input type=checkbox name=".$filename." value=".$fs_path."/".$filename.">\n";
                  print "</td>";
// -----------------------------------------------------
               }
         }
     }
   print "</tr>\n";
   print "</table>\n";
   print "</form>\n";

//   print "<script language=JavaScript src=".$server_root."/js/p2.js></script>\n";
   print "</body>\n";
   print "</html>\n";

  } 


//*********************************************************************************
// Сформировать индексную страницу текущего каталога и записать ее во временный файл
//*********************************************************************************
function ls_file ($fs_path, $temp_page)
  {
   global $server_root; 
   global $dir_path; 
   global $top_title; 
   global $name_script; 

   $file1 = fopen($temp_page,"w");

   fwrite($file1,"<script language=JavaScript src=".$server_root."/js/functions.js></script>\n");

   fwrite($file1,"<table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100% align=center>\n");
   fwrite($file1,"   <tr>\n");
   fwrite($file1,"     <td class=".$top_title." align=center>\n");
   fwrite($file1, $server_root .$dir_path."\n");
   fwrite($file1,"     </td>\n");
   fwrite($file1,"   </tr>\n");
   fwrite($file1,"</table>\n");

//-------------------------------------------------------
// Возврат на верхний уровень файловой системы
//--------------------------------------------------------
   $n1= strrpos($dir_path, "/"); //поиск последней позиции, где встречается символ "/".
   $url = substr($dir_path, 0, $n1);

   fwrite($file1,"<table border=0 cellpadding=0 cellspacing=10 width=100% align=center>\n");
   fwrite($file1,"<tr>\n");
   fwrite($file1,"<td width=20%>\n");
   fwrite($file1,"<a href=".$server_root."/cgi-bin/".$name_script."?action=list_dir&dir_path=".$url."> up </a>\n");
   fwrite($file1,"</td>\n");

   fwrite($file1,"<form name=form_ls method=post action=>\n");

   fwrite($file1,"<td>\n");
   fwrite($file1,"<input type=text size=60 name=desc value=\"description\">\n");
   fwrite($file1,"</td>\n");

//--------------------------------------------------------
// Выбор действия над отмеченным файлом
//--------------------------------------------------------
   fwrite($file1,"<td align=right>\n");
   fwrite($file1,"<select name=change_action onChange='javascript:select_change_action();'>\n");
   fwrite($file1,"<option value=select selected> choose action         </option>\n");
   fwrite($file1,"<option value=add> add file          </option>\n");
   fwrite($file1,"<option value=delete> delete file          </option>\n");
   fwrite($file1,"<option value=edit> edit file          </option>\n");
   fwrite($file1,"</select>\n");

   fwrite($file1,"</tr>\n");
   fwrite($file1,"</table>\n");

   fwrite($file1,"<table border=1 cellpadding=0 cellspacing=0 width=100% align=center>\n");
   fwrite($file1,"<tr>\n");
   fwrite($file1,"<td class=broun2 width=20%><b> Filename </b></td>\n");
   fwrite($file1,"<td class=broun2 width=5%><b> size, kb </b></td>\n");
   fwrite($file1,"<td class=broun2 width=5%><b> uid </b></td>\n");
   fwrite($file1,"<td class=broun2 width=5%><b> gid </b></td>\n");
   fwrite($file1,"<td class=broun2 width=15%><b> last modified </b></td>\n");
   fwrite($file1,"<td class=broun2 width=5%><b> action </b></td>\n");
   fwrite($file1,"</tr>\n");

   $dh  = opendir($fs_path);
   while (false !== ($filename = readdir($dh))) 
     {
        fwrite($file1,"<tr>\n");
       $fstat = stat($fs_path."/".$filename); // gather statistics

       if (($filename!=".") && ($filename!=".."))
         {
             //$filename = urlencode($filename);

             if (is_dir ($fs_path."/".$filename) ) 
               { 
                  fwrite($file1,"<td><a href=".$server_root."/cgi-bin/".$name_script."?action=list_dir&dir_path=".$dir_path."/".$filename."> + ".$filename."</a></td>\n");
                 dump_file ($fstat, $file1);
                 fwrite($file1,"<td align=center>&nbsp</td>\n");
               }
//----------------------------------------------------------------------------------------------
             if (is_file($fs_path."/".$filename)) 
               { 
                  $desc = "no description";
                  fwrite($file1,"<td><a href=".$server_root.$dir_path."/".rawurlencode($filename)." onMouseOver=\"showDesc('$desc')\">&nbsp;&nbsp;&nbsp;".$filename."</a></td>\n");
                  dump_file ($fstat, $file1);
                  fwrite($file1,"<td align=center>\n");
                  fwrite($file1,"<input type=checkbox name=".$filename." value=".$fs_path."/".$filename.">\n");
                  fwrite($file1,"</td>\n");
// -----------------------------------------------------
               }
         }
     }
   fwrite($file1,"</tr>\n");
   fwrite($file1,"</table>\n");
   fwrite($file1,"</form>\n");

   fclose ($file1);

   print "<html>\n";
   print "<head>\n";
   print "<title>".$server_root .$dir_path."</title>\n";
   print "<meta http-equiv=Expires content=0>\n";
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>\n";
   print "<link rel=STYLESHEET href=".$server_root ."/css/style.css type=text/css>\n";
   print "</head>\n";
   print "<body>\n";

   print "<script language=JavaScript src=".$server_root."/js/p1.js></script>\n";
   print "<script language=JavaScript src=".$server_root."/js/functions.js></script>\n";


   print "<iframe width=100% height=100% name=content_frame scrolling=auto style='background-color: lightblue;'> </iframe>\n";

   print "<script language=JavaScript src=".$server_root."/js/p2.js></script>\n";
   print "</body>\n";
   print "</html>\n";

   print "<script language=JavaScript >\n";
   $url = $server_root."/temp.html";
   print "load_content_frame ('$url');";
   print "</script>\n";

  } 

//***************************************
// MAIN 
//***************************************
include ("config.php"); // Вставка переменных из файла конфигурации
include ("functions.php");

//****************************************
// Определяем метод запроса
//****************************************
    if (isset($_SERVER ['REQUEST_METHOD']))
      {
        $query = $_SERVER ['REQUEST_METHOD'];
      }
//  print "<b>".$query."</b><br>\n";

//****************************************
// Определяем интерфейс между PHP и вебсервером (SAPI)
//****************************************
$sapi_type = php_sapi_name();
//print "interface between web server and PHP - ".$sapi_type."<br>\n";

if ($sapi_type == 'cli')
  {
//    echo "You are using Command line interface PHP\n";
//****************************************
// Извлекаем параметры из запроса GET
//****************************************
    if ($query == "GET")
      {
       $action=cli_get_query_var1 ('action'); // получить переменные запроса, через разбор функциями строки запроса
       $dir_path=cli_get_query_var1 ('dir_path'); // получить переменные запроса, через разбор функциями строки запроса
       $filename=cli_get_query_var1 ('filename'); // получить переменные запроса, через разбор функциями строки запроса
      }
  } 
else
  {
//****************************************
// Извлекаем параметры из запроса GET
//****************************************
    if ($query == "GET")
      {
       $action=mod_get_query_var1 ('action'); // получить переменные запроса через массивы GET 
       $dir_path=mod_get_query_var1 ('dir_path'); // получить переменные запроса через массивы GET 
       $filename=mod_get_query_var1 ('filename'); // получить переменные запроса через массивы GET 
      }
  }

if (isset($action))
  {
//    print "action= ".$action."<br>";
// ****************************************
// получить список файлов директории
// ****************************************
    if ($action == "list_dir")
      {
        $fs_path = $fs_root;
        if (isset($dir_path))
          {
            if ($dir_path > "")
              {
                $fs_path = $fs_root.$dir_path;
              }
            else
              {
//                    print "<b> dir_path is empty </b><br>";
              }
          }

       ls ($fs_path);  // Сформировать индексную страницу текущего каталога

//       ls_file ($fs_path,$temp_page);  // Сформировать индексную страницу текущего каталога и запись в файл
//       readfile ($temp_page);

     }

# ****************************************
# удаление файла 
# ****************************************
     if ($action == "delete")
       {
         echo "Delete $filename <br>\n";
         if (!unlink ($filename))
           {
             echo "cant remove $filename <br>\n";
           }
       }
  }
else
  {
    echo "<b> var action is not set </b><br>"; 
  }
 
?>
