using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Text.RegularExpressions;
using System.Data;
using System.Data.Common;
using System.IO;


namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
		protected void cmdEcho_Click(object Source, EventArgs e)
		{
			//string filepath = "c:\\temp\\";
			string filepath = Server.MapPath( txtFileName.Text + ".txt");
			lblGreeting.Text="Create file " + filepath; 

			//FileInfo f1 = new FileInfo(filepath + txtFileName.Text + ".txt");
			//f1.Create();			
			
			StreamWriter sw1 = new StreamWriter(filepath);
			sw1.WriteLine("test_write");
			sw1.Close();

			StreamWriter sw2;
			FileInfo f2 = new FileInfo(filepath);
			sw2 = f2.AppendText();
			sw2.WriteLine("test_append");
			sw2.Close();
		}
		
	}//----------------------- end class
}//----------------------- end namespace

//System.IO.File.Delete(@"C:\MyFile");

//http://www.cyberforum.ru/csharp-beginners/thread281355.html
//http://csharpprogramming.ru/uroki-po-c/c-kak-pereimenovat-fajl
//File.Move(@"C:\ff\Текстовый документ.txt", @"C:\ff\0.txt");

//System.IO.Directory.CreateDirectory("temp");
//http://www.cyberforum.ru/csharp-beginners/thread442779.html

//http://kbss.ru/blog/lang_c_sharp/57.html
//Копирование папки с вложениями на C#

//http://professorweb.ru/my/csharp/thread_and_files/level3/3_6.php

//System.IO.File.Move(@"C:\test\test_00*",@"C:\test\";