//https://stackoverflow.com/questions/16607444/how-to-serialize-object-to-json
//http://docs.oracle.com/javaee/7/api/index.html?javax/json/JsonObject.html
//https://www.mkyong.com/java/how-to-convert-java-object-to-from-json-jackson/

//package mypackage.xml;
import javax.json.*;

class TestJSON{
	
	public static void main (String args[]){

		JsonObject value = Json.createObjectBuilder()
		 .add("firstName", "John")
		 .add("lastName", "Smith")
		 .add("age", 25)
		 .add("address", Json.createObjectBuilder()
			 .add("streetAddress", "21 2nd Street")
			 .add("city", "New York")
			 .add("state", "NY")
			 .add("postalCode", "10021"))
		 .add("phoneNumber", Json.createArrayBuilder()
			 .add(Json.createObjectBuilder()
				 .add("type", "home")
				 .add("number", "212 555-1234"))
			 .add(Json.createObjectBuilder()
				 .add("type", "fax")
				 .add("number", "646 555-4567")))
		 .build();
 
// JsonObject can be written to JSON as follows:


 // JsonWriter writer = ...
 // JsonObject obj = ...;
 // writer.writeObject(obj);
 		
	}//end main()
	
}//end class