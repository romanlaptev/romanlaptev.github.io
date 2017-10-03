<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.mysql.jdbc.Driver.*" %>
<%
	Connection conn = null;
	String dbUser = "root";
	String dbPassword = "master";
	String dbUrl = "jdbc:mysql://localhost/mysql";
	String sql;
	String jsonLog = "";
	
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
		jsonLog = "[";
		jsonLog += "{\"error_code\" : \"0\"},";
		jsonLog += "{\"message\" : \""+message+"\"}";
		jsonLog += "]";

		rs.close();
		
	} catch (Exception e) {
		
		String message = "Cannot connect to database server " + dbUrl;
		jsonLog = "[";
		jsonLog += "{\"error_code\" : \"connectDBerror\"},";
		jsonLog += "{\"message\" : \""+e.getMessage()+"\"},";
		jsonLog += "{\"message\" : \""+message+"\"}";
		jsonLog += "]";

		//e.printStackTrace(response.getWriter());
	} finally {
		if(conn != null){
			try{ 
				conn.close();
			} catch (Exception e){
				//e.printStackTrace(response.getWriter());
				String message = "Cannot close connect to database server...." + dbUrl;
				jsonLog = "[";
				jsonLog += "{\"error_code\" : \"connectDBerror\"},";
				jsonLog += "{\"message\" : \""+e.getMessage()+"\"},";
				jsonLog += "{\"message\" : \""+message+"\"}";
				jsonLog += "]";
			}
		}
		
	}
	
	if( jsonLog.length() > 0){
		jsonLog = jsonLog.replaceAll("\r", "R");
		jsonLog = jsonLog.replaceAll("\n", "<br>");
		//jsonLog = jsonLog.replaceAll("/", "!");
		//jsonLog = jsonLog.replaceAll(":", "%");
		out.println( jsonLog );
	}
%>