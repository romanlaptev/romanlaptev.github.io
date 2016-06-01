#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<meta charset='windows-1251'>"
echo "</head>"
echo "<body>"

user_db="toool"
password="******"
db_name="toool"
backup_dir="/usr/local/www/vhosts/toool/data/backup/toool.ru"

#user_db="testtoool"
#password="******"
#db_name="testtoool"
#backup_dir="/usr/local/www/vhosts/toool/data/backup/test.toool.ru"

DATE=`date "+%F-%H-%M"`

echo "<h1>backup database $db_name</h1>"
echo "<pre>"
find ${backup_dir} -type f ! -atime -10d -delete
mysqldump --user=${user_db} --password=${password} --database ${db_name} | zip > "${backup_dir}/${db_name}_${DATE}.sql.zip"
#mysqldump -u${user_db} -p${password} ${db_name} | gzip > "${backup_dir}/${db_name}_${DATE}.sql.gz"

echo "done..."
ls -lh ${backup_dir}
echo "</pre>"

#echo "<a href='/'>Site</a> | "
echo "<a href='/'>Сайт</a> | "

#echo "<a href='/admin/'>Admin panel</a>"
echo "<a href='/admin/'>Панель администрирования</a> |"

#echo "<a href='/cgi-bin/index.cgi'>index</a>"
echo "<a href='/cgi-bin/index.cgi'>Управление базой данных</a>"

echo "</body>"
echo "</html>"
