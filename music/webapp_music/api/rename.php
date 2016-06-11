<?php

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

$oldfile = $fs_path."/".$file[0];
$newfile = $fs_path."/".$file[1];

$log="";
if (rename ($oldfile,$newfile))
  {
	$log .= "<div class='ok'>Rename $oldfile to $newfile </div>\n";
  }
else
 	$log .= "<div class='error'>cant rename $oldfile </div>\n";


echo $log;

?>
