#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<meta charset='windows-1251'>"
echo "</head>"
echo "<body>"

db_name="toool"
#db_name="testtoool"

#echo "<h1>Backup/restore database $db_name</h1>"
echo "<h1>���������� ����� ������ $db_name</h1>"

echo "<hr/>"
#echo "<a href='/cgi-bin/backup.cgi'>Create backup copy</a>"
#echo "<a href='/'>Site</a> | "
#echo "<a href='/admin/'>Admin panel</a>"

echo "<a href='/cgi-bin/backup.cgi'>������� ��������� �����</a> |"
echo "<a href='/cgi-bin/clear_backups.cgi'>������� ������ �������� ����� (������ 10-�� ����)</a> | "
echo "<a href='/admin/'>������ �����������������</a>  | "
echo "<a href='/'>����</a>"
echo "<hr/>"

#echo "<b>list of backups:</b>"
echo "<b>������ ��������� ��������� �����:</b>"
echo "<ul>"

backup_dir="/usr/local/www/vhosts/toool/data/backup/toool.ru"
#backup_dir="/usr/local/www/vhosts/toool/data/backup/test.toool.ru"
cd $backup_dir
for x in *
  do
        if  [ -d  $x ]
          then echo $x
          else 
echo "<li><b>$x</b><br/>"; 

stat -f %Sm $x; 
echo ", ";

stat -f %z $x; 
echo " bytes";

echo "<br/>";
#echo "<a href=/cgi-bin/restore.cgi?$x>Restore</a></li><br/><br/>"
echo "<a href=/cgi-bin/restore.cgi?$x>������������ ���� ������ �� ������</a></li><br/>"
echo "<a href=/cgi-bin/rm.cgi?$x>������� �����</a></li><br/><br/>"
        fi
  done

echo "</ul>"
echo "<hr/>"

echo "Crontab parameters:<pre>"
crontab -l
echo "</pre>"

echo "</body>"
echo "</html>"
