<%@ LANGUAGE = JScript %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
</head>
<title> обработка форм </title>
<body>

<B>обработка форм</B><BR>

<% 
// Response.Write ("aaaaaaaaaaaaaaaaaaaaaaaaaaa<br>")
%>

метод GET.Значение переменной t1: <%= Request.QueryString ("t1") %><br>
метод POST.Значение переменной t2: <%= Request.Form ("t2") %><br>


<b>ALL_HTTP</b>
<pre>
<%= Request.ServerVariables("ALL_HTTP") %><BR>

<b>ALL_RAW</b>
<%= Request.ServerVariables("ALL_RAW") %><BR>

<b>CONTENT_LENGTH</b>
<%= Request.ServerVariables("CONTENT_LENGTH") %><BR>

<b>CONTENT_TYPE</b>
<%= Request.ServerVariables("CONTENT_TYPE") %><BR>

<b>QUERY_STRING</b>
<%= Request.ServerVariables("QUERY_STRING") %><BR>

<b>SERVER_SOFTWARE</b>
<%= Request.ServerVariables("SERVER_SOFTWARE") %><BR>

<b>CONTENT_LENGTH</b>
<%= Request.ServerVariables("CONTENT_LENGTH") %><BR>

<b>HTTPS</b>
<%= Request.ServerVariables("HTTPS") %><BR>

<b>LOCAL_ADDR</b>
<%= Request.ServerVariables("LOCAL_ADDR") %><BR>

<b>PATH_INFO</b>
<%= Request.ServerVariables("PATH_INFO") %><BR>

<b>PATH_TRANSLATED</b>
<%= Request.ServerVariables("PATH_TRANSLATED") %><BR>

<b>REMOTE_ADDR</b>
<%= Request.ServerVariables("REMOTE_ADDR") %><BR>

<b>REMOTE_HOST</b>
<%= Request.ServerVariables("REMOTE_HOST") %><BR>

<b>REQUEST_METHOD</b>
<%= Request.ServerVariables("REQUEST_METHOD") %><BR>

<b>SERVER_NAME</b>
<%= Request.ServerVariables("SERVER_NAME") %><BR>

<b>SERVER_PORT</b>
<%= Request.ServerVariables("SERVER_PORT") %><BR>

<b>SERVER_PROTOCOL</b>
<%= Request.ServerVariables("SERVER_PROTOCOL") %><BR>

<b>SERVER_SOFTWARE</b>
<%= Request.ServerVariables("SERVER_SOFTWARE") %><BR>

<b>HTTP_ACCEPT</b>
<%= Request.ServerVariables("HTTP_ACCEPT") %><BR>

<b>HTTP_USER_AGENT</b>
<%= Request.ServerVariables("HTTP_USER_AGENT") %><BR>

<b>URL</b>
<%= Request.ServerVariables("URL") %><BR>

<b>REMOTE_USER</b>
<%= Request.ServerVariables("REMOTE_USER") %><BR>

</pre>

</body>
</html>