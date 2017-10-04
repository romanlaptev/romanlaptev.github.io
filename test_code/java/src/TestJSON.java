//https://stackoverflow.com/questions/16607444/how-to-serialize-object-to-json
//http://docs.oracle.com/javaee/7/api/index.html?javax/json/JsonObject.html
//https://www.mkyong.com/java/how-to-convert-java-object-to-from-json-jackson/

//package mypackage.xml;
//import javax.json.*;

// import org.codehaus.jackson.JsonGenerationException;
// import org.codehaus.jackson.map.JsonMappingException;
// import org.codehaus.jackson.map.ObjectMapper;

//import java.util.ArrayList;
//import java.util.Collection;
import java.util.Map;
import java.util.HashMap;

import com.google.gson.Gson;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;

//import com.google.gson.GsonBuilder;

class TestJSON{
	
	public static void main (String args[]){

		Gson gson = new Gson();
		
		Map<String, String> dBrecord = new HashMap<String, String>();
		dBrecord.put("id", "1");
		dBrecord.put("author", "anonymous");
		dBrecord.put("title", "test1");
		dBrecord.put("text_message", "test1111");
		dBrecord.put("client_date", "2017-10-02 16:04:58");
		dBrecord.put("server_date", "2017-10-02 09:08:40");
		dBrecord.put("ip", "37.193.108.45");
		
		String jsonStr = gson.toJson(dBrecord);
		System.out.println( jsonStr);
		
		// JsonObject value = Json.createObjectBuilder()
		 // .add("firstName", "John")
		 // .add("lastName", "Smith")
		 // .add("age", 25)
		 // .add("address", Json.createObjectBuilder()
			 // .add("streetAddress", "21 2nd Street")
			 // .add("city", "New York")
			 // .add("state", "NY")
			 // .add("postalCode", "10021"))
		 // .add("phoneNumber", Json.createArrayBuilder()
			 // .add(Json.createObjectBuilder()
				 // .add("type", "home")
				 // .add("number", "212 555-1234"))
			 // .add(Json.createObjectBuilder()
				 // .add("type", "fax")
				 // .add("number", "646 555-4567")))
		 // .build();
 
// JsonObject can be written to JSON as follows:


 // JsonWriter writer = ...
 // JsonObject obj = ...;
 // writer.writeObject(obj);
 		
	}//end main()
	
}//end class