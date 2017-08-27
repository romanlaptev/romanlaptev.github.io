#!/usr/bin/python
# -*- coding: utf-8 -*-
print "Content-type:text/html"
print ""
print "<html>"
print "<head>"
print "<meta charset='utf-8'/>"
print "</head>"

print "<body>"
print "<h2>Test MySQL</h2>"
import MySQLdb
try:
	con = MySQLdb.connect(host="localhost", user="root", passwd="master", db="lib")
	#con = MySQLdb.connect(host="localhost", user="fr18091", passwd="m@ster", db="fr18091_db1")
	cur = con.cursor()
	cur.execute('SET NAMES `utf8`')
	cur.execute('SELECT * FROM `file_managed`')

	result = cur.fetchall()
	print "<table border=1>"        
	print "<tr>"        
	print "<td><b>	fid	</b></td>"
	print "<td><b>	uid	</b></td>"
	print "<td><b>	filename</b></td>"
	print "<td><b>	uri	</b></td>"
	print "<td><b>	filemime</b></td>"
	print "<td><b>	filesize</b></td>"
	print "<td><b>	status	</b></td>"
	print "<td><b>	timestamp</b></td>"
	print "</tr>"        
	for row in result:
		print "<tr>"        

		print "	<td>"
		print(row[0])
		print "	</td>"        

		print "	<td>"
		print(row[1])
		print "	</td>"        

		print "	<td>"
		print(row[2])
		print "	</td>"        

		print "	<td>"
		print(row[3])
		print "	</td>"        
		print "	<td>"
		print(row[4])
		print "	</td>"        

		print "	<td>"
		print(row[5])
		print "	</td>"        

		print "	<td>"
		print(row[6])
		print "	</td>"        

		print "	<td>"
		print(row[7])
		print "	</td>"        

		print "</tr>"        
	print "</table>"        
except MySQLdb.Error:
    print(db.error())

print "</body>"
print "</html>"


