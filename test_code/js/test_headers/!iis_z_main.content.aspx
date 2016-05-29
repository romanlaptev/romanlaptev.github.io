<%@ Page Language="C#" %>

<%--
	foreach ( string x in Request.Params )
	{
		Response.Write ( "<b>"+x + "</b> = " + Request.Params[x]); 
		Response.Write ( "<br>"); 
	}
http://comp/www/IIS_DEV_files/!iis_z_main.content?id=41548	
--%>

<%
	if( Request.QueryString["id"] == null )
	{
		Response.Write("<p class='error'><b>error</b>, undefined <b>id</b></p>");
		return;
	}
	string id = Request.QueryString["id"];
%>

<%
	Response.AddHeader("x-server-cdate-query", "24.02.2014 15:49:16");
	Response.AddHeader("x-response-type", "query-page");
%>

<%
Response.WriteFile ("xml/content_id=" + id + ".xml");
%>
