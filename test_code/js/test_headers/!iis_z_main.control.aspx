<%@ Page Language="C#" %>

<%--
http://comp/www/IIS_DEV_files/!iis_z_main.control.aspx?documentType=query-form&documentID=41548&client_cdate_ctrl=none	
--%>

<%
	if( Request.QueryString["documentType"] == null )
	{
		Response.Write("<p class='error'><b>error</b>, undefined <b>documentType</b></p>");
		return;
	}
	string documentType = Request.QueryString["documentType"];
	
	if( Request.QueryString["documentID"] == null )
	{
		Response.Write("<p class='error'><b>error</b>, undefined <b>documentID</b></p>");
		return;
	}
	string documentID = Request.QueryString["documentID"];
	
	if( Request.QueryString["client_cdate_ctrl"] == null )
	{
		Response.Write("<p class='error'><b>error</b>, undefined <b>client_cdate_ctrl</b></p>");
		return;
	}
	string client_cdate_ctrl = Request.QueryString["client_cdate_ctrl"];
%>

<%
	Response.AddHeader("x-server-cdate-query", "17.03.2016 15:49:16");
	Response.AddHeader("x-response-type", "ctrl-page");
	Response.AddHeader("x-ctrl-type", "query-form-ctrl:" + documentID + ":190");
%>

<%
Response.WriteFile ("xml/documentID=" + documentID + ".xml");
%>
