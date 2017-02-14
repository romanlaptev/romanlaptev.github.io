<% @Language = "VBScript" %>
<html>
<head>
	<title>asp upload files</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>

<body>
	<h2>asp upload files</h2>

POST query:<br>
<%
	filepath = Server.MapPath("index.html")
	Response.Write "Read file from " & filepath
	Response.Write "<br>"

'1 – файл открывается для чтения. Записывать в него нельзя.
 '2 – файл открывается для записи.
'8 – файл открывается для добавления данных 
	const fr=2

	dim fso,ts,s,ss,x
	set fso = CreateObject("Scripting.FileSystemObject")
	set file = fso.OpenTextFile(filepath,fr)
	source = file.readall
	file.close
Response.Write source
Response.Write "<br>"

	Response.Write "Request.TotalBytes = " & Request.TotalBytes  & "<br>"
	Response.Write "<hr>"
	bytecount = Request.TotalBytes
	if  bytecount>0 then
		'binread = Request.BinaryRead(bytecount)
		'if  len(binread)>0 then
			'Response.BinaryWrite binread
			'Response.Write "<br>"
		'end if

		'file_path  = "/upload"
		'upload_folder = Server.MapPath(file_path)
		'Response.Write "Upload file in " & upload_folder
		'Response.Write "<br>"


		'Set Upload = Server.CreateObject("Persits.Upload.1")
		'Upload.CodePage = 949              
		'Upload.OverwriteFiles = False ' Generate unique names
		'Upload.SetMaxSize (50 * 1024), True ' Limit files to 50 MB

		'Count = Upload.SaveVirtual ("/data"
		'Upload.Save (upload_folder)

		'If Err <> 0 Then
		'	Err.Description
		'Else
		'	For Each File in Upload.Files
		'		Response.Write File.Name & "= " & File.Path & " (" & File.Size &" bytes)<br>"
		'	Next		
		'	'Set File = Upload.Files(1)
		'	'uploadedImg = File.ExtractFileName
		'	'File.OriginalPath
		'	'Set Upload = Nothing
		'	'Set File = Nothing
		'End If

		'Response.Write "filename = " & Request.QueryString("filename")
		'Response.Write "<br>"
	end if

	'Response.Write Request.Form("var1")() & "<br>"
	'Response.Write Request.Form("var2")() & "<br>"
	Response.Write "<hr>"
%>
<br>
<!--
	<form action="upload.asp" method="post" name="form1">
		<input type="text" name="var1">
		<input type="text" name="var2">
		<input type="submit" name="submit" value="ok">
	</form>
-->
	<form enctype="multipart/form-data" action="upload.asp" method="post" name="form_upload">
		<input type="file" name="filename">
		<input type="submit" name="submit" value="upload">
	</form>

</body>
</html>


<%
'	dim wrk,n,i,n1
'	n=request.querystring("filename")
'	dim fso,ts,s,ss,x
'	const fr=1
'	n1=server.mappath(".")&"\"&n
'	set fso=createobject("scripting.filesystemobject")
'	set ts=fso.opentextfile(n1,fr)
'	s=ts.readall
'	ts.close
'	a=split(s)
'	call(response.write("Исходные данные"))
'	s=0
'	for i=lbound(a,1) to ubound(a,1)
'		call response.write (a(i)&"<br>")
'		x=clng(a(i))
'		s=s+x
'	next
'	call response.write("<br>"&s)

%>

