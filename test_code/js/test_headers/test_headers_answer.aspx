<%@ Page Language="C#" %>
<%
	Response.AddHeader("x-server-cdate-query", "24.02.2016 15:49:16");
	Response.AddHeader("x-response-type", "query-page");
	Response.AddHeader("x-ctrl-type", "query-form-ctrl:41548:190");
%>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>

<body>
<div class="container">
	<div class="page-header">
		<h1>test HTTP-headers, answer page</h1>
	</div>
	
<%
	Response.Write("<ol>");
	for( int n = 0; n < 10; n++)
	{
		Response.Write("<li>");
		Response.Write(2+2);
		Response.Write("</li>");
	}
	Response.Write("</ol>");
%>
	
</div><!-- end container -->
</body>
</html>