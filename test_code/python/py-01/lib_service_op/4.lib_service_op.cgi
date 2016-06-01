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
 
#   print "<td class=e5-2>", uid, gid,"</td>" # - owner
#   print "<td>", time.ctime(ctime),"</td>" #- created
#   print "<td>", time.ctime(atime),"</td>" #- last accessed
   print "<td class=e5-2>", time.ctime(mtime),"</td>" #- last modified
#   print "<td class=e5-2>", oct(mode),"</td>" #- mode
#   print "<td>", ino, dev,"</td>" #- inode/dev
# -----------------------------------------------------

# ******************************************************************************
# Сформировать индексную страницу, начиная с текущего каталога
# ******************************************************************************
def find (fs_path,html_path,spc):
  global num_dir, num_files,num_find,mask,html_base,name_script
 
  spc = spc.join("|")

  print "<tr><td colspan=\"4\">",html_path,"</td></tr>"

  for file in os.listdir (fs_path):
          print "<tr class=\"class2-3\">"
          fstat = os.stat (fs_path+"/"+file)

# -----------------------------------------------------
# проверить, есть ли совпадения маски поиска с именем файла
          s1 = file.lower()
          s2 = mask.lower()
          if s1.count(s2) > 0:
              num_find=num_find+1

              html_link=html_path + "/" + file
#              html_link = html_link.strip("\t")
              print "<td><a href="+html_link +">", num_find, ".", file,"</a><br/>"

              filename=fs_path + "/" + file
#              filename = filename.strip(" ")
#              filename.replace(" ", "%20")

              try: # печать названия книги
                 myfile = open(filename,"rb") # чтение бинарного файла
                 buff = myfile.read (40) # первые 40 байт
                 print buff +  "<br>\n"
                 myfile.close()
              except IOError, err:
                 print err.strerror
              print "</td>"

              dump(fstat)

              print "<td align=left>"
              html_link_script=server_root + "/cgi-bin/" + name_script
              filename2 = urllib.quote_plus(filename)
              print "open file in - "
              print "<a href=" + html_link_script + "?action=open_cp1251&filename=" + filename2 +"> windows-1251          </a>| "
              print "<a href=" + html_link_script + "?action=open_cp-866&filename=" + filename2 +"> cp-866          </a>| "
              print "<a href=" + html_link_script + "?action=open_utf-8&filename=" + filename2 +"> utf-8 </a><br/>"
              print "<li><a href=" + html_link_script + "?action=annotation&filename=" + filename2 +"> create annotation  </a></li>"
              print "<li><a href=" + html_link_script + "?action=bookmark&filename=" + filename2 +"> add in bookmarks   </a></li>"
              print "<li><a href=" + server_root + "/cgi-bin/notepad.cgi?action=edit&filename=" + filename2 +"> edit file    </a></li>"
              print "<li><a href=" + html_link_script + "?action=move&filename=" + filename2 +"> move to trash   </a></li>"
              print "<li><a href=" + html_link_script + "?action=delete&filename=" + filename2 + "> delete file  </a></li>"
              print "<li><a href=" + html_link_script + "?action=rename&filename=" + filename2 + "> rename file         </a></li>"
#              print "<input type=hidden name=filename value=",file,">"
              print "</td>"
# -----------------------------------------------------

          if stat.S_ISDIR(fstat[stat.ST_MODE]):
            num_dir = num_dir+1
#            print "<td><b>+ ", fs_path + "/" + file,"</b></td>"
#            dump(fstat)
#            print "<td align=center>&nbsp</td>";
            find (fs_path + "/" + file,html_path + "/" + file,spc)     # рекурсия

          if stat.S_ISREG(fstat[stat.ST_MODE]):
            num_files = num_files+1
#            print spc, "|--",  file,"<br>"

          print "</tr>"

  print "<tr><td colspan=\"4\">&nbsp</td></tr>"
   
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
name_script = sys.argv[0]

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

# в массиве переменных запроса, найти переменную action
try: # использование переменной, только если она определена
     action = find_query_var (list_query, "action")
#     print "action= ", action, "<br>"
except NameError:
     print "action undefined<br>"
     action= ""

# ********************************************************************************
# получить список файлов с книгами, совпадающих с маской поиска
# ********************************************************************************
if action == "search":
   # в массиве переменных запроса, найти переменную server_root
   try: # использование переменной, только если она определена
      server_root = find_query_var (list_query, "server_root")
      server_root = urllib.unquote_plus(server_root) #Decodes any %##  encoding in the given string.
#      print "server_root= ", server_root, "<br>"
   except NameError:
      print "server_root undefined<br>"

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
#   try: # использование переменной, только если она определена
#      annotatio = find_query_var (list_query, "annotatio")
#      print "annotatio= ", annotatio, "<br>"
#   except NameError:
#      print "annotatio undefined<br>"

   # в массиве переменных запроса, найти переменную manage
#   try: # использование переменной, только если она определена
#      manage = find_query_var (list_query, "manage")
#      print "manage= ", manage, "<br>"
#   except NameError:
#      print "manage undefined<br>"

# Сформировать индексную страницу, начиная с текущего каталога
   print "<html>"
   print "<head>"
   print "<title>" + start_dir + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=windows-1251>"
   print "<link rel=STYLESHEET href=" + server_root +  "/css/style.css type=text/css>"
   print "</head>"
   print "<body>"
