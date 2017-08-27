#!/usr/bin/python
import os
import stat
import urllib

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python: remove</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"
filename = "test.m3u"

try:
     os.remove (filename)
     print "<b>Delete</b> " + filename +  "<br>\n"
except OSError:
    print "<b>Cannot delete </b>" + filename +  "<br>\n"

print "</body>"
print "</html>"
