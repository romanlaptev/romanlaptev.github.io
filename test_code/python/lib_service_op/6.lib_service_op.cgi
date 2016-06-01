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
# -----------------------------------------------------end func

# ******************************
# Показать дерево каталогов
# ******************************
def view_tree (fs_path,html_path):
  global num_dir

#--------------------------------------------------------
# Печать файлового и веб-серверного пути к папке
#--------------------------------------------------------
  print "<table>"
  print "   <tr>"
  print "     <td class=cm1 align=left>"
  print "start_dir: <input type=text  name=start_dir size=60 value='"+ fs_path + "'>"
  print "     </td>"
  print "   </tr>"
  print "   <tr>"
  print "     <td class=cm1 align=left>"
  print "html_base: <input type=text size=60 name=html_base value='"+ html_path + "'>"
  print "    </td>"
  print "   </tr>"
  print "   <tr>"
  print "     <td class=cm1 align=left>"
  print "         <input type=submit  value=\"run search\">"
  print "    </td>"
  print "   </tr>"
  print "</table>"

#--------------------------------------------------------
# Возврат на верхний уровень файловой системы
#--------------------------------------------------------
  n1 = len(fs_path)-1 # получить длину url
  s1 = fs_path.split("/") # разбить url на элементы, разделенные слэшем
  n2 = len(s1)-1 # получить количество элементов
  n3 = len(s1[n2]) # получить длину последнего элемента
  n4 = n1 - n3 # получить длину url без последнего элемента
# собрать новую строку url без последнего элемента
  s2=""
  for k in range(0, n4):
         s2 = s2 + fs_path [k]

  n1 = len(html_path)-1 # получить длину url
  s1 = html_path.split("/") # разбить url на элементы, разделенные слэшем
  n2 = len(s1)-1 # получить количество элементов
  n3 = len(s1[n2]) # получить длину последнего элемента
  n4 = n1 - n3 # получить длину url без последнего элемента
# собрать новую строку url без последнего элемента
  s3=""
  for k in range(0, n4):
         s3 = s3 + html_path [k]

  print "<table border=0 cellpadding=0 cellspacing=10 width=100% align=center>"
  print "<tr>"
  print "<td width=\"20\">"
  s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
  html_link2 = s1 + "?action=view_tree&start_dir="+ s2 + "&html_base=" + s3
  print "<a href=" + html_link2 +"> up </a><br/>"
  print "</td>"
  print "</tr>"
  print "</table>"

  for file in os.listdir (fs_path):
     fstat = os.stat (fs_path+"/"+file)

     if stat.S_ISDIR(fstat[stat.ST_MODE]):
       num_dir = num_dir+1

       fs_link = urllib.quote_plus(fs_path + "/" + file)
       html_link = urllib.quote_plus(html_path + "/" + file)

       s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
       html_link2 = s1 + "?action=view_tree&start_dir="+ fs_link + "&html_base=" + html_link
       print num_dir, ".","<a href=" + html_link2 +">",  file,"</a><br/>"

# -----------------------------------------------------end func

# ******************************************************************************
# Сформировать индексную страницу, начиная с текущего каталога
# ******************************************************************************
def find (fs_path,html_path,spc):
  global num_dir, num_files,num_find,mask,html_base,name_script
 
#  spc = spc.join("|")
  print "<tr><td colspan=\"4\">",html_path,"</td></tr>"

  for file in os.listdir (fs_path):
          fstat = os.stat (fs_path+"/"+file)

