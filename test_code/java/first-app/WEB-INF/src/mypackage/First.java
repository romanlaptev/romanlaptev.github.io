/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package mypackage;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
//import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class First extends HttpServlet {

    private static final long serialVersionUID = 1L;

	String servletName = "000";
	String initAction = "000";
	String serverInfo = "";
	//private ServletConfig config;
	
	//http://docs.oracle.com/javaee/7/api/javax/servlet/GenericServlet.html#getInitParameter-java.lang.String-
    public void init() throws ServletException {
    //public void init( ServletConfig config ) throws ServletException {
		servletName = getServletName();
		initAction = getInitParameter("initAction");		
		
		//this.config = config;  
		//ServletContext sc = config.getServletContext();  
		ServletContext sc = getServletContext();  
		serverInfo = sc.getServerInfo();
    }//end init()
	
    /**
     * Respond to a GET request for the content produced by
     * this servlet.
     *
     * @param request The servlet request we are processing
     * @param response The servlet response we are producing
     *
     * @exception IOException if an input/output error occurs
     * @exception ServletException if a servlet error occurs
     */
    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
      throws IOException, ServletException {

        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();

        writer.println("<html>");
        writer.println("<head>");
        writer.println("<title>First Servlet Page</title>");
		writer.println("<link rel='stylesheet' href='css/bootstrap337.min.css'>");
        writer.println("</head>");
        writer.println("<body>");
		writer.println("<div class='container'>");

writer.println("server info:" + serverInfo);
writer.println("<br>");
writer.println("servlet name:" + servletName);
writer.println("<br>");
writer.println("initAction:" + initAction);
writer.println("<br>");

String ver = System.getProperty("java.version");
writer.println("java.version:" + ver);
writer.println("<br>");

        writer.println("<h1>my First Servlet</h1>");
        writer.println("<b>Path: </b>" + request.getContextPath() );
		
		writer.println("<div class='panel panel-primary'>");
writer.println("<form name='form_message' id='message-form' action='"+request.getContextPath() +"/first' method='POST' enctype='application/x-www-form-urlencoded'>");
writer.println("<div class='form-group'>");
writer.println("<label id='name-label'>*Name: </label>");
writer.println("<input type='text' class='form-control' name='author_name' value='anonymous'>");
writer.println("</div>");
writer.println("<div class='form-group'>");
writer.println("<label id='title-label'>Title (subject): </label>");
writer.println("<input type='text' class='form-control' name='title'>");
writer.println("</div>");
writer.println("<div class='form-group'>");
writer.println("<label id='text-message-label'>*text message: </label>");
writer.println("<textarea id='notes-text' name='text_message' class='form-control' rows='10'></textarea>");
writer.println("</div>");
writer.println("<button type='reset' class='btn btn-large btn-warning'>reset form</button>");
writer.println("<button type='submit' class='btn btn-large btn-primary'>submit</button>");
writer.println("</form>");
		writer.println("</div>");

		writer.println("</div>");
		writer.println("</body>");
		writer.println("</html>");
    }//end doGet()

	public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Enumeration paramNames = request.getParameterNames();
		
		String parName;
		boolean emptyEnum = false;
		
		if( !paramNames.hasMoreElements() ){
			emptyEnum = true;
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<html>");
		out.println("<head>");
		out.println("<title>Submitted parameters</title>");
		out.println("</head>");
		out.println("<body>");
		
		if( emptyEnum ){
			out.println("<h2>No parameters in POST-request object...</h2>");
		} else {
			out.println("<ul>");
			while( paramNames.hasMoreElements() ){
				parName = (String) paramNames.nextElement();
				out.println("<li>");
				out.println("<b>" + parName + "</b>: " + request.getParameter(parName) );
				out.println("</li>");
			}//end while
			out.println("</ul>");
		}
		
		out.println("</body>");
		out.println("</html>");
		
	}//end doPost()

	public void destroy(){
		/*called before the Filter instance is removed 
		from service by the web container*/
	}
	
}//end class