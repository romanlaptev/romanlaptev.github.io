#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "  <meta http-equiv=Expires content=0>"
echo "  <meta http-equiv=Content-Type content=text/html; charset=utf-8>"
echo "</head>"
echo "<body>"

echo "<h1>unzip</h1>"
echo "<pre>"

#cd ../
#unzip uploads/pages.zip
#unzip uploads/drupal_offline.zip

#unzip ../uploads/albums.zip -d ../pages
#unzip ../uploads/codeigniter.zip -d ../
unzip ../uploads/dokuwiki.zip -d ../
ls 

echo "</pre>"
echo "</body>"
echo "</html>"
