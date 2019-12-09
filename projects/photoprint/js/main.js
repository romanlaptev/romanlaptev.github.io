var init_w = 300;
var init_h = 250;

$(document).ready( function(){
console.log("jQuery version:" + $.fn.jquery);
console.log("jQuery UI version:" + $.ui.version);

	/* PIE */
	if (window.PIE) {
		$('.search, .search form, .menu-left, .menu-left header, .bank-pfoto span, .txt-sl, .main-slide, .backet, .center-bck, .btn, .menu-info, .menu-info header, .slide-main, .slide-main header, .direction article, .catalog article, .catalog article header, .option, .price-block, .price-block header, .catalog article footer, .head-catalog ul li a').each(function() {
		PIE.attach(this);
		});
	}


	//$("#material").selectBox();
	  $("#material").change(function() {
		if ($("#flizelin").is(":selected")) {
		  $(".select_tov").show();
		} else {
		  $(".select_tov").hide();
		}
	  }).trigger('change');



//	$("#show-rapport").click(function() {
		//$(".slidingVisual").slideToggle();
//	});



//-------------------------- 
		$(".select-tov-modal .texture-close-btn").live("click",
			function()
			{
				$(".select-tov-modal").hide();
			}
		);
		
//-------------------------- 
		$("#zoom-link").click(
			function()
			{
				$("#large-img").click();
			}
		);


//-------------------------- 
	$(".fancybox").fancybox({
		helpers : {
			overlay : {
				locked : false
			}
		}
	});

//-------------------------
/*
	$(".filters a").click(
		function()
		{
			$(".filters a").removeClass("active");
			$(this).addClass("active");
			
			if ( $(this).attr("id") == "reset-link" )
			{
				$(this).removeClass("active");
			}
			
		}
	);
*/


});//end ready
