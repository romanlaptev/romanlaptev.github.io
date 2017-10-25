import java.util.*;

class TestVector{
	public static void main (String args[]){
	
		Vector v = new Vector ();
		
		for( int n = 0; n < args.length; n++){
			v.add( args[n] );
		}
		for( int n = 0; n < v.size(); n++){
			System.out.println( v.get(n) );
		}
		
	}
}//end class