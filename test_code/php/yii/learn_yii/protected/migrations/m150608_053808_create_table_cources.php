<?php
class m150608_053808_create_table_cources extends CDbMigration
{
	public function up()
	{
        $this->createTable('courses', array(
            'course_id' => 'pk',
            'title' => 'varchar(255) NOT NULL DEFAULT \'курс\'',
            'description' => 'text',
        ));
	}

	public function down()
	{
		//echo "m150608_053808_create_table_cources does not support migration down.\n";
		//return false;
		$this->dropTable('courses');
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
