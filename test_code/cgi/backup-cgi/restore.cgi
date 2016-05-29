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

echo "<h1>Restore database $db_name from $QUERY_STRING</h2>"
unzip -p "${backup_dir}/$QUERY_STRING" | mysql --user=${user_db} --password=${password} --database ${db_name}
echo "done...<br/>"

echo "<a href='/cgi-bin/backup-cgi/index.cgi'>index</a>"

echo "</body>"
echo "</html>"
