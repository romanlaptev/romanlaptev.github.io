<?
//Требуется создать скрипт на языке PHP, который должен:
//Создать таблицу в MySQL под данную структуру файла.
//Все данные из CSV-файла экспортировать в созданную таблицу.
//Данные в поле "Зарегистрирован" должны храниться в формате INT.
//После полного экспорта данных в таблицу изменить для одной случайной записи в таблице статус на противоположный и вывести эту запись на экран. 
//При этом данные этой записи должны выводиться в том же виде, в каком они были получены из CSV-файла.
//Файл csv необходимо загружать посредством ajax. Все должно отработать без перезагрузки страницы.
//------------------------------------------------------------------------------------------
echo "<pre>";
print_r($_REQUEST);
echo "</pre>";

if (!isset($_REQUEST['action']) OR empty($_REQUEST['action']))
  {
	view_form(); // вывод формы
  }
else // Параметр action определен
  {
	$action = $_REQUEST['action'];
	switch ($action)
	  {
		case export:  //Создать таблицу в MySQL под данную структуру файла.

			$server = $_REQUEST['server'];
			$username = $_REQUEST['username'];
			$password = $_REQUEST['password'];

			$db = mysql_connect($server, $username, $password);
			if($db) 
			  {
				echo "<br><font color=green>Connect to the </font>".$server;
				echo "<br>";
				$query = "CREATE DATABASE IF NOT EXISTS `test_db`";
				$result = mysql_query($query);
//echo $result;
				if ($result)
				  {
					$query = "CREATE TABLE IF NOT EXISTS `test_db`.`table1` (
`fio` VARCHAR( 60 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`mail` VARCHAR( 64 ) NOT NULL ,
`birthday` INT( 11 ) NOT NULL ,
`joined` INT( 11 ) NOT NULL ,
`status` TINYINT( 1 ) NOT NULL DEFAULT '0'
) ENGINE = MYISAM ;";
					$result = mysql_query($query);
				  }
				mysql_close($db);
			  }
			else
			  {
				echo "<br><font color=red>Dont connect to the  </font>".$server;
				echo "<br>";
			  }
		break;
	  }//------------------------------ end switch

  }//--------------------------------- end elseif action

//====================
// FUNCTIONS
//====================
function view_form()
{
echo"
<html>
<head>
<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />
</head>
<body>

<form name=form_export method=post action=".$_SERVER['PHP_SELF']." target=_blank>
	<fieldset>
		<legend><b>Export CSV</b></legend>
		mysql server: <input type='text'  name='server' size='10'	value='localhost'>
		username: <input type='text'  name='username' size='10' 	value='root'>
		password: <input type='password'  name='password' size='10' 	value='master'>
		 <input type='hidden' name='action' value='export'>
		<input type=submit value='export'>
	</fieldset>
</form>

</body>
</html>";

} //-------------------------- end func

?>

