<html>
<head>
<title> test </title>
<link href=test.css rel=stylesheet type=text/css>
</head>

<?

// Извлекаем параметры из запроса
 $action = $_REQUEST['action'];
 $num_q = $_REQUEST['num_q'];
 $user_otv = $_REQUEST['user_otv'];


// ********************************************************************************
// Проверка ответа пользователя
// ********************************************************************************
  if ($action == "check_test_answer")
    {

//      print ($action);
//      print ("<br>");
//      print ($num_q);
//      print ($user_otv);

     if ($num_q == "q1")
       {
         if ($user_otv == "otv3")
           {
            print ("<span class='success'> Правильно  ! <br>");
            print ("Массовое производство персональных компьютеров началось в 80-ые годы </span>"); 
           }
         else
           {
            print ("<span class='error'> Неправильно ! <br>");
            print ("Массовое производство персональных компьютеров началось в 80-ые годы </span>"); 
           }
       }

     print ("<input type='submit' value='Далее'>");

    }


?>

</body>
</html>
