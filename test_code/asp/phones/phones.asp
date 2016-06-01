<%@ LANGUAGE = JScript %>

<HTML>
    <HEAD>
        <TITLE>Simple ADO Query</TITLE>
    </HEAD>

    <BODY BGCOLOR="White" topmargin="10" leftmargin="10">


		<!-- Display Header -->

		<font size="4" face="Arial, Helvetica">
		<b>Simple ADO Query with ASP</b></font><br>
    
		<hr size="1" color="#000000">

		Contacts within the Phones Database:<br><br>

		<%
			var oConn;		
			var oRs;		
			var filePath;		

			
			// Map authors database to physical path
			
			filePath = Server.MapPath("phones_08-2003.mdb");


			// Create ADO Connection Component to connect with
			// sample database
		   
		
			oConn = Server.CreateObject("ADODB.Connection");
			oConn.Open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +filePath);

// открываем нашу базу данных   
//oConn.Open ("Phones"); 
			
			// Execute a SQL query and store the results within
			// recordset
			
			oRs = oConn.Execute("SELECT * From phones");

// Отображаем содержимое поля 
// Response.Write (oRs("Phone")); 
// Response.Write (oRs("Abonent")); 

		%>

<table border = 1>
<%  
  for (n1=1; n1 < 10; n1++) 
    {%>
      <tr>
        <% for (Index=0; Index < (oRs.fields.count); Index++) { %>
        <td valign=top><% = oRs(Index)%></td>
        <% } %>
      </tr>
            
    <% oRs.MoveNext();
    } 
%>

</table>

		<%   
			oRs.close();
			oConn.close();
		%>

	</BODY>
</HTML>
