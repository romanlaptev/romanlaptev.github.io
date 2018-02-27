<?php
echo "getcwd = ".getcwd();
echo "<hr>";
echo "__FILE__ = ".__FILE__;
echo "<hr>";
echo "__DIR__ = ".__DIR__;
echo "<hr>";
echo "dirname(__FILE__) = ".dirname(__FILE__);
echo "<hr>";


echo "<pre>";
//http://php.net/manual/ru/function.ini-get-all.php
print_r(ini_get_all());
echo "</pre>";
echo '<hr>';

echo "<pre>";
foreach (getallheaders() as $name => $value)
{
	echo $name.": ".$value."<br>\n";
}

echo "</pre>";
echo "<hr>";

echo "<h1>headers_list</h1>";
$arr=headers_list();
echo "<pre>";
print_r($arr);
echo "</pre>";
echo "<hr>";

echo "<h1> Server variables </h1>";
echo "<pre>\n";

echo "<h2>GLOBALS</h2>\n";
print_r ($GLOBALS);
echo "<hr>\n";

echo "<h2>SERVER</h2>\n";
print_r ($_SERVER);
echo "<hr>\n";

echo "<h2>REQUEST</h2>\n";
print_r ($_REQUEST);
echo "<hr>\n";

echo "<h2>GET</h2>\n";
print_r ($_GET);
echo "<hr>\n";

echo "<h2>POST</h2>\n";
print_r ($_POST);
echo "<hr>\n";

echo "<h2>COOKIE</h2>\n";
print_r ($_COOKIE);
echo "<hr>\n";

echo "<h2>SESSION</h2>\n";
print_r ($_SESSION);
echo "<hr>\n";

echo "<h2>FILES</h2>\n";
print_r ($_FILES);
echo "<hr>\n";

echo "<h2>ENV</h2>\n";
print_r ($_ENV);
echo "<hr>\n";

echo "</pre>";

echo "<hr>";

phpinfo();
?>
