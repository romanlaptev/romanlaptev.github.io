<?php
$link = mysql_connect( $db_host, $db_user, $db_passwd ) or die( "<br>". mysql_error().", error connect to ".$db_host );

mysql_set_charset("utf8", $link);
//mysql_query('SET NAMES utf8');
//mysql_query("SET CHARACTER_SET_CLIENT=utf8");
//mysql_query("SET CHARACTER_SET_CONNECTION=utf8");
//$charset = mysql_client_encoding($link);
//printf ("current character set is %s\n", $charset);

$db = mysql_select_db( $db_name ) or die( "<br>". mysql_error().", error select DB  ".$db_name );
?>
