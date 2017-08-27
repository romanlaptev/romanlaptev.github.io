using System;
using System.IO;

namespace myspace
{
    public partial class Default : System.Web.UI.Page
    {
	
		protected void Page_Load(object sender, EventArgs e)
		{
/*
			foreach ( string x in Request.Form )
			{
				Response.Write ( "<b>Request.Form["+x + "]</b> = " + Request.Form[x]); 
				Response.Write ( "<br>"); 
			}
*/
			string src_path="";
			string dst_path="";
			string[] files = null;
			int move_files = 0;
			if ( Request.HttpMethod == "POST" )
			{
				src_path = Request.Form["src_path"];
				dst_path = Request.Form["dst_path"];
				files = Request.Form.GetValues("file[]");
				if ( Request.Form["move_files"] == "1")
				{
					move_files = 1;
				}
			}
			else
			{
				Response.Write("<p class='error'><b>error</b>, need <b>POST query</b> !</p>");
				return;
			}
			
			if( src_path.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>src_path</b> value!</p>");
				return;
			}
			if( dst_path.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>dst_path</b> value!</p>");
				return;
			}
			if( files.Length == 0 )
			{
				Response.Write("<p class='error'><b>error</b>, empty <b>files</b> value!</p>");
				return;
			}
//============================================			

			foreach ( string file in files)
			{
				string src_filename = src_path + "\\" +file;
				string dst_filename = dst_path + "\\" + file;
				try
				{
					FileAttributes attr = File.GetAttributes( @src_filename );
					if((attr & FileAttributes.Directory) == FileAttributes.Directory)
					{
						try
						{
							if( move_files == 1 )//move dirs
							{
								Response.Write ( "<b>move dir</b> " + src_filename + " to " +dst_filename+"<br>"); 
								DirectoryCopy( src_filename, dst_filename, true);
								Directory.Delete ( src_filename, true );
							}
							else//copy dirs
							{
								Response.Write ( "<b>copy dir</b> " + src_filename + " to " +dst_filename+"<br>"); 
								// Copy from the current directory, include subdirectories.
								DirectoryCopy( src_filename, dst_filename, true);
							}
						}
						catch (Exception ex)
						{
							Response.Write("<p class='error'>"+ex.Message+"</p>");
						}			
					}			
					else
					{
					
						if( move_files == 1 )//move files
						{
							if (!File.Exists( dst_filename ) )	
							{
								Response.Write ( "<b>move file</b> " + src_filename + " to " +dst_filename+"<br>"); 
								File.Move( src_filename, dst_filename );
							}
							else
							{
								Response.Write ( "error, " +dst_filename+" is exists<br>"); 
							}
							
						}
						else// copy files
						{
						
							try
							{
								Response.Write ( "<b>copy file</b> " + src_filename + " to " +dst_filename+"<br>"); 
								File.Copy( src_filename, dst_filename, false);
							}
							catch (IOException copyError)
							//catch (Exception ex)
							{
								Response.Write(copyError.Message);
								//Response.Write(ex.Message);
							}					
							
						}
					}			

				}
				catch (Exception ex)
				{
					Response.Write(ex.Message);
				}			
			}//--------------------- end foreach
 
		}//------------------------------------- end func


		private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
		{
			// Get the subdirectories for the specified directory.
			DirectoryInfo dir = new DirectoryInfo(sourceDirName);
			DirectoryInfo[] dirs = dir.GetDirectories();

			if (!dir.Exists)
			{
				throw new DirectoryNotFoundException(
					"Source directory does not exist or could not be found: "
					+ sourceDirName);
			}

			// If the destination directory doesn't exist, create it.
			if (!Directory.Exists(destDirName))
			{
				Directory.CreateDirectory(destDirName);
			}

			// Get the files in the directory and copy them to the new location.
			FileInfo[] files = dir.GetFiles();
			foreach (FileInfo file in files)
			{
				string temppath = Path.Combine(destDirName, file.Name);
				file.CopyTo(temppath, false);
			}

			// If copying subdirectories, copy them and their contents to new location.
			if (copySubDirs)
			{
				foreach (DirectoryInfo subdir in dirs)
				{
					string temppath = Path.Combine(destDirName, subdir.Name);
					DirectoryCopy(subdir.FullName, temppath, copySubDirs);
				}
			}
			
		}//------------------------------------- end func
	
	}//----------------------- end class
}//----------------------- end namespace