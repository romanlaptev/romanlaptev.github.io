jQuery(document).ready(function() 
{
	//Обработка проблем загрузки изображений (загрузить с облака гугла)
	var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
	$(".picture_column img").error(
		function()
		{
			var src = $(this).attr("src");
			var new_src = sitename + src;
console.log("Error loag image!, new source = " + new_src);
			$(this).attr("src", new_src);

			var wrap = $(this).parent().parent();
			$(wrap).find(".pirobox_gall").each(
				function()
				{
					var imagebox_src = $(this).attr("href");
				    	var new_imagebox_src = sitename + imagebox_src;
					$(this).attr("href", new_imagebox_src);
				}
			);

		}
	);
//------------------------------------- 
console.log( "piroBox is a " + typeof ($.fn.piroBox)  );
if ( typeof ($.fn.piroBox) == "function")
{
	jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : true, // true == slideshow on, false == slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox
	});
}
//------------------------------------
console.log( "highslide is a " + typeof hs  );
if ( typeof hs == "object")
{

	$(".picture img").error(
		function()
		{
			var src = $(this).attr("src");
			var new_src = sitename + src;
			$(this).attr("src", new_src);
		}
	);

//http://highslide.com/ref/hs.expand
	hs.graphicsDir = '../js/highslide/graphics/';
	hs.wrapperClassName = 'wide-border';
	hs.showCredits = false;
	//hs.align = 'center';
	//hs.transitions = ['expand', 'crossfade'];
	// Add the simple close button
	hs.registerOverlay({
		html: '<div class="closebutton" onclick="return hs.close(this)" title="Close"></div>',
		position: 'top right',
		fade: 2 // fading the semi-transparent overlay looks bad in IE
	});

}

});

