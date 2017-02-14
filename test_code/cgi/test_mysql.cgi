#!/bin/sh
echo "Content-type: text/html"
echo ""
uname -a
echo "<h3>Test MySQL connection</h3>"
echo "<pre>"

#mysqlshow --host=localhost --user=root --password=master --verbose
#mysqlshow --host=database --user=beta8 --password=O4AtmRKe --verbose
#mysqlshow --host=localhost --user=catblac8 --password=master --verbose

mysqlshow --host=localhost --user=fr18091_db1 --password=m@ster --verbose
mysqladmin -ufr18091_db1 -pm@ster version
mysql -ufr18091_db1 -pm@ster < test_create.sql
mysql -ufr18091_db1 -pm@ster < test.sql

echo "<pre>"
