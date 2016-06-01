#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<pre>"

user_db="toool"
password="******"
db_name="toool"
backup_dir="/usr/local/www/vhosts/toool/data/backup/toool.ru"

#user_db="testtoool"
#password="******"
#db_name="testtoool"
#backup_dir="/usr/local/www/vhosts/toool/data/backup/test.toool.ru"

echo "<h1>Restore database $db_name from $QUERY_STRING</h2>"
unzip -p "${backup_dir}/$QUERY_STRING" | mysql --user=${user_db} --password=${password} --database ${db_name}

echo "done..."

#echo "<a href='/'>Site</a> | "
echo "<a href='/'>Сайт</a> | "

#echo "<a href='/admin/'>Admin panel</a>"
echo "<a href='/admin/'>Панель администрирования</a> |"

#echo "<a href='/cgi-bin/index.cgi'>index</a>"
echo "<a href='/cgi-bin/index.cgi'>Управление базой данных</a>"
