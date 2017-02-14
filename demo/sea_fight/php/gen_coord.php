<?php

$field=array();
$log_message="";

if (!empty($_REQUEST['id']))
{
	load_coord_db($host,$user,$pwd,$dbname,$tablename,$_REQUEST['id']);
}
else
{
	for ($n1=0; $n1<100; $n1++)
	{
		$field[$n1]=0;
	}

	for ($n1=0; $n1<10; $n1++)
	{
		get_random_num_cell();
	}

	//расстановка кораблей
	sheep(4);

	sheep(3);
	sheep(3);
	
	sheep(2);
	sheep(2);
	sheep(2);

	//save_coord_db($host,$user,$pwd,$dbname,$tablename);
}

//===================================
// выбор начальной позиций корабля
//===================================
function get_random_num_cell()
{
	global $field;
	global $log_message;

	$pos=rand(0,99);
	while ($field[$pos]==1) //исключение повторов номера
	{
		$pos=rand(0,99);
	}//--------------------------- end while

	//вокруг выбранной ячейки должны быть пустые поля
	if ($field[$pos+1] == 0)
	{
		if ($field[$pos-1] == 0)
		{

			if ($field[$pos+10] == 0)
			{
				if ($field[$pos-10] == 0)
				{

					if ($field[$pos-11] == 0)
					{
						if ($field[$pos+11] == 0)
						{

							if ($field[$pos-9] == 0)
							{
								if ($field[$pos+9] == 0)
								{
$field[$pos]=1;
								}
								else
								{
									get_random_num_cell();
									//$field[$pos]=4;
								}
							}
							else
							{
								get_random_num_cell();
								//$field[$pos]=4;
							}
						}
						else
						{
							get_random_num_cell();
							//$field[$pos]=4;
						}
					}
					else
					{
						get_random_num_cell();
						//$field[$pos]=4;
					}
				}
				else
				{
					get_random_num_cell();
					//$field[$pos]=4;
				}
			}
			else
			{
				get_random_num_cell();
				//$field[$pos]=4;
			}

		}
		else
		{
			get_random_num_cell();
			//$field[$pos]=4;
		}
	}
	else
	{
		get_random_num_cell();
		//$field[$pos]=4;
	}

}//-------------------------- end func

function sheep($num_cells)
{
	global $field;
	global $log_message;
$log_message .= "function sheep($num_cells)";
$log_message .= "<br>";

	$pos=rand(0,99);
	while (($field[$pos]==0) || 
		($field[$pos]==4)
		) //выбрать случайную заполненную клетку
	{
		$pos=rand(0,99);
	}//--------------------------- end while

//echo "pos = ".$pos;
//echo "<br>";
//echo "остаток = ".$pos % 10;
//echo "<br>";

	$x_max=6;
	$x_min=3;
	switch ($num_cells)
	{
		case 4:
			$x_max=6;
			$x_min=3;
		break;
		case 3:
			$x_max=7;
			$x_min=2;
		break;
		case 2:
			$x_max=8;
			$x_min=1;
		break;
	}

//if ( (($pos % 10) <= 6) && (($pos % 10) >= 3) )
if ( (($pos % 10) <= $x_max) && (($pos % 10) >= $x_min) )
{
	//$field[$pos]=2;
	$test=0;
	//for ($n1=0; $n1 < ($num_cells - 1); $n1++)
	for ($n1=0; $n1 < $num_cells; $n1++)
	{
		$num_left = $pos - ($num_cells - $n1);
//$log_message .= "num_left = ".($num_cells - $n1);
//$log_message .= "<br>";

		if (($field[$num_left] == 0) && 
			($field[$num_left-10] == 0) && 
				($field[$num_left+10] == 0)
			)
		{
			$test++;
		}
		else
		{
$log_message .= "error, left cell not empty in $num_left, pos = $pos";
$log_message .= "<br>";
			break;
		}

	}//------------------------- end for

	//if ($test == ($num_cells - 1))
	if ($test == $num_cells)
	{
		for ($n1=0; $n1 < $num_cells; $n1++)
		{
			$field[$pos-$n1]=4;
		}
	}
	else
	{
		test_right($pos,$num_cells);
	}

	$test=0;


}
else
{
	sheep($num_cells);
}

}//-------------------------- end func

function test_right($pos,$num_cells)
{
	global $field;
	global $log_message;
$log_message .= "function test_right($pos,$num_cells)";
$log_message .=  "<br>";

	$test=0;
	//for ($n1=0; $n1 < ($num_cells - 1); $n1++)
	for ($n1=0; $n1 < $num_cells; $n1++)
	{
		$num_right = $pos + ($num_cells - $n1);
//$log_message .= "num_right = ".($num_cells - $n1);
//$log_message .= "<br>";
		if (($field[$num_right] == 0) && 
			($field[$num_right-10] == 0) && 
				($field[$num_right+10] == 0)
			)
		{
			$test++;
		}
		else
		{
$log_message .= "error, right cell not empty in $num_right, pos = $pos";
$log_message .= "<br>";
			break;
		}

	}//------------------------- end for

	//if ($test == ($num_cells - 1))
	if ($test == $num_cells)
	{
//$field[$num_right-10]=5;
//$field[$num_right+10]=5;
		for ($n1=0; $n1 < $num_cells; $n1++)
		{
			$field[$pos+$n1]=4;
		}
	}
	else
	{
		test_up($pos,$num_cells);
	}

	$test=0;
}//-------------------------- end func

