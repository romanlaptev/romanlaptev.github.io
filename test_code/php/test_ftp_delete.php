<?
$host = "nas";
$connect = ftp_connect($host);

if(!$connect)
{
echo("Ошибка соединения");
exit;
}
else
{
echo("Соединение установлено");
}

//ftp_login($connect, "anonymous", "super");
$user = "anonymous";
$password = "super";
$result = ftp_login($connect, $user, $password);

ftp_chdir ($connect,"data/public/lib/books/A");
//ftp_mkdir ($connect,"test3");

$file="humor_ALISA.TXT";
if (ftp_delete($connect, $file))
  {
    echo "$file deleted successful\n";
  } 
else 
  {
    echo "could not delete $file\n";
  }

ftp_quit($connect);

?>