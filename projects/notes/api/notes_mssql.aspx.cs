using System;
using System.IO;
using System.Data;
//using System.Data.Sql;
using System.Data.SqlClient;
using System.Collections.Generic;
//using System.Collections.Specialized;
using System.Text;
using System.Xml; 
using System.Web;

public partial class _Default : System.Web.UI.Page
{
	string dbHost = ".\\SQLEXPRESS2005";
	static string dbName = "db1";//"site";
	string dbUser = "sa";
	string dbPassword = "assa";
	
	//somee.com hosting
	// string dbHost = "romanlaptevDB.mssql.somee.com";
	// static string dbName = "romanlaptevDB";
	// string dbUser = "romanlaptev_SQLLogin_1";
	// string dbPassword = "mg2kthxvqs";

	//http://romanlaptev.gearhostpreview.com/projects/notes/index.html	
	// string dbHost = "mssql6.gear.host";
	// static string dbName = "db117";
	// string dbUser = "db117";
	// string dbPassword = "Vt0U_ldj~yS1";
	
	static string tableName = "notes";//"user";

	string queryDbInfo = "SELECT * FROM master.sys.databases where name='"+dbName+"' ";
	string queryCreateDB;
	string queryCreateTable = "USE "+dbName+"; IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='"+tableName+"') " +	
"BEGIN\r\n"+
"CREATE TABLE \""+tableName+"\" (" +
" id int IDENTITY(1,1) PRIMARY KEY NOT NULL," +
" author  varchar(20) COLLATE Cyrillic_General_CI_AS NOT NULL," +
" title   varchar(255) COLLATE Cyrillic_General_CI_AS NOT NULL," +
" text_message  text COLLATE Cyrillic_General_CI_AS NOT NULL ," +
" client_date datetime NOT NULL," +
" server_date datetime NOT NULL," +
" ip varchar(20) "+
");\r\n"+
"END";

	string queryGetNotes = "SELECT id, author, title, text_message, client_date=Convert(char(19), client_date,20), server_date=Convert(char(19), server_date,20), ip FROM \""+
tableName+"\" ORDER BY \"client_date\" DESC";

	string queryInsertMessage = "INSERT INTO "+tableName+" (author, title, text_message, client_date, server_date, ip) "+
"VALUES ("+
" '{{authorName}}', "+
" '{{title}}', " +
" '{{textMessage}}', " +
" CONVERT(DATETIME,'{{client_date}}', 120), " +
" CONVERT(DATETIME,'{{server_date}}', 120), " +
" '{{ip}}' "+
");";

	string queryInsertAll = "INSERT INTO "+tableName+" {{values}};";
	string queryInsertValues = "SELECT "+
" '{{author}}', "+
" '{{title}}', "+
" '{{text_message}}', "+
" CONVERT(DATETIME,'{{client_date}}', 120), " +
" CONVERT(DATETIME,'{{server_date}}', 120), " +
" '{{ip}}' ";

	string queryUpdateNote = "UPDATE " +tableName+ " SET " +
"author = '{{author}}', " +
"title = '{{title}}', "+
"text_message = '{{text_message}}', "+
"client_date = CONVERT(DATETIME,'{{client_date}}', 120), " +
"server_date = CONVERT(DATETIME,'{{server_date}}', 120), " +
"ip = '{{ip}}' WHERE id={{id}}";

	string queryDeleteNote = "DELETE FROM "+tableName+" WHERE id={{id}}";
	string queryClearNotes = "TRUNCATE TABLE " + tableName;
	string queryRemoveTable = "DROP TABLE " + tableName;

	string uploadPath = "";
	//string uploadPath = "c:\\temp\\upload";
	string exportFilename = "notes.xml";

	string _connectionString = "";
	SqlConnection db_connection;

	struct Note
	{
		public string id;
		public string author;
		public string title;
		public string text_message;
		public string client_date;
		public string server_date;
		public string ip;
		
		public string Info()
		{
			string s = "<p>";
			s += "id : "+id+", ";
			s += "author : "+author+", ";
			s += "title : "+title+", ";
			s += "text_message : "+text_message+", ";
			s += "client_date : "+client_date+", ";
			s += "server_date : "+server_date+", ";
			s += "ip : "+ip;
			s += "</p>";
			return s;
		}
		
		public string formXML()
		{
			string s = "\t<note ";
			s += "title='"+title+"' ";
			s += "author='"+author+"' ";
			s += "ip='"+ip+"' ";
			s += "client_date='"+client_date+"' ";
			s += "server_date='"+server_date+"'>\n";
			
			s += "\t\t<text_message>\n";
//------------------------ filter
			//remove old special symbols
			text_message = text_message.Replace("&quot;", "\"");
			text_message = text_message.Replace("&amp;", "&");
			text_message = text_message.Replace("&lt;", "<");
			text_message = text_message.Replace("&gt;", ">");
			text_message = text_message.Replace("&#39;", "'");//apostrophe
			
			//insert special symbols re-new
			text_message = text_message.Replace("&", "&amp;");
			text_message = text_message.Replace("<", "&lt;");
			text_message = text_message.Replace(">", "&gt;");
			text_message = text_message.Replace("\"", "&quot;");
			text_message = text_message.Replace("\'", "&#39;");//apostrophe
//------------------------------
			s += text_message+"\n";
			
			s += "\t\t</text_message>\n";
			s += "\t</note>\n";
			return s;
		}
		
