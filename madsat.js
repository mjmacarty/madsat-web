var interval = null;


var galactic = {
	qString :'',
	database :'',
	getIndex : function () {
		return $("ul li.ui-state-active").index();
    }
};

function transFunction() {
	clean();
	
	$('#selectable').html('Translating <img src="images/translate.gif" width="100">');
		
	if (galactic.getIndex()==3){
		galactic.database = $('#nlq-database-list').val();
	} else{
		galactic.database = $('#database-list').val();
	}
	
	
	galactic.qString = galactic.database + ':' + $('#query-list').val();
	console.log(galactic.qString);
	
	$.post("bTranslate.jsp", 
			{q : galactic.qString},
			
			function(data, status) {
			console.log(galactic.qString);
			$('#selectable').html(data);
			
		}).done(function(){
			$('#translate').button('enable');
			//$('#translate').removeAttr('ui-button-disabled');
		});
	
	
}
function execFunction() {
	clean();
	$('#query-results')
	.html('<img src="images/ajax-loader.gif"><br>Loading...');
	//interval = setInterval(statusFunction, 1500);
	//var qString = '';
	//global.qString += $('#database-list').val();
	function getIndex(){
	     return $("ul li.ui-state-active").index();
	    }
	console.log(getIndex())
	if (getIndex()==5){
		galactic.database = $('#sql-database-list').val();
		galactic.qString = galactic.database + ':' + $('#sql').val();
		console.log(galactic.qString);
	} else{
		galactic.qString = galactic.database + ':' + $('.ui-selected').text();
		console.log(galactic.qString);
		
	}
	
	$.post("bExecute.jsp", {
		q : galactic.qString
	}, function(data, status) {
		if (status == "success") {
			$('#graphicsDisplay').html(data);
				//get folder name for current run
			
			
			callPlanAgent();
			//$('#execute-canned').removeAttr('disabled');
		}
	}).done(function(){
		statusUpdate.session = $('session').text();
		console.log(statusUpdate.session);
		statusUpdate.timeIt = setInterval(function(){statusUpdate.getNumQueries(); },200); 
		
	});
	
	

}
function callPlanAgent() {
	var qString = '';
	$.post("bResult.jsp", {
		q : qString
	}, function(data, status) {
		
	}).done(function(){
		$('#execute-canned').button("enable");
		$('#np-results').append('<p id="result-link"><a href="' +statusUpdate.session +  '/result.txt" target="_blank">View Raw Result Files</a></p>');
	});
	nextResult();
}

function nextResult() {
	
	var qString = '';
	qString += $('#next').val();
	
	$.post("bNextResult.jsp", {
		q : qString
	}, function(data, status) {
		if (status == "success") {
//			clearInterval(interval);
			$('#query-results').html(data);
		};
	}).done(function(){
		$('#fetch').html('');
	});
}
function prevResult() {
	var qString = '';
	qString += $('#prev').val();
	$.post("bNextResult.jsp", {
		q : qString
	}, function(data, status) {
		if (status == "success") {
//			clearInterval(interval);
			$('#query-results').html(data);
		};
	}).done(function(){
		$('#fetch').html('');
	});
}

var getDb = function(select){
	
	//get database names from inputQueryExamples
	$.get('inputQueryExamples.txt',
			function(data){
				var string = data;
				var dbDynamo ='';
				dbExp = new RegExp('(DATABASE:.*)','gm');
				dbDynamo = string.match(dbExp);
				cleanBreaks = new RegExp('(\r?\n|\r)','gm');
				stringNow = dbDynamo.toString();
				//console.log(dbDynamo);
				dbDynamo = dbDynamo.map(function(el){return el.replace('DATABASE:','');});
				
				var outArray = [];
				for(i=0; i < dbDynamo.length; i++){
					if ($.inArray(dbDynamo[i],outArray)== -1){
						outArray.push(dbDynamo[i]);
						}
					}
								
				dbDynamo = outArray.sort();
				
				var options = '';
				for(i=0; i<dbDynamo.length; i++){
					options += '<option value="' + dbDynamo[i] + '">' + dbDynamo[i] + '</option>';
				};
				$(select).append(options);
				
				
	});
	
};



var fetch = function(){
	  $('#fetch').html('Fetching&nbsp;' + '<img src="images/fetch.gif" width="100">');
};


