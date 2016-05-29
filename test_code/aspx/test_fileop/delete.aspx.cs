using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Text.RegularExpressions;
using System.Data;
using System.Data.Common;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
			if( Request.QueryString["file"] == null )
			{
				Response.Write("error, empty file!");
				return;
			}
			string file = Request.QueryString["file"];
			
			try
			{
				FileAttributes attr = File.GetAttributes( @file );
				if((attr & FileAttributes.Directory) == FileAttributes.Directory)
				{
					try
					{
						Response.Write ( "delete directory: " + file + "<br>"); 
						Directory.Delete ( file, true );
					}
					catch (Exception ex)
					{
						Response.Write(ex.Message);
					}			
				}			
				else
				{
					Response.Write ( "delete file: " + file + "<br>"); 
					File.Delete( file );		
				}			
				
			}
			catch (Exception ex)
			{
				Response.Write(ex.Message);
			}			
 
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace