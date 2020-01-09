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

#   print "<td class=e5-2>", uid, gid,"</td>" # - owner

   n1 = size /1024
   n2 = int (math.fmod (size,1024));
   print "<td>",  n1, ",", n2, "</td>" #- size
 
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
   print "<link rel=STYLESHEET href=http://12nov.co.cc/www/css/style.css type=text/css>"
   print "</head>"
   print "<body>"

   print "<script language=JavaScript src=/www/js/config.js></script>"
   print "<script language=JavaScript src=/www/js/functions.js></script>"

#--------------------------------------------------------
# Печать файлового и вебсерверного пути к папке
#--------------------------------------------------------
#   print "<form name=form_ls method=post action='javascript:alert(\"test!\")';>"
   print "<form name=form_ls method=post action=\"group_action.cgi\" target=_blank>"
   print "<table border=0 bordercolor=silver cellspacing=0 cellpadding=10  width=100% align=center>\n"
   print "   <tr>\n"
   print "     <td class=cm1 align=center>\n"
#   print "         <input type=hidden size=30 name=html_path_desc value="+ server_root + dir_path + ">"
   url = urllib.unquote_plus (server_root + dir_path)
   fs_link = urllib.unquote_plus (dir_path)
   s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
   print "<a href=" + s1 + "?action=list_dir&dir_path=" + fs_link + ">" + url + "</a>"
   print "     </td>"
#   print "     <td class=cm1 align=center>\n"
   print "         <input type=hidden size=30 name=fs_path_desc value="+ fs_root + dir_path + ">"
#   print "    </td>"
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
#   print "<a href=" + server_root + name_script + "?action=list_dir&dir_path=" + s2 + "> up </a>"
   print "<a href=" + name_script + "?action=list_dir&dir_path=" + s2 + "> up </a>"
   print "</td>"

#--------------------------------------------------------
# Выбор действия над отмеченным файлом
#--------------------------------------------------------
   print "<td align=left>"
   print "<select name=change_action onChange=''>"
   print "<option value=select selected> select action         </option>"
   print "<option value=rm_tree> remove dir tree     </option>"
   print "<option value=delete> delete file          </option>"
   print "<option value=play> play media file  </option>"
   print "</select>"

   print "<input type=submit value=\"submit\">"
   print "<input type=button onClick='javascript:select_checkbox();' value=\"select all files\">"
   print "<input type=button onClick='javascript:clear_checkbox();' value=\"clear all\">"
#   print "<input type=button onClick='javascript:location_reload();' value=\"reload\">"
   
   print "</td>"

   print "</tr>"
   print "</table>"

   print "<table border=1 cellpadding=0 cellspacing=0 width=100% align=center>"
   print "<tr>"
   print "<td class=broun2 width=3%><b> group action </b></td>"
   print "<td class=broun2 width=20%><b> Filename </b></td>"
   print "<td class=broun2 width=10%><b> action </b></td>"
   print "<td class=broun2 width=10%><b> size, Kb </b></td>"
   # print "<td class=broun2 width=15%><b> created </b></td>"
   # print "<td class=broun2 width=15%><b> last accessed </b></td>" 
   print "<td class=broun2 width=15%><b> last modified </b></td>"
   print "<td class=broun2 width=5%><b> mode </b></td>"
   # print "<td class=broun2 width=10%><b> inode/dev </b></td>"
   print "</tr>"
# -----------------------------------------------------

   #Decodes any %##  encoding in the given string.
   dec_fs_path = urllib.unquote_plus(fs_path) 

#   print "fs_path =" + fs_path + "<br>"
#   print "dec_fs_path =" + dec_fs_path + "<br>"

   s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]
   num_file = 0
   num_dir = 0
   for file in os.listdir(dec_fs_path):
       print "<tr id=\"" + str(num_file+num_dir+1) + "\">"
       fstat = os.stat (dec_fs_path+"/"+file)

       url = server_root + dir_path + "/" + urllib.quote (file)
       url2 = dir_path + "/" + urllib.quote (file)
       filename= fs_root + dir_path  + "/" + urllib.quote(file)
#       url = server_root + dir_path  + urllib.quote (file)
#       filename= fs_root + dir_path   + urllib.quote(file)

       if stat.S_ISDIR(fstat[stat.ST_MODE]):
         num_dir = num_dir+1
         str_num_dir= str(num_dir)
         print "<td align=center>&nbsp</td>";
         print "<td>"
         print "<a href=\"" + s1  + "?action=list_dir&dir_path=" + dir_path + "/" + urllib.quote(file) +"\"> + ", file," </a>"
         print "</td>"

         print "<td>"
         print "<a href='javascript:processnode2(\"dir"+str_num_dir+"\")'> x </a>"
         print "<div style='display: none; background-color: #335280; font-size:  10pt;' id='dir"+ str_num_dir +"'>"
         print "<a href=" + s1 + "?action=rename&filename=" + filename + " target=_blank> rename    </a><br/> "
         print "<a href=" + s1 + "?action=rmdir&filename=" + filename +" target=_blank> delete  </a><br/>"
         print "</div>"
         print "</td>"

         print "<td colspan=3>&nbsp </td>"
