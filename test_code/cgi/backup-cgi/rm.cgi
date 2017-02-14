#!/bin/sh
echo "Content-type: text/html"
echo ""

backup_dir="/home/f/fr18091/public_html/backup"
echo "<h1>Remove $QUERY_STRING</h2>"
rm ${backup_dir}/$QUERY_STRING
echo "done..."

echo "<a href='/cgi-bin/index.cgi'>index</a>"
echo "<script>location.href='/cgi-bin/backup-cgi/index.cgi'</script>";
