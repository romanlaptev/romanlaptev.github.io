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

//$today=mktime (0, 0, 0, 3, 29, 2012);
//echo $today;
//echo "<br>";

//$today2 = date("H:i:s, d.m.Y",$today);
//echo $today2;
//echo "<br>";

if (isset($_REQUEST['action']) OR empty($_REQUEST['action']))
  {
	$action = $_REQUEST['action'];
	switch ($action)
	  {
		case export:  //Создать таблицу в MySQL под данную структуру файла.
//----------------------------------------------------------------------------------------------
			$server = $_REQUEST['server'];
			$username = $_REQUEST['username'];
			$password = $_REQUEST['password'];
			$db_name = 'test_db';
			$table_name = 'table1';
			$filename=$_REQUEST['filename'];

//----------------------------------------------------------------------------------------------
			$db = mysql_connect($server, $username, $password);
			if($db) 
			  {
				//$query = "SET NAMES 'utf8'";
				//$result = mysql_query($query);
				mysql_set_charset("utf8");

				echo "<br><font color=green>Connect to the </font>".$server;
				echo "<br>";
				$query = "CREATE DATABASE IF NOT EXISTS `".$db_name."`";
				$result = mysql_query($query);
				mysql_select_db($db_name);

				$query = "CREATE TABLE IF NOT EXISTS `test_db`.`".$table_name."` (
`fio` VARCHAR( 60 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`mail` VARCHAR( 64 ) NOT NULL ,
`birthday` VARCHAR( 10 ) NOT NULL ,
`joined` INT( 11 ) NOT NULL ,
`status` varchar(3) NOT NULL DEFAULT 'Off'
) ENGINE = MYISAM ;";
				$result = mysql_query($query);
//----------------------------------------------------------------------------------------------
				$csv_data = file($filename);
//echo "<pre>";
//print_r($csv_data);
//echo "</pre>";
				//Все данные из CSV-файла экспортировать в созданную таблицу.
				for ($n2=1; $n2<count($csv_data); $n2++)
				  {
					$fields = explode(";", $csv_data[$n2]);
//echo "<pre>";
//print_r($fields);
//echo "</pre>";
					$line="";
/*
					for ($n1=0; $n1<count($fields); $n1++)
					  {
						if ($n1==(count($fields)-1))
						  {
							$line .="'".$fields[$n1]."'";
						  }
						else
							$line .="'".$fields[$n1]."',";
//echo $n1.$line;
//echo "<br>";
					  }//-------------------- end for
*/
					$line .="'".$fields[0]."',";
					$line .="'".$fields[1]."',";
//----------------------------------------------------------------------------------------------
					$fields[2] = trim($fields[2]);
					$line .="'".$fields[2]."',";
//----------------------------------------------------------------------------------------------
/*
					$birthday = explode(".", $fields[2]);
//echo "<pre>";
//print_r($birthday);
//echo "</pre>";
					$birthday_int = mktime (0, 0, 0, $birthday[1],$birthday[0], $birthday[2]);
echo $birthday_int;
echo "<br>";

$birthday2 = date("H:i:s, d.m.Y",$birthday_int);
echo $birthday2;
echo "<br>";
*/
					$line .="'".$fields[3]."',";
//----------------------------------------------------------------------------------------------
					$line .="'".$fields[4]."'";


//strtotime
					$query = "INSERT INTO `".$table_name."` VALUES (".$line.")";
//echo "<br>";
//echo $query;
//echo "<br>";
					$result = mysql_query($query);
				}//-------------------- end for
//----------------------------------------------------------------------------------------------
				mysql_close($db);
			  }
			else
			  {
				echo "<br><font color=red>Dont connect to the  </font>".$server;
				echo "<br>";
			  }
		break;
	  }//------------------------------ end switch

  }//--------------------------------- end if action

?>

