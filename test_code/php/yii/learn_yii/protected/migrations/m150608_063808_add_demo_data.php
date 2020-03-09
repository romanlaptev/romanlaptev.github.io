<?php
class m150608_063808_add_demo_data extends CDbMigration
{
	public function up()
	{
		$this->insert('courses', array(
		           'title' => 'Javascript',
		           'description' => 'Hexlet University',
		));
		$this->insert('lessons', array(
		           'course_id' => '1',
		           'url' => 'http://mycomp/video/video_lessons/js_HexletUniversity/JavaScript,%20%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D1%8F%203%20%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8.%20%D0%97%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F.mp4',
		           'title' => 'JavaScript, лекция 3 Функции. Замыкания',
		           'description' => 'Hexlet University',
		));
		$this->insert('users', array(
		           'login' => 'admin',
		           'pass' => 'super',
		));

	}

	public function down()
	{
		//echo "m150608_053808_create_table_cources does not support migration down.\n";
		//return false;
		$this->truncateTable('courses');
		$this->truncateTable('lessons');
		$this->truncateTable('users');
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
