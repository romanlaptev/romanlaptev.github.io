//https://www.tutorialspoint.com/sqlite/sqlite_java.htm
//https://www.tutlane.com/tutorial/sqlite/sqlite-java-tutorial
//javac appConsole.java
//java -classpath ".;../lib/sqlite-jdbc-3.8.11.2.jar" appConsole
import java.sql.*;
//import org.sqlite.*;

class appConsole{

	public static void main( String args[]) {
		System.out.println("SQLite demo, console application.");
		
		Connection conn = null;
		Statement stat = null;
		
		try {
			Class.forName("org.sqlite.JDBC");
			conn = DriverManager.getConnection("jdbc:sqlite:.\\db\\testdrive.db");
			stat = conn.createStatement();
			ResultSet rs = stat.executeQuery("select * from tbl_user;");

			while ( rs.next() ) {
				System.out.println( "id:" + rs.getString("id") );
				System.out.println( "username:" + rs.getString("username") );
				System.out.println( "password:" + rs.getString("password") );
				System.out.println( "email:" + rs.getString("email") );
				System.out.println("===================");
			}//next
			
			rs.close();
			stat.close();
			conn.close();
			
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		//System.out.println("Opened database successfully");
		System.out.println("Operation done successfully");		
		
	}//end main
	
}//end class