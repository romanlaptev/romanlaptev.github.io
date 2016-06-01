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
			foreach ( string x in Request.Form )
			{
				Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
				Response.Write ( "<br>"); 
			}
 
			Response.Write ( "<b>Request.HttpMethod</b> = " + Request.HttpMethod); 
			Response.Write ( "<br>"); 
			Response.Write ( "<b>Request.Params[REQUEST_METHOD]</b> = " + Request.Params["REQUEST_METHOD"]); 
			Response.Write ( "<br>"); 
			Response.Write ( "<b>Request.Params[QUERY_STRING]</b> = " + Request.Params["QUERY_STRING"]); 
			Response.Write ( "<br>"); 
//=========================================
/*			
			if ( Request.HttpMethod == "GET" )
			{
				if( Request.QueryString["file"] == null )
				{
					Response.Write("error, empty file!");
					return;
				}
				string file = Request.QueryString["file"];
				
				if( Request.QueryString["fs_path"] == null )
				{
					Response.Write("error, empty fs_path!");
					return;
				}
				string fs_path = Request.QueryString["fs_path"];
			}
*/

			string fs_path="";
			string[] file = null;
			if ( Request.HttpMethod == "POST" )
			{
				file = Request.Form.GetValues("file[]");
				fs_path = Request.Form["fs_path"];
			}
			
//============================================			
			string old_filename = fs_path + "\\" +file[0];
			string new_filename = fs_path + "\\" + file[1];
			try
			{
				FileAttributes attr = File.GetAttributes( @old_filename );
				if((attr & FileAttributes.Directory) == FileAttributes.Directory)
				{
					Response.Write ( "move dir " + old_filename + " to " +new_filename+"<br>"); 
					try
					{
						Directory.Move(old_filename, new_filename);  
					}
					catch (Exception ex2)
					{
						Response.Write ( ex2.Message ); 
					}	
				}			
				else
				{
					Response.Write ( "move file " + old_filename + " to " +new_filename+"<br>"); 
					try
					{
						File.Move( old_filename, new_filename );
					}
					catch (Exception ex2)
					{
						Response.Write ( ex2.Message ); 
					}	
				}			

			}
			catch (Exception ex)
			{
				Response.Write(ex.Message);
			}			

		}//------------------------------------- end func
	
	}//----------------------- end class
}//----------------------- end namespace