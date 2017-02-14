#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<title> test </title>"
echo "  <meta http-equiv=Expires content=0>"
echo "  <meta http-equiv=Content-Type content=text/html; charset=utf-8>"
echo "</head>"
echo "<body>"

echo "<h1> Test CGI Test</h1>"
echo "<pre>"

#/bin/ping 192.168.0.2
uname -a

echo "</pre>"
echo "</body>"
echo "</html>"
