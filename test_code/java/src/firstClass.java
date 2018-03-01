class firstClass {
	static int size = 10;
	
	public static void main (String[] args){
		System.out.println("Test1");
		
		for( int n=0; n<10; n++){
			System.out.println(n);
		}//next
		
		myProc();
		System.out.println( myFunc() );
		
		int sum=0;
		sum++;
		System.out.print( sum );
		System.out.print( ", " );
		System.out.println( Func2( sum ) );
//----------------------
		int array[] = new int[size];
		
		for( int n=0; n< size; n++){
			int number = GenRandNum( array );
			array[n] = number;
		}
		
		String s = "";
		for( int n = 0; n < array.length; n++){
			s = "[" + n + "] => " + array[n] ;
			System.out.println( s ); 
		}
		
	}//end main
	
	static void myProc(){
		System.out.println("myProc!!!");
	}
	
	static String myFunc(){
		return "myFunc!!!";
	}
	
	static int Func2( int a){
		return (a+1)*2;
	}
	
	static int GenRandNum( int[] array ){
//System.out.println( "size: "+ size );		
		double rand = Math.random() * (size+1);
		int number = (int) rand;
		//boolean test = true;
		
		for( int n2 = 0; n2 < array.length; n2++){
			if( array[n2] == number ){
System.out.println("Exclude double number:" + number );
				// test = false;
				// break;
				number = GenRandNum( array );
			}
		}

		return number;
	}
	
}