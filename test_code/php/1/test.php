<html>
<head>
<title> test </title>
<link href=test.css rel=stylesheet type=text/css>
</head>

<?

// ��������� ��������� �� �������
 $action = $_REQUEST['action'];
 $num_q = $_REQUEST['num_q'];
 $user_otv = $_REQUEST['user_otv'];


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

     print ("<input type='submit' value='�����'>");

    }


?>

</body>
</html>
