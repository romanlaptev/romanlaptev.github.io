javac %1 -d c:\temp\
pause
java -cp c:\temp %~n1

@echo off
REM Usage: javac <options> <source files>
REM where possible options include:
REM -g                         Generate all debugging info
REM -g:none                    Generate no debugging info
REM -g:{lines,vars,source}     Generate only some debugging info
REM -nowarn                    Generate no warnings
REM -verbose                   Output messages about what the compiler is doing
REM -deprecation               Output source locations where deprecated APIs are used
REM -classpath <path>          Specify where to find user class files and annotation processors
REM -cp <path>                 Specify where to find user class files and annotation processors
REM -sourcepath <path>         Specify where to find input source files
REM -bootclasspath <path>      Override location of bootstrap class files
REM -extdirs <dirs>            Override location of installed extensions
REM -endorseddirs <dirs>       Override location of endorsed standards path
REM -proc:{none,only}          Control whether annotation processing and/or compilation is done.
REM -processor <class1>[,<class2>,<class3>...] Names of the annotation processors to run; bypasses default discovery process
REM -processorpath <path>      Specify where to find annotation processors
REM -parameters                Generate metadata for reflection on method parameters
REM -d <directory>             Specify where to place generated class files!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
REM -s <directory>             Specify where to place generated source files
REM -h <directory>             Specify where to place generated native header files
REM -implicit:{none,class}     Specify whether or not to generate class files for implicitly referenced files
REM -encoding <encoding>       Specify character encoding used by source files
REM -source <release>          Provide source compatibility with specified release
REM -target <release>          Generate class files for specific VM version
REM -profile <profile>         Check that API used is available in the specified profile
REM -version                   Version information
REM -help                      Print a synopsis of standard options
REM -Akey[=value]              Options to pass to annotation processors
REM -X                         Print a synopsis of nonstandard options
REM -J<flag>                   Pass <flag> directly to the runtime system
REM -Werror                    Terminate compilation if warnings occur
REM @<filename>                Read options and filenames from file


REM Usage: java [-options] class [args...] (to execute a class) or  java [-options] -jar jarfile [args...] (to execute a jar file)
REM where options include:
REM -d32          use a 32-bit data model if available
REM -d64          use a 64-bit data model if available
REM -server       to select the "server" VM The default VM is server.
REM -cp <class search path of directories and zip/jar files>
REM -classpath <class search path of directories and zip/jar files>
			  REM A ; separated list of directories, JAR archives,
			  REM and ZIP archives to search for class files.
REM -D<name>=<value>
			  REM set a system property
REM -verbose:[class|gc|jni]
			  REM enable verbose output
REM -version      print product version and exit
REM -version:<value>
			  REM Warning: this feature is deprecated and will be removed
			  REM in a future release.
			  REM require the specified version to run
REM -showversion  print product version and continue
REM -jre-restrict-search | -no-jre-restrict-search
			  REM Warning: this feature is deprecated and will be removed
			  REM in a future release.
			  REM include/exclude user private JREs in the version search
REM -? -help      print this help message
REM -X            print help on non-standard options
REM -ea[:<packagename>...|:<classname>]
REM -enableassertions[:<packagename>...|:<classname>]
			  REM enable assertions with specified granularity
REM -da[:<packagename>...|:<classname>]
REM -disableassertions[:<packagename>...|:<classname>]
			  REM disable assertions with specified granularity
REM -esa | -enablesystemassertions
			  REM enable system assertions
REM -dsa | -disablesystemassertions
			  REM disable system assertions
REM -agentlib:<libname>[=<options>]
			  REM load native agent library <libname>, e.g. -agentlib:hprof
			  REM see also, -agentlib:jdwp=help and -agentlib:hprof=help
REM -agentpath:<pathname>[=<options>]
			  REM load native agent library by full pathname
REM -javaagent:<jarpath>[=<options>]
			  REM load Java programming language agent, see java.lang.instrument
REM -splash:<imagepath>
			  REM show splash screen with specified image
REM See http://www.oracle.com/technetwork/java/javase/documentation/index.html for more details.