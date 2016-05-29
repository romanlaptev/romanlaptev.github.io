<%@ language=JScript %>
<html>
  <body> 
<%
	FSO = new ActiveXObject("Scripting.FileSystemObject");
	var f = FSO.OpenTextFile("testfile.txt", 2, true);   //Открываем файл, если он не создан, создаем его
	f.WriteLine("Файл создан JScript!");    //записываем строку
	f.WriteBlankLines(3);    //записываем 3 пустые строки
	f.Write("Это снова я!");  //записываем строку
	f.Close();   //закрываем файл 
%> 
  </body>
</html>
