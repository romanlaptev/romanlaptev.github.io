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
# Извлекаем параметры из запроса GET
# ****************************************
query = "/mnt/data/public/lib" + os.environ[ "QUERY_STRING" ]


# ****************************************
# Перевести строку запроса из hex-символов в обычную кодировку 
# (для правильной интерпретации русских названий папок или содержащих пробелы)
# ****************************************
import urllib
remove_filename = urllib.unquote (query)

#print "<script>\n"
#print "  url3 = decodeURIComponent ('" + query + "');\n"
#print "  window.alert (url3);\n"
#print "</script>\n"

# ****************************************
# Удаление файла книги
# ****************************************
try:
    os.remove(remove_filename)
    print "<b>Delete</b> " + remove_filename +  "<br>\n"
except OSError:
    print "<b>Cannot delete </b>" + remove_filename +  "<br>\n"

# ****************************************
# Печать переменных запроса
# ****************************************
print "<ul>"
for k in os.environ:
    print os.environ[k]  + "<br>\n"
print "</ul>"

print "<hr>\n"

print "</body>"
print "</html>"

