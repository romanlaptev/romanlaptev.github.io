<?php

class Term_node extends CActiveRecord
{
	public static function model($classname=__CLASS_)
	{
		return parent::model($classname);
	}

	public function tablename()
	{
		return 'term_node';
	}

	public function relations()
	{
		return array (
			//'term_data'=>array(self::BELONGS_TO,'Term_data','tid'),
				);
	}
}

?>

