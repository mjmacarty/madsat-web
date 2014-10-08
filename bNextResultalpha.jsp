<%@page import="madsat2.bean.Answer"%>
<%@page import="madsat2.bean.Column"%>
<%@page import="java.util.*"%>
<%@page import="madsat2.util.FileUtil"%>
<%@page import="madsat2.controller.ResultXMLReader"%>
<%@page import="java.util.*"%>
<%@page import="java.util.*"%>
<%@page import="madsat2.controller.GoogleSearch"%>
<%@page import="madsat2.controller.HTMLDocParser"%>
<%@page import="madsat2.controller.GoogleResults.Result"%>

<%
	//  String sessionDir =(String) session.getAttribute("sessionDir");

	String sessionID = request.getSession().getId();
	String sessionDir = (String) session.getAttribute(sessionID);

	String origQuery = (String) session.getAttribute("origQuery");
	String sqlQuery = (String) session.getAttribute("sqlQuery");
	System.out.println("origquery= " + origQuery);
	String query = request.getParameter("q");
	System.out.println("query= " + query);
	System.out.println("rowNumber of prev session= "
	+ session.getAttribute("rowNumber"));
	int j = 0;
	int prevRowNumber = 0;
	int rowNumberInc = 0;
	int rowSize = 10;
	

	try {
		rowNumberInc = Integer.parseInt(query);
	} catch (Exception e) {
		System.out.println("Check values of next and previous buttons");
	}
	try {
		String prStr = (String) session.getAttribute("rowNumber");
		prevRowNumber = Integer.parseInt(prStr);
		j = rowNumberInc + prevRowNumber;
		if (j > -1) {
	session.setAttribute("rowNumber", String.valueOf(j));
		}
	} catch (Exception e) {
		session.setAttribute("rowNumber", "0");

	}

//	String dirPath = request.getContextPath() + "\\WebContent\\"
	//		+ sessionDir;
	//String resultPath = dirPath + "\\result.txt";
		String dirPath = request.getContextPath() + "/WebContent/"
	+ sessionDir;
	String resultPath = dirPath + "/result.txt";
	System.out.println("result path=" + resultPath);

	List<Answer> results = null;
	if (FileUtil.isFileReady(resultPath)) {

		ResultXMLReader pr = new ResultXMLReader();
		results = pr.processXML(resultPath);
	}
%>
 
 <table class="resultTable">
 	<thead>
 

	
	
		<%
				if (results == null) {
			%>
		<tr>
			<th>NO RESULTS FOUND FROM EXISTING DATABASES
			 </th>
		</tr>
	</thead>		
		<%
			} else if (results != null && results.size() > 0) {
				int sz = results.size();
				if (j > sz) {
					j = sz - 10;
					session.setAttribute("rowNumber", String.valueOf(j));
				}
				if (j < 0) {
					j = 0;
					session.setAttribute("rowNumber", String.valueOf(j));
				}
				List<Column> headers = results.get(0).getColumnList();
		%>
	
	
		<tr>
			<%
				for (int i = 0; i < headers.size(); i++) {
							Column col = headers.get(i);
							if(i == headers.size()-1){
								%>
								<th colspan="0"><%=col.getName()%></th>
								<%
							}else{
			%>

			<th ><%=col.getName()%></th>


			<%
				}}
			%>
		</tr>
	</thead>		
		<%
			int resCount = 0;
				while (j < results.size() && j > -1) {
					Answer res = results.get(j);
					List<Column> colList = res.getColumnList();
					j++;
					if (resCount++ == rowSize)
						break;
		%>
		<tbody>
		<tr>

			<%
				for (int k = 0; k < colList.size(); k++) {
								Column col = colList.get(k);
								if(k == colList.size()-1){
									%>
									<td colspan="0"><%=col.getValue()%></td>
									<%
								}else{
			%>
			<td><%=col.getValue()%></td>
			<%
				}}
			%>
		</tr>
		<%
			}
			} else {
		%>
		<tr>
			<th>NO RESULTS FOUND</th>
		</tr>

		<%
			}
		%>

	</tbody>

<th colspan="0">  Google Search Results for Query: <br><%=origQuery%>  </th>


<%
	int i=0;
	List<Result> googleSearchRes=null;
	try{
	googleSearchRes=GoogleSearch.searchGoogle(origQuery);
		for(Result urlStr: googleSearchRes){
%> <tr> <td style="width:130px"> 
		<a href="#" onClick="googleSearchWindow('<%=urlStr.getUrl() %>')"><%=urlStr.getUrl() %>
		</a>
		</td>
<%

          if(urlStr.getUrl().endsWith("pdf")){
        	  %>
      		<td>pdf not summarized
			</td>
			<td>
			</td>
			</td></tr>	
<% 
          } else{
          String title= new HTMLDocParser().parseHTML(urlStr.getUrl(),sessionDir,i );
          String summaryURL= sessionDir + "/summary"+i+".html";
          String aTextSummaryURL= sessionDir + "/aTextSummary"+i+".html";
          i++;
%>

		<td>
				<a href="#" onClick="googleSearchWindow('<%=summaryURL%>')"><%=title%>
		</a>
		</td><td colspan="0"><%=urlStr.getContent()%>
				
		</td>
		</td></tr>	
	<% 
          }}
 
	}catch(Exception e){
	 System.out.println(e.getCause());
	 %>
	 <tr> <td> Cannot get results from <%=e.getMessage() %>
	 </td></tr>
	 <%
 }
		
%>
		</tbody>
		 </table>




