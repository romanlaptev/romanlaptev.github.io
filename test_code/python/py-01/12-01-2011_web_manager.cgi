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
# Вывести атрибуты файла
# ****************************************
def dump (st):
   mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime = st

   n1 = size /1024
   n2 = int (math.fmod (size,1024));
   print "<td>",  n1, ",", n2, "</td>" #- size
 
   print "<td class=e5-2>", uid, gid,"</td>" # - owner
#   print "<td>", time.ctime(ctime),"</td>" #- created
#   print "<td>", time.ctime(atime),"</td>" #- last accessed
   print "<td class=e5-2>", time.ctime(mtime),"</td>" #- last modified
   print "<td class=e5-2>", oct(mode),"</td>" #- mode
#   print "<td>", ino, dev,"</td>" #- inode/dev
# -----------------------------------------------------

# ******************************************************************************
# Сформировать индексную страницу текущего каталога
# ******************************************************************************
def ls (fs_path):
   print "<html>"
   print "<head>"
   print "<title>" + server_root + dir_path + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
   print "<link rel=STYLESHEET href=" + server_root +  "/css/style.css type=text/css>"
   print "</head>"
   print "<body>"

   print "<script language=JavaScript src=" + server_root + "/js/config.js></script>"
   print "<script language=JavaScript src=" + server_root + "/js/functions.js></script>"
#   print "<script language=JavaScript src=" + server_root + "/js/p1.js></script>"

#--------------------------------------------------------
# Печать файлового и вебсерверного пути к папке
#--------------------------------------------------------
   print "<form name=form_ls method=post action=>"
   print "<table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100% align=center>\n"
   print "   <tr>\n"
   print "     <td class=cm1 align=center>\n"
   print "         <input type=text size=30 name=html_path_desc value="+ server_root + dir_path + ">"
   print "     </td>"
   print "     <td class=cm1 align=center>\n"
   print "         <input type=text size=30 name=desc value="+ fs_root + dir_path + ">"
   print "    </td>"
   print "   </tr>\n"
   print "</table>\n"

#--------------------------------------------------------
# Возврат на верхний уровень файловой системы
#--------------------------------------------------------
   n1 = len(dir_path)-1 # получить длину url
   s1 = dir_path.split("/") # разбить url на элементы, разделенные слэшем
   n2 = len(s1)-1 # получить количество элементов
   n3 = len(s1[n2]) # получить длину последнего элемента
   n4 = n1 - n3 # получить длину url без последнего элемента
# собрать новую строку url без последнего элемента
   s2=""
   for k in range(0, n4):
         s2 = s2 + dir_path [k]
   print "<table border=0 cellpadding=0 cellspacing=10 width=100% align=center>"
   print "<tr>"
   print "<td width=\"20\">"
   print "<a href=" + server_root + "/cgi-bin/" + name_script + "?action=list_dir&dir_path=" + s2 + "> up </a>"
   print "</td>"

#--------------------------------------------------------
# Выбор действия над отмеченным файлом
#--------------------------------------------------------
   print "<td align=left>"
   print "<select name=change_action onChange='javascript:select_change_action();'>"
   print "<option value=select selected> select action         </option>"
   print "<option value=add> add file          </option>"
   print "<option value=delete> delete file          </option>"
   print "<option value=edit> edit file          </option>"
   print "</select>"
   print "</td>"

   print "</tr>"
   print "</table>"

   print "<table border=1 cellpadding=0 cellspacing=0 width=100% align=center>"
   print "<tr>"
   print "<td class=broun2 width=3%><b> action </b></td>"
   print "<td class=broun2 width=20%><b> Filename </b></td>"
   print "<td class=broun2 width=5%><b> size, Kb </b></td>"
   print "<td class=broun2 width=5%><b> owner </b></td>"
   # print "<td class=broun2 width=15%><b> created </b></td>"
   # print "<td class=broun2 width=15%><b> last accessed </b></td>" 
   print "<td class=broun2 width=15%><b> last modified </b></td>"
   print "<td class=broun2 width=5%><b> mode </b></td>"
   # print "<td class=broun2 width=10%><b> inode/dev </b></td>"
   print "</tr>"
   # -----------------------------------------------------
   for file in os.listdir(fs_path):
       print "<tr>"
       fstat = os.stat (fs_path+"/"+file)

       if stat.S_ISDIR(fstat[stat.ST_MODE]):
          print "<td align=center>&nbsp</td>";
          print "<td colspan=5><a href=" + server_root + "/cgi-bin/" + name_script + "?action=list_dir&dir_path=" + dir_path + "/" + file +"> + ", file,"</a></td>"
#          dump(fstat)
#          print "<td align=center >&nbsp</td>";
#          print "<td align=center>&nbsp</td>";
#          print "<td align=center>&nbsp</td>";
#          print "<td align=center>&nbsp</td>";

       if stat.S_ISREG(fstat[stat.ST_MODE]):
         print "<td align=center>"
         print "<input type=checkbox name=", file, " value=", fs_path + "/" + file, ">"
         print "</td>";
         print "<td><a href=" + server_root + "/" + dir_path + "/" + urllib.quote(file) + ">&nbsp;&nbsp", file,"</a></td>"
         dump(fstat)
       # -----------------------------------------------------

   print "</tr>"
   print "</table>"
   print "</form>\n"

#   print "<script language=JavaScript src=" + server_root + "/js/p2.js></script>"
   print "</body>"
   print "</html>"
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

# ****************************************
# Установка переменных для web-manager
# ****************************************
server_root="http://rlaptev.co.cc/www"
fs_root='/web/www'
name_script="web_manager.cgi"

#    server_root="http://90.189.181.216:804/www"
#    fs_root='/web/www'
#    name_script="web_manager_ext.cgi"

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
#     print "action= ", action, "<br>"
except NameError:
     print "action undefined<br>"
     action= ""

# ****************************************
# получить список файлов директории
# ****************************************
if action == "list_dir":
   # в массиве переменных запроса, найти переменную dir_path
   try: # использование переменной, только если она определена
       dir_path = find_query_var (list_query, "dir_path")
#       print "dir_path= ", dir_path, "<br>"
       if dir_path > "":
           fs_path = fs_root + dir_path
       else:
#           print "dir_path is empty<br>"
           fs_path = fs_root

       # Сформировать индексную страницу текущего каталога
       ls (fs_path)
   except NameError:
       print "dir_path undefined<br>"
       dir_path= ""

# ****************************************
# удаление файла 
# ****************************************
if action == "delete":
    # в массиве переменных запроса, найти переменную filename
    filename =  find_query_var (list_query, "filename")
    filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
    try:
        os.remove (filename)
        print "<b>Delete</b> " + filename +  "<br>\n"
    except OSError:
        print "<b>Cannot delete </b>" + filename +  "<br>\n"


# ИСПРАВИТЬ
# Вставить в функцию  get_query_var,  декодирование значений найденных переменной и вставка пробелов
