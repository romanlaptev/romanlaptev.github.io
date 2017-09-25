/* файл Connect.java */
/*
http://j2w.blogspot.ru/2008/01/mysql-jdbc.html
http://forum.vingrad.ru/topic-154042.html

javac.exe mySQLconnect.java
java -classpath .;"lib\mysql-connector-java-5.1.44-bin.jar" mySQLconnect
*/
import java.io.*;
import java.sql.*;
public class mySQLconnect
{
	public static void main (String[] args)
	{
		Connection conn = null;
		try
		{
			String userName = "root";
			String password = "master";
			String url = "jdbc:mysql://localhost/test";
			Class.forName ("com.mysql.jdbc.Driver").newInstance ();
			conn = DriverManager.getConnection (url, userName, password);
			System.out.println ("Database connection established");
		}
		catch (Exception e)
		{
			System.err.println ("Cannot connect to database server");
			e.printStackTrace();
		}
		finally
		{
			if (conn != null)
			{
				try
				{
					conn.close ();
					System.out.println ("Database connection terminated");
				}
					catch (Exception e) { }
				}
		}
		
	}//end main
}//end class
