<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/bootstrap337.min.css">
	<title>postgreSQL Demo</title>
</head>

<body>
	<div class="container">
		<div class="page-header">
			<h1>postgreSQL Demo</h1>
		</div>
<pre>
https://www.mkyong.com/jdbc/how-do-connect-to-postgresql-with-jdbc-driver-java/
https://habrahabr.ru/sandbox/41444/
https://wiki.dieg.info/postgresql
</pre>

<%

	Connection conn = null;
	String dbUser = "postgres";
	String dbPassword = "master";
	String dbUrl = "jdbc:postgresql://127.0.0.1:5432/postgres";
	String sql;

	try {
		Class.forName("org.postgresql.Driver");
	} catch (ClassNotFoundException e) {
		out.println ("<div class='alert alert-danger'>");
		out.println("Where is your PostgreSQL JDBC Driver? Include in your library path!");
		out.println ("</div>");
		e.printStackTrace();
		return;
	}
	
	out.println ("<div class='alert alert-info'>");
	out.println ("PostgreSQL JDBC Driver Registered!");
	out.println ("</div>");
	
	try {
		conn = DriverManager.getConnection( dbUrl, dbUser, dbPassword );
		if ( conn == null) {
			out.println ("<div class='alert alert-danger'>");
			out.println ("Failed to make connection to " + dbUrl);
			out.println ("</div>");
			return;
		}
		
		out.println ("<div class='alert alert-info'>");
		out.println ("connect to " + dbUrl);
		out.println ("</div>");
		
		Statement stat = conn.createStatement();
		
		out.println ("<div class='alert alert-info'>");
		out.println ("connection statement: " + stat);
		out.println ("</div>");

//--------------------------------
		sql = "SELECT * FROM PG_SETTINGS WHERE name='server_version';";
		//sql = "SELECT version();";
		out.println ("<div class='panel panel-primary'>");
		out.println ("<div class='panel-heading'>");
		out.println ( "SQL: " + sql );
		out.println ("</div>");
		
		ResultSet rs = stat.executeQuery(sql);
		ResultSetMetaData data = rs.getMetaData();
		
		int count = data.getColumnCount();
		String key = "";
		String value = "";
		//String dbVersion = "000";
		String colName;
		
		out.println ("<div class='panel-body'>");
		out.println("<table class='table table-bordered small'>");
		
		out.println("<thead>");
		out.println("<tr class='success'>");
		for ( int n = 1; n <= count; n++ ) {
			colName = data.getColumnName(n);
			out.println( "<td>" + colName + "</td>" );
		}//next
		out.println("</tr>");
		out.println("</thead>");
		
		while (rs.next()) {
			out.println("<tr>");
			for ( int n = 1; n <= count; n++ ) {
				value = rs.getString(n);
				out.println( "<td>" + value + "</td>" );
			}//next
			out.println("</tr>");
		}
		
		out.println("</table>");
		out.println ("</div>");
		
		out.println ("</div>");
		
		while (rs.next()) {
				
			for ( int n = 1; n <= count; n++ ) {
//out.println( data.getColumnName(n) + " : " + rs.getString(n) );
				key = data.getColumnName(n);
				value = rs.getString(n);
out.println( key + " : " + value );
//out.println( key.getClass().getName() );
					
				// if( key.equals("setting") ){
					// dbVersion = value;
				// }
					
				out.println(", ");
			}//next
		}
		
		
//-----------------------
		sql = "SELECT version();";
		out.println ("<div class='alert alert-info'>");
out.println ( "SQL: " + sql );
out.println("<br>");
		
		rs = stat.executeQuery(sql);
		data = rs.getMetaData();
		count = data.getColumnCount();
		
		while (rs.next()) {
			for ( int n = 1; n <= count; n++ ) {
				key = data.getColumnName(n);
				value = rs.getString(n);
out.println( key + " : " + value );
out.println("<br>");
			}//next
		}
		out.println ("</div>");

//-----------------------
		//sql = "show server_encoding;";
		sql = "select datname, pg_encoding_to_char(encoding) from pg_database;";
		out.println ("<div class='alert alert-info'>");
out.println ( "SQL: " + sql );
out.println("<br>");
		
		rs = stat.executeQuery(sql);
		data = rs.getMetaData();
		count = data.getColumnCount();
		while (rs.next()) {
			for ( int n = 1; n <= count; n++ ) {
//out.println( data.getColumnName(n) + " : " + rs.getString(n) );
				key = data.getColumnName(n);
				value = rs.getString(n);
out.println( key + " : " + value );
				out.println("<br>");
			}//next
		}
		out.println ("</div>");

//-------------------------- show databases
		sql = "select * from pg_database;";
		out.println ("<div class='alert alert-info'>");
out.println ( "SQL: " + sql );
out.println("<br>");

		rs = stat.executeQuery(sql);
		data = rs.getMetaData();
		count = data.getColumnCount();
		while (rs.next()) {
			for ( int n = 1; n <= count; n++ ) {
//out.println( data.getColumnName(n) + " : " + rs.getString(n) );
				key = data.getColumnName(n);
				value = rs.getString(n);
out.println( key + " : " + value );
				out.println("<br>");
			}//next
		}
		out.println ("</div>");
		
		rs.close();
		
		try{ 
			conn.close();
		} catch (Exception e){
			//e.printStackTrace(response.getWriter());
			String msg = "Cannot close connect to database server...." + dbUrl;
			out.println ("<div class='alert alert-danger'>");
			out.println (msg);
			out.println ("</div>");
		}
		
	} catch (SQLException e) {
		out.println ("<div class='alert alert-danger'>");
		out.println("Connection to " +dbUrl+ " failed...");
		out.println ("</div>");
		e.printStackTrace();
		return;
	}	
%>
	</div>
</body>
</html>