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
/*		
			string filepath = Server.MapPath("logs\\visits.txt");
			lblGreeting.Text="Page_Load"; 
			StreamWriter sw2;
			FileInfo f2 = new FileInfo(filepath);
			sw2 = f2.AppendText();

			//sw2.WriteLine("test_append");
			sw2.WriteLine(DateTime.Now.ToString() + " " + Request.Url);
			
			sw2.Close();
*/			
			Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
			
		}//------------------------------------- end func

		protected void cmdEcho_Click(object Source, EventArgs e)
		{
//string filepath = "c:\\temp\\";
			//string filepath = Server.MapPath( txtFileName.Text + ".txt");
			string filepath = Server.MapPath("visits.txt");
//e:\DZHosts\LocalUser\roman-laptev\www.itworks.somee.com\visits.txt
			//lblGreeting.Text="Create file " + filepath; 
			lblGreeting.Text="Create file "; 

			//FileInfo f1 = new FileInfo(filepath + txtFileName.Text + ".txt");
			//f1.Create();			
			
			//StreamWriter sw1 = new StreamWriter(filepath);
			//sw1.WriteLine("test_write");
			//sw1.Close();

			StreamWriter sw2;
			FileInfo f2 = new FileInfo(filepath);
			sw2 = f2.AppendText();
			sw2.WriteLine("test_append");
			sw2.Close();
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace
