<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
</head>
<title>connect db</title>
<body>
1.создание базы: Администрирование - ODBC - Пользовательский DSN - добавить -
Драйвер mdb и выбрать расположение файла базы
<% 
Response.Write("<h2>Connect db</h2>")
Dim Conn, RS, strSQL, strOut
strOut = ""
Set Conn = Server.CreateObject("ADODB.Connection")
Conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=d:\Documents\db1.mdb"
Set RS = Server.CreateObject("ADODB.Recordset")

//strSQL = "CREATE TABLE table1(id INT, FirstName VARCHAR(60), LastName VARCHAR(60))"
//strSQL = "DROP TABLE table1"
//strSQL = "INSERT INTO table1 (id, FirstName, LastName) VALUES (1, 'Jose','Lugo')"
//strSQL = "SELECT * FROM table1"

//Conn.Execute strSQL

strSQL = "SELECT * FROM table1"
RS.Open strSQL, Conn
RS.MoveFirst
strOut = strOut & "<TABLE BORDER=""1"">"
strOut = strOut & "<TR><TH>id</TH><TH>FirstName</TH><TH>LastName</TH></TR>"
Do While Not RS.EOF
	strOut = strOut & "<TR>"
	
	strOut = strOut & "<TD>" & _
		RS.Fields("id") & "</TD>"

	strOut = strOut & "<TD>" & _
		RS.Fields("FirstName") & "</TD>"

	strOut = strOut & "<TD>" & _
		RS.Fields("LastName") & "</TD>"
	
	strOut = strOut & "</TR>"
	RS.MoveNext
Loop
strOut = strOut & "</TABLE>"
RS.Close
Set RS = Nothing
Conn.Close
Set Conn = Nothing
Response.Write strOut

//Conn.Close

%>

</body>
</html>