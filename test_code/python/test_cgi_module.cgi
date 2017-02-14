#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
#import urllib

import cgi

# включить обработку ошибок
import cgitb
cgitb.enable()

# чтобы ошибки скрипта  передавались в log файл
#cgitb.enable(display=0, logdir="/tmp")

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

# ****************************************
# Печать переменных запроса
# ****************************************
print "<ul>"
for k in os.environ:
    print "<b> ", k, "</b> = ", os.environ[k]  + "<br>\n"
print "</ul>"
print "<hr>\n"
#----------------------------------------------------------------------------------------

#for line in sys.stdin: #     Чтение строки POST-запроса со стандартного ввода (поток stdin)
#     s1 = line
#     print "s1= ", s1, "<br>"
#print "<hr>\n"

#n1 = int(os.environ["CONTENT_LENGTH"])

line = sys.stdin.readline()
while line:
     sys.stdout.write(line)
     line = sys.stdin.readline()
     print "<br>"
#----------------------------------------------------------------------------------------

form = cgi.FieldStorage()
#form = cgi.FieldStorage(keep_blank_values=true)

item = form.getvalue("item")
print "<p>item:", item

print "name:", form["name"].value + "<br>\n"
print "addr:", form["addr"].value + "<br>\n"

#----------------------------------------------------------------------------------------
fileitem = form["userfile"]
print fileitem.value + "<br>\n"

if fileitem.filename:
#   fn = "/opt/" + fileitem.filename
#   open('uploads/' + fn, 'wb').write(fileitem.file.read())
   message = 'The file "' + fn + '" was uploaded successfully'
else:
   message = 'No file was uploaded'

print message

