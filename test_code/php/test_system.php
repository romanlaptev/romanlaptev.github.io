<?php
//http://php.net/manual/ru/function.system.php

//Warning: system() has been disabled for security reasons in /home/u131428543/public_html/php/test_system.php on line 23
//Warning: passthru() has been disabled for security reasons in /home/u131428543/public_html/php/test_system.php on line 22
//Warning: exec() has been disabled for security reasons in /home/u131428543/public_html/php/test_system.php on line 24
//Warning: shell_exec() has been disabled for security reasons in /home/u131428543/public_html/php/test_system.php on line 26

echo "<h2>Test run shell command</h2>";
echo "<h3>system(), passthru(), exec(), shell_exec()</h3>";

$list_disabled_functions = ini_get('disable_functions'); 
echo "List diasbled functions: ".$list_disabled_functions;
echo "<br>";
echo "<br>";


//$host="sql302.500mb.net";
//$user_db="runet_10195192";
//$password="w0rdpass";
//$db_name="runet_10195192_db1";

//limb.500mb.net
//$host = "sql104.500mb.net";
//$user_db = "runet_10193869";
//$password = "w0rdpass";

//$user_db="fr18091_db1";
//$password="m@ster";
//$host="mysql.hostinger.ru";

//$user_db="u131428543_user1";
//$password="m2ster";
//$db_name="u131428543_db1";

//$command = "mysqladmin -u".$user_db." -p".$password." version";
//$command = "mysqldump --user=".$user_db." --password=".$password." --database ".$db_name." > ".$backup_dir."/".$db_name."_".$DATE.".sql";
$command = "ls ./";
//$command = "ls /";

echo "Command: ".$command;
echo "<br>";
echo "<pre>";

system($command,$code);
//passthru($command,$code);

//$last_line = exec($command, $res);
//echo "<pre>";
//print_r($res);
//echo "</pre>";
//echo $last_line;

//$output = shell_exec ($command);
//echo $output;

//$res = pcntl_exec("/bin/sh", array("ls ./"), []);
if (function_exists("pcntl_exec")) {
    $res = pcntl_exec("/bin/bash", array("ls"));
} else {
	die("function pcntl_exec() not exists");
}
echo $res;

echo "</pre>";

echo "error code: $code";
echo "<br>";
?>
