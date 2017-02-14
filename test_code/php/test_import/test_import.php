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
error_reporting (E_ERROR | E_WARNING | E_PARSE);

if (isset($_REQUEST['action']) OR empty($_REQUEST['action']))
  {
	$action = $_REQUEST['action'];
	switch ($action)
	  {
		case export:  //Создать таблицу в MySQL под данную структуру файла.
//----------------------------------------------------------------------------------------------
			$server = 'localhost';
			$username = 'root';
			$password = 'master';

			//beta.hut2.ru
			//$server = "database.agava.net";
			//$username = "beta8";
			//$password = "O4AtmRKe";

			if ($_REQUEST['server'])
			  {
				$server = $_REQUEST['server'];
			  }
			if ($_REQUEST['username'])
			  {
				$username = $_REQUEST['username'];
			  }
			if ($_REQUEST['password'])
			  {
				$password = $_REQUEST['password'];
			  }

			$db_name = 'mydb';
			//$db_name = 'beta8';
			$table_name = 'table1';
			$filename=$_REQUEST['filename'];

//----------------------------------------------------------------------------------------------
			$db = mysql_connect($server, $username, $password);
			if($db) 
			  {
				$query = "SET NAMES 'utf8'";
				$result = mysql_query($query);
				mysql_set_charset("utf8");

echo "<br><font color=green>Connect to the </font>".$server;
echo "<br>";

				$query = "CREATE DATABASE IF NOT EXISTS `".$db_name."`";
				$result = mysql_query($query);

				mysql_select_db($db_name);
				$query = "CREATE TABLE IF NOT EXISTS `".$table_name."` (
`fio` VARCHAR( 60 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`mail` VARCHAR( 64 ) NOT NULL ,
`birthday` VARCHAR( 10 ) NOT NULL ,
`joined` INT( 11 ) NOT NULL ,
`status` varchar(3) NOT NULL DEFAULT 'Off'
) ENGINE = MYISAM ;";

/*
				$query = "CREATE TABLE IF NOT EXISTS `".$table_name."` (
`fio` VARCHAR( 60 ) NOT NULL ,
`mail` VARCHAR( 64 ) NOT NULL ,
`birthday` VARCHAR( 10 ) NOT NULL ,
`joined` INT( 11 ) NOT NULL ,
`status` varchar(3) NOT NULL DEFAULT 'Off'
) ENGINE = MYISAM ;";
*/
				$result = mysql_query($query);
//----------------------------------------------------------------------------------------------

				if ($filename)
				  {
					$csv_data = file($filename);
//echo "<pre>";
//print_r($csv_data);
//echo "</pre>";
//echo "<br>Export from CSV file";
//echo "<br>";
					//Все данные из CSV-файла экспортировать в созданную таблицу.
					for ($n2=1; $n2<count($csv_data); $n2++)
					  {
						$fields = explode(";", $csv_data[$n2]);
//echo "<pre>";
//print_r($fields);
//echo "</pre>";
						$line="";
						$line .="'".$fields[0]."',";
						$line .="'".$fields[1]."',";
//----------------------------------------------------------------------------------------------
						$fields[2] = trim($fields[2]);
						$line .="'".$fields[2]."',";
//----------------------------------------------------------------------------------------------
						//Данные в поле "Зарегистрирован" должны храниться в формате INT.
						//Иванов Иван; ivan@aaa.ru; 12.01.1974; 12.12.2007 15:41; On
						$fields[3] = trim($fields[3]);
//echo $fields[3];
//echo "<br>";
						$joined = explode(" ", $fields[3]);
						$joined_date = explode(".", $joined[0]);
//echo "<pre>";
//print_r($joined_date);
//echo "</pre>";
						$joined_time = explode(":", $joined[1]);

//int mktime ( [int hour [, int minute [, int second [, int month [, int day [, int year [, int is_dst]]]]]]] )
						$hour = $joined_time[0];
						$minute = $joined_time[1];
						$second = 0;
						$month = $joined_date[1];
						$day = $joined_date[0];
						$year = $joined_date[2];
						$joined_int = mktime ($hour, $minute, $second, $month, $day, $year);
//echo "<br>";
//echo "joined_int = ".$joined_int;
//echo "<br>";

//$joined_str = date("H:i:s, d.m.Y",$joined_int);
//echo "joined_str = ".$joined_str;
//echo "<hr>";
						$line .="'".$joined_int."',";
//----------------------------------------------------------------------------------------------
						$fields[4] = trim($fields[4]);
						$line .="'".$fields[4]."'";
						$query = "INSERT INTO `".$table_name."` VALUES (".$line.")";
//echo "<br>";
//echo $query;
//echo "<br>";
						$result = mysql_query($query);
					}//-------------------- end for
				}//-------------------- end if 
//----------------------------------------------------------------------------------------------
// После полного экспорта данных в таблицу изменить для одной случайной записи в таблице 
// статус на противоположный и вывести эту запись на экран. 
//----------------------------------------------------------------------------------------------
				$query = "select * from ". $table_name;
				$result = mysql_query($query);
				$num = mysql_num_rows($result);
				if ($num > 0)
				  {
//----------------------------------------------------------------------------------------------
					echo "<table cellpadding=0 cellspacing=0>";
					echo "	<tr>";

					echo "		<td class='head'>";
					echo "fio";
					echo "		</td>";

					echo "		<td class='head'>";
					echo "mail";
					echo "		</td>";

					echo "		<td class='head'>";
					echo "birthday";
					echo "		</td>";

					echo "		<td class='head'>";
					echo "joined";
					echo "		</td>";

					echo "		<td class='head'>";
					echo "status";
					echo "		</td>";

					echo "	</tr>";
					$style="even";
					for ($n1=0; $n1<$num; $n1++)
					  {
						$row = mysql_fetch_array($result, MYSQL_ASSOC);
						echo "	<tr>";

						echo "		<td class='data_".$style."'>";
						echo $row['fio'];
						echo "		</td>";

						echo "		<td class='data_".$style."'>";
						echo $row['mail'];
						echo "		</td>";

						echo "		<td class='data_".$style."'>";
						echo $row['birthday'];
						echo "		</td>";

						$joined_str = date("H:i:s, d.m.Y",$row['joined']);
						echo "		<td class='data_".$style."'>";
						echo $joined_str;
						echo "		</td>";

						echo "		<td class='data_".$style."'>";
						echo $row['status'];
						echo "		</td>";

						echo "	</tr>";

						if ($style=="even")
							$style="odd";
						else
							$style="even";
					  }
					echo "</table>";
//----------------------------------------------------------------------------------------------
					$num_record = rand(0,$num-1);
//echo $num_record;
//echo "<br>";
					mysql_data_seek($result, $num_record);
					$row = mysql_fetch_array($result, MYSQL_ASSOC);
//echo "<pre>";
//print_r ($row);
//echo "</pre>";
//echo $row['status'];
//echo "<hr>";
					$status="";
					if ($row['status'] == 'On')
					  {
						$status='Off';
					  }
					else
						$status='On';

					$query = "UPDATE `".$table_name."` SET `status` =  '".$status."' WHERE `table1`.`fio` = '".$row['fio']."' AND `table1`.`mail` =  '".$row['mail']."' AND `table1`.`birthday` = '".$row['birthday']."' AND `table1`.`joined` =".$row['joined']." AND `table1`.`status` = '".$row['status']."' LIMIT 1;";
					$result = mysql_query($query);

//----------------------------------------------------------------------------------------------
// При этом данные этой записи должны выводиться в том же виде, 
// в каком они были получены из CSV-файла.
//----------------------------------------------------------------------------------------------
					$query = "select * from ". $table_name." WHERE `table1`.`fio` = '".$row['fio']."' AND `table1`.`mail` =  '".$row['mail']."' AND `table1`.`birthday` = '".$row['birthday']."' AND `table1`.`joined` =".$row['joined']." AND `table1`.`status` = '".$status."' LIMIT 1;";
					$result = mysql_query($query);
					$row = mysql_fetch_array($result, MYSQL_ASSOC);
					echo $row['fio'];
					echo ";";
					echo $row['mail'];
					echo ";";
					echo $row['birthday'];
					echo ";";
					$joined_str = date("H:i:s, d.m.Y",$row['joined']);
					echo $joined_str;
					echo ";";
					echo $row['status'];
					echo "<br>";
				  } //----------------------------- end if
				else 
					echo "<font color=red>First, download the data from the file test.csv...</font>";
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
//else
//  {
//	echo "need action!";
//  }

?>

