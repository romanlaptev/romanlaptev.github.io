using System;
using System.IO;
//using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Web.UI;
//using System.Web.UI.WebControls;

using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;

//using System.Web.Script.Serialization;

namespace myspace
{
	[DataContract]
	class personObj
	{
        [DataMember]  
		public string firstname;

        [DataMember]  
		public string lastname;

        [DataMember]  
		public int age;
	}
/*
		internal class personObj  
		{  
			[DataMember]  
			internal string firstname;  
			
			[DataMember]  
			internal string lastname;  

			[DataMember]  
			internal int age;  
		}  
*/	
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
user.firstname = "roman\njl;kl;lk";
user.lastname = "laptev";
user.age = 41;

Response.Write ( user.firstname );
Response.Write ( user.lastname );
Response.Write ( user.age );
Response.Write("<br>");

MemoryStream stream1 = new MemoryStream();  
DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(personObj)); 
ser.WriteObject(stream1, user);

stream1.Position = 0;  
StreamReader sr = new StreamReader(stream1);  
Response.Write("<h3>JSON form of Person object</h3> ");  
Response.Write( sr.ReadToEnd() );  
Response.Write("<br>");

/*
[{"id" : "1", "author" : "anonymous", "title" : "no subject", "text_message" : "[code]
Как сделать 301 редирект
Файл .htaccess
301 редирект – корректная переадресация через htaccess и php header
.htaccess: , вывод ошибок PHP

Redirect /index.php http://example.com/index.php
Redirect /data http://www.example.com/data 
=================================
[/code]", "client_date" : "09.06.2017 13:01:40", "server_date" : "09.06.2017 12:01:41", "ip" : "192.168
.56.1"}]
*/			
			
		}//end Page_Load()
		
	}//end class

}//end namespace