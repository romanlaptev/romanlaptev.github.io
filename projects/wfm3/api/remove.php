<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

if( empty($_REQUEST['file']) )
{
exit ("error, empty file!");
}

if( empty($_REQUEST['fs_path']) )
{
exit ("error, empty fs_path!");
}

$file = $_REQUEST['file'];
$fs_path = $_REQUEST['fs_path'];


$log="";
for ($n1=0; $n1 < count($file); $n1++)
{
	$filename = $fs_path."/".$file[$n1];

	if (is_dir($filename))
	{
		if (rmdir($filename))
		  {
			$log .= "<div class='ok'>rmdir empty folder $filename</div>\n";
		  }
		else
		{
			$res=false;
			$res=RemoveTree($filename);
			if ($res)
			{
				$log .= "<div class='ok'><b>remove</b> tree $filename</div>\n";
			}
			else
				$log .= "<div class='error'>cant rmdir $filename</div>\n";
		}
	}

	if (is_file($filename))
	{
		if (unlink ($filename))
		  {
			$log .= "<div class='ok'><b>unlink $filename</div>\n";
		  }
		else
		 	$log .= "<div class='error'>cant unlink $filename </div>\n";
	}


}
echo $log;
//------------------------------------------

function RemoveTree($dir) 
{ 
	$handle = opendir($dir) or die("Can't open directory $dir"); 
	while (false !== ($file = readdir($handle))) 
	{ 
		if ($file != "." && $file != "..") 
		{ 
			if(is_file($dir."/".$file)) 
			{ 
				if(unlink($dir."/".$file)) 
				{
echo "<div class='ok'>unlink $file</div>";
				} 
			} 
			if(is_dir($dir."/".$file)) 
			{ 
				RemoveTree($dir."/".$file);
				if(rmdir($dir."/".$file))
				{
echo "<div class='ok'>rmdir $file</div>";
				} 
			} 
			
		} 
	} 
	closedir($handle); 
	
	if(rmdir($dir))
	{
echo "<div class='ok'>rmdir $file</div>";
		return true;
	} 
}//--------------------- end func

?>
