<?php
$table_random = array();

while ( count($table_random) < (4*6) )
{
	$random_value = rand(0,99);
	if (in_array( $random_value, $table_random) ) 
	{
//echo $n1.". Repeat value ". $random_value;
//echo "<br>";
	}
	else
	{
		$table_random[] = $random_value;
	}
}
//-------------------------------------------------- 
$html = form_table ( $table_random );

//-------------------------------------- SORT
/*
for ($n1=0; $n1 < count($table_random); $n1++ )
{
	for ($n2=0; $n2 < count($table_random); $n2++ )
	{
		if ( $table_random[$n1] > $table_random[$n2])
		{
			$tmp = $table_random[$n1];
			$table_random[$n1] = $table_random[$n2];
			$table_random[$n2] = $tmp;
		}
	}
}
*/
rsort($table_random);
$html2 = form_table ( $table_random );

//===========================================
function form_table ( $table_random )
{
	$table_matrix = array();
	$num_col = 4;
	$num_row = 6;
	$num_item = 0;

	$html = "";
	$html .= "<div class='text-center'>";
	$html .= "<div class='row'>";
	for ($n2 = 1; $n2 < $num_col+1; $n2++)
	{
		$html .= "<div class='col-md-2 mark'>";
		$html .= "<b>".$n2."</b>";
		$html .= "</div>";
	}
	$html .= "<div class='col-md-2 mark'>";
	$html .= "<b>Sum</b>";
	$html .= "</div>";
	$html .= "</div>";

	for ($n1 = 0; $n1 < $num_row ; $n1++ )
	{
		$html .= "<div class='row'>";
		for ($n2 = 0; $n2 < $num_col; $n2++)
		{
			$table_matrix[$n1][$n2] = $table_random[ $num_item ] ;
			$num_item++;

			$html .= "<div class='col-md-2'>";
			$html .= $table_matrix[$n1][$n2];
			$html .= "</div>";
		}

		$html .= "<div class='col-md-2'>";
		$html .= array_sum( $table_matrix[$n1] );
		$html .= "</div>";

		$html .= "</div>";
	}
	$html .= "</div>";

	return $html;
}
?>
﻿<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>module</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">	
</head>
<body>
	<div class='container'>
		<div class="page-header">
			<h1>Тестовое задание</h1>
		</div>

		<div class="phone panel panel-default">
			<div class="panel-body">
<?php
echo $html;
?>
			</div>
		</div>

		<div class="phone panel panel-default">
			<h2 class="text-center">сортировка по убыванию</h2>
			<div class="panel-body">
<?php
echo $html2;
?>			
			</div>
		</div>

<pre>
"с чем столкнулись при выполнении задачи" 
возникли сложности при формировании массива случайных чисел с исключением повторений
и определением порядка сортировки второй таблицы

"какие вопросы возникли к постановщику задачи"
....

"как оптимизировали"
при сортировке массива случа. чисел, вместо сортировки методом перестановки соседних элементов была
использована функция rsort($table_random);
Также для определения повторяющихся случайных чисел использована функция in_array($random_value, $table_random);
Для подсчета суммы рядов таблицы применялась array_sum( $table_matrix[$n1] );
</pre>
		<code>
<?php
/*
echo "<pre>";
print_r($table_matrix);
print_r($table_random);
echo "</pre>";
*/
?>
﻿		</code>
	</div>

</body>
</html>


