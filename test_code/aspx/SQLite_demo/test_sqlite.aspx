<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.Common" %>
<%@ Import Namespace="System.Data.SQLite" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width; initial-scale=1.0"/>
	<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<title>test sqlite connect</title>
</head>	

<body>
<div class="container">
	<div class="page-header">
		<h2>test sqlite connection</h2>
	</div>
	
<%

	SQLiteConnection myConnection = new SQLiteConnection();
	myConnection.ConnectionString = "Data Source=d:\\db\\sqlite\\lib.sqlite; Version=3;";
	myConnection.Open();

	SQLiteCommand command = new SQLiteCommand("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;", myConnection);
	SQLiteDataReader reader = command.ExecuteReader();
	foreach (DbDataRecord record in reader)
	{
		Response.Write("Table: " + record["name"]);
		Response.Write("<br>");
	}
 	
	myConnection.Close();
%>

</div><!-- end container
</body>
</html>
