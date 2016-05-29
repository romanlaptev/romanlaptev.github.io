<html>
<title>test mdb connect</title>
<body>
<h2>test Microsoft Access DB connection</h2>

<%@ Page Debug="true" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.OleDb" %>
<%
	Dim myConnection As OleDbConnection
	Dim myCommand As OleDbCommand
	Dim myDataReader As OleDbDataReader

	'myConnection = New OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=d:\\Documents\\db1.mdb")
	myConnection = New OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=d:\\Documents\\0_sites\\0_db\\db1.mdb")
	myConnection.Open()
	
	myCommand = New OleDbCommand ("SELECT * FROM table1", myConnection)
	'myCommand.ExecuteNonQuery()
	myDataReader = myCommand.ExecuteReader()
	While myDataReader.Read
		Response.Write(myDataReader("id"))
		Response.Write(myDataReader("FirstName"))
		Response.Write(myDataReader("LastName"))
	End While
	myDataReader.Close()
	myConnection.Close
%>

</body>
</html>
