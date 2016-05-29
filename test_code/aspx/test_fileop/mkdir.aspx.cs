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
			string dirname = Request.QueryString["dirname"];
			if ( dirname != null)
			{
				Response.Write ( "create directory: " + dirname); 
				Response.Write ( "<br>"); 
				//string directoryName = @"c:\temp";
				//string newFolder = directoryName +"\\folder2";
				
				Directory.CreateDirectory ( dirname );
				/*
				string[] dirlist = Directory.GetDirectories( dirname );
				foreach ( string dir in dirlist )
				{
					Response.Write ( dir +"<br>"); 
				}
				*/
			}
			else
			{
				Response.Write ( "error, dirname is empty..."); 
			}
		
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace