#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
#import cgi
#import urllib

# ********************************************************************
# Извлекаем параметры из HTTP-запроса в список
# ********************************************************************
def get_query_var (s1):
   print "s1= ", s1, "<br>"
   s2 = s1.split("&") # разбить строку запроса на элементы, разделенные &
#   print "s2= ", s2, "<br>"

   s3 = [0]
   n1 = len (s2)
   for n2 in range(0, n1):
         s3.insert (n2, s2[n2].split("=")) #Вставить элемент в список s3
#   print "s3= ", s3, "<br>"
#   print "s3 [1] = ", s3[1], "<br>"
#   print "s3 [1][0] = ", s3[1][0], "<br>"
   return s3

# ********************************************************************
# Поиск в сформированном списке запроса, необходимой переменной
# ********************************************************************
def find_query_var (s1,keyword):
#   print "keyword= ", keyword, "<br>"
   n1 = len (s1)-1
   for n2 in range(0, n1):
#        print "<b> ", s1 [n2][0], "</b> = ", s1 [n2][1]  + "<br>\n"
        if s1 [n2][0] == keyword:
           res = s1 [n2][1]
#   print "res = ", res, "<br>"
   return res

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
# ****************************************
# Извлекаем параметры из запроса GET
# ****************************************
if query == "GET":
   s1 = os.environ[ "QUERY_STRING" ]
   list_query = get_query_var (s1)
#   print "list_query= ", list_query, "<br>"

   # в массиве переменных запроса, найти переменную text1
   try: # использование переменной, только если она определена
      text1 = find_query_var (list_query, "text1")
      print "text1= ", text1, "<br>"
   except NameError:
      print "text1 undefined<br>"

   # в массиве переменных запроса, найти переменную text2
   try: # использование переменной, только если она определена
      text2 = find_query_var (list_query, "text2")
      print "text2= ", text2, "<br>"
   except NameError:
      print "text2 undefined<br>"

   # в массиве переменных запроса, найти переменную text3
   try: # использование переменной, только если она определена
      text3 = find_query_var (list_query, "text3")
      print "text3= ", text3, "<br>"
   except NameError:
      print "text3 undefined<br>"


# ****************************************
# Извлекаем параметры из запроса POST
# ****************************************
if query == "POST":
   for line in sys.stdin: #     Чтение строки POST-запроса со стандартного ввода (поток stdin)
        s1 = line
   list_query = get_query_var (s1)

   # в массиве переменных запроса, найти переменную text1
   try: # использование переменной, только если она определена
      text1 = find_query_var (list_query, "text1")
      print "text1= ", text1, "<br>"
   except NameError:
      print "text1 undefined<br>"

   # в массиве переменных запроса, найти переменную text2
   try: # использование переменной, только если она определена
      text2 = find_query_var (list_query, "text2")
      print "text2= ", text2, "<br>"
   except NameError:
      print "text2 undefined<br>"

   # в массиве переменных запроса, найти переменную text3
   try: # использование переменной, только если она определена
      text3 = find_query_var (list_query, "text3")
      print "text3= ", text3, "<br>"
   except NameError:
      print "text3 undefined<br>"

