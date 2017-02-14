<?php
	$host = "localhost";
	$user = "fr18091_db1";
	$password = "m@ster";
	$db_name = "fr18091_db1";
	$link = mysql_connect($host, $user, $password) or die( "Сервер базы данных не доступен" );
	if ($link)
	{
		//mysql_query('SET NAMES utf8');
		mysql_set_charset("utf8", $link);
		$charset = mysql_client_encoding($link);
		printf ("current character set is %s\n", $charset);
	}
	$db = mysql_select_db($db_name) or die( "База данных не доступна" );
	$tables = "SHOW TABLES";
	$res = mysql_query($tables) or die( "Ошибка при выполнении запроса: ".mysql_error() );
?>
