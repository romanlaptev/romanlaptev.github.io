<%@ language=VBScript %>
<html>
  <body> 
<%
dim fs, f
set fs=Server.CreateObject("Scripting.FileSystemObject")
set f=fs.GetFile(Server.MapPath("testread.txt"))
Response.Write("The file testread.txt was created on: " & f.DateCreated)
set f=nothing
set fs=nothing
%> 
  </body>
</html>
