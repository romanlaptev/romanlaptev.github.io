#!/usr/bin/python
#/usr/local/bin/python
print "Content-type:text/html"
print ""
print "<html>"
print "<title> test Python </title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"
print "<body>"
print "<h1>test Python</h1>"
print "<pre>"

for n1 in range(0,10):
    print "Hello Python world!"
    print "<br>"

print "<hr>"
print "<h3>WHILE</h3>"
s = "abcdefghijklmnop"
while s != "":
  print s
  print "<br>"
  s = s[1:-1]
# -----------------------------------------------------

print "<h2>SYS module</h2>"
import sys
print sys.version_info
print "<br/>"

print sys.version[:3]
print "<br/>"
# -----------------------------------------------------

print "<h2>OS module</h2>"
import os
print "<ul>"
for k in os.environ:
    print "<li><b>" + k + "</b>: " + os.environ[k]  + "</li>"
print "</ul>"
# -----------------------------------------------------

print "Hello " + os.environ[ "REMOTE_ADDR" ] + "<br>\n"
query = os.environ[ "QUERY_STRING" ]
print query
print "<hr>"
# -----------------------------------------------------

import urlparse
addr = "http://www.cwi.nl:80/%7Eguido/Python.html"
url = urlparse.urlparse(addr)
print url
print "<hr>"
# -----------------------------------------------------

print os.name + "<br>"
print "<hr>"

cwd = os.getcwd()
print "<h3>"+ cwd + " directory listing</h3>"
for file in os.listdir("./"):
    print file + "<br>\n"

#os.system("pwd")
#os.rename("/tmp/hello.cgi", "/tmp/hello.py")
#os.remove("/tmp/hello.py")

#filename1 = "/etc/thttpd.conf"
#filename2 = "/tmp/thttpd.conf"
#os.system ("copy %s %s" % (filename1, filename2))
#if os.path.isfile (filename2): print "Success"
# -----------------------------------------------------

print "<h3>Read from file</h3>"


f = open("./test.xml", "r")
s = f.read()
print s
print "<br>"
print len (s)
print "<br>"
f.close()

f = open("./test.xml", "r")
while s != "":
  s = f.readline()
  print s
  print "<br>"
f.close()

#open file error
try:
    myfile = open("/opt/etc/init_nas.h","r")
except IOError, err:
    print "<br> :( <br>"
    print err.strerror

# -----------------------------------------------------


print "</pre>"

print "</body>"
print "</html>"

