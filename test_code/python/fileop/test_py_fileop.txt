#!/usr/bin/python

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"

print "<h1>its work</h1>"
#print "Hello, world!"

#print "<h3>цикл WHILE</h3>"
#s = "abcdefghijklmnop"
#while s != "":
#  print s
#  print "<br>"
#  s = s[1:-1]
# -----------------------------------------------------

#f.close () 	 закрыть файл.
#f.read ( [size] ) 	 читает < size > байт из файла и возвращает в виде строки. Если < size > отсутствует, то читает до конца файла.
#f.readline () 	читает целиком одну строку из файла.
#f.readlines () 	читает строки до конца файла и возвращает список прочитанных строк.
#f.seek (offset, mode)  	 устанавливает позицию в файле с которого будет произведено чтение. 
#           < offset > - смещение относительно: 
#                              a) начала файла (при mode == 0 - по умолчанию); 
#                              b) текущей позиции (при mode == 1 ); 
#                              c) конца файла (при mode == 2). 
#f.tell () 	 возвращает текущую позицию в файле. 
#f.write (str) 	записывает строку < str > в файл.

#print "<h3>чтение из файла</h3>"

#f = open("/tmp/system.conf", "r")
#s = f.read()
#print s

#print "<br>"
#print len (s)
#print "<br>"

#f.close()
# -----------------------------------------------------
#f = open("/etc/thttpd.conf", "r")
#while s != "":
#  s = f.readline()
#  print s
#  print "<br>"
#f.close()

print "<h3> модуль OS </h3>"
import os
print os.name + "<br>\n"
print "<hr>\n"

#os.rename("/tmp/hello.cgi", "/tmp/hello.py")
#os.remove("/tmp/hello.py")

#filename1 = "/etc/thttpd.conf"
#filename2 = "/tmp/thttpd.conf"
#os.system ("copy %s %s" % (filename1, filename2))
#if os.path.isfile (filename2): print "Success"

# -----------------------------------------------------
#for file in os.listdir("/tmp"):
#    print file + "<br>\n"
# -----------------------------------------------------

#os.system("pwd")

# where are we?
cwd = os.getcwd()
print cwd + "<br>\n"


print "</body>"
print "</html>"
