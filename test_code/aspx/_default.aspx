<%@ Page 
Language="C#" 
CodeFile="_default.aspx.cs" 
Inherits="myspace.Default" 
Debug="true"%>

<html>
<head>
    <title>Website</title>
</head>
<body>default.aspx

<pre>
/source/aspx/sayhello.aspx
/source/aspx/sample2.aspx

/source/aspx/test_fileop/
/source/aspx/test_fileop/dirlist.aspx?dirname=f:\clouds\0_data
/source/aspx/test_fileop/mkdir.aspx?dirname=c:\temp\folder3

+http://mycomp/source/aspx/test_fileop/rmdir.aspx?dirname=c:\temp\folder3
/source/aspx/test_fileop/delete.aspx?file=c:\temp\folder3

/source/aspx/test_fileop/copy.aspx?file=Turkish.bin&src_path=c:\temp&dst_path=d:\temp
/source/aspx/test_fileop/copy.aspx?file=folder3&src_path=c:\temp&dst_path=d:\temp

/source/aspx/test_fileop/copy.aspx?file=TradChin.bin&src_path=c:\temp&dst_path=d:\temp&move_files=1
/source/aspx/test_fileop/copy.aspx?file=folder3&src_path=c:\temp&dst_path=d:\temp&move_files=1

<h2>GET query</h2>
/source/aspx/test_fileop/rename.aspx?file=folder3&fs_path=c:\temp
<h2>POST query</h2>
<form method="post" action="test_fileop/rename.aspx" target="_blank">
	<input type="text" name=file[] value="oldfile.txt"><br>
	<input type="text" name=file[] value="newfile.txt"><br>
	<input type="text" name=fs_path value="c:\temp"><br>
	<input type="submit" value="rename"><br>
</form>

/source/aspx/test_db.aspx
/source/aspx/test_db2.aspx
</pre>

<!--
<form runat="server">
	<asp:textbox id=txtFileName Runat="server"></asp:textbox>
	<asp:button id=cmdEcho onclick="cmdEcho_Click" Text="enter filename" runat="server" tooltip="go"></asp:button><br>
	<asp:label id=lblGreeting runat="server"></asp:label> 
</form>
-->

<h1>Request.ServerVariables</h1>
<%
Response.Write ( "<b>Request.HttpMethod</b> = " + Request.HttpMethod); 
Response.Write ( "<br>"); 
Response.Write ( "<b>Request.Params[REQUEST_METHOD]</b> = " + Request.Params["REQUEST_METHOD"]); 
Response.Write ( "<br>"); 
Response.Write ( "<b>Request.Params[QUERY_STRING]</b> = " + Request.Params["QUERY_STRING"]); 
Response.Write ( "<br>"); 

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
<h1>Request.Headers</h1>
<%
			foreach ( string x in Request.Headers )
			{
				Response.Write ( "<b>"+x + "</b> = " + Request.Headers[x]); 
				Response.Write ( "<br>"); 
			}
%>

<%
			Response.Write("<h1>Response</h1>");
			Response.Write("<b>Response.ContentType:</b>" + Response.ContentType);
			Response.Write("<br>");
			
			Response.Write("<b>Response.Status:</b>" + Response.Status);
			Response.Write("<br>");
			Response.Write("<b>Response.StatusCode:</b>" + Response.StatusCode);
			Response.Write("<br>");
			Response.Write("<b>Response.StatusDescription:</b>" + Response.StatusDescription);
			Response.Write("<br>");
			
/*			
			Response.Write("<h1>Response.Headers</h1>");
			foreach ( string x in Response.Headers )
			{
				Response.Write ( "<b>"+x + "</b> = " + Response.Headers[x]); 
				Response.Write ( "<br>"); 
			}
*/

%>
</body>
</html>
