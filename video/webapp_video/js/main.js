(function($){
    $(function() {

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
		
		var video = Video();
		//video.init();

    });
})(jQuery);