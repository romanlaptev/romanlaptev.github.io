//https://support.microsoft.com/ru-ru/help/307548/how-to-read-xml-from-a-file-by-using-visual-c
using System;
using System.Xml; 
//using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
		protected void Page_Load(object sender, EventArgs e)
		{
			Response.Write("<h1>test XML</h1>");
			
			string filepath = Server.MapPath( "menu.xml");
			XmlTextReader reader = new XmlTextReader (filepath);
			while (reader.Read())  
			{
				switch (reader.NodeType)  
				{
					case XmlNodeType.Element: // Узел является элементом.
						Response.Write("<" + reader.Name);
						Response.Write(">");
						break;
			  case XmlNodeType.Text: // Вывести текст в каждом элементе.
						Response.Write (reader.Value);
						break;
			  case XmlNodeType. EndElement: // Вывести конец элемента.
						Response.Write("</" + reader.Name);
						Response.Write(">");
						break;
				}
			}			

		}//end Page_Load()
		
	}//end class
}//end namespace