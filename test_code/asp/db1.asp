<%@ LANGUAGE = JScript %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>connect db1</title>
</head>
<body>
<p>
1.создание базы: Администрирование - ODBC - Пользовательский DSN - добавить -
Драйвер mdb и выбрать расположение файла базы<br>
2.Установить системные разрешения на запись для файла БД
</p>
<% 
	Response.Write("<h2>Connect db1</h2>");
	var Conn, Rs, strSQL;
	
	Conn = Server.CreateObject("ADODB.Connection");
	Conn.Open ("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=c:\\Documents\\db1.mdb");
	//Conn.Open ("db1");
	
//-----------------------------------------
	//strSQL = "CREATE TABLE table1(id INT, FirstName VARCHAR(60), LastName VARCHAR(60))";;
	//strSQL = "INSERT INTO table1 (id, FirstName, LastName) VALUES (1, 'Laptev','Roman')"
	//strSQL = "DROP TABLE table1"
	//Response.Write (strSQL);
	//Conn.Execute(strSQL);

//-----------------------------------------
	strSQL = "SELECT * FROM table1"
	Rs = Conn.Execute(strSQL);
	//Rs = Server.CreateObject("ADODB.recordset");
	//Rs.Open (strSQL,Conn);

	// Отображаем содержимое поля 
	Response.Write (Rs("id")); 
	Response.Write (Rs.Fields.Item(0));
	Response.Write ("<br>"); 

	Response.Write (Rs("FirstName")); 
	Response.Write (Rs.Fields.Item(1));
	Response.Write ("<br>"); 

	Response.Write (Rs("LastName")); 
	Response.Write (Rs.Fields.Item(2));
	Response.Write ("<br>"); 

	Response.Write ("Rs.fields.count = "); 
	Response.Write (Rs.fields.count); 
	Response.Write ("<br>"); 

	Rs.MoveFirst();
	var count=0;
	while(!Rs.EOF)
	  {
		for (n1=0; n1<(Rs.Fields.count); n1++) 
		 {
			Response.Write (Rs.Fields.Item(n1));
		 }
		var count = count + 1;
		Response.Write ("<br>"); 
		Rs.MoveNext();
	  }
	Response.Write ("RecordCount = " + count); 
	Response.Write ("<br>"); 

	Rs.close();
	Conn.Close();
%>

</body>
</html>