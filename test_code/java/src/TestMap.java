//http://www.quizful.net/post/Using-Map-in-Jave
//http://cybern.ru/java-map.html
//http://java-online.ru/java-arrayList.xhtml
//http://developer.alexanderklimov.ru/android/java/hashmap.php
import java.util.Map;
import java.util.HashMap;
//import java.util.Hashtable;
import java.util.List;
//import java.util.Collection;
//import java.util.Iterator;
//import java.util.Arrays;
import java.util.ArrayList;
//import java.util.Set;

class TestMap {
	
	public static void main( String[] args){
		
		// Output a map
		final Map<String, String> map = new HashMap<String, String>();
		map.put("one", "a");
		map.put("two", "b");
		map.put("three", "c");
		System.out.println( map.entrySet() );
		System.out.println( map.keySet() );
		
		System.out.println( map.get("two") );

		//------------------------
		Map<String, String> dBrecord = new HashMap<String, String>();
		dBrecord.put("id", "1");
		dBrecord.put("author", "anonymous");
		dBrecord.put("title", "test1");
		dBrecord.put("text_message", "test1111");
		dBrecord.put("client_date", "2017-10-02 16:04:58");
		dBrecord.put("server_date", "2017-10-02 09:08:40");
		dBrecord.put("ip", "37.193.108.45");
		
		System.out.println( "isEmpty(): " + dBrecord.isEmpty() );
		System.out.println( "size: " + dBrecord.size() );
		System.out.println( "containsKey 'ip'? " + dBrecord.containsKey("ip") );
		System.out.println( "containsValue '37.193.108.45'? " + dBrecord.containsValue("37.193.108.45") );
		System.out.println( "get value 'ip': " + dBrecord.get("ip") );
		
		//for(int n : nums) sum += n;
		
		for(String v : dBrecord.values() ){
			System.out.println( "value - " + v );
		}//next

		//Keys collection
		// Set keys = dBrecord.keySet(); 
		// for (String key: keys) { 
			// System.out.println( "key - " + key );
		// } 

		for (String key: dBrecord.keySet() ) { 
			System.out.println( "key - " + key );
		} 
		
		for (String key: dBrecord.keySet() ) { 
			String value = dBrecord.get(key); 
			System.out.println( key + " : " + value );
		} 
		
		// for (Map.Entry entry: dBrecord.entrySet()) { 
			// String key = entry.getKey(); 
			// //HashMap value = entry.getValue(); 
			// String value = dBrecord.get(key); 
			// System.out.println( key + " :: " + value );
		// } 
		
/* Tesst!!!!
for (Map.Entry _record : dBrecord.entrySet()) {
out.println("Key: " + _record.getKey() + " Value: "+ _record.getValue());
}
*/		

// put(K key, V value)
// values() — возвращает значения всех элементов в виде коллекции
// remove(Object key)
// clear()

		//------------------------------- ArrayList
		List<Map> records = new ArrayList<Map>();
		records.add( dBrecord );
		
		System.out.println ("Size of the first element: " + records.get(0).size());
		System.out.println ("Size of the records: " + Integer.valueOf ( records.size() ) );		
		
		for(Map entry: records ){
			System.out.println( "Size = " + entry.size() );
		}//next
		
		
	}//end main()

	
}//end class


/*
		
		// HashMap<String, HashMap> selects = new HashMap<String, HashMap>();
		// for(Map.Entry<String, HashMap> entry : selects.entrySet()) {
			// String key = entry.getKey();
			// HashMap value = entry.getValue();

			// // do what you have to do here
			// // In your case, an other loop.
		// }

		// //https://habrahabr.ru/post/128017/
		// // 1.
		// for (Map.Entry<String, String> entry: hashmap.entrySet())
			// System.out.println(entry.getKey() + " = " + entry.getValue());

		// // 2.
		// for (String key: hashmap.keySet())
			// System.out.println(hashmap.get(key));

		// // 3.
		// Iterator<Map.Entry<String, String>> itr = hashmap.entrySet().iterator();
		// while (itr.hasNext())
			// System.out.println(itr.next());
*/