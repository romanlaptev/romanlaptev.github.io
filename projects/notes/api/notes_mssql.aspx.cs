using System;
//using System.Xml; 
using System.IO;
using System.Data;
//using System.Data.Sql;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
	static string dbHost = ".\\SQLEXPRESS2005";
	static string dbName = "db1";//"site";
	static string dbUser = "sa";
	static string dbPassword = "assa";
	
	static string exportFilename = "notes.xml";
	static string uploadPath = "upload";
	static string tableName = "notes";//"user";
	
	static string queryCreateDB = "IF NOT EXISTS (SELECT * FROM master.dbo.sysdatabases WHERE name = '"+dbName+"') " +
"BEGIN\r\n"+
"CREATE DATABASE "+dbName+"\r\n"+
"END";	
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
	static string queryCreateTable = "USE "+dbName+"; IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='"+tableName+"') " +	
"BEGIN\r\n"+
"CREATE TABLE \""+tableName+"\" (" +
" id int IDENTITY(1,1) PRIMARY KEY NOT NULL," +
" author  varchar(20) NOT NULL," +
" title   varchar(255) NOT NULL," +
" text_message  text NOT NULL," +
" client_date datetime NOT NULL," +
" server_date datetime NOT NULL," +
" ip varchar(20) "+
");\r\n"+
"END";

	static string queryGetNotes = "SELECT id, author, title, text_message, client_date, server_date, ip FROM \""+
tableName+"\" ORDER BY \"client_date\" DESC";

	static string queryInsertMessage = "INSERT INTO "+tableName+" (author, title, text_message, client_date, server_date, ip) "+
"VALUES ("+
" '{{authorName}}', "+
" '{{title}}', " +
" '{{textMessage}}', " +
" CONVERT(DATETIME,'{{client_date}}'), " +
" CONVERT(DATETIME,'{{server_date}}'), " +
" '{{ip}}' "+
");";


	static string _connectionString = "";
	static SqlConnection db_connection;
	
	protected void Page_Init(object sender, EventArgs e)
	{
//Response.Write("Page_Init.<br>");
//Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
	}
	
	protected void Page_PreRender(object sender, EventArgs e)
	{
//Response.Write("Page_PreRender.<br>");
	}
	
	protected void Page_Unload(object sender, EventArgs e)
	{
	}
		
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
				
		  default:
				//Console.WriteLine("Default case");
				break;
		}		
		
	}//end _testRequestParams()

	
	protected void getNotes( string query )
	{
		SqlDataReader reader;
		SqlCommand cmd;
		
		cmd = new SqlCommand ( query, db_connection );
		
		//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqldatareader_methods(v=vs.110).aspx		
		reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
		if (reader.HasRows)
		{
			while ( reader.Read() )
			{
				int numColumns = reader.FieldCount;
				Response.Write( "numColumns:"  + numColumns );
//reader.GetString(1));

				string ip = reader["ip"].ToString();
				Response.Write( ip );
				Response.Write("<br>");

				//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqldatareader.getvalues(v=vs.110).aspx
				Object[] values = new Object[reader.FieldCount];
				int fieldCount = reader.GetValues(values);
				for (int n = 0; n < fieldCount; n++)
				{
					Response.Write( values[n] );
				}//next
				Response.Write("<br>");

				for (int n = 0; n < reader.FieldCount; n++)
				{
					Response.Write( reader.GetName(n) );
					Response.Write( reader.GetValue(n) );
				}//next
				Response.Write("<br>");
				
			}
		}
		else
		{
			Response.Write("No rows found in table " + tableName);
		}
		reader.Close();
		
		string[] testArr = new string[6];		
		testArr[0] = "a";
		testArr[1] = "b";
		testArr[2] = "c";
		Response.Write("testArr.length =  " + testArr.Length);
		Response.Write("<br>");
		
		for (int n = 0; n < testArr.Length; n++)
		{
			Response.Write( testArr[n] );
			Response.Write("<br>");
		}		
		
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
		}		
	}//end runQuery()
	
}//end class	