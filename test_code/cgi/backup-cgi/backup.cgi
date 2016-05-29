#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<meta charset='utf-8'>"
echo "</head>"
echo "<body>"

user_db="fr18091_db1"
password="m@ster"
db_name="fr18091_db1"
backup_dir="/home/f/fr18091/public_html/backup"
DATE=`date "+%F-%H-%M"`

echo "<h1>backup database $db_name</h1>"
echo "<pre>"
#find ${backup_dir} -type f ! -atime -10d -delete

mysqldump --user=${user_db} --password=${password} --database ${db_name} > "${backup_dir}/${db_name}_${DATE}.sql"
#chmod 777 "${backup_dir}/${db_name}_${DATE}.sql"

cd ${backup_dir}
zip "${db_name}_${DATE}.sql.zip" "${db_name}_${DATE}.sql"
rm "${backup_dir}/${db_name}_${DATE}.sql"

#mysqldump --user=${user_db} --password=${password} --database ${db_name} | zip > "${backup_dir}/${db_name}_${DATE}.sql.zip"
#mysqldump -u${user_db} -p${password} ${db_name} | gzip > "${backup_dir}/${db_name}_${DATE}.sql.gz"

echo "done...<br/>"
ls -lh ${backup_dir}

echo "</pre>"
echo "<a href='/cgi-bin/backup-cgi/index.cgi'>index</a>"

echo "</body>"
echo "</html>"
