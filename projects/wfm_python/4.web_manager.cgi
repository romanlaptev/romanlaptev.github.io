#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
import stat
import time
import math

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
   print "<title>" + server_root + "/" + document_path + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=cp-1251>"
   print "<link rel=STYLESHEET href=" + server_root + "/" + document_root +  "/css/style.css type=text/css>"
   print "</head>"
   print "<body>"
   print "<script language=JavaScript src=" + server_root + "/" + document_root + "/js/p1.js></script>"

   print "<table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100% align=center>\n"
   print "   <tr>\n"
   print "     <td class=cm1 align=center>\n"
   print server_root + "/" + document_path + "\n"
   print "     </td>\n"
   print "   </tr>\n"
   print "</table>\n"

#--------------------------------------------------------
# Возврат на верхний уровень файловой системы
#--------------------------------------------------------
   n1 = len(document_path)-1 # получить длину url
   s1 = document_path.split("/") # разбить url на элементы, разделенные слэшем
   n2 = len(s1)-1 # получить количество элементов
   n3 = len(s1[n2]) # получить длину последнего элемента
   n4 = n1 - n3 # получить длину url без последнего элемента
# собрать новую строку url без последнего элемента
   s2=""
   for k in range(0, n4):
         s2 = s2 + document_path [k]
   print "<table border=0 cellpadding=0 cellspacing=10 width=100% align=center>"
   print "<tr>"
   print "<td width=20%>"
   print "<a href=" + server_root + "/cgi-bin/" + name_script + "?" + s2 + "> up </a>"
   print "</td>"

   print "<form name=form_ls method=post action=>"
#--------------------------------------------------------
# Выбор действия над отмеченным файлом
#--------------------------------------------------------
   print "<td align=right>"
   print "<select name=change_action onChange=>"
   print "<option value=select selected> choose action         </option>"
   print "<option value=add> add file          </option>"
   print "<option value=delete> delete file          </option>"
   print "<option value=edit> edit file          </option>"
   print "</select>"

   print "</tr>"
   print "</table>"

   print "<table border=1 cellpadding=0 cellspacing=0 width=100% align=center>"
   print "<tr>"
   print "<td class=broun2 width=20%><b> Filename </b></td>"
   print "<td class=broun2 width=5%><b> size, Kb </b></td>"
   print "<td class=broun2 width=5%><b> owner </b></td>"
   # print "<td class=broun2 width=15%><b> created </b></td>"
   # print "<td class=broun2 width=15%><b> last accessed </b></td>" 
   print "<td class=broun2 width=15%><b> last modified </b></td>"
   print "<td class=broun2 width=5%><b> mode </b></td>"
   # print "<td class=broun2 width=10%><b> inode/dev </b></td>"
   print "<td class=broun2 width=5%><b> action </b></td>"
   print "</tr>"
   # -----------------------------------------------------
   for file in os.listdir(fs_path):
       print "<tr>"
       fstat = os.stat (fs_path+"/"+file)

       if stat.S_ISDIR(fstat[stat.ST_MODE]):
          print "<td><a href=" + server_root + "/cgi-bin/" + name_script + "?" + document_path + "/" + file +"> + ", file,"</a></td>"
       if stat.S_ISREG(fstat[stat.ST_MODE]):
         print "<td><a href=" + server_root + "/" + document_path + "/" + file + ">&nbsp&nbsp", file,"</a></td>"

       dump(fstat)
       # -----------------------------------------------------
       print "<td align=center>\n"
       print "<input type=checkbox name=", file, " value=", file, "> \n"
       print "</td>\n";

   print "</tr>"
   print "</table>"
   print "</form>\n"

   print "<script language=JavaScript src=" + server_root + "/" + document_root + "/js/p2.js></script>"
#   print "</body>"
#   print "</html>"
# -----------------------------------------------------

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

# **********************************************************
# Проверка количества входных аргументов
# **********************************************************
# print "script name is", sys.argv[0]
if len (sys.argv)  > 1:
#    print "there are", len(sys.argv)-1, "arguments:"
#    for arg in sys.argv[1:]:
#        print arg

    # ****************************************
    # Установка переменных для web-manager
    # ****************************************
    server_root="http://nas/www"
    fs_root='/opt/www'
    name_script="web_manager.cgi"

    # ****************************************
    # Извлекаем параметры из запроса GET
    # ****************************************
    document_root = "nas.local"
    document_path = os.environ[ "QUERY_STRING" ]
    fs_path = fs_root + "/" + document_path

    # Сформировать индексную страницу текущего каталога
    ls (fs_path)

else:
    print "<br> there are no arguments !!!"

# ИСПРАВИТЬ
# Невозможно открыть ссылку, содержащую пробел (http://nas/www/nas.local/articles/Installing_ Debian_in_ NSD-100.html)
