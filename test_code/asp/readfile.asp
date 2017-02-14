<% @Language = "VBScript" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>

<body>
	<h2>asp files op</h2>

<%
'1 – файл открывается для чтения. Записывать в него нельзя.
'2 – файл открывается для записи.
'8 – файл открывается для добавления данных 
'create – логическая величина, определяющая, будет ли создан новый файл, 
'если файла с указанным именем не существует. true – файл создается.
	mode = 2
	create = True
	filepath = "c:\\inetpub\\wwwroot\\upload\\test.txt"
Response.Write "filepath =  " & filepath
Response.Write "<br>"

	Set fso = CreateObject("Scripting.FileSystemObject")
	Set f = fso.OpenTextFile(filepath, mode, create) 
'Set FSO = CreateObject("Scripting.FileSystemObject")
'Set File = FSO.GetFile("C:\temp\test.txt")
	'f.WriteLine "Файл создан VBScript!"    'записываем строку
	'f.WriteBlankLines(3)    'записываем 3 пустые строки
	f.Close 'закрываем файл

%>
<br>
<!--
	<form action="upload.asp" method="post" name="form1">
		<input type="text" name="var1">
		<input type="text" name="var2">
		<input type="submit" name="submit" value="ok">
	</form>
-->
</body>
</html>


