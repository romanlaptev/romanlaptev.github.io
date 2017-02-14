<%@ Page 
Language="C#" 
CodeFile="test2.aspx.cs" 
Inherits="myspace.Default" 
Debug="true"%>

<html>
<head>
	<title>My second ASPX Page</title>
</head>
<body>
<form runat="server">
	<asp:textbox id=txtFileName Runat="server"></asp:textbox>
	<asp:button id=cmdEcho onclick="cmdEcho_Click" Text="enter filename" runat="server" tooltip="go"></asp:button><br>
	<asp:label id=lblGreeting runat="server"></asp:label> 
</form>

</body>
</html>

