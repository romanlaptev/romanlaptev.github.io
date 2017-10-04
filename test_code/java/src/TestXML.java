//https://docs.oracle.com/cd/B28359_01/appdev.111/b28394/adx_j_parser.htm#ADXDK3000
//https://docs.oracle.com/javase/7/docs/api/javax/xml/parsers/SAXParser.html
//https://www.mkyong.com/java/how-to-read-xml-file-in-java-dom-parser/
//http://java-course.ru/begin/xml/
//http://java-online.ru/java-xml.xhtml
//http://www.quizful.net/post/getting-started-with-xml-in-java
//package mypackage.xml;

import java.io.File;
//import java.io.FileNotFoundException;
import java.io.IOException;


import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;

class TestXML{
	public static void main (String args[]){
		
		File xmlFile;
		//try {
			xmlFile = new File("data.xml");
		//} catch (FileNotFoundException e){
			//e.printStackTrace();
			//return;
		//}			
		
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse( xmlFile );//create tree from file
		
			Node root = doc.getDocumentElement();
			System.out.println("Root element :" + root.getNodeName());

			NodeList menu = root.getChildNodes();
			for (int n = 0; n < menu.getLength(); n++) {
				
				Node node = menu.item(n);
				
				//print attribute
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) node;
System.out.println("menu title: " + eElement.getAttribute("title"));
				}
				
				//get child nodes
				if ( node.getNodeType() != Node.TEXT_NODE ){
					NodeList items = node.getChildNodes();
					System.out.println("menu items length: " + items.getLength());
					for(int n2 = 0; n2 < items.getLength(); n2++) {
						Node _item = items.item(n2);
						if ( _item.getNodeType() != Node.TEXT_NODE ){
							Element __item = (Element) _item;
System.out.println("item name : " + __item.getElementsByTagName("a").item(0).getTextContent());							
							//System.out.println( _item.getNodeName() + ":" + _item.getChildNodes().item(0).getTextContent());
						}
					}
System.out.println("===========>>>>");
				}
				
			}//next
		
		} catch (ParserConfigurationException ex) {
			ex.printStackTrace(System.out);
		} catch (SAXException ex) {
			ex.printStackTrace(System.out);
		} catch (IOException ex) {
			ex.printStackTrace(System.out);
		}//end try
/*
        try {
            // Создается построитель документа
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            // Создается дерево DOM документа из файла
            Document document = documentBuilder.parse("BookCatalog.xml");
 
            // Получаем корневой элемент
            Node root = document.getDocumentElement();
            
            System.out.println("List of books:");
            System.out.println();
            // Просматриваем все подэлементы корневого - т.е. книги
            NodeList books = root.getChildNodes();
            for (int i = 0; i < books.getLength(); i++) {
                Node book = books.item(i);
                // Если нода не текст, то это книга - заходим внутрь
                if (book.getNodeType() != Node.TEXT_NODE) {
                    NodeList bookProps = book.getChildNodes();
                    for(int j = 0; j < bookProps.getLength(); j++) {
                        Node bookProp = bookProps.item(j);
                        // Если нода не текст, то это один из параметров книги - печатаем
                        if (bookProp.getNodeType() != Node.TEXT_NODE) {
                            System.out.println(bookProp.getNodeName() + ":" + bookProp.getChildNodes().item(0).getTextContent());
                        }
                    }
                    System.out.println("===========>>>>");
                }
            }
 
        } catch (ParserConfigurationException ex) {
            ex.printStackTrace(System.out);
        } catch (SAXException ex) {
            ex.printStackTrace(System.out);
        } catch (IOException ex) {
            ex.printStackTrace(System.out);
        }
*/		
	}//end main()
}//end class