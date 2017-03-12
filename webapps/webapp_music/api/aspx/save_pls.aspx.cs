using System;
using System.IO;

namespace myspace{
	
    public partial class Default : System.Web.UI.Page {
	
		protected void Page_Load(object sender, EventArgs e){

/*
Response.Write ( "<b>Request.HttpMethod</b> = " + Request.HttpMethod); 
Response.Write ( "<br>"); 
Response.Write ( "<b>Request.Params[REQUEST_METHOD]</b> = " + Request.Params["REQUEST_METHOD"]); 
Response.Write ( "<br>"); 
Response.Write ( "<b>Request.Params[QUERY_STRING]</b> = " + Request.Params["QUERY_STRING"]); 
Response.Write ( "<br>"); 
foreach ( string x in Request.ServerVariables )
{
	Response.Write ( "<b>"+x + "</b> = " + Request.ServerVariables[x]); 
	Response.Write ( "<br>"); 
}
foreach ( string x in Request.Params )
{
	Response.Write ( "<b>"+x + "</b> = " + Request.Params[x]); 
	Response.Write ( "<br>"); 
}
*/
//filepath = D:\clouds\Yandex.Disk\sync\sites\romanlaptev.github.io\webapps\webapp_music\api\aspx\logs\visits.txt
//string filepath = Server.MapPath("logs\\visits.txt");
//Response.Write ( "<b>filepath</b> = " + filepath); 
//Response.Write ( "<br>"); 

			if ( Request.HttpMethod != "POST" )
			{
				Response.Write("<p class='alert-error'><b>error</b>, need <b>POST query</b> !</p>");
				return;
			}
/*
foreach ( string x in Request.Form ){
	Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
	Response.Write ( "<br>"); 
}

String[] arr1 = Request.Form.AllKeys;
for (int n = 0; n < arr1.Length; n++)
{
   Response.Write("Form: " + arr1[n] + "<br>");
}
*/

/*
List<int> listValues = new List<int>();
foreach (string key in Request.Form.AllKeys)
{
    if (key.StartsWith("List"))
    {
        listValues.Add(Convert.ToInt32(Request.Form[key]));
    }
}
*/
			
			if( Request.Form["filename"] == null ){
				Response.Write("<p class='alert-error'><b>error</b>, undefined 'filename'.</p>");
				return;
			}
			string filename = Request.Form["filename"];
			if( filename.Length == 0 ){
				Response.Write("<p class='alert-error'><b>error</b>, empty 'filename'.</p>");
				return;
			}
			
			if( Request.Form["json"] == null ){
				Response.Write("<p class='alert-error'><b>error</b>, undefined 'json'.</p>");
				return;
			}
			string json = Request.Form["json"];
			if( json.Length == 0 ){
				Response.Write("<p class='alert-error'><b>error</b>, empty 'json'.</p>");
				return;
			}
			
			try
			{
				StreamWriter sw1 = new StreamWriter( filename );
				sw1.WriteLine( json );
				sw1.Close();
				Response.Write ( "<p class='ok'><b>save playlist </b> " + filename + "</p>"); 
			}
			catch (Exception ex2)
			{
				Response.Write("<p class='alert-error'>"+ex2.Message+"</p>");
			}	
			
/*
			string[] playlist = null;
			playlist = Request.Form.GetValues("playlist[]");
			if( playlist == null ){
				Response.Write("<p class='alert-error'><b>error</b>, empty 'playlist[]'.</p>");
				return;
			}
			int len = playlist.Length;
			Response.Write( len );
	Response.Write ( "<br>"); 
			Response.Write( playlist[0] );
	Response.Write ( "<br>"); 
			Response.Write( playlist[1] );
	Response.Write ( "<br>"); 
			Response.Write( playlist[2] );
	Response.Write ( "<br>"); 

			foreach ( string item in playlist )
			{
				Response.Write ( item ); 
				Response.Write ( "<br>"); 
			}
*/
			//int[] pidarray = new int[elements.Length];
		
			//Response.Write( Request.Form["json[0][title]"] );
/*			
//List<int> listValues = new List<int>();
foreach (string key in Request.Form.AllKeys)
{
    if (key.StartsWith("json"))
    {
		Response.Write( key );
        //listValues.Add(Convert.ToInt32(Request.Form[key]));
    }
}
*/			
/*
        for (int x = 0; x < elements.Length; x++)
        {

            pidarray[x] = Convert.ToInt32(elements[x].ToString()); 
        }
*/		
	

/*
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
*/
		}//end Page_Load()
		
	}//end class
}//end namespace