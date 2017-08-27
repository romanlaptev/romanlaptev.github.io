#!/usr/bin/python
import httplib
import sys

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

#print sys.argv[0]
#print sys.argv[1]
#print sys.argv[2]

#host = httplib.HTTP(sys.argv[1])
#host.putrequest('GET',sys.argv[2])
#host.putheader('accept','text/html')
#host.endheaders()
#code,msg,headers = host.getreply()
#print code,msg
#if code == 200:
#   print host.getfile().read()

print "<h2> Test use HTTPLIB </h2>"
#host = '192.168.0.10'
host = 'yandex.ru'
h = httplib.HTTP(host)

h.set_debuglevel(1) # debug messages

h.putrequest('GET', '/')
h.putheader('accept','text/html')
h.putheader('User-agent', 'python-httplib')
h.endheaders()
code,msg,headers = h.getreply()
print code,msg
if code == 200:
   print h.getfile().read()

print "<hr>"
#------------------------------------------------------
print "<h2> Test use URLLIB </h2>"

import urllib
#u = urllib.urlopen('http://192.168.0.10/')
u = urllib.urlopen('http://yandex.ru')
print "<pre>"
print u.headers
print "</pre>"
print u.read()