		public void saveValue( string name, string value )
		{
			switch (name) {
				case "id":
					id = value;
				break;
				
				case "author":
					author = value;
				break;
				
				case "title":
					title = value;
				break;
				
				case "text_message":
					text_message = value;
				break;
				
				case "client_date":
					client_date = value;
				break;
				
				case "server_date":
					server_date = value;
				break;
				
				case "ip":
					ip = value;
				break;
				
			}//end switch
		}//end saveValue()
		
	}//end struct
	
	Note note;
	List<Note> notes = new List<Note>();
	List<string> log = new List<string>();
	
	protected void Page_Init(object sender, EventArgs e)
	{
//Response.Write("Page_Init.<br>");
//Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
		//Redefine uploadPath
		if( uploadPath.Length == 0){
			
			//https://msdn.microsoft.com/en-us/library/36s52zhs(v=vs.110).aspx
			string filePath = Server.MapPath( null );
//Response.Write ( "filePath: " + filePath); //filepath: C:\www\romanlaptev.github.io\projects\notes\api
//Response.Write ( "<br>"); 

			//https://msdn.microsoft.com/ru-ru/library/system.io.path.getdirectoryname(v=vs.110).aspx
			uploadPath = Path.GetDirectoryName(filePath) + "\\upload";
		}
//Response.Write ( "uploadPath: " + uploadPath);
//Response.Write ( "<br>"); 

		// log.Add("[");
		// log.Add("{\"first\" : \"test!\"}");
		// log.Add("]");
		// foreach (string logStr in log)
		// {
			// Response.Write( logStr );
		// }
		
	}//end Page_Init()
	
	protected void Page_PreRender(object sender, EventArgs e)
	{
//Response.Write("Page_PreRender.<br>");
	}
	
	// protected void Page_Unload(object sender, EventArgs e)
	// {
	// }
	
	protected void Page_LoadComplete(object sender, EventArgs e)
	{
//Response.Write("Page_LoadComplete.<br>");
	}//end Page_LoadComplete()
	
