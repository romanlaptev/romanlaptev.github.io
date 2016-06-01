$(document).ready(function(){

	$("#btn1").click(function(){
		init_animated();
		animate_block();
		return false;
	});
		
	
	$(window).scroll(function() {
        var st = $(window).scrollTop();
document.title = st;
		if ( st > 2700  && st < 3600) 
		{
console.log("animate!");		
		}
	});//end scroll

});//end ready

function animate_block(){
	var interval_sec = 300;
	//$("#block-ingredients").fadeOut("slow").fadeIn("slow");
	//$("#block-ingredients").slideToggle("slow");
	$("#block-ingredients .ing1").animate({ 
		left: "0", 
	  }, interval_sec, function(){
			$("#block-ingredients .ing2").show().animate({ 
				left: "0", 
			}, interval_sec, function(){
					$("#block-ingredients .ing3").show().animate({ 
						left: "0", 
					}, interval_sec, function(){
							$("#block-ingredients .ing4").show().animate({ 
								left: "0", 
							 }, interval_sec, function(){
									$("#block-ingredients .ing5").show().animate({ 
										left: "0", 
									}, interval_sec, function(){
											$("#block-ingredients .ing6").show().animate({ 
												left: "0", 
											}, interval_sec );
										}); //end animate
								});//end animate
						});//end animate
				});//end animate
		});//end animate

};//end animate_block()


function init_animated(){
//console.log("function init_animated()");		

	$("#block-ingredients .ing1").show();
	$("#block-ingredients .ing1").css("left","70%");
	
	$("#block-ingredients .ing2").hide();
	$("#block-ingredients .ing2").css("left","70%");

	$("#block-ingredients .ing3").hide();
	$("#block-ingredients .ing3").css("left","70%");

	$("#block-ingredients .ing4").hide();
	$("#block-ingredients .ing4").css("left","70%");

	$("#block-ingredients .ing5").hide();
	$("#block-ingredients .ing5").css("left","70%");

	$("#block-ingredients .ing6").hide();
	$("#block-ingredients .ing6").css("left","70%");
}