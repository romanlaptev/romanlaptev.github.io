package mypackage;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
//import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Second extends HttpServlet {

	String servletName = "000";
	String initAction = "000";
	String serverInfo = "";
	//private ServletConfig config;
	
//http://docs.oracle.com/javaee/7/api/javax/servlet/GenericServlet.html#getInitParameter-java.lang.String-
//http://www.java2ee.ru/servlets/context.html	

    public void init() throws ServletException {
    //public void init( ServletConfig config ) throws ServletException {
		servletName = getServletName();
		initAction = getInitParameter("initAction");		
		
		//this.config = config;  
		//ServletContext sc = config.getServletContext();  
		ServletContext sc = getServletContext();  
		serverInfo = sc.getServerInfo();
    }//end init()

  public void service( ServletRequest _request, ServletResponse _response ) throws IOException, ServletException 
  {  
		//reader = request.getReader();  
		//param1 = request.getParameter("First");  
		//param2 = request.getParameter("Second");  
		
		HttpServletRequest httpRequest = (HttpServletRequest) _request;
		HttpServletResponse httpResponse = (HttpServletResponse) _response;
		
		PrintWriter out = httpResponse.getWriter();
out.println("<h2>public void service</h2>");
out.println("<br>");

out.println("<b>request method:</b> " + httpRequest.getMethod() );
out.println("<br>");
/*
http://www.java2ee.ru/servlets/context.html

getAttribute () 	¬озвращает значение указанного атрибута этого запроса.
	getContentLength () 	–азмер запроса, если известен.
	getContentType () 	¬озвращает тип MIME тела запроса.
getInputStream () 	¬озвращает InputStream дл€ чтени€ двоичных данных из тела запроса.
GetParameterNames () 	¬озвращает массив строк с именами всех параметров.
getParameterValues () 	¬озвращает массив значений дл€ указанного параметра.
	getProtocol () 	¬озвращает протокол и версию дл€ запроса как строку вида /..
getReader () 	¬озвращает BufferedReader дл€ получени€ текста из тела запроса.
	getRealPath () 	¬озвращает реальный путь дл€ указанного виртуального пути.
	getRemoteAddr () 	IP-адрес клиента, пославшего данный запрос.
	getRemoteHost () 	»м€ хоста клиентской машины, пославшего данный запрос.
	getScheme () 	¬озвращает схему, используемую в URL этого запроса (например, https, http, ftp, и т.д.).
	getServerName () 	»м€ хоста сервера, прин€вшего данный запрос.
	getServerPort () 	¬озвращает номер порта, используемого дл€ приема этого запроса.
*/
out.println("<b>getContentLength:</b> " + httpRequest.getContentLength() );
out.println("<br>");

out.println("<b>getContentType:</b> " + httpRequest.getContentType() );
out.println("<br>");

out.println("<b>getProtocol:</b> " + httpRequest.getProtocol() );
out.println("<br>");

out.println("<b>getRemoteAddr:</b> " + httpRequest.getRemoteAddr() );
out.println("<br>");

out.println("<b>getRemoteHost:</b> " + httpRequest.getRemoteHost() );
out.println("<br>");

out.println("<b>getScheme:</b> " + httpRequest.getScheme() );
out.println("<br>");

out.println("<b>getServerName:</b> " + httpRequest.getServerName() );
out.println("<br>");

out.println("<b>getServerPort:</b> " + httpRequest.getServerPort() );
out.println("<br>");

//out.println("<b>getRealPath:</b> " + httpRequest.getRealPath("") );
//out.println("<br>");


		switch( httpRequest.getMethod() ){
			
			case "GET":
				doGet( httpRequest, httpResponse );
			break;
			
			case "POST":
				doPost( httpRequest, httpResponse );
			break;
			
		}
		
  }//end service()
  
/*
   public void doFilter(ServletRequest request, ServletResponse response,
       FilterChain filterChain) throws IOException, ServletException
   {
       HttpServletRequest httpRequest = (HttpServletRequest) request;        
       if(httpRequest.getMethod().equalsIgnoreCase("POST")){

       }
       filterChain.doFilter(request, response);
   }
*/  

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
        writer.println("<title>" +servletName+" page</title>");
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

        writer.println("<h1>" +servletName+ " servlet</h1>");
        writer.println("<b>ContextPath: </b>" + request.getContextPath() );
		
		writer.println("<div class='panel panel-primary'>");
writer.println("<form name='form_message' id='message-form' action='"+request.getContextPath() +"/sec' method='POST' enctype='application/x-www-form-urlencoded'>");
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