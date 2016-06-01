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
			lblInfo.Text = "Dir name: " + dirname;	  
			
			//string directoryName = @"c:\temp";
			string directoryName = @dirname;
			string[] dirlist = Directory.GetDirectories( directoryName);
			foreach ( string dir in dirlist )
			{
				Response.Write ( dir +"<br>"); 
			}
			
			string[] filelist = Directory.GetFiles( directoryName);
			foreach ( string file in filelist )
			{
				Response.Write ( file +"<br>"); 
			}
			//lblInfo.Text += "Done!"; 
			
		
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace