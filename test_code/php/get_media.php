<?php
//<audio src="get_media.php?music=test.mp3" controls type="audio/mp3" ></audio>

$mediaUrl = "https://cloclo20.datacloudmail.ru/weblink/get/JSDm/zciANxB6p/lib/eng_books/H/Heinlein/03_Motorbreath.mp3";
//$mediaUrl = "/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3";
$mp3 = file_get_contents($mediaUrl);
//$file_size= filesize($mediaUrl);
header("Content-Type: audio/mpeg");
//header("Accept-Ranges: bytes");
//header("Content-Length: " . $file_size);  
echo $mp3;
?> 
