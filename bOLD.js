var interval = null;
function transFunction() {
	clean();
	$('#selectable').html('Translating <img src="images/translate.gif" width="100">');
	var qString = '';
	qString = $('#a-database-list').val();
	qString += ':' + $('#a-string').val();
	$.post("bTranslate.jsp", 
			{q : qString},
			function(data, status) {
		
			$('#selectable').html(data);
			$('#a-translate').removeAttr('disabled');
		});
	
	console.log(qString);
}
function execFunction() {
	clean();
	$('#query-results')
	.html('<img src="images/ajax-loader.gif"><br>Loading...');
//	interval = setInterval(statusFunction, 1500);
	var qString = '';
	qString += $('#a-database-list').val();
	qString += ':' + $('.ui-selected').text();
	$.post("bExecute.jsp", {
		q : qString
	}, function(data, status) {
		if (status == "success") {
			$('#graphicsDisplay').html(data);
			callPlanAgent();
		}
	});
	$('#a-execute').removeAttr('disabled');
	

}
function callPlanAgent() {
	var qString = '';
	$.post("bResult.jsp", {
		q : qString
	}, function(data, status) {
		
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
		}
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
		}
	});
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
			.html(
					'<h1>Query Results</h1>'
							+ '<p>Select query from Library tab or Analytics tab to display results.</p>');
	$('#graphicsDisplay')
			.html(
					'<h1>Geospatial Area of Interest</h1>'
							+ '<p>This panel will display, if relevant, a graphic of interest.');
}

function cleanQueryResults() {
	$.post('deleteResult.jsp');
	$('#query-results')
			.html(
					'<h1>Query Results</h1>'
							+ '<p>Select query from Library tab or Analytics tab to display results.</p>');
}


function auto_Function() {
	var dbSelect = $('#a-database-list').val();
	switch (dbSelect) {
	case "geoquery":
		$.get('inputGeoqueryQuery.txt', function(data) {
			var queryString = data;
			var cleanString = "";
			cleanString = queryString.match(/^NL.*/gm);
			var nlString = cleanString.map(function(el) {
				return el.replace('NL:', '');
			});

			$('#a-string').autocomplete({
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

			$('#a-string').autocomplete({
				source : nlString
			});

		});// end get
		break;
	case "bigdata":
		$.get('inputMadsatQuery.txt', function(data) {
			var queryString = data;
			var cleanString = "";
			cleanString = queryString.match(/^NL.*/gm);
			var nlString = cleanString.map(function(el) {
				return el.replace('NL:', '');
			});

			$('#a-string').autocomplete({
				source : nlString
			});

		});// end get
		break;
	case "weapon":
		$.get('inputWeapons.txt', function(data) {
			var queryString = data;
			var cleanString = "";
			cleanString = queryString.match(/^NL.*/gm);
			var nlString = cleanString.map(function(el) {
				return el.replace('NL:', '');
			});

			$('#a-string').autocomplete({
				source : nlString
			});

		});// end get
		break;
	default:
		var list = [ "Work in progress for this database",
				"Values will be popluated intelligently",
				"Based on user input",
				"Functionality to be demonstrated at one year demo" ];
		$('#a-string').autocomplete({
			source : list
		});
	}
}

