<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/foundation.min.css">
	<title>First JSP Page</title>
<style>
.header-title {
  background: #bebeeb;
}	
</style>	

</head>
<body>
<div class="row header-title">
	<div class="columns small-12 medium-12 large-12">
		<h1 class="text-center">First JSP Page</h1>
	</div>
</div>

<div class="row">
	<div class="columns small-11 medium-11 large-11"></div>
	<div class="columns small-1 medium-1 large-1">
		<a class="button" href="index.html">home</a>
	</div>
</div>

<div class="row">
	<div class="columns small-3 medium-3 large-3">
		<p><b>getRemoteHost():</b><%= request.getRemoteHost() %></p>
	</div>

	<div class="columns small-4 small-offset-1 medium-4 medium-offset-1 large-4 large-offset-1">
<!--	error!!!!!!!!!!!!
<%-- use the 'taglib' directive to make the JSTL 1.0 core tags available --%>
<%-- @ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" --%>

<%-- use the 'jsp:useBean' standard action to make the Date object available in page scope --%>
<jsp:useBean id="date" class="java.util.Date" />

<c:out value="Date: ${date}" />
-->
	</div>
	
	<div class="columns small-4 small-offset-1 medium-4 medium-offset-1 large-4 large-offset-1">
		<b>java.util.Date():</b><%= new java.util.Date() %>
	</div>
</div>

<div class="row">
<%= new String("Hello!") %>

<% for( int n = 1; n < 6; n++) {%>
<%= n %>.
<h<%= n %>>Hello Java</h<%= n %>>
<% } %>
</div>

</body>
</html>