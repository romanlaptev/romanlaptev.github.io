<?php
//https://www.php.net/manual/ru/memcached.installation.php
error_reporting(E_ALL & ~E_NOTICE);


$moduleName = "memcached";
$loadedExt = get_loaded_extensions();

if ( !in_array( $moduleName, $loadedExt ) ) {
	$msg = "<p>-- error, $moduleName module  is not in the list of loaded extensions...</p>";
	echo $msg;
	exit;
}

echo "loaded_extensions:<pre>";
print_r( $loadedExt );
echo "</pre>";


$mc = new Memcached();
$mc->addServer("localhost", 11211);

$mc->set("foo", "Hello!");
$mc->set("bar", "Memcached...");

$arr = array(
    $mc->get("foo"),
    $mc->get("bar")
);
echo "<pre>";
print_r($arr);
echo "</pre>";

?>
