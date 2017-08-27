#!/usr/bin/python
#/usr/local/bin/python
print "Content-type: text/html"
print ""
print "<html>"
print "<body>"
print "<h3>Python: test xml.dom.minidom</h3>"
print "<br>"

from xml.dom.minidom import *

xml = parse("db_site.xml")

root = xml.childNodes
gallery = xml.getElementsByTagName('gallery')
n2 = gallery.length
print "number elements GALLERY = ", n2, "<br>"
for n1 in range (0,n2):
    name = gallery[n1].getAttribute('name')
    title = gallery[n1].getAttribute('title').encode("cp1251")
    print name," ",title
    print "<br>"

print "<hr>"

root = xml.childNodes
#print "root = ", root, "<br>"
import pprint
pprint.pprint(root)

#filename="/home/far/b/l/a/blackcat/public_html/temp/test.html"
#print "<h1>save_changes in ",filename, "</h1>"
#page = "<html><body><h1>its test!</h1></body></html>"
#try:
#   myfile = open(filename,"w")
#   myfile.write (page)
#   myfile.close()
#except IOError, err:
#   print err.strerror

print "</body>"
print "</html>"
