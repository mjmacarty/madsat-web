<%@page import="madsat2.bean.Answer"%>
<%@page import="madsat2.bean.Column"%>
<%@page import="java.util.*"%>
<%@page import="java.util.Properties"%>
<%@page import="java.io.*"%>

<jsp:useBean id="result" class="madsat2.controller.ResultController"
	scope="session" />
<jsp:setProperty name="result" property="*" />
<jsp:useBean id="delete" class="madsat2.controller.FileDeleteController"
	scope="session" />
<jsp:setProperty name="delete" property="*" />

<%
	//String sessionDir = (String) session.getAttribute("sessionDir");
	String sessionID = request.getSession().getId();
	String sessionDir = (String) session.getAttribute(sessionID);

	String path = "c:/Agent7/WebContent/" + sessionDir + "/";
	boolean usePlanAgent = true;
	String resultPath = path + "result.txt";

	List<Answer> results = result.getResults(path, resultPath,
			usePlanAgent);
%>
<h3>Query Status</h3>
<table>
	<tbody>
		<tr>
			<th>Processing Plan XML</th>
		</tr>
	</tbody>
</table>
