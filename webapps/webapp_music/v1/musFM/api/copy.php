<?php
//echo "<pre>";
//print_r($_REQUEST);
//echo "</pre>";

if( empty($_REQUEST['file']) )
{
exit ("error, empty file!");
}

if( empty($_REQUEST['src_path']) )
{
exit ("error, empty src_path!");
}

if( empty($_REQUEST['dst_path']) )
{
exit ("error, empty dst_path!");
}

if( !empty($_REQUEST['move_files']) )
{
	$move_files = 1;
}

$file = $_REQUEST['file'];
$src_path = $_REQUEST['src_path'];
$dst_path = $_REQUEST['dst_path'];


$log="";
for ($n1=0; $n1 < count($file); $n1++)
{
	$src_filename = $src_path."/".$file[$n1];
	$dst_filename = $dst_path."/".$file[$n1];

	if (is_dir($src_filename))
	{
		$log .= CopyTree($src_filename, $dst_filename);
	}


	if (is_file($src_filename))
	{
		if (copy ($src_filename, $dst_filename))
		  {
			$log .= "<div class='ok'>copy $src_filename >> $dst_filename </div>\n";
		  }
		else
		 	$log .= "<div class='error'>copy error $src_filename </div>\n";
	}

}

if ($move_files == 1)
{
	for ($n1=0; $n1 < count($file); $n1++)
	{
		$filename = $src_path."/".$file[$n1];

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


	}//---------------------- end for

}
echo $log;
//------------------------------------------

function CopyTree($src_dir, $dst_dir) 
{ 
	$log="";
	$handle = opendir($src_dir) or die("Can't open directory $src_dir"); 

	if (mkdir($dst_dir))
	{
		$log .= "<div class='ok'><b>mkdir</b> empty folder $dst_dir</div>\n";
	}

	while (false !== ($file = readdir($handle))) 
	{ 
		if ($file != "." && $file != "..") 
		{ 
			$src_filename = $src_dir."/".$file;
			$dst_filename = $dst_dir."/".$file;

			if (is_dir($src_filename))
			{
				$log .= CopyTree($src_filename, $dst_filename);
			}

			if (is_file($src_filename))
			{
				if (copy ($src_filename, $dst_filename))
				  {
					$log .= "<div class='ok'><b>copy</b> $src_filename >> $dst_filename </div>\n";
				  }
				else
				 	$log .= "<div class='error'>copy error $src_filename </div>\n";
			}

		} 

	
	} 
	closedir($handle); 
	
	return $log;
}//--------------------- end func

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
