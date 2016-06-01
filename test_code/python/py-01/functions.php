<?php

//********************************************************************
// Извлекаем параметры из HTTP-запроса в список
//********************************************************************
function get_query_var ($s1)
  {
//   echo "s1= ".$s1."<br>";
   $s2 = explode("&", $s1); // разбить строку запроса на элементы, разделенные &
   $n1 =  sizeof($s2);          // получить кол-во переменных

   for ($n2=0; $n2 < $n1; $n2++)
         {
// разделить переменные и значения по отдельным элементам массива
           $s3[$n2] = explode("=", $s2[$n2]);  // разбить элемент массива, на элементы, разделенные &
// Декодирование значений найденных переменной и вставка пробелов
           $s3 [$n2][1] = rawurldecode($s3 [$n2][1]);
           $s3 [$n2][1] = str_replace("+"," ",$s3 [$n2][1]);
         }
//   echo "<pre>";
//   print_r ($s3);
//   echo "</pre>";

   return $s3;
  }

//********************************************************************
//Поиск в сформированном списке запроса, необходимой переменной
// если значение первого элемента массива = названию переменной, то вернуть значение второго элемента
//********************************************************************
function find_query_var ($s1,$keyword)
  {
//    echo "keyword= ".$keyword."<br>";
   $n1 =  sizeof ($s1);          // получить кол-во элементов массива переменных запроса
   for ($n2=0; $n2 < $n1; $n2++)
         {
//           print $s1[$n2][0]."=".$s1[$n2][1]."<br>";
           if ($s1[$n2][0] == $keyword) 
             {
               $res = $s1[$n2][1];
             }
         }
// ----------------------------------
  if (isset($res))
      {
        return $res;
      }
    else
      {
        echo "<b>var res is not set </b><br>"; 
      }
  }
//-----------------------------------------------------
//********************************************************************
// получить переменные запроса, через разбор функциями строки запроса
//********************************************************************
function  cli_get_query_var1 ($name_var)
  {
    // проверить наличие CGI-переменных массива _SERVER
    if (isset($_SERVER['CGI_'.$name_var]))
      {
         $res = $_SERVER['CGI_'.$name_var];
         $s1 = ""; // строка запроса больше не нужна
       }

    if (isset($res))
      {
//        print "<b>res = ".$res."</b><br>\n";
        return $res;
      }
   else
     {
//        echo "<b>var res is not set </b><br>"; 
     }
  }

//********************************************************************
// получить переменные запроса, через разбор функциями строки запроса
//********************************************************************
function  cli_get_query_var2 ($name_var)
  {
    global $s1;
   //  выделить переменные из строки запроса s1
    if ($s1 > "") 
      {
//         print $s1."<br>\n";
         $list_query = get_query_var ($s1);
//       print "list_query= <br>";
//       echo "<pre>";
//       print_r ($list_query);
//       echo "</pre>";
// в массиве переменных запроса, найти переменную name_var
         $res = find_query_var ($list_query, $name_var);
      }

    if (isset($res))
      {
//        print "<b>res = ".$res."</b><br>\n";
        return $res;
      }
   else
     {
        echo "<b>var res is not set </b><br>"; 
     }
  }

//********************************************************************
// получить переменные запроса, через массив GET
//********************************************************************
function  mod_get_query_var1 ($name_var)
  {
    $res = $_GET [$name_var];
//    print "<b>res = ".$res."</b><br>\n";
    if (isset($res))
      {
        return $res;
      }
    else
      {
//        echo "<b>var res is not set </b><br>"; 
      }
  }

//********************************************************************
// получить переменные запроса, через массив POST
//********************************************************************
function  mod_get_query_var2 ($name_var)
  {
    $res = $_POST [$name_var];
//    print "<b>res = ".$res."</b><br>\n";
    if (isset($res))
      {
        return $res;
      }
    else
      {
        echo "<b>var res is not set </b><br>"; 
      }
  }


