<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="org.sqlite.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>SQLite Demo</title>
</head>

<body>
<h1>SQLite Demo</h1>
<pre>
http://lcdev.dk/2011/09/26/using-sqlite-with-jsp/
https://bitbucket.org/xerial/sqlite-jdbc/downloads
</pre>
<%
	Class.forName("org.sqlite.JDBC");
	Connection conn =
		 DriverManager.getConnection("jdbc:sqlite:d:\\db\\sqlite\\lib.sqlite");
	Statement stat = conn.createStatement();

	ResultSet rs = stat.executeQuery("select * from node;");

	while (rs.next()) {
		out.println("<p>");
		out.println(rs.getString("nid") + ", ");
		out.println(rs.getString("title"));
		out.println("</p>");
	}

	rs.close();
	conn.close();
%>

</body>
</html>