#!/usr/bin/python

print "Content-type: text/html"
print ""
print "<html>"
print "<title> File Upload  </title>"
print "<body>"

print "<pre>"
print "hello, Python !"
print "</pre>"


import cgi
import cgitb; cgitb.enable()
import os, sys

# Windows needs stdio set for binary mode.
try:
    import msvcrt
    msvcrt.setmode (0, os.O_BINARY) # stdin  = 0
    msvcrt.setmode (1, os.O_BINARY) # stdout = 1
except ImportError:
    pass

UPLOAD_DIR = "/mnt/data/public/temp"

def save_uploaded_file (form_field, upload_dir):
    form = cgi.FieldStorage()
    if not form.has_key(form_field): return
    fileitem = form[form_field]
    if not fileitem.file: return
    fout = file (os.path.join(upload_dir, fileitem.filename), 'wb')
    while 1:
        chunk = fileitem.file.read(100000)
        if not chunk: break
        fout.write (chunk)
    fout.close()

save_uploaded_file ("userfile", UPLOAD_DIR)

print "</body>"
print "</html>"