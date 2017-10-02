<%@ page contentType="text/html" %>
<%@ page import="java.sql.*" %>
<%@ page import="com.mysql.jdbc.Driver.*" %>
<%
	Connection conn = null;
	String userName = "root";
	String password = "master";
	String url = "jdbc:mysql://localhost/mysql";
	String sql;
	
	try{

		Class.forName("com.mysql.jdbc.Driver").newInstance ();
		conn = DriverManager.getConnection(url, userName, password);
		Statement stat = conn.createStatement();
		
		out.println ("<div class='alert alert-info'>");
		out.println ("connection statement: " + stat);
		out.println ("</div>");
		
		//sql = "select * from db;";
		sql = "SHOW TABLES;";
		ResultSet rs = stat.executeQuery(sql);

// ykk>1. В ResultSet есть метод last() перемещает курсор на последнюю запись
// ykk>2. Затем getRow() — номер текущей строки
// ykk>3. Возврашаешь курсор в начало — beforeFirst()

		ResultSetMetaData data = rs.getMetaData();
		int count = data.getColumnCount();

		for (int n = 1; n <= count; n++) {
			out.print( data.getColumnName(n)+", ");
		}

		while (rs.next()) {
			out.println("<li>");
			out.println(rs.getString(1));
			out.println("</li>");
		}

		rs.close();
		
	} catch (Exception e) {
		out.println ("<div class='alert alert-danger'>");
		out.println ("Cannot connect to database server " + url);
		e.printStackTrace(response.getWriter());
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