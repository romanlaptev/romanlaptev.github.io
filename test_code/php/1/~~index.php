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

//  window.alert (otv_usr);

  num_q = document.forms[0].name;


//  document.forms[0].answer.value = '��������� ������';
//  document.forms[0].action = 'javascript:test2();';
//  document.all.test_table.refresh();

  location.replace('index.php?action=check_test_answer&num_q=' + num_q + '&user_otv=' + otv_usr);

 }

function test2()
 {

  window.alert ('test2');

 }

</script>


<body>

<h3> ��������� ���� </h3>

<table name=test_table align=left border=0 bordercolor=black cellspacing=0 cellpadding=5 width=70%>

 <tr>
   <td align=left>

      1. �������� ������������ ������������ ����������� �������� ...

   </td>
 </tr>

 <tr>
   <td>

   <form method="POST" action="javascript:test1();" name=q1 method=post> 

     <input type="radio" value="otv1" name="otvet"> � 40-�� ���� <br>
     <input type="radio" value="otv2" name="otvet"> � 50-�� ���� <br>
     <input type="radio" value="otv3" name="otvet"> � 80-�� ���� <br>
     <input type="radio" value="otv4" name="otvet"> � 90-�� ���� <br>

   </td>
 </tr>

 <tr>
   <td>

     <input type="submit" value="��������" name="answer">

   </form>

   </td>
 </tr>

</table>

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


    }


?>

</body>
</html>
