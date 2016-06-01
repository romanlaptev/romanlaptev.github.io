#!/usr/bin/python
# -*- coding: utf-8 -*-
print "Content-type:text/html"
print ""
print "<html>"
print "<head>"
print "<meta charset='utf-8'/>"
print "</head>"
print "<body>"
print "<h2>Test SQLite</h2>"
import sqlite3

print "apilevel - " + sqlite3.apilevel
print "<br/>\n"

print sqlite3.threadsafety
print "<br/>\n"

print sqlite3.paramstyle
print "<br/>\n"

c = db.connect(database="tvprogram")
#cu = c.cursor()
print "test1<br/>\n"
c.close()

print "</body>"
print "</html>"
