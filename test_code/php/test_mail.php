<?
echo "test mail";
/*
if (mail("roman-laptev@yandex.ru", "test6", "Line 1\nLine 2\nLine 3"))
  {
	echo "send letter";
  }
else
	echo "error send";
*/
require("phpmailer/class.phpmailer.php"); // укажите путь к файлу class.phpmailer.php
$mail = new PHPMailer();
$mail->IsSMTP();// отсылать используя SMTP
$mail->Host     = "mail.ayola.net"; // SMTP сервер
$mail->SMTPAuth = true;     // включить SMTP аутентификацию
$mail->Username = "vero@ts6.ru";  // SMTP username
$mail->Password = "9dfd6cbc"; // SMTP password
$mail->From     = "vero@ts6.ru"; // укажите от кого письмо
$mail->FromName = "Mailer"; // имя отправителя
$mail->AddAddress("roman-laptev@yandex.ru","Name"); // е-мэил кому отправлять
$mail->AddReplyTo("vero@ts6.ru","Info"); // е-мэил того кому прейдет ответ на ваше письмо
$mail->WordWrap = 50;// set word wrap
$mail->IsHTML(true);// отправить в html формате

$mail->Subject  =  "subject1"; // тема письма
$mail->Body     =  "test1"; // тело письма в html формате

$mail->AltBody  =  "This is the text-only body"; // тело письма текстовое

if(!$mail->Send())
{
   echo "Письмо не отправлено ";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}
echo "Письмо отправлено";

/*
error_reporting(E_ALL); // Âûâîä îøèáîê.

$to  = 'user@example.com';

$subject = 'Òåìà ïèñüìà';

$message = 'Òåêñò ïèñüìà';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=windows-1251' . "\r\n";
$headers .= 'To: user <user@example.com>' . "\r\n";
$headers .= 'From: server <server@example.com>' . "\r\n";

mail($to, $subject, $message, $headers);
*/

//phpinfo();
?>
