<?php

/**
 * This is the model class for table "ya_photos".
 *
 * The followings are the available columns in table 'ya_photos':
 * @property integer $id
 * @property string $photo_id
 * @property string $title
 * @property string $img_xxs
 * @property string $img_xs
 * @property string $img_m
 * @property string $img_l
 * @property string $img_xxxs
 * @property string $img_xxxl
 * @property string $img_s
 * @property string $img_orig
 * @property string $img_xxl
 * @property string $term
 * @property string $published
 * @property string $updated
 */
class YaPhotos extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'ya_photos';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('photo_id, title', 'required'),
			array('photo_id, title', 'length', 'max'=>255),
			array('img_xxs, img_xs, img_m, img_l, img_xxxs, img_xxxl, img_s, img_orig, img_xxl, term, published, updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, photo_id, title, img_xxs, img_xs, img_m, img_l, img_xxxs, img_xxxl, img_s, img_orig, img_xxl, term, published, updated', 'safe', 'on'=>'search'),
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
			'photo_id' => 'Photo',
			'title' => 'Title',
			'img_xxs' => 'Img Xxs',
			'img_xs' => 'Img Xs',
			'img_m' => 'Img M',
			'img_l' => 'Img L',
			'img_xxxs' => 'Img Xxxs',
			'img_xxxl' => 'Img Xxxl',
			'img_s' => 'Img S',
			'img_orig' => 'Img Orig',
			'img_xxl' => 'Img Xxl',
			'term' => 'Term',
			'published' => 'Published',
			'updated' => 'Updated',
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
		$criteria->compare('photo_id',$this->photo_id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('img_xxs',$this->img_xxs,true);
		$criteria->compare('img_xs',$this->img_xs,true);
		$criteria->compare('img_m',$this->img_m,true);
		$criteria->compare('img_l',$this->img_l,true);
		$criteria->compare('img_xxxs',$this->img_xxxs,true);
		$criteria->compare('img_xxxl',$this->img_xxxl,true);
		$criteria->compare('img_s',$this->img_s,true);
		$criteria->compare('img_orig',$this->img_orig,true);
		$criteria->compare('img_xxl',$this->img_xxl,true);
		$criteria->compare('term',$this->term,true);
		$criteria->compare('published',$this->published,true);
		$criteria->compare('updated',$this->updated,true);

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
	 * @return YaPhotos the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