# -----------------------------------------------------
# проверить, есть ли совпадения маски поиска с именем файла
          s1 = file.lower()
          s2 = mask.lower()
          if s1.count(s2) > 0:
            if stat.S_ISREG(fstat[stat.ST_MODE]): # если найден файл, то
              num_find=num_find+1
              html_link=html_path + "/" + file
              print "<tr>"
              print "<td class=\"class2-3\">", num_find, ".<a href='"+html_link +"'>" + file + "</a><br/>"

              filename=fs_path + "/" + file

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
              s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
              filename2 = urllib.quote_plus(filename)
              print "open file in - "
              print "<a href=" + s1 + "?action=open_cp1251&filename=" + filename2 +"> windows-1251          </a>| "
              print "<a href=" + s1 + "?action=open_cp-866&filename=" + filename2 +"> cp-866          </a>| "
              print "<a href=" + s1 + "?action=open_utf-8&filename=" + filename2 +"> utf-8 </a><br/>"
              print "<li><a href=" + s1 + "?action=annotation&filename=" + filename2 +"> create annotation  </a></li>"
              print "<li><a href=" + s1 + "?action=bookmark&filename=" + filename2 +"> add in bookmarks   </a></li>"
              print "<li><a href=" + os.environ["HTTP_HOST"]  + "/www/cgi-bin/notepad.cgi?action=edit&filename=" + filename2 +"> edit file    </a></li>"
              print "<li><a href=" + s1 + "?action=move&filename=" + filename2 +"> move to trash   </a></li>"
              print "<li><a href=" + s1 + "?action=delete&filename=" + filename2 + "> delete file  </a></li>"
              print "<li><a href=" + s1 + "?action=rename&filename=" + filename2 + "> rename file         </a></li>"
#                print "<input type=hidden name=filename value=",file,">"
              print "</td>"
              print "</tr>"
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

  print "<tr><td colspan=\"4\">&nbsp</td></tr>"
# -----------------------------------------------------end func

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

# ****************************************
# вывести дерево  каталогов
# ****************************************
if action == "view_tree":
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

# Сформировать индексную страницу, начиная с текущего каталога
   print "<html>"
   print "<head>"
   print "<title>" + start_dir + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
#   print "<link rel=STYLESHEET href=" + server_root +  "/css/style.css type=text/css>"
   print "<script language=JavaScript src=" + "http://"+ os.environ["HTTP_HOST"] + "/www/js/functions.js></script>"

   print "</head>"
   print "<body>"

   print "<table border=1 cellpadding=1 cellspacing=1 width=95% align=center>"
   print "<tr>"
   print "<td>"

   s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
   print "<form name=form_ls method=post action="+s1+">"
   print "<input type=hidden  name=action size=10 value=\"search\">"

   print "mask: <input type=text size=15 name=mask value=>"
   print "<select name=select2 onChange='javascript:select_mask();'>"
   print "<option value=txt> txt </option></br>"
   print "<option value=adventures> adventures </option></br>"
   print "<option value=detective,criminal> detective,criminal</option></br>"
   print "<option value=docs> docs</option></br>"
   print "<option value=document, articles>  document, articles</option></br>"
   print "<option value=eat> eat</option></br>"
   print "<option value=fantasy> fantasy</option></br>"
   print "<option value=science_fiction> science_fiction </option></br>"

   print "<option value=history> history </option></br>"
   print "<option value=history_novel> history_novel </option></br>"

   print "<option value=humor> humor </option></br>"
   print "<option value=medicine>  medicine </option></br>"

   print "<option value=prose> prose </option></br>"
   print "<option value=classics_prose> classics_prose </option></br>"
   print "<option value=thriller_prose> thriller_prose </option></br>"
   print "<option value=war_prose> war_prose </option></br>"

   print "<option value=psychology>  psychology </option></br>"
   print "<option value=slovar>  slovar </option></br>"
   print "<option value=A>       A </option></br>"
   print "<option value=B>       B </option></br>"
   print "<option value=C>       C </option></br>"
   print "<option value=CH>      CH </option></br>"
   print "<option value=D>       D </option></br>"
   print "<option value=E>       E </option></br>"
   print "<option value=EU>      EU </option></br>"
   print "<option value=F>       F </option></br>"
   print "<option value=G>       G </option></br>"
   print "<option value=H>       H </option></br>"
   print "<option value=I>       I </option></br>"
   print "<option value=J>       J </option></br>"
   print "<option value=K>       K </option></br>"
   print "<option value=L>       L </option></br>"
   print "<option value=M>       M </option></br>"
   print "<option value=N>       N </option></br>"
   print "<option value=O>       O </option></br>"
   print "<option value=P>       P </option></br>"
   print "<option value=Q>       Q </option></br>"
   print "<option value=R>       R </option></br>"
   print "<option value=S>       S </option></br>"
   print "<option value=SCH>     SCH </option></br>"
   print "<option value=SH>      SH </option></br>"
   print "<option value=T>       T </option></br>"
   print "<option value=U>       U </option></br>"
   print "<option value=V>       V </option></br>"
   print "<option value=W>       W </option></br>"
   print "<option value=X >      X </option></br>"
   print "<option value=Y>       Y </option></br>"
   print "<option value=YA>      YA </option></br>"
   print "<option value=YU>      YU </option></br>"
   print "<option value=Z>       Z </option></br>"
   print "</select><br>"

   num_dir = 0
   view_tree (start_dir, html_base)
   print "<b>Folders: </b>", num_dir, "<br>"

   print "</form>"

   print "</td>"
   print "</tr>"
   print "</table>"

   print "</body>"
   print "</html>"
