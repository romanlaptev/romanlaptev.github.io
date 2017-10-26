<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>

<%
	Connection conn = null;

	String dbUser = "postgres";
	String dbPassword = "master";
	String dbHost = "127.0.0.1";
	String dbPort = "5432";
	String dbName = "postgres";
	String dbUrl = "jdbc:postgresql://"+dbHost+":"+dbPort+"/"+dbName;

	//https://romanlaptev2.herokuapp.com
	// String dbUser = "aejvwysqgsboeb";
	// String dbPassword = "55b5c22131c1d612574edb5dea0b63433293d828ab1f77196f52eb0a849a577c";
	// String dbHost = "ec2-184-73-189-190.compute-1.amazonaws.com";
	// String dbPort = "5432";
	// String dbName = "d7c534mf7866o2";
	// String dbUrl = "jdbc:postgresql://"+dbHost+":"+dbPort+"/"+dbName;

	String dbClassName = "org.postgresql.Driver";
	String sql;
	String jsonLog = "";
	String msg = "";
	boolean test = false;
	
	try {
		Class.forName( dbClassName );
		test = true;
	} catch (ClassNotFoundException e) {
		// e.printStackTrace();
		jsonLog += "\"error_code\" : \"noJDBCdriver\",";
		
		msg = "class "+dbClassName+" not registered...";
		jsonLog += "\"message\" : \""+msg+"\"";
		
		jsonLog = "{" + jsonLog + "}";
		//jsonLog += "{\"message\" : \""+e.getMessage()+"\"},";
	}
	
	if (test){
// out.println ("<div class='alert alert-success'>");
// out.println ("class "+dbClassName+" registered...");
// out.println ("</div>");
		try {
			conn = DriverManager.getConnection( dbUrl, dbUser, dbPassword );
			test = true;
			
		} catch (SQLException e) {
			test = false;
			// out.println ("<div class='alert alert-danger'>");
			// out.println("Connection to " +dbUrl+ " failed...");
			// out.println ("</div>");
			//e.printStackTrace();
			jsonLog += "\"error_code\" : \"noDBconnect\",";
			
			msg = "Connection to " +dbUrl+ " failed...";
			jsonLog += "\"message\" : \""+msg+"\"";
			jsonLog = "{" + jsonLog + "}";
			
			//request.setCharacterEncoding("CP1251"); 
			//response.setContentType("text/html; charset=UTF-8");
			response.setCharacterEncoding("CP1251");
			
			jsonLog += ",";
			jsonLog += "{\"message\" : \""+e.getMessage()+"\"}";
		}

	}

	if (test){
// out.println ("<div class='alert alert-success'>");
// out.println("Connection to " +dbUrl+ " success...");
// out.println ("</div>");

		Statement stat = conn.createStatement();
// out.println ("<div class='alert alert-info'>");
// out.println ("connection statement: " + stat);
// out.println ("</div>");

		//sql = "SELECT * FROM PG_SETTINGS WHERE name='server_version';";
		sql = "SELECT version();";
		ResultSet rs = stat.executeQuery(sql);
		ResultSetMetaData data = rs.getMetaData();
		
		int count = data.getColumnCount();
		String key = "";
		String value = "";
		String dbVersion = "unknown";
		
		while (rs.next()) {
			for ( int n = 1; n <= count; n++ ) {
				key = data.getColumnName(n);
				value = rs.getString(n);
//out.println( key + " : " + value );
//out.println( key.getClass().getName() );
				if( key.equals("version") ){
					dbVersion = value;
				}
//out.println("<br>");
			}//next
		}
		rs.close();
		
		jsonLog += "\"error_code\" : \"0\",";
			
		jsonLog += "\"message\" : \""+dbVersion+"\"";
		jsonLog = "{" + jsonLog + "}";

		try{ 
			conn.close();
		} catch (Exception e){
			e.printStackTrace();
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