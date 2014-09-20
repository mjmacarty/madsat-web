<%@page import="madsat2.bean.Answer"%>
<%@page import="java.util.List"%>
<%@page import="madsatanalytics.ModelBN"%>
<%@page import="java.nio.file.Files"%>
<%@page import="java.nio.file.Paths"%>

<%
	String resultPath =request.getContextPath()+ "\\WebContent\\modelBN.xml";
	if (Files.exists(Paths.get(resultPath))) {
		try {
			Files.delete(Paths.get(resultPath));
			System.out.println(resultPath + " was deleted ");
		} catch (Exception e) {
			System.out.println(resultPath + " cannot be  deleted ");
		}
	}

	String query = request.getParameter("q");
	String model = "proliferation";
	String operation = "load";
	String dbTableType = "madsat";

	System.out.println("q= " + query);

	if (query.contains(":")) {
		String[] qArray = query.split(":");

		if (qArray[0].contains("#")) {
			String[] tempArray = qArray[0].split("#");
			dbTableType = tempArray[0];
			model = tempArray[1];
		}
		operation = qArray[1];
	}

	System.out.println("Operation= " + operation);
	System.out.println("Model= " + model);
	System.out.println("dbTableType= " + dbTableType);

	String resultFile = request.getContextPath()+"\\WebContent\\";
	String modelSrcFile = request.getContextPath()+"\\src\\madsat2\\controller\\";
	String connURL = "localhost";
	////String connURL = "192.168.0.108";

	String user = "root";
	String password = "Matthew";
	//String password = "HelpHelp";
	//String password = "cloudserver";
	String tableName = "articlesBIG";
	//String tableName = "articles";


	ModelBN modelBN;
	modelBN = new ModelBN(tableName, model, connURL, dbTableType, user,
			password, modelSrcFile, resultFile);
	if (operation.contains("Load")) {
		modelBN.load();
		System.out.println("done with load");

	} else {
		try {
			modelBN.update();
			System.out.println("done with update");
		} catch (Exception e) {
			String connURL2 = "192.168.0.100";
			if (dbTableType.equals("mysql")) {
					password = "localhost";
				//password = "Ria";
			}
			
			
			System.out.println("Cannot update with " + connURL
					+ " ...will try " + connURL2);
			System.out.println("password= " + password);
			try {
				modelBN = new ModelBN(tableName, model, connURL2,
						dbTableType, user, password, modelSrcFile,
						resultFile);
				modelBN.load();
				modelBN.update();
				System.out.println("done with update");
			} catch (Exception e2) {
				System.out
						.println("Cannot update...will reload old data");
				modelBN.load();
			}
		}
	}
%>



