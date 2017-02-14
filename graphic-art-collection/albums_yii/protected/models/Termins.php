<?php
class Termins 
{
	public function get_termins()
	{
//echo "public function get_termins()";
//echo "<br>";
		$connection=Yii::app()->db; 
		//$db_prefix = 'photoalbum_';

		$sql="
-- получить термины словаря таксономии (level 0)
SELECT 
	term_data.tid, 
	term_data.name, 
	term_data.description, 
	term_data.weight,
	term_hierarchy.parent
	FROM term_data 
LEFT JOIN 
	vocabulary ON vocabulary.name='".Yii::app()->params['vocabulary_name']."'
LEFT JOIN 
	term_hierarchy ON term_hierarchy.tid=term_data.tid 
WHERE 
	term_data.vid=vocabulary.vid AND term_hierarchy.parent=0
ORDER BY 
	term_data.weight;
";
		//$results = Node::model()->findAllBySql($sql);
		//return $results;

	        $command=$connection->createCommand($sql);
	        $reader=$command->query();

		$termins=array();
		foreach ($reader as $termin)
		{
			$termins[]=$termin;
		}

		for($n1=0;$n1<count($termins);$n1++)
		//for($n1=0;$n1<1;$n1++)
		{
			$termins[$n1]['child'] = Termins::get_child_termins($termins[$n1]['tid']);
		}
//echo "termins = <pre>";
//print_r($termins);
//echo "</pre>";

		return $termins;
	}//------------------------- end func

	private function get_child_termins($tid)
	{
//echo "public function get_child_termins()";
//echo "<br>";
		$sql="
-- получить дочернии термины
SELECT 
	term_data.tid, 
	term_data.name, 
	term_data.description, 
	term_data.weight,
	term_hierarchy.parent
FROM 	term_data 
LEFT JOIN vocabulary ON vocabulary.name='".Yii::app()->params['vocabulary_name']."'
LEFT JOIN term_hierarchy ON term_hierarchy.tid=term_data.tid 
WHERE	
	term_data.vid=vocabulary.vid 
AND 
	term_hierarchy.tid IN
	(
		SELECT term_hierarchy.tid 
		FROM term_hierarchy 
		WHERE term_hierarchy.parent=".$tid."
	)
ORDER BY term_data.weight
";
//echo "sql = ".$sql;
//echo "<br>";
		$connection=Yii::app()->db; 
	        $command=$connection->createCommand($sql);
	        $reader=$command->query();
//echo "count - ".$reader->rowCount;
//echo "<br>";
		$child_termins=array();
		if ($reader->rowCount>0)
		{
			foreach ($reader as $termin)
			{
//echo "termin = <pre>";
//print_r($termin);
//echo "</pre>";
				$termin['child']=Termins::get_child_termins($termin['tid']);
				$child_termins[]=$termin;
			}
		}
		//else
		//{
			return $child_termins;
		//}
	}//------------------------- end func

}//-------------------------- end class

?>
