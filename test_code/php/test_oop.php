<?php
class FirstClass {
	public $name = "Roman";
	public $age = 44;

	public function method1(){
echo "Name: ".$this->name."\n";
echo "Age: ".$this->age."\n";
	}//end

}//end class

$class1 = new FirstClass;
$class1->method1();
?>
