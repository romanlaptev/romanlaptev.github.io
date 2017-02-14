<html>
<head>
<meta content="charset=utf-8">
</head>
<body>
<?
//****************************
// MAIN
//****************************
$filename = "test_video.xml";
//$filename = "video.xml";

$file = fopen($filename,"r");
if(!file)
  {
    echo("Ошибка открытия файла $filename");
  }
else
 {
    $buff = fread ($file,filesize($filename));
 }

$xml_parser = xml_parser_create();
xml_parse_into_struct($xml_parser,$buff,$vals,$index);
xml_parser_free($xml_parser);

//echo "<pre>";
//echo "Index array\n";
//print_r($index);
//echo "<hr>";

//echo "\nVals array\n";
//print_r($vals);
//echo "</pre>";

//echo "<hr>";
//print $vals[0]['tag']."<br>";
//print $vals[1]['tag']."<br>";
//print $vals[55]['tag']."<br>";
//////////////////////////////////////////////////////////
/*

print $index['VIDEO'][0]."<br>";
print $index['VIDEO'][1]."<br>";
print $index['VIDEO'][2]."<br>";
print $index['VIDEO'][3]."<br>";
print $index['VIDEO'][4]."<br>";

for ($n1 = 0; $n1 <= sizeof($index['VIDEO']); $n1++)
   {
	$n2=$index['VIDEO'][$n1];
	print_r ($vals[$n2]);
	echo "<br>";
   }
echo "<hr>";
*/
////////////////////////////////////////////////////////
/*
VIDEOCLIP
DESCRIPTION
FILESIZE
LOCATION
A
FILESHARING
FILM
PRODUCER
ROLES
GENRE
*/
////////////////////////////////////////////////////////

//for ($n1 = 0; $n1 <= sizeof($vals); $n1++)
//   {
//	echo $n1.".";
//	echo $vals[$n1]['tag'].", ";
//	echo $vals[$n1]['type'].", ";
//	echo $vals[$n1]['level'].", ";
//	echo $vals[$n1]['attributes'].", ";
//	echo $vals[$n1]['value'].", ";
//	echo "<br>";
//   }

