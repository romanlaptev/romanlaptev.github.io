<h1>view termins</h1>

<?php
	if (!empty($error))
	{
echo "error = <pre>";
print_r($error);
echo "</pre>";
	}


	if (!empty($termins))
	{
	        foreach($termins as $termin)
        	{
//echo "<pre>";
//print_r($termin);
//echo "</pre>";
			echo "<ul>";
			echo "	<li>";
			echo CHtml::link($termin['name'],array('node/list','tid'=>$termin['tid']));
			echo "		<ul>";
			recursion_view_termins($termin['child']);
			echo "		</ul>";

			echo "	</li>";
			echo "</ul>";
        	}//-------------------------- end foreach
	}

	function recursion_view_termins($termin)
	{
//echo "public function recursion_view_termins()";
//echo "<br>";
	        foreach($termin as $child_termin)
        	{
//echo "child_termin<pre>";
//print_r($child_termin);
//echo "</pre>";
			echo "	<li>";
			echo CHtml::link($child_termin['name'],array('node/list','tid'=>$child_termin['tid']));
			echo "	</li>";
//echo "count child termins = ".count($child_termin['child']);
//echo "<br>";
			if (count($child_termin['child']) > 0)
			{
				echo "<ul>";
				recursion_view_termins($child_termin['child']);
				echo "</ul>";
			}
        	}//-------------------------- end foreach

	}//----------------------- end func

?>
