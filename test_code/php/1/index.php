<html>
<head>
<title> test </title>
<link href=test.css rel=stylesheet type=text/css>
</head>

<script language="javascript">

function test1()
 {

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

  location.replace('test.php?action=check_test_answer&num_q=' + num_q + '&user_otv=' + otv_usr);

 }
</script>


<body>

<h3> ��������� ���� </h3>

<table align=center border=0 bordercolor=black cellspacing=0 cellpadding=5 width=100%>

 <tr>
   <td align=left>

      �������� ������������ ������������ ����������� �������� ...

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

     <input type="submit" value="��������">

   </form>

   </td>
 </tr>

</table>


</body>
</html>