	protected void Page_Load(object sender, EventArgs e)
	{
		// foreach ( string x in Request.ServerVariables )
		// {
			// Response.Write ( "<b>"+x + "</b> = " + Request.ServerVariables[x]); 
			// Response.Write ( "<br>"); 
		// }
		
		// foreach ( string x in Request.Params )//GET
		// {
			// Response.Write ( "<b>Request.Params["+x + "]</b> = " + Request.Params[x]); 
			// Response.Write ( "<br>"); 
		// }
		// foreach ( string x in Request.Form )//POST
		// {
			// Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
			// Response.Write ( "<br>"); 
		// }
		
			queryCreateDB += "IF NOT EXISTS (";
			queryCreateDB += "SELECT * FROM master.dbo.sysdatabases WHERE name = '"+dbName+"') ";
			queryCreateDB += "BEGIN\r\n ";
			queryCreateDB += "CREATE DATABASE "+dbName+" ";
			queryCreateDB += "COLLATE Cyrillic_General_CI_AS \r\n";
			queryCreateDB += "END\r\n ";
/*	
https://support.microsoft.com/ru-ru/help/307283/how-to-create-a-sql-server-database-programmatically-by-using-ado-net
IF NOT EXISTS (SELECT * FROM master.dbo.sysdatabases where name = 'db1')
BEGIN
CREATE DATABASE db1;
END	

CREATE DATABASE db1 ON PRIMARY 
(NAME = db1, 
FILENAME = 'C:\\db\\MSSQL\\db1.mdf', 
SIZE = 3MB, MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB) 
LOG ON (NAME = db1_log, 
FILENAME = 'C:\\db\\MSSQL\\db1_log.ldf', 
SIZE = 1MB, 
MAXSIZE = 5MB, 
FILEGROWTH = 10%);
*/
		_connectionString = "Data Source="+dbHost+"; ";
		//_connectionString += "Initial Catalog="+dbName+"; ";
		_connectionString += "Integrated Security=False; ";
		_connectionString += "User Id="+dbUser+";";
		_connectionString += "Password="+dbPassword+";";

		db_connection = new SqlConnection( _connectionString );
		//int result = 0;
		try{
			db_connection.Open();
			runQuery( queryCreateDB );

//queryDbInfo
	// SqlDataReader reader;
	// SqlCommand cmd;
	// string testQuery;
	
	//problem with collation_name: "SQL_Latin1_General_CP1_CI_AS" need change on "Cyrillic_General_CI_AS"
	//change COLLATE to database
	// testQuery = "ALTER DATABASE "+dbName+" COLLATE Cyrillic_General_CI_AS; ";
	// runQuery( testQuery );
	
	//testQuery = queryDbInfo;
	//testQuery = "SELECT * FROM fn_helpcollations() ORDER BY name ASC";

	//get COLLATE for table columns
	// testQuery = "";
	// testQuery += "SELECT a.[name], a.[collation_name] FROM sys.columns AS a ";
	// testQuery += "INNER JOIN sys.objects AS b ON a.[object_id] = b.[object_id] ";
	// testQuery += "WHERE b.[name] = '"+tableName+"'; ";
/*
//http://kbyte.ru/ru/Programming/Sources.aspx?id=1044&mode=show
	-- change COLLATE column
	ALTER TABLE tableName
	ALTER COLUMN columnName varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS
*/	

	// Response.Write(testQuery);
	// Response.Write("<br>");
	
	// cmd = new SqlCommand ( testQuery, db_connection );
	// reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
	// if (reader.HasRows){
		// while ( reader.Read() ){
			// for (int n = 0; n < reader.FieldCount; n++){
				// Response.Write( "<b>" +reader.GetName(n) +"</b>: " + reader.GetValue(n) );
				// Response.Write("<br>");
			// }//next
		// }//end while
	// } else {
		// Response.Write("No rows found in table " + tableName);
	// }
	// reader.Close();

			runQuery( queryCreateTable );
			_testRequestParams();
		}
		//catch (Exception ex){
		//catch (System.Exception ex){
		catch (SqlException ex){
//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqlexception(v=vs.110).aspx
//https://msdn.microsoft.com/en-us/library/cc645611.aspx
			Response.Write("Database connect error....");
			Response.Write("connection string:" + _connectionString);
			Response.Write("<pre>");
			//Response.Write(ex);
			Response.Write(ex.Message);			
			Response.Write("<br>");
			
			//Response.Write("Class: " + ex.Class);
			//Response.Write("<br>");

			//Response.Write("ErrorCode: " + ex.ErrorCode);
			//Response.Write("<br>");

			//Response.Write("ClientConnectionId: " + ex.ClientConnectionId);
			//Response.Write("<br>");

			//Response.Write("HResult: " + ex.HResult);
			//Response.Write("<br>");
			
			//Response.Write("LineNumber: " + ex.LineNumber);
			//Response.Write("<br>");

			Response.Write("Error number: " + ex.Number);
			Response.Write("<br>");

			//Response.Write("State: " + ex.State);
			//Response.Write("<br>");
			
			Response.Write("Server: " + ex.Server);
			Response.Write("<br>");

			//Response.Write("TargetSite: " + ex.TargetSite);
			//Response.Write("<br>");
/*
System_CAPS_pubproperty	Data	
Возвращает коллекцию пар ключ/значение, предоставляющие дополнительные сведения об исключении, определяемые пользователем.(Наследуется от Exception.)


System_CAPS_pubproperty	Errors	
Возвращает коллекцию из одного или нескольких SqlError объекты, которые предоставляют подробные сведения об исключениях, создаваемых поставщиком данных .NET Framework для SQL Server.

System_CAPS_pubproperty	HelpLink	
Получает или задает ссылку на файл справки, связанный с этим исключением.(Наследуется от Exception.)

System_CAPS_pubproperty	HResult	
Возвращает или задает HRESULT — кодированное числовое значение, присвоенное определенному исключению.(Наследуется от Exception.)

System_CAPS_pubproperty	InnerException	
Возвращает экземпляр класса Exception, который вызвал текущее исключение.(Наследуется от Exception.)

System_CAPS_pubproperty	LineNumber	
Возвращает номер строки в пакете команд Transact-SQL или хранимой процедуры, вызвавшего ошибку.

System_CAPS_pubproperty	Message	
Получает сообщение, описывающее текущее исключение.(Наследуется от Exception.)

System_CAPS_pubproperty	Number	
Возвращает число, определяющее тип ошибки.

System_CAPS_pubproperty	Procedure	
Возвращает имя вызвавшей ошибку хранимой процедуры или удаленного вызова процедур (RPC).

System_CAPS_pubproperty	Server	
Возвращает имя компьютера, на котором запущен экземпляр SQL Server, вызвавшего ошибку.

System_CAPS_pubproperty	Source	
Возвращает имя вызвавшего ошибку поставщика.(Переопределяет Exception.Source.)

System_CAPS_pubproperty	StackTrace	
Получает строковое представление непосредственных кадров в стеке вызова.(Наследуется от Exception.)

System_CAPS_pubproperty	State	
Возвращает числовой код ошибки от SQL Server, который представляет ошибку, предупреждение или сообщение «данные не найдены». Дополнительные сведения о расшифровке этих значений см. в разделе электронной документации по SQL Server.

System_CAPS_pubproperty	TargetSite
*/			
			// StringBuilder errorMessages = new StringBuilder();
			// for (int n = 0; n < ex.Errors.Count; n++){
				// errorMessages.Append("Index #" + n + "\n" +
					// "Message: " + ex.Errors[n].Message + "\n" +
					// "Error Number: " + ex.Errors[n].Number + "\n" +
					// "LineNumber: " + ex.Errors[n].LineNumber + "\n" +
					// "Source: " + ex.Errors[n].Source + "\n" +
					// "Procedure: " + ex.Errors[n].Procedure + "\n");
			// }
			// Response.Write(errorMessages.ToString());
			// Response.Write("<br>");
				
// foreach(SqlError err in ex.Errors) {
	// Response.Write(err.ToString() );
	// Response.Write("<br>");
// }
// for (int n = 0; n < ex.Errors.Count; n++)
// {
	// Response.Write("Index #" + n + ", " + "error: " + ex.Errors[n].ToString() + "<br>");
// }
// switch (err.Number)
// {
// }
	  
			Response.Write("</pre>");
		}
		finally
		{
			if(db_connection.State == ConnectionState.Open)
			{
				try
				{
					db_connection.Close();
				}
				catch(Exception eClose)
				{
					Response.Write("<pre>");
					Response.Write(eClose.ToString());
					Response.Write("</pre>");
				}//end
			}
		}//end	
		
		//output log in JSON format
		//log.Add("{\"error_code\" : \"noaction\", \"message\" : \"error, undefined var 'action'\"}");
		if( log.Count > 0){
			string logStr = "[";
			int num = 0;
			foreach (string logMsg in log){
				if( num > 0){
					logStr += ", ";
				}
				logStr += logMsg;
				num++;
			}
			logStr +="]";
			logStr = logStr.Replace("\\", "&#92;");//replace slash			
Response.Write( logStr );
		}
		
	}//end Page_Load()
	
	
	protected void _testRequestParams()
	{
	
		string jsonStr = "";
		
		string authorName = "";
		string title = "";
		string textMessage = "";
		string clientDate = "";
		string serverDate = "";
		string ip = "";
		string nid = "";
		
		if( Request.QueryString["action"] == null )
		{
			//Response.Write("error, undefined var 'action' ");
			log.Add("{\"message\" : \"no action, undefined var 'action'\"}");
			return;
		}
		string action = Request.QueryString["action"];
		if( action.Length == 0 )
		{
			//Response.Write("error, empty var 'action'");
			log.Add("{\"message\" : \"error, empty var 'action'\"}");
			return;
		}
//Response.Write ( action ); 
//Response.Write ( "<br>"); 
		
		switch (action)
		{
			case "save_note":
				
				if ( Request.HttpMethod == "POST" ) {
					textMessage = Request.Form["text_message"];
					if( textMessage.Length == 0 ){
						//Response.Write("error, empty var 'text_message'");
						log.Add("{\"message\" : \"error, empty var 'text_message'\"}");						
						return;
					}
					authorName = Request.Form["author_name"];
					title = Request.Form["title"];
					clientDate = Request.Params["date"];
				} else {
					Response.Write("<b>error</b>, need <b>POST query</b>...");
					return;
				}
			
				queryInsertMessage = queryInsertMessage.Replace("{{authorName}}", authorName);
				queryInsertMessage = queryInsertMessage.Replace("{{title}}", title);
//filter				
				//textMessage = textMessage.Replace("<", "&lt;");
				//textMessage = textMessage.Replace(">", "&gt;");
				textMessage = textMessage.Replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
				//textMessage = textMessage.Replace("\r", "");
				//textMessage = textMessage.Replace("\n", "<br>");
				textMessage = textMessage.Replace("'", "&#39");//replace apostrophe
				
				queryInsertMessage = queryInsertMessage.Replace("{{textMessage}}", textMessage);
				
				queryInsertMessage = queryInsertMessage.Replace("{{client_date}}", clientDate);

				serverDate = DateTime.Today.ToString("yyyy-MM-dd") + " "+DateTime.Now.ToString("HH:mm:ss");
				queryInsertMessage = queryInsertMessage.Replace("{{server_date}}", serverDate);
				
				ip = Request.ServerVariables["REMOTE_ADDR"];
				queryInsertMessage = queryInsertMessage.Replace("{{ip}}", ip);
				
//Response.Write ( queryInsertMessage ); 
				runQuery( queryInsertMessage );
			break;
				
			case "get_notes":
					getNotes( queryGetNotes );
			break;
				
			case "delete_note":
				if( Request.QueryString["id"] == null )
				{
					//Response.Write("error, undefined var 'id' ");
					log.Add("{\"message\" : \"error, undefined var 'id'\"}");	
					return;
				}
				string id = Request.QueryString["id"];
				if( id.Length == 0 )
				{
					//Response.Write("error, empty var 'id'");
					log.Add("{\"message\" : \"error, empty var 'id'\"}");	
					return;
				}
				
				queryDeleteNote = queryDeleteNote.Replace("{{id}}", id );
				runQuery( queryDeleteNote );

				//jsonStr = "[{";
				//jsonStr += "\"message\": \"Delete note, " + queryDeleteNote + " \" "; 
				//jsonStr += "}]";
				log.Add("{ \"message\" : \"Delete note, " + queryDeleteNote + "\"}");	
			break;
			
			case "edit_note":
// foreach ( string x in Request.Params )//GET
// {
	// Response.Write ( "<b>Request.Params["+x + "]</b> = " + Request.Params[x]); 
	// Response.Write ( "<br>"); 
// }
// foreach ( string x in Request.Form )//POST
// {
	// Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
	// Response.Write ( "<br>"); 
// }
				if ( Request.HttpMethod == "POST" ) {
					textMessage = Request.Form["text_message"];
					if( textMessage.Length == 0 ){
						//Response.Write("error, empty var 'text_message'");
						log.Add("{\"message\" : \"error, empty var 'text_message'\"}");						
						return;
					}
					nid = Request.Form["id"];
					authorName = Request.Form["author_name"];
					title = Request.Form["title"];
					clientDate = Request.Params["date"];
				} 
			
				queryUpdateNote = queryUpdateNote.Replace("{{id}}", nid);
				queryUpdateNote = queryUpdateNote.Replace("{{author}}", authorName);
				queryUpdateNote = queryUpdateNote.Replace("{{title}}", title);
//filter				
				//textMessage = textMessage.Replace("<", "lt;");
				//textMessage = textMessage.Replace(">", "gt;");
				textMessage = textMessage.Replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
				//textMessage = textMessage.Replace("\r", "");
				//textMessage = textMessage.Replace("\n", "<br>");
				textMessage = textMessage.Replace("'", "&#39");//replace apostrophe
				
				queryUpdateNote = queryUpdateNote.Replace("{{text_message}}", textMessage);
				
				queryUpdateNote = queryUpdateNote.Replace("{{client_date}}", clientDate);

				serverDate = DateTime.Today.ToString("yyyy-MM-dd") + " "+DateTime.Now.ToString("HH:mm:ss");
				queryUpdateNote = queryUpdateNote.Replace("{{server_date}}", serverDate);
				
				ip = Request.ServerVariables["REMOTE_ADDR"];
				queryUpdateNote = queryUpdateNote.Replace("{{ip}}", ip);
				
//Response.Write ( queryUpdateNote ); 
				runQuery( queryUpdateNote );
			break;
				
			case "clear_notes":
				runQuery( queryClearNotes );
//Response.Write(queryClearNotes);
				//jsonStr = "[{";
				//jsonStr += "\"message\": \"Clear table, " + queryClearNotes + " \" "; 
				//jsonStr += "}]";
				log.Add("{\"message\" : \"Clear table, " + queryClearNotes + " \"}");	
			break;
				
			case "remove_table":
				runQuery( queryRemoveTable );
				//jsonStr = "[{";
				//jsonStr += "\"message\": \"Rebuild table, " + queryRemoveTable + " \" "; 
				//jsonStr += "}]";
				log.Add("{\"message\" : \"Rebuild table, " + queryRemoveTable + " \"}");	
			break;
				
			case "export_notes":
				exportTable( exportFilename );			
			break;
				
			case "upload":
				uploadFile( uploadPath );
			break;

			case "import_notes":
				string xmlFilePath = uploadPath+ "\\"+ exportFilename;
				importTable( xmlFilePath );
			break;
				
			case "test":
				SqlDataReader reader;
				SqlCommand cmd;
				string testQuery;
				
				//testQuery = "SELECT * FROM sys.messages";
				
				//https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql
				//ODBC canonical date fomat yyyy-mm-dd hh:mi:ss(24h)
				//testQuery = "SELECT Convert(char(19), server_date,20) FROM notes";
				testQuery = "SELECT id, author, title, text_message, Convert(char(19), client_date,20), Convert(char(19), server_date,20), ip FROM notes";
				Response.Write(testQuery);
				Response.Write("<br>");
				
				cmd = new SqlCommand ( testQuery, db_connection );
				reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
				if (reader.HasRows){
					while ( reader.Read() ){
						for (int n = 0; n < reader.FieldCount; n++){
							Response.Write( "<b>name " +reader.GetName(n) +"</b>: " + reader.GetValue(n) );
							Response.Write("<br>");
						}//next
					}//end while
				} else {
					Response.Write("No rows found in table " + tableName);
				}
				reader.Close();
			
			break;
			
			default:
			break;
		}		
		Response.Write(jsonStr);
		
	}//end _testRequestParams()

	
	protected void getNotes( string query )
	{
		SqlDataReader reader;
		SqlCommand cmd;
		string jsonStr;
		string jsonNote;
		
		cmd = new SqlCommand ( query, db_connection );
		
		//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqldatareader_methods(v=vs.110).aspx		
		reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
		if (reader.HasRows)
		{
			//-------------------------------------------------------- Form json
			jsonStr = "[";
			int num = 0;
			while ( reader.Read() )
			{
				// int numColumns = reader.FieldCount;
				// Response.Write( "numColumns:"  + numColumns );
// //reader.GetString(1));

				// string ip = reader["ip"].ToString();
				// Response.Write( ip );
				// Response.Write("<br>");

				//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqldatareader.getvalues(v=vs.110).aspx
				// Object[] values = new Object[reader.FieldCount];
				// int fieldCount = reader.GetValues(values);
				// for (int n = 0; n < fieldCount; n++)
				// {
					// Response.Write( values[n] );
				// }//next
				// Response.Write("<br>");
				jsonNote = "{";
				if( num > 0 ){
					jsonNote = ",{";
				}
				for (int n = 0; n < reader.FieldCount; n++){
//Response.Write( "<b>name " +reader.GetName(n) +"</b>: " + reader.GetValue(n) );
//Response.Write("<br>");
					if( n > 0 ){
						jsonNote += ", ";
					}
					string key = reader.GetName(n).ToString();
					string value = reader.GetValue(n).ToString();
// if( n == 3 ){
// // //Response.Write("test, code:" + (char)65 );
// // //Response.Write("<br>");
	// for( int n1 = 0; n1 < value.Length; n1++){
		// Response.Write("Code:" + (int)value[n1] );
		// Response.Write("<br>");
	// }
// }
					//filter getNotes
					value = value.Replace("\r", "\\r");//replace CReturn (for correct JSON parsing)
					value = value.Replace("\n", "\\n");//replace end line LF(for correct JSON parsing)
					value = value.Replace("\t", "\\t");//replace TAB
					
					jsonNote += "\""+key+"\" : \""+value+"\"";
				}//next
				//Response.Write("<br>");
				jsonNote += "}";
				jsonStr += jsonNote;
				num++;
			}//end while
			
			jsonStr += "]";
			Response.Write(jsonStr);
		} else {
			//jsonStr = "[{\"error_code\" : \"emptyTable\", ";
			//jsonStr += "\"message\" : \"No rows found in table <b>"+tableName+"</b>. Use import from XML\"}]";
			//Response.Write( jsonStr );
			log.Add("{\"error_code\" : \"emptyTable\", \"message\" : \"No rows found in table <b>"+tableName+"</b>. Use import from XML\"}");	
		}
		reader.Close();
		
		// string[] testArr = new string[6];		
		// testArr[0] = "a";
		// testArr[1] = "b";
		// testArr[2] = "c";
		// Response.Write("testArr.length =  " + testArr.Length);
		// Response.Write("<br>");
		
		// for (int n = 0; n < testArr.Length; n++)
		// {
			// Response.Write( testArr[n] );
			// Response.Write("<br>");
		// }		
		
/*
      DataTable inv = new DataTable();
      string sql = "Select * From Inventory";
      using (SqlCommand cmd = new SqlCommand(sql, this.connect))
      {
            SqlDataReader dr = cmd.ExecuteReader();
            inv.Load(dr);
            dr.Close();
       }
   return inv;
*/
/*
            foreach (DataColumn column in schemaTable.Columns)
            {
                Console.WriteLine(String.Format("{0} = {1}",
                   column.ColumnName, row[column]));
            }
*/
	}//end getNotes()

	
	protected void exportTable( string filename ){
		
		// note.id = "1";
		// note.author = "anonymous";
		// note.title = "no subject";
		// note.text_message = "test1";
		// note.client_date = "09.08.2017 11:14:56";
		// note.server_date = "09.08.2017 10:14:56";
		// note.ip = "192.168.56.1";
		//notes.Add( note );
		
		//get notes
		runSelectQuery( queryGetNotes );
		
		string xml = "";
		xml += "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
		xml += "<table name='notes'>\n";
		foreach (Note note in notes)
		{
			xml += note.formXML();
		}
//Response.Write( "Count: " + notes.Count );
//Response.Write( "Capacity: " + notes.Capacity );
//Response.Write("<br>");

		xml += "</table>\n\n";
		//xml += "XML.Length: " + xml.Length;
		
//Response.Write( "XML.Length: " + xml.Length );
//Response.Write("<br>");
		//string s = "application/xhtml+xmlattachment; filename=notes.xmlbinary1178";
//Response.Write( "s.Length: " + s.Length );
//Response.Write("<br>");
		//int test = xml.Length + s.Length;
//Response.Write( "test: " + test );
//Response.Write("<br>");

		if( xml.Length > 0 ){
			Response.AddHeader("Content-Type", "application/xhtml+xml");
			Response.AddHeader("Content-Disposition","attachment; filename=" + filename);
			Response.AddHeader("Content-Transfer-Encoding","binary");
			//Response.AddHeader("Content-Length", xml.Length.ToString() );
			Response.Write( xml );
		}
	}//end exportTable()

