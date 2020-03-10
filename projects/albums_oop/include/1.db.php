<?php
$link = mysql_connect( $db_host, $db_user, $db_passwd ) or die( "<br>". mysql_error().", error connect to ".$db_host );
$db = mysql_select_db( $db_name ) or die( "<br>". mysql_error().", error select DB  ".$db_name );
?>
