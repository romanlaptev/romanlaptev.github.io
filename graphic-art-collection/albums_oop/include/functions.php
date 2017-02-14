<?php

function render_tpl( $tpl_name, $params )
{
	global $config;
	require_once ("views/" .$tpl_name. ".tpl.php");
}

?>
