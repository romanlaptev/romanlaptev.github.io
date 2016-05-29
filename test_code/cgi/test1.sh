#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<title>test </title>"
echo "<body>"
echo "<h1>test cgi</h1>"
echo "<pre>"
ls /etc
echo "</pre>"
echo "</body>"
echo "</html>"
