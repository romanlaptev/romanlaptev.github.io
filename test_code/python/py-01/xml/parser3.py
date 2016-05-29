#!/usr/bin/python
# -*- coding: cp-1251 -*-
#import urllib

print "Content-type: text/html"
print ""
print "<html>"
print "<head>"
print "<meta content=\"charset = windows-1251\">"
print "</head>"
print "<body>"
print "<h3>Python: xml.dom.minidom</h3>"
print "<br>"

from xml.dom.minidom import *

#xml_file = "video.xml"
xml_file = "/home/r/roman-laptev.hut1.ru/WWW/xml/video.xml"
#xml_file = "http://rlaptev.co.cc/www/video/video.xml"
#xml = parse("test_video.xml")
xml = parse(xml_file)

videoclips = xml.getElementsByTagName('videoclip')
n1 = 0
n2 = videoclips.length
#print "number elements VIDEOCLIP = ", n2, "<br>"
for n1 in range (0,n2):
	group = videoclips[n1].getAttribute('group').encode("cp1251")
	if  len(group) > 0:  # если заполнент атрибут заголовка, то дальнейшая обработка
		title = videoclips[n1].getAttribute('title').encode("cp1251")
		print "<div style=\"width:70%; margin-left:5%; margin-right:auto; text-align:center; padding:10pt;\">"
		print n1,".<br>"
		print "<b>",group, ",  ",title, "</b><br>"
		print "</div>"
#-----------------------------------------------------------
		# получить все теги DESCRIPTION текущего элемента VIDEOCLIP
		desc = videoclips[n1].getElementsByTagName("description")
		# получить содержимое 1-го (!!!) тега DESCRIPTION
		desc_value = desc[0].childNodes[0].nodeValue
		if  len(desc_value) > 1: 
			print "<div style=\"width:70%; margin-left:5%; margin-right:auto;\">"
			print "Описание: <br>"
			print desc_value.encode("cp1251")
			print "</div>"
			print "<br>"
		else: # если не заполнент тег описания
			print "<div style=\"width:70%; margin-left:5%; margin-right:auto; text-align:center;\">"
			print "<font color=red>no decription </font>"
			print "</div>"
			print "<br>"
#-----------------------------------------------------------
		print "<div style=\"width:70%; margin-left:5%; margin-right:auto; text-align:center;\">"
		# получить все теги FILESIZE текущего элемента VIDEOCLIP
		f = videoclips[n1].getElementsByTagName("filesize")
		fv = f[0].childNodes[0].nodeValue
		if  len(fv) > 1: 
			print "Размер файла:",  fv.encode("UTF-8")
			print "<br>"
		else: # если не заполнент тег 
			print "<font color=red>no filesize </font>"
			print "<br>"
#-----------------------------------------------------------
		# получить все теги LOCATION текущего элемента VIDEOCLIP
		location = videoclips[n1].getElementsByTagName("location")
		if len(location) == 0:
			print "<font color=red>tag location udefined </font>"
			print "<br>"
		else:
			# получить содержимое 1-го (!!!) тега LOCATION
			a = location[0].getElementsByTagName("a")
			print "Ссылка для локальной сети: "
			m1 = a.length
			for m2 in range (0, m1):
	#			link = location.getElementsByTagName("a")[m2]
				link = a[m2]
				link_value = link.childNodes[0].nodeValue.encode("cp1251")
				link_attr = link.getAttribute('href').encode("cp1251")
				print m2+1,"<a href=\"" + link_attr + "\"> "+  link_value + "</a>"
			print "<br>"
#-----------------------------------------------------------
		filesharing = videoclips[n1].getElementsByTagName("filesharing")
		if len(filesharing) == 0:
			print "<font color=red>tag filesharing udefined </font>"
			print "<br>"
		else:
			a = filesharing[0].getElementsByTagName("a")
			print "Ссылка для скачивания с файлообменников:"
			m1 = a.length
			for m2 in range (0,m1):
				link = a[m2]
				link_value = link.childNodes[0].nodeValue.encode("UTF-8")
				link_attr = link.getAttribute('href').encode("UTF-8")
				print m2+1,"<a href=\"" + link_attr + "\"> " + link_value + "</a>"
			print "<br>"
#-----------------------------------------------------------
		print "</div>"
		print "<br>"
#-------------------------------------------------------- end for

print "</body>"
print "</html>"

