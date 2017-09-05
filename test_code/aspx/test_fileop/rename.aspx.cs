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
			string[] file = null;
			if ( Request.HttpMethod == "POST" )
			{
				file = Request.Form.GetValues("file[]");
				fs_path = Request.Form["fs_path"];
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
			if( file.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>file</b> value!</p>");
				return;
			}
			
//============================================			
			string old_filename = fs_path + "\\" +file[0];
			string new_filename = fs_path + "\\" + file[1];
			try
			{
				FileAttributes attr = File.GetAttributes( @old_filename );
				if((attr & FileAttributes.Directory) == FileAttributes.Directory)
				{
					try
					{
						Response.Write ( "<p class='ok'><b>move dir</b> " + old_filename + " to " +new_filename+"</p>"); 
						Directory.Move(old_filename, new_filename);  
					}
					catch (Exception ex2)
					{
						Response.Write("<p class='error'>"+ex2.Message+"</p>");
					}	
				}			
				else
				{
					try
					{
						Response.Write ( "<p class='ok'><b>move file</b> " + old_filename + " to " +new_filename+"</p>"); 
						File.Move( old_filename, new_filename );
					}
					catch (Exception ex2)
					{
						Response.Write("<p class='error'>"+ex2.Message+"</p>");
					}	
				}			

			}
			catch (Exception ex)
			{
				Response.Write("<p class='error'>"+ex.Message+"</p>");
			}			

		}//------------------------------------- end func
	
	}//----------------------- end class
}//----------------------- end namespace