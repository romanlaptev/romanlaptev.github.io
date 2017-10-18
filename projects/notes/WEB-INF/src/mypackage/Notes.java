package mypackage;

//import java.io.IOException;
//import java.io.PrintWriter;
import java.util.Enumeration;

import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
//import javax.servlet.ServletConfig;
//import javax.servlet.ServletContext;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
//import java.util.Locale;

//import java.lang.Class;
//import java.util.Set;
import com.google.gson.Gson;
import org.apache.commons.lang.StringEscapeUtils; 

//import java.util.Collection;
import javax.servlet.http.Part;
import javax.servlet.annotation.MultipartConfig;
//import javax.servlet.annotation.WebServlet;
// import java.nio.ByteBuffer;
// import java.nio.channels.Channels;
// import java.nio.channels.ReadableByteChannel;
// import java.nio.channels.WritableByteChannel;
// import java.nio.file.Path;
// import java.nio.file.Paths;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@MultipartConfig
public final class Notes extends HttpServlet {
	Connection conn = null;
	static final String dbUser = "root";
	static final String dbPassword = "master";
	//static final String dbUrl = "jdbc:mysql://localhost/mysql";
	static final String dbUrl = "jdbc:mysql://localhost/?useUnicode=true&characterEncoding=UTF-8";

	PrintWriter out;
	Statement stat;

	static final String dbName = "db1";
	static final String tableName = "notes";
	static final String exportFileName = "notes.xml";
	String uploadPath;
	 
	public Map<String, String> sql = new HashMap<String, String>();

	public String jsonLog = "";
	private String message;	
	
	HttpServletResponse Response;
	//private ServletConfig config;
	
	//constructor
	public Notes() {
		//sql.put("test", "Test!");
	}
  
	public void init() throws ServletException {
	//public void init( ServletConfig config ) throws ServletException {
	}//end init()
	
	public void destroy(){
		/*called before the Filter instance is removed 
		from service by the web container*/
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
	public void doGet( HttpServletRequest request,	HttpServletResponse response) throws IOException, ServletException {
		
		request.setCharacterEncoding("UTF-8"); 
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");

		out = response.getWriter();
		Response = response;
		PageLoad( request );
	}//end doGet()

	public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		request.setCharacterEncoding("UTF-8"); //charset for client send data
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");//charset for send to the server

		out = response.getWriter();
		Response = response;
		PageLoad( request );
	}//end doPost()

	protected void PageLoad( HttpServletRequest request ){
		
		sql.put("createDB", "CREATE DATABASE IF NOT EXISTS `"+dbName+"` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
		
//------------------
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
		
//------------------
		_query = "SELECT id, author, title, text_message, DATE_FORMAT(client_date, '%Y-%m-%d %H:%i:%s') as client_date, "+
"DATE_FORMAT(server_date, '%Y-%m-%d %H:%i:%s') as  server_date, "+
"ip  FROM `"+tableName+"` ORDER BY `client_date` DESC;";
		sql.put("getNotes", _query);
		
//------------------
		_query = "INSERT INTO `"+tableName+"` ("+
"`author`, `title`, `text_message`, `client_date`, `server_date`, `ip`) VALUES ("+
" '{{authorName}}', "+
" '{{title}}', "+
" '{{textMessage}}', "+
" '{{client_date}}', "+
" '{{server_date}}', "+
" '{{ip}}' "+
");";
		sql.put("insertNote", _query);
		
		_query = "UPDATE `"+tableName+"` SET "+
"author = '{{authorName}}', "+
"title = '{{title}}', "+
"text_message = '{{textMessage}}', "+
"client_date = '{{client_date}}', "+
"server_date = '{{server_date}}', "+
"ip = '{{ip}}' WHERE id='{{id}}';";
		sql.put("updateNote", _query);

		sql.put("deleteNote", "DELETE FROM `"+tableName+"` WHERE `id`={{id}}");
		sql.put("clearNotes", "TRUNCATE TABLE `"+tableName+"`");
		sql.put("removeTable", "DROP TABLE `"+tableName+"`");

		sql.put("insertAll", "INSERT INTO `"+tableName+"` VALUES {{values}};");
		_query = "("+
" NULL, " +
" '{{author}}', " +
" '{{title}}', " +
" '{{text_message}}'," +
" '{{client_date}}', " +
" '{{server_date}}', " +
" '{{ip}}' " +
")";
		sql.put("insertValues", _query);

		
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
//stat.execute("set character set utf8");
//stat.execute("set names utf8"); 
// stat.execute("set character_set_client='utf8'");
// stat.execute("set character_set_results='utf8'"); 
// stat.execute("set collation_connection='utf8_general_ci'"); 
		
			runUpdateQuery( sql.get("createTable") );

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
			jsonLog = jsonLog.replaceAll("\\\\", "&#92;");//replace slash
			out.println( jsonLog );
		}
		jsonLog = "";
		
	}//end PageLoad()
	
