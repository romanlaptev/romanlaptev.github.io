<?php
//https://www.php.net/manual/ru/language.namespaces.rationale.php
//(PHP 5 >= 5.3.0, PHP 7)
namespace space1 {
	class Class1 {

		private $msg="";

		public function __construct() {
			$this->msg = "Object of the ". __CLASS__ ." was created.";
	echo $this->msg."\n";
		}//end

	}//end class

	$obj1 = new Class1();

	$some_var = 123;
	function func1( $num ){
		return $num++;
	}//end
	echo "Test name space 'space1': ".func1( $some_var )."\n";
	
}//end namespace


namespace space2 {
	class Class1 {

		private $msg="";
		public $object_ns = "this variable from space2";

		public function __construct() {
			$this->msg = "Object of the ". __CLASS__ ." was created.";
	echo $this->msg."\n";
		}//end

	}//end class

	$obj1 = new Class1();
//print_r( $obj1 );

	$some_var = 456;
	function func1( $num ){
		return $num++;
	}//end
	echo "Test name space 'space2': ".func1( $some_var )."\n";

}//end namespace

namespace space2\subspace1 {
	class Class1 {

		public function __construct() {
			$msg = "Object of the ". __CLASS__ ." was created.";
echo $msg."\n";
		}//end

	}//end class

	$obj1 = new Class1();
print_r( $obj1 );
//echo $obj1->object_ns."\n";

}//end namespace

?>
