#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
import urllib

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
   sys.exit(0)

# в массиве переменных запроса, найти переменную filename
try: # использование переменной, только если она определена
   filename = find_query_var (list_query, "filename")
   filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
except NameError:
   print "filename undefined<br>"
   filename= ""
   sys.exit(0)

# ****************************************
# Установка переменных 
# ****************************************
server_root = "http://nas/www"
#server_root = "http://90.189.181.216:804/www"
#fs_root = '/opt/www'
#filename = fs_root + "/notes/notes.html"
#filename = fs_root + "/"+filename

# ****************************************
# Редактировать текстовую форму
# ****************************************
if action == "edit":
  print "<html>"
  print "<head>"
  print "<title> Edit "+ filename +" </title>"
  print "<meta http-equiv=Expires content=0>"
  print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
  print "<link rel=STYLESHEET href=" + server_root + "/css/style.css type=text/css>"
  print "</head>"
  print "<body>"

#  print "<a href=http://nas/www/cgi-bin/notepad.cgi?action=save_changes>save_changes </a>"
  print "<form  method=post  action=" + os.environ[ "SCRIPT_NAME"] + ">"
  print "<table border=0 width=95%>"
  print "<tr>"
  print "<td valign=top width=5>"
  print "</td>"
  print "<td valign=top>"
  print "<input type=text size=100 name=filename value='"+ filename +"'>"
  print "<input type=submit name=action value='save_changes'><br><br>"
  print "<input type='button' size=10 onclick=\"getElementById('textbox').value = '';\" value='clear'/>"
  print "</td>"
  print "</tr>"

  print "<tr>"
  print "<td valign=top width=5>"
  print "</td>"

  print "<td>"
  print "<textarea name=textbox id=textbox rows=30 cols=100>"

  try:
    myfile = open(filename,"r")# открытие и чтение текстового файла
    textbuffer = myfile.read()
    print textbuffer
    myfile.close()
  except IOError, err:
    print err.strerror

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
  filename=urllib.unquote_plus(filename)
  print "<h1>save_changes in ",filename, "</h1>"
  # в массиве переменных запроса, найти переменную textbox
  try: # использование переменной, только если она определена
     textbox = find_query_var (list_query, "textbox")
#     print "textbox= ", textbox, "<br>"
     print urllib.unquote_plus(textbox), "<br>"  
     try:
       myfile = open(filename,"w")
       textbuffer = urllib.unquote_plus(textbox) #Decodes any %##  encoding in the given string.
       myfile.write (textbuffer)
       myfile.close()
     except IOError, err:
       print err.strerror

  except NameError:
     print "textbox undefined<br>"
     textbook= ""

# Невозможно открыть файл, содержащий пробел (/articles/Installing_ Debian_in_ NSD-100.html)
