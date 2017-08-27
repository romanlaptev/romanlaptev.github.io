#/usr/local/bin/python
#!/usr/bin/python
print "Content-type:text/html"
print ""

print "<html>"
print "<title> test Python </title>"
print "<body>"

print "<h1>test Python</h1>"
print "<pre>"

for n1 in range(0,10):
    print "Hello Python world!"
    print "<br>"

print "<h2>SYS module</h2>"
import sys
print sys.version_info
print "<br/>"

print sys.version[:3]
print "<br/>"

print "<h2>OS module</h2>"
import os
print "<ul>"
for k in os.environ:
    print "<li><b>" + k + "</b>: " + os.environ[k]  + "</li>"
print "</ul>"

print "</body>"
print "</html>"
