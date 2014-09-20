
<%@page import="java.nio.file.Files"%>
<%@page import="java.nio.file.Paths"%>

<%
	String modelPath = "C:/Agent7/WebContent/modelBN.xml";
	if (Files.exists(Paths.get(modelPath))) {
		try {
			Files.delete(Paths.get(modelPath));
			System.out.println(modelPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(modelPath + " cannot be  deleted ");
		}
	} 
	
	String transPath = "C:/Agent7/WebContent/translation.xml";
	if (Files.exists(Paths.get(transPath))) {
		try {
			Files.delete(Paths.get(transPath));
			System.out.println(transPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(transPath + " cannot be  deleted ");
		}
	}
	
	String resultPath = "C:/Agent7/WebContent/result.xml";
	if (Files.exists(Paths.get(resultPath))) {
		try {
			Files.delete(Paths.get(resultPath));
			System.out.println(resultPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(resultPath + " cannot be  deleted ");
		}
	}
	
	String planPath = "C:/Agent7/WebContent/planXML.txt";
	if (Files.exists(Paths.get(planPath))) {
		try {
			Files.delete(Paths.get(planPath));
			System.out.println(planPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(planPath + " cannot be  deleted ");
		}
	}

%>