	protected void uploadFile( string _uploadPath ){
		// foreach ( string x in Request.Files )
		// {
			// Response.Write ( "<b>Request.Files["+x + "]</b> = " + Request.Files[x].ToString() ); 
			// Response.Write ( "<br>"); 
		// }
		
		//string jsonStr;
		//jsonStr = "[";
			
		//https://msdn.microsoft.com/ru-ru/library/54a0at6s(v=vs.110).aspx
		if ( !Directory.Exists( _uploadPath ) ){
			//jsonStr += "{"; 
			//jsonStr += "\"error_code\": \"DirectoryNotFound\", "; 
			//jsonStr += "\"message\": \"Directory " + _uploadPath + " not exists!!!\" "; 
			//jsonStr += "}";
			log.Add("{\"error_code\" : \"DirectoryNotFound\", \"message\" : \"Directory " + _uploadPath + " not exists...\"}");	
			//return;
			try
			{
				Directory.CreateDirectory ( _uploadPath );
				//if( jsonStr.Length == 1){
					//jsonStr += "{";
				//} else {
					//jsonStr += ", {";
				//}
				//jsonStr += "\"message\": \"directory " + _uploadPath + "  created...\" "; 
				//jsonStr += "}";
				log.Add("{\"message\" : \"directory " + _uploadPath + "  was created...\"}");	
			}
			catch (Exception ex2)
			{
				Response.Write(ex2.Message);
			}
			
		}//end if
		
		foreach(string f in Request.Files.AllKeys) {
//Response.Write ( f ); 
//Response.Write ( "<br>"); 
			HttpPostedFile file = Request.Files[f];
			try{
				
				string fPath = _uploadPath +"\\" + exportFilename;
				file.SaveAs( fPath );
				
				//if( jsonStr.Length == 1){
					//jsonStr += "{";
				//} else {
					//jsonStr += ", {";
				//}
				FileInfo fileInfo = new FileInfo(fPath);				
				//int Kb = Math.Round(fileInfo.Length / 1024, 1);
				long Kb = fileInfo.Length / 1024;
				//jsonStr += "\"message\": \"file " + fPath + ", size="+fileInfo.Length+" bytes , "+ 
				//Kb +" Kbytes,  upload successful...\" "; 
				//jsonStr += "}";
				string _msg = "file " + fPath + ", size="+fileInfo.Length+" bytes , "+ Kb +" Kbytes,  upload successful...";
				log.Add("{\"message\" : \"" + _msg + "\"}");	
				
				importTable( fPath );
			}
			catch (Exception ex)
			//catch (IOException ex)
			{
				//Response.Write(ex);
				//Response.Write("<br>");
				
				Response.Write(ex.Message);
				Response.Write("<br>");
				
				//Response.Write(ex.Source);
				//Response.Write("<br>");
			}
			
		}//next

		//log.Add("{\"error_code\" : \"emptyTable\", \"message\" : \"No rows found in table <b>"+tableName+"</b>. Use import from XML\"}");	
		//jsonStr = jsonStr.Replace("\\", "&#92;");//replace slash
		//jsonStr += "]";
		//Response.Write(jsonStr);
			
		//string path = System.IO.Directory.GetCurrentDirectory();
		//Response.Write ( "path: " + path);
		//Response.Write ( "<br>"); 
		
		//https://msdn.microsoft.com/ru-ru/library/system.web.httprequest.files(v=vs.110).aspx
		//HttpFileCollection Files;
		//Files = Request.Files;
		//arr1 = Files.Keys; 
		// for (int n = 0; n < arr1.Length; n++) {
			// Response.Write ( arr1[n]); 
			// Response.Write ( "<br>"); 
		// }
// for (loop1 = 0; loop1 < arr1.Length; loop1++) 
// {
    // Response.Write("File: " + Server.HtmlEncode(arr1[loop1]) + "<br />");
    // Response.Write("  size = " + Files[loop1].ContentLength + "<br />");
    // Response.Write("  content type = " + Files[loop1].ContentType + "<br />");
// }		
	}//end uploadFile()
	
