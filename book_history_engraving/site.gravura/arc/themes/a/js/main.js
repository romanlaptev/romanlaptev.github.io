(function($){
    $(function() {

	//fix image load error       
	var sitename = "https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc";
	$("img").error(function(){
		var src = $(this).attr("src");
		var new_src = sitename + src;
console.log("Error loag image!, new source = " + new_src);
		$(this).attr("src", new_src);
	});


    });
})(jQuery);
