<html>
<title>test db connect</title>
<body>
<%@ Page Debug="true" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%
	Dim myConnection As SqlConnection
	Dim myCommand As SqlCommand
	Dim myDataReader As SqlDataReader
	
	myConnection = New SqlConnection("server=firstdb1.mssql.somee.com;database=Firstdb1;uid=roman-laptev_SQLLogin_1;pwd=lafvjjjav8")
	myConnection.Open()
	myCommand = New SqlCommand ("SELECT * FROM anketa", myConnection)
	'myCommand.ExecuteNonQuery()

	myDataReader = myCommand.ExecuteReader()
	While myDataReader.Read()
		Response.Write(myDataReader("Created"))
	End While
	myDataReader.Close()
	
	myConnection.Close()
%>

</body>
</html>