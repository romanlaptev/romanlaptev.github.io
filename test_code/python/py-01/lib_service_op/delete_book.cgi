#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<title> test </title>"
echo "<body>"
echo "<h2> Delete </h2> $QUERY_STRING"
echo "<pre>"

rm "../lib"$QUERY_STRING
#du -h "../lib"

echo "</pre>"

echo "</b><br><hr>"
echo "<b>Environment</b><br><pre>"
set
echo "</pre>"

echo "</body>"
echo "</html>"