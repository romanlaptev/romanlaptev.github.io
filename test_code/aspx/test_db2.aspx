<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<html>
<head>
<script runat="server">
protected void cmdEcho_Click(object Source, EventArgs e)
{
	lblGreeting.Text="Hello, " + txtName.Text; 
}
</script>
</head>

<body>
<%
//http://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.open%28v=vs.71%29.aspx
	SqlConnection myConnection;
	SqlCommand myCommand;
	SqlDataReader myDataReader;
	
	myConnection = new SqlConnection("server=firstdb1.mssql.somee.com;database=Firstdb1;uid=roman-laptev_SQLLogin_1;pwd=lafvjjjav8");
	myConnection.Open();
	myCommand = new SqlCommand ("SELECT * FROM anketa", myConnection);
	myDataReader = myCommand.ExecuteReader(CommandBehavior.CloseConnection);
	while (myDataReader.Read())
	{
        Response.Write(myDataReader["Created"].ToString());
	}
	myDataReader.Close();
	myConnection.Close();
%>

<form runat="server">
Your name:&nbsp;
	<asp:textbox id=txtName Runat="server"></asp:textbox>
	<asp:button ld=cmdEcho onclick=cmdEcho_Click Text="Echo" runat="server" tooltip="Click to echo your name"></asp:button><br>
	<asp:label id=lblGreeting runat="server"></asp:label> 
</form>

</body>
</html>