//***************************************
// list files
//***************************************
function list_dir ($dirname)
  {
    //echo $dirname;
    global $dirs;
    global $files;

    $dh  = opendir($dirname);
    while (false !== ($filename = readdir($dh))) 
     {
       if (($filename!=".") && ($filename!=".."))
         {

             if (is_dir ($dirname."/".$filename) ) 
               { 
//                  $dirs[] = $dirname."/".$filename;
                  $dirs[] = $filename;
//    print_r ($dirs)."<br>\n";
               }
//----------------------------------------------------------------------------------------------
             if (is_file($dirname."/".$filename)) 
               { 
                  $files[] = $filename;
               }
          }
      }

  }


// ************************************************************************************
// Поиск файлов по заданной маске
// ************************************************************************************
function find_files ($dirname,$recource,$mask)
  {
    global $n_dir;
    global $n_file;
    global $dirs;
    global $files;
    global $num_find;

//echo $dirname."<br>";
//echo  strlen($dirname)."<br>";
    chdir($dirname);
//$cur_dir=getcwd();
//echo $cur_dir."<br>";
//exit;

    $handle  = opendir($dirname);
    while (false !== ($filename = readdir($handle))) 
      {
         if (($filename!=".") && ($filename!=".."))
           {
//             print $dirname."/".$filename."<br>";

// если маска поиска существует
             if  (!empty($mask)) 
               { 
                // поиск совпадения с маской (без учета регистра)
                if  (substr_count(strtolower($filename),strtolower($mask)) > 0) 
                  { 
                     if (is_file($filename)) 
                       { 
                         $num_find=$num_find+1;
                         $files[] = $dirname."/".$filename;
                       }
                  }
                if  ($mask =="*") 
                  { 
                     if (is_file($filename)) 
                       { 
                         $num_find=$num_find+1;
                         $files[] = $dirname."/".$filename;
                       }
                  }
               }

             if (is_dir ($filename) ) 
               { 
                  $n_dir=$n_dir+1;
                  $dirs[] = $dirname."/".$filename;
                  // Рекурсивный поиск, если установлен флаг рекурсии
                  if ($recource == 1 ) 
                    { 
                      find_files ($dirname."/".$filename,$recource,$mask);
                      chdir("..");
                    }
               }
//----------------------------------------------------------------------------------------------
             if (is_file($filename)) 
               { 
                  $n_file=$n_file+1;
//                  $files[] = $filename;
               }
           }
      }
   closedir ($handle);
//   print "<b> Directory: ".$n_dir."<br> Files: </b>".$n_file."<br>";

 }
// ************************************************************************************

