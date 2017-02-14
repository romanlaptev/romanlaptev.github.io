<%@ LANGUAGE = JScript %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>asp db admin</title>
</head>
<body>
<h2>Asp db admin</h2>

POST action =  <%= Request.Form ("action") %><br>
POST update_record =  <%= Request.Form ("update_record[]") %><br>
POST delete_record =  <%= Request.Form ("delete_record[]") %><br>
POST tablename =  <%= Request.Form ("tablename") %><br>
POST firstname =  <%= Request.Form ("firstname") %><br>
POST lastname =  <%= Request.Form ("lastname") %><br>

<a href="#" onClick="javascript:document.forms.form1.action.value='show_tables';">show_tables</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='create_table';">create_table</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='drop_table';">drop_table</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='select';">select</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='insert';">insert</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='update';">update</a> | 
<a href="#" onClick="javascript:document.forms.form1.action.value='delete';">delete</a> | 

<form method='post' action='db_admin.asp' name='form1'>
action:
	<input type='text' name='action' value=''>
<!--	<input type='text' name='tablename' value=''> -->
	<input type='submit' value='>>'>
</form>

<% 
/*
	lngTotal = Request.Form("form1").Count;
	for  (n1 = 0; n1 < lngTotal; n1++)
	  {
		Response.Write (Request.Form("form1")(n1) + "<br>");
	  }
*/
	//var a = Request.Params.ToString();
	//Response.Write(a);
//--------------------------------------------
	var Conn;
	Conn = Server.CreateObject("ADODB.Connection");
	//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=c:\\Documents\\db1.mdb") ;
	//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\content\\users10\\blackcat608\\db\\db1.mdb"

	//strConnection = "DRIVER=Microsoft Access Driver(*.mdb);DBQ=" + Server.MapPath("/blackcat608/db/db1.mdb") ;
	strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +  Server.MapPath("/blackcat608/db/db1.mdb") ;
	
	//strConnection = "DRIVER=Microsoft Access Driver(*.mdb);DBQ=" + Server.MapPath("/romanlaptev/db/db1.mdb") ;
	//strConnection = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +  Server.MapPath("/romanlaptev/db/db1.mdb") ;
Response.Write ("strConnection = " + strConnection);
Response.Write("<br>");

	Conn.Open (strConnection);
//--------------------------------------------
	var action = Request.Form ("action")();// Без скобок семейство будет возвращать объект, а не строку. 
