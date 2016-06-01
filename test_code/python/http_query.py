#!/usr/local/bin/python

print "hello"
import httplib
#host = "www.oreillynet.com"
host = "90.189.181.216"
h = httplib.HTTP(host)
#h.putrequest('GET','/meerkat/?_fl=minimal')
h.putrequest('GET','/')
h.putheader ('Host',host)
h.putheader ('User-agent','python-httplib')
h.endheaders ()
returncode, returnmsg, headers = h.getreply()
print "return code = ",returncode
if returncode == 200:
  f = h.getfile ()
  print f.read()
