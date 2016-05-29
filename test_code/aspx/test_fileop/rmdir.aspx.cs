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
				try
				{
					Response.Write ( "<h1>RmDir</h1>"); 
					Response.Write ( "Dir name: " + dirname +"<br>"); 
					
					Directory.Delete ( dirname, true );
				}
				catch (Exception ex)
				{
					Response.Write(ex.Message);
				}			
			
			}
			else
			{
				Response.Write ( "error, dirname is empty..."); 
			}
		
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace