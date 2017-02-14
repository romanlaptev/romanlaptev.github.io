#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<title> test </title>"
echo "<body>"
echo "<h2> move to trash </h2> $QUERY_STRING"
echo "<pre>"

mv "../lib"$QUERY_STRING ../lib/0_trash
ls ../lib/0_trash

echo "</pre>"

#echo "</b><br><hr>"
#echo "<b>Environment</b><br><pre>"
#set
#echo "</pre>"

echo "</body>"
echo "</html>"