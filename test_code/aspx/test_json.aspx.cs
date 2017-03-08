using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.UI;
//using System.Web.UI.WebControls;
using System.Runtime.Serialization.Json;


namespace myspace
{
/*	
    class personObj
    {
		public string firstname;
		public string lastname;
		public int age;
    }
*/	
		internal class personObj  
		{  
			[DataMember]  
			internal string firstname;  
			
			[DataMember]  
			internal string lastname;  

			[DataMember]  
			internal int age;  
		}  
	
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
			
/*
JavaScriptSerializer js = new JavaScriptSerializer();
Person p1 = new Person();
p1.firstName = "Rakki";
p1.lastName = "Muthukumar";
p1.department = "Microsoft PSS";
p1.address.addressline1 = "Microsoft India GTSC";
p1.address.addressline2 = "PSS – DSI";
p1.address.city = "Bangalore";
p1.address.state = "Karnataka";
p1.address.country = "India";
p1.address.pin = 560028;
//p1.technologies = new string[] { “IIS”, “ASP.NET”, “JavaScript”, “AJAX” };

string jsonString = js.Serialize(p1);
Response.Write("jsonString - " + jsonString + "<br>");
*/

//Person p2 = js.Deserialize<Person>(str);
//Response.Write(p2.lastName);

/*
Person[] p = new Person{
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

//https://msdn.microsoft.com/en-us/library/bb412179(v=vs.110).aspx
personObj user = new personObj();  
user.firstname = "roman";
user.lastname = "laptev";
user.age = 41;

//Response.Write ( user.firstname );
//Response.Write ( user.lastname );
//Response.Write ( user.age );

MemoryStream stream1 = new MemoryStream();  
DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(personObj)); 
ser.WriteObject(stream1, user);

/*
stream1.Position = 0;  
StreamReader sr = new StreamReader(stream1);  
Response.Write("JSON form of Person object: ");  
Response.Write( sr.ReadToEnd() );  
*/

//string jsonString = SerializeJSon(user);
//Response.Write("jsonString - " + jsonString + "<br>");
			
			
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
