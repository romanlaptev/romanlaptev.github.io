using System;
//using System.Xml; 
//using System.IO;
using System.Data;
//using System.Data.Sql;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
//using System.Text;

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
	
	string _connectionString = "";
	SqlConnection db_connection;

	List<string> log = new List<string>();
	
	string queryGetVersion = "Select @@VERSION as SQLServerVersion;";
	string queryDbList = "EXEC sp_helpdb;";
	
	protected void Page_Init(object sender, EventArgs e){
//Response.Write("Page_Init.<br>");
//Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
	}
	
	protected void Page_PreRender(object sender, EventArgs e){
//Response.Write("Page_PreRender.<br>");
	}
	
	// protected void Page_Unload(object sender, EventArgs e)
	// {
	// }
	
	protected void Page_LoadComplete(object sender, EventArgs e){
//Response.Write("Page_LoadComplete.<br>");
	}//end Page_LoadComplete()
	
	protected void Page_Load(object sender, EventArgs e){
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
		try{
			db_connection.Open();
			//Response.Write("DB connection state: " + db_connection.State);
			//Response.Write("<br>");
			//Response.Write("ServerVersion: " + db_connection.ServerVersion);
			//Response.Write("<br>");
			
			//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqlconnection.serverversion(v=vs.110).aspx
			string msg = "connect to MSSQL success, state:  "+ db_connection.State;
			msg += ", ServerVersion:  "+ db_connection.ServerVersion;
			log.Add("{\"message\" : \""+msg+"\"}");
			
			List<string[,]> _records = runSelectQuery( queryGetVersion );
			//List<string[,]> _records = runSelectQuery( queryDbList );
			
			//convert result to json str
			msg="";
			for (int n = 0; n < _records.Count; n++)
			{
				int fieldCount = _records[n].Length / 2;
				for (int n1 = 0; n1 < fieldCount; n1++)
				{
					msg += _records[n][n1,0]+ ": ";
					msg += _records[n][n1,1];
				}//next
			}//next
			log.Add("{\"message\" : \""+msg+"\"}");
			
/*
			//SELECT @@VERSION
https://habrahabr.ru/post/241079/
-- Имена сервера и экземпляра 
Select @@SERVERNAME as [Server\Instance]; 

-- версия SQL Server 
Select @@VERSION as SQLServerVersion; 

-- экземпляр SQL Server 
Select @@ServiceName AS ServiceInstance;

 -- Текущая БД (БД, в контексте которой выполняется запрос)
Select DB_NAME() AS CurrentDB_Name;

-- EXEC sp_helpdb;
-- EXEC sp_Databases;

SELECT  @@SERVERNAME AS Server ,
        name AS DBName ,
        recovery_model_Desc AS RecoveryModel ,
        Compatibility_level AS CompatiblityLevel ,
        create_date ,
        state_desc
FROM    sys.databases
ORDER BY Name; 


SELECT  @@SERVERNAME AS Server ,
        d.name AS DBName ,
        create_date ,
        compatibility_level ,
        m.physical_name AS FileName
FROM    sys.databases d
        JOIN sys.master_files m ON d.database_id = m.database_id
WHERE   m.[type] = 0 -- data files only
ORDER BY d.name; 
*/			
		}
		//catch (Exception ex){
		catch (SqlException ex){
//https://msdn.microsoft.com/ru-ru/library/system.data.sqlclient.sqlexception(v=vs.110).aspx
//https://msdn.microsoft.com/en-us/library/cc645611.aspx
			log.Add("{\"error_code\" : \"notConnectSQLServer\"");
			log.Add("\"errorCode\" : \""+ex.ErrorCode+"\"");
			log.Add("\"message\" : \""+ex.Message+"\"");
			log.Add("\"error_number\" : \""+ex.Number+"\"");
			log.Add("\"sql_server\" : \""+dbHost+"\"");
			log.Add("\"user_id\" : \""+dbUser+"\"}");
			
			//Response.Write("Database connect error....");
			//Response.Write("connection string:" + _connectionString);
			//Response.Write("<pre>");
			//Response.Write(ex);
			//Response.Write(ex.Message);			
			//Response.Write("<br>");
			
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

			//Response.Write("Error number: " + ex.Number);
			//Response.Write("<br>");

			//Response.Write("State: " + ex.State);
			//Response.Write("<br>");
			
			//Response.Write("Server: " + ex.Server);
			//Response.Write("<br>");

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
			//Response.Write("</pre>");
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
			logStr = logStr.Replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
			logStr = logStr.Replace("\r", "");
			logStr = logStr.Replace("\n", "<br>");
			Response.Write( logStr );
		}
		
	}//end Page_Load()
	
	protected List<string[,]> runSelectQuery( string query){
		SqlDataReader reader;
		SqlCommand cmd;
//Response.Write( query );
//Response.Write("<br>");

		List<string[,]> records = new List<string[,]>();

		cmd = new SqlCommand ( query, db_connection );
		reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

		if (reader.HasRows){
			//int num = 0;
			//ArrayList records = new ArrayList();			
//records.Add( 852 );
			
			while ( reader.Read() ){
				
				string[,] arrayRecord = new string[ reader.FieldCount, 2];
				for (int n = 0; n < reader.FieldCount; n++){
//Response.Write( "<b>" +reader.GetName(n) +"</b>: " + reader.GetValue(n) );
//Response.Write("<br>");
					//string _name = reader.GetName(n).ToString();
					//string _value = reader.GetValue(n).ToString();
					//note.saveValue( _name, _value );
					
					string _name = reader.GetName(n).ToString();
					string _value = reader.GetValue(n).ToString();
					arrayRecord[n, 0] = _name;
					arrayRecord[n, 1] = _value;
				}//next
				
//Response.Write("Length:" + arrayRecord.Length);
//Response.Write("key:" + arrayRecord[num, 0]);
//Response.Write("<br>");
				records.Add( arrayRecord );
				//num++;
			}//end while
/*
Response.Write("Length:" + records.Count);
Response.Write("<br>");
			
Response.Write("Name: " + records[0][0,0] );
Response.Write(", value: " + records[0][0,1] );
Response.Write("<br>");

Response.Write("Name: " + records[0][6,0] );
Response.Write(", value: " + records[0][6,1] );
Response.Write("<br>");
//Dump
for (int n = 0; n < records.Count; n++)
{
	int fieldCount = records[n].Length / 2;
	for (int n1 = 0; n1 < fieldCount; n1++)
	{
		Response.Write("Name: " + records[n][n1,0] );
		Response.Write(", value: " + records[n][n1,1] );
		Response.Write("<br>");
	}//next
}//next
*/			
		} else {
			Response.Write("No rows found...");
		}
		reader.Close();
		return records;

	}//end runSelectQuery()
	
}//end class