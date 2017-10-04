package mypackage;

//import java.io.IOException;
//import java.io.PrintWriter;
import java.util.Enumeration;

import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class Notes extends HttpServlet {
	Connection conn = null;
	String dbUser = "root";
	String dbPassword = "master";
	String dbUrl = "jdbc:mysql://localhost/mysql";
	String sql;

	
/**
 * Respond to a GET request for the content produced by
 * this servlet.
 *
 * @param request The servlet request we are processing
 * @param response The servlet response we are producing
 *
 * @exception IOException if an input/output error occurs
 * @exception ServletException if a servlet error occurs
 */
	@Override
	public void doGet(HttpServletRequest request,
					HttpServletResponse response)
	throws IOException, ServletException {

		String jsonLog = "";
		
		//response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		//print request
		String parName;
		boolean emptyEnum = false;
		
		Enumeration paramNames = request.getParameterNames();
		if( !paramNames.hasMoreElements() ){
			emptyEnum = true;
		}
		if( emptyEnum ){
			String message = "No parameters in request object...";
			jsonLog += "{\"error_code\" : \"noGetParameters\",";
			jsonLog += "\"message\" : \""+message+"\"},";
		} else {
			// out.println("<ul>");
			// while( paramNames.hasMoreElements() ){
				// parName = (String) paramNames.nextElement();
				// out.println("<li>");
				// out.println("<b>" + parName + "</b>: " + request.getParameter(parName) );
				// out.println("</li>");
			// }//end while
			// out.println("</ul>");
		}
		
		
		//connect to DB
		try
		{
			Class.forName ("com.mysql.jdbc.Driver").newInstance ();
			conn = DriverManager.getConnection (dbUrl, dbUser, dbPassword);
			Statement stat = conn.createStatement();
			
			//out.println ("<div class='alert alert-info'>");
			//out.println ("connection statement: " + stat);
			//out.println ("</div>");

			String message = "Database connection established,  " + dbUrl;
			jsonLog += "{\"message\" : \""+message+"\"},";
			
/*
			sql = "SHOW TABLES;";
			ResultSet rs = stat.executeQuery(sql);

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
*/
			
		}
		catch (Exception e)
		{
			String message = "Cannot connect to database server " + dbUrl;
			jsonLog += "{\"error_code\" : \"connectDBerror\"},";
			jsonLog += "{\"message\" : \""+e.getMessage()+"\"},";
			jsonLog += "{\"message\" : \""+message+"\"}";
			//e.printStackTrace(response.getWriter());
		}
		finally
		{
			if (conn != null)
			{
				try{
					conn.close ();
				} catch (Exception e) { 
					//e.printStackTrace(response.getWriter());
					String message = "Cannot close connect to database server...." + dbUrl;
					jsonLog += "{\"error_code\" : \"connectDBerror\"},";
					jsonLog += "{\"message\" : \""+e.getMessage()+"\"},";
					jsonLog += "{\"message\" : \""+message+"\"}";
				}
			}
		}//end block try
		
		if( jsonLog.length() > 0){
			jsonLog =  jsonLog.substring( 0, jsonLog.length() - 1);
			jsonLog = "[" + jsonLog + "]";
			
			jsonLog = jsonLog.replaceAll("\r", "R");
			jsonLog = jsonLog.replaceAll("\n", "<br>");
			//jsonLog = jsonLog.replaceAll("/", "!");
			//jsonLog = jsonLog.replaceAll(":", "%");
			out.println( jsonLog );
		}
		
	}//end doGet()

	public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Enumeration paramNames = request.getParameterNames();
	}//end doPost()

}//end class