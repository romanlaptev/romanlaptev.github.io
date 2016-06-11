<?php

/**
 * This is the model class for table "content_field_filename".
 *
 * The followings are the available columns in table 'content_field_filename':
 * @property string $vid
 * @property string $nid
 * @property string $delta
 * @property string $field_filename_value
 */
class Content_field_filename extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Content_field_filename the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'content_field_filename';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('vid, nid, delta', 'length', 'max'=>10),
			array('field_filename_value', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('vid, nid, delta, field_filename_value', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'vid' => 'Vid',
			'nid' => 'Nid',
			'delta' => 'Delta',
			'field_filename_value' => 'Field Filename Value',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('vid',$this->vid,true);
		$criteria->compare('nid',$this->nid,true);
		$criteria->compare('delta',$this->delta,true);
		$criteria->compare('field_filename_value',$this->field_filename_value,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}