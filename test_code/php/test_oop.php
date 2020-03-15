<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

$sapi_type = php_sapi_name();

$_vars["runType"] = "";
if ( $sapi_type == 'apache2handler' || $sapi_type == 'cli-server') {
	$_vars["runType"] = "web";
	formPageHeader();
}
if ( $sapi_type == 'cli') {
	$_vars["runType"] = "console";
}
if ( $sapi_type == 'cgi') {
	$_vars["runType"] = "console";
}
$msg = "Run method (php_sapi_name): ". $sapi_type;
echo logAlert($msg, "info");

class FirstClass {
	public$name;
	private $age;
	private $className;
	private $greeting;

	//public function FirstClass(){//PHP4
	function __construct($argv){//PHP5

		$this->className = get_class( $this);
		$msg = "Object of class ".$this->className." was created.";
		echo logAlert($msg, "success");

		$this->greeting = $argv;
		$this->name = "Roman";
		$this->age = 44;

		$msg = "List of THIS: ";
		echo logAlert($msg, "");
		print_r($this);

	}//end constructor

	public function getName(){
		$msg = $this->greeting;
		$msg .= $this->name.", ";
		$msg .= "my age: ".$this->age;
		echo logAlert($msg, "info");
	}//end

	function __get( $property){
		$msg = "__get(), error, property by name <b>".$property."</b> not defined ";
		echo logAlert($msg, "error");
	}//end

	function __set( $property, $value){
		$msg = "__set(), error, ";
		$msg .= "do not set <b>".$property."</b> with value ".$value;
		echo logAlert($msg, "error");
	}//end

	function __call( $method, $arg_arr){
		$msg = "__call(), error, ";
		$msg .= "method by name <b>".$method."</b> not defined ";
		echo logAlert($msg, "error");
echo "arguments: <pre>";
print_r( $arg_arr );
echo "</pre>";
	}//end

	function __isset( $property ){
		$msg = "__isset(), error, ";
		$msg .= "property by name <b>".$property."</b> not defined ";
		echo logAlert($msg, "error");
	}//end

	function __unset( $property ){
		$msg = "__unset(), error, ";
		$msg .= "do not destroy <b>".$property."</b> ";
		echo logAlert($msg, "error");
	}//end

	function __destruct(){
global $_vars;
		$msg = "Object of class ".$this->className." was destroyed. ";
		echo logAlert($msg, "info");
if ( $_vars["runType"] == "web") {
		formPageFooter();
}
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
		print( $this->prop2 );
	}//end

	public static function func_static(){
		$msg = "public static function func_static()";
		echo logAlert($msg, "info");
	}//end

	function __construct(){
		$msg = "Object of class ".get_class( $this)." was created. ";
		echo logAlert($msg, "success");
	}//end constructor

	function method1(){
		$msg = "Running method of class 'parentClass'";
		echo logAlert($msg, "info");
	}//end