	protected void importTable( string xmlFile ){
//Response.Write ( "xmlFile: " + xmlFile);
//Response.Write ( "<br>"); 
//return;

		//https://msdn.microsoft.com/ru-ru/library/hcebdtae(v=vs.110).aspx		
		XmlDocument doc = new XmlDocument();
		
		//string jsonStr;
		if ( !File.Exists( xmlFile ) ){
//Response.Write( xmlFile + " not exists!!!");
			//jsonStr = "[{";
			//jsonStr += "\"error_code\": \"FileNotExists\", "; 
			//jsonStr += "\"message\": \"" + xmlFile + " not exists...\" "; 
			//jsonStr += "}]";
			
			//jsonStr = jsonStr.Replace("\\", "&#92;");//replace slash
			//Response.Write(jsonStr);
			log.Add("{\"error_code\" : \"FileNotExists\", \"message\" : \"file " + xmlFile + " not exists...\"}");
			
			return;
		}
		
		try{
			doc.Load( xmlFile );
		} 
		catch(Exception ex)
		//catch(XmlException e)
		//catch(IOException e) 
		//catch (FileNotFoundException ex)
		{
			Response.Write(ex);
			//Response.Write("FileNotFoundException");
			//Response.Write("<br>");
			//Response.Write("Exception object Line, pos: (" + e.LineNumber + "," + e.LinePosition  + ")");
			//Response.Write("Exception source URI: (" + e.SourceURI + ")");
			//Response.Write("XmlReader Line, pos: (" + tr.LineNumber + "," + tr.LinePosition  + ")");
		}
		
		try{
			XmlNodeList nodeList;
			XmlNode root = doc.DocumentElement;

			//nodeList=root.SelectNodes("descendant::book[author/last-name='Austen']");
			nodeList=root.SelectNodes("descendant::note");
			string queryValues = "";
			string items = "";
			int num = 0;
			foreach (XmlNode note in nodeList)
			{
//Response.Write( note.Name );
//Response.Write ( "<br>"); 

				items = queryInsertValues;
				if( num > 0 ){
					items = " UNION ALL " + items;
				}
				if (note.Attributes != null){
					foreach (XmlAttribute attr in note.Attributes)
					{
						string _name = attr.Name;
						string _value = attr.Value;
//Response.Write( _name + ": " + _value );
//Response.Write ( "<br>");
						items = items.Replace("{{" + _name + "}}", _value);
					}//next
				}
				
				if (note.HasChildNodes){
					for (int n = 0; n < note.ChildNodes.Count; n++){
						string nodeName = note.ChildNodes[n].Name;
						string nodeValue = note.ChildNodes[n].InnerText;
//filter import
						//nodeValue = nodeValue.Replace("\t", "\\t");//escape Tab
						//nodeValue = nodeValue.Replace("\r", "\\r");//escape CR
						//nodeValue = nodeValue.Replace("\n", "\\n");//escape break line LF
						nodeValue = nodeValue.Replace("\"", "&quot;");
						nodeValue = nodeValue.Replace("<", "&lt;");
						nodeValue = nodeValue.Replace(">", "&gt;");
						//nodeValue = nodeValue.Replace("[", "&#91;");
						//nodeValue = nodeValue.Replace("]", "&#93;");
						nodeValue = nodeValue.Replace("'", "&#39;");//replace apostrophe
//Response.Write( nodeName + ": " + nodeValue );
//Response.Write ( "<br>"); 
						items = items.Replace("{{" + nodeName + "}}", nodeValue);
					}//next
				}
//Response.Write( items );
//Response.Write ( "<br>"); 
				queryValues += items;
				num++;
			}//next

			string query = queryInsertAll;
			query = query.Replace("{{values}}", queryValues);
//Response.Write( query );
//Response.Write ( "<br>"); 
			runQuery( query );

			//jsonStr = "[{";
			//jsonStr += "\"message\": \"Notes from " + xmlFile + " imported to database ...\" "; 
			//jsonStr += "}]";
			//jsonStr = jsonStr.Replace("\\", "&#92;");//replace slash
			//Response.Write(jsonStr);
			log.Add("{\"message\" : \"Notes from " + xmlFile + " imported to database ...\"}");
			
		} catch(Exception ex) {
			Response.Write("<pre>");
			Response.Write(ex);
			Response.Write("</pre>");
		}//end try
	
	}//end importTable()
	
