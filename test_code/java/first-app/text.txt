rem http://www.java2ee.ru/servlets/HelloWorld.html
rem SET TOMCAT_LIB="C:\Program Files\Apache Software Foundation\Tomcat 5.5\common\lib" 
rem SET JAVA_SDK=C:\Java\Sun\SDK\jdk\bin\ 
  
rem %JAVA_SDK%javac -classpath %TOMCAT_LIB%\servlet-api.jar *.java 

rem http://javaigrun.ru/2009/05/28/kak-skompilirovat-servlet/
rem javac -classpath "C:\dmitrii.leontiev\Apache Tomcat 6.0.18\lib\servlet-api.jar" FirstServlet.java

javac -classpath d:\tomcat\lib\servlet-api.jar HelloJava.java
rem copy HelloJava.class d:\tomacat\webapps\ROOT\WEB-INF\classes\
rem copy web.xml d:\tomacat\webapps\ROOT\WEB-INF
rem restart Tomcat!

