<%@ LANGUAGE = JScript %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>asp db admin</title>
</head>
<body>
<h2>Asp db admin</h2>

POST action =  <%= Request.Form ("action") %><br>
POST record =  <%= Request.Form ("record[]") %><br>

<% 
	//var a = Request.Params.ToString();
	//Response.Write(a);
	if (Request.Form ("action") == "delete")
	{
		Response.Write("ok");
	}
	else
	{
		//Response.Write("empty");

		//Response.Write("<h2>Connect db1</h2>");
		var Conn, Rs, strSQL;
	
		Conn = Server.CreateObject("ADODB.Connection");
		//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=c:\\Documents\\db1.mdb") ;
		//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\content\\users4\\romanlaptev\\db\\db1.mdb"
		//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\content\\users10\\blackcat608\\db\\db1.mdb"

		//strConnection = "DRIVER=Microsoft Access Driver(*.mdb);DBQ=" + Server.MapPath("/blackcat608/db/db1.mdb") ;
		strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +  Server.MapPath("/blackcat608/db/db1.mdb") ;
Response.Write ("strConnection = " + strConnection);
Response.Write("<br>");

		Conn.Open (strConnection);
//-----------------------------------------
	//strSQL = "CREATE TABLE table1(id INT, FirstName VARCHAR(60), LastName VARCHAR(60))";
	//strSQL = "INSERT INTO table1 (id, FirstName, LastName) VALUES (1, 'Laptev','Roman')"
	//strSQL = "DROP TABLE table1"
	//Response.Write (strSQL);
	//Conn.Execute(strSQL);
//-----------------------------------------
		Res = Server.CreateObject("ADODB.recordset");
		strSQL = "SELECT * FROM table1";
Response.Write (strSQL);
Response.Write("<br>");

		Res.Open (strSQL,Conn);
		Res.MoveFirst();

		var strOut =  "<form method='post' action='db_admin.asp'>";
		var strOut = strOut +  "<table border=1>";
		var strOut = strOut + "<tr>";
		var strOut = strOut + "<th>id</th>";
		var strOut = strOut + "<th>FirstName</th>";
		var strOut = strOut + "<th>LastName</th>";
		var strOut = strOut + "<th>remove</th>";
		var strOut = strOut + "</tr>";
		while(!Res.EOF)
		  {
			strOut = strOut + "<tr>";
			strOut = strOut + "<td>" + Res.Fields("id") + "</td>";
			strOut = strOut + "<td>" + Res.Fields("FirstName") + "</td>";
			strOut = strOut + "<td>" + Res.Fields("LastName") + "</td>";
			strOut = strOut + "<td><input type='checkbox' name='record[]' value='1'></td>";
			strOut = strOut + "</tr>";
			Res.MoveNext();
		  }

		strOut = strOut + "</table>";
		strOut = strOut + "<input type='text' name='action' value=''>";
		strOut = strOut + "<input type='submit' value='submit'>";
		strOut = strOut + "</form>";
		Res.close();

		Response.Write (strOut); 

		Conn.Close();
	}//------------------------------------------------- endif

%>

</body>
</html>
