#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
#import cgi
#import urllib


# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

# ****************************************
# Печать переменных запроса
# ****************************************
print "<ul>"
for k in os.environ:
    print "<b> ", k, "</b> = ", os.environ[k]  + "<br>\n"
print "</ul>"
print "<hr>\n"

query = os.environ ["REQUEST_METHOD"]
if query == "GET":
    print "Hello " + os.environ[ "REMOTE_ADDR" ] + "<br>\n"
    print os.environ[ "QUERY_STRING" ]


if query == "POST":
#     Чтение строки POST-запроса со стандартного ввода (поток stdin)
   for line in sys.stdin:
        s1 = line

# ****************************************
# Извлекаем параметры из запроса
# ****************************************
s2 = s1.split("&") # разбить stdin на элементы, разделенные &
print "s2= ", s2, "<br>"

s3 = [1]
n1 = len (s2)
for n2 in range(0, n1):
     s3.insert (n2, s2[n2].split("=")) #Вставить элемент в список s3

#s3 = s2[0].split("=") # разбить stdin на элементы, разделенные =
print "s3= ", s3, "<br>"
print "s3 [1] = ", s3[1], "<br>"
print "s3 [1][0] = ", s3[1][0], "<br>"


