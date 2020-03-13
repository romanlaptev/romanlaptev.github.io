<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

class FirstClass {
	private $name;
	private $age;
	private $className;
	private $greeting;

	//public function FirstClass(){//PHP4
	function __construct($argv){//PHP5

		$this->className = get_class( $this);
echo "Object of class ".$this->className." was created. "."<br>\n";

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
echo "Object of class ".$this->className." was destroyed. "."<br>\n";
	}//end

}//end class


$object1 = new FirstClass("Hello, I am ");
$object1->getName();

//======================================================
class parentClass {

	private $prop1 = "This is public text!!!";	
	private $prop2 = "This is secret PRIVATE text!!!";	
	public static $prop3 = 10;

	public function func_public(){//GETTER for private property
		print( $this->prop1."\n");
	}//end

	//private function func_test(){// Access error!!!!!
	protected function func_test(){
		print( $this->prop2."\n");
	}//end

	public static function func_static(){
		echo  "-- public static function func_static()\n";
	}//end

	function __construct(){
echo "Object of class ".get_class( $this)." was created. "."\n";
	}//end constructor

	function method1(){
echo "Running method of class 'parentClass'\n";
	}//end

	function __destruct(){
echo "Object of class ".get_class( $this)." was destroyed. "."\n";
	}//end

}//end class

class childClass extends parentClass {

	const GOOD = 1;
	const BAD = 0;

	function __construct(){
		parent::__construct();

		//try{
			parent::func_public();
		//} catch ( Exception $e ){
//echo "Exception: ",  $e->getMessage(), "\n";
		//}

	}//end constructor

	function __destruct(){
		parent::method1();
		parent::__destruct();
	}//end

}//end class

class thirdClass extends parentClass {
	public function method3(){
		$this->func_test();
	}//end
}//end class

$obj = new childClass();

//------------------
$obj3 = new thirdClass();
$obj3->method3();

//------------------
parentClass::func_static();
parentClass::$prop3++;//access to the static property, only :: syntax!!!!
echo "Static property: ".parentClass::$prop3."\n";

?>
