#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
#import string

# ****************************************
# main
# ****************************************

# *****************************
# Установка переменных 
# *****************************
#server_root="/www"
upload_dir='/mnt/POCKI-DRIVE/opt/www/uploads'

#server_root="http://mycomp/documents/roman/0_source/www/mycomp.local"
#upload_dir='/mnt/disk2/documents/uploads'

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title> upload </title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
#print "<link rel=STYLESHEET href=" + server_root +  "/css/style.css type=text/css>"
print "</head>"
print "<body>"

# ****************************************
# Печать переменных запроса
# ****************************************
print "<ul>"
for k in os.environ:
    print "<b> ", k, "</b> = ", os.environ[k]  + "<br>\n"
print "</ul>"
print "<hr>\n"

#----------------------------------------------------------------------------------------
#  Определить тип  и границы (boundares) запроса
# (CONTENT_TYPE  = multipart/form-data; boundary=......)
#----------------------------------------------------------------------------------------
content_type = os.environ["CONTENT_TYPE"]

s1 = content_type.split (";")   # разбить строку на элементы, разделенные ";"
content_type_query = s1[0]

if content_type_query != 'multipart/form-data':
   print "content_type_query = ",content_type_query,  "<br>"
   print "Error! Must be - &lt;form enctype=\"multipart/form-data\"&gt;"
   sys.exit()

s2 = s1[1].split ("=")   # разбить строку на элементы, разделенные "="
boundary=s2[1]
#print "boundary = ",boundary, "<br>"
size_boundary = len (boundary) # получить длину

#----------------------------------------------------------------------------------------
#  Чтение строки POST-запроса со стандартного ввода (поток stdin)
#----------------------------------------------------------------------------------------

#----------------------------------------------------------------------------------------
#  Выделить из  запроса содержимое файла
#----------------------------------------------------------------------------------------
# пропустить первую границу (boundare)
line = sys.stdin.readline() 
#print "1. ", line,"<br>"
size_line1 = len (line) # получить длину

#------------------------------------------
# считать Content-Disposition (Content-Disposition: form-data; name="userfile"; filename="myfilename")
#------------------------------------------
content_disposition_not_separated = sys.stdin.readline()
print "content_disposition_not_separated =  ", content_disposition_not_separated,"<br>"
size_line2 = len (content_disposition_not_separated) # получить длину

#------------------------------------------
# считать content-type (Content-Type: application/x-bittorrent )
#------------------------------------------
content_type_file_not_separated = sys.stdin.readline()
print "content_type_file_not_separated =  ", content_type_file_not_separated,"<br>"
size_line3 = len (content_type_file_not_separated) # получить длину

# пропустить пустую строку (разделитель заголовков и файла)
line = sys.stdin.readline() 
size_line4 = len (line) # получить длину

#------------------------------------------------------------------------------------------------------------------------------
# Выделить из строк заголовков, имена параметров и их значения
#------------------------------------------------------------------------------------------------------------------------------
s1 = content_disposition_not_separated.split (";")   # разбить строку на элементы, разделенные ";"

#------------------------------------------
# Получить значение Content-Disposition
#------------------------------------------
s2 = s1[0].split (":")   # разбить строку на элементы, разделенные ":"
content_disposition = s2[1]
print "content_disposition =  ", content_disposition,"<br>"

#------------------------------------------
# Получить значение name (имя переменной формы)
#------------------------------------------
s2 = s1[1].split ("=")   # разбить строку на элементы, разделенные ":"
s3= s2[1].split ("\"")  # убрать кавычки
name = s3[1]
print "name =  ", name,"<br>"

#------------------------------------------
# Получить значение filename (текстовое имя файла)
#------------------------------------------
s2 = s1[2].split ("=")   # разбить строку на элементы, разделенные ":"
s3= s2[1].split ("\"")  # убрать кавычки
filename = s3[1]
print "filename =  ", filename,"<br>"

# Получить значение Content-Type (тип содержимого файла)
s1 = content_type_file_not_separated.split (":")   # разбить строку на элементы, разделенные ":"
content_type_file = s1[1]
print "content_type_file =  ", content_type_file,"<br>"

#------------------------------------------
# Вычислить размер  файла (CONTENT_LENGTH - длина заголовков)
#------------------------------------------
#print "size_line1 =", size_line1,"<br>"
#print "size_line2 =", size_line2,"<br>"
#print "size_line3 =", size_line3,"<br>"
#print "size_line4 =", size_line4,"<br>"

size_header2 = size_line1 + 2 # вычислить длину последнего заголовка (boundary)
print "size_header2 =", size_header2,"<br>"

size_headers = size_line1 + size_line2 + size_line3 + size_line4 + size_header2
print "<b> длина заголовков </b> size_headers =", size_headers,"<br>"

n1 = int (os.environ["CONTENT_LENGTH"])
print "<b> длина запроса (CONTENT_LENGTH) </b> n1 =", n1,"<br>"

size_file = (n1 - size_headers) - 2
print "<b> размер  файла (CONTENT_LENGTH - длина заголовков - 2 байта)</b> size_file =", size_file,"<br>"

#----------------------------------------------------------------------------------------
# Считать содержимое файла в переменную 
# (метод не подходит для загрузки больших файлов)
#----------------------------------------------------------------------------------------
if size_file < (1024*1024)*2:
   line = sys.stdin.read()
   # собрать новую строку (содержимое файла) без последнего элемента (boundary)
   content_file = ""
   for k in range(0, size_file):
      content_file = content_file + line[k]

#   print "<pre>"
#   print content_file,"<br>"
#   print "</pre>"

   #----------------------------------------------------------------------------------------
   #  Сохранить содержимое файла на диск
   #----------------------------------------------------------------------------------------
   try:
        myfile = open(upload_dir + "/" + filename,"w")
        myfile.write (content_file)
        myfile.close()
        print "<b>File "+ filename +"(",  size_file," bytes) upload successfully </b> in ",upload_dir,"<br>\n"
   except IOError, err:
        print err.strerror
else:
   print "<b>File to big for upload...... </b>size_file =",  size_file,  "<br>\n"

print "</body>"
print "</html>"

# Добавить 
# вывод времени начала/конца загрузки файла
# чтение содержимого файла из POST-запроса блоками и запись считанного блока в файл
# получение каталога загрузки (upload_dir) через переменную QUERY_STRING