function test_up($pos,$num_cells)
{
	global $field;
	global $log_message;
$log_message .= "function test_up($pos,$num_cells)";
$log_message .=  "<br>";

	$test=0;
	//for ($n1=0; $n1 < ($num_cells - 1); $n1++)
	for ($n1=0; $n1 < $num_cells; $n1++)
	{
		$num_top = $pos - (($num_cells*10) - ($n1*10));
//$log_message .= "num_top = ".(($num_cells*10) - ($n1*10));
//$log_message .= "<br>";

		if ($num_top >= 0)
		{
			if (($field[$num_top] == 0) && 
				($field[$num_top-1] == 0) && 
					($field[$num_top+1] == 0)
				)
			{
				$test++;
			}
			else
			{
$log_message .= "error, top cell not empty in $num_top, pos = $pos";
$log_message .= "<br>";
				break;
			}
		}
		else
		{
			$log_message .= "error, top cell out of range in pos=$pos";
			$log_message .= "num_top - ".(($num_cells*10) - ($n1*10));
			$log_message .= "<br>";
			break;
		}

	}//------------------------- end for

	//if ($test == ($num_cells - 1))
	if ($test == $num_cells)
	{
		for ($n1=0; $n1 < $num_cells; $n1++)
		{
			$field[$pos-($n1*10)]=4;
		}
		//$field[$pos]=4;
	}
	else
	{
		test_bottom($pos,$num_cells);
	}

	$test=0;
}//-------------------------- end func

function test_bottom($pos,$num_cells)
{
	global $field;
	global $log_message;
$log_message .= "function test_bottom($pos,$num_cells)";
$log_message .= "<br>";

	$test=0;
	//for ($n1=0; $n1 < ($num_cells - 1); $n1++)
	for ($n1=0; $n1 < $num_cells; $n1++)
	{
		$num_bottom = $pos + (($num_cells*10) - ($n1*10));
//$log_message .= "num_bottom = ".(($num_cells*10) - ($n1*10));
//$log_message .= "<br>";
		if ($num_bottom < count($field))
		{
			if (($field[$num_bottom] == 0) && 
				($field[$num_bottom-1] == 0) && 
					($field[$num_bottom+1] == 0)
				)
			{
				$test++;
			}
			else
			{
$log_message .= "error, bottom cell not empty in $num_bottom, pos = $pos ";
$log_message .= "<br>";
				break;
			}
		}
		else
		{
			$log_message .= "error,  pos=$pos, bottom cell out of range, num_bottom=$num_bottom, ";
			$log_message .= "num_bottom + ".(($num_cells*10) - ($n1*10));
			$log_message .= "<br>";
			//sheep($num_cells);
			break;
		}

	}//------------------------- end for

	//if ($test == ($num_cells - 1))
	if ($test == $num_cells)
	{
		for ($n1=0; $n1 < $num_cells; $n1++)
		{
			$field[$pos+($n1*10)]=4;
		}
		//$field[$pos]=4;
	}
	else
	{
		sheep($num_cells);
	}

	$test=0;

}//-------------------------- end func

function save_coord_db($host,$user,$pwd,$dbname,$tablename)
{
	global $field;
	global $log_message;

	
	$db = mysql_connect($host,$user,$pwd) or die("Could not connect: " . mysql_error());
	if (mysql_select_db($dbname, $db))
	{
		$sql = "
CREATE TABLE IF NOT EXISTS $tablename 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_state` text,
  PRIMARY KEY (`id`)
);
";
		mysql_query($sql) or die("Invalid query: " . mysql_error());
		$field_arr=serialize($field);
		$sql = "
INSERT INTO $tablename (
`id` ,
`field_state`
)
VALUES 
(
NULL , '$field_arr'
);
";
//echo $sql;
//echo "<br>";

		if (mysql_query($sql))
		{
$log_message .= "- save field state in database: $dbname, table: $tablename";
$log_message .= "<br>";
		}
		else
			echo "Invalid query: " . mysql_error();
	
	}
	else
	{
$log_message .= "- cant select $dbname";
$log_message .= "<br>";
		$sql = "CREATE DATABASE $dbname;";
		mysql_query($sql) or die("Invalid query: " . mysql_error());

		$sql = "CREATE TABLE $tablename;";
		mysql_query($sql) or die("Invalid query: " . mysql_error());

		save_coord_db($host,$user,$pwd,$dbname,$tablename);
	}

}//-------------------------- end func

function load_coord_db($host,$user,$pwd,$dbname,$tablename,$id)
{
	global $field;
	global $log_message;
	
	$db = mysql_connect($host,$user,$pwd) or die("Could not connect: " . mysql_error());
	if (mysql_select_db($dbname, $db))
	{
		$field_arr=serialize($field);
		$sql = "SELECT field_state FROM $tablename WHERE id=$id";
//echo $sql;
//echo "<br>";
		$res = mysql_query($sql);
		if (mysql_num_rows($res)>0)
		{
$log_message .= "- load field state from database: $dbname, table: $tablename";
$log_message .= "<br>";
			while ($row = mysql_fetch_assoc($res)) 
			{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
				$field=unserialize($row['field_state']);
			}
		}
		else
		{
$log_message .= "- not found field state with id=$id";
$log_message .= "<br>";
		}
	
	}
	else
	{
$log_message .= "- cant select database: $dbname";
$log_message .= "<br>";
	}

}//-------------------------- end func

?>

