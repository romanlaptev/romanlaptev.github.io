package mypackage;

//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Enumeration;

import java.io.*;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class Notes extends HttpServlet {

    private static final long serialVersionUID = 1L;

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
		writer.println("<b>Path: </b>" + request.getContextPath() );
    }//end doGet()

	// public void doPost( HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		// Enumeration paramNames = request.getParameterNames();
	// }//end doPost()

}//end class