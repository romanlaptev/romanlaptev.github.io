using System;
//using System.Xml; 
//using System.IO;
using System.Data;
//using System.Data.Sql;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{
		Response.Write("<h1>test connect to MSSQL server</h1>");
		
		string dbName = "site";
		string _connectionString = "";
		_connectionString = "Data Source=.\\SQLEXPRESS; Initial Catalog="+	dbName+"; Integrated Security=False;User Id=root;Password=master;";
		SqlConnection db_connection = new SqlConnection( _connectionString );


		//int result = 0;
		try
		{
			db_connection.Open();
			
			//SqlCommand command = new SqlCommand(queryString, connection);
			//command.Connection.Open();
			//command.ExecuteNonQuery();		
			
			SqlCommand myCommand;
			SqlDataReader myDataReader;
			
			myCommand = new SqlCommand ("SELECT * FROM \"user\"", db_connection);
			//result = myCommand.ExecuteNonQuery();
			
			myDataReader = myCommand.ExecuteReader(CommandBehavior.CloseConnection);
			while (myDataReader.Read())
			{
				Response.Write(myDataReader["user_login"].ToString());
				Response.Write("<br>");
			}
			myDataReader.Close();
			
		}
		catch (Exception ex)
		{
			Response.Write("<h3>connect error.... </h3>");
			Response.Write("connection string:" + _connectionString);
		}
		finally
		{
			db_connection.Close();
		}	

			
	}//end Page_Load()
		
}//end class