#!/usr/local/bin/python
print "Content-type: text/html"
print ""
print "<html>"
print "<body>"
print "<h3>Python: test xml.dom.minidom</h3>"
print "<br>"

from xml.dom.minidom import *

xml = parse("test.xml")

a = xml.nodeType
print "xml.nodeType = ", a, "<br>"
b = xml.nodeName
print "xml.nodeName = ", b, "<br>"
c = xml.nodeValue
print "xml.nodeValue = ", c, "<br>"

print "<br>"
#------------------------------------------------------------------
root = xml.childNodes

a = root[0].nodeType
print "root[0].nodeType = ", a, "<br>"
b = root[0].nodeName
print "root[0].nodeName = ", b, "<br>"
c = root[0].nodeValue
print "root[0].nodeValue = ", c, "<br>"
d = root[0].parentNode
print "root[0].parentNode = ", d.nodeName, "<br>"
print "<br>"
#------------------------------------------------------------------

nd = xml.getElementsByTagName('Test')

print "number elements test = ", nd.length, "<br>"
desc=""
for z in nd:
    desc = z.getAttribute('desc')
    print desc, "<br>"
    v = z.childNodes[0].nodeValue
    print v, "<br>"


print "</body>"
print "</html>"

