//http://goloburdin.blogspot.ru/2011/03/json-java.html
import org.json.simple.JSONObject;

class TestJSON2{
	
	public static void main (String args[]){

		
		// Map<String, String> dBrecord = new HashMap<String, String>();
		// dBrecord.put("id", "1");
		// dBrecord.put("author", "anonymous");
		// dBrecord.put("title", "test1");
		// dBrecord.put("text_message", "test1111");
		// dBrecord.put("client_date", "2017-10-02 16:04:58");
		// dBrecord.put("server_date", "2017-10-02 09:08:40");
		// dBrecord.put("ip", "37.193.108.45");
		
		// String jsonStr = gson.toJson(dBrecord);
		// System.out.println( jsonStr);
		
		JSONObject resultJson = new JSONObject();

		resultJson.put("name","foo");
		// resultJson.put("num",new Integer(100));
		// resultJson.put("is_vip",new Boolean(true));
		// resultJson.put("nickname",null);
		System.out.print( resultJson.toString() );
		
	}//end main()
}//end class