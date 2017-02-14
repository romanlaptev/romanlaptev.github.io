#!/usr/bin/python
# -*- coding: utf-8 -*-

# -----------------------------------------------------
def myfunc (fs_path):
   print "<tr>"
   print "<td>", file,"</td>"
   fstat = os.stat (fs_path+"/"+file)
   dump(fstat)
   print "</tr>"

# -----------------------------------------------------
def dump(st):
   mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime = st
   print "<td>", size, "bytes </td>" #- size
   print "<td>", uid, gid,"</td>" # - owner
   print "<td>", time.ctime(ctime),"</td>" #- created
   print "<td>", time.ctime(atime),"</td>" #- last accessed
   print "<td>", time.ctime(mtime),"</td>" #- last modified
   print "<td>", oct(mode),"</td>" #- mode
   print "<td>", ino, dev,"</td>" #- inode/dev
# -----------------------------------------------------

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"
print "<table border=1>"
print "<tr>"
print "<td width=15%><b> Filename </b></td>"
print "<td width=10%><b> size, bytes </b></td>"
print "<td width=5%><b> owner </b></td>"
print "<td width=15%><b> created </b></td>"
print "<td width=15%><b> last accessed </b></td>"
print "<td width=15%><b> last modified </b></td>"
print "<td width=5%><b> mode </b></td>"
print "<td width=10%><b> inode/dev </b></td>"
print "</tr>"

import os
import time

fs_path = "/etc"
# -----------------------------------------------------
for file in os.listdir(fs_path):
          myfunc (fs_path)
# -----------------------------------------------------
print "</table>"

print "</body>"
print "</html>"

