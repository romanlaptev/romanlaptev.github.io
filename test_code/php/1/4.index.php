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

  // ����� ����������� �������� - ������ ������������
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

<h3> ��������� ���� </h3>


<?

// ��������� ��������� �� �������
 $action = $_REQUEST['action'];
 $num_q = $_REQUEST['num_q'];
 $user_otv = $_REQUEST['user_otv'];


// ********************************************************************************
// ������ ������� � ���� ������������� ������
// ********************************************************************************
  if ($action == "print_question")
    {

//      print ($action);

      echo "<table align=center border=0 bordercolor=black cellspacing=0 cellpadding=5 width=100%>";

      echo "   <tr>";
      echo "     <td align=left>";
      echo "        1. �������� ������������ ������������ ����������� �������� ...";
      echo "     </td>";
      echo "   </tr>";

      echo "   <tr>";
      echo "     <td>";

      echo "     <form action=javascript:test1(); name=q1 method=post> ";

      echo "       <input type='radio' value='otv1' name='otvet'> � 40-�� ���� <br>";
      echo "       <input type='radio' value='otv2' name='otvet'> � 50-�� ���� <br>";
      echo "       <input type='radio' value='otv3' name='otvet'> � 80-�� ���� <br>";
      echo "       <input type='radio' value='otv4' name='otvet'> � 90-�� ���� <br>";

      echo "     </td>";
      echo "   </tr>";

      echo "   <tr>";
      echo "     <td>";

      echo "       <input type=submit value='��������'>";

      echo "     </form>";

      echo "     </td>";
      echo "   </tr>";

      echo "  </table>";



    }

// ********************************************************************************
// �������� ������ ������������
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
            print ("<span class='success'> ���������  ! <br>");
            print ("�������� ������������ ������������ ����������� �������� � 80-�� ���� </span>"); 
           }
         else
           {
            print ("<span class='error'> ����������� ! <br>");
            print ("�������� ������������ ������������ ����������� �������� � 80-�� ���� </span>"); 
           }
       }

      echo " <input type=submit value='��������� ������'>";

    }


?>

</body>
</html>
