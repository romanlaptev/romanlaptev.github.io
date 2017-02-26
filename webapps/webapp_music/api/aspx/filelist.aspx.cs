using System;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
			if( Request.QueryString["dir"] == null )
			{
				Response.Write("<p class='error'>error, undefined dir var!</p>");
				return;
			}
			string dir = Request.QueryString["dir"];
			if( dir.Length == 0 )
			{
				Response.Write("<p class='error'>error, empty dir value!</p>");
				return;
			}
			
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
				Response.Write ( "<p class='error'>"+ex.Message+"</p>" ); 
			}	
			
			
			if ( xml_body.Length > 0)
			{
				xml += xml_body;
				xml += "</filelist>";
				Response.Write ( xml ); 
			}
			else
			{
				Response.Write("<p class='error'>error, empty filelist</p>");
			}
			
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace