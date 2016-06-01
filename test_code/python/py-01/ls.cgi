#!/bin/sh
server_root='http://nas'
fs_root=$QUERY_STRING
spath='www/cgi-bin'

echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<title> list directory </title>"
echo "  <meta http-equiv=Expires content=0>"
echo "  <meta http-equiv=Content-Type content=text/html; charset=utf-8>"
echo "  <link rel=STYLESHEET href=$server_root/www/nas.local/css/style.css type=text/css>"
echo "</head>"
echo "<body>"

echo "<title> list of  $server_root/$spath </title>"

#echo "<SCRIPT language=JavaScript src=$server_root/www/nas.local/js/p1.js></SCRIPT>"

cd $fs_root

for x in *
  do
    if  [ -d  $x ]
      then   echo "<a href=$server_root/$spath/$x> [$x] </a><br>"
    else echo "<a href=$server_root/$spath/$x>$x </a><br>"
    fi
  done

#echo "<SCRIPT language=JavaScript src=$server_root/www/nas.local/js/p2.js></SCRIPT>"

echo "</body>"
echo "</html>"
