<%@page import="java.nio.file.*"%>
<%@page import="madsat2.bean.Answer"%>
<%@page import="java.util.List"%>
<%@page import="Query.Plan"%>
<%@page import="java.io.*"%>
<%@page import="madsat2.util.FileUtil"%>
<%@page import="java.util.Properties"%>

<jsp:useBean id="execute" class="madsat2.controller.ExecuteController"
	scope="session" />
<jsp:setProperty name="execute" property="*" />
<jsp:useBean id="delete" class="madsat2.controller.FileDeleteController"
	scope="session" />
<jsp:setProperty name="delete" property="*" />

<%
	String user = "root";
	String pword = "Matthew";

	String query = request.getParameter("q");
	String[] qArray = query.split(":");
	if (qArray.length > 1) {
		session.setAttribute("sqlQuery", qArray[1]);
	}
	session.setAttribute("rowNumber", "0");
	String tmp = String.valueOf(Math.random());
	session.setAttribute("sessionDir", tmp.substring(3));

	String sessionID = request.getSession().getId();
	session.setAttribute(sessionID,tmp.substring(3) );
	
	String sessionDir = (String) session.getAttribute("sessionDir");
		
	//String planPath =request.getContextPath()+ "/WebContent/" + sessionDir + "/";
	String planPath = "c:/Agent7/WebContent/" + sessionDir + "/";

	System.out.println("request.getContextPath()= "
			+ request.getContextPath());
	System.out.println("query= " + query);

	List<String> lines = execute.processTranslation(query, user, pword,
			planPath);
	String statusLink="http://192.168.0.101:8080" +request.getContextPath()+"/" +sessionDir + "/status.txt";
	//String statusLink="localhost:8080" +request.getContextPath()+"/" +sessionDir + "/status.txt";
%>
<session style="color:#fcfdfd;"><%=sessionDir%></session>

<h3>Raw Plan XML</h3>
<%
	for (int i = 0; i < lines.size(); i++) {
		String str = lines.get(i);
		if (str.contains("password")) {
			i = i + 3;
			str = lines.get(i);
		}
%>
<li><xmp style="line-height:.15;"><%=str%></xmp></li>
<%
	}
%>

