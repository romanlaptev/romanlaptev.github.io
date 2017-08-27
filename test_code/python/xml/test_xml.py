#!/usr/bin/python
print "Content-type: text/html"
print ""
print "<html>"
print "<body>"
print "test Python: XML"
print "<br>"

print "xml.parsers"
print "<br>"
from xml.parsers import expat

def start_element(name, attrs):
    print "start_element", name, attrs,"<br>"

def end_element(name):
    print "end_element", name,"<br>"

def char_data(data):
    print "char_data", repr(data),"<br>"

p = expat.ParserCreate()
p.returns_unicode = 0
p.StartElementHandler = start_element
p.EndElementHandler = end_element
p.CharacterDataHandler = char_data
p.Parse ("<?xml version=\"1.0\"?> <parent id=\"top\">    <child1 name=\"paul\">Text goes here</child1>    <child2 name=\"fred\">More text</child2> </parent>")

print "<hr>"
print "xml.dom.minidom"
print "<br>"

from xml.dom.minidom import *

##f = parse('1.xml')
f = parseString('''
    <doc>
        <Test exp='1+2+3/3' exp2='121/11' text="Hello world!">
        </Test>
 
        <Test exp='1+1' exp2='12+12' text="Hello world!2">
        </Test>
 
        <Test exp='1+2' exp2='12+13' text="Hello world!3">
        </Test>
 
        <Test exp='1+3' exp2='12+14' text="Hello world!4">
        </Test>
 
    </doc>
''')
nd = f.getElementsByTagName('Test')

exp1=[]
exp2=[]
text=[]
for z in nd:
    exp1.append(eval(z.getAttribute('exp')))
    exp2.append(eval(z.getAttribute('exp2')))
    text.append(z.getAttribute('text'))

res = "<Test><result> {0} <result></Test>"

for k in exp1:
    print res.format(k)

for k in exp2:
    print res.format(k)

print text

print "</body>"
print "</html>"