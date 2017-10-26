import java.util.*;
//java TestStack a b c d e f
class TestStack{
	public static void main (String args[]){
	
		Stack s = new Stack();
		
		for( int n = 0; n < args.length; n++){
			s.push( args[n] );
		}
		
		
		while( !s.isEmpty() ){
			System.out.println( "move stack element = " + s.pop() );
		}
		
		//System.out.println( "last stack element = " + s.peek() );

	}
}//end class