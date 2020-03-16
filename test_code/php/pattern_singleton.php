<?php
//https://www.youtube.com/watch?v=vJAt-7VCz80
//Реализация паттернов ООП в PHP

class Config {

	public $data;
	private	static $instance = null;

	private function __construct() {
		$this->data = rand();
	}

	public static function getInstance() {
		if( is_null( self::$instance ) ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

}//end class

$config = Config::getInstance();
echo $config->data."\n";

$config2 = Config::getInstance();
echo $config2->data."\n";

?>