	private void _testRequestParams( HttpServletRequest request ){
		
		//print request
		//out.println("Request method:" + request.getMethod() );
		Enumeration paramNames = request.getParameterNames();
		if( !paramNames.hasMoreElements() ){
			String message = "No parameters in request object...";
			jsonLog += "{\"error_code\" : \"noGetParameters\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}

		// Response.setContentType("text/html; charset=UTF-8");
		// //Response.setContentType("text/html;");
		// try {
			// //указываем кодировку для данных полученых от клиента
			// request.setCharacterEncoding("UTF-8"); 
		// } catch  (Exception e){
			// e.printStackTrace( out );
		// }
		
		// String parName;
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
				saveNote( request );
			break;
				
			case "get_notes":
				getNotes();
			break;
				
			case "delete_note":
				String deleteNoteQuery = sql.get("deleteNote");
				
				String id = request.getParameter("id");
				deleteNoteQuery = deleteNoteQuery.replace("{{id}}", id);
				
//out.println("Query:" + deleteNoteQuery);
				runUpdateQuery( deleteNoteQuery );
				
				message = "Delete note, SQL: " + deleteNoteQuery;
				jsonLog += "{";
				jsonLog += "\"message\" : \""+message+"\"";
				jsonLog += "},";
				
			break;
			
			case "edit_note":
				editNote( request );
			break;
				
			case "clear_notes":
				runUpdateQuery( sql.get("clearNotes") );
				message = "Clear notes, SQL: " + sql.get("clearNotes");
				jsonLog += "{";
				jsonLog += "\"message\" : \""+message+"\"";
				jsonLog += "},";
			break;
				
			case "remove_table":
				runUpdateQuery( sql.get("clearNotes") );
				String message = "Rebuild table, SQL: " + sql.get("clearNotes");
				jsonLog += "{";
				jsonLog += "\"message\" : \""+message+"\"";
				jsonLog += "},";
			break;
				
			case "export_notes":
				exportTable( exportFileName );
			break;
				
			case "upload":
//out.println("HttpServletRequest.getContextPath(): " + request.getContextPath() );
//out.println("ServletContext.getRealPath: " + getServletContext().getRealPath("/") );
				uploadPath = getServletContext().getRealPath("/") + "upload";
//out.println("uploadPath: " + uploadPath );
				uploadFile( request, uploadPath);
				
				importTable( uploadPath + "/" + exportFileName );
			break;

			case "import_notes":
				String xmlFilePath = getServletContext().getRealPath("/") + "upload/" + exportFileName;
				importTable( xmlFilePath );
			break;
				
			//case "test":
			//break;
			
			//default:
			//break;
		}//end switch

		
	}//end _testRequestParams()

	private void getNotes(){
//out.println("Query:" + sql.get("getNotes"));
		List<Map<String, String>> result = runSelectQuery( sql.get("getNotes") );
		
		//print query result
// out.println ("Size of the records result object: " + result.size() );		
		// for(Map<String, String> entry: result ){
			// for (String _key: entry.keySet() ) { 
				// String _value = entry.get(_key); 
				// out.println( _key + " : " + _value );
			 // }//next
		// }//next		
		if( result.size() > 0 ){
			Gson gson = new Gson();
			String jsonStr = gson.toJson( result );
			out.println( jsonStr);
		}

	}//end getNotes()

