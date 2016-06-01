using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Runtime.Serialization.Json;


namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
		protected void Page_Load(object sender, EventArgs e)
		{
			Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
/*			
			Person[] p = new Person
			{
				forename = "Phil",
				surname = "Curnow",
				age = 41,
				address = new Address { line1 = "21 High Street", line2 = "Anyplace, AnyTown, AN1 1AB" }
			};

			//We can simply convert it to a JSON string using the method call:
			string jsonString = SerializeJSon<Person>(p);
			Response.Write("jsonString - " + jsonString + "<br>");
*/
			//var user = new User { Username = "user", Password = "pass" };
			//var jsonUser = JsonConvert.SerializeObject(user);
			
			//string value = "test";
			//string[] result = JavaScriptSerializer.serialize(value);
		}//------------------------------------- end func
	}//----------------------- end class
/*	
	public class User
	{
	   [JsonProperty(PropertName = username)]
	   public string Username { get; set; }

	   [JsonProperty(PropertName = password)]
	   public string Password { get; set; }
	}
*/	
}//----------------------- end namespace
