/**
 * 
 */

var addSite = function(){
	var addForm = '<br><input id="site-db" class="manage-sites" type="text" placeholder="Domain" onfocus="this.placeholder=''" onblur="this.placeholder = "Domain""><br>' +
    '<input id="site-table" class="manage-sites" type="text" placeholder="Table" onfocus="this.placeholder=\'\'" onblur="this.placeholder = \'Table\'"><br>' +
    '<input id="site-IP" class="manage-sites" type="text" placeholder="IP Address" onfocus="this.placeholder=''" onblur="this.placeholder = "IP Address""><br>' +
    '<input id="site-Server" class="manage-sites" type="text" placeholder="Server" onfocus="this.placeholder=''" onblur="this.placeholder = "Server""><br>'+
    '<input id="site-password" class="manage-sites" type="text" placeholder="Password" onfocus="this.placeholder=''" onblur="this.placeholder = "Password"><br>' +
    '<button>Add to Datasites</button>';
    		
	$('#manage-sites').html(addForm);	
}

// some kind of something Ria was trying

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