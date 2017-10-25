import java.util.*;
//java TestVector a b c d e f
class TestVector{
	public static void main (String args[]){
	
		Vector v = new Vector ();
		
		for( int n = 0; n < args.length; n++){
			v.add( args[n] );
		}
		
		v.set(2, "replace element with index 2!!!");
		v.remove("a");
		
		for( int n = 0; n < v.size(); n++){
			System.out.println( v.get(n) );
		}

		System.out.println( "Index of element: " + v.indexOf("b") );
		
	}
}//end class