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

   # в массиве переменных запроса, найти переменную 
   try: # использование переменной, только если она определена
      html_path = find_query_var (list_query, "html_path_desc")
#      print "html_path = ", html_path, "<br>"
   except NameError:
      print "html_path undefined<br>"

   # в массиве переменных запроса, найти переменную
   try: # использование переменной, только если она определена
      fs_path = find_query_var (list_query, "fs_path_desc")
#      print "fs_path = ", fs_path, "<br>"
   except NameError:
      print "fs_path undefined<br>"

   # в массиве переменных запроса, найти переменную
   try: # использование переменной, только если она определена
      change_action = find_query_var (list_query, "change_action")
#      print "change_action= ", change_action, "<br>"
   except NameError:
      print "change_action undefined<br>"

   # в массиве переменных запроса, найти переменную
   try: # использование переменной, только если она определена
      change_action = find_query_var (list_query, "change_action")
#      print "change_action= ", change_action, "<br>"
   except NameError:
      print "change_action undefined<br>"

# ****************************************
# Извлекаем параметры из запроса POST
# ****************************************
if query == "POST":
   for line in sys.stdin: #     Чтение строки POST-запроса со стандартного ввода (поток stdin)
        s1 = line
   list_query = get_query_var (s1)
   print "list_query= ", list_query, "<br>"

   # в массиве переменных запроса, найти переменную 
   try: # использование переменной, только если она определена
      html_path = find_query_var (list_query, "html_path_desc")
#      print "html_path = ", html_path, "<br>"
   except NameError:
      print "html_path undefined<br>"

   # в массиве переменных запроса, найти переменную
   try: # использование переменной, только если она определена
      fs_path = find_query_var (list_query, "fs_path_desc")
#      print "fs_path = ", fs_path, "<br>"
   except NameError:
      print "fs_path undefined<br>"

   # в массиве переменных запроса, найти переменную
   try: # использование переменной, только если она определена
      change_action = find_query_var (list_query, "change_action")
#      print "change_action= ", change_action, "<br>"
   except NameError:
      print "change_action undefined<br>"


# ********************************************************************
# Удаление  файлов
# ********************************************************************
   if change_action=="delete":
#     print "<form name=form_ls method=post action=>"

# ********************************************************************
# Искать в сформированном списке запроса, имена файлов
# ********************************************************************
     keyword="filename"
     n1 = len (list_query)-1
     for n2 in range(0, n1):
        if  list_query [n2][0] == keyword:
#            print "<input type=checkbox  name=\"filename\" value=\"" + list_query [n2][1] +  "\" checked=\"checked\">" + list_query [n2][1] + "<br>"

         filename = fs_path + "/" + list_query [n2][1]
         filename = urllib.unquote_plus(filename)  #Decodes any %##  encoding in the given string.
         filename = urllib.unquote_plus(filename)  #Decodes any %##  encoding in the given string.

         try:                                                                                                                  
            os.remove (filename)                                                                                             
            print "<b>Delete</b> " + filename +  "<br>\n"                                                               
         except OSError:                                                                                                       
            print "<b>Cannot delete </b>" + filename +  "<br>\n"

	#-----------------------------------------------------------
	# очистить помеченные checkbox
	#-----------------------------------------------------------
	print "<script>"
	print "var frm = window.opener.document.form_ls;"
	print "for ( var n2=1; n2 < frm.elements.length; n2++)"
	print "     {"
	print "          var elmnt = frm.elements[n2];"
	print "          if  (elmnt.type=='checkbox') "
	print "            {"
	print "              elmnt.checked = false;"
	print "            }"
	print "     }"
	print "window.opener.document.forms.form_ls.change_action[0].selected=true;"
	print "window.opener.location.reload();"
	print "</script>"
              
#     print "</form>"

#   print "list_query= ", list_query[0][0],  list_query[0][1], "<br>"
#   print "list_query= ", list_query[1][0], list_query[1][1], "<br>"
#   print "list_query= ", list_query[2][0], "<br>"


