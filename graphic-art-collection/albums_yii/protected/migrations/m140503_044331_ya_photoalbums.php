<?php

class m140503_044331_ya_photoalbums extends CDbMigration
{
	public function up()
	{
        $this->createTable('ya_photoalbums', array(
            'id' => 'pk',
            'album_id' => 'string NOT NULL',
            'title' => 'string NOT NULL',
            'published' => 'text',
            'updated' => 'text',
			'image_count'=> 'integer',
        ));	
	}

	public function down()
	{
		//echo "m140503_044331_ya_photoalbums does not support migration down.\n";
		//return false;
		$this->dropTable('ya_photoalbums');
		
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