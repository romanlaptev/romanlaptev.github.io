<%@ language=JScript %>
<html>
  <body> 
<%
	FSO = new ActiveXObject("Scripting.FileSystemObject");
	var f = FSO.OpenTextFile("testfile.txt", 2, true);   //��������� ����, ���� �� �� ������, ������� ���
	f.WriteLine("���� ������ JScript!");    //���������� ������
	f.WriteBlankLines(3);    //���������� 3 ������ ������
	f.Write("��� ����� �!");  //���������� ������
	f.Close();   //��������� ���� 
%> 
  </body>
</html>
