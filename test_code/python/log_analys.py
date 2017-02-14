#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys

# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print

print "<html>"
print "<body>"
print "<h2> thttpd.log analys </h2>"

#---------------------------------------------------------
#  Открыть лог-файл  вебсервера
#---------------------------------------------------------
filename="/web/www/thttpd.log"
try:
   myfile = open (filename,"r")

#---------------------------------------------------------------------
# Вывод данных на страницу в таблице
#---------------------------------------------------------------------
   print "<table border=\"1\" width=100%>" 
   print "<tr>" 
   print "<td>  num </td>" 
   print "<td>  ip </td>" 
   print "<td>  vizit_date </td>" 
   print "<td>  request_method </td>" 
   print "<td>  query_string </td>" 
   print "<td>  code_answer </td>" 
   print "<td>  content_length </td>" 
   print "<td> http_referer  </td>" 
   print "<td>  http_user_agent </td>" 
   print "</tr>" 

#---------------------------------------------------------
# считать все содержимое файла
#   textbuffer = myfile.read() 
#---------------------------------------------------------

#---------------------------------------------------------
#   line='\n'
#   while line:
#      line = myfile.readline() # считать строку файла
#      print line
#      print "<br>"
#---------------------------------------------------------
   num=0
   line='\n'
   while line:
        line = myfile.readline() # считать строку файла
        if line == "":
          break
        num=num+1
        s1 = line.split ("\"")   # разбить строку на элементы
#      n1 = len (s1) # получить длину
#      for n2 in range(0, n1):
#         print "s1[",n2,"] = ",s1[n2], "<br>"

#---------------------------------------------------------
# получить ip-адрес и дату
#---------------------------------------------------------
        s2 = s1[0].split ("[")   # разбить строку на элементы, разделенные "["
        s3 = s2[0].split (" ")   # разбить строку на элементы, разделенные "--"
        ip =  s3[0]
        vizit_date =  s2[1]

#---------------------------------------------------------------------
# получить тип запроса, строку запроса и протокол обмена
#---------------------------------------------------------------------
        s2 = s1[1].split (" ")   # разбить строку на элементы, разделенные " "
        request_method = s2[0]
        query_string = s2[1]
        protocol = s2[2]

#---------------------------------------------------------------------
# получить код ответа сервера и размер запроса
#---------------------------------------------------------------------
        s2 = s1[2].split (" ")   # разбить строку на элементы, разделенные " "
        code_answer = s2[1]
        content_length = s2[2]

#---------------------------------------------------------------------
# получить URL источника запроса и клиентское приложение
#---------------------------------------------------------------------
        http_referer = s1[3]
        http_user_agent =  s1[5]

#---------------------------------------------------------------------
# Вывод данных на страницу в таблице
#---------------------------------------------------------------------
        print "<tr>" 
        print "<td>", num, "</td>" 
        print "<td>" +  ip + "</td>" 
        print "<td>" +  vizit_date + "</td>" 
        print "<td>" +  request_method + "</td>" 
        print "<td>" +  query_string + "</td>" 
        print "<td>" +  code_answer + "</td>" 
        print "<td>" +  content_length + "</td>" 
        print "<td>" +  http_referer  + "</td>" 
        print "<td>" +  http_user_agent + "</td>" 
        print "</tr>" 

   print "</table>" 

   myfile.close()
except IOError, err:
   print err.strerror

print "</body>"
print "</html>"


