#!/usr/bin/python
# -*- coding: utf-8 -*-
print "Content-type:text/html"
print ""
print "<html>"
print "<head>"
print "<meta charset='utf-8'/>"
print "</head>"
print "<body>"

print "<h2>library database</h2>"
import MySQLdb
try:
	#con = MySQLdb.connect(host="localhost", user="root", passwd="master", db="lib")
	con = MySQLdb.connect(host="localhost", user="fr18091_db1", passwd="m@ster", db="fr18091_db1")
	cur = con.cursor()
	cur.execute('SET NAMES `utf8`')

	#query = 'SELECT * FROM `file_managed`'
	query = 'SELECT node.nid, node.type, node.title FROM `node` WHERE node.type = "library_book"'
	cur.execute(query)

#nid
#vid
#type
#language
#title
#uid
#status
#created
#changed
#comment
#promote
#sticky
#tnid
#translate

	result = cur.fetchall()
	print "<table border=1>"        
	print "<tr>"        
	print "<td><b>	nid	</b></td>"
	print "<td><b>	type	</b></td>"
	print "<td><b>	title	</b></td>"
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

		print "</tr>"        
	print "</table>"        
	
except MySQLdb.Error:
    print(db.error())


print "</body>"
print "</html>"

