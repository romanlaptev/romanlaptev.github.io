rem javac -classpath ..\..\lib\servlet-api.jar Notes.java
rem javac -classpath ..\..\lib\servlet-api.jar -Xlint:unchecked Notes.java
javac -classpath ..\..\lib\servlet-api.jar;../../lib/gson-2.6.2.jar Notes.java
pause
move Notes.class ..\..\classes\mypackage