	protected void runQuery( string query )
	{
//Response.Write( query );
		SqlCommand cmd = new SqlCommand( query, db_connection);
		try
		{
			cmd.ExecuteNonQuery();
		}
		//catch (SqlException ex)
		catch (System.Exception ex)		
		{
			Response.Write("SQL: " + query);
			Response.Write("<br>");
			Response.Write(ex.Message);
			Response.Write("<pre>");
			Response.Write( ex.ToString() );
			Response.Write("</pre>");
			
			foreach ( string x in Request.Params )//GET
			{
				Response.Write ( "<b>Request.Params["+x + "]</b> = " + Request.Params[x]); 
				Response.Write ( "<br>"); 
			}
			foreach ( string x in Request.Form )//POST
			{
				Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
				Response.Write ( "<br>"); 
			}
			
		}		
	}//end runQuery()

	protected void runSelectQuery( string query){
		SqlDataReader reader;
		SqlCommand cmd;
//Response.Write( query );
//Response.Write("<br>");

		cmd = new SqlCommand ( query, db_connection );
		reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
		
		if (reader.HasRows){
			//int num = 0;
			while ( reader.Read() ){
				
				for (int n = 0; n < reader.FieldCount; n++){
					//Response.Write( "<b>" +reader.GetName(n) +"</b>: " + reader.GetValue(n) );
					//Response.Write("<br>");
					string _name = reader.GetName(n).ToString();
					string _value = reader.GetValue(n).ToString();
					note.saveValue( _name, _value );
				}//next
				
				notes.Add( note );
				//num++;
			}//end while
		} else {
			Response.Write("No rows found in table " + tableName);
		}
		reader.Close();
		
	}//end runSelectQuery()
	
}//end class	