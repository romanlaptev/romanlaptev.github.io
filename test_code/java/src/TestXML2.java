//https://www.mkyong.com/java/how-to-read-xml-file-in-java-dom-parser/

//package mypackage.xml;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

class TestXML2{
	
	public static void main (String args[]){
		
		try {
			File xmlFile;
			xmlFile = new File("data.xml");
		
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse( xmlFile );//create tree from file
		
			Node root = doc.getDocumentElement();
			System.out.println("Root element :" + root.getNodeName());
			
			if (doc.hasChildNodes()) {
				printNode( doc.getChildNodes() );
			}		
			
		} catch (Exception e) {
			//ex.printStackTrace(System.out);
			System.out.println( e.getMessage() );
		}//end try
		
	}//end main()
	
	private static void printNode(NodeList nodeList){
		
		for( int count = 0; count < nodeList.getLength(); count++){
			Node tempNode = nodeList.item(count);
			
			// make sure it's element node.
			if (tempNode.getNodeType() == Node.ELEMENT_NODE) {

				// get node name and value
				System.out.println("\nNode Name =" + tempNode.getNodeName() + " [OPEN]");
				System.out.println("Node Value =" + tempNode.getTextContent());
			
				if (tempNode.hasAttributes()){// get attributes names and values
					NamedNodeMap nodeMap = tempNode.getAttributes();
					for (int n = 0; n < nodeMap.getLength(); n++) {
						Node node = nodeMap.item(n);
						System.out.println("attr name : " + node.getNodeName());
						System.out.println("attr value : " + node.getNodeValue());
					}
				}
				
				if (tempNode.hasChildNodes()) {// loop again if has child nodes
					printNode(tempNode.getChildNodes());
				}
				
				System.out.println("Node Name =" + tempNode.getNodeName() + " [CLOSE]");
			}
			
		}//next

	}//end printNode()
	
}//end class