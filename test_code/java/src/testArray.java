/*
Compile: javac testArray.java
Run: java testArray
*/
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
//import java.util.Collection;
//import java.util.Iterator;

//http://java-course.ru/begin/array-first/

class testArray{
	public static void main (String args[]){

		int size = 12;
		int array1[] = new int[size];
		
		for( int n = 0; n < size; n++){
			double rand = Math.random() * (size+1);
			array1[n] = (int) rand;
		}
		
		System.out.println("array1, length: " + array1.length );
		System.out.println("array1, link: " +  array1 );
		
		for( int n = 0; n < size; n++){
			System.out.println("[" + n + "] => " + array1[n] );
		}
		
		//------------------------------- ArrayList
		List<Integer> x = new ArrayList<Integer>();
		x.add(1);
		x.add(2);
		System.out.println(x);

		// Output an array
		final String[] array = {"four", "three", "two", "one"};
		System.out.println( Arrays.asList( array ) );
		
		// Output a map
		final Map<String, String> map = new HashMap<String, String>();
		map.put("one", "a");
		map.put("two", "b");
		map.put("three", "c");
		System.out.println( map.entrySet() );
		System.out.println( map.keySet() );
		
		System.out.println( map.get("two") );
		
/*
		HashMap<String, HashMap> selects = new HashMap<String, HashMap>();
		for(Map.Entry<String, HashMap> entry : selects.entrySet()) {
			String key = entry.getKey();
			HashMap value = entry.getValue();

			// do what you have to do here
			// In your case, an other loop.
		}

		//https://habrahabr.ru/post/128017/
		// 1.
		for (Map.Entry<String, String> entry: hashmap.entrySet())
			System.out.println(entry.getKey() + " = " + entry.getValue());

		// 2.
		for (String key: hashmap.keySet())
			System.out.println(hashmap.get(key));

		// 3.
		Iterator<Map.Entry<String, String>> itr = hashmap.entrySet().iterator();
		while (itr.hasNext())
			System.out.println(itr.next());
*/

	}//end main()	
}//end class