#!/usr/bin/python
# -*- coding: utf-8 -*-
import os

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

# ****************************************
# Печать переменных запроса
# ****************************************
#print "<ul>"
#for k in os.environ:
#    print "<b> ", k, "</b> = ", os.environ[k]  + "<br>\n"
#print "</ul>"
#print "<hr>\n"

# ****************************************
# Установка переменных 
# ****************************************
server_root="http://nas/www"
fs_root='/opt/www'

print "<html>"
print "<head>"
print "<title> notes </title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "<link rel=STYLESHEET href=" + server_root + "/css/style.css type=text/css>"
print "</head>"
print "<body>"

print "<form  method=post  action=$server_root/cgi-bin/change.php?action=save_changes&filename=$filename&spath=$spath>"
print "<table>"
print "<tr>"
print "<td colspan=2 valign=top align=right>"
print "<input type=submit name=go value='save changes'><br>"
print "</td>"
print "</tr>"

print "<tr>"
print "<td valign=top width=10>"
print "</td>"

print "<td>"
print "<textarea name=textbox rows=30% cols=100%>"

# обработка ошибки открытия файла
try:
    myfile = open(fs_root + "/nas.local/notes/notes.html")
except IOError, err:
    print err.strerror
# открытие и чтение текстового файла построчно
for line in myfile:
     print (line)


print "</textarea>"
print "</td>"
print "</tr>"

print "</table>"
print "</form>"

print "</body>"
print "</html>"
