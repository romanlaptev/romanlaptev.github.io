#!/opt/usr/bin/php3
<?php
echo "Content-type: text/html\n";
echo "\n";

//echo "<pre>";
//print_r(PDO::getAvailableDrivers());
//echo "</pre>";

phpinfo ();

for ($n1=0;$n1<10;$n1++)
  {
  	echo $n1." Hello PHP world!<br>\n";
  }
?>

