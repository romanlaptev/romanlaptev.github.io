#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<pre>"

backup_dir="/usr/local/www/vhosts/toool/data/backup/toool.ru"
#backup_dir="/usr/local/www/vhosts/toool/data/backup/test.toool.ru"

echo "<h1>Remove $QUERY_STRING</h2>"
rm ${backup_dir}/$QUERY_STRING
echo "done..."

#echo "<a href='/cgi-bin/index.cgi'>index</a>"
echo "<a href='/cgi-bin/index.cgi'>Управление базой данных</a>"

#echo "<a href='/admin/'>Admin panel</a>"
echo "<a href='/admin/'>Панель администрирования</a> |"

#echo "<a href='/'>Site</a> | "
echo "<a href='/'>Сайт</a> | "

echo "<script>location.href='/cgi-bin/index.cgi'</script>";
