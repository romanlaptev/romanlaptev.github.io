//https://www.tutorialspoint.com/sqlite/sqlite_java.htm
//https://www.tutlane.com/tutorial/sqlite/sqlite-java-tutorial
//javac app2.java
//java -classpath ".;../lib/sqlite-jdbc-3.8.11.2.jar" app2

import java.sql.*;
import java.io.*;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

class app2{
	
	public static void main( String args[]) {
		PrintStream out = System.out;
		out.println("SQLite demo, console application.");
		
		Connection conn = null;
		Statement stat = null;
		String dbUrl = "jdbc:sqlite:.\\db\\testdrive.db";
		List<String> records = new ArrayList<String>();			
		
		try {
			Class.forName("org.sqlite.JDBC");
			conn = DriverManager.getConnection( dbUrl );
			
			stat = conn.createStatement();
			// stat = conn.createStatement( 
// ResultSet.TYPE_SCROLL_INSENSITIVE, 
// ResultSet.CONCUR_READ_ONLY );
			ResultSet rs = stat.executeQuery("select * from tbl_user;");
			
			//Get number of records (not work in SQLite!!!)
			// int size = 0;
			// try {
				// rs.last();
				// size = rs.getRow();
				// rs.beforeFirst();
			// } catch(Exception ex) {
				// ex.printStackTrace();
				// System.exit(0);
			// } finally {
// out.println("Number of records: " + size);
			// }			
			
			while ( rs.next() ) {
				String dbRecord = "{";
				dbRecord += " \"id\" : \"" + rs.getString("id") + "\", ";
				dbRecord += "\"username\" : \"" + rs.getString("username") + "\" , ";
				dbRecord += "\"password\" : \"" + rs.getString("password") + "\" , ";
				dbRecord += "\"email\" : \"" + rs.getString("email") + "\"";
				dbRecord += "}";
				records.add( dbRecord );
			}//next
			
			rs.close();
			stat.close();
			conn.close();
			
		} catch ( Exception e ) {
			//System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			e.printStackTrace();
			System.exit(0);
		}
		
//out.println( Arrays.asList( records ) );
//out.println ("Size of records: " + Integer.valueOf ( records.size() ) );		
		String jsonStr = "[";
		for( int n = 0; n < records.size(); n++){
			if( n > 0){
				jsonStr += ",\r\n";
			}
			jsonStr += records.get(n);
		}//next
		jsonStr += "] ";
out.println( jsonStr );
		
		//save to file
		String filename = "export.json";
		File fw = new File( filename );
		try( FileOutputStream fos = new FileOutputStream( fw ) )	{
			byte[] buffer = jsonStr.getBytes();
			fos.write(buffer, 0, buffer.length);
			fos.close();
		}
		catch(IOException ex){
			//out.println(ex.getMessage());
			ex.printStackTrace();
		}
		
		out.println("Export data done successfully");		
	}//end main
	
}//end class