using System;
using System.IO;
//using System.Linq;

namespace myspace{
	
    class autoCar
    {
		public string marka;
		public short year;
    }
	
	public partial class Default : System.Web.UI.Page {
	
		protected void Page_Load(object sender, EventArgs e){
			
			Response.Write ( "<b>Request.HttpMethod</b> = " + Request.HttpMethod); 
			Response.Write ( "<br>"); 
			Response.Write ( "<b>Request.Params[REQUEST_METHOD]</b> = " + Request.Params["REQUEST_METHOD"]); 
			Response.Write ( "<br>"); 
			Response.Write ( "<b>Request.Params[QUERY_STRING]</b> = " + Request.Params["QUERY_STRING"]); 
			Response.Write ( "<br>"); 
			
			Response.Write ( "<p> https://professorweb.ru/my/csharp/charp_theory/level5/5_3.php </p>");
			
			autoCar Car1 = new autoCar();
			autoCar Car2 = Car1;

			Car1.marka = "Renault";

			Response.Write ( Car1.marka );
			Response.Write ( Car2.marka );
			Response.Write ( "<hr>" );
			
			//autoCar myCar = new autoCar { marka = "Renault", year = 2004 };
			autoCar myCar = new autoCar();
			myCar.marka = "Renault";
			myCar.year = 2004;
			
			Response.Write ( myCar.marka );
			Response.Write ( myCar.year );
			
		}//end Page_Load()
		
	}//end class
}//end namespace

/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class autoCar
    {
        public string marka;
    }

    class Program
    {        
        static void Main(string[] args)
        {
            autoCar Car1 = new autoCar();
            autoCar Car2 = Car1;

            Car1.marka = "Renault";

            Console.WriteLine(Car1.marka);
            Console.WriteLine(Car2.marka);

            Console.ReadLine();
        }
    }
}
*/