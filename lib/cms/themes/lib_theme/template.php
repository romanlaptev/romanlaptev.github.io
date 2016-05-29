<?php
echo "this tempate.php";
/*
echo "this=<pre>";
print_r($this);
echo "</pre>";

echo "<pre>";
var_dump(get_defined_vars());
echo "</pre>";
*/

//вывод с использованием лайтбокса
function view_book_images( $node ){
//echo "function view_book_images()";
//echo "<br>";

	$img_info = array();
	//чтение значений CCK-полей в массив
	$content_location  = field_get_items('node', $node, 'field_content_location');

	//$img_info["path_original_img"] = $content_location [1]["value"];
	//$img_info["path_preview_img"] = $img_info["path_original_img"]."/".$content_location [2]["value"];
	//$img_info["path_small_img"] = $img_info["path_original_img"]."/".$content_location [3]["value"];
	//$img_info["path_medium_img"] = $img_info["path_original_img"]."/".$content_location [4]["value"];
	//$img_info["large_img"] = $img_info["path_original_img"]."/".$content_location [5]["value"];

	$img_info[0] = $content_location [0]["value"];// "path_fs_root" 
	$img_info[1] = $content_location [1]["value"];// "path_original_img"
	for( $n1=2; $n1 < count( $content_location ); $n1++ ){
		$img_info[] = $img_info[1]."/".$content_location [$n1]["value"];
	};
//echo "img_info = <pre>";
//print_r($img_info);
//echo "</pre>";

	$field_content_files = field_get_items('node', $node, 'field_content_files');
//echo "field_content_files = <pre>";
//print_r($field_content_files);
//echo "</pre>";
	if( empty( $field_content_files[0]["value"] ) ){
//echo "<h2>empty field_content_files...</h2>";
		return false;
	};

	for( $n1 =0; $n1 < count( $field_content_files ); $n1++){
		if (!empty( $field_content_files[$n1]['value']) ){

			$filename = trim( $field_content_files[$n1]['value'] );

			//получить описание изображения
			$filename_arr = explode("#",$filename);
//echo "<pre>";
//print_r($filename_arr);
//echo "</pre>";
			if ( !empty($filename_arr[1]) ){	
				$filename = $filename_arr[0];
				$img_title = $filename_arr[1];
//echo $img_title;
//echo "<br>";
				$alt = $img_title;
			} else {
				$img_title = "";
				$alt = "";
			}

			$original_img = $img_info[1] . "/" . $filename;
			$preview_img = $img_info[2] . "/" . $filename;
//echo "preview_img = ".$preview_img;
//echo "<br>";
			$small_img = $img_info[3] . "/" . $filename;
			$medium_img = $img_info[4] . "/" . $filename;
			$large_img = $img_info[5] . "/" . $filename;

			//Вывод изображения ноды в лайтбоксе
			echo "
<div class='img_content'>
<a class='pirobox' href='".$medium_img."' title='".$img_title."'>
<img src='".$preview_img."' alt='".$alt."'></a>
<br>
<div class='resize'>увеличить в 
	<a class='pirobox' href='".$small_img."'>2x</a>
	<a class='pirobox' href='".$medium_img."'>3x</a>
	<a class='pirobox' href='".$large_img."'>4x</a>
	<a href='".$original_img."' target='_blank'>полный размер</a>
</div>
<p class='img-caption'>".$img_title."</p>
</div>";

		}//end if 
	};//end for

}//end view_images

?>
