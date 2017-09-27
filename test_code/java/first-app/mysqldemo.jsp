<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.mysql.jdbc.Driver.*" %>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/css/bootstrap335.min.css">
	<title>MySQL Demo</title>
</head>

<body>
	<div class="container">
		<h1>MySQL Demo</h1>
<pre>
http://j2w.blogspot.ru/2008/01/mysql-jdbc.html
http://forum.vingrad.ru/topic-154042.html
</pre>

<%
	Connection conn = null;
	String userName = "root";
	String password = "master";
	String url = "jdbc:mysql://localhost/test";
	
	try{

		Class.forName("com.mysql.jdbc.Driver").newInstance ();
		conn = DriverManager.getConnection(url, userName, password);
		Statement stat = conn.createStatement();
		
		out.println ("<div class='alert alert-info'>");
		out.println ("connection statement: " + stat);
		out.println ("</div>");
		
	} catch (Exception e) {
		out.println ("<div class='alert alert-danger'>");
		out.println ("Cannot connect to database server " + url);
		//e.printStackTrace();
		out.println ("</div>");
	} finally {
		if(conn != null){
			try{ 
				conn.close();
				
				out.println ("<div class='alert alert-success'>");
				out.println("Database connection closed...");
				out.println ("</div>");
				
			} catch (Exception e){
				out.println ("<div class='alert alert-danger'>");
				out.println("Cannot close connect to database server....");
				//e.printStackTrace();
				out.println ("</div>");
			}
		}
		
	}
%>
	</div>
</body>
</html>