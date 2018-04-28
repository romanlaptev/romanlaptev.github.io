package com;
public class App 
{
    public static void main( String[] args )
    {
		String s = "";
		String spaceLine1, spaceLine2;
		int numRepeat = 10;
		for( int n = 0; n < numRepeat; n++){
			
			spaceLine1 = "-";
			for( int n2 =0; n2 < n; n2++){
				spaceLine1 = spaceLine1 + "-";
			}
			
			spaceLine2 = "-";
			for( int n2 = (numRepeat - n); n2 > 1; n2--){
				spaceLine2 = spaceLine2 + "-";
//System.out.println( "n2:" +n2 );
			}
			
			s = s + spaceLine1 +" Hello java!" + spaceLine2 + "\r\n";
		}//next
		System.out.println( s );
	}//end main()
	
}//end class
