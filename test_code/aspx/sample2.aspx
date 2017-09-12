<!-- Hello.aspx -->
<%@ Page Language="C#" %>

<html>
<head>
<script runat="server">

	protected void Page_Init(object sender, EventArgs e)
	{
Response.Write("Page_Init.<br>");
Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
	}

protected void cmdEcho_Click(object Source, EventArgs e)
{
	lblGreeting.Text="Hello, " + txtName.Text; 
}
</script>
</head>

<body>

<form runat="server">
Your name:&nbsp;
	<asp:textbox id=txtName Runat="server"></asp:textbox>
	<asp:button ld=cmdEcho onclick=cmdEcho_Click Text="Echo" runat="server" tooltip="Click to echo your name"></asp:button><br>
	<asp:label id=lblGreeting runat="server"></asp:label> 
</form>

</body>
</html>