#          dump(fstat)
#          print "<td align=center >&nbsp</td>";
#          print "<td align=center>&nbsp</td>";
#          print "<td align=center>&nbsp</td>";
#          print "<td align=center>&nbsp</td>";

       if stat.S_ISREG(fstat[stat.ST_MODE]):
         num_file = num_file+1
         str_num_file= str(num_file)
         print "<td align=center>"
#         print "<input type=checkbox name=\"file" + str_num_file + "\" value=\"" + file +  "\">"
#        print "<input type=checkbox name=\"filename\" value=\"" + file +  "\" onClick=\"mark('"+ filename +"','"+str(num_file+num_dir)+"')\">"

	 box_id = "box_" + str(num_file+num_dir+1)
	 selected_tr = str(num_file+num_dir)
         print "<input type=checkbox name=\"filename\" value=\"" + file +  "\" id=\""+box_id+"\" onClick=\"mark('" + box_id + "', '"+ selected_tr +"')\">"
         print "</td>"

         print "<td>"
         print "<a href=\"" + url + "\">", file," </a>"
         print "</td>"

         print "<td>"
         print "<a href='javascript:processnode2(\"file"+str_num_file+"\")'> x </a><br/>"
         print "<div style='display: none; background-color: green;	font-size:  10pt;' id='file"+ str_num_file +"'>"
         print "<a href=" + s1 + "?action=edit&filename=" + filename + " target=_blank> edit file        </a><br/> "
         print "<a href=" + s1 + "?action=rename&filename=" + filename + " target=_blank> rename file         </a><br/> "
         print "<a href=" + s1 + "?action=delete&filename=" + filename +" target=_blank> delete file    </a><br/>"
         print "<a href=" + s1 + "?action=play&song=" + url2 +" target=_blank> play media file   </a><br/>"
         print "</div>"
         print "</td>"

         dump(fstat)
       # -----------------------------------------------------

   print "</tr>"
   print "</table>"
   print "</form>\n"

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
#server_root="http://rlaptev.co.cc/www"
server_root="http://12nov.co.cc/ext"
#fs_root='/web/www'
fs_root='/web/ext'
name_script="/www/cgi-bin/web_manager.cgi"

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
	#print "filename =" + filename + "<br>"

	filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
	#print "filename =" + filename + "<br>"
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
#-----------------------------------------------------------enf if

# ****************************************
# удаление  каталога
# ****************************************
# rmdir(path) Удаляет каталог с именем path.
# removedirs(path) автоматически удаляет все родительские пустые папки.
if action == "rmdir":
	 # в массиве переменных запроса, найти переменную filename
	filename =  find_query_var (list_query, "filename")
	#print "filename =" + filename + "<br>"

	filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
	#print "filename =" + filename + "<br>"
	try:
		os.rmdir (filename)
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
#-----------------------------------------------------------enf if

# ****************************************
# воспроизвести файл
# ****************************************
if action == "play":
    # в массиве переменных запроса, найти переменную song
    try: # использование переменной, только если она определена
       song = find_query_var (list_query, "song")
    except NameError:
       print "song undefined<br>"

    print "<h2>Play</h2>"

    print "song = ", song, "<br>"
    filename= fs_root + song
    print "filename = ", filename, "<br>"

    s1 = "http://"+ os.environ["HTTP_HOST"] + os.environ["SCRIPT_NAME"]

    print "<a href=" + s1 + "?action=rename&filename=" + filename + "> rename file         </a><br/> "
    print "<a href=" + s1 + "?action=delete&filename=" + filename +"> delete file    </a><br/>"

    #Decodes any %##  encoding in the given string.
    dec_song= server_root + urllib.unquote_plus(song) 
    print "dec_song = ", dec_song, "<br>"


    print "<div>"
    print "<object width=\"640\" height=\"480\" type=\"application/x-mplayer2\" >"
    print "<param name=\"fileName\" value=\""+ dec_song +"\">"
    print "<param name=\"autostart\" value=\"0\">"
    print "<param name=\"ShowStatusBar\" value=\"1\">"
    print "<param name=\"volume\" value=\"0\">"
    print "<param name=\"controls\" value=\"false\">"
    print "Тег object не поддерживается вашим браузером."
    print "</object>"
    print "</div>"

    print "<div>ump3player"
    print "<object type=\"application/x-shockwave-flash\" data=\"/www/players/ump3player_500x70.swf\" height=\"70\" width=\"470\">"
    print "<param name=\"wmode\" value=\"transparent\" />"
    print "<param name=\"allowFullScreen\" value=\"true\" />"
    print "<param name=\"allowScriptAccess\" value=\"always\" />"
    print "<param name=\"movie\" value=\"/www/players/ump3player_500x70.swf\" />"
    print "<param name=\"FlashVars\" value=\"way=" + dec_song + "&amp;"
    print "swf=/www/players/ump3player_500x70.swf&amp;w=470&amp;h=70&amp;"
    print "time_seconds=0&amp;autoplay=0&amp;q=&amp;skin=black&amp;volume=70&amp;comment=\" />"
    print "</object>"
    print "</div>"

    print "<div>uflvplayer"
    print "<object type=\"application/x-shockwave-flash\" data=\"/www/players/uflvplayer_500x375.swf\" height=\"640\" width=\"480\">"
    print "	<param name=\"bgcolor\" value=\"#FFFFFF\" />"
    print "	<param name=\"allowFullScreen\" value=\"true\" />"
    print "	<param name=\"allowScriptAccess\" value=\"always\" />"
    print "	<param name=\"movie\" value=\"/www/players/uflvplayer_500x375.swf\" />"
    print "	<param name=\"FlashVars\" "
    print "value=\"way=" + dec_song + "&amp;"
    print "swf=/www/players/uflvplayer_500x375.swf&amp;w=400&amp;h=340&amp;pic=&amp;autoplay=0&amp;"
    print "tools=1&amp;skin=greyblack&amp;volume=70&amp;q=&amp;comment=\" />"
    print "</object>"
    print "</div>"

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
   print "oldfile:"+filename+"<br/>"
   print "<input type=text size=60 name=oldfile value=\""+filename+"\"><br/>"
   print "newfile:"
   print "<input type=text size=60 name=newfile value=\""+filename+"\">"
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
        print "<b>Rename</b><br> " + oldfile +  " in <br>" + newfile + "<br>\n"
   except OSError:
        print "<b>Cannot rename </b>" + oldfile +  "<br>\n"
