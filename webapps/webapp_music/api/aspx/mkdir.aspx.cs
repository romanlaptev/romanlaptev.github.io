using System;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
			if( Request.QueryString["newfolder"] == null )
			{
				Response.Write("<p class='error'><b>error</b>, undefined newfolder var!</p>");
				return;
			}
			string newfolder = Request.QueryString["newfolder"];
			if( newfolder.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty newfolder value!</p>");
				return;
			}

			if( Request.QueryString["fs_path"] == null )
			{
				Response.Write("<p class='error'><b>error</b>, undefined fs_path var!</p>");
				return;
			}
			string fs_path = Request.QueryString["fs_path"];
			if( fs_path.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty fs_path value!</p>");
				return;
			}
			
			string dirname = fs_path + "\\" +newfolder;
			try
			{
				Response.Write ( "<p class='ok'><b>create directory:</b> " + dirname + "</p>"); 
				Directory.CreateDirectory ( dirname );
			}
			catch (Exception ex2)
			{
				Response.Write("<p class='error'>"+ex2.Message+"</p>");
			}	
		
		}//------------------------------------- end func
		
	}//----------------------- end class
}//----------------------- end namespace