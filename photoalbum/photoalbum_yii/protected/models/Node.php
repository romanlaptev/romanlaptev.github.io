<?php
class Node extends CActiveRecord
{
	public static function model($className=__CLASS__)
	{
//echo "Node.php, public static function model($className=__CLASS__)";
//echo "<br>";
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{node}}';
	}

}//----------------------------------- end class
