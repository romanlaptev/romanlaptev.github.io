<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

session_start();
$_SESSION['test'] = "test1";

echo "<pre>";
print_r($_REQUEST);
print_r($_SESSION);
echo "</pre>";

function showForm() {
	$string = "<form action = '' method='post'>";
	$string .= "<label>Username: </label>";
	$string .= "<input type = 'text' name = 'username'>";
	$string .= "<br />";
	$string .= "<label>Password: </label>";
	$string .= "<input type = 'password' name = 'pass'>";
	$string .= "<br />";
	$string .= "<input type = 'submit' name = 'log' value = 'Enter'>";
	$string .= "</form>";
	return $string;
}

function check($username, $pass) {
	if (($username == "admin") && ($pass == md5("123456"))) {
		return true;
	} else {
		return false;
	}
}

function out(){
	$_SESSION = array();//clear session
	session_destroy();
}//end out()


if (isset($_POST['log'])) {
	
	$username = $_POST['username'];
	$pass = md5($_POST['pass']);
	
	if ( check($username, $pass) ) {
		/*
		$expiries = 60;
		setcookie("username", $username, time() + $expiries);
		setcookie("pass", $pass, time() + $expiries);
		*/
		$_SESSION['is_auth'] = true;
		$_SESSION['user'] = $username;
		
	} else {
		$_SESSION['is_auth'] = false;
		echo "access denied!";
	}
	
}


if (isset($_GET["is_exit"])) {
	if ($_GET["is_exit"] == 1) {
		out(); //Выходим
		header("Location:".$_SERVER["SCRIPT_NAME"]);
	}
}

?>

<html>
<head></head>
<body>
<h1>PHP: test SESSION</h1>
http://php.net/manual/ru/book.session.php
http://phpfaq.ru/sessions
http://anton.shevchuk.name/php/php-for-beginners-session/
http://php.net/manual/ru/function.md5.php
http://php.net/manual/ru/function.sha1.php
<br>
<?php
echo "Session name: " . session_name();
echo '<hr>';
//session_destroy();
?>

<?php
	//out();
	if( $_SESSION['is_auth'] ){
		echo "Hi, ". $_SESSION['user'];
		echo "<br/><br/><a href='?is_exit=1'>Exit</a>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";
		//out();
	} else {
		echo showForm();
	}
?>


<?php
echo '<pre>';
print_r( ini_get_all("session") );
echo '</pre>';
?>

</body>
</html>
