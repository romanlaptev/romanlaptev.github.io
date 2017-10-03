<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.mysql.jdbc.Driver.*" %>
<%
	Connection conn = null;
	String dbUser = "root";
	String dbPassword = "master";
	String dbUrl = "jdbc:mysql://localhost/mysql";
	String sql;
	
	try{
		Class.forName("com.mysql.jdbc.Driver").newInstance ();
		conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
		Statement stat = conn.createStatement();
		
		// out.println ("<div class='alert alert-info'>");
		// out.println ("connection statement: " + stat);
		// out.println ("</div>");
		
		sql = "SELECT VERSION();";
		//sql = "SHOW VARIABLES";
		ResultSet rs = stat.executeQuery(sql);

		ResultSetMetaData data = rs.getMetaData();
		// int count = data.getColumnCount();
		// for (int n = 1; n <= count; n++) {
			// out.print( data.getColumnName(n)+", ");
		// }

		String message = "MySQL DB version: ";
		while (rs.next()) {
			message += rs.getString(1);
		}
		String jsonLog = "[{\"message\" : \""+message+"\"}]";
		out.println( jsonLog );

		rs.close();
		
	} catch (Exception e) {
		
		String message = "Cannot connect to database server " + dbUrl;
		String jsonLog = "[{\"message\" : \""+message+"\"}]";
		out.println( jsonLog );
		
		//e.printStackTrace(response.getWriter());
		
	} finally {
		if(conn != null){
			try{ 
				conn.close();
				
				//out.println("Database connection closed...");
				
			} catch (Exception e){
				out.println("Cannot close connect to database server....");
				e.printStackTrace(response.getWriter());
			}
		}
		
	}
%>