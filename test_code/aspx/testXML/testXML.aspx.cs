//https://support.microsoft.com/ru-ru/help/307548/how-to-read-xml-from-a-file-by-using-visual-c
using System;
using System.Xml; 
//using System.IO;

public partial class _Default : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{
			Response.Write("<h1>test XML: read from file</h1>");
			
			string filepath = Server.MapPath( "menu.xml");
			XmlTextReader reader = new XmlTextReader (filepath);
			while (reader.Read())  
			{
				Response.Write(reader.NodeType + "<br>");
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
			
			//https://msdn.microsoft.com/ru-ru/library/dw229a22(v=vs.110).aspx
			Response.Write("<h1>test XML: create xml file from string</h1>");
			string s = "<xml><foo></foo></xml>";
			XmlDocument xdoc = new XmlDocument();
			xdoc.LoadXml(s);
			filepath = Server.MapPath( "test.xml");
			xdoc.Save( filepath );

	}//end Page_Load()
		
}//end class