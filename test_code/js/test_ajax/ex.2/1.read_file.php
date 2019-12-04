
<?
/*
header('Content-type: text/xml');
header('Cache-Control: no-cache');
echo date("M d Y H:i:s\n", time());
echo ('<font color="red">'.$_SERVER['REQUEST_URI']. "</font>\n");
$x=intval($_REQUEST['x']);

$xx=$x*$x;
echo "$x&sup2;=$xx\n";
*/
//echo ("<pre>");
//print_r ($_REQUEST);
//echo ("</pre>");

	//$filename='test.csv';
	$filename=$_REQUEST['filename'];
	$data = file_get_contents($filename);
echo $data;

?>


