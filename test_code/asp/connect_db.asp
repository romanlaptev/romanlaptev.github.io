<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
</head>
<title>test connect db</title>
<body>
<!--
1.создание базы: Администрирование - ODBC - Пользовательский DSN - добавить -
Драйвер mdb и выбрать расположение файла базы
-->
<% 
Response.Write("<h2>Connect db</h2>")
Dim Conn, RS, strSQL, strOut
strOut = ""
Set Conn = Server.CreateObject("ADODB.Connection")
//strConnection = "DRIVER=Microsoft Access Driver(*.mdb);DBQ=" & Server.MapPath("/blackcat608/db/db1.mdb") 
strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("/blackcat608/db/db1.mdb") 
//Response.Write(strConnection)
Conn.Open(strConnection)

//Conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=d:\Documents\db1.mdb"
//Conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\content\\users4\\romanlaptev\\db\\db1.mdb"
//Conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\content\\users10\\blackcat608\\db\\db1.mdb"

Set RS = Server.CreateObject("ADODB.Recordset")

//strSQL = "CREATE TABLE table1(id INT, FirstName VARCHAR(60), LastName VARCHAR(60))"
//strSQL = "DROP TABLE table1"
//strSQL = "INSERT INTO table1 (id, FirstName, LastName) VALUES (1, 'Jose','Lugo')"
//strSQL = "SELECT * FROM table1"

//Conn.Execute strSQL

strSQL = "SELECT * FROM table1"
RS.Open strSQL, Conn
RS.MoveFirst
strOut = strOut & "<form action=''>"
strOut = strOut & "<table border=""1"">"
strOut = strOut & "<tr>"
strOut = strOut & "<th>id</th>"
strOut = strOut & "<th>FirstName</th>"
strOut = strOut & "<th>LastName</th>" 
strOut = strOut & "<th>remove</th>"
strOut = strOut & "</tr>"
Do While Not RS.EOF
	strOut = strOut & "<tr>"
	strOut = strOut & "<td>" & RS.Fields("id") & "</td>"
	strOut = strOut & "<td>" & RS.Fields("FirstName") & "</td>"
	strOut = strOut & "<td>" & RS.Fields("LastName") & "</td>"
	strOut = strOut & "<td><input type='checkbox' value='1'></td>"
	strOut = strOut & "</tr>"
	RS.MoveNext
Loop
strOut = strOut & "</table>"
strOut = strOut & "</form>"
%>
<input type='submit' value='submit'>
<%
RS.Close

Set RS = Nothing
Conn.Close

Set Conn = Nothing
Response.Write strOut

//Conn.Close

%>

</body>
</html>