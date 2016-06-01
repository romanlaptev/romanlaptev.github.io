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

# ******************************************************************************
# Сформировать индексную страницу текущего каталога
# ******************************************************************************

fs_path ="/web/www/music/16_dvd_classic_rock & etc"
dec_fs_path = urllib.unquote_plus(fs_path) #Decodes any %##  encoding in the given string.

print "fs_path =" + fs_path + "<br>"
print "dec_fs_path =" + dec_fs_path + "<br>"

print "<table border=1 cellpadding=5 cellspacing=0 width=50% align=left>"
for file in os.listdir (dec_fs_path):
    fstat = os.stat (dec_fs_path+"/"+file)

    if stat.S_ISDIR(fstat[stat.ST_MODE]):
           print "<tr>"
           print "<td><b>" + file + "</b></td>"
           print "</tr>"

    if stat.S_ISREG(fstat[stat.ST_MODE]):
           print "<tr>"
           print "<td>" + file + "</td>"
           print "</tr>"

print "</table>"


print "</body>"
print "</html>"

