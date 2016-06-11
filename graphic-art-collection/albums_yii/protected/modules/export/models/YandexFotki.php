<?php

/**
 * This is the model class for table "yandex_fotki".
 *
 * The followings are the available columns in table 'yandex_fotki':
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $url1
 * @property string $url2
 * @property string $url3
 * @property string $url4
 * @property string $url5
 * @property string $url6
 * @property string $url7
 * @property string $url8
 */
class YandexFotki extends CActiveRecord
{

    public function getDbConnection()
    {
        return Yii::app()->db2;
    }
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'yandex_fotki';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('title', 'required'),
			array('title', 'length', 'max'=>255),
			array('description, url1, url2, url3, url4, url5, url6, url7, url8', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, title, description, url1, url2, url3, url4, url5, url6, url7, url8', 'safe', 'on'=>'search'),
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
			'title' => 'Title',
			'description' => 'Description',
			'url1' => 'Url1',
			'url2' => 'Url2',
			'url3' => 'Url3',
			'url4' => 'Url4',
			'url5' => 'Url5',
			'url6' => 'Url6',
			'url7' => 'Url7',
			'url8' => 'Url8',
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
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('url1',$this->url1,true);
		$criteria->compare('url2',$this->url2,true);
		$criteria->compare('url3',$this->url3,true);
		$criteria->compare('url4',$this->url4,true);
		$criteria->compare('url5',$this->url5,true);
		$criteria->compare('url6',$this->url6,true);
		$criteria->compare('url7',$this->url7,true);
		$criteria->compare('url8',$this->url8,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return YandexFotki the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
