using System;
//using System.Xml; 
//using System.IO;
using System.Data;
//using System.Data.Sql;
using System.Data.SqlClient;
using System.Collections.Generic;

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
	
	string exportFilename = "notes.xml";
	string uploadPath = "upload";
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

	string queryGetNotes = "SELECT id, author, title, text_message, client_date, server_date, ip FROM \""+
tableName+"\" ORDER BY \"client_date\" DESC";

	string queryInsertMessage = "INSERT INTO "+tableName+" (author, title, text_message, client_date, server_date, ip) "+
"VALUES ("+
" '{{authorName}}', "+
" '{{title}}', " +
" '{{textMessage}}', " +
" CONVERT(DATETIME,'{{client_date}}'), " +
" CONVERT(DATETIME,'{{server_date}}'), " +
" '{{ip}}' "+
");";

	string queryDeleteNote = "DELETE FROM "+tableName+" WHERE id={{id}}";
	string queryClearNotes = "TRUNCATE TABLE " + tableName;
	string queryRemoveTable = "DROP TABLE " + tableName;


	string _connectionString = "";
	SqlConnection db_connection;


	// class recordObj{
		// public string key;
		// public string value;
	// }

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
			s += "\t\t<text>\n";
			s += text_message+"\n";
			s += "\t\t</text>\n";
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

	
	protected void Page_Init(object sender, EventArgs e)
	{
//Response.Write("Page_Init.<br>");
//Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
	}
	
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
		try
		{
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
		//catch (Exception ex)
		//catch (System.Exception ex)		
		catch (SqlException ex)
		{
			Response.Write("connect error....");
			Response.Write("connection string:" + _connectionString);
			Response.Write("<pre>");
			//Response.Write(ex);
			Response.Write(ex.Message);			
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
		
	}//end Page_Load()
	
	
	protected void _testRequestParams()
	{
	
		if( Request.QueryString["action"] == null )
		{
			Response.Write("error, undefined var 'action' ");
			return;
		}
		string action = Request.QueryString["action"];
		if( action.Length == 0 )
		{
			Response.Write("error, empty var 'action'");
			return;
		}
//Response.Write ( action ); 
//Response.Write ( "<br>"); 
		
		switch (action)
		{
			case "save_note":
				string authorName = "";
				string title = "";
				string textMessage = "";
				string clientDate = "";
				string serverDate = "";
				string ip = "";
				
				if ( Request.HttpMethod == "POST" ) {
					textMessage = Request.Form["text_message"];
					if( textMessage.Length == 0 ){
						Response.Write("error, empty var 'text_message'");
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
				
				//textMessage = textMessage.Replace("<", "lt;");
				//textMessage = textMessage.Replace(">", "gt;");
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
					Response.Write("error, undefined var 'id' ");
					return;
				}
				string id = Request.QueryString["id"];
				if( id.Length == 0 )
				{
					Response.Write("error, empty var 'id'");
					return;
				}
				
				queryDeleteNote = queryDeleteNote.Replace("{{id}}", id );
Response.Write(queryDeleteNote);
				runQuery( queryDeleteNote );
			break;
				
			case "clear_notes":
Response.Write(queryClearNotes);
				runQuery( queryClearNotes );
			break;
				
			case "remove_table":
Response.Write(queryRemoveTable);
				runQuery( queryRemoveTable );
			break;
				
			case "export_notes":
				exportTable( exportFilename );			
			break;
				
			case "upload":
				break;

			case "import_notes":
				break;
				
		  default:
			break;
		}		
		
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
					//Response.Write( reader.GetName(n) );
					//Response.Write( reader.GetValue(n) );
					if( n > 0 ){
						jsonNote += ", ";
					}
					string key = reader.GetName(n).ToString();
					string value = reader.GetValue(n).ToString();
					//value = value.Replace("\n'", "!!!");//replace end line
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
			Response.Write("No rows found in table " + tableName);
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
		foreach (Note _note in notes)
		{
			xml += _note.formXML();
		}
//Response.Write( "Count: " + notes.Count );
//Response.Write( "Capacity: " + notes.Capacity );
//Response.Write("<br>");

		xml += "</table>\n\n";
		
//Response.Write( "XML.Length: " + xml.Length );
//Response.Write("<br>");
		if( xml.Length > 0 ){
			Response.AddHeader("Content-Type", "application/xhtml+xml");
			Response.AddHeader("Content-Disposition","attachment; filename=" + filename);
			Response.AddHeader("Content-Transfer-Encoding","binary");
			Response.AddHeader("Content-Length", xml.Length.ToString() );
			Response.Write( xml );
		}
	}//end exportTable()


	
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