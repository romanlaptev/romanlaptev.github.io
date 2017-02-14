<?php
require_once ("models/" .$def_model. ".php");

//$list_tables = get_tables()
;
$params = get_main_category();
render_tpl( "main", $params );
?>
