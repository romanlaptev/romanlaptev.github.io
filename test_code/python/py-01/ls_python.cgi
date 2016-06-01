#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import stat
import time
import math

# -----------------------------------------------------
# Вывести атрибуты файла
# -----------------------------------------------------
def dump(st):
   mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime = st

   n1 = size /1024
   n2 = int (math.fmod (size,1024));
   print "<td>",  n1, ",", n2, "</td>" #- size
 
   print "<td class=e5-2>", uid, gid,"</td>" # - owner
#   print "<td>", time.ctime(ctime),"</td>" #- created
#   print "<td>", time.ctime(atime),"</td>" #- last accessed
   print "<td class=e5-2>", time.ctime(mtime),"</td>" #- last modified
   print "<td class=e5-2>", oct(mode),"</td>" #- mode
#   print "<td>", ino, dev,"</td>" #- inode/dev
# -----------------------------------------------------

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "<link rel=STYLESHEET href=http://nas/www/css/style.css type=text/css>"
print "</head>"
print "<body>"


# ****************************************
# Извлекаем параметры из запроса GET
# ****************************************
fs_path = os.environ[ "QUERY_STRING" ]
print fs_path, "<br>\n"

print "<table border=1 cellpadding=0 cellspacing=0>"
print "<tr>"
print "<td class=broun2 width=15%><b> Filename </b></td>"
print "<td class=broun2 width=10%><b> size, Kb </b></td>"
print "<td class=broun2 width=5%><b> owner </b></td>"
#print "<td class=broun2 width=15%><b> created </b></td>"
#print "<td class=broun2 width=15%><b> last accessed </b></td>"
print "<td class=broun2 width=15%><b> last modified </b></td>"
print "<td class=broun2 width=5%><b> mode </b></td>"
#print "<td class=broun2 width=10%><b> inode/dev </b></td>"
print "</tr>"
# -----------------------------------------------------
for file in os.listdir(fs_path):
    print "<tr>"
    fstat = os.stat (fs_path+"/"+file)
    if stat.S_ISDIR(fstat[stat.ST_MODE]):
       print "<td>+", file,"</td>"
    if stat.S_ISREG(fstat[stat.ST_MODE]):
       print "<td><i>", file,"</i></td>"
    dump(fstat)
# -----------------------------------------------------
print "</tr>"
print "</table>"

print "</body>"
print "</html>"

