//http://java-online.ru/java-class.xhtml
//import java.io.*;
import java.util.*;

class TestClass {
	
	public static void main( String[] args){
		
		//create object1
		Book book;
		book = new Book();
		
		//use method
		book.getInfo();
		
		//create object2
		Book book2;
		book2 = new Book("Alice in Wonderland", "Lewis Carroll", 1865);
		book2.getInfo();
		
	}//end main()

}//end class

class Book {
	public String name;
	public String author;
	public int year;

	//constructor 1
	Book(){
		this.name = "none";
		this.author = "none";
		this.year = 0;
	}
	
	//constructor 2
	Book( String _name, String _author, int _year){
		name = _name;
		author = _author;
		year = _year;
	}
	
	public void getInfo(){
		System.out.printf("Book name: '%s', author: '%s', year: '%d' \n", name, author, year);
	}//end getInfo()
	
}//end class
