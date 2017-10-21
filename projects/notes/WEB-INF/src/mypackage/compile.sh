#!/bin/bash
#javac -classpath /usr/share/maven-repo/javax/servlet/servlet-api/3.0/servlet-api-3.0.jar;/home/www/sites/romanlaptev.github.io/projects/notes/WEB-INF/lib/gson-2.6.2.jar;/home/www/sites/romanlaptev.github.io/projects/notes/WEB-INF/lib/commons-lang-2.6.jar Notes.java
#javac -classpath /usr/share/java/servlet-api-3.0.jar Notes.java
javac -classpath ../../lib/servlet-api-3.0.jar:../../lib/gson-2.6.2.jar:../../lib/commons-lang-2.6.jar Notes.java
#pause
mv Notes.class ../../classes/mypackage

