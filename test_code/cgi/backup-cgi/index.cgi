#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<meta charset='utf-8'>"
echo "</head>"
echo "<body>"

echo "<h1>Backup/restore databases</h1>"

echo "<hr/>"
echo "<a href='/cgi-bin/backup-cgi/backup.cgi'>Create backup copy</a>"
echo "<a href='/cgi-bin/backup-cgi/clear_backups.cgi'>Remove old archives (10 days older)</a>"
echo "<hr/>"

echo "<b>list of backups:</b>"
echo "<ul>"

backup_dir="/home/f/fr18091/public_html/backup"
cd $backup_dir
for x in *
  do
        if  [ -d  $x ]
          then echo $x
          else 
echo "<li><b>$x</b><br/>"; 

#stat -f %Sm $x; 
#echo ", ";

#stat -f %z $x; 
#echo " bytes";

echo "<br/>";
echo "<a href=/cgi-bin/backup-cgi/restore.cgi?$x>Restore</a></li><br/>"
echo "<a href=/cgi-bin/backup-cgi/rm.cgi?$x>remove archive</a></li><br/><br/>"
        fi
  done

echo "</ul>"
echo "<hr/>"

echo "Crontab parameters:<pre>"
crontab -l
echo "</pre>"

echo "</body>"
echo "</html>"
