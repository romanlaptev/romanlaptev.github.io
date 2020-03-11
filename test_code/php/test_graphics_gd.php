<?php 
//encoding ANSI or UTF without BOM!!!!

//https://www.php.net/manual/ru/refs.utilspec.image.php
//https://www.php.net/manual/ru/intro.image.php
//https://www.php.net/manual/ru/function.imagecreate.php
//http://www.php.su/imagecreate

//https://www.php.net/manual/ru/function.gd-info.php

//error_reporting(E_ALL ^ E_DEPRECATED);
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
// print_r ($_SERVER);
// print_r ($_REQUEST);
// //print_r($_FILES);
//echo "</pre>";

//https://www.php.net/manual/ru/function.get-loaded-extensions.php
$loadedExt = get_loaded_extensions();
if ( !in_array("gd", $loadedExt ) ) {
	$msg = "<p>-- error, GD graphical module  is not in the list of loaded extensions...</p>";
	echo $msg;
echo "loaded_extensions:<pre>";
print_r( $loadedExt );
echo "</pre>";
	exit;
}

if (!extension_loaded("gd") ) {
	
	if ( function_exists("dl") ){
		
		//https://www.php.net/manual/ru/function.dl.php
		if ( dl("gd.so") ) {//try dynamic load module
			//$msg = "<p>-- success, graphical module GD available...</p>";
			//echo $msg;
			runTest();
		} else {
			$msg = "<p>-- error, graphical module GD not loaded...</p>";
			$msg .= "<p>-- failed load gd.so..</p>";
			echo $msg;
			exit;
		}
		
	} else {
		$msg = "<p>-- error, graphical module GD not loaded...</p>";
		$msg .= "<p>-- failed load gd.so, not function dl()</p>";
		echo $msg;
		exit;
	}
	
} else {
	//$msg = "<p>-- success, graphical module GD available...</p>";
	//echo $msg;
	runTest();
}


function runTest(){
/*
//https://www.php.net/manual/ru/function.get-extension-funcs.php
echo "extension_funcs in module GD:<pre>";
print_r(get_extension_funcs("gd"));
echo "</pre>";

	if ( function_exists("gd_info") ){
echo "<pre>";
print_r( gd_info() );
echo "</pre>";
	} else {
$msg = "error, not support function gd_info(),  not  GD Support ...";
echo $msg;
		exit();
	}
*/	

	header ("Content-type: image/png");
	//for upload image after creating
	//$filename = "test.png";
	//header("Content-Disposition: attachment; filename=".$filename.'');
	//header('Content-Transfer-Encoding: binary');

	$im = @imagecreate (200, 200) or die ("Cannot Initialize new GD image stream");
	$im2 = @imagecreate (200, 200) or die ("Cannot Initialize new GD image stream");

	$background_color = imagecolorallocate ($im, 255, 255, 255);
	$text_color = imagecolorallocate ($im, 233, 14, 91);
	$color2 = imagecolorallocate ($im, 233, 14, 91);

	imagestring ($im, 1, 5, 5,"Circle", $text_color);

	$x0 = 100;
	$y0 = 100;
	$px = 60;
	$py = 60;
	for ($t = 0; $t < 360; $t++){
		$x = cos($t) * $px;
		$y = sin($t) * $py;
		$x = $x + $x0;
		$y = $y + $y0;
		imagesetpixel ($im, $x, $y, $color2);
	}//next

	imagepng ($im);
	imagedestroy($im);


	/*
	header("Content-Type: image/png");
	$im = @imagecreate(110, 20) or die("Cannot Initialize new GD image stream");
	$background_color = imagecolorallocate($im, 255, 255, 255);
	$text_color = imagecolorallocate($im, 233, 14, 91);
	imagestring($im, 1, 5, 5,  "A Simple Text String", $text_color);
	imagepng($im);
	//imagedestroy($im);
	*/

/*
	header ("Content-type: image/png"); 
	$im = ImageCreate (200, 100) 
			or die ("РћС€РёР±РєР° РїСЂРё СЃРѕР·РґР°РЅРёРё РёР·РѕР±СЂР°Р¶РµРЅРёСЏ");         
	$couleur_fond = ImageColorAllocate ($im, 255, 0, 0); 
	ImagePng ($im); 
*/
	
}//end runTest()
?>
