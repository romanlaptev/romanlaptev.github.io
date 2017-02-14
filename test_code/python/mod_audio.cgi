#!/usr/bin/python
import os
import sys
import stat
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
#   print "list_query= ", list_query, "<br>"

   # в массиве переменных запроса, найти переменную song
   try: # использование переменной, только если она определена
      song = find_query_var (list_query, "song")
#      print "song = ",  song , "<br>"
   except NameError:
      print "song undefined<br>"

# ****************************************
# Извлекаем параметры из запроса POST
# ****************************************
if query == "POST":
   for line in sys.stdin: #     Чтение строки POST-запроса со стандартного ввода (поток stdin)
        s1 = line
   list_query = get_query_var (s1)

   # в массиве переменных запроса, найти переменную song
   try: # использование переменной, только если она определена
      song = find_query_var (list_query, "song")
#      print "song = ", song, "<br>"
   except NameError:
      print "song undefined<br>"

print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"
print "<h2>Play</h2>"

#Decodes any %##  encoding in the given string.
dec_song= urllib.unquote_plus(song) 
print dec_song + "<br>"

print "<object width=\"30%\" height=\"30%\" type=\"application/x-mplayer2\" >"
print "<param name=\"fileName\" value=\""+ dec_song +"\">"
print "<param name=\"autostart\" value=\"0\">"
print "<param name=\"ShowStatusBar\" value=\"1\">"
print "<param name=\"volume\" value=\"0\">"
print "<param name=\"controls\" value=\"false\">"
print "Тег object не поддерживается вашим браузером."
print "</object>"

print "</body>"
print "</html>"

