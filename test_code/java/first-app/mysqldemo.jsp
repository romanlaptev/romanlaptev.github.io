<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.mysql.jdbc.Driver.*" %>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/bootstrap337.min.css">
	<title>MySQL Demo</title>
</head>

<body>
	<div class="container">
		<h1>MySQL Demo</h1>
<pre>
http://j2w.blogspot.ru/2008/01/mysql-jdbc.html
http://forum.vingrad.ru/topic-154042.html
https://tproger.ru/translations/java-jdbc-example/

http://www.javaportal.ru/java/tutorial/tutorialJDBC/resultset.html
Руководство по JDBC v.1

http://java-course.ru/begin/database01/
Базы данных на Java
</pre>

<%
	Connection conn = null;
	String userName = "root";
	String password = "master";
	String url = "jdbc:mysql://localhost/mysql";
	String _query;
	
	try{

		Class.forName("com.mysql.jdbc.Driver").newInstance ();
		conn = DriverManager.getConnection(url, userName, password);
		Statement stat = conn.createStatement();
		
		out.println ("<div class='alert alert-info'>");
		out.println ("connection statement: " + stat);
		out.println ("</div>");
		
		// //sql = "select * from db;";
		// sql = "SHOW TABLES;";
		// ResultSet rs = stat.executeQuery(sql);

// // ykk>1. В ResultSet есть метод last() перемещает курсор на последнюю запись
// // ykk>2. Затем getRow() — номер текущей строки
// // ykk>3. Возврашаешь курсор в начало — beforeFirst()

		// ResultSetMetaData data = rs.getMetaData();
		// int count = data.getColumnCount();

		// for (int n = 1; n <= count; n++) {
			// out.print( data.getColumnName(n)+", ");
		// }

		// while (rs.next()) {
			// out.println("<li>");
			// out.println(rs.getString(1));
			// out.println("</li>");
		// }

		// rs.close();
		
		try
		{

			// _query = "INSERT INTO `notes` ("+
	// "`author`, `title`, `text_message`, `client_date`, `server_date`, `ip`) VALUES ("+
	// " 'anonymous', "+
	// " 'title1', "+
	// " 'textMessage1', "+
	// " '2017-10-02 16:04:58', "+
	// " '2017-10-02 09:08:40', "+
	// " '37.193.108.45' "+
	// ");";
			_query = "USE db1;";
			stat.executeUpdate( _query );

//---------------------
			_query = "SELECT * from notes;";
			ResultSet rs = stat.executeQuery( _query );
			ResultSetMetaData data = rs.getMetaData();
			int count = data.getColumnCount();
out.println("Column count: " + count );
			for (int n = 1; n <= count; n++) {
				out.print( data.getColumnName(n)+", ");
			}

			while (rs.next()) {
				out.println("<li>");
				out.println(rs.getString(6));
				out.println("</li>");
			}

			rs.close();
			
		}
		catch (SQLException e)
		{
			//e.printStackTrace( out );
			out.println( e.getMessage() );
		}
		
	} catch (Exception e) {
		out.println ("<div class='alert alert-danger'>");
		out.println ("Cannot connect to database server " + url);
		
		//e.printStackTrace(response.getWriter());
		out.println( e.getMessage() );
		
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
				e.printStackTrace(response.getWriter());
				out.println ("</div>");
			}
		}
		
	}
%>
	</div>
</body>
</html>