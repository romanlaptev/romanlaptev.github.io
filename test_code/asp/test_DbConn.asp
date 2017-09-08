<%@ language=VBScript %>
<html>
<body> 
<h1>test connect to MS SQL server</h1>
<pre>
http://webcheatsheet.com/asp/database_connection_to_MSSQL.php
https://www.youtube.com/watch?v=q5ENSRVVbas
http://www.sqlstrings.com/sql-server-asp-conection.htm
</pre>
<%
'Dim Connection
'Set Connection = Server.CreateObject("ADODB.Connection")

' ' ' "DRIVER=SQL Server;SERVER=POLLUKS;UID=Website;DATABASE=Website;User Id=Website;PASSWORD=Bhjkggh&65%5987--54gb;"
' ' ' "DRIVER=SQL Server;SERVER=ALEXCOMP\SQLEXPRESS;DATABASE=katren;Integrated Secutrity=true"

' ' ' 'ConnString =  "PROVIDER=SQLOLEDB;DATA SOURCE=.\\SQLEXPRESS2005;UID=sa;PWD=assa;DATABASE=notes;"
' ' ' 'ConnString =  "Provider=SQLOLEDB;Data source=.\\SQLEXPRESS2005;UID=sa;Password=assa;Initial Catalog=notes;"

' ' 'ConnStr = "Provider=SQLOLEDB;Data Source=.\\SQLEXPRESS2005; Initial Catalog=db1; User ID=sa; password=assa;"

' ' 'ConnStr="workstation id=romanlaptevDB.mssql.somee.com;packet size=4096;user id=romanlaptev_SQLLogin_1;pwd=mg2kthxvqs;data source=romanlaptevDB.mssql.somee.com;persist security info=False;initial catalog=romanlaptevDB"
' ' 'Connection string: 	
' ' 'workstation id=romanlaptevDB.mssql.somee.com;
' ' 'packet size=4096;
' ' 'user id=romanlaptev_SQLLogin_1;
' ' 'pwd=mg2kthxvqs;
' ' 'data source=romanlaptevDB.mssql.somee.com;persist security info=False;initial catalog=romanlaptevDB

'ConnStr="DRIVER={SQL Native Client};SERVER=VBOX-WIN7\SQLEXPRESS2005;DATABASE=db1;User Id=sa; PASSWORD=assa;"
' Response.write ConnStr + "<br>"

' Connection.open( ConnStr )
' if isObject( Connection ) then
	' Response.write "The connection is active<br>"
	' if Connection.State = 1 then
		' Response.write "State 1"
	' end if
' end if
%>

<%
' 'declare the variables
' Dim Connection
' Dim Recordset
' Dim SQL

' 'declare the SQL statement that will query the database
' SQL = "SELECT * FROM TABLE_NAME"

' 'create an instance of the ADO connection and recordset objects
' Set Connection = Server.CreateObject("ADODB.Connection")
' Set Recordset = Server.CreateObject("ADODB.Recordset")

' 'open the connection to the database
' Connection.Open "DSN=dsn_name;UID=user_name;PWD=password;Database=database_name"

' 'Open the recordset object executing the SQL statement and return records
' Recordset.Open SQL,Connection

' 'first of all determine whether there are any records
' If Recordset.EOF Then
' Response.Write("No records returned.")
' Else
' 'if there are records then loop through the fields
' Do While NOT Recordset.Eof   
' Response.write Recordset("FIRST_FIELD_NAME")
' Response.write Recordset("SECOND_FIELD_NAME")
' Response.write Recordset("THIRD_FIELD_NAME")
' Response.write "<br>"   
' Recordset.MoveNext    
' Loop
' End If

' 'close the connection and recordset objects to free up resources
' Recordset.Close
' Set Recordset=nothing
' Connection.Close
' Set Connection=nothing
%>

<%
' 'declare the variables
Dim Connection
Dim ConnString
Dim Recordset
Dim SQL

' 'define the connection string, specify database driver
' ConnString="DRIVER={SQL Server};SERVER=.\\SQLEXPRESS2005;Uid=sa;Pwd=assa;Database=notes"
' 'ConnString =  "PROVIDER=SQLOLEDB;DATA SOURCE=.\\SQLEXPRESS2005;UID=sa;PWD=assa;DATABASE=notes;"
' 'ConnString =  "Provider=SQLOLEDB;Data source=.\\SQLEXPRESS2005;UID=sa;Password=assa;Initial Catalog=notes;"
ConnString="DRIVER={SQL Native Client};SERVER=VBOX-WIN7\SQLEXPRESS2005;DATABASE=db1;User Id=sa; PASSWORD=assa;"

'declare the SQL statement that will query the database
SQL = "SELECT * FROM notes"

'create an instance of the ADO connection and recordset objects
Set Connection = Server.CreateObject("ADODB.Connection")
Set Recordset = Server.CreateObject("ADODB.Recordset")

'Open the connection to the database
Connection.Open ConnString
if isObject( Connection ) then
	Response.write "<h2>The connection is active</h2>"
	if Connection.State = 1 then
		Response.write "Connection.State = 1<br>"
	end if
end if

'Open the recordset object executing the SQL statement and return records
Recordset.Open SQL,Connection

'first of all determine whether there are any records
If Recordset.EOF Then
 Response.Write("No records returned.")
Else
	'if there are records then loop through the fields
	Do While NOT Recordset.Eof   
		 Response.write Recordset("id")
		 Response.write Recordset("author")
		 Response.write Recordset("text_message")
		 Response.write "<br>"   
		 Recordset.MoveNext    
	Loop
End If

'close the connection and recordset objects to free up resources
Recordset.Close
Set Recordset=nothing
Connection.Close
Set Connection=nothing
%>

</body>
</html>
