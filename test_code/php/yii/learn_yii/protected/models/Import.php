<?php
class Import extends CFormModel
{
    public $upload_file;

    public function rules()
    {
        return array(
        array(
		'upload_file', 
		'file', 
		'types'=>'xml', 
		'maxSize'=>2*1024*1024,
		),
        );
    }

    /**
     * Declares attribute labels.
     */
    public function attributeLabels()
    {
        return array(
            'upload_file'=>'Upload File',
        );
    }

}
?>
