<?php
define( '_VALID_MOS', 1 );

require( '../../configuration.php' );
require_once( '../../includes/joomla.php' );
//----------------------------------
$query = "SELECT * FROM #__menu";
$database->setQuery( $query );
$rows = $database->loadObjectList();
foreach ( $rows as $row ) 
{
echo "<pre>";
print_r($row);
echo "</pre>";
}

//----------------------------------
?>
