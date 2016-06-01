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
	
		protected void Page_Load(object sender, EventArgs e)
		{
		
			if( Request.QueryString["file"] == null )
			{
				Response.Write("error, empty file!");
				return;
			}
			string file = Request.QueryString["file"];
			
			if( Request.QueryString["src_path"] == null )
			{
				Response.Write("error, empty src_path!");
				return;
			}
			string src_path = Request.QueryString["src_path"];
			
			if( Request.QueryString["dst_path"] == null )
			{
				Response.Write("error, empty dst_path!");
				return;
			}
			string dst_path = Request.QueryString["dst_path"];
			
			int move_files = 0;
			if( Request.QueryString["move_files"] != null )
			{
				move_files = 1;
			}
//============================================			
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
							Response.Write ( "move dir " + src_filename + " to " +dst_filename+"<br>"); 
							DirectoryCopy( src_filename, dst_filename, true);
							Directory.Delete ( src_filename, true );
						}
						else//copy dirs
						{
							Response.Write ( "copy dir " + src_filename + " to " +dst_filename+"<br>"); 
							// Copy from the current directory, include subdirectories.
							DirectoryCopy( src_filename, dst_filename, true);
						}
					}
					catch (Exception ex)
					{
						Response.Write(ex.Message);
					}			
				}			
				else
				{
				
					if( move_files == 1 )//move files
					{
						if (!File.Exists( dst_filename ) )	
						{
							Response.Write ( "move file " + src_filename + " to " +dst_filename+"<br>"); 
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
							Response.Write ( "copy file " + src_filename + " to " +dst_filename+"<br>"); 
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