<?
//***************************************************************
// Загрузка HTML-страницы на хостинг
//***************************************************************
function ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir)
{
	$conn_id=ftp_connect($server,21,60);
	if ($conn_id)
	 {
		echo "Connect to $server<br>\n";
	 }
	else
		echo "Dont connect to $server<br>\n";

	$login_result=ftp_login($conn_id,$user,$pwd);
	if ($login_result)
	 {
		echo "Login in $server<br>\n";
	 }
	else
		echo "Dont login in $server<br>\n";

	ftp_pasv($conn_id, true);
	if (isset ($dir))
	  {
		if (ftp_chdir($conn_id, $dir))
		 {
			echo "current dir: " . ftp_pwd($conn_id) . "<br>\n";
		  } 
		else
		 { 
			echo "error ftp_chdir $dir <br>\n";
			echo "current dir: " . ftp_pwd($conn_id) . "<br>\n";
		 }
	 }

	if (ftp_put($conn_id,$remote_file,$local_file,FTP_ASCII))
	//if (ftp_put($conn_id,$remote_file,$local_file,FTP_BINARY))
	  {
		echo "succesfully uploaded $remote_file on $server<br>\n";
	 }
	else
		echo "Error uploaded $remote_file on $server<br>\n";

    ftp_quit($conn_id);
}
//-----------------------------------------------------end func

//****************************
// MAIN
//****************************
echo "POST:<pre>";
print_r ($_POST);
echo "</pre>";

echo "FILES:<pre>";
print_r ($_FILES);
echo "</pre>";

$charset = "utf-8";
$tpl_p1 = "<html>\n<head>\n<meta http-equiv=Content-Type content=text/html; charset=$charset>\n
</head>\n<body>\n";
$tpl_p2 = "</body>\n</html>\n";

echo $tpl_p1;

if (isset($_REQUEST['action']))
  {
	$action=$_REQUEST['action']; 
  }

if  ($action == "upload")
   {
	if ((isset($_REQUEST['local_file'])) AND ($_REQUEST['local_file']!=""))
	  {
		$local_file="../pages/".$_REQUEST['local_file']; 
//$local_file="/mnt/disk2/documents/0_sites/my_sites/pages/list_articles.html";
	  }
	else
	  {
		echo "<font color=\"red\">need local_file</font>";
		exit;
	  }

	if ((isset($_REQUEST['remote_file'])) AND ($_REQUEST['remote_file']!=""))
	  {
		$remote_file=$_REQUEST['remote_file']; 
	  }
	else
	  {
		echo "<font color=\"red\">need remote_file</font>";
		exit;
	  }

	if ((isset($_REQUEST['server'])) AND ($_REQUEST['server']!=""))
	  {
		$server=$_REQUEST['server']; 
	  }
	else
	  {
		echo "<font color=\"red\">need server</font>";
		exit;
	  }

	if ((isset($_REQUEST['user'])) AND ($_REQUEST['user']!=""))
	  {
		$user=$_REQUEST['user']; 
	  }
	else
	  {
		echo "<font color=\"red\">need user</font>";
		exit;
	  }

	if ((isset($_REQUEST['pwd'])) AND ($_REQUEST['pwd']!=""))
	  {
		$pwd=$_REQUEST['pwd']; 
	  }
	else
	  {
		echo "<font color=\"red\">need pwd</font>";
		exit;
	  }

	if ((isset($_REQUEST['remote_dir'])) AND ($_REQUEST['remote_dir']!=""))
	  {
		$dir=$_REQUEST['remote_dir']; 
	  }

	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

   }
// -------------------- end action

if  ($action == "mass_upload")
   {
	if ((isset($_REQUEST['local_file'])) AND ($_REQUEST['local_file']!=""))
	  {
		$local_file="../pages/".$_REQUEST['local_file']; 
	  }
	else
	  {
		echo "<font color=\"red\">need local_file</font>";
		exit;
	  }

	if ((isset($_REQUEST['remote_file'])) AND ($_REQUEST['remote_file']!=""))
	  {
		$remote_file=$_REQUEST['remote_file']; 
	  }
	else
	  {
		echo "<font color=\"red\">need remote_file</font>";
		exit;
	  }

	$server='ftp.narod.ru';
	$user='roman-laptev';
	$pwd='';
	$dir='pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='roman-laptev.hut1.ru';
	$user='romanla';
	$pwd='';
	$dir='WWW/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

//$ftp_server='nas';
//$ftp_username='roman';
//$ftp_pwd='';

	$server='roman-laptev.ucoz.ru';
	$user='0roman-laptev';
	$pwd='';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='rex.dax.ru';
	$user='u301005';
	$pwd='zh3oroyb';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='rex.hop.ru';
	$user='w336486';
	$pwd='wl9fgg4k';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='bookz.aiq.ru';
	$user='u335427';
	$pwd='3qd8do5i';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='lib.wallst.ru';
	$user='u335492';
	$pwd='b3nfr52w';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='rlaptev.far.ru';
	$user='w300020';
	$pwd='qpe3ca9m';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='2beta.co.cc';
	$user='acc2';
	$pwd='Nfo7tAv';
	$dir='www/2beta.co.cc/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	$server='beta.hut2.ru';
	$user='beta8';
	$pwd='a8t1FkHs';
	$dir='public_html/pages';
	ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

	//$ftp_server='vodovodoff.far.ru';
	//$ftp_username='w261665';
	//$ftp_pwd='bu884uif';

	$server='pub.fotoland.ru';
	$user='luser';
	$pwd='luserpass';
	$dir='';
	//ftp_upload($server,$user,$pwd,$remote_file,$local_file,$dir);

   }
// -------------------- end action

echo $tpl_p2;

?>