#   print "<script language=JavaScript src=" + server_root + "/js/functions.js></script>"

   num_dir = 0
   num_files = 0
   num_find = 0
   spc = "|"
   print "Searching  <b>", mask, "</b> in ", start_dir, "<br>"

   print "<table border=1 cellpadding=1 cellspacing=1 width=95% align=center>"

   print "<tr>"
   print "<td class=broun2 width=10%><b> Filename </b></td>"
   print "<td class=broun2 width=3%><b> size, Kb </b></td>"
   # print "<td class=broun2 width=5%><b> owner </b></td>"
   # print "<td class=broun2 width=15%><b> created </b></td>"
   # print "<td class=broun2 width=15%><b> last accessed </b></td>" 
   print "<td class=broun2 width=5%><b> last modified </b></td>"
   # print "<td class=broun2 width=5%><b> mode </b></td>"
   # print "<td class=broun2 width=10%><b> inode/dev </b></td>"
   print "<td class=broun2 width=30%><b> action </b></td>"
   print "</tr>"

   find (start_dir, html_base, spc)

   print "</table>"
 
   print "<b>Folders: </b>", num_dir, "<br>"
   print "<b>Files: </b>", num_files, "<br>"
   print "<b> Search: </b>", num_find, "<br>"

   print "</body>"
   print "</html>"
#-----------------------------------------------------------enf if

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
#-----------------------------------------------------------enf if

# ****************************************
# создание аннотации
# ****************************************
if action == "annotation":
   # в массиве переменных запроса, найти переменную filename
   filename =  find_query_var (list_query, "filename")
   filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   try:
     myfile = open(filename,"r")# открытие и чтение текстового файла
     line = myfile.readlines()
     for n1 in range(1, 20):
         print line[n1]+  "<br>\n"
     myfile.close()
   except IOError, err:
     print err.strerror
#-----------------------------------------------------------enf if

# ****************************************
# переименовать файл
# ****************************************
if action == "rename":
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
       print "filename undefined<br>"

   name_script = os.environ ["HTTP_REFERER"]
   print "<form name=form_rename method=post action="+ name_script +">"
   print "oldfile:"
   print "<input type=text size=60 name=oldfile value='"+filename+"'><br/>"
   print "newfile:"
   print "<input type=text size=60 name=newfile value='"+filename+"'>"
   print "<input type=hidden name=action value=\"change_name\">"
   print "<input type=submit value=\"run script\">"
   print "</form>"
#-----------------------------------------------------------enf if

if action == "change_name":
   # в массиве переменных запроса, найти переменную oldfile
   oldfile =  find_query_var (list_query, "oldfile")
   oldfile = urllib.unquote_plus(oldfile) #Decodes any %##  encoding in the given string.
   # в массиве переменных запроса, найти переменную newfile
   newfile =  find_query_var (list_query, "newfile")
   newfile = urllib.unquote_plus(newfile) #Decodes any %##  encoding in the given string.
   try:
        os.rename (oldfile, newfile)
        print "<b>Rename</b> " + oldfile +  " in " + newfile + "<br>\n"
   except OSError:
        print "<b>Cannot rename </b>" + oldfile +  "<br>\n"
#-----------------------------------------------------------enf if

# ****************************************
# открыть файл в кодировке CP-1251
# ****************************************
if action == "open_cp1251":
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
      print "filename undefined<br>"

   print "<html>"
   print "<head>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=windows-1251>"
   print "</head>"
   print "<body>"

   print "<textarea name=textbox id=textbox rows=30% cols=90%>"
#   print "<pre>"
   try:
     myfile = open(filename,"r")# открытие и чтение текстового файла
     textbuffer = myfile.read()
     print textbuffer
     myfile.close()
   except IOError, err:
     print err.strerror
#   print "</pre>"
   print "</textarea>"

   print "</body>"
   print "</html>"
#-----------------------------------------------------------enf if
# ****************************************
# открыть файл в кодировке cp-866
# ****************************************
if action == "open_cp-866":
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
      print "filename undefined<br>"

   print "<html>"
   print "<head>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=cp-866>"
   print "</head>"
   print "<body>"

   print "<pre>"
   try:
     myfile = open(filename,"r")# открытие и чтение текстового файла
     textbuffer = myfile.read()
     print textbuffer
     myfile.close()
   except IOError, err:
     print err.strerror
   print "</pre>"

   print "</body>"
   print "</html>"
#-----------------------------------------------------------enf if
# ****************************************
# открыть файл в кодировке utf-8
# ****************************************
if action == "open_utf-8":
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
      print "filename undefined<br>"

   print "<html>"
   print "<head>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
   print "</head>"
   print "<body>"

   print "<pre>"
   try:
     myfile = open(filename,"r")# открытие и чтение текстового файла
     textbuffer = myfile.read()
     print textbuffer
     myfile.close()
   except IOError, err:
     print err.strerror
   print "</pre>"

   print "</body>"
   print "</html>"
#-----------------------------------------------------------enf if

# исправить - 
# если страница передает русское имя начальной папки , возникает ошибка получения списка файлов папки
# /web/www/lib/books/B/БУЛЫЧЕВ - есть смена директории
# /web/www/lib/books/B/%D0%91%D0%A3%D0%9B%D0%AB%D0%A7%D0%95%D0%92 - возникает ошибка

# если  имя начальной папки содержит пробелы, возникает ошибка получения списка файлов папки
# добавить время выполнения скрипта
# добавить сохранение сформированной страницы запроса