#-----------------------------------------------------------enf if

# ****************************************
# Редактировать текстовую форму
# ****************************************
if action == "edit":
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
       print "filename undefined<br>"

   print "<html>"
   print "<head>"
   print "<title> Edit "+ filename +" </title>"
   print "<meta http-equiv=Expires content=0>"
   print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
#   print "<link rel=STYLESHEET href=" + server_root + "/css/style.css type=text/css>"
   print "</head>"
   print "<body>"

   print "<form  method=post  action=" + os.environ[ "SCRIPT_NAME"] + ">"
   print "<table border=0 width=95%>"
   print "<tr>"
   print "<td valign=top width=5>"
   print "</td>"
   print "<td valign=top>"
   print "<input type=text size=50 name=filename value='"+ filename +"'>"
   print "<input type=submit name=action value='save_changes'><br><br>"
   print "<input type='button' size=10 onclick=\"getElementById('textbox').value = '';\" value='clear'/>"
   print "</td>"
   print "</tr>"

   print "<tr>"
   print "<td valign=top width=5>"
   print "</td>"

   print "<td>"
   print "<textarea name=textbox id=textbox rows=40 cols=140>"

   try:
     myfile = open (filename,"r")# открытие и чтение текстового файла
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
   # в массиве переменных запроса, найти переменную filename
   try: # использование переменной, только если она определена
       filename =  find_query_var (list_query, "filename")
       filename = urllib.unquote_plus(filename) #Decodes any %##  encoding in the given string.
   except NameError:
       print "filename undefined<br>"

   filename=urllib.unquote_plus(filename)

# ****************************************
# создать резервную копию файла
# ****************************************
#   try:
#	print "<b>create</b> " + filename + ".bak" + "<br>\n"
#	f1 = open(filename, "r")
#	f2 = open(filename+".bak", "w")
#	for line in f1.readlines():
#	    f2.write(line)

#        f2.close()
#        f1.close()
#   except OSError:
#	print "<b>Cannot create </b>" + filename + ".bak" + "<br>\n"

   print "<h1>save_changes in ",filename, "</h1>"
   # в массиве переменных запроса, найти переменную textbox
   try: # использование переменной, только если она определена
      textbox = find_query_var (list_query, "textbox")
#     print "textbox= ", textbox, "<br>"
      print urllib.unquote_plus(textbox), "<br>"  
      try:
        myfile = open(filename,"w")
        textbuffer = urllib.unquote_plus(textbox) #Decodes any %##  encoding in the given string.
	# Замена переводов строк Windows -> Linux (необходимо для  сохранения исполняемых cgi-скриптов)
	textbuffer = textbuffer.replace('\r\n','\n')
        myfile.write (textbuffer)
        myfile.close()
      except IOError, err:
        print err.strerror

   except NameError:
      print "textbox undefined<br>"
      textbook= ""


# ИСПРАВИТЬ
# Вставить в функцию  get_query_var,  декодирование значений найденных переменной и вставка пробелов

# * т.к. имена файлов и папок передаются GET-запросом, то происходит замена пробелов символом %20. 
#Это вызывает ошибку в os.stat (""), например os.stat ("/web/www//music/20_dvd_Das_Ich/Das%20Ich")