// change status panel display based on active tab

var statusDisplay = {
		
		libraryTab : '<h1>Status Summary</h1><br>' +
			 '<p class="status">Current as of:</p>' +
		'<span id="cao" class="status-update"></span><br>' +
		'<p class="status">Total Queries Planned: <span id="total-status" class="status-update"></span></p><br>' +
		'<p class="status">Queries Executing: <span id="queries-executing" class="status-update"></span></p><br>' +
		'<p class="status">Queries Completed: <span id="complete-status" class="status-update"></span></p><br>' +
		'<p class="status" id="percent-complete" style="display:inline;">Percent Complete: </p><div id ="progress-container" style="width:125px; display:inline;"></div><br>' +
		'<p class="status">Elapsed Time of Run: <span id="elapsed-status" class="status-update"></span></p><br>' +
		'<p class="status">Number of Records Returned: <span id="records-status" class="status-update"></span></p>'
,
		
		analyticsTab :'<h1>Model Nodes</h1><p>Node Name</p>' + 
		'<select id="analytics-nodes" style="width:150px; height:25px;"></select>',
		
		change : function(content){
			$('#status').html(content);
			console.log('I executed!');
		}
};

var statusUpdate = {
		queries : [],
		numQueries : 0,
		executedQueries : 0,
		completed : [],
		numCompleted : 0,
		percentComplete : 0,
		numericalPercent: 0,
		numRecords : 0,
		session : '',
		timeIt:'',
		getNumQueries : function(){
			$.ajax({
				type: 'get',
				url: statusUpdate.session +'/planXML.txt',
				cache: false,
				error: function()
				{ 
					//clearInterval(timeIt);
					//recurse();
				},
				success: function(data){
					//clearInterval(timeIt);
					statusUpdate.queries = $(data).find('query');
					statusUpdate.numQueries = statusUpdate.queries.length;
					$('#total-status').html(statusUpdate.numQueries);
					
				},
				complete: function(){
					$.ajax({
						type: 'get',
						url: statusUpdate.session + '/status.txt',
						cache: false,
						success: function(data){
							
							//console.log(numRecords);
							statusUpdate.completed = $(data).find('state');
							statusUpdate.executedQueries = $(data).find('adjustedQueries').last().text();
							statusUpdate.numCompleted = statusUpdate.completed.length;
							
							$('#queries-executing').html(statusUpdate.executedQueries);
							$('#complete-status').html(statusUpdate.numCompleted);
							if(statusUpdate.executedQueries != ''){
								statusUpdate.percentComplete = statusUpdate.numCompleted/statusUpdate.executedQueries * 100;
							} else{
								statusUpdate.percentComplete = statusUpdate.numCompleted/statusUpdate.numQueries * 100;
							}
							statusUpdate.numericalPercent = statusUpdate.percentComplete.toFixed(2);
							
							
							//console.log(numCompleted);
							//console.log(numCompleted/statusUpdate.numQueries);
							//console.log(executedQueries);
							$('#progress').progressbar('value', statusUpdate.percentComplete);
							$('#complete-text').html(statusUpdate.numericalPercent + ' % ');
							statusUpdate.numRecords = $(data).find('total').text();
							//console.log(numRecords);
							$('#records-status').html(statusUpdate.numRecords);
							
							if(statusUpdate.percentComplete >= 100){
								clearInterval(statusUpdate.timeIt);
								$('#progress-container').html('<span class="status-update">Completed</span>');
								
								
							}
						}
					});
				}
				

			}).done(function(){
				$.ajax({
						type: 'get',
						url: statusUpdate.session + '/status.txt',
						cache: false,
						success: function(data){
							
							statusUpdate.numRecords = $(data).find('total').text();
							console.log(statusUpdate.numRecords);
							$('#records-status').html(statusUpdate.numRecords);
							statusUpdate.executedQueries = $(data).find('adjustedQueries').last().text();
							console.log(statusUpdate.session);
							$('#queries-executing').html(statusUpdate.executedQueries);
						}
						
				});//end done ajax
			});

			}  // end getNumQueries
			
	};
//progress for query execution status
var addProgressBar = function(){
	$('#progress-container').append('<div id="progress" style="height:10px; width:100px; display:inline-block">' +
			'</div> <span style="display:inline;" id="complete-text" class="status-update"></span>');
	$('#progress').progressbar();
  };

