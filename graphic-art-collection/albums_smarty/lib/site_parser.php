<?
//****************************
// MAIN
//****************************
echo "<pre>";
//print_r($_SERVER);
print_r($_REQUEST);
//print_r($_FILES);
echo "</pre>";
echo getcwd();
echo "<br>";

$log = "";
$message = "";

//==========================================================================
// Извлекаем параметры из запроса
//==========================================================================
if (!empty($_REQUEST['url']))
{
	$url = $_REQUEST['url'];
}
else
{
	$message .= "<span class='error'>var url is empty!</span>";
	$message .= "<br>";
	$form=view_form(); // вывод формы
}

if ($_REQUEST['save'] == 'on')
  {
	$save='on';
	//директория для сохранения полученных файлов
	if (!empty($_REQUEST['save_dir']))
	{
		$save_dir = $_REQUEST['save_dir'];
	}
	else
	{
		$message .= "<span class='error'>var save_dir is empty!</span>";
		$message .= "<br>";
		$form=view_form(); // вывод формы
	}
  }


//if (!isset($_REQUEST['action']) && empty($_REQUEST['action']))
if (empty($_REQUEST['action']))
  {
	$form=view_form(); // вывод формы
  }
else // Параметр action определен
  {
	$action = $_REQUEST['action'];

	switch ($action)
	  {
//==========================================================================
		case grab:
			$form=view_form(); // вывод формы

			//if (!empty($url) && !empty($save_dir))
			if (!empty($url))
			{
$log .= "Grab url ".$url;
$log .= "<br>";
				$content = grab($url); 
//echo nl2br($content);
//echo "<br>";				
				if ($save == 'on')
				  {
					if (!empty($save_dir))
					{

						if (!file_exists($save_dir))
						{
							if (mkdir($save_dir))
							{
$message .= "<span class=ok>Create </span>".$save_dir;
$message .= "<br>";
								$out_filename = "index.html";
								$filename = $save_dir."/".$out_filename;
$log .= "and save content in ".$filename;
$log .= "<br>";
								//file_put_contents ($filename, nl2br($content));
								$result_save = file_put_contents ($filename, $content);
								if ($result_save > 0)
								  {
$message .= "<span class=ok>Save page in </span>".$filename.", ".$result_save." bytes";
$message .= "<br>";
								  }
								else
								  {
$message .= "<span class=error>Error! Dont save page </span>".$filename.", ".$result_save." bytes";
$message .= "<br>";
								  }
							}
							else
							{
$message .= "<span class=error>Not exists </span>".$save_dir.", error create";
$message .= "<br>";
							}
						}
					}
				  }
			}

		break;
//==========================================================================
		case parse:
			$form=view_form(); // вывод формы
$log .= "Parce url ".$url;
$log .= "<br>";
$log .= "from the ".$tag_start;
$log .= "<br>";
$log .= "to the ".$tag_end;
$log .= "<br>";
		break;
//==========================================================================
		default:
			$form=view_form(); // вывод формы
		break;
//==========================================================================
	  }//------------------------------ end switch


  }//--------------------------------- end elseif action
//=================================================================================

//====================
// FUNCTIONS
//====================
//-------------------------
// ФОРМА ввода параметров парсинга
//-------------------------
function view_form()
{
	$out="";
	$out .= "<form method=post name=form_parser action='".$_SERVER['SCRIPT_NAME']."'>";
	$out .= "<fieldset><legend><b>Параметры парсинга</b></legend>";

//-------------------------------------
	$out .= "	<div class='section'>";
	$out .= "Страницы сайта <br>";
	$out .= "<b>url</b>: <input type=text name=url size='80' value=''/><br>";
	$out .= "http://mycomp/transcend/0_sites/smarty_site/<br>";
	$out .= "http://wizargraphics.dax.ru/smarty_site/<br>";
	$out .= "<p>сохранить <input type='checkbox' name='save'></p> в ";
	$out .= "<b>save_dir</b>: <input type=text name=save_dir size='80' value='grab_content'/><br>";
	$out .= "/mnt/disk2/temp/grab_content<br>";
	$out .= "/../../grab_content<br>";
	$out .= "/home/u131428543/public_html/temp/grab_content";
	$out .= "<p>включая подкаталоги <b>sub</b><input type='checkbox' name='sub'></p>";
	$out .= "	</div>";

	$out .= "	<div class='section'>";
	$out .= "Стартовый тег для парсинга контента:<br>";
	$out .= "<b>tag_start</b>: <input type=text name=tag_start size='80' value='<div class=\"l-content\">'/><br>";
	$out .= "Конечный тег участка кода для парсинга:<br>";
	$out .= "<b>tag_end</b>: <input type=text name=tag_end size='80' value='<br class=\"clear\"/>'/><br>";
	$out .= "	</div>";

	$out .= "<b>action</b>:<br>";
	$out .= "<input type=radio name=action value='grab'>grab<br>";
	$out .= "<input type=radio name=action value='parse'>parce<br>";
	$out .= "<input type=submit value='submit'>";
	$out .= "</fieldset></form>";

	return $out;
} //-------------------------- end func

function grab($url)
{
//echo "function grab($url)";
//echo "<br>";

	//Получаем весь код страницы
	$content = file_get_contents($url);
//echo "<pre>";
//echo htmlspecialchars($content);
//echo "</pre>";				

/*
	//Ищем позицию с которой мы будем вырезать код для дальнейшего использования
	$position = strpos($content, $start);

	//Вырезаем нужный блок
	$content = substr($content, $position);
	$position = strpos($content, $finish);
  
	//Вырезаем код
	$content = substr($content, 0, $position);

	//Вырезаем HTML теги
	//Для добавления\удаления используемых тегов допишите\удалите теги
	$content = strip_tags($content, '<p><a>');
*/
	//Debug (Проверка того, что выводит парсер)
	//echo nl2br($content);

	return $content;
} //-------------------------- end func

?>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>site parser, grabber</title>
	<style>
legend
{
	color:green;
	font-size:16px;
}
input
{
	margin:10px;
}
.section
{
	border:1px solid;
	margin:20px;
	padding:5px;
	width:870px;
}
.param
{
	color:darkblue;
}
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	color:green;
}
.warning
{
	color:blue;
}
#info_message
{
	border: 1px solid;
	min-height: 30px;
/*
	background:darkred;
	position:absolute;
	top:20px;
	right:20px;
    float: right;
    width: 250px;	
*/
}
#form
{
}
#log
{
	border: 1px solid;
	min-height: 100px;
}
	</style>
</head>
<body>

<div id='info_message'><?php echo $message; ?></div>
<div id='form'><?php echo $form; ?></div>
<div id='log'><?php echo $log; ?></div>


<div>
<?php 
	echo "<pre>";
	echo htmlspecialchars($content);
	echo "</pre>";				
?>
</div>


</body>
</html>

