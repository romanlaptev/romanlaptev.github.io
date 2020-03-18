<?php
//https://www.php.net/manual/ru/language.namespaces.rationale.php
//(PHP 5 >= 5.3.0, PHP 7)

namespace  {//global_space
	$global_var = "this is GLOBAL variable...";

	//echo space2\get_var()."\n";
	echo namespace\space2\get_var()."\n";

	$obj_space1 = new space1\Class1("obj_space1");
//print_r( $obj_space1 );
	$obj_space2 = new space2\Class1("obj_space2");
	$obj_subSpace2 = new space2\subspace1\Class1("obj_subSpace2");

}//end namespace


namespace space1 {

	class Class1 {

		private $msg="";
		public $object_ns = "object_ns, this variable from space1";

		public function __construct($name) {
			$this->msg = "Object '$".$name."' of the ". __CLASS__ ." was created.";
	echo $this->msg."\n";
		}//end

	}//end class

	$obj1 = new Class1("obj1");
//-----------------
	
	$some_var = 123;
	const CONST1 = 3.14;


	function func1( $n ){
		$n++;
		return $n;
	}//end

	function test(){
		return "\space1\\test()";
	}//end

	echo "Test namespace ".__NAMESPACE__."\n";
	echo "-- change uniquie variable 'some_var': ".func1( $some_var )."\n";

	echo "-- global variable avaible here: ".$global_var."\n";
	$global_var = 0;
	echo \space2\subspace1\test()."\n";

}//end space 1


namespace space2 {
	class Class1 {

		private $msg="";
		public $object_ns = "object_ns, this variable from space2";

		public function __construct($name) {
			$this->msg = "Object '$".$name."' of the ". __CLASS__ ." was created.";
	echo $this->msg."\n";
		}//end

	}//end class

	$obj1 = new Class1("obj1");
//print_r( $obj1 );

	$some_var = 456;

	function get_var(){
		//global $some_var;
//echo $some_var;
		return "test,  \space2\get_var()";
	}//end

	function func1( $n ){
		$n++;
		return $n;
	}//end

	echo "Test namespace ".__NAMESPACE__."\n";
	echo "-- change uniquie variable 'some_var': ".func1( $some_var )."\n";
	echo "-- global variable avaible here: ".$global_var."\n";

	echo "-- constant from another namespace: ".\space1\CONST1 ."\n";


}//end space 2

namespace space2\subspace1 {
	class Class1 {
		private $msg;

		public function __construct($name) {
			$this->msg = "Object '$".$name."' of the ". __CLASS__ ." was created.";
echo $this->msg."\n";
		}//end

	}//end class

	$obj1 = new Class1("obj1");
//print_r( $obj1 );
//echo \space2\$some_var."\n";

	$some_var = 789;

	echo "Test namespace ".__NAMESPACE__."\n";
	echo \space2\get_var()."\n";
	echo \space1\test()."\n";

	function test(){
		$t1= 102030;
		return "\space2\subspace1\\test()".$t1;
	}//end

}//end namespace

?>
