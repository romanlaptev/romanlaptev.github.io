using System;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
			if( Request.QueryString["date"] == null )
			{
				//Response.Write("<p class='alert-error'>error, undefined date var!</p>");
				
				string current_path = System.IO.Path.GetDirectoryName( Request.ServerVariables["PATH_TRANSLATED"] );
				//Response.Write(current_path);
				string db_path = System.IO.Path.GetDirectoryName( current_path ) + "/db/";
				//Response.Write(db_path);
				
//string[] lines_from_file = System.IO.File.ReadAllLines(current_path + "/Conf/filename");				
				string fileContents = System.IO.File.ReadAllText( db_path + "art.xml" );				
				string answer = "{\"DATE\": \"2017-08-09\"}\r\n#mark" + fileContents;
				Response.Write( answer );
				return;
			}
			
			string _date = Request.QueryString["date"];
			if( _date.Length == 0 )
			{
				Response.Write("<p class='alert-error'>error, empty date value!</p>");
				return;
				
				//dir = Request.ServerVariables["APPL_PHYSICAL_PATH"];
				
				//string filePath = Request.ServerVariables["PATH_TRANSLATED"];
				//dir = Path.GetDirectoryName(filePath);
				//D:\clouds\Yandex.Disk\sync\sites\romanlaptev.github.io\webapps\webapp_music\api\aspx
			}
/*			
			string directoryName = @dir;
			
			string xml = "";
			string xml_body = "";
			xml += "<?xml version='1.0' encoding='UTF-8' ?>";
			xml += "<filelist>";
			
			try
			{
				string[] dirlist = Directory.GetDirectories( directoryName);
				foreach ( string directory in dirlist )
				{
					xml_body += "<dir>" +directory.Replace("&","&amp;") +"</dir>"; 
				}
				string[] filelist = Directory.GetFiles( directoryName);
				foreach ( string file in filelist )
				{
					xml_body += "<file>" + file.Replace("&","&amp;") +"</file>"; 
				}
			}
			catch (Exception ex)
			{
				Response.Write ( "<p class='alert-error'>"+ex.Message+"</p>" ); 
			}	
			
			
			if ( xml_body.Length > 0)
			{
				xml += xml_body;
				xml += "</filelist>";
				Response.Write ( xml ); 
			}
			else
			{
				Response.Write("<p class='alert-error'>error, empty filelist</p>");
			}
*/			
		}//end Page_Load
		
	}//end class
}//end namespace