//Response.Write ("action = " + action);
//Response.Write("<br>");
	var strSQL="";
	switch (action)
	{
/*
		case  "create_db":
			strSQL = "CREATE DATABASE db2"
		break;
*/
//======================================================
		case  "show_tables":
			var adSchemaTables = 20;
			var rstSchema = Conn.OpenSchema(adSchemaTables);
			rstSchema.MoveFirst();
			while (!rstSchema.EOF)
			  {
				Response.Write("Table name: " + rstSchema("TABLE_NAME")+", ");
				Response.Write("Table type: " + rstSchema("TABLE_TYPE")+"<br>");
				rstSchema.MoveNext();
			  }
		break;
//======================================================
		case  "create_table":
			if (!Request.Form("tablename")())
			  {
				strOut =  "<form method='post' action='db_admin.asp'>";
				strOut = strOut + "<input type='hidden' name='action' value='create_table'>";
				strOut = strOut + "enter table name for create: <input type='text' name='tablename'>";
				strOut = strOut + "<input type='submit' value='ok'>";
				strOut = strOut + "</form>";
				Response.Write (strOut); 
			  }
			else
			  {
//Response.Write ("is not null<br>");
				var tablename = Request.Form("tablename")();
//var tablename = "table2";
//Response.Write ("var tablename = " + tablename + "<br>");
//Response.Write (tablename.length);

//strSQL = "CREATE TABLE table1(id INT CONSTRAINT MyFieldConstraint PRIMARY KEY, FirstName VARCHAR(60), LastName VARCHAR(60))";
//strSQL = "CREATE TABLE table1(id Autoincrement, FirstName VARCHAR(60), LastName VARCHAR(60), CONSTRAINT pk_id PRIMARY KEY (id))";
strSQL = "CREATE TABLE "+tablename+"(id Autoincrement, FirstName VARCHAR(60), LastName VARCHAR(60), CONSTRAINT pk_id PRIMARY KEY (id))";
			  }
		break;
		case  "insert":
			if (!Request.Form("tablename")())
			  {
				strOut =  "<form method='post' action='db_admin.asp'>";
				strOut = strOut + "<input type='hidden' name='action' value='insert'>";
				strOut = strOut + "enter table name: <input type='text' name='tablename'>";
				strOut = strOut + "enter last name: <input type='text' name='lastname'>";
				strOut = strOut + "enter first name: <input type='text' name='firstname'>";
				strOut = strOut + "<input type='submit' value='ok'>";
				strOut = strOut + "</form>";
				Response.Write (strOut); 
			  }
			else
			  {
				var tablename = Request.Form("tablename")();
				var firstname = Request.Form("firstname")();
				var lastname = Request.Form("lastname")();
				//strSQL = "INSERT INTO table1 (FirstName, LastName) VALUES ('Laptev','Roman')"
				strSQL = "INSERT INTO "+tablename+" (FirstName, LastName) VALUES ('"+firstname+"','"+lastname+"')";
			  }
		break;

		case  "update":
		break;

		case "drop_table":
			if (!Request.Form("tablename")())
			  {
				strOut =  "<form method='post' action='db_admin.asp'>";
				strOut = strOut + "<input type='hidden' name='action' value='drop_table'>";
				strOut = strOut + "enter table name for remove: <input type='text' name='tablename'>";
				strOut = strOut + "<input type='submit' value='ok'>";
				strOut = strOut + "</form>";
				Response.Write (strOut); 
			  }
			else
			  {
				var tablename = Request.Form("tablename")();
				strSQL = "DROP TABLE "+tablename;
			  }
		break;
//====================================================================================
		case  "delete":
//Response.Write("id = " + Request.Form("id")());
//len_id = Request.Form("id").Count;
//Response.Write ("len_id = " + len_id + "<br>");
			//if (len_id >0)
			if (!Request.Form("tablename")())
			  {
				if (!Request.Form("id")())
				{
					strOut =  "<form method='post' action='db_admin.asp'>";
					strOut = strOut + "<input type='hidden' name='action' value='delete'>";
					strOut = strOut + "enter table name <input type='text' name='tablename'>";
					strOut = strOut + "enter id record for remove: <input type='text' name='id'>";
					strOut = strOut + "<input type='submit' value='submit'>";
					strOut = strOut + "</form>";
					Response.Write (strOut); 
				}
				else
					Response.Write ("Need ID !!!"); 
			  }
			else
			  {
				strSQL = "DELETE FROM table1 WHERE id = " + Request.Form("id");
			  }
		break;
//====================================================================================
		case  "select":
			if (!Request.Form("tablename")())
			  {
				//list database tables
				var adSchemaTables = 20;
				var rstSchema = Conn.OpenSchema(adSchemaTables);
				rstSchema.MoveFirst();
				while (!rstSchema.EOF)
				{
					Response.Write("Table name: " + rstSchema("TABLE_NAME")+", ");
					Response.Write("Table type: " + rstSchema("TABLE_TYPE")+"<br>");
					rstSchema.MoveNext();
				}
				//input table name form
				strOut =  "<form method='post' action='db_admin.asp'>";
				strOut = strOut + "<input type='hidden' name='action' value='select'>";
				strOut = strOut + "enter table name for select: <input type='text' name='tablename'>";
				strOut = strOut + "<input type='submit' value='ok'>";
				strOut = strOut + "</form>";
				Response.Write (strOut); 
			  }
			else
			  {
				Res = Server.CreateObject("ADODB.recordset");
				var strSQL2 = "SELECT * FROM "+Request.Form("tablename")();
Response.Write (strSQL2);
Response.Write("<br>");
				Res.Open (strSQL2,Conn);
				Res.MoveFirst();
				var strOut =  "<form method='post' action='db_admin.asp'>";
				var strOut = strOut +  "<table border=1>";
				var strOut = strOut + "<tr>";
				var strOut = strOut + "<th>id</th>";
				var strOut = strOut + "<th>FirstName</th>";
				var strOut = strOut + "<th>LastName</th>";
				var strOut = strOut + "<th>update</th>";
				var strOut = strOut + "<th>delete</th>";
				var strOut = strOut + "</tr>";
				while(!Res.EOF)
				{
					strOut = strOut + "<tr>";
					strOut = strOut + "<td>" + Res.Fields("id") + "</td>";
					strOut = strOut + "<td>" + Res.Fields("FirstName") + "</td>";
					strOut = strOut + "<td>" + Res.Fields("LastName") + "</td>";
					strOut = strOut + "<td><input type='checkbox' name='update_record[]' value='" + Res.Fields("id") +"'></td>";
					strOut = strOut + "<td><input type='checkbox' name='delete_record[]' value='" + Res.Fields("id") +"'></td>";
					strOut = strOut + "</tr>";
					Res.MoveNext();
				}

				strOut = strOut + "</table>";
				strOut = strOut + "<input type='hidden' name='action' value='update'>";
				strOut = strOut + "<input type='submit' value='submit'>";
				strOut = strOut + "</form>";
				Res.close();
				Response.Write (strOut); 
			  }

		break;
//====================================================================================

		default:
		break;
	}

	if (strSQL != "")
	{
		Response.Write (strSQL);
		Conn.Execute(strSQL);
	}
	else
	{
		Response.Write ("<font color='red'>Unknown action</font>"); 
		Response.Write("<br>");
	}

	Conn.Close();

%>

</body>
</html>
