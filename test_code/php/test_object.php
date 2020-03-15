<?php
//https://weburoki.pro/klonirovanie-obektov-v-php
//https://www.php.net/manual/ru/language.oop5.cloning.php#object.clone

error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//===========================

class FirstClass {
	private $name;
	private $age;

	function __construct(){
echo "Object of class ".__CLASS__." was created. "."<br>\n";
		$this->name = "Roman";
		$this->age = 44;
	}//end constructor

	function __toString(){
		return "method __toString() for print object.."."<br>\n";
	}//end 

	function __destruct(){
echo "Object of class ".get_class( $this)." was destroyed. "."<br>\n";
	}//end

}//end class


$obj1 = new FirstClass();
echo "OBJ1: <pre>";
print_r( $obj1);
echo "</pre>";

$obj2 = clone $obj1;

echo "OBJ2: <pre>";
print_r( $obj2);
echo "</pre>";

echo $obj1;

unset($obj1);

echo "//============================ Redefine, overrride method __clone() <br>\n";

class Class2 {
	private $name;

	function __construct(){
		$this->name = "Roman";
	}//end constructor

	public function __clone(){
echo "Cloning object of class ".get_class($this)."<br>\n";
		$this->name = "noname";
	}//end

}//end class

$obj3 = new Class2();
echo "OBJ3: <pre>";
print_r( $obj3);
echo "</pre>";

$obj4 = clone $obj3;

echo "OBJ4: <pre>";
print_r( $obj4);
echo "</pre>";

//=========================== test __autoload function - if not load file before using
/*
function __autoload( $className ){
	require_once("classes/$className.php");
}//end

$obj88 = new Class88();
*/
//============================ disable clone;

class Class3 {
	private $name;

	function __construct(){
		$this->name = "Baran";
	}//end constructor

	private function __clone(){//!!!!!!!!!!!!!!!!!!!
echo "Cloning object of class ".get_class($this)."<br>\n";
	}//end

}//end class

$obj5 = new Class3();
echo "OBJ5: <pre>";
print_r( $obj5);
echo "</pre>";

	$obj6 = clone $obj5;//error cloning!!!!!!!!!!!!!!!!!!!!!

echo "OBJ6: <pre>";
print_r( $obj6);
echo "</pre>";


?>
