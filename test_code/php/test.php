<?php
echo "Content-type: text/html\n";
echo "\n";

//echo "<pre>";
//print_r(PDO::getAvailableDrivers());
//echo "</pre>";

phpinfo ();
phpinfo(INFO_MODULES);

for ($n1=0;$n1<10;$n1++){
	echo $n1." Hello PHP world!<br>\n";
}
?>

