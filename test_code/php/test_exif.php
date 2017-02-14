<?php
//phpinfo();
error_reporting(E_ALL);
echo "<pre>";
print_r($_REQUEST);
print_r( gd_info() );
echo "</pre>";



if (!empty( $_REQUEST["img_filename"] ) )
{
/*

filename
    Имя файла изображения. Нельзя передавать URL.
*/
	$img_filename = $_REQUEST["img_filename"];
/*
$size = getimagesize( $img_filename );
echo "<pre>";
print_r( $size );
echo "</pre>";
*/

/*
sections

    Список разделенных запятой разделов, которые должны быть представлены в результирующем массиве array. Если ни один из разделов найти не удастся, функция вернет FALSE.
    FILE 	FileName, FileSize, FileDateTime, SectionsFound
    COMPUTED 	html, Width, Height, IsColor, и другие. Height and Width вычисляются аналогично getimagesize(), поэтому их не обязательно включать в заголовок. html - текстовая строка, задающая высоту/ширину, которую можно использовать в обычном HTML.
    ANY_TAG 	Любая информация заключенная в тэг, например IFD0, EXIF, ...
    IFD0 	Все данные тэга IFD0. В обычных изображениях в нем хранится размер изображения.
    THUMBNAIL 	Если файл содержит второй раздел IFD, то считается, что у изображения есть эскиз. Вся информация об эскизе хранится в этом разделе.
    COMMENT 	Заголовки комментариев JPEG изображений.
    EXIF 	Раздел EXIF является подразделом IFD0. Он содержит более детальную информацию об изображении. Большинство его записей зависит от фотоаппарата.

arrays
    Определяет, формировать ли разделы в виде массивов. Разделы sections, COMPUTED, THUMBNAIL и COMMENT всегда делаются массивами, так как они могут содержать значения, имена которых будут конфликтовать с именами в других разделах.

*/

	//$sections = "FILE, COMPUTED, THUMBNAIL, COMMENT, EXIF";
	$sections = "ANY_TAG";

	//Если TRUE, будет прочитан сам эскиз. В противном случае будет прочитана только информация в тэгах. 
	$thumbnail = false;

	$exif = exif_read_data( $img_filename , $sections );
echo "[MimeType]: ".$exif["MimeType"];
echo "<br>";
echo "[FileName]: ".$exif["FileName"];
echo "<br>";
echo "[FileSize]: ".$exif["FileSize"]." bytes";
echo "<br>";
echo "[FileDateTime]: ".$exif["FileDateTime"].", ".date("d.m.Y", $exif["FileDateTime"]);
echo "<br>";

echo "<hr>";

echo "[Make]: ".$exif["Make"];
echo "<br>";
echo "[Model]: ".$exif["Model"];
echo "<br>";
echo "[Orientation]: ".$exif["Orientation"];
echo "<br>";

echo "<hr>";

echo "[DateTime]: ".$exif["DateTime"];
echo "<br>";
echo "[DateTimeOriginal]: ".$exif["DateTimeOriginal"];
echo "<br>";
echo "[DateTimeDigitized]: ".$exif["DateTimeDigitized"];
echo "<br>";
echo "[UserComment]: ".$exif["UserComment"];
echo "<br>";

echo "<hr>";
echo "[COMPUTED][html]: ".$exif["COMPUTED"]["html"];
echo "<br>";
echo "[COMPUTED][Height]: ".$exif["COMPUTED"]["Height"];
echo "<br>";
echo "[COMPUTED][Width]: ".$exif["COMPUTED"]["Width"];
echo "<br>";
echo "[ExifImageWidth]: ".$exif["ExifImageWidth"];
echo "<br>";
echo "[ExifImageLength]: ".$exif["ExifImageLength"];
echo "<br>";
/*
	foreach ($exif as $key => $section) {
	    foreach ($section as $name => $val) {
		echo "$key.$name: $val<br />\n";
	    }
	}
*/
}
?>
<html>
<head>
<title>test, get EXIF info from image</title>
<meta charset="utf-8">
</head>

<body>

<h2>test, get EXIF info from image</h2>
<pre>
http://php.net/manual/ru/function.exif-read-data.php
http://php.net/manual/ru/function.iptcembed.php
</pre>

<form action="test_exif.php" method="get">
<p>
	<input type="text" size="80" 
name="img_filename" 
value="">
</p>
<p>
/mnt/terra/clouds/google_drive/photos/photoalbum/2000x/2009/img_2319.jpg<br>
/mnt/terra/clouds/google_drive/photos/photoalbum/2000x/2014/img_20141129_171237.jpg
</p>

<p>
	<input type="submit" value="get info">
</p>
</form>

</body>
</html>

