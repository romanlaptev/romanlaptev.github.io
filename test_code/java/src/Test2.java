class Test2 {
	
	public static void main( String[] args){
		
		// System.out.println("args.length = " + args.length );
		// for( int n = 0; n < args.length; n++){
			// System.out.println( "Argument["+n+"] = " + args[n] );
		// }//next
		
		// if( args.length > 0){
			// System.out.println("args[0] is null: " + args[0] == null );
			// System.out.println("args[0] = " + args[0].isEmpty() );
		// }
		
		System.out.println(" Summa = " + myFuncSumma( 2, 3) );
		
		//int size = 9;
		//int arr1[] = new int[size];
		//arr1[0] = 1;
		//arr1[1] = 2;
		//arr1[2] = 3;
		int[] arr1 = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		printArray( arr1 );
		
	}//end main()
	
	
	public static int myFuncSumma( int a, int b){
		int summa = a + b;
		return summa;
	}//end myFuncSumma()
	
	public static void printArray( int[]array ){
		System.out.println("array.length = " + array.length );
		for( int n = 0; n < array.length; n++){
			System.out.println( "Item["+n+"] = " + array[n] );
		}//next
	}//end printArray()
	
}//end class