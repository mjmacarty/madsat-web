var interval = null;
function transFunction() {
	clean();
	$('#selectable').html('Translating <img src="images/translate.gif" width="100">');
	var qString = '';
	qString = $('#database-list').val();
	qString += ':' + $('#query-list').val();
	$.post("bTranslate.jsp", 
			{q : qString},
			function(data, status) {
		
			$('#selectable').html(data);
			$('#translate').removeAttr('disabled');
		});
	
	console.log(qString);
}
function execFunction() {
	clean();
	$('#query-results')
	.html('<img src="images/ajax-loader.gif"><br>Loading...');
	//interval = setInterval(statusFunction, 1500);
	var qString = '';
	qString += $('#database-list').val();
	qString += ':' + $('#sql').val();
	$.post("bExecute.jsp", {
		q : qString
	}, function(data, status) {
		if (status == "success") {
			$('#graphicsDisplay').html(data);
			callPlanAgent();
			$('#execute-canned').removeAttr('disabled');
		}
	});
	
	

}
function callPlanAgent() {
	var qString = '';
	$.post("bResult.jsp", {
		q : qString
	}, function(data, status) {
		
	}).done(function(){
	//	$('#execute-canned').removeAttr('disabled');
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
				dbDynamo = dbDynamo.map(function(el){return el.replace('DATABASE:','');});
				$.unique(dbDynamo);
				console.log(dbDynamo);
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
							+ '<p>This panel will display, if relevant, a graphic of interest.');
}

function cleanQueryResults() {
	$.post('deleteResult.jsp');
	$('#query-results')
			.html(
					'<p>Select query from Library tab or Analytics tab to display results.</p>');
}


function auto_FunctionOLD() {
	var dbSelect = $('#database-list').val();
	switch (dbSelect) {
	case "geoquery":
		$.get('inputGeoqueryQuery.txt', function(data) {
			var queryString = data;
			var cleanString = "";
			cleanString = queryString.match(/^NL.*/gm);
			var nlString = cleanString.map(function(el) {
				return el.replace('NL:', '');
			});

			$('#string').autocomplete({
				source : nlString
			});

		});// end get
		break;
	case "madsat":
		$.get('inputMadsatQuery.txt', function(data) {
			var queryString = data;
			var cleanString = "";
			cleanString = queryString.match(/^NL.*/gm);
			var nlString = cleanString.map(function(el) {
				return el.replace('NL:', '');
			});

			$('#string').autocomplete({
				source : nlString
			});

		});// end get
		break;
	default:
		var list = [ "Work in progress for this database",
				"Values will be popluated intelligently",
				"Based on user input",
				"Functionality to be demonstrated at one year demo" ];
		$('#string').autocomplete({
			source : list
		});
	}
}