	private void saveNote(  HttpServletRequest request ){
		String insertNoteQuery = sql.get("insertNote");
		
		String textMessage = request.getParameter("text_message");
		String authorName = request.getParameter("author_name");
		String title = request.getParameter("title");
		String clientDate = request.getParameter("date");
		
		insertNoteQuery = insertNoteQuery.replace("{{authorName}}", authorName);
		insertNoteQuery = insertNoteQuery.replace("{{title}}", title);
		insertNoteQuery = insertNoteQuery.replace("{{textMessage}}", textMessage);
		insertNoteQuery = insertNoteQuery.replace("{{client_date}}", clientDate);
		
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String serverDate = dateFormat.format( now );
		insertNoteQuery = insertNoteQuery.replace("{{server_date}}", serverDate);

		String ipAddress = request.getRemoteAddr();
		insertNoteQuery = insertNoteQuery.replace("{{ip}}", ipAddress);
		
//out.println("Query:" + insertNoteQuery);
		runUpdateQuery( insertNoteQuery );
	}//end saveNotes()
	
	private void editNote(  HttpServletRequest request ){
		String updateNoteQuery = sql.get("updateNote");
		
		String id = request.getParameter("id");
		String textMessage = request.getParameter("text_message");
		String authorName = request.getParameter("author_name");
		String title = request.getParameter("title");
		String clientDate = request.getParameter("date");
		
		updateNoteQuery = updateNoteQuery.replace("{{id}}", id);
		updateNoteQuery = updateNoteQuery.replace("{{authorName}}", authorName);
		updateNoteQuery = updateNoteQuery.replace("{{title}}", title);
		updateNoteQuery = updateNoteQuery.replace("{{textMessage}}", textMessage);
		updateNoteQuery = updateNoteQuery.replace("{{client_date}}", clientDate);
		
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String serverDate = dateFormat.format( now );
		updateNoteQuery = updateNoteQuery.replace("{{server_date}}", serverDate);

		String ipAddress = request.getRemoteAddr();
		updateNoteQuery = updateNoteQuery.replace("{{ip}}", ipAddress);
		
//out.println("Query:" + updateNoteQuery);
		runUpdateQuery( updateNoteQuery );
		message = "Update note "+id+", SQL: " + updateNoteQuery;
		jsonLog += "{";
		jsonLog += "\"message\" : \""+message+"\"";
		jsonLog += "},";
	}//end editNote()
	
