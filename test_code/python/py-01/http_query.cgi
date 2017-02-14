#!/usr/bin/python

import httplib
import sys

#print sys.argv[0]
#print sys.argv[1]
#print sys.argv[2]

host = httplib.HTTP(sys.argv[1])
host.putrequest('GET',sys.argv[2])
host.putheader('accept','text/html')
host.endheaders()
code,msg,headers = host.getreply()
print code,msg
if code == 200:
   print host.getfile().read()


