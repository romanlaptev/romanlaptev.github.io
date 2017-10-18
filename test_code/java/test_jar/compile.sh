#!bin/bash
#javac inc/TestClass.java
#jar cf inc/test_pkg.jar inc/TestClass.class
#rm inc/*.class

javac Test.java
#javac -cp inc/test_pkg.jar Test.java

java -cp .:inc/test_pkg.jar Test
