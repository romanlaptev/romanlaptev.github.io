<?php
//echo shell_exec("/usr/bin/sudo /sbin/service ".$_GET["cmd"]);

//$output = shell_exec("ls -lart");
//echo "<pre>$output</pre>";

echo exec('ls /usr/local/php/bin');
echo '<pre>';
$last_line=system('ls /');
echo "Last line of the output: " . $last_line ;
echo '</pre>';
system('ls '.escapeshellarg('/usr/local/php/bin'));

// Outputs all the result of shellcommand "ls", and returns
// the last output line into $last_line. Stores the return value
// of the shell command in $retval.

//echo '<pre>';
//..$last_line = system('ls', $retval);

// Printing additional info
//echo '
//</pre>
//<hr />Last line of the output: ' . $last_line . '
//<hr />Return value: ' . $retval

?>

