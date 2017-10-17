<%
String json = "";

int sum = 2+2;
//out.println(sum);
json += " \"testResult\" : \""+sum+"\" ";
json += ",";

String ver = System.getProperty("java.version");
json += " \"javaVersion\" : \""+ver+"\" ";
json += ",";

ver = application.getServerInfo();
json += " \"serverInfo\" : \""+ver+"\" ";
json += ",";

ver = application.getMajorVersion() +"."+ application.getMinorVersion();
json += " \"serverVersion\" : \""+ver+"\" ";
json += ",";

ver = JspFactory.getDefaultFactory().getEngineInfo().getSpecificationVersion();
json += " \"JSPversion\" : \""+ver+"\" ";
json += ",";

json =  json.substring( 0, json.length() - 1);
json = "{" + json + "}";
out.print( json );

%>
