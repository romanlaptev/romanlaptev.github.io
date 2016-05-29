<?php
//#!/opt/bin/php
//echo "Content-type: text/html\n";
//echo "\n";

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
       $filename=cli_get_query_var1 ('filename'); // получить переменные запроса, через разбор функциями строки запроса
      }
//****************************************
// Извлекаем параметры из запроса POST
//****************************************
    if ($query == "POST")
       {
         // если массив  _POST пуст, то нужно считать строку запроса s1 со стандартного ввода
         $stdin = fopen ("php://stdin","r");
         if (!$stdin)
           {
             echo ("<b> error open stdin </b><br>");
           }
         else
           {
             $s1 = fgets(STDIN); // читаем строку из STDIN 
//             print "S1 =".$s1." <br>";
           }
         $action=cli_get_query_var2 ('action'); // получить переменные запроса, через разбор функциями строки запроса
         $filename=cli_get_query_var2 ('filename'); // получить переменные запроса, через разбор функциями строки запроса
         $textbox=cli_get_query_var2 ('textbox'); // получить переменные запроса, через разбор функциями строки запроса
       }
//-----------------------------------------------------------enf if
  } 
else
  {
//****************************************
// Извлекаем параметры из запроса GET
//****************************************
    if ($query == "GET") // получить переменные запроса через массивы GET 
      {
       $action=mod_get_query_var1 ('action'); 
       $filename=mod_get_query_var1 ('filename'); 
      }
//****************************************
// Извлекаем параметры из запроса POST
//****************************************
    if ($query == "POST") // получить переменные запроса через массивы POST
      {
         $action=mod_get_query_var2 ('action'); 
         $filename=mod_get_query_var2 ('filename');
         $textbox=mod_get_query_var2 ('textbox'); 

         //echo get_magic_quotes_gpc();
        if (get_magic_quotes_gpc()) 
          {
// отмена экранирования кавычек в тексте формы
           $textbox = stripslashes($textbox);
          }

      } 

  }  //-----------------------------------------------------------enf if

// ****************************************
//Редактировать текстовую форму
// ****************************************
if ($action == "edit")
  {
//    echo "edit $filename <br>\n";

    print "<html>\n";
    print "<head>\n";
    print "<title> notes </title>\n";
    print "<meta http-equiv=Expires content=0>\n";
    print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>\n";
    print "<link rel=STYLESHEET href=$server_root/css/style.css type=text/css>\n";
    print "</head>\n";
    print "<body>\n";

//    print "<a href=http://nas/www/cgi-bin/notepad.cgi?action=save_changes>save_changes </a>"
    print "<form  method=post  action=".basename($_SERVER['PHP_SELF']). ">\n";
    print "<table border=0 width=95%>\n";
    print "<tr>\n";
    print "<td valign=top width=5>\n";
    print "</td>\n";
    print "<td valign=top>\n";
    print "<input type=text size=100 name=filename value='$filename'>\n";
    print "<input type=submit name=action value='save_changes'><br><br>\n";
    print "<input type='button' size=10 onclick=\"getElementById('textbox').value = '';\" value='clear'/>";

    print "</td>\n";
    print "</tr>\n";

    print "<tr>\n";
    print "<td valign=top width=5>\n";
    print "</td>\n";

    print "<td>\n";
    print "<textarea id=textbox name=textbox rows=30% cols=100%>\n";

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

    print "</body>\n";
    print "</html>\n";
  }

// ****************************************
// Сохранить текстовую форму в файл
//****************************************
if ($action == "save_changes")
  {


//    $filename=rawurlencode($filename); // заменить в имени файла, пробелы на 16-ный код
    print "<h1>save_changes in $filename</h1>\n";


    if (isset($textbox))
      {
//        $textbox=htmlspecialchars ($textbox);
//        print "textbox= ".$textbox."<br>";
// Запись переменной (отредактированое содержимое формы) в файл
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
      }
    else
     {
       exit ("<b> var textbox is not set </b><br>"); 
     }
  }
?>