//***************************************
// generate html code
//***************************************
function gen_html_page ($dir,$server_root,$document_root,$spath)
  {
     global $dirs;
     global $files;
     global $top_title;

     echo "<html>\n";
     echo "<head>\n";
     echo "<title> list of  $server_root/$spath </title>\n";
     echo "<meta http-equiv=Expires content=0>\n";
//     echo "  <meta http-equiv=Content-Type content=text/html; charset=utf-8>\n";
//     echo "  <meta http-equiv=Content-Type content=text/html; charset=windows-1251>\n";
     echo "<link rel=STYLESHEET href=$server_root/$document_root/css/style.css type=text/css>\n";
     echo "</head>\n";

     echo "<body>\n";
     echo "
<script language=JavaScript>
function select_change_action()
 {
   var num = 0;
   var a = '';
   num = document.forms.form_view_change.change_action.selectedIndex;
   a = document.forms.form_view_change.change_action[num].value;

//---------------------------
   if (a == 'add')
     {
      title = 'Add file';
      window_sett='directories=no,menubar=no,toolbar=no,scrollbars=yes';

      var w = window.screen.width / 1.2;
      window_width = 'width = '+ w;
      var h = window.screen.height / 1.6;
      window_height = 'height = '+ h;

      var url ='$server_root/cgi-bin/change.php?action=add&w='+ w + '&h='+ h + '&spath=$spath';
      window.open (url, title, window_sett +','+ window_height +','+ window_width);
//      window.back();
      window.blur();
      location.reload();

     } 

//---------------------------
   if (a == 'delete')
     {
      var frm = document.form_view_change;

      for ( var n1=1; n1 < frm.elements.length; n1++)
         {
          var elmnt = frm.elements[n1];

          if  (elmnt.type=='checkbox') 
           {
               if (elmnt.checked == true)
                { 
//                   window.alert ('remove '+ elmnt.value);
                   var url ='$server_root/cgi-bin/change.php?action=remove&filename='+ elmnt.value + '&spath=$spath';
                   window.open (url);
                   elmnt.checked = false;
                }
           }

         }

     } 
//---------------------------
   if (a == 'edit')
     {
//      window.alert ('edit link!');
      var frm = document.form_view_change;
      for ( var n1=1; n1 < frm.elements.length; n1++)
         {
          var elmnt = frm.elements[n1];
          if  (elmnt.type=='checkbox') 
           {
               if (elmnt.checked == true)
                { 
                  elmnt.checked = false;

                  title = a;
                  var url ='$server_root/cgi-bin/change.php?action=edit&filename='+ elmnt.value + '&spath=$spath';
                  window.open (url, title);

                }
           }
         }
     } 

   document.forms.form_view_change.change_action.selectedIndex = 0;

 }
</script>";

    echo "<SCRIPT language=JavaScript src=$server_root/$document_root/js/p1.js></SCRIPT>\n";
//     include("../php/p1.php");

//     echo "<h2> list of  $server_root/$spath </h2>\n";

     $dirs_num=sizeof($dirs);
     $files_num=sizeof($files);
//     echo "<b>Dirs: </b> ".$dirs_num." </br>\n";
//     echo "<b>Files: </b> ".$files_num." </br>\n";
//     echo "<hr>\n";

//    echo "<form name=form_view_change method=post action=>\n";
    echo "<form name=form_view_change method=post action=$server_root/cgi-bin/change.php>\n";

    echo "    <table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100%>\n";
    echo "     <tr>\n";
    echo "       <td class=$top_title align=center>\n";
    echo "          $spath\n";
    echo "       </td>\n";
    echo "     </tr>\n";
    echo "    </table>\n";

    echo "    <table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100%>\n";
    echo "     <tr>\n";
    echo "       <td align=right>\n";
    echo "<select name=change_action onChange='javascript:select_change_action();'>\n";
    echo "<option value=select selected> выберите действие          </option>\n";
    echo "<option value=add> добавить          </option>\n";
    echo "<option value=delete> удалить          </option>\n";
    echo "<option value=edit> редактировать          </option>\n";
    echo "</select>\n";
//    echo "<input type=submit value='>>>>'>\n";
    echo "       </td>\n";
    echo "     </tr>\n";
    echo "    </table>\n";

    echo "<table border=0 cellpadding=0 cellspacing=0  width=95% align=center>\n";
    echo " <tbody>\n";

//--------------------------------------------------------
// Возврат на верхний уровень файловой системы
//--------------------------------------------------------
    echo "    <tr>\n";
    echo "     <td width=10% align=left>\n";
//поиск последней позиции, где встречается символ "/".
    $n2=strrpos($spath, "/");
    $str1 = substr($spath,0,$n2);
//    echo $str1."<br>\n";

    $url=$server_root."/cgi-bin/change.php?spath=".$str1."&action=list_dir";
    echo "<a href='".$url."'> up </a></br>\n";
    echo "     </td>\n";

    echo "     <td align=left>\n";
    echo "\n";
    echo "     </td>\n";
    echo "    </tr>\n\n";

//--------------------------------------------------------
// Печать списка каталогов
//--------------------------------------------------------
    for ($n1=0; $n1 < $dirs_num; $n1++)
       {
          $url=$server_root."/cgi-bin/change.php?spath=".$spath."/".$dirs[$n1]."&action=list_dir";
          $url_name = $dirs[$n1];

          echo "    <tr >\n";
          echo "     <td width=10% align=center>\n";
          echo "+\n";
          echo "     </td>\n";
          echo "     <td align=left>\n";
          echo "<a href='".$url."'>\n".$url_name."  </a></br>\n";
          echo "     </td>\n";
          echo "    </tr>\n\n";
       }
    echo " </tbody>\n";
    echo "</table>\n";

//--------------------------------------------------------
// Печать списка файлов
//--------------------------------------------------------
    echo "<table border=1 cellpadding=1 cellspacing=1  width=95% align=center>\n";
    echo " <tbody>\n";
    for ($n1=0; $n1 < $files_num; $n1++)
       {
          $url=$server_root."/".$spath."/".$files[$n1];
          $url_name='';

// Формирование текста ссылки, на основе содержания заголовка страницы
//--------------------------------------------------------
          $handle = fopen($dir."/".$files[$n1],"r");
          if (!$handle)
            {
              echo("Open ".$dir."/".$files[$n1]." error");
            } 
          else
            {
             $buffer = fread($handle,1000);
// поиск тега <title> и определение нач. позиции текста заголовка
             $start_pos = strpos($buffer,"<title>") + strlen("<title>");
// поиск тега </title>
             $end_pos = strpos($buffer,"</title>");
             for ($n2=$start_pos; $n2 < $end_pos; $n2++)
                {
                  $url_name = $url_name.htmlspecialchars($buffer[$n2]);
                }
            }
          fclose ($handle);
//--------------------------------------------------------
          if (strlen ($url_name) == 0)
            {
//             $url_name = $files[$n1]." (no title)";
             $url_name = $files[$n1];
            } 

          echo "    <tr>\n";
          echo "     <td align=center>\n";
          $num=$n1+1;
          echo $num.".\n";
          echo "     </td>\n";

          echo "     <td>\n";
          echo "<a href='".$url."'>\n".$url_name."  </a></br>\n";
          echo "     </td>\n";

          echo "     <td align=center>\n";
          echo "<input type=checkbox name=$n1 value=$files[$n1]> \n";
          echo "     </td>\n";

          echo "    </tr>\n\n";
        }

     echo " </tbody>\n";
     echo "</table>\n";
//     echo "<input type=submit value='run script'>\n";
     echo "</form>\n";

//     include("../php/p2.php");
     echo "<SCRIPT language=JavaScript src=$server_root/$document_root/js/p2.js></SCRIPT>";
     echo "</body>\n";
     echo "</html>\n";
  } 
