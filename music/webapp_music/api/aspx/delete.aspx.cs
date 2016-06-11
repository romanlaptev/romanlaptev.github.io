using System;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
		/*
			foreach ( string x in Request.Form )
			{
				Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
				Response.Write ( "<br>"); 
			}
		*/	
			string fs_path="";
			string[] files = null;
			if ( Request.HttpMethod == "POST" )
			{
				fs_path = Request.Form["fs_path"];
				files = Request.Form.GetValues("file[]");
			}
			else
			{
				Response.Write("<p class='error'><b>error</b>, need <b>POST query</b> !</p>");
				return;
			}
			
			if( fs_path.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>fs_path</b> value!</p>");
				return;
			}
			if( files.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>files</b> value!</p>");
				return;
			}
		
			foreach ( string file in files)
			{
				string filename = fs_path + "\\" +file;
				try
				{
					FileAttributes attr = File.GetAttributes( @filename );
					if((attr & FileAttributes.Directory) == FileAttributes.Directory)
					{
						try
						{
							Response.Write ( "<b>delete directory:</b> " + filename + "<br>"); 
							Directory.Delete ( filename, true );
						}
						catch (Exception ex)
						{
							Response.Write("<p class='error'>"+ex.Message+"</p>");
						}			
					}			
					else
					{
						Response.Write ( "<b>delete file:</b> " + filename + "<br>"); 
						File.Delete( filename );		
					}			
					
				}
				catch (Exception ex)
				{
					Response.Write("<p class='error'>"+ex.Message+"</p>");
				}			
			}//--------------------- end foreach
			
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace