#!/usr/bin/python
import os
import stat
import urllib

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"



filename = "/web/www//music/20_dvd_Das_Ich/Psychedelic Trance, Goa, Hardcore - 1/08. New Blood ' 2004/2004 -.m3u"

try:
     os.remove (filename)
     print "<b>Delete</b> " + filename +  "<br>\n"
except OSError:
    print "<b>Cannot delete </b>" + filename +  "<br>\n"

print "</body>"
print "</html>"

