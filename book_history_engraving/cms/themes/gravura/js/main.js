(function($){
    $(function() {
       
console.log("jquery loaded....");
	$(".scroll-to").on("click", function(){
		$('body').scrollTo( $(this).attr("href"), 800, {offset: -50});

		return false;
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.to-top').show();
		} else {
			$('.to-top').hide();
		}
	});

    });
})(jQuery);
