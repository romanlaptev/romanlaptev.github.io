import java.util.Scanner;
import java.util.Arrays;

class testInput{
	public static void main (String[] args){

		int array1[] = new int[0];
System.out.println("Array size: " + array1.length );
		
		Scanner scanner = new Scanner( System.in);
		
System.out.print("Input number and enter. "  );
System.out.println("Ctrl+C - end input. "  );
		while ( scanner.hasNext() ){
			int input = scanner.nextInt();
System.out.println("Number: " + input );
			
			//change array size ( use array2 )
			int array2[] = new int[ array1.length + 1 ];
			
			//copy old values to new array
			for( int n = 0; n < array1.length; n++){
				array2[n] = array1[n];
			}//next
			
			
			array2[ array2.length - 1] = input;
			array1 = array2;
			
System.out.println("Add input number to array. New array size: " + array1.length );
System.out.println ( "array1: " + Arrays.toString(array1) );			
		}//next

	}//end main()	
}//end class