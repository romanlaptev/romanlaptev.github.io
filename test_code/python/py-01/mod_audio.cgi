#!/usr/bin/python
import os
import stat
import urllib

print "Content-Type: text/html"
print
print "<html>"
print "<head>"
print "<title>test Python program</title>"
print "<meta http-equiv=Expires content=0>"
print "<meta http-equiv=Content-Type content=text/html; charset=utf-8>"
print "</head>"

print "<body>"

song = "http://rlaptev.co.cc/www///music/08_cd_KMFDM_1/Sound/01-What%20Do%20You%20Know%2C%20Deutschland%20%20%281986%29/04-Conillon.mp3"

print "<object width="30%" height="30%" type="application/x-mplayer2" >"
print "<param name="fileName" value="+ song +">"
print "<param name="autostart" value="0">"
print "<param name="ShowStatusBar" value="1">"
print "<param name="volume" value="0">"
print "<param name="controls" value="false">"
print "Тег object не поддерживается вашим браузером."
print "</object>"

print "</body>"
print "</html>"

