#!/bin/sh
echo "Content-type: text/html"
echo ""
backup_dir="/usr/local/www/vhosts/toool/data/backup/toool.ru"
#backup_dir="/usr/local/www/vhosts/toool/data/backup/test.toool.ru"

find ${backup_dir} -type f ! -atime -10d -delete

#echo "<a href='/cgi-bin/restore.cgi'>Restore database</a>"
#echo "<a href='/'>Site</a> | "
#echo "<a href='/admin/'>Admin panel</a>"

echo "<a href='/'>Сайт</a> | "
echo "<a href='/admin/'>Панель администрирования</a> |"
echo "<a href='/cgi-bin/index.cgi'>Управление базой данных</a>"

echo "<script>location.href='/cgi-bin/index.cgi'</script>";
