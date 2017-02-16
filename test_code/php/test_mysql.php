<?php
error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
?>

<DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, inital-scale=1.0">
	<link rel="stylesheet" href="/css/bootstrap335.min.css">
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h1>test MySQL connect...</h1>
		</div>
		
		<div class="panel">
			<div class="panel-body">
				<div>PHP_VERSION:
<?php
//echo phpversion();
echo PHP_VERSION;
?>
				</div>
				<div>PHP_OS:<?php echo PHP_OS;?></div>
			</div>
		<div>
		
		<pre>
http://php.net/manual/ru/function.mysql-db-query.php
http://php.net/manual/ru/mysqli.select-db.php
		</pre>

<?php
//beta.hut2.ru
//$server = "database";
//$username = "beta8";
//$password = "O4AtmRKe";

//catblack.h19.ru
//$server = "localhost";
//$username = "catblac8";
//$password = "master";

//roman-laptev.hut1.ru
//$server = "database.agava.ru";
//$username = "romanla";
//$password = "master";

//catblack.co.cc
//$server = "localhost";
//$username = "user_acc2";
//$password = "master";

//blackcat.px6.ru
//$server = "sql-4.ayola.net";
//$username = "blackcat608";
//$password = "sck7aklskg";
//$base =  "blackcat608";

//$server = "mysql.royaltee.mass.hc.ru:3306";
//$username = "royaltee_rk";
//$password = "kj3f5surn";
//$base =  "wwwroyalkidsru_rk";

//$server = "91.226.93.8:3306";
//$username = "dostup_user";
//$password = "dostup";

//gravura.ts6.ru
//$server = "sql-4.ayola.net";
//$username = "gravura619";
//$password = "sijnic3ra6";

//limb.me.pn
//$server = "fdb2.eu.pn:3306";
//$username = "1032442_db1";
//$password = "gfccword";

//limb.500mb.net
//$server = "sql104.500mb.net";
//$username = "runet_10193869";
//$password="w0rdpass";
//$password = "jocker";
//$db_url = 'mysqli://runet_10193869:jocker@localhost/runet_10193869_db2 ';

//blackcat.500mb.net
//$server="sql302.500mb.net";
//$username="runet_10195192";
//$password="w0rdpass";

//it-works.16mb.com
//$server="mysql.hostinger.ru";
//$username="u131428543_user1";
//$password="m2ster";


$host = "localhost";
$user = "root";
$password = "master";
$db_name = "mysql";

$link = mysql_connect($host, $user, $password) or die( "Сервер базы данных не доступен" );

$list = "<ul>";
$db_list = mysql_list_dbs ($link);
while ($row = mysql_fetch_object($db_list)){
	$list .= "<ol>".$row->Database."</ol>";
}
$list .= "</ul>";

//$db = mysql_select_db($db_name) or die( "База данных не доступна" );
mysql_close ($link);

?>
		
<div class="panel panel-primary">
	<div class="panel-heading">
Connect to <?php echo $host ?>
	</div>
	<div class="panel-body">
		Database list:<?php echo $list; ?>
	</div>  
</div>
		
		<pre>test mysqli_connect:
<?
printf("mysqli_get_client_info: %s\n", mysqli_get_client_info());
$link = mysqli_connect( $host, $user, $password, $db_name);
echo $link;


if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

?>
		</pre>
	</div><!-- end container -->
</body>
</html>