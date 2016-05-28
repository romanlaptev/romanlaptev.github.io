(function($){
    $(function() {
       
		$(".scroll-to").on("click", function(){
			$('body').scrollTo( $(this).attr("href"), 800, {offset: -50});
			//window.scrollTo(0, 0);
			return false;
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.to-top').show();
			} else {
				$('.to-top').hide();
			}
		});

		$('.toggle-taxonomy').click(
			function(e) 
			{
				$("#taxonomy-vocabulary").toggle();		
			}
		);


	load_xml('../xml/export_video.xml');
		
    });
})(jQuery);
