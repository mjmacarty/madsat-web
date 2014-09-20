<%@page import="java.nio.file.Files"%>
<%@page import="java.nio.file.Paths"%>

<%
	String resultPath = "C:\\Agent7\\WebContent\\result.xml";
	if (Files.exists(Paths.get(resultPath))) {
		try {
			Files.delete(Paths.get(resultPath));
			System.out.println(resultPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(resultPath + " cannot be  deleted ");
		}
	}
	String statusPath = "C:\\Agent7\\WebContent\\status.txt";
	if (Files.exists(Paths.get(statusPath))) {
		try {
			Files.delete(Paths.get(statusPath));
			System.out.println(statusPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(statusPath + " cannot be  deleted ");
		}
	}
%>