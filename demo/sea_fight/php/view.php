<?php
//echo "view, <pre>";
//print_r($_REQUEST);
//echo "</pre>";

include ("./config.php");
include ("./gen_coord.php");

//echo "<pre>";
//print_r($field);
//echo "</pre>";
?>

<html>
<head>
	<meta charset="utf-8">
</head>
<body>

<div id="field">
<?

$n3=0;
echo "<table>";
for ($n1=0; $n1<10; $n1++)
{
	echo "<tr>";
	for ($n2=0; $n2<10; $n2++)
	{
		if ($field[$n3]==1)
		{
			echo "<td class='marked'>";
		}

		if ($field[$n3]==2)
		{
			echo "<td class='cell2'>";
		}

		if ($field[$n3]==3)
		{
			echo "<td class='cell3'>";
		}

		if ($field[$n3]==4)
		{
			echo "<td class='cell4'>";
		}

		if ($field[$n3]==5)
		{
			echo "<td class='cell5'>";
		}

		if ($field[$n3]==0)
		{
			echo "<td>";
		}

		//echo $n3.".".$field[$n3];
		echo $n3;
		//echo "&nbsp;";
		$n3++;

		echo "</td>";
	}
	echo "</tr>";
}
echo "</table>";
?>
</div>

<div id="info">
<?php
	echo $log_message;
?>
</div>

</body>
</html>

