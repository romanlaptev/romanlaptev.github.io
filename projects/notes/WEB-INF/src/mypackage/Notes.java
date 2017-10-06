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

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

//import java.lang.Class;
//import java.util.Set;

public final class Notes extends HttpServlet {
	Connection conn = null;
	String dbUser = "root";
	String dbPassword = "master";
	String dbUrl = "jdbc:mysql://localhost/mysql";
	
	PrintWriter out;
	Statement stat;

	String dbName = "db1";
	String tableName = "notes";
	
	public Map<String, String> sql = new HashMap<String, String>();

	public String jsonLog = "";
	
	//constructor
	public Notes() {
		//sql.put("test", "Test!");
	}
   
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
	public void doGet( HttpServletRequest request,
					HttpServletResponse response) throws IOException, ServletException {

		//response.setContentType("text/html");
		out = response.getWriter();
		
		//out.println("test constructor:" + sql.get("test"));
		
		// //print request
		// String parName;
		// boolean emptyEnum = false;
		
		// Enumeration paramNames = request.getParameterNames();
		// if( !paramNames.hasMoreElements() ){
			// emptyEnum = true;
		// }
		// if( emptyEnum ){
			// String message = "No parameters in request object...";
			// jsonLog += "{\"error_code\" : \"noGetParameters\",";
			// jsonLog += "\"message\" : \""+message+"\"},";
		// } else {
			// // out.println("<ul>");
			// // while( paramNames.hasMoreElements() ){
				// // parName = (String) paramNames.nextElement();
				// // out.println("<li>");
				// // out.println("<b>" + parName + "</b>: " + request.getParameter(parName) );
				// // out.println("</li>");
			// // }//end while
			// // out.println("</ul>");
		// }
		
		sql.put("createDB", "CREATE DATABASE IF NOT EXISTS `"+dbName+"` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
		
		String _query = "CREATE TABLE IF NOT EXISTS `"+tableName+"` (" +
"`id` int(11) NOT NULL AUTO_INCREMENT," +
"`author` varchar(20) NOT NULL," +
"`title` varchar(255) default \"no title\"," +
"`text_message` text NOT NULL, " +
"`client_date` DATETIME NULL, " +
"`server_date` DATETIME NULL, " +
"`ip` varchar( 20 ), " +
"PRIMARY KEY (`id`)"+
") DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
		sql.put("createTable", _query);
		
		sql.put("selectDB", "USE db1;");
		
		_query = "INSERT INTO `"+tableName+"` ("+
"`author`, `title`, `text_message`, `client_date`, `server_date`, `ip`) VALUES ("+
" 'anonymous', "+
" 'title1', "+
" 'textMessage1', "+
" '2017-10-02 16:04:58', "+
" '2017-10-02 09:08:40', "+
" '37.193.108.45' "+
");";
		sql.put("insertNote", _query);
		
		_query = "SELECT id, author, title, text_message, client_date, server_date, ip  FROM `"+tableName+"` ORDER BY `client_date` DESC;";
		sql.put("getNotes", _query);
		
		//start, connect to database server, create database, create table, check request parameters
		try
		{
			Class.forName ("com.mysql.jdbc.Driver").newInstance ();
			conn = DriverManager.getConnection (dbUrl, dbUser, dbPassword);
			stat = conn.createStatement();
			
			//String message = "Database connection established,  " + dbUrl;
			//jsonLog += "{\"message\" : \""+message+"\"},";
			
			runUpdateQuery( sql.get("createDB") );
			runUpdateQuery( sql.get("selectDB") );
			runUpdateQuery( sql.get("createTable") );
			//runUpdateQuery( sql.get("insertNote") );

			_testRequestParams( request );
		}
		catch (SQLException e)
		{
			e.printStackTrace( out );
			//out.println( e.getMessage() );
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
					String message = "Cannot close connect to database " + dbUrl;
					jsonLog += "{\"error_code\" : \"DBerror\"},";
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
		jsonLog = "";
		
	}//end doGet()

	public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Enumeration paramNames = request.getParameterNames();
	}//end doPost()

	//private void runUpdateQuery(String query) throws SQLException{
	private void runUpdateQuery(String query) {
//out.println("Query: " + query);
		try
		{
			stat.executeUpdate( query );
		}
		catch (SQLException e)
		{
			//e.printStackTrace( out );
			out.println( e.getMessage() );
		}
	}//end
	
	private List<Map<String, String>> runSelectQuery(String query) {
		
		String key = "";
		String value = "";
		
		List<Map<String, String>> records = new ArrayList<Map<String, String>>();
		Map<String, String> dBrecord = new HashMap<String, String>();
		
		try
		{
			ResultSet rs = stat.executeQuery( query );
			ResultSetMetaData data = rs.getMetaData();
			
			int count = data.getColumnCount();

			while (rs.next()) {
				String record[] = new String[ count ];
				for ( int n = 1; n <= count; n++ ) {
//out.print( data.getColumnName(n) + " : " + rs.getString(n) );
//out.println("\n");
					key = data.getColumnName(n);
					value = rs.getString(n);
					dBrecord.put( key , value);
				}//next
//out.println("===================");
// for (String _key: dBrecord.keySet() ) { 
	// String _value = dBrecord.get(_key); 
	// out.println( _key + " : " + _value );
// } 

// for (Map.Entry<String, String> _record : dBrecord.entrySet()) {
// out.println("Key: " + _record.getKey() + " Value: "+ _record.getValue());
// }
				records.add( dBrecord );
			}//end while
			
			rs.close();
			
//out.println ("Size of the records: " + Integer.valueOf ( records.size() ) );		

// for(Map<String, String> entry: records ){
	// out.println( "Size = " + entry.size() );
	// // String _value = (String) entry.get("ip"); 
// // out.println ("element IP: " + _value );
	
	// //out.println( "Key set " + entry.keySet() );
	// //Class cls = entry.keySet().getClass();
	// //out.println("The type of the object is: " + cls.getName() );
	
	// for (String _key: entry.keySet() ) { 
		// String _value = entry.get(_key); 
		// out.println( _key + " : " + _value );
	 // }//next
// }//next

// for( int n = 0; n < records.size(); n++){
	// Map<String, String> _record = records.get(n);
// out.println ("Size of the element: " + _record.size() );
// out.println ("element: " + _record.toString() );

	// for (String _key : _record.keySet() ) {
		// out.println("Key: " + _key);
	// }
	// // for (Map.Entry _r : _record.entrySet() ) {
// // out.println("Key: " + _r.getKey() + " Value: "+ _r.getValue());
	// // }//next
	
	// // for (Map.Entry<String, String> _r : _record.entrySet()) {
// // out.println("Key: " + _r.getKey() + " Value: "+ _r.getValue());
	// // }
	
// }//next

		}
		catch (SQLException e)
		{
			//e.printStackTrace( out );
			out.println( e.getMessage() );
		}
		
		return records;
	}//end runSelectQuery()
	
	private void _testRequestParams( HttpServletRequest request ){
		
		//print request
		Enumeration paramNames = request.getParameterNames();
		if( !paramNames.hasMoreElements() ){
			String message = "No parameters in request object...";
			jsonLog += "{\"error_code\" : \"noGetParameters\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}

		//String parName;
		// out.println("<ul>");
		// while( paramNames.hasMoreElements() ){
			// parName = (String) paramNames.nextElement();
			// out.println("<li>");
			// out.println("<b>" + parName + "</b>: " + request.getParameter(parName) );
			// out.println("</li>");
		// }//end while
		// out.println("</ul>");
		
		String action = request.getParameter("action");
//out.println( action == null );
		if (action == null) {
			String message = "No parameter 'action' ...";
			jsonLog += "{\"error_code\" : \"noGetParameter\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}
		
//out.println( "action length: " + action.length() );
//out.println( "action isEmpty: " + action.isEmpty() );
		if ( action.isEmpty() ) {
			String message = "Empty 'action' ...";
			jsonLog += "{\"error_code\" : \"emptyAction\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}
//out.println("action:" + action);

		switch (action)
		{
			case "save_note":
			break;
				
			case "get_notes":
				getNotes();
			break;
				
			case "delete_note":
			break;
			
			case "edit_note":
			break;
				
			case "clear_notes":
			break;
				
			case "remove_table":
			break;
				
			case "export_notes":
			break;
				
			case "upload":
			break;

			case "import_notes":
			break;
				
			case "test":
			break;
			
			default:
			break;
		}//end switch

		
	}//end _testRequestParams()

	private void getNotes(){
//out.println("Query:" + sql.get("getNotes"));
		List<Map<String, String>> result = runSelectQuery( sql.get("getNotes") );
		
		//print query result
out.println ("Size of the records result object: " + result.size() );		
		for(Map<String, String> entry: result ){
			for (String _key: entry.keySet() ) { 
				String _value = entry.get(_key); 
				out.println( _key + " : " + _value );
			 }//next
		}//next		

	}//end getNotes()

}//end class