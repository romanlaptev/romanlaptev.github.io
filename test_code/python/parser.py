#!/usr/bin/python
print "Content-type: text/html"
print ""
print "<html>"
print "<head>"
print "<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>"
print "</head>"
print "<body>"
print "<h3>Python: xml.dom.minidom</h3>"
print "<br>"

from xml.dom.minidom import *

xml_file = "/web/site/xml/db_site.xml"
xml = parse(xml_file)

gallery = xml.getElementsByTagName('gallery')
n1 = 0
n2 = gallery.length
print "number elements gallery  = ", n2, "<br>"
for n1 in range (0,n2):
	name = gallery[n1].getAttribute('name').encode("utf-8")
	title = gallery[n1].getAttribute('title').encode("utf-8")
	print "<b>",name, ",  ",title, "</b>"
	print "<br>"
#-------------------------------------------------------- end for

print "</body>"
print "</html>"

