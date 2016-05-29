#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
import stat
import time
import math
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
#   print "res= ", res, "<br>"
   return res

# ******************************************************************************
# Сформировать индексную страницу, начиная с текущего каталога
# ******************************************************************************
def find (fs_path,html_path,spc):
  global num_dir, num_files,num_find,mask,html_base
 
  spc = spc.join("|")
  for file in os.listdir (fs_path):
          fstat = os.stat (fs_path+"/"+file)

# проверить, есть ли совпадения маски поиска с именем файла
          s1 = file.lower()
          s2 = mask.lower()
          if s1.count(s2) > 0:
            print spc,"|--<a href=\"", html_path + "/" + file,"\">",  file,"</a><br/>"
            num_find=num_find+1

          if stat.S_ISDIR(fstat[stat.ST_MODE]):
            num_dir = num_dir+1
            print spc, "<b>+ ", fs_path + "/" + file,"</b><br>"
            find (fs_path + "/" + file,html_path + "/" + file,spc)     # рекурсия

          if stat.S_ISREG(fstat[stat.ST_MODE]):
            num_files = num_files+1
#            print spc, "|--",  file,"<br>"
            if mask == "*":
              num_find=num_find+1
              print spc,"|--<a href=\"", html_path + "/" + file,"\">",  file,"</a><br/>"

# -----------------------------------------------------

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print
# **********************************************************
# Проверка количества входных аргументов
# **********************************************************
#print "script name is", sys.argv[0], "<br>"
#print "len = ", len (sys.argv), "<br>"
#if len (sys.argv)  <= 1:
#    print "<br> there are no arguments !!!"
#    sys.exit(0)

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

   # в массиве переменных запроса, найти переменную server_root
#   try: # использование переменной, только если она определена
#      server_root = find_query_var (list_query, "server_root")
#      server_root = urllib.unquote_plus(server_root) #Decodes any %##  encoding in the given string.
#      print "server_root= ", server_root, "<br>"
#   except NameError:
#      print "server_root undefined<br>"

   # в массиве переменных запроса, найти переменную fs_root
#   try: # использование переменной, только если она определена
#      fs_root = find_query_var (list_query, "fs_root")
#      fs_root = urllib.unquote_plus(fs_root) #Decodes any %##  encoding in the given string.
#      print "fs_root= ", fs_root, "<br>"
#   except NameError:
#      print "fs_root undefined<br>"

   # в массиве переменных запроса, найти переменную start_dir
   try: # использование переменной, только если она определена
      start_dir = find_query_var (list_query, "start_dir")
      start_dir = urllib.unquote_plus(start_dir) #Decodes any %##  encoding in the given string.
#      print "start_dir= ", start_dir, "<br>"
   except NameError:
      print "start_dir undefined<br>"

   # в массиве переменных запроса, найти переменную html_base
   try: # использование переменной, только если она определена
      html_base = find_query_var (list_query, "html_base")
      html_base = urllib.unquote_plus(html_base) #Decodes any %##  encoding in the given string.
#      print "html_base= ", html_base, "<br>"
   except NameError:
      print "html_base undefined<br>"

   # в массиве переменных запроса, найти переменную html_page_file
#   try: # использование переменной, только если она определена
#      html_page_file = find_query_var (list_query, "html_page_file")
#      html_page_file = urllib.unquote_plus(html_page_file) #Decodes any %##  encoding in the given string.
#      print "html_page_file= ", html_page_file, "<br>"
#   except NameError:
#      print "html_page_file undefined<br>"

   # в массиве переменных запроса, найти переменную mask
   try: # использование переменной, только если она определена
      mask = find_query_var (list_query, "mask")
#      print "mask= ", mask, "<br>"
   except NameError:
      print "mask undefined<br>"

   # в массиве переменных запроса, найти переменную recource
#   try: # использование переменной, только если она определена
#      recource = find_query_var (list_query, "recource")
#      print "recource= ", recource, "<br>"
#   except NameError:
#      print "recource undefined<br>"

   # в массиве переменных запроса, найти переменную annotatio
   try: # использование переменной, только если она определена
      annotatio = find_query_var (list_query, "annotatio")
#      print "annotatio= ", annotatio, "<br>"
   except NameError:
      print "annotatio undefined<br>"

   # в массиве переменных запроса, найти переменную manage
   try: # использование переменной, только если она определена
      manage = find_query_var (list_query, "manage")
#      print "manage= ", manage, "<br>"
   except NameError:
      print "manage undefined<br>"

# Сформировать индексную страницу, начиная с текущего каталога
   print "<html>"
   print "<head>"
   print "<title>" + start_dir + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
#   print "<link rel=STYLESHEET href=" + server_root +  "/css/style.css type=text/css>"
   print "</head>"
   print "<body>"

   num_dir = 0
   num_files = 0
   num_find = 0
   spc = "|"
   print "Searching  <b>", mask, "</b> in ", start_dir, "<br>"
   find (start_dir, html_base, spc)
 
   print "<b>Folders: </b>", num_dir, "<br>"
   print "<b>Files: </b>", num_files, "<br>"
   print "<b> Search: </b>", num_find, "<br>"

   print "</body>"
   print "</html>"

