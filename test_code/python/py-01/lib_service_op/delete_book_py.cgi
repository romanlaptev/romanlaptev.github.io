#!/usr/bin/python

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"
import os

# ****************************************
# ��������� ��������� �� ������� GET
# ****************************************
query = "/mnt/data/public/lib" + os.environ[ "QUERY_STRING" ]


# ****************************************
# ��������� ������ ������� �� hex-�������� � ������� ��������� 
# (��� ���������� ������������� ������� �������� ����� ��� ���������� �������)
# ****************************************
import urllib
remove_filename = urllib.unquote (query)

#print "<script>\n"
#print "  url3 = decodeURIComponent ('" + query + "');\n"
#print "  window.alert (url3);\n"
#print "</script>\n"

# ****************************************
# �������� ����� �����
# ****************************************
try:
    os.remove(remove_filename)
    print "<b>Delete</b> " + remove_filename +  "<br>\n"
except OSError:
    print "<b>Cannot delete </b>" + remove_filename +  "<br>\n"

# ****************************************
# ������ ���������� �������
# ****************************************
print "<ul>"
for k in os.environ:
    print os.environ[k]  + "<br>\n"
print "</ul>"

print "<hr>\n"

print "</body>"
print "</html>"

