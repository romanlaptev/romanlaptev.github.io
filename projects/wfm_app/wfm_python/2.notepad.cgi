#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys

# ********************************************************************
# Извлекаем параметры из HTTP-запроса в список
# ********************************************************************
def get_query_var (s1):
#   print "s1= ", s1, "<br>"
   s2 = s1.split("&") # разбить строку запроса на элементы, разделенные &
#   print "s2= ", s2, "<br>"
   s3 = [0]
   n1 = len (s2)
   for n2 in range(0, n1):
         s3.insert (n2, s2[n2].split("=")) #Вставить элемент в список s3
#   print "s3= ", s3, "<br>"
   return s3

# ********************************************************************
# Поиск в сформированном списке запроса, необходимой переменной
# ********************************************************************
def find_query_var (s1,keyword):
   n1 = len (s1)-1
   for n2 in range(0, n1):
        if s1 [n2][0] == keyword:
           res = s1 [n2][1]
   return res

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

# ****************************************
# Печать переменных запроса
# ****************************************
#print "<ul>"
#for k in os.environ:
#    print "<b> ", k, "</b> = ", os.environ[k]  + "<br>\n"
#print "</ul>"
#print "<hr>\n"

# ****************************************
# Установка переменных 
# ****************************************
server_root="http://nas/www"
fs_root='/opt/www'

query = os.environ ["REQUEST_METHOD"]
# ****************************************
# Извлекаем параметры из запроса GET
# ****************************************
if query == "GET":
   s1 = os.environ[ "QUERY_STRING" ]
   list_query = get_query_var (s1)

# ****************************************
# Извлекаем параметры из запроса POST
# ****************************************
if query == "POST":
   for line in sys.stdin: #     Чтение строки POST-запроса со стандартного ввода (поток stdin)
        s1 = line
   list_query = get_query_var (s1)

# в массиве переменных запроса, найти переменную action
try: # использование переменной, только если она определена
   action = find_query_var (list_query, "action")
   #print "action= ", action, "<br>"
except NameError:
   print "action undefined<br>"
   action= ""

# ****************************************
# Редактировать текстовую форму
# ****************************************
if action == "edit":
  print "<html>"
  print "<head>"
  print "<title> notes </title>"
  print "<meta http-equiv=Expires content=0>"
  print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
  print "<link rel=STYLESHEET href=" + server_root + "/css/style.css type=text/css>"
  print "</head>"
  print "<body>"

#  print "<a href=http://nas/www/cgi-bin/notepad.cgi?action=save_changes>save_changes </a>"
  print "<form  method=post  action=" + os.environ[ "SCRIPT_NAME"] + ">"
  print "<table>"
  print "<tr>"
  print "<td colspan=2 valign=top align=right>"
  print "<input type=submit name=action value='save_changes'><br>"
  print "</td>"
  print "</tr>"

  print "<tr>"
  print "<td valign=top width=10>"
  print "</td>"

  print "<td>"
  print "<textarea name=textbox rows=30% cols=100%>"

  # обработка ошибки открытия файла
  try:
    myfile = open(fs_root + "/nas.local/notes/notes.html")
  except IOError, err:
    print err.strerror
  # открытие и чтение текстового файла построчно
  for line in myfile:
     print (line)

  print "</textarea>"
  print "</td>"
  print "</tr>"

  print "</table>"
  print "</form>"

  print "</body>"
  print "</html>"

# ****************************************
# Сохранить текстовую форму в файл
# ****************************************
if action == "save_changes":
  print "<h1>save_changes</h1>"
  # в массиве переменных запроса, найти переменную textbox
  try: # использование переменной, только если она определена
     textbox = find_query_var (list_query, "textbox")
     print "textbox= ", textbox, "<br>"
  except NameError:
     print "textbox undefined<br>"
     textbook= ""
