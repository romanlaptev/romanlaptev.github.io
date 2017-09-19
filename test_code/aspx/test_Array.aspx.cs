using System;
//using System.IO;
using System.Collections;
using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Web.UI;

namespace myspace
{
	class personObj
	{
		public string firstname;
		public string lastname;
		public int age;
	}

	public partial class Default : System.Web.UI.Page
	{

		struct Book
		{
			public string name;
			public string author;
			public int year;
		 
			// конструкор
			public Book(string n, string a, int y)
			{
				name = n;
				author = a;
				year = y;
			}		 
			
			public string Info()
			{
				string s = "<p>Книга '{"+name+"}' (автор {"+author+"}) была издана в {"+year+"} году</p>";
				return s;
			}
		}//end struct
			
		protected void Page_Init(object sender, EventArgs e)
		{
//Response.Write("Page_Init.<br>");
Response.Write("Net Framework version - " + Environment.Version.ToString() + "<br>");
		}
		
		protected void Page_Load(object sender, EventArgs e)
		{
//Response.Write("Page_Load.<br>");
		}//end Page_Load()
		

		protected void Page_LoadComplete(object sender, EventArgs e)
		{
//Response.Write("Page_LoadComplete.<br>");

			//int[] array = new int[5];
			//string[] stringArray = new string[6];
			//int[] array1 = new int[] { 1, 3, 5, 7, 9 };
			
			//int[] array3;
			//array3 = new int[] { 1, 3, 5, 7, 9 };			

			//int[,] array = new int[4, 2];
/*			
// Two-dimensional array.
int[,] array2D = new int[,] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
// The same array with dimensions specified.
int[,] array2Da = new int[4, 2] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };
// A similar array with string elements.
string[,] array2Db = new string[3, 2] { { "one", "two" }, { "three", "four" },
                                        { "five", "six" } };
// Three-dimensional array.
int[, ,] array3D = new int[,,] { { { 1, 2, 3 }, { 4, 5, 6 } }, 
                                 { { 7, 8, 9 }, { 10, 11, 12 } } };
// The same array with dimensions specified.
int[, ,] array3Da = new int[2, 2, 3] {
	{
		{ 1, 2, 3 }, { 4, 5, 6 } 
	}, 
	{
		{ 7, 8, 9 }, { 10, 11, 12 } 
	} 
};
									   
// Accessing array elements.
System.Console.WriteLine(array2D[0, 0]);
System.Console.WriteLine(array2D[0, 1]);
System.Console.WriteLine(array2D[1, 0]);
System.Console.WriteLine(array2D[1, 1]);
System.Console.WriteLine(array2D[3, 0]);
System.Console.WriteLine(array2Db[1, 0]);
System.Console.WriteLine(array3Da[1, 0, 1]);
System.Console.WriteLine(array3D[1, 1, 2]);
*/
			Response.Write("<h2> Array 'arrayRecord' </h2>");
			string[,] arrayRecord = new string[7, 2] { 
	{ "id", "1" }, 
	{ "author", "anonymous" },
	{ "title", "test1" },
	{ "text_message", "test1111111111" }, 
	{ "client_date", "09.08.2017 11:14:56" },
	{ "server_date", "09.08.2017 10:14:56" },
	{ "ip", "192.168.56.1" } 
};
			for( int n1 = 0; n1 < 7; n1++){
				string key = arrayRecord[n1, 0];
				string value = arrayRecord[n1, 1];
				Response.Write( "<b>" + key + "</b> : " + value);
				Response.Write("<br>");
			}
			
Response.Write("<hr>");

			Response.Write("<h2> Array 'arrayRecords' </h2>");
			string[,,] arrayRecords = new string[3, 7, 2] { 
	{
		{ "id", "1" }, 
		{ "author", "anonymous" },
		{ "title", "test1" },
		{ "text_message", "test1111111111" }, 
		{ "client_date", "09.08.2017 11:14:56" },
		{ "server_date", "09.08.2017 10:14:56" },
		{ "ip", "192.168.56.1" } 
	},
	{
		{ "id", "2" }, 
		{ "author", "anonymous" },
		{ "title", "test2" },
		{ "text_message", "test22222222222" }, 
		{ "client_date", "09.08.2017 11:14:56" },
		{ "server_date", "09.08.2017 10:14:56" },
		{ "ip", "192.168.56.1" } 
	},
	{
		{ "id", "3" }, 
		{ "author", "anonymous" },
		{ "title", "test3" },
		{ "text_message", "test3333333333" }, 
		{ "client_date", "09.08.2017 11:14:56" },
		{ "server_date", "09.08.2017 10:14:56" },
		{ "ip", "192.168.56.1" } 
	}
};
			for( int n1 = 0; n1 < 3; n1++){
				for( int n2 = 0; n2 < 7; n2++){
					string key = arrayRecords[n1, n2, 0];
					string value = arrayRecords[n1, n2, 1];
					Response.Write( "<b>" + key + "</b> : " + value);
					Response.Write("<br>");
				}
				Response.Write("<hr>");
			}

Response.Write("<hr>");

			Response.Write("https://metanit.com/sharp/tutorial/2.13.php<br>");
			Response.Write("<h2>Структуры</h2>");
			
			Book book;
			book.name = "Война и мир";
			book.author = "Л. Н. Толстой";
			book.year = 1869;

			Response.Write( book.name );
			Response.Write("<br>");

			Response.Write( book.Info() );
			Response.Write("<br>");

			//struct array
			Book[] books=new Book[3];
			
			books[0].name = "Война и мир";
			books[0].author = "Л. Н. Толстой";
			books[0].year = 1869;
			
			books[1].name = "Преступление и наказание";
			books[1].author = "Ф. М. Достоевский";
			books[1].year = 1866;

			books[2].name = "Отцы и дети";
			books[2].author = "И. С. Тургенев";
			books[2].year = 1862;
 
			foreach (Book b in books)
			{
				Response.Write( b.Info() );
			}

			//use constructor
			Book book2=new Book("Аэлита", "А.Н. Толстой", 1923);
			Response.Write( book2.Info() );
			
// Response.Write("<hr>");
			// Response.Write("https://metanit.com/sharp/tutorial/4.5.php<br>");
			// Response.Write("<h2>Кортежи</h2>");
			
			// var tuple = (5, 10);
			// Response.Write(tuple.Item1 +", "+ tuple.Item2);
			// Response.Write("<br>");
			// tuple.Item1 += 26;
			// Response.Write(tuple.Item1);

Response.Write("<hr>");
			Response.Write("https://metanit.com/sharp/tutorial/4.5.php<br>");
			Response.Write("<h2>Список List<T></h2>");

			List<int> numbers = new List<int>();
			//List<int> numbers = new List<int>() { 1, 2, 3, 45 };
			numbers.Add(6); // добавление элемента
			numbers.AddRange(new int[] { 7, 8, 9 });
			numbers.Insert(0, 756); // вставляем на первое место в списке
 			numbers.RemoveAt(1); //  удаляем второй элемент

			Response.Write( "Count: " + numbers.Count );
			Response.Write( "Capacity: " + numbers.Capacity );
			Response.Write("<br>");
 
			foreach (int n in numbers)
			{
				Response.Write(n);
				Response.Write(", ");
			}

Response.Write("<hr>");
			Response.Write("https://metanit.com/sharp/tutorial/4.3.php<br>");
			Response.Write("<h2>ArrayList</h2>");
			ArrayList list = new ArrayList();			
			list.Add(2.3); // заносим в список объект типа double
			list.Add(55); // заносим в список объект типа int
			list.AddRange(new string[] { "Hello", "world" }); // заносим в список строковый массив

			Response.Write( "Count: " + list.Count );
			Response.Write( "Capacity: " + list.Capacity );
			Response.Write("<br>");
			
			foreach (object o in list)
			{
				Response.Write(o);
				Response.Write("<br>");
			}
			
Response.Write("<hr>");
			Response.Write("<h2> Object </h2>");
			personObj user = new personObj();  
			user.firstname = "roman";
			user.lastname = "laptev";
			user.age = 41;
Response.Write ( user.firstname );
Response.Write ( user.lastname );
Response.Write ( user.age );
Response.Write("<hr>");

			Object[] values = new Object[7];
			values[0] = "first element";
			values[1] = 2;
			values[2] = 3;
			values[3] = 4;
			values[4] = 5;
			values[5] = 6;
			values[6] = 7;
			
			Response.Write( "Length: " + values.Length );
			Response.Write("<br>");
			
			for (int n = 0; n < values.Length; n++){
				Response.Write( values[n] );
				Response.Write(", Type: ");
				Response.Write( values[n].GetType() );
				Response.Write("<br>");
			}//next

			
			Response.Write("<hr>");
			Response.Write("<h2> Dictionary </h2>");

			Dictionary<int, string> countries = new Dictionary<int, string>(5);
			countries.Add(1, "Russia");
			countries.Add(3, "Great Britain");
			countries.Add(2, "USA");
			countries.Add(4, "France");
			countries.Add(5, "China");
			//countries.Add("key", "Germany");

			// получение элемента по ключу
			string country = countries[4];
			// изменение объекта
			countries[4] = "Spain";
			// удаление по ключу
			countries.Remove(2);
			
			foreach (KeyValuePair<int, string> keyValue in countries)
			{
				Response.Write(keyValue.Key + " - " + keyValue.Value);
			}
			Response.Write("<br>");
			
			Dictionary<string, string> myTest = new Dictionary<string, string>(5);
			myTest.Add("key1", "Germany");
			foreach (KeyValuePair<string, string> keyValue in myTest)
			{
				Response.Write(keyValue.Key + " - " + keyValue.Value);
			}
 
		}//end Page_LoadComplete()
		
	}//end class

}//end namespace