	function __destruct(){
		$msg = "Object of class ".get_class( $this)." was destroyed. ";
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
$msg = "Static property: ".parentClass::$prop3;
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

interface _InterFace2 {
	public function getStatus();
}//end 

interface _InterFace3 extends _InterFace1, _InterFace2 {}

//-------

class Class6 implements _InterFace1 {
	public function method2(){
echo "A Implementation of the method from  _InterFace1"."<br>\n";
	}//end
}//end class


class Class61 implements _InterFace3 {

	public function method2(){
echo "A Implementation of the method from  _InterFace1"."<br>\n";
	}//end

	public function getStatus(){
echo "A Implementation of the method from  _InterFace2"."<br>\n";
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

//Check type object
//https://www.php.net/manual/ru/language.operators.type.php
$msg = "Object1 instanceof  of class FirstClass: ";
echo $msg;
var_dump( $object1 instanceof FirstClass );

echo "<br>\n";

$msg = "Object1 instanceof  of class Class4: ";
echo $msg;
var_dump( $object1 instanceof Class4 );

//============================ Polymorphism
//https://www.youtube.com/watch?v=ZamZAhczTzQ&list=PLD-piGJ3Dtl06_K36ABZRwLa3Q3b3JoHk&index=3
/*
class Page {
	public $title;
	public $content;

	public function __construct( $title, $content ) {
		$this->slide = $slide;
		$this->news = $news;
	}

	public function render_body() {
		$str = "<h1>". $this->title ."</h1>";
		$str .= "<p>". $this->content ."</p>";
		return $str;
	}

	public function test() {
		echo $this->render_body();
	}

}//end class

class IndexPage extends Page {
	public $slide;
	public $news;

	public function __construct($title, $content,  $slide, $news) {
		parent::construct( $title, $content );
		$this->slide = $slide;
		$this->news = $news;
	}

	public function render_body() {
		$str = parent::render_body();
		$str .= "<p>". $this->slide ."</p>";
		$str .= "<p>". $this->news ."</p>";
		return $str;
	}

}//end class

class Poly {
	public $ob;
	public function save_obj ($Page $_var){
		$this->ob[] = $_var;	
	}

	public function get_result(){
		foreach( $this->ob as $item){
			$item->test();
		}//next
	}

}//end class

$page = new Page("title1","content1");
$index_page = new IndexPage("title2","content2", "slide show", "news");

//$page->render_body();
//$index_page->render_body();

$obj_poly = new Poly();
$obj_poly->save_obj( $page );
$obj_poly->save_obj( $index_page );

//---------------------------- ex2
class X {
	public function get(){
		echo "This is object of class X";
	}
	
	public function render(){
		$this->get();
	}

}//end class

class Y extends X {
	public function get(){
		echo "This is object of class Y";
	}
}//end class

$obj_x = new X();
$obj_y = new Y();

$obj_x->render();//This is object of class X
$obj_y->render();//This is object of class Y ||||||||||||||| poliymorphism, call function through $this
*/

//======================= TRAIT
//https://www.youtube.com/watch?v=HkvfyY_NeAQ&list=PLVfMKQXDAhGV1kj1gEGTgdzXt2jHwg-if&index=12
/*
class Base {
	public function sayHello(){
		echo "Hello ";
	}//end
}//end class

trait sayWorld {
	public function sayHello(){
		parent::sayHello();
		echo "World!!! ";
	}//end
}//end trait

class myHelloWorld extends Base {
	use sayWorld;
}//end class

$obj99 = new myHelloWorld();
$obj99->sayHello();
*/


//============================
function logAlert( $msg, $level){
//global $sapi_type;
global $_vars;
	switch ($level) {
		case "info":
			if ( $_vars["runType"] == "web" ) {
				return "<div class='alert alert-info'>".$msg."</div>";
			}
			if ( $_vars["runType"] == "console" ) {
				return $msg."\n";
			}
		break;
		
		case "warning":
			if ( $_vars["runType"] == "web" ) {
				return "<div class='alert alert-warning'>".$msg. "</div>";
			}
			if ( $_vars["runType"] == "console" ) {
				return $msg."\n";
			}
		break;
		
		case "danger":
		case "error":
			if ( $_vars["runType"] == "web" ) {
				return "<div class='alert alert-danger'>".$msg. "</div>";
			}
			if ( $_vars["runType"] == "console" ) {
				return $msg."\n";
			}
		break;
		
		case "success":
			if ( $_vars["runType"] == "web" ) {
				return "<div class='alert alert-success'>".$msg. "</div>";
			}
			if ( $_vars["runType"] == "console" ) {
				return $msg."\n";
			}
		break;
		
		default:
			if ( $_vars["runType"] == "web" ) {
				return $msg. "<br/>";
			}
			if ( $_vars["runType"] == "console" ) {
				return $msg."\n";
			}
		break;
	}//end switch

}//end logAlert()


function formPageHeader(){
echo '
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

https://www.php.net/manual/ru/language.oop5.php
Классы и объекты

https://www.php.net/manual/ru/language.oop5.overloading.php
Перегрузка 

https://www.youtube.com/watch?v=ZamZAhczTzQ&list=PLD-piGJ3Dtl06_K36ABZRwLa3Q3b3JoHk&index=3
https://www.youtube.com/watch?v=ph4K1XlOSGg&list=PLVfMKQXDAhGV1kj1gEGTgdzXt2jHwg-if&index=11
</pre>
	<div class="panel">
		<div class="panel-body">
';
}//end formPageHeader


function formPageFooter(){
echo '
		</div>
	</div><!-- end panel -->
</div><!-- end container -->

</body>
</html>
';
}//end formPageFooter

?>
