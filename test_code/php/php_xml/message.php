<?php
	echo "<pre>";
	//print_r ($_SERVER);
	print_r ($_REQUEST);
	echo "</pre>";

	$message_file='message.xml'; 
	$filename=$_SERVER['DOCUMENT_ROOT']."/temp/".$message_file;
	echo "<a href='http://".$_SERVER['HTTP_HOST']."/temp/".$message_file."' target=blank>view message.xml</a><br/>";
?>

<html>
<head><title>message: admins functions</title></head>
<body>

	<div id="menu">
		<ul>
			<!-- <li><a href="message.php?action=add">add message</a></li> -->
			<li><a href="message.php?action=remove_message">remove message</a></li>
			<li><a href="message.php?action=edit_message">edit message</a></li>
			<li><a href="message.php?action=remove_file">remove file</a></li>
		</ul>
	</div>

	<div id="textbox">
<?php
//=======
// MAIN
//=======
//----------------------------------
// Вывод файла сообщений
//----------------------------------
if (file_exists($filename))
 {
	$textbox = file_get_contents ($filename);
	echo $textbox;
 }
else
 {
	$file = fopen ($filename,"a+");
	if ($file)
	  {
		$xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
		$xml .= "<list>\n";
		$xml .= "</list>\n";
		fwrite ($file, $xml);
	  }
	fclose ($file); 
 }

//----------------------------------
// Add message form	  
//----------------------------------
echo "<form method=post action=".$_SERVER['SCRIPT_NAME'].">
<textarea name='message' rows=10 cols=60>
test
</textarea>
<input type='hidden' name='action' value='save_message'>
<input type='submit' value='save'>
</form>";

if ($_REQUEST['action']=='save_message')
{
	echo "save message";
//****************************************
// Извлекаем параметры из запроса
//****************************************
	if (isset($_REQUEST['message']))
	  {
		$message =$_REQUEST['message']; 
//echo $message;
		}
	else
	  {
		echo "<font color=\"red\"><h2> message undefined... </h2></font>";
		exit ();
	  }

	$file = fopen ($filename,"a+");
	if ($file)
	  {
		$xml = "\t<message>\n";
		$xml .= $message;
		$xml .= "\t</message>\n";
		$xml .= "</list>\n";
	
		fwrite ($file,$xml);
	  }
	fclose ($file); 
}//----------------------------- end if action

if ($_REQUEST['action']=='remove_message')
{
	echo "remove message";
}

if ($_REQUEST['action']=='edit_message')
{
	echo "edit message";
}

if ($_REQUEST['action']=='remove_file')
{
	if (unlink($filename))
	  {
		echo "<font color='red'><b>remove<b></font>".$filename;
	  }
}
?>
	</div>
</body>
<html>
