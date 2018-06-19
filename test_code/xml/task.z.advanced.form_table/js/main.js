$(document).ready(function()
{
	$(document).ajaxStart(
		function(){ 
		  $('#ajaxBusy').show(); 
		}
	).ajaxStop(
		function()
		{ 
		  $('#ajaxBusy').hide();
		}
	);

	form_table();

});

