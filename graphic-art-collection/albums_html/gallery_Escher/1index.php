<?php
/*
$page=$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
$vizit_date = date ("l dS of F Y h:i:s A");
$buffer = $vizit_date.", ".$_SERVER["REMOTE_ADDR"].", ".$page."\n";
//echo $buffer;

if (file_exists($_SERVER['DOCUMENT_ROOT']."/pages/log"))
  {
	$filename=$_SERVER['DOCUMENT_ROOT']."/pages/log/visits.txt";
	// Открыть файл для дозаписи и чтения данных;
	// данные будут записываться в конец файла
	$file = fopen ($filename,"a+");
	if ( $file )
	  {
	   fwrite ($file, $buffer);
	  }
	fclose ($file); 
}
*/
?>
<html>
<head>
	<meta http-equiv='refresh' content='0; url=page-01.html'>
</head>
<body>

</body>
</html>
