<?php
class m150608_053808_create_table_lessons extends CDbMigration
{
	public function up()
	{
        $this->createTable('lessons', array(
            'lesson_id' => 'pk',
            'course_id' => 'int(6) unsigned',
		'url' => 'varchar(255) NOT NULL',
            'title' => 'varchar(255) NOT NULL DEFAULT \'урок\'',
            'description' => 'text',
        ));
	}

	public function down()
	{
		//echo "m150608_053808_create_table_cources does not support migration down.\n";
		//return false;
		$this->dropTable('lessons');
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
