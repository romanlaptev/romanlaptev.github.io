#!/usr/bin/python
print "Content-type: text/html"
print ""
#for n1 in range (0,10):
#    print "Hello, world!"+"<br>"

#import os
#print "<hr>\n"
#print "<ul>"
#for k in os.environ:
#    print "<b> ", k, "</b> = ", os.environ[k]  + "<br/>\n"
#print "</ul>"
#print "<hr>\n"

import sqlite3

print "apilevel - " + sqlite3.apilevel
print "<br/>\n"

print sqlite3.threadsafety
print sqlite3.paramstyle
