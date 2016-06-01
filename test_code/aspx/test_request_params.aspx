<!-- test.aspx -->
<%@ Page Language="C#" %>
<html>
<head></head>
<body>
<h1>Request.ServerVariables</h1>
<%
	foreach ( string x in Request.ServerVariables )
	{
		Response.Write ( "<b>"+x + "</b> = " + Request.ServerVariables[x]); 
		Response.Write ( "<br>"); 
	}
%>
<h1>Request.Params</h1>
<%
	foreach ( string x in Request.Params )
	{
		Response.Write ( "<b>"+x + "</b> = " + Request.Params[x]); 
		Response.Write ( "<br>"); 
	}
%>
</body>
</html>