$num1=0;
$num2=0;
// Печать атрибутов тега VIDEOCLIP
for ($n1 = 0; $n1 <= sizeof($vals); $n1++)
   {
	if (($vals[$n1]['tag'] == "VIDEOCLIP") AND ($vals[$n1]['type'] == "open"))
	  {
		echo "num1 = ".$num1."<br>";
		echo $n1.".";
		echo $vals[$n1]['tag'].", ";
		echo $vals[$n1]['type'].", ";
		echo $vals[$n1]['level'].", ";
		echo $vals[$n1]['attributes'].", ";
		echo $vals[$n1]['value'].", ";
		echo "<br>";
		if (isset($vals[$n1]['attributes']))
		  {
//			print_r ($vals[$n1]['attributes']);
			print ($vals[$n1]['attributes']['GROUP']);
			echo ", ";
			print ($vals[$n1]['attributes']['TITLE']);
			echo "<br>";
		  }
////////////////////////////////////////////////////////
		// Печать значений тега DESCRIPTION
		// вычислить номер элемента массива VALS, содержащего описание 
//		$n3 = $index["DESCRIPTION"][0]-1;
		$n3 = $index["DESCRIPTION"][$num1];
		echo $n3;
		echo "Описание: ";
//		echo $vals[$n1+$n3]['value'];
		echo $vals[$n3]['value'];
		echo "<br>";
//-------------------------------------------

//		$n3 = $index["FILESIZE"][0]-1;
		$n3 = $index["FILESIZE"][$num1];
		echo $n3;
		echo "Размер: ";
//		echo $vals[$n1+$n3]['value'];
		echo $vals[$n3]['value'];
		echo "<br>";
//-------------------------------------------
		// Печать значений тега LOCATION
//		$n3 = $index["LOCATION"][0]-1;
		$n3 = $index["LOCATION"][$num2];
		echo $n3;

		echo $vals[$n3]['tag'].", ";
		echo $vals[$n3]['type'].", ";
		echo $vals[$n3]['level'].", ";
		echo $vals[$n3]['attributes'].", ";
		echo $vals[$n3]['value'].", ";
		echo "<br>";

		// Печать значений тега A
//		$n3 = $index["A"][0]-1;
		$n3 = $index["A"][$num2];
		echo $n3;
		echo $vals[$n3]['value'].", ";
		echo "<br>";
		// Печать атрибутов тега A
		if (isset($vals[$n3]['attributes']))
		  {
			print_r ($vals[$n3]['attributes']);
			echo "<br>";
		  }
//-------------------------------------------
		// Печать значений тега FILESHARING
		$n3 = $index["FILESHARING"][$num2];
		echo $n3;

		echo $vals[$n3]['tag'].", ";
		echo $vals[$n3]['type'].", ";
		echo $vals[$n3]['level'].", ";
		echo $vals[$n3]['attributes'].", ";
		echo $vals[$n3]['value'].", ";
		echo "<br>";

		// Печать значений тега A
		$n3 = $index["A"][$num1+1];
		echo $n3;
		echo $vals[$n3]['value'].", ";
		echo "<br>";
		// Печать атрибутов тега A
		if (isset($vals[$n3]['attributes']))
		  {
			print_r ($vals[$n3]['attributes']);
			echo "<br>";
		  }

/*
		echo "<hr>";
		for ($n2 = 0; $n2 <= sizeof($vals); $n2++)
		   {
			if (($vals[$n2]['tag'] == "LOCATION")  AND ($vals[$n2]['type'] == "open"))
			  {
				echo $n2;
				echo $vals[$n2]['tag'].", ";
				echo $vals[$n2]['type'].", ";
				echo $vals[$n2]['level'].", ";
				echo $vals[$n2]['attributes'].", ";
				echo $vals[$n2]['value'].", ";
				echo "<br>";
			  }//------------------------ end if
		   }//------------------------ end for
*/
//-------------------------------------------
/*
		// Печать значений тега  FILESHARING
		$n3 = $index["FILESHARING"][0]-1;
		echo $vals[$n1+$n3]['tag'].", ";
		echo $vals[$n1+$n3]['type'].", ";
		echo $vals[$n1+$n3]['level'].", ";
		echo $vals[$n1+$n3]['attributes'].", ";
		echo $vals[$n1+$n3]['value'].", ";
		echo "<br>";

		// Печать значений тега A
		$n3 = $index["A"][1]-1;
		echo $vals[$n1+$n3]['value'].", ";
		echo "<br>";
		// Печать атрибутов тега A
		if (isset($vals[$n1+$n3]['attributes']))
		  {
			print_r ($vals[$n1+$n3]['attributes']);
			echo "<br>";
		  }
*/
/*
		// определить номер элемента массива, содержащего описание клипа
		// 1. С помощью поиска по массиву INDEX
		for ($n3 = 0; $n3 <= sizeof($index["DESCRIPTION"]); $n3++)
		   {
			if ($index["DESCRIPTION"][$n3] == $n1+1)
			  {
				$n4 = $index["DESCRIPTION"][$n3];
				//echo $vals[$n4]['tag'];
				echo "Описание: ";
				echo $vals[$n4]['value'];
				echo "<br>";
			  }
		   }
/*
/*
		// определить номер элемента массива, содержащего описание клипа
		// 2. С помощью поиска по массиву VALS
		for ($n2 = 0; $n2 <= sizeof($vals); $n2++)
		   {
			if ($vals[$n2]['tag'] == "DESCRIPTION")
			  {
				//echo $n2.".";
				//echo $vals[$n2]['tag'].", ";
				//echo $vals[$n2]['type'].", ";
				//echo $vals[$n2]['level'].", ";
				//echo $vals[$n2]['attributes'].", ";
				//echo $vals[$n2]['value'].", ";
				//echo "<br>";
				if ($n2 == $n1+1)
				  {
					echo "Описание: ";
					echo $vals[$n2]['value'];
					echo "<br>";
				  }//------------------------ end if
			  }//------------------------ end if
		   }//------------------------ end for
*/
////////////////////////////////////////////////////////


		$num1++;
		$num2=$num2+3;
		echo "<hr>";
////////////////////////////////////////////////////////
	  }//------------------------ end if
   }//------------------------ end for


?>
</body>
</html>

