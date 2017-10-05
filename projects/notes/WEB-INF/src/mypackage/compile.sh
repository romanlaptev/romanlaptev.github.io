#!/bin/bash
javac -classpath /usr/share/maven-repo/javax/servlet/servlet-api/3.0/servlet-api-3.0.jar Notes.java
#pause
mv Notes.class ../../classes/mypackage
