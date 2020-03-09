<?php
class m150608_053808_create_table_users extends CDbMigration
{
	public function up()
	{
        $this->createTable('users', array(
            'user_id' => 'pk',
            'login' => 'varchar(64) CHARACTER SET utf8 NOT NULL',
            'pass' => 'varchar(64) CHARACTER SET utf8 NOT NULL',
        ));
	}

	public function down()
	{
		//echo "m150608_053808_create_table_cources does not support migration down.\n";
		//return false;
		$this->dropTable('users');
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
