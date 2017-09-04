using System;
//using System.Xml; 
//using System.IO;
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
	static string queryCreateTable = "IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='notes') " +	
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

	static string _connectionString = "";
	static SqlConnection db_connection;
	
	protected void Page_Load(object sender, EventArgs e)
	{
		// foreach ( string x in Request.ServerVariables )
		// {
			// Response.Write ( "<b>"+x + "</b> = " + Request.ServerVariables[x]); 
			// Response.Write ( "<br>"); 
		// }
		
		_connectionString = "Data Source="+dbHost+"; ";
		_connectionString += "Initial Catalog="+dbName+"; ";
		_connectionString += "Integrated Security=False; ";
		_connectionString += "User Id="+dbUser+";";
		_connectionString += "Password="+dbPassword+";";

		db_connection = new SqlConnection( _connectionString );
		//int result = 0;
		try
		{
			db_connection.Open();
			//_testQuery();
			
			//createTable
			runQuery( queryCreateTable );
			_testRequestParams();
		}
		//catch (Exception ex)
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
			db_connection.Close();
		}	
		
	}//end Page_Load()
	
	
	protected void _testRequestParams()
	{
		// foreach ( string x in Request.Params )//GET
		// {
			// Response.Write ( "<b>"+x + "</b> = " + Request.Params[x]); 
			// Response.Write ( "<br>"); 
		// }
		// foreach ( string x in Request.Form )//POST
		// {
			// Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
			// Response.Write ( "<br>"); 
		// }
	
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
		
		switch (action)
		{
			case "save_notes":
				//Console.WriteLine("Case 1");
				break;
				
			case "get_notes":
Response.Write ( action ); 
Response.Write ( "<br>"); 
					//_testQuery();
					//runQuery( queryGetNotes );
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

	
	protected void _testQuery()
	{
		SqlCommand myCommand;
		SqlDataReader myDataReader;
		
		myCommand = new SqlCommand ( queryGetNotes, db_connection );
		
		myDataReader = myCommand.ExecuteReader(CommandBehavior.CloseConnection);
		while (myDataReader.Read())
		{
			Response.Write(myDataReader["user_login"].ToString());
			Response.Write("<br>");
		}
		myDataReader.Close();
	}//end _testQuery()

	protected void runQuery( string query )
	{
//Response.Write( query );
		SqlCommand cmd = new SqlCommand( query, db_connection);
		try
		{
			cmd.ExecuteNonQuery();
		}
		catch (SqlException ex)
		{
			//Response.Write("<pre>");
			Response.Write(ex.Message);
			//Response.Write("</pre>");
		}		
	}//end runQuery()
	
}//end class	