//clear status stats when new database, query or translation is selected   
var clearStatus = function(){
	$('.status-update').html('');
	}; 

var clearQueryList = function(){
	$('#query-list').val('');
	
};

// manage datasites functions
var getDataSites = function(){
	var sql = "SELECT * FROM sites;"
	$.ajax({
		type : post,
		data : {q:sql},
		url : 'getDataSites.jsp',
		cache : false,
		error : function(){},
		success : function(data){
			
		}//end success function
	}); //end getDataSites ajax call	
};

var addSite = function(){
	var addForm ='<br><input id="site-db" class="manage-sites" type="text" placeholder="Domain" onfocus="this.placeholder=\'\'"  onblur="this.placeholder = \'Domain\'"><br>' +
	'<input id="site-table" class="manage-sites" type="text" placeholder="Table" onfocus="this.placeholder=\'\'" onblur="this.placeholder = \'Table\'"><br>' +
	'<input id="site-IP" class="manage-sites" type="text" placeholder="IP Address" onfocus="this.placeholder=\'\'" onblur="this.placeholder = \'IP Address\'"><br>' +
	'<input id="site-Server" class="manage-sites" type="text" placeholder="Server" onfocus="this.placeholder=\'\'" onblur="this.placeholder = \'Server\'"><br>' +
	'<input id="site-password" class="manage-sites" type="text" placeholder="Password" onfocus="this.placeholder=\'\'" onblur="this.placeholder = \'Password\'"><br>' +
	'<button class="ui-button">Add to Datasites</button>';
	$('#manage-sites').html(addForm).find('.ui-button').button();
}

//clean up functions
var planHTML = function(){
	$('#graphicsDisplay').html('<h1>Distributed Query Plan</h1>' +
    '<p>This panel will display the optimized xml plan for query execution. Details of specific queries can be determined from this plan.  </p>');
}; 

var clearResults = function(){
	$('#query-results').html('<p>Translate a natural language query or select the SQL tab to execute raw SQL.</p>');
	$('.show-query').html('');
	$('#selectable').html('');
};





function auto_Function() {
    $.get('inputQueryExamples.txt',function(data){
        var queryString = data;
        var cleanString = "";
        var db = '';
        $('#database-list').change(function(){
           db = $('#database-list').val();
           
           // /(^DATABASE:.*\r\n)(^NL.*)/gm
           // http://regex101.com/r/mN4hS2
           //modified 2/12/14
           regex = new RegExp('(^DATABASE:'+ db +'\r\n)(^NL.*)' ,'gm');
                       
           cleanString = queryString.match(regex);
           
                     
           var nlString = cleanString.map(function(el) {return el.replace('DATABASE:' + db,'');});
           nlString = nlString.map(function(el){return el.replace('NL:',''); });
           
           $('#string').autocomplete({
            source:nlString
            }); 
            
            

         }); // end change
                                 
        
        
    });//end get
}



function statusFunction() {
	jQuery.get('status.txt', {
		"t" : $.now()
	}, function(data,status) {
		if (status == "success") {
		$('#query-results').html('<h1>Query Status</h1><br><br>' + data);
		}
	});
}

function clean() {
	$.post('deleteResult.jsp');
	$('#query-results')
			.html('<p>Select query from Library tab or Analytics tab to display results.</p>');
	
	$('#graphicsDisplay')
			.html(
					'<h1>Geospatial Area of Interest</h1>'
							+ '<p>This panel will display, if relevant, a graphic of interest.</p>');
}

function cleanQueryResults() {
	$.post('deleteResult.jsp');
	$('#query-results')
			.html(
					'<p>Select query from Library tab or Analytics tab to display results.</p>');
}




$(function (){
	$('button')
		.button()
		.click(function(event){
			event.preventDefault();
			
		});
});

/*function googleSearchWindow(urlString){
	MyWindow=window.open(urlString,'MyWindow','toolbar=no,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=no,resizable=no,width=600,height=600,left=1000,top=600'); 
	return true;
};*/

/*function addURLtoDiv(urlString){
	$.get(urlString, function(data) {
	$('#graphicsDisplay').html(data); //this causes the session tag to be lost
	});
	return false;
	
}*/
