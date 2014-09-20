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