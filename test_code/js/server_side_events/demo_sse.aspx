<%@ Page Language="C#" %>
<%
	Response.AddHeader("Content-Type", "text/event-stream");
	Response.Expires = -1;	
	Response.AddHeader("Cache-Control", "no-cache");
	Response.Write("data:server answer");
	Response.Flush();
%>