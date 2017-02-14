<?php

/**
 * This is the model class for table "node".
 *
 * The followings are the available columns in table 'node':
 * @property string $nid
 * @property string $vid
 * @property string $type
 * @property string $language
 * @property string $title
 * @property integer $uid
 * @property integer $status
 * @property integer $created
 * @property integer $changed
 * @property integer $comment
 * @property integer $promote
 * @property integer $moderate
 * @property integer $sticky
 * @property string $tnid
 * @property integer $translate
 */
class Node extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Node the static model class
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
		return 'node';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('uid, status, created, changed, comment, promote, moderate, sticky, translate', 'numerical', 'integerOnly'=>true),
			array('vid, tnid', 'length', 'max'=>10),
			array('type', 'length', 'max'=>32),
			array('language', 'length', 'max'=>12),
			array('title', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('nid, vid, type, language, title, uid, status, created, changed, comment, promote, moderate, sticky, tnid, translate', 'safe', 'on'=>'search'),
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
			'nid'=>array(self::BELONGS_TO, 'Content_type_photogallery_image', 'nid'),
			'content_field_filename_nid'=>array(self::BELONGS_TO, 'Content_field_filename', 'nid'),
			//'nid'=>array(self::HAS_ONE, 'Content_type_photogallery_image', 'nid'),
			//'content_field_filename_nid'=>array(self::HAS_ONE, 'Content_field_filename', 'nid'),
			'term_node'=>array(self::BELONGS_TO,'Term_node','nid'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'nid' => 'Nid',
			'vid' => 'Vid',
			'type' => 'Type',
			'language' => 'Language',
			'title' => 'Title',
			'uid' => 'Uid',
			'status' => 'Status',
			'created' => 'Created',
			'changed' => 'Changed',
			'comment' => 'Comment',
			'promote' => 'Promote',
			'moderate' => 'Moderate',
			'sticky' => 'Sticky',
			'tnid' => 'Tnid',
			'translate' => 'Translate',
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

		$criteria->compare('nid',$this->nid,true);
		$criteria->compare('vid',$this->vid,true);
		$criteria->compare('type',$this->type,true);
		$criteria->compare('language',$this->language,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('uid',$this->uid);
		$criteria->compare('status',$this->status);
		$criteria->compare('created',$this->created);
		$criteria->compare('changed',$this->changed);
		$criteria->compare('comment',$this->comment);
		$criteria->compare('promote',$this->promote);
		$criteria->compare('moderate',$this->moderate);
		$criteria->compare('sticky',$this->sticky);
		$criteria->compare('tnid',$this->tnid,true);
		$criteria->compare('translate',$this->translate);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
