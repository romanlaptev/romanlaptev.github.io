   answer=new Array();
   answer[1]="otv3";
   answer[2]="otv2";
   answer[3]="otv2";
   answer[4]="otv4";

function test1()
 {

  num_elements=document.forms[0].elements.length - 1;

  // Поиск выделенного элемента - ответа пользователя
  for (n1=0; n1 < num_elements; n1++)
     {

      if (document.forms[0][n1].checked)
        {
          otv_usr = document.forms[0][n1].value;

         if (otv_usr == 'otv2')
           {
             window.alert ('Правильно !'); 
           }
         else
           {
             window.alert ('Давай еще раз '); 
           }
        }
     }


 }

function test2()
 {

//  document.write (document.forms[0].name);
//  document.write (document.forms[1].name);

  var yes=0;
  var no=0;

  var n3=0;
  var s1='';
  var question_is_missed=0;
  var num_question_is_missed=0;

  // Получаем кол-во форм документа с вопросами (общее кол-во форм минус форма с кнопкой submit)
  num_form = document.forms.length-1;


  for (n2=0; n2 < num_form; n2++)
     {

      // Получаем кол-во элементов в текущей форме
      num_elements=document.forms[n2].elements.length;
      question_is_missed=0;

      // Поиск выделенного элемента - ответа пользователя
      for (n1=0; n1 < num_elements; n1++)
         {

          if (document.forms[n2][n1].checked) 
            {
              otv_usr = document.forms[n2][n1].value;

             if (otv_usr == answer[n2+1])
               {
                 yes = yes + 1;
                 n3 = n2 + 1;
                 s1= s1 + ("<b><font color=Greenyellow> Вопрос " + n3 + "</font></b> - правильно <br>");
               }
             else
               {
                 no = no + 1;
                 n3 = n2 + 1;
                 s1= s1 + ("<b><font color=gold> Вопрос " + n3 + "</font></b> - ответ неверный <br>");
               }
            }
         else
           question_is_missed = question_is_missed + 1;


         }

      if (question_is_missed == num_elements) 
        {
//          no = no + 1;
          n3 = n2 + 1;
          s1= s1 + ("<b><font color=orange> Вопрос " + n3 + "</font></b> - вопрос пропущен <br>");
          num_question_is_missed = num_question_is_missed + 1;
        }

     }


 document.writeln ("<html>                                           ");
 document.writeln ("<head>                                           ");
 document.writeln ("<title> Result </title>                          ");
 document.writeln ("<link href=test.css rel=stylesheet type=text/css>");
 document.writeln ("</head>                                          "); 

 document.writeln ("<body class=cm>                                  ");


 document.writeln (s1 + "<br>");
 document.writeln ("<hr>");
 document.writeln ("Правильных ответов - " + yes + "<br>");
 document.writeln ("Неверных ответов - " + no + "<br>");
 document.writeln ("Пропущено вопросов - " + num_question_is_missed);

 document.writeln ("<br>");
 document.writeln ("<br>");
 document.writeln ("<br>");
 document.writeln ("<center>");
 document.writeln ("<a href=index.htm> К содержанию </a>" );
 document.writeln ("</center>");
 
 document.writeln ("</body>                                          ");
 document.writeln ("</html>                                          ");

 }
