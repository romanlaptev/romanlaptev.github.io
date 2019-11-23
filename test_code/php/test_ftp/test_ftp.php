<?
$file='readme.txt';
$remote_file='readme2.txt';

$ftp_server='ftp.narod.ru';
$ftp_username='roman-laptev';
$ftp_pwd='';

$conn_id=ftp_connect($ftp_server);
$login_result=ftp_login($conn_id,$ftp_username,$ftp_pwd);
if (ftp_put($conn_id,$remote_file,$file,FTP_ASCII))
  {
    echo "succesfully uploaded $file<br>\n";
  }
?>

