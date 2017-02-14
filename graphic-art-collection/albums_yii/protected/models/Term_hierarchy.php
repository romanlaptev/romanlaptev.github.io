<?php
class Term_hierarchy extends CActiveRecord
{
	public static function model($classname=__CLASS__)
	{
		return parent::model($classname);
	}

	public function tablename()
	{
		return "term_hierarchy";
	}
}

?>
