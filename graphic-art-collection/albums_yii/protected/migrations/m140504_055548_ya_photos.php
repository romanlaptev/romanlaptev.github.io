<?php

class m140504_055548_ya_photos extends CDbMigration
{
	public function up()
	{
        $this->createTable('ya_photos', array(
            'id' => 'pk',
            'photo_id' => 'string NOT NULL',
            'title' => 'string NOT NULL',
            'img_xxs' => 'text',//"XXS" width="75"
            'img_xs' => 'text',//"XL" width="426"
            'img_m' => 'text',//"M" width="160"
            'img_l' => 'text',//"L" width="266"
            'img_xxxs' => 'text',//"XXXS" width="50"
            'img_xxxl' => 'text',//"XXXL" width="682"
            'img_s' => 'text',//"S" width="80"
            'img_xs' => 'text',//"XS" width="53"
            'img_orig' => 'text',//orig"
            'img_xxl' => 'text',//"XXL" width="545"
            'term' => 'text',
            'published' => 'text',
            'updated' => 'text',
        ));	
	}

	public function down()
	{
		//echo "m140504_055548_ya_photos does not support migration down.\n";
		//return false;
		$this->dropTable('ya_photos');
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}