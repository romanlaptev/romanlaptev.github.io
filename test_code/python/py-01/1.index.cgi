#!/bin/sh

server_root='http://nas'
fs_root='/mnt/data/public/lib'
spath='www/lib'

echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<title> list of  $server_root/$spath </title>"
echo "<body>"

cd $fs_root

for x in *
  do
        if  [ -d  $x ]
          then   echo "<a href=$server_root/$spath/$x> [$x] </a><br>"
          else echo "<a href=$server_root/$spath/$x>$x </a><br>"
        fi
  done

echo "</body>"
echo "</html>"