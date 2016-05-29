//http://code-inside.net/file-operations/
//C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\csc.exe  /target:exe hello.c
using System;
using System.IO;
namespace Example
{

class Program
  {

    static void Main()
     {
		Console.WriteLine("Test filesystem action");
		//Console.ReadLine();
		FileInfo f1 = new FileInfo("new.txt");
		f1.Create();	 

		StreamWriter sw1 = new StreamWriter("test_write.txt");
        sw1.WriteLine("test_write");
        sw1.Close();
		
		StreamWriter sw2;
        FileInfo f2 = new FileInfo("test_write.txt");
        sw2 = f2.AppendText();
        sw2.WriteLine("blablabla");
        sw2.Close();		
     }

  }

}


