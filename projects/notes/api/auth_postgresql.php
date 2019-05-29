<?php
if( $_SERVER["SERVER_NAME"] == "vbox5"){
	$_vars["config"]["dbHost"] = "localhost";
	$_vars["config"]["dbPort"] = "5432";
	$_vars["config"]["dbUser"] = "postgres";
	$_vars["config"]["dbPassword"] = "master";
	$_vars["config"]["dbName"] = "";
}
if( $_SERVER["SERVER_NAME"] == "romanlaptev.herokuapp.com"){
	$_vars["config"]["dbHost"] = "ec2-184-73-189-190.compute-1.amazonaws.com";
	$_vars["config"]["dbPort"] = "5432";
	$_vars["config"]["dbUser"] = "aejvwysqgsboeb";
	$_vars["config"]["dbPassword"] = "55b5c22131c1d612574edb5dea0b63433293d828ab1f77196f52eb0a849a577c";
	$_vars["config"]["dbName"] = "d7c534mf7866o2";
}
?>