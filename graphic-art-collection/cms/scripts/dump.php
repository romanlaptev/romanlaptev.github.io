<?
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";

$message="";
$form="";
$log="";

$form = view_form(); // вывод формы выбора параметров
// Извлекаем параметры из запроса
if (isset($_REQUEST['db_name']) OR !empty($_REQUEST['db_name']))
  {
	if (isset($_REQUEST['action']) OR !empty($_REQUEST['action']))
	{
// Параметр action определен
		$action = $_REQUEST['action'];

		$host = $_REQUEST['host'];
		$db_user = $_REQUEST['db_user'];
		$db_name = $_REQUEST['db_name'];
		$password = $_REQUEST['password'];
		$backup_dir = $_REQUEST['backup_dir'];
		$today = date("d-m-Y_H-i");
		$import_filename = $_REQUEST['import_filename'];

		switch ($action)
		{
//=====================================================
			case 'dump':

				$log .= "<h2>dump database $db_name</h2>";
//$command = "mysqladmin -u".$user_db." -p".$password." version";
				$command = "mysqldump --user=".$db_user
." --password=".$password
." --database ".$db_name
." --no-create-db "
."> ".$backup_dir."/".$db_name."_".$today.".sql";

//$command = "mysqldump --user=".$db_user." --password=".$password." --database ".$db_name." | gzip > ".$backup_dir."/".$db_name."_".$today.".sql.gz";

$log .= $command;
$log .= "<br>";

				$log .= "<pre>";
				system($command);
				//passthru($command);
				//exec($command);

	//shell_exec ("ls -al");
	//$output = `ls -al`;
	//echo $output;

				$log .= "</pre>";
			break;
//=====================================================
			case 'update_db':
				$log .= "<h2>update database $db_name</h2>";
				if (!empty($import_filename))
				{
					$command = "mysql --user=".$db_user
." --password=".$password
." --database ".$db_name
." < ".$import_filename;

$log .= $command;
$log .= "<br>";

					$log .= "<pre>";
					system($command);
					$log .= "</pre>";
				}
				else
				{
					$message = "<span class='error'>var import_filename is empty...</span>";
					$message .= "<br>";
				}
			break;
//=====================================================
		}//--------------------- end switch
	}//--------------------- end if
	else
	{
		$message = "<span class='error'>var action is empty...</span>";
		$message .= "<br>";
	}
  }

//=================
// FUNCTIONS
//=================
//---------------------------------------------------
// ВЫВОД ФОРМЫ ПАРАМЕТРОВ 
//---------------------------------------------------
function view_form()
{
	$form = "<form name=form_search method=post action=".$_SERVER['PHP_SELF'].">
	<fieldset>
	<legend><b>Database service</b></legend>

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
<div class='section'>
	<p>
	import_filename:<input type='text'  name='import_filename' size='50' value=''><br><br>
/var/www/sites/video/sites/default/files/video_18-11-2012_13-25.sql<br>
</p>
</div>

	<input type='radio' name='action' value='dump'>action <b>dump</b><br>
	<input type='radio' name='action' value='update_db'>action <b>update_db</b><br>
	<input type=submit value='submit'>
</form>";
	return $form;
} //-------------------------- end func

?>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<style>
legend
{
	color:green;
	font-size:16px;
}
.section
{
	border:1px solid;
	margin:20px;
	padding:5px;
	width:870px;
}
.param
{
	color:darkblue;
}
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	color:green;
}
.warning
{
	color:blue;
}
#info_message
{
	border: 1px solid;
	min-height: 30px;
/*
	background:darkred;
	position:absolute;
	top:20px;
	right:20px;
    float: right;
    width: 250px;	
*/
}
#form
{
}
#log
{
	border: 1px solid;
	min-height: 100px;
}
	</style>
</head>
<body>

<div id='info_message'><?php echo $message; ?></div>
<div id='form'><?php echo $form; ?></div>
<div id='log'><?php echo $log; ?></div>

</body>
</html>