	private void exportTable( String filename ){

		List<Map<String, String>> result = runSelectQuery( sql.get("getNotes") );
		
		if( result.size() == 0 ){
			String message = "error, no export data... ";
			jsonLog += "{\"error_code\" : \"exportError\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}
		
		//create XML
		String xml = "";
		xml += "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
		xml += "<table name='notes'>\n";
		
		for(Map<String, String> entry: result ){
			//for (String _key: entry.keySet() ) { 
				//String _value = entry.get(_key); 
				//out.println( _key + " : " + _value );
			 //}//next
			String author = entry.get("author");
			String title = entry.get("title");
			String text_message = entry.get("text_message");
			String client_date = entry.get("client_date");
			String server_date = entry.get("server_date");
			String ip = entry.get("ip");

			xml +=  "\t<note title=\"" +title+ "\" ";
			//$xml .=  "id=\"".$id."\" ";
			xml +=  "author=\"" +author+ "\" ";
			xml +=  "ip=\"" +ip+ "\" ";
			xml +=  "client_date=\"" +client_date+ "\" ";
			xml +=  "server_date=\"" +server_date+ "\" ";
			xml +=  ">\n";
			
			if ( text_message.length() > 0 ){
				xml +=  "\t\t<text_message>\n";
				xml +=  text_message+"\n";
				xml +=  "\t\t</text_message>\n";
			}
			xml += "\t</note>\n";
		}//next		
		
		xml += "</table>\n\n";
		
//Response.setContentType("text/html");
//out.println( StringEscapeUtils.escapeHtml( xml ) );
//out.println( xml );

 		Response.addHeader("Content-Type", "application/xhtml+xml");
		Response.addHeader("Content-Disposition","attachment; filename=" + filename);
		// Response.addHeader("Content-Transfer-Encoding","binary");
		//Response.addHeader("Content-Length", xml.Length.ToString() );
		out.println( xml );
	}//end exportTable()
	
	private void uploadFile( HttpServletRequest request, String dirPath ){

		String contentType = request.getContentType();
//out.println("request ContentType: " + contentType );
		
		if( contentType.indexOf("multipart/form-data") == -1){
			String message = "Wrong request, No POST data";
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"noPOSTdata\",";
			jsonLog += "\"message\" : \""+message+"\"";
			jsonLog += "},";
			return;
		};
		
//dirPath = "c:\\temp\\upload";
		File file = new File(dirPath);
		if( !file.isDirectory() ){
			// File[] files = file.listFiles();
			// for(File f:files){
				// try {
					// out.println( f.getCanonicalPath() );
				// } catch (IOException e) {
					// e.printStackTrace();
				// }
			// }//next
			String message = "Directory " + dirPath + " not exists...";
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"DirectoryNotFound\",";
			jsonLog += "\"message\" : \""+message+"\"";
			jsonLog += "},";
			
			try {
				file = new File(dirPath);
				boolean created = false;
				created = file.mkdirs();
				if( created ){
					message = "Directory " + dirPath + " was created...";
					jsonLog += "{";
					jsonLog += "\"message\" : \""+message+"\"";
					jsonLog += "},";
				}			 
			} catch(Exception e) {
				e.printStackTrace();
			}
		}//end if

		try{
			//https://javatalks.ru/topics/41831
			//Collection<Part> parts = request.getParts();
//out.println("Size of parts: " + parts.size() );

			// int i = 0;
			// for (Part part : parts) {
				// out.println("Part #" + ++i + ":");
				// out.println(part.getName());
				// out.println(part.getSize());
				// out.println(part.getContentType());
			// }
			Part uploadFile = request.getPart("upload_file");
// out.println("Name: " + uploadFile.getName());
// out.println("Size: " + uploadFile.getSize());
// out.println("Type: " + uploadFile.getContentType());

			if ( uploadFile != null && 
					uploadFile.getSize() > 0 && 
						uploadFile.getInputStream() != null) {
							
				try {
					//File f = new File( dirPath + "\\" + exportFileName );
					File f = new File( dirPath + "/" + exportFileName );
					FileOutputStream fos = new FileOutputStream( f );
					
	//https://metanit.com/java/tutorial/6.3.php				
	// String text = "Hello world!";
	// byte[] buffer = text.getBytes();
	// fos.write( buffer, 0, buffer.length);

					InputStream fin = uploadFile.getInputStream();
					byte[] buffer = new byte[ fin.available() ];
					fin.read(buffer, 0, buffer.length);
					fos.write(buffer, 0, buffer.length);

					fos.close();
				}
				catch(IOException ex){
					String message = "Upload error: " + ex.getMessage();
					jsonLog += "{";
					jsonLog += "\"error_code\" : \"UploadError\",";
					jsonLog += "\"message\" : \""+message+"\"";
					jsonLog += "},";
				}
 				
			}//end if
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		
	}//end uploadFile()

	private void importTable( String xmlFilePath){
//out.println("xmlFilePath: " + xmlFilePath );
		String msg;
		
		File xmlFile;
		xmlFile = new File( xmlFilePath );
		if ( !xmlFile.exists() ){
			msg = "Import error: " + xmlFile + " not exists...";
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"FileNotExists\",";
			jsonLog += "\"message\" : \""+msg+"\"";
			jsonLog += "},";
			return;
		}
		if ( !xmlFile.canRead() ){
			msg = "Import error: cannot read " + xmlFile + "...";
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"FileNotRead\",";
			jsonLog += "\"message\" : \""+msg+"\"";
			jsonLog += "},";
			return;
		}
		if ( xmlFile.length() == 0 ){
			msg = "Import error: empty data in " + xmlFile + "...";
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"FileEmpty\",";
			jsonLog += "\"message\" : \""+msg+"\"";
			jsonLog += "},";
			return;
		}
		
		try {
		
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse( xmlFile );//create tree from file
		
			Node root = doc.getDocumentElement();
			if (doc.hasChildNodes() ) {
				String queryValues = formInsertSQLQuery( root.getChildNodes() );
				
				String query = sql.get("insertAll");
				query = query.replace("{{values}}", queryValues);
				
out.println("Query :" + query );
				runUpdateQuery( query );
			}		
			
		} catch (Exception e) {
			//ex.printStackTrace(System.out);
			msg = "XML parse error: " + e.getMessage();
			jsonLog += "{";
			jsonLog += "\"error_code\" : \"XMLparseError\",";
			jsonLog += "\"message\" : \""+msg+"\"";
			jsonLog += "},";
		}//end try

	}//end importTable()
	
	private String formInsertSQLQuery( NodeList nodeList ){
		String queryValues = "";
		String record;
		int num = 0;
		
		for( int count = 0; count < nodeList.getLength(); count++){
			Node tempNode = nodeList.item(count);
			if (tempNode.getNodeType() == Node.ELEMENT_NODE) {
				
				record = sql.get("insertValues");
				if( num > 0 ){
					record = ", " + record;
				}
				
				if ( tempNode.hasAttributes() ){// get attributes names and values
					NamedNodeMap nodeMap = tempNode.getAttributes();
					for (int n = 0; n < nodeMap.getLength(); n++) {
						Node attr = nodeMap.item(n);
						String name = attr.getNodeName();
						String value = attr.getNodeValue();
						record = record.replace("{{" + name + "}}", value.trim() );
//out.println("Record :" + record );
					}
				}
			
				if (tempNode.hasChildNodes()) {
					NodeList childNodeList = tempNode.getChildNodes();
					for( int n2 = 0; n2 < childNodeList.getLength(); n2++){
						Node _item = childNodeList.item(n2);
						String nName = _item.getNodeName();
						
						String nValue = _item.getTextContent();
						nValue = nValue.replaceAll("\"", "&quot;");
						nValue = nValue.replaceAll("<", "&lt;");
						nValue = nValue.replaceAll(">", "&gt;");
						nValue = nValue.replaceAll("'", "&#39");//apostrophe
						
						record = record.replace("{{" + nName + "}}", nValue.trim() );
					}//next
				}
				
				queryValues += record;
				num++;
			}
		}//next
		
		return queryValues;
	}//end formInsertSqlQuery()
	
	
	//private void runUpdateQuery(String query) throws SQLException{
	private void runUpdateQuery(String query) {
//out.println("Query: " + query);
		try
		{
			stat.executeUpdate( query );
			
			// String _message = "Query: " + query;
			// jsonLog += "{";
			// jsonLog += "\"message\" : \""+_message+"\"";
			// jsonLog += "},";
		}
		catch (SQLException e)
		{
			//e.printStackTrace( out );
			//out.println( e.getMessage() );
			String message = "SQL Exception. " + e.getMessage();
			jsonLog += "{\"error_code\" : \"SQLException\",";
			jsonLog += "\"message\" : \""+message+"\"},";
			return;
		}
	}//end
	
	private List<Map<String, String>> runSelectQuery(String query) {
		
		String key = "";
		String value = "";
		
		List<Map<String, String>> records = new ArrayList<Map<String, String>>();
		
		try
		{
			ResultSet rs = stat.executeQuery( query );
			ResultSetMetaData data = rs.getMetaData();
			
			int count = data.getColumnCount();

			while (rs.next()) {
				
				Map<String, String> dBrecord = new HashMap<String, String>();
				//String record[] = new String[ count ];
				
				for ( int n = 1; n <= count; n++ ) {
//out.println( data.getColumnName(n) + " : " + rs.getString(n) );
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
// //out.println ("Size of the element: " + _record.size() );
// out.println ("element: " + _record.toString() );

	// // for (String _key : _record.keySet() ) {
		// // out.println("Key: " + _key);
	// // }
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
	
}//end class