<?
echo "<pre>";
print_r ($_REQUEST);
echo "</pre>";

// Извлекаем параметры из запроса
//if (!isset($_REQUEST['action']) && empty($_REQUEST['action']))
if (empty($_REQUEST['action']))
  {
	view_form(); // вывод формы выбора параметров парсинга
  }
else // Параметр action определен
  {
	$action = $_REQUEST['action'];

	if (isset($_REQUEST['path']) && !empty($_REQUEST['path']))
	  {
		$path = $_REQUEST['path'];
	  }
	else
	  {
		echo "<font color=red>need path.... </font>";
		exit();
	  }

	switch ($action)
	  {
//==========================================================================
		case download_site:
			if (isset($_REQUEST['url']) && !empty($_REQUEST['url']))
			  {
				$url = $_REQUEST['url'];
			  }
			else
			  {
				echo "<font color=red>need url.... </font>";
				exit();
			  }
			echo "<h2>WGET, download_site</h2>";
			$command = "wget "
."--recursive "
//."--convert-links "
."--level=7 "
//."-p "
//."-E "
."--no-parent "
."--no-clobber "
//."--restrict-file-names=windows "
."--directory-prefix="
.$path
." --no-host-directories "
."--cut-dirs=2 "
."--reject \"*.jpg, *.gif, *.png\" "
//."--accept \"*.html,*.css\" "
//."-o ".$path."/report.txt "
.$url;
			echo $command;
			echo "<br>";

			system($command);
			//passthru($command);
echo "path = ".$path;
echo "<br>";
echo "url = ".$url;
echo "<br>";
		break;
//==========================================================================
		case decode_pages:
			if (isset($_REQUEST['charset_in']))
			  {
				$charset_in = $_REQUEST['charset_in'];
			  }
			else
			  {
				echo "<font color=red>need charset_in... </font>";
				exit();
			  }

			if (isset($_REQUEST['charset_out']))
			  {
				$charset_out = $_REQUEST['charset_out'];
			  }
			else
			  {
				echo "<font color=red>need charset_out... </font>";
				exit();
			  }

			echo "ICONV, decode pages";
			echo "<br>";
$command = "find ".$path." -type f -name '*.html' | while read i; do iconv -f ".$charset_in." -t ".$charset_out." \"\$i\" >tmp; mv tmp \"\$i\"; done";
echo $command;
echo "<br>";
			system($command);
		break;
//==========================================================================
		case replace_pages_text:

			if (isset($_REQUEST['file_mask']) && !empty($_REQUEST['file_mask']))
			  {
				$file_mask = $_REQUEST['file_mask'];
			  }
			else
			  {
				echo "<font color=red>need file_mask... </font>";
				exit();
			  }

			if (isset($_REQUEST['search_text']) && !empty($_REQUEST['search_text']))
			  {
				$search_text = $_REQUEST['search_text'];
			  }
			else
			  {
				echo "<font color=red>need search_text... </font>";
				exit();
			  }

			if (isset($_REQUEST['replace_text']) && !empty($_REQUEST['replace_text']))
			  {
				$replace_text = $_REQUEST['replace_text'];
			  }
			else
			  {
				echo "<font color=red>need replace_text... </font>";
				exit();
			  }

			echo "SED, replace pages text";
			echo "<br>";
$command = "find ".$path." -type f -name '".$file_mask."' | while read i; do sed \"s/".$search_text."/".$replace_text."/g\" \"\$i\" >tmp; mv tmp \"\$i\"; done";
echo $command;
echo "<br>";
//sed "s/mycomp/mycomppp/g" page_list_galleries@termid=75.html
//sed "s/href=\"http:\/\/mycomp/href=/g" page_list_galleries@termid=75.html
//sed "s/href=\"http:\/\/mycomp/href=\"\/content/g" page_list_galleries@termid=75.htm
//find /mnt/disk2/temp/albums -type f -name '*.html' | while read i; do sed "s/href=\"http:\/\/mycomp\/content/href=\"\/content/g" "$i"; done


			system($command);
		break;
//==========================================================================
		case correct_file_names:

			if (isset($_REQUEST['file_mask']) && !empty($_REQUEST['file_mask']))
			  {
				$file_mask = $_REQUEST['file_mask'];
			  }
			else
			  {
				echo "<font color=red>need file_mask... </font>";
				exit();
			  }

			if (isset($_REQUEST['search_text']) && !empty($_REQUEST['search_text']))
			  {
				$search_text = $_REQUEST['search_text'];
			  }
			else
			  {
				echo "<font color=red>need search_text... </font>";
				exit();
			  }

			if (isset($_REQUEST['replace_text']) && !empty($_REQUEST['replace_text']))
			  {
				$replace_text = $_REQUEST['replace_text'];
			  }
			else
			  {
				echo "<font color=red>need replace_text... </font>";
				exit();
			  }
			echo "SED, correct file name";
			echo "<br>";
$command = "find ".$path." -type f -name '".$file_mask."' | while read x; do mv \$x `echo \$x | sed \"s/".$search_text."/".$replace_text."/g\"`; done";
echo $command;
echo "<br>";
			system($command);
		break;
//==========================================================================
		case upload_site:
			if (isset($_REQUEST['url']) && !empty($_REQUEST['url']))
			  {
				$url = $_REQUEST['url'];
			  }
			else
			  {
				echo "<font color=red>need url.... </font>";
				exit();
			  }
			if (isset($_REQUEST['local_path']) && !empty($_REQUEST['local_path']))
			  {
				$local_path = $_REQUEST['local_path'];
			  }
			else
			  {
				echo "<font color=red>local_path.... </font>";
				exit();
			  }

			if (isset($_REQUEST['upload_path']) && !empty($_REQUEST['upload_path']))
			  {
				$upload_path = $_REQUEST['upload_path'];
			  }
			else
			  {
				echo "<font color=red>upload_path.... </font>";
				exit();
			  }

			if (isset($_REQUEST['server']) && !empty($_REQUEST['server']))
			  {
				$server = $_REQUEST['server'];
			  }
			else
			  {
				echo "<font color=red>server.... </font>";
				exit();
			  }

			if (isset($_REQUEST['user']) && !empty($_REQUEST['user']))
			  {
				$user = $_REQUEST['user'];
			  }
			else
			  {
				echo "<font color=red>user.... </font>";
				exit();
			  }
			
			if (isset($_REQUEST['pwd']) && !empty($_REQUEST['pwd']))
			  {
				$pwd = $_REQUEST['pwd'];
			  }
			else
			  {
				echo "<font color=red>pwd.... </font>";
				exit();
			  }
			
			echo "WPUT, upload site";
			echo "<br>";
$command = "cd $local_path";
echo $command;
echo "<br>";
			system($command);

$command = "wput --verbose --reupload * ftp://".$user.":".$pwd."@".$server.$upload_path."/";
echo $command;
echo "<br>";
			system($command);
		break;
//==========================================================================
		case test_player:
$command = "cvlc /mnt/d2/video/films/S/Skini.Romper.Stomper.avi";
echo $command;
echo "<br>";
			system($command);
		break;
//==========================================================================
	  }//------------------------------ end switch


  }//--------------------------------- end elseif action
