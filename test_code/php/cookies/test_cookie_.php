<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

$value = "test";
$expiries = 60; //sec.
setcookie ("TestCookie", $value, time() + $expiries);	

echo "<pre>";
print_r($_REQUEST);
print_r($_COOKIE);
echo "</pre>";

function showForm() {
	$string = "<form action = '".$_SERVER["SCRIPT_NAME"]."' method='post'>";
	$string .= "<label>username: </label>";
	$string .= "<input type = 'text' name = 'username'>";
	$string .= "<br />";
	$string .= "<label>password: </label>";
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

if (isset($_POST['log'])) {
	
	$username = $_POST['username'];
	$pass = md5($_POST['pass']);
	
	if ( check($username, $pass) ) {
		$expiries = 60;
		setcookie("username", $username, time() + $expiries);
		setcookie("pass", $pass, time() + $expiries);
	} else {
		echo "access denied!";
	}
}
?>

<html>
<head>
</head>
<body>
<h1>PHP: test COOKIE</h1>

<pre>
http://php.net/manual/ru/features.cookies.php
http://php.net/manual/ru/function.setcookie.php
https://myrusakov.ru/cookie-php.html
https://www.w3schools.com/php/php_cookies.asp
</pre>

<?php
	$username = $_COOKIE['username'];
	$pass = $_COOKIE['pass'];
	if (check($username, $pass)) {
		echo "Hi, $username";
	} else {
		echo showForm();
	}
?>

</body>
</html>


<?php


unset($_COOKIE["test"]);
/*Or*/
//setcookie("yourcookie","yourvalue",time()-1);
/*it expired so it's deleted*/


echo '<hr>';
/*
[session.cookie_domain] => Array
        (
            [global_value] => 
            [local_value] => 
            [access] => 7
        )

    [session.cookie_httponly] => Array
        (
            [global_value] => 
            [local_value] => 
            [access] => 7
        )

    [session.cookie_lifetime] => Array
        (
            [global_value] => 0
            [local_value] => 0
            [access] => 7
        )

    [session.cookie_path] => Array
        (
            [global_value] => /
            [local_value] => /
            [access] => 7
        )

    [session.cookie_secure] => Array
        (
            [global_value] => 
            [local_value] => 
            [access] => 7
        )
*/		
echo session.cookie_path ." = ". ini_get("session.cookie_path");
echo '<hr>';
?>