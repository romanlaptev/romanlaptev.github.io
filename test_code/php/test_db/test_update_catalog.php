<?
$link = mysql_connect('localhost','crockid','fMg4qWz1');
$res = mysql_query('SELECT version()');
echo "Mysql Version:  ".mysql_result($res,0,0); 
mysql_select_db("crockid") or die("Could not select database");

//"0-6���" ����������� � "0-12���"
//$query="UPDATE structure SET name = '0-12 ���.' WHERE id = 766;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//"6-24���" ����������� � ��� ������ "0-12���" � "12���-5���"
//$query="UPDATE structure SET name = '1-5 ���' WHERE id = 757;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//"3-6 ���" ����������� � ��� ������ "12���-5���" � "5-10���"
//$query="UPDATE structure SET name = '5-10 ���' WHERE id = 756;";
//$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");

//===========================================
//"6-9���" ����������� � "5-10���"
//===========================================
$structure_id = 754; //������ ��������, 6-9 ���
$new_structure_id = 764;//������ ��������, 5-10 ���
$query="SELECT * FROM product_structure WHERE structure_id=".$structure_id;
$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");
if (mysql_num_rows($res) > 0)
{
	while ($row = mysql_fetch_assoc($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		//��������� ����� �� ������� ��������, 6-9 ��� � ������ ��������, 5-10 ���
		$query2="UPDATE product_structure SET structure_id ="
.$new_structure_id." WHERE product_id =".$row['product_id']." AND structure_id =".$structure_id.";";
echo $query2;
echo "<br>";
		$res2 = mysql_query($query2) or die ("<font color=red>".mysql_error()."</font>");
	}
}
//===========================================

$structure_id = 755; //������ ���������, 6-9 ��� 
$new_structure_id = 763;//������� ���������, 5-10 ��� (ex 3-6 ���),
$query="SELECT * FROM product_structure WHERE structure_id=".$structure_id;
$res = mysql_query($query) or die ("<font color=red>".mysql_error()."</font>");
if (mysql_num_rows($res) > 0)
{
	while ($row = mysql_fetch_assoc($res))
	{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
		//��������� ����� �� ������� ��������, 6-9 ��� � ������ ��������, 5-10 ���
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