#-----------------------------------------------------------enf if

# ********************************************************************************
# получить список файлов с книгами, совпадающих с маской поиска
# ********************************************************************************
if action == "search":
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

   # в массиве переменных запроса, найти переменную mask
   try: # использование переменной, только если она определена
      mask = find_query_var (list_query, "mask")
#      print "mask= ", mask, "<br>"
   except NameError:
      print "mask undefined<br>"

# Сформировать индексную страницу, начиная с текущего каталога
   print "<html>"
   print "<head>"
   print "<title>" + start_dir + "</title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=windows-1251>"
   print "<link rel=STYLESHEET href=http://"+ os.environ["HTTP_HOST"] + "/www/css/style.css type=text/css>"
   print "</head>"
   print "<body>"

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
   print "<html>"
   print "<head>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=windows-1251>"
   print "</head>"
   print "<body>"
   print "<textarea name=textbox id=textbox rows=30% cols=95%>"

   # в массиве переменных запроса, найти переменную filename
   filename =  find_query_var (list_query, "filename")
   filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   try:
#     myfile = open(filename,"r")# открытие и чтение текстового файла
#     line = myfile.readlines()
#     for n1 in range(1, 50): # читать первые 50 строк текста
#         print line[n1]
#     myfile.close()
     myfile = open(filename,"rb") # чтение бинарного файла
     buff = myfile.read (1024) # первые 1024 байт
     print buff
     myfile.close()

   except IOError, err:
     print err.strerror

   print "</textarea>"

   print "<table>"
   print "<tr>"
   print "<td align=left>"
   s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
   print "open file in - "
   print "<a href=" + s1 + "?action=open_cp1251&filename=" + filename +"> windows-1251          </a>| "
   print "<a href=" + s1 + "?action=open_cp-866&filename=" + filename +"> cp-866          </a>| "
   print "<a href=" + s1 + "?action=open_utf-8&filename=" + filename +"> utf-8 </a><br/>"
   print "* <a href=" + s1 + "?action=bookmark&filename=" + filename +"> add in bookmarks   </a> "
   print "* <a href=" + s1 + "?action=delete&filename=" + filename + "> delete file  </a> "
   print "* <a href=" + s1 + "?action=rename&filename=" + filename + "> rename file         </a> "
   print "</td>"
   print "</tr>"
   print "</table>"

   print "</body>"
   print "</html>"
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
# если страница передает русское имя начальной папки , 
# возникает ошибка получения списка файлов папки
# /web/www/lib/books/B/БУЛЫЧЕВ - есть смена директории
# /web/www/lib/books/B/%D0%91%D0%A3%D0%9B%D0%AB%D0%A7%D0%95%D0%92 - возникает ошибка

# если  имя начальной папки содержит пробелы, возникает ошибка получения списка файлов папки

# добавить время выполнения скрипта

# добавить сохранение сформированной страницы запроса

# добавить запись расположения и имени файла, в файл закладок
