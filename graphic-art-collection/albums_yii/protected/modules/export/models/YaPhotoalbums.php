<?php

/**
 * This is the model class for table "ya_photoalbums".
 *
 * The followings are the available columns in table 'ya_photoalbums':
 * @property integer $id
 * @property string $album_id
 * @property string $title
 * @property string $published
 * @property string $updated
 * @property integer $image_count
 */
class YaPhotoalbums extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'ya_photoalbums';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('album_id, title', 'required'),
			array('image_count', 'numerical', 'integerOnly'=>true),
			array('album_id, title', 'length', 'max'=>255),
			array('published, updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, album_id, title, published, updated, image_count', 'safe', 'on'=>'search'),
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
			'id' => 'ID',
			'album_id' => 'Album',
			'title' => 'Title',
			'published' => 'Published',
			'updated' => 'Updated',
			'image_count' => 'Image Count',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('album_id',$this->album_id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('published',$this->published,true);
		$criteria->compare('updated',$this->updated,true);
		$criteria->compare('image_count',$this->image_count);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * @return CDbConnection the database connection used for this class
	 */
	public function getDbConnection()
	{
		return Yii::app()->db2;
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return YaPhotoalbums the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
