<%@ Page Language="C#" %>
<html>
<head>
	<title>My First ASPX Page</title>
</head>
<body>
	<center>
<%
int loop;
String s="";
for ( loop=1 ; loop<=5 ; loop++)
{
	s = s+
	String.Format ("<font size={0}>Hello ASP.NET World</font><br>", loop);
}
Message.InnerHtml=s;
%>
		<span id="Message" runat=server/>
	</center>
</body>
</html>

