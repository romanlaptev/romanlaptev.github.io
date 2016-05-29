<?
header('Content-type: text/xml');
header('Cache-Control: no-cache');
echo date("M d Y H:i:s\n", time());
echo ('<font color="red">'.$_SERVER['REQUEST_URI']. "</font>\n");
$x=intval($_REQUEST['x']);

$xx=$x*$x;
echo "$x&sup2;=$xx\n";
?>

