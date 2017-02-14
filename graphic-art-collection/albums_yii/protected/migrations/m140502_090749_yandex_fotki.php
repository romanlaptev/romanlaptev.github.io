<?php

class m140502_090749_yandex_fotki extends CDbMigration
{
	public function up()
	{
        $this->createTable('yandex_fotki', array(
            'id' => 'pk',
            'title' => 'string NOT NULL',
            'description' => 'text',
            'url1' => 'text',//url for thumbnails 100px
            'url2' => 'text',//url for thumbnails 150px
            'url3' => 'text',//url for thumbnails 300px
            'url4' => 'text',//url for thumbnails 500px
            'url5' => 'text',//url for thumbnails 800px
            'url6' => 'text',//url for thumbnails 1024px
            'url7' => 'text',//url for thumbnails 1280px
            'url8' => 'text',//url for original image
        ));	
	}

	public function down()
	{
		//echo "m140502_090749_yandex_fotki does not support migration down.\n";
		//return false;
		$this->dropTable('yandex_fotki');
		
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