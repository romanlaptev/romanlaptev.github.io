<?php

class Term_data extends CActiveRecord
{

	public static function model($classname=__CLASS__)
	{
		return parent::model($classname);
	}

	public function tablename()
	{
		return "term_data";
	}

	public function relations()
	{
		return array (
			'term_hierarchy'=>array(self::BELONGS_TO,'Term_hierarchy','tid'),
		);
	}
}

?>
