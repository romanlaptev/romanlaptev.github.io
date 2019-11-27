<?
$link = mysql_connect('localhost','crockid','fMg4qWz1');
$res = mysql_query('SELECT version()');
echo "Mysql Version:  ".mysql_result($res,0,0); 
mysql_select_db("crockid") or die("Could not select database");

//"0-6мес" перенеслись в "0-12мес"
//$query="UPDATE structure SET name = '0-12 мес.' WHERE id = 766;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//"6-24мес" перенеслись в две группы "0-12мес" и "12мес-5лет"
//$query="UPDATE structure SET name = '1-5 лет' WHERE id = 757;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//"3-6 лет" перенеслись в две группы "12мес-5лет" и "5-10лет"
//$query="UPDATE structure SET name = '5-10 лет' WHERE id = 756;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//===========================================
//"6-9лет" перенеслись в "5-10лет"
//===========================================
$structure_id = 754; //раздел девочкам, 6-9 Лет
$new_structure_id = 764;//раздел девочкам, 5-10 Лет
$query="SELECT * FROM product_structure WHERE structure_id=".$structure_id;
$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");
if (mysql_num_rows($res) > 0)
{
	while ($row = mysql_fetch_assoc($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		//перенести товар из раздела девочкам, 6-9 Лет в раздел девочкам, 5-10 Лет
		$query2="UPDATE product_structure SET structure_id ="
.$new_structure_id." WHERE product_id =".$row['product_id']." AND structure_id =".$structure_id.";";
echo $query2;
echo "<br>";
		$res2 = mysql_query($query2) or die ("<font color=red>".mysql_error()."</font>");
	}
}
//===========================================

$structure_id = 755; //раздел мальчикам, 6-9 Лет 
$new_structure_id = 763;//раздела мальчикам, 5-10 Лет (ex 3-6 Лет),
$query="SELECT * FROM product_structure WHERE structure_id=".$structure_id;
$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");
if (mysql_num_rows($res) > 0)
{
	while ($row = mysql_fetch_assoc($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		//перенести товар из раздела девочкам, 6-9 Лет в раздел девочкам, 5-10 Лет
		$query2="UPDATE product_structure SET structure_id ="
.$new_structure_id." WHERE product_id =".$row['product_id']." AND structure_id =".$structure_id.";";
echo $query2;
echo "<br>";
		$res2 = mysql_query($query2) or die ("<font color=red>".mysql_error()."</font>");
	}
}
//===========================================

mysql_close($link);

?>