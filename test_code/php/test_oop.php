<?php

class FirstClass {
	private $name;
	private $age;
	private $className;
	private $greeting;

	//public function FirstClass(){//PHP4
	function __construct($argv){//PHP5

		$this->className = get_class( $this);
echo "Object of class ".$this->className." was created. "."\n";

		$this->greeting = $argv;
		$this->name = "Roman";
		$this->age = 44;
	}//end constructor

	public function getName(){
echo $this->greeting;
echo $this->name.", ";
echo "my age: ".$this->age."\n";
	}//end

	function __destruct(){
echo "Object of class ".$this->className." was destroyed. "."\n";
	}//end

}//end class


$object1 = new FirstClass("Hello, I am ");
$object1->getName();

//======================================================
class parentClass {
	function __construct(){
echo "Object of class ".get_class( $this)." was created. "."\n";
	}//end constructor

	function method1(){
echo "Running method of class ".get_class( $this)."\n";
	}//end

	function __destruct(){
echo "Object of class ".get_class( $this)." was destroyed. "."\n";
	}//end

}//end class

class childClass extends parentClass{
	function __construct(){
		parent::__construct();
	}//end constructor

	function __destruct(){
		parent::method1();
		parent::__destruct();
	}//end

}//end class


$obj = new childClass();

?>
