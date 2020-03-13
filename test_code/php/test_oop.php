<!DOCTYPE html>
<html>
<head>
	<title>test PHP</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=10">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">	
<style>
.alert {
	margin-bottom: 3px !important;
	padding: 10px !important;
}
.panel-body{
	padding: 5px;
}
</style>
</head>

<body>
	<div class="container">
		<div class="page-header">
			<h3>test PHP: OOP</h3>
		</div>
<pre>
// run local web-server
php -S localhost:8000 -t test_code/php

Мэтт Зандстра, PHP. Объекты, шаблоны и методики программирования (2-е издание)
php._obekty_shablony_i_metodiki_programmirovaniya.djvu
p82

https://www.php.net/manual/ru/language.oop5.overloading.php
Перегрузка 

</pre>
	<div class="panel">
		<div class="panel-body">

<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

class FirstClass {
	public$name;
	private $age;
	private $className;
	private $greeting;

	//public function FirstClass(){//PHP4
	function __construct($argv){//PHP5

		$this->className = get_class( $this);
		$msg = "Object of class ".$this->className." was created. "."\n";
		echo logAlert($msg, "success");

		$this->greeting = $argv;
		$this->name = "Roman";
		$this->age = 44;
	}//end constructor

	public function getName(){
		$msg = $this->greeting;
		$msg .= $this->name.", ";
		$msg .= "my age: ".$this->age."\n";
		echo logAlert($msg, "info");
	}//end

	function __get( $property){
		$msg = "__get(), error, property by name <b>".$property."</b> not defined "."\n";
		echo logAlert($msg, "error");
	}//end

	function __set( $property, $value){
		$msg = "__set(), error, ";
		$msg .= "do not set <b>".$property."</b> with value ".$value."\n";
		echo logAlert($msg, "error");
	}//end

	function __call( $method, $arg_arr){
		$msg = "__call(), error, ";
		$msg .= "method by name <b>".$method."</b> not defined "."\n";
		echo logAlert($msg, "error");
echo "arguments: <pre>";
print_r( $arg_arr );
echo "</pre>";
	}//end

	function __isset( $property ){
		$msg = "__isset(), error, ";
		$msg .= "property by name <b>".$property."</b> not defined "."\n";
		echo logAlert($msg, "error");
	}//end

	function __unset( $property ){
		$msg = "__unset(), error, ";
		$msg .= "do not destroy <b>".$property."</b> "."\n";
		echo logAlert($msg, "error");
	}//end

	function __destruct(){
		$msg = "Object of class ".$this->className." was destroyed. "."\n";
		echo logAlert($msg, "info");
	}//end

}//end class


$object1 = new FirstClass("Hello, I am ");
$object1->getName();

echo $object1->someProp;
$object1->someProp = 123;
$object1->someMethod('1',"two", "C");

if( isset($object1->someProp) ){
	$object1->someProp = 456;
}
unset($object1->someProp);

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
		$msg = "public static function func_static()"."\n";
		echo logAlert($msg, "info");
	}//end

	function __construct(){
		$msg = "Object of class ".get_class( $this)." was created. "."\n";
		echo logAlert($msg, "success");
	}//end constructor

	function method1(){
		$msg = "Running method of class 'parentClass'"."\n";
		echo logAlert($msg, "info");
	}//end

	function __destruct(){
		$msg = "Object of class ".get_class( $this)." was destroyed. "."\n";
		echo logAlert($msg, "info");
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
$msg = "Static property: ".parentClass::$prop3."\n";
echo logAlert($msg, "info");

//============================ Abstract class

abstract class Class4 {
	public function method1(){
	}//end

	abstract public function method2();
}//end class

class Class5 extends Class4 {
	public function method2(){
echo "A realize(Implementation) of the abstact method from Class4"."<br>\n";
	}//end

}//end class


//============================ Interfaces

interface _InterFace1 {
	public function method2();
}//end 

class Class6 implements _InterFace1 {
	public function method2(){
echo "A Implementation of the method from  _InterFace1"."<br>\n";
	}//end
}//end class

/*
echo "//============================ final, end of inheritance <br>\n";
final class finalClass {
	public function method(){
	}//end
}//end class

class testChildClass extends finalClass {//error, do not inherit from final class
}//end class
*/

function logAlert( $msg, $level){

	switch ($level) {
		case "info":
			return "<div class='alert alert-info'>".$msg."</div>";
		break;
		
		case "warning":
			return "<div class='alert alert-warning'>".$msg. "</div>";
		break;
		
		case "danger":
		case "error":
			return "<div class='alert alert-danger'>".$msg. "</div>";
		break;
		
		case "success":
			return "<div class='alert alert-success'>".$msg. "</div>";
		break;
		
		default:
			return "<div class='alert alert-info'>".$msg. "</div>";
		break;
	}//end switch

}//end logAlert()

?>

		</div>
	</div><!-- end panel -->
</div><!-- end container -->

</body>
</html>

