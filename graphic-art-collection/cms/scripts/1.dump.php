<?
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";

// Извлекаем параметры из запроса
if (!isset($_REQUEST['db_name']) OR empty($_REQUEST['db_name']))
  {
	view_form_seacrh(); // вывод формы выбора параметров
  }
else // Параметр action определен
  {
	$host = $_REQUEST['host'];
	$db_user = $_REQUEST['db_user'];
	$db_name = $_REQUEST['db_name'];
	$password = $_REQUEST['password'];
	$backup_dir = $_REQUEST['backup_dir'];
	$today = date("d-m-Y_H-i");

	echo "<h2>dump database $db_name</h2>";
//$command = "mysqladmin -u".$user_db." -p".$password." version";
	$command = "mysqldump --user=".$db_user
." --password=".$password
." --database ".$db_name
." --no-create-db "
."> ".$backup_dir."/".$db_name."_".$today.".sql";

//$command = "mysqldump --user=".$db_user." --password=".$password." --database ".$db_name." | gzip > ".$backup_dir."/".$db_name."_".$today.".sql.gz";

echo $command;
echo "<br>";

	echo "<pre>";
	system($command);
	//passthru($command);
	//exec($command);

	//shell_exec ("ls -al");
	//$output = `ls -al`;
	//echo $output;

	echo "</pre>";
  }

//=================
// FUNCTIONS
//=================
//---------------------------------------------------
// ВЫВОД ФОРМЫ ПАРАМЕТРОВ 
//---------------------------------------------------
function view_form_seacrh()
{
echo"
<html>
<head>
<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />
<style>
legend
{
	color:red;
	font-size:16px;
}
</style>
</head>
<body>
<form name=form_search method=post action=".$_SERVER['PHP_SELF']." target=_blank>
	<fieldset>
	<legend><b>Database dump</b></legend>

	<div style='display:block;'>host:		
		<input type='text'  name='host' size='50' value='localhost'><br><br>
		<p>
sql302.500mb.net<br>
mysql.hostinger.ru<br>
runet_10195192<br>
runet_10193869 (limb.500mb.net)<br>
fr18091_db1<br>
		</p>
	</div>

	<div style='display:block;'>
	<p>
		db_user:	<input type='text'  name='db_user' size='50' value=''><br><br>
root<br>
u131428543_user1<br>
u131428543_user2<br>
</p>
	<p>
		db_name:	<input type='text'  name='db_name' size='50' value=''><br><br>
lib<br>
video<br>
music<br>
albums<br>
gravura<br>
photoalbum<br>
mydb<br>
runet_10195192_db1<br>
u131428543_db1<br>
u131428543_db2<br>
</p>
	<p>password:	<input type='password'  name='password' size='50' value='master'></p>
	<p>
		backup_dir:	<input type='text'  name='backup_dir' size='50' value=''><br><br>
/mnt/disk2/temp<br>
</p>
	</div>

	</fieldset>
	</div>

	<input type='hidden' name='action' value='dump'><br>
	<input type=submit value='dump'>

</form>
</body>
</html>";
} //-------------------------- end func

?>
