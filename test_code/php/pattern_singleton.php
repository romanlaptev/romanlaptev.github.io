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
	
	private function __clone(){} //Do not use this for creating object......
	private function __wakeup(){}//Do not use this for creating object......

}//end class

//$config = new Config();// ERROR!!!! Do not use new for creating object......
$config = Config::getInstance();
echo $config->data."\n";

$config2 = Config::getInstance();
echo $config2->data."\n";

?>