// **********************************************************************************


// ****************************
//  create html page
// ****************************
function create_html_page ($dirname,$html_links,$html_page,$annotatio,$manage,$view_dir)
  {
     global $dirs;
     global $files;

     echo "dirname= ".$dirname."<br>";
     echo "html_links=".$html_links."<br>";
     echo "html_page=".$html_page."<br>";
     echo "annotatio=".$annotatio."<br>";
     echo "manage=".$manage."<br>";
     echo "view_dir=".$view_dir."<br>";

     $file1 = fopen($html_page,"w");
     fwrite($file1,"<html>\n");
     fwrite($file1,"<head>\n");
     fwrite($file1,"<title>".basename($html_page)."</title>\n");
     fwrite($file1,"<meta http-equiv=Expires content=0>\n");

//     if (PHP_OS == 'Linux')
//       {
//         fwrite($file1,"  <meta http-equiv=Content-Type content=text/html; charset=utf-8>\n");
//       }

//     if (PHP_OS == 'WINNT')
//       {
         fwrite($file1,"      <meta http-equiv=Content-Type content=text/html; charset=windows-1251>\n");
//       }

     fwrite($file1,"<link rel=STYLESHEET href=css/style.css type=text/css>\n");

//     fwrite($file1,"<base href=".$html_links.">\n");
     fwrite($file1,"</head>\n");
     fwrite($file1,"<body>\n");

date_default_timezone_set('Asia/Novosibirsk');
     fwrite($file1,"Last modified ".basename($html_page). ": <b>" . date ("F d Y H:i:s.", filemtime($html_page))."</b></br>\n");

     $dirs_num=sizeof($dirs);
     fwrite($file1,"<b>Directory: </b> ".$dirs_num." </br>\n");
     $files_num=sizeof($files);
     fwrite($file1,"<b>Files: </b> ".$files_num." </br>\n");


     fwrite($file1,"<table border=1 cellpadding=1 cellspacing=1  width=90% align=center>\n");
     fwrite($file1,"  <tbody>\n");
//---------------------------------------------------------------------------------------------
// Создание содержания
//---------------------------------------------------------------------------------------------
     fwrite($file1,"<a name=content> <h2>content  </h2></a>\n");
     for ($n1=0; $n1 < $files_num; $n1++)
      {
        $num=$n1+1; // порядковый номер ссылки
        fwrite($file1,$num.".<a href=#".$num.">  ".$files[$n1]."  </a></br>\n");
      }

//---------------------------------------------------------------------------------------------
// Вывод названий папок, если установлен флаг 
//---------------------------------------------------------------------------------------------
     if ($view_dir == 1 ) 
       { 

         for ($n1=0; $n1 < $dirs_num; $n1++)
            {
               fwrite($file1,"    <tr>\n");
               fwrite($file1,"      <td width=95%>\n");
//               echo $dirs[$n1]."</br>\n";
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Вырезать из строки файлового имени абсолютный путь (/mnt/win_e/lib/books/.....) и подставить ссылку (http://mycomp/lib....)
               $str1 = $dirname;
               $str2 = $dirs[$n1];
               $n3= strlen($str1); 
               $string = substr($str2, $n3);
               $url = $html_links.$string;
//         echo "url = ".$url."<br>\n";
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// перевод строки в hex-символы (русские названия преобразуются в hex)
               $str_exp = explode("/", $url);
//        print_r($str_exp)."<br>\n";
               $url_name = $str_exp[sizeof($str_exp)-1];

// нужно пропускать первый элемент строки (http:)
               for ($n2=1; $n2 < sizeof($str_exp); $n2++)
                  {
                     $str_exp[$n2]=rawurlencode($str_exp[$n2]); 
//              echo  $str_exp[$n2]."<br>\n";
                  }
               $url = implode("/", $str_exp);
//      print_r($url)."<br>\n";

//      fwrite($file1,"<a href='".$url."'>  ".basename($files[$n1])."  </a></br>\n");
               $num=$n1+1; // порядковый номер ссылки
               fwrite($file1,$num.".<a href='".$url."'>  ".$url_name."  </a></br>\n");
//--------------------------------------------------------------------------------------------------------------------------------------------------------
            }

       fwrite($file1,"     </td>\n");
       fwrite($file1,"    </tr>\n");

      }

//-------------------------------------------------------------------------------------
// Вывод названий файлов
//-------------------------------------------------------------------------------------
     for ($n1=0; $n1 < $files_num; $n1++)
      {
        fwrite($file1,"<tr>\n");
        fwrite($file1,"      <td width=95%>\n");
//         echo $files[$n1]."</br>\n";

         $url = $files[$n1];
//-------------------------------------------------------------------------------------
// перевод строки в hex-символы (русские названия преобразуются в hex)
        $str_exp = explode("/", $url);
//        print_r($str_exp)."<br>\n";
        $url_name = $str_exp[sizeof($str_exp)-1];

       for ($n2=1; $n2 < sizeof($str_exp); $n2++)
           {
              $str_exp[$n2]=rawurlencode($str_exp[$n2]); 
//              echo  $str_exp[$n2]."<br>\n";
           }
        $url = implode("/", $str_exp);
//      print_r($url)."<br>\n";
        $encode_fs_link = $url;

//-------------------------------------------------------------------------------------
// Вырезать из строки файлового имени абсолютный путь (/mnt/win_e/lib/books/.....) и подставить ссылку (http://mycomp/lib....)
         $str1 = $dirname;
         $str2 = $url;
         $n3= strlen($str1); 
         $string = substr($str2, $n3);
         $url = $html_links.$string;
//          echo "url = ".$url."<br>\n";

//-------------------------------------------------------------------------------------
//      fwrite($file1,"<a href='".$url."'>  ".basename($files[$n1])."  </a></br>\n");
        $num=$n1+1; // порядковый номер ссылки

        fwrite($file1,"<a name=".$num."> </a></br>\n"); 
        fwrite($file1,$num.".<a href='".$url."'>  ".$url_name."  </a></br>\n");
//--------------------------------------------------------------------------------------
// Создать аннотацию для книги, если установлен флаг 
//--------------------------------------------------------------------------------------
        if ($annotatio == 1 ) 
          { 
// добавить в HTML-страницу первые 20 строк текущей книги
// сделать проверку типа файла (текст, графика)
           fwrite($file1,"<pre>\n");

           $textbook=$files[$n1];
           $book = fopen($textbook,"r");
           for ($n2=0; $n2 < 20; $n2++)
               {
    //           $buffer=fread($book,80);
                 $buffer=fgets($book);
                 fwrite($file1,$buffer);
               }
           fclose ($book);

           fwrite($file1,"</pre>\n");
          }
//--------------------------------------------------------------------------------------
// Добавить форму управления 
//--------------------------------------------------------------------------------------
           if ($manage == 1 ) 
             { 
                include ("config.php"); // Вставка переменных из файла конфигурации

// Вырезать из строки файлового имени абсолютный путь (/mnt/nas/public/lib.....)
                $n3= strlen($dir_lib); 
//                $string = substr($files[$n1], $n3);
                $string = substr($encode_fs_link, $n3);

                fwrite($file1,"<table border=1>\n");
                fwrite($file1,"<tr rowspan=2>\n");
                fwrite($file1,"<td>\n");

                fwrite($file1,"
<script>
function select_charset".$n1." (value_charset)
 {
//   window.alert ('".$server_root."/cgi-bin/lib_scripts/open_book.php?'+ value_charset);
   url = '".$server_root."/cgi-bin/lib_scripts/open_book.php?book=".$encode_fs_link."&charset='+value_charset;
   window.open (url);
 }

function delete_book_get_".$n1." ()
 {
   url = '".$server_root."/cgi-bin/lib_scripts/delete_book_get.php?delete_filename=". $encode_fs_link."';
   window.open (url);
 }

//function delete_book_post_".$n1." ()
// {
//   window.alert ('delete+book_post');
   //document.form".$n1.".submit();
//  url = '".$server_root."/cgi-bin/lib_scripts/delete_book.php';
//  window.open (url);
// }

</script>\n");

                fwrite($file1,"   <b> Открыть книгу в кодировке:  </b>
                         <a href='javascript:select_charset".$n1." (\"utf-8\");'>   utf-8 </a> |
                         <a href='javascript:select_charset".$n1." (\"windows-1251\");'>   windows-1251 </a> |
                         <a href='javascript:select_charset".$n1." (\"cp-866\");'>   cp-866 </a> \n");
                fwrite($file1,"</td>\n");

                fwrite($file1,"<td>\n");
                fwrite($file1,"   <b> Удалить книгу с помощью:  </b>\n");
                fwrite($file1,"<li><a href='javascript:delete_book_get_".$n1." ();'>delete book (PHP, GET method)</a>\n");

                fwrite($file1,"<form name=form".$n1." method=post action=".$server_root."/cgi-bin/lib_scripts/delete_book.php>\n");
                fwrite($file1,"<input type=hidden name=delete_filename value='".$files[$n1]."'>\n");
                fwrite($file1,"<input type=submit value='delete book (PHP, POST method)'>\n");
//                fwrite($file1,"<li><a href='#' onclick='javascript:delete_book_post_".$n1." ();'> delete book (PHP, POST method)\n");
                fwrite($file1,"</form>\n");

                fwrite($file1,"<li><a href=http://nas/www/cgi-bin/move_to_trash_book.cgi?".$string."> NAS: move_to_trash_book </a>\n");
                fwrite($file1,"<li><a href=http://nas/www/cgi-bin/delete_book.cgi?".$string."> NAS: delete book (shell) |</a>\n");
                fwrite($file1,"<li><a href=http://nas/www/cgi-bin/delete_book_py.cgi?".$string."> NAS: delete book (python) |</a>\n");

                fwrite($file1,"</td>\n");
                fwrite($file1,"</tr>\n");
                fwrite($file1,"</table>\n");
// при передаче методом GET пути, содержащего русское название, происходит перекодировка. Возникает несовпадение между кодировкой переданного
// параметра файлового пути (CP-1251), и кодировкой файловой системы (UTF-8). Скрипт не может удалить несуществующ. файл

// Shell-скрипт удаления не воспринимает путь, содержащий пробелы
// Передавать путь методом GET неудобно, т.к. после нажатия на SUBMIT (отправка формы), приходится перезагружать страницу с названиями книг
             }
//--------------------------------------------------------------------------------------------------------------------------------------------------------
       fwrite($file1,"<a href=".basename($html_page)."#content> <i>content  </i></a>\n");
       fwrite($file1,"     </td>\n");
       fwrite($file1,"    </tr>\n");
      }

     fwrite($file1," </tbody>\n");
     fwrite($file1,"</table>\n");
     fwrite($file1,"</body>\n");
     fwrite($file1,"</html>\n");
     fclose ($file1);
}
// ************************************************************************************

?>
