<html>
<head>
<title> test </title>
<link href=test.css rel=stylesheet type=text/css>
</head>

<script language="javascript">

function test1()
 {

//  window.alert (document.forms[0].answer.value);
//  window.alert (document.forms[0].name);
//  window.alert (document.forms[0].elements.length);

  num_elements=document.forms[0].elements.length - 1;

  // Поиск выделенного элемента - ответа пользователя
  for (n1=0; n1 < num_elements; n1++)
     {

      if (document.forms[0][n1].checked)
        {
          otv_usr = document.forms[0][n1].value;
        }

     }


  num_q = document.forms[0].name;

  location.replace('index.php?action=check_test_answer&num_q=' + num_q + '&user_otv=' + otv_usr);

 }

</script>


<body>

<h3> Обучающий тест </h3>


<?

// Извлекаем параметры из запроса
 $action = $_REQUEST['action'];
 $num_q = $_REQUEST['num_q'];
 $user_otv = $_REQUEST['user_otv'];


// ********************************************************************************
// Печать вопроса и ввод пользователем ответа
// ********************************************************************************
  if ($action == "print_question")
    {

//      print ($action);

      echo "<table align=center border=0 bordercolor=black cellspacing=0 cellpadding=5 width=100%>";

      echo "   <tr>";
      echo "     <td align=left>";
      echo "        1. Массовое производство персональных компьютеров началось ...";
      echo "     </td>";
      echo "   </tr>";

      echo "   <tr>";
      echo "     <td>";

      echo "     <form action=javascript:test1(); name=q1 method=post> ";

      echo "       <input type='radio' value='otv1' name='otvet'> в 40-ые годы <br>";
      echo "       <input type='radio' value='otv2' name='otvet'> в 50-ые годы <br>";
      echo "       <input type='radio' value='otv3' name='otvet'> в 80-ые годы <br>";
      echo "       <input type='radio' value='otv4' name='otvet'> в 90-ые годы <br>";

      echo "     </td>";
      echo "   </tr>";

      echo "   <tr>";
      echo "     <td>";

      echo "       <input type=submit value='Ответить'>";

      echo "     </form>";

      echo "     </td>";
      echo "   </tr>";

      echo "  </table>";



    }

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

      echo " <input type=submit value='Следующий вопрос'>";

    }


?>

</body>
</html>
