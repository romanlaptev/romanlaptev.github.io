<?php

/**
 * This is the model class for table "content_type_photogallery_image".
 *
 * The followings are the available columns in table 'content_type_photogallery_image':
 * @property string $vid
 * @property string $nid
 * @property integer $field_num_page_value
 * @property string $field_author_value
 * @property string $field_create_date_value
 * @property string $field_style_value
 * @property string $field_genre_value
 * @property string $field_technique_value
 * @property integer $field_img1_gallery_fid
 * @property integer $field_img1_gallery_list
 * @property string $field_img1_gallery_data
 * @property string $field_title_value
 * @property string $field_preview_img_value
 * @property string $field_big_img_value
 * @property string $field_original_img_value
 * @property string $field_info_value
 * @property string $field_info_format
 * @property string $field_preview_img_preset_value
 */
class Content_type_photogallery_image extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Content_type_photogallery_image the static model class
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
		return 'content_type_photogallery_image';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('field_num_page_value, field_img1_gallery_fid, field_img1_gallery_list', 'numerical', 'integerOnly'=>true),
			array('vid, nid, field_info_format', 'length', 'max'=>10),
			array('field_author_value, field_create_date_value, field_style_value, field_genre_value, field_technique_value, field_img1_gallery_data, field_title_value, field_preview_img_value, field_big_img_value, field_original_img_value, field_info_value, field_preview_img_preset_value', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('vid, nid, field_num_page_value, field_author_value, field_create_date_value, field_style_value, field_genre_value, field_technique_value, field_img1_gallery_fid, field_img1_gallery_list, field_img1_gallery_data, field_title_value, field_preview_img_value, field_big_img_value, field_original_img_value, field_info_value, field_info_format, field_preview_img_preset_value', 'safe', 'on'=>'search'),
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
			//'nid'=>array(self::HAS_ONE, 'Node', 'nid'),
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
			'field_num_page_value' => 'Field Num Page Value',
			'field_author_value' => 'Field Author Value',
			'field_create_date_value' => 'Field Create Date Value',
			'field_style_value' => 'Field Style Value',
			'field_genre_value' => 'Field Genre Value',
			'field_technique_value' => 'Field Technique Value',
			'field_img1_gallery_fid' => 'Field Img1 Gallery Fid',
			'field_img1_gallery_list' => 'Field Img1 Gallery List',
			'field_img1_gallery_data' => 'Field Img1 Gallery Data',
			'field_title_value' => 'Field Title Value',
			'field_preview_img_value' => 'Field Preview Img Value',
			'field_big_img_value' => 'Field Big Img Value',
			'field_original_img_value' => 'Field Original Img Value',
			'field_info_value' => 'Field Info Value',
			'field_info_format' => 'Field Info Format',
			'field_preview_img_preset_value' => 'Field Preview Img Preset Value',
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
		$criteria->compare('field_num_page_value',$this->field_num_page_value);
		$criteria->compare('field_author_value',$this->field_author_value,true);
		$criteria->compare('field_create_date_value',$this->field_create_date_value,true);
		$criteria->compare('field_style_value',$this->field_style_value,true);
		$criteria->compare('field_genre_value',$this->field_genre_value,true);
		$criteria->compare('field_technique_value',$this->field_technique_value,true);
		$criteria->compare('field_img1_gallery_fid',$this->field_img1_gallery_fid);
		$criteria->compare('field_img1_gallery_list',$this->field_img1_gallery_list);
		$criteria->compare('field_img1_gallery_data',$this->field_img1_gallery_data,true);
		$criteria->compare('field_title_value',$this->field_title_value,true);
		$criteria->compare('field_preview_img_value',$this->field_preview_img_value,true);
		$criteria->compare('field_big_img_value',$this->field_big_img_value,true);
		$criteria->compare('field_original_img_value',$this->field_original_img_value,true);
		$criteria->compare('field_info_value',$this->field_info_value,true);
		$criteria->compare('field_info_format',$this->field_info_format,true);
		$criteria->compare('field_preview_img_preset_value',$this->field_preview_img_preset_value,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
