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
	SqlConnection myConnection;
	SqlCommand myCommand;
	SqlDataReader myDataReader;
	
	// ConnectionString = "Data Source=VBOX5\SQLEXPRESS;User Id=root;Password=master;Initial Catalog=qweqwe;Connect Timeout=300";
	//ConnectionString = @"server=VBOX5\SQLEXPRESS;database=qweqwe;uid=root;pwd=master";
	//ConnectionString = @"Data Source=.\SQLEXPRESS;AttachDbFilename=d:\db\mssql\sibwaypro_sites\qweqwe.mdf;Integrated Security=True;Connect Timeout=30;User Instance=True";
	ConnectionString = "user id=root;" + 
                       "password=master;server=localhost;" + 
                       "Trusted_Connection=yes;" + 
                       "database=qweqwe; " + 
                       "connection timeout=30";
									   
	//ConnectionString = @"Data Source=.\sqlexpress;Initial Catalog=qweqwe;User ID=root;Password=master";	
	myConnection = new SqlConnection(ConnectionString);
	
	myConnection.Open();
%>

<form runat="server">
Your name:&nbsp;
	<asp:textbox id=txtName Runat="server"></asp:textbox>
	<asp:button ld=cmdEcho onclick=cmdEcho_Click Text="Echo" runat="server" tooltip="Click to echo your name"></asp:button><br>
	<asp:label id=lblGreeting runat="server"></asp:label> 
</form>

</body>
</html>