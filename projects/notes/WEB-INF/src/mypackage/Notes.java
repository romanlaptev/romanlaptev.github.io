package mypackage;

//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Enumeration;

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

		//response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		try
		{
			Class.forName ("com.mysql.jdbc.Driver").newInstance ();
			conn = DriverManager.getConnection (dbUrl, dbUser, dbPassword);
			Statement stat = conn.createStatement();
			
			out.println ("<div class='alert alert-info'>");
			out.println ("connection statement: " + stat);
			out.println ("</div>");
			//System.out.println ("Database connection established");
			
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
			
		}
		catch (Exception e)
		{
			out.println ("<div class='alert alert-danger'>");
			out.println ("Cannot connect to database server " + dbUrl);
			e.printStackTrace(response.getWriter());
			out.println ("</div>");
		}
		finally
		{
			if (conn != null)
			{
				try{
					conn.close ();
					out.println ("<div class='alert alert-success'>");
					out.println("Database connection closed...");
					out.println ("</div>");
				} catch (Exception e) { 
					out.println ("<div class='alert alert-danger'>");
					out.println("Cannot close connect to database server....");
					e.printStackTrace(response.getWriter());
					out.println ("</div>");
				}
			}
		}//end block try
		
	}//end doGet()

	// public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		// Enumeration paramNames = request.getParameterNames();
	// }//end doPost()

}//end class