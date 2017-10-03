/*
Compile: javac testArray.java
Run: java testArray
*/
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
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
		

	}//end main()	
}//end class