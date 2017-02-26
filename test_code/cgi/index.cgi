#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<html>"
echo "<head>"
echo "<meta charset='utf-8'>"
echo "</head>"
echo "<body>"
echo "<h1>index of CGI-BIN</h1>"
echo "<ul>"

dir="./"

for x in *
  do
        if  [ -d  $x ]
          then 
echo "[$x]"
stat -c "0"%a $x; 
          else 
echo "<li><a href="$x"><b>$x</b></a>"; 
stat -c "0"%a $x; 
echo "</li>"; 

        fi
  done

echo "</ul>"

echo "</body>"
echo "</html>"
