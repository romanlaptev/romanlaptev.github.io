#!/usr/bin/python
# -*- coding: utf-8 -*-
#import urllib

print "Content-type: text/html"
print ""
print "<html>"
print "<body>"
print "<h3>Python: xml.dom.minidom</h3>"
print "<br>"

from xml.dom.minidom import *

#xml = parse("test_video.xml")
xml = parse("video.xml")
#------------------------------------------------------------------

videoclips = xml.getElementsByTagName('videoclip')
n1 = 0
n2 = videoclips.length
#print "number elements VIDEOCLIP = ", n2, "<br>"
for n1 in range (0,n2):
	group = videoclips[n1].getAttribute('group').encode("UTF-8")
#	print "len(group) = ",len(group), "<br>"
	if  len(group) > 0: 
		print "n1= ",n1,". <br>"
		title = videoclips[n1].getAttribute('title').encode("UTF-8")
		print "<b>group = </b>",group, ", <b>title = </b>",title, "<br>"

		#desc = xml.getElementsByTagName("description")[0]
		#desc = videoclips[n1].childNodes[1]
		# получить все теги DESCRIPTION текущего элемента VIDEOCLIP
		desc = videoclips[n1].getElementsByTagName("description")

		# получить содержимое 1-го (!!!) тега DESCRIPTION
		desc_value = desc[0].childNodes[0].nodeValue
		print "decription = ", desc_value.encode("UTF-8")
		print "<br>"

#		f = xml.getElementsByTagName("filesize")[n1]
#		f = videoclips[n1].childNodes[3]
		f = videoclips[n1].getElementsByTagName("filesize")
		fv = f[0].childNodes[0].nodeValue
		print "filesize = ",  fv.encode("UTF-8")
		print "<br>"

#		location = xml.getElementsByTagName("location")[n1]
#		location = videoclips[n1].childNodes[5]
		location = videoclips[n1].getElementsByTagName("location")
		a = location[0].getElementsByTagName("a")

		print "location: "
		m1 = a.length
		for m2 in range (0, m1):
#			link = location.getElementsByTagName("a")[m2]
			link = a[m2]
			link_value = link.childNodes[0].nodeValue.encode("UTF-8")
			link_attr = link.getAttribute('href').encode("UTF-8")
			print m2+1,"<a href=\"" + link_attr + "\"> "+  link_value + "</a>"

#		filesharing = xml.getElementsByTagName("filesharing")[n1]
#		filesharing = videoclips[n1].childNodes[7]
#		a = filesharing.getElementsByTagName("a")
		filesharing = videoclips[n1].getElementsByTagName("filesharing")
		a = filesharing[0].getElementsByTagName("a")

		print "filesharing: "
		m1 = a.length
		for m2 in range (0,m1):
			#link = filesharing.getElementsByTagName("a")[m2]
			link = a[m2]
			link_value = link.childNodes[0].nodeValue
			#link_value = "error"
			link_attr = link.getAttribute('href')
			print m2+1,"<a href=\"" + link_attr + "\"> " + link_value + "</a>"
		print "<br>"


print "</body>"
print "</html>"

