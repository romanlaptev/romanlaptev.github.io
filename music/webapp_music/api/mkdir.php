<?php

if( empty($_REQUEST['newfolder']) )
{
exit ("<p class='error'><b>error</b>, empty newfolder!</p>");
}
$newfolder = $_REQUEST['newfolder'];

if( empty($_REQUEST['fs_path']) )
{
exit ("<p class='error'><b>error</b>, empty fs_path!</p>");
}
$fs_path = $_REQUEST['fs_path'];

$perms = substr(sprintf('%o', fileperms($fs_path)), -4);
$newfile = $fs_path."/".$newfolder;

$log="";
if ( mkdir ($newfile,0,true) )
{
	$log .= "<p class='ok'><b>Create folder</b> $newfile </p>";
}
else
{
 	$log .= "<p class='error'><b>error</b>, cant create $newfolder in $fs_path with permissons $perms </p>";
}

echo $log;
?>
