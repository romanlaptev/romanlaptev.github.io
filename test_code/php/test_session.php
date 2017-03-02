<h1>PHP: test SESSION</h1>
http://php.net/manual/ru/book.session.php
<pre>
<?php

session_start();
print_r($_SESSION);
echo '<hr>';

echo "Session name: " . session_name();
echo '<hr>';

$_SESSION['username'] = "admin";
echo 'Hi, '.$_SESSION['username'];
echo '<br>';

unset($_SESSION['username']);

echo 'Hi, '.$_SESSION['username'];
echo '<br>';

session_destroy();

print_r( ini_get_all("session") );
echo '<hr>';
?>
</pre>