//http://java-online.ru/java-class.xhtml
//import java.io.*;
import java.util.*;

class TestClass {
	
	public static void main( String[] args){
		
		//use static(!) variable without creating object
		System.out.println("Static variable: " + Book.staticVar);

		//create object1
		Book book;
		book = new Book();
		
		//use method
		book.getInfo();
		
		//create object2
		Book book2;
		book2 = new Book("Alice in Wonderland", "Lewis Carroll", 1865);
		book2.getInfo();
		
		// book = null;
		// book2 = null;
	}//end main()

}//end class

class Book {
	public String name;
	public String author;
	public int year;
	
	static int staticVar = 2;
	
	//constructor 1 (create object without parameters)
	Book(){
		this.name = "none";
		this.author = "none";
		this.year = 0;
	}
	
	//constructor 2 (create object with input parameters)
	Book( String _name, String _author, int _year){
		name = _name;
		author = _author;
		year = _year;
	}
	
	//init block
	// {
		// name = "no name";
		// author = "anonymous";
		// year = 0;
	// }
	
	public void getInfo(){
		System.out.printf("Book name: '%s', author: '%s', year: '%d' \n", name, author, year);
	}//end getInfo()
	
	// protected void finalize() throws Throwable{
		// System.out.println("this is the end...destroy object....");
	// }//end finalize()
	
}//end class
