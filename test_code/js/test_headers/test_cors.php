<?php
//header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-Auth-Token, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Origin");
//header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Credentials: true ");

//getallheaders — Возвращает все заголовки HTTP-запроса
foreach (getallheaders() as $name => $value) {
    echo "$name: $value\n";
}

echo "<pre>";
print_r($_REQUEST);
echo "</pre>";

phpinfo();
?>