//=================================================================================

//====================
// FUNCTIONS
//====================
//---------------------------------------------------------------------
// ВЫВОД ФОРМЫ ПАРАМЕТРОВ ПАРСИНГА
//---------------------------------------------------------------------
function view_form()
{
echo"
<html>
<head>
<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />
	<style>
legend
{
	color:red;
	font-size:16px;
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
	</style>
</head>
<body>
<!-- ================================================= -->
<form name=form_parse_pages2 method=post action='".$_SERVER['SCRIPT_NAME']."' target=_blank>
	<fieldset>
		<legend><b>Offline sites</b></legend>

		<div class='section'>
<b>URL</b>:
<input type='text' name='url' value='' size=60>
			<p class='param'>
http://smarty_site/<br>
http://mycomp/transcend/sites/smarty_site/<br>
http://mycomp/transcend/sites/albums/<br>
http://mycomp/book_history_engraving/<br>
http://gravura.local/<br>
			</p>

<b>PATH</b>:
<input type='text' name='path' value='' size=60>
			<p class='param'>
/mnt/disk2/temp<br>
/mnt/disk2/documents/0_sites/site.test<br>
/albums<br>
/gravura<br>
/book_history_engraving<br>
/var/www/sites/gravura<br>
			</p>
		</div>

		<div class='section'><b>ICONV, change charset pages</b>:<br>
			charset_in:<input type='text' name='charset_in' value='UTF-8' size=20><br>
			charset_out:<input type='text' name='charset_out' value='WINDOWS-1251' size=20>
			<p class='param'>
UTF-8<br>
WINDOWS-1251<br>
			</p>
		</div>

		<div class='section'>
			file_mask:<input type='text' name='file_mask' value='' size=20><br>
			<p class='param'>
*.html<br>
*.css<br>
*.css@O.css<br>
*.js@k<br>
*.js@O<br>
			</p>

			search_text:<input type='text' name='search_text' value='' size=60><br>
			replace_text:<input type='text' name='replace_text' value='' size=60><br>
		<b>SED, replace text in pages</b>:<br>
			<p class='param'>
charset=utf-8 -> charset=windows-1251<br>
.css@O.css -> .css<br>
.js@O-> .js<br>
.css@k.css -> .css<br>
.js@k -> .js<br>
@page=<br>
&lt;a rel=\"lightbox\" href=\"http:\/\/mycomp\/content<br>
&lt;a rel=\"lightbox\" href=\"\/content<br>
http:\/\/mycomp\/<br>
\/<br>
http:\/\/gravura.ts6.ru\/<br>
http://mycomp/transcend/0_sites/book_history_engraving/
			</p>

		<b>SED, correct file name</b>:<br>
			<p class='param'>
.css@O.css -> .css<br>
.js@O-> .js<br>
.css@k.css -> .css<br>
.js@k -> .js<br>
@page=<br>
			</p>
		</div>

		<div class='section'><b>WPUT, upload pages</b>:<br>
			FTP server:<input type='text' name='server' value='' size=20>
			FTP user:<input type='text' name='user' value='' size=10>
			FTP pwd:<input type='text' name='pwd' value='' size=10>
			<p class='param'>
rex.dax.ru<br>
u301005<br>
zh3oroyb<br>
			</p>

			local_path:<input type='text' name='local_path' value='' size=30>
			upload_path:<input type='text' name='upload_path' value='' size=30>
			<p class='param'>
local_path=/mnt/disk2/temp/albums<br>
upload_path=/public_html/pages/albums<br>
			</p>
		</div>

		<div class='section'>
			<p>action	<input type='text' name='action' value=''><input type=submit value='run script'></p>
			<p class='param'>
download_site<br>
decode_pages<br>
replace_pages_text<br>
correct_file_names<br>
upload_site<br>
test_player<br>
			</p>
		</div>

	</fieldset>
</form>
<!-- ================================================= -->

</body>
</html>";

} //-------------------------- end func

?>
