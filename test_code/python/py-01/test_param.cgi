#!/usr/bin/python

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"

print "<h1>Python: test parameters</h1>"

import os
print os.name + "<br>\n"
print "<hr>\n"
print os.environ

print "<ul>"
for k in os.environ:
    print os.environ[k]  + "<br>\n"
print "</ul>"

print "<hr>\n"

print "Hello " + os.environ[ "REMOTE_ADDR" ] + "<br>\n"
query = os.environ[ "QUERY_STRING" ]
print query

print "<hr>\n"

import urlparse

addr = "http://www.cwi.nl:80/%7Eguido/Python.html"
url = urlparse.urlparse(addr)
print url


print "</body>"
print "</html>"

