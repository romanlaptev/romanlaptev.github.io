// JavaScript Document
$(document).ready( function(){
	
	$(function(){
		$('input[placeholder], textarea[placeholder]').placeholder();
	});
	
	/* PIE */
	
	if (window.PIE) {
		$('.search, .search form, .menu-left, .menu-left header, .bank-pfoto span, .txt-sl, .main-slide, .backet, .center-bck, .btn, .menu-info, .menu-info header, .slide-main, .slide-main header, .direction article, .catalog article, .catalog article header, .option, .price-block, .price-block header, .catalog article footer, .head-catalog ul li a').each(function() {
		PIE.attach(this);
		});
	}
});//end ready

$(document).ready(function(){


	$("#active_menu").closest("nav ul").show(); // открытие меню при переходе на новыую страницу



	$(".main-all, #decor").click(function(){
		$(".menu-left.dectop ul").slideToggle("slow");
		$(".main-all").toggleClass("active");
		$(".main-all").siblings(".main-all").removeClass("active");
		return false;
	}); 
	
	$("#logo-fix").click(function(){
		$(".menu-left.dectop ul").slideToggle("slow");
		$(".main-all").toggleClass("active");
		$(".main-all").siblings(".main-all").removeClass("active");
		return false;
	}); 
	

});
$(document).ready(function(){
	$(".main-all2, #baby").click(function(){
		$(".menu-left.baby ul").slideToggle("slow");
		$(".main-all2").toggleClass("active");
		$(".main-all2").siblings(".main-all2").removeClass("active");
		return false;
	}); 
	
	$(".main-all2-baby-2, #baby-2, ").click(function(){
		$(".menu-left.baby-2 ul").slideToggle("slow");
		$(".main-all2-baby-2").toggleClass("active");
		$(".main-all2-baby-2").siblings(".main-all2-baby-2").removeClass("active");
		return false;
	}); 


	$(".main-all3, #gifts").click(function(){
		$(".menu-left.gifts ul").slideToggle("slow");
		$(".main-all3").toggleClass("active");
		$(".main-all3").siblings(".main-all3").removeClass("active");
		return false;
	}); 


	
});



$(document).ready(function(){

    $(".slidingDiv").hide();
    $(".show_hide").show(); 
    $(".show_hide a").click(function(){
    $(".slidingDiv").slideToggle();
    return false;
    });


    $(".slidingText").hide();
    $(".show_text").show(); 
    $(".show_text a").click(function(){
    $(".slidingText").slideToggle();
    //return false;
    });

	$(".slidingSearch").hide();
    $(".show_search").show(); 
    $(".show_search a").click(function(){
    $(".slidingSearch").slideToggle();
    return false;
    });

    $(".slidingVisual").hide();
/*	
    //$("#hidedrapport").hide();
	
    $(".show_visual").show(); 
    $(".show_visual a").click(function(){
		$(".slidingVisual").show();
		//$("#hidedrapport").show();
		//window.scrollBy(0,1200);		
		return false;
    });
*/


$(function() {
  $("#material").change(function() {
    if ($("#flizelin").is(":selected")) {
      $(".select_tov").show();
    } else {
      $(".select_tov").hide();
    }
  }).trigger('change');
});


$(function() {
  $("#show-rapport").click(function() {
		$(".slidingVisual").slideToggle();
	})
});





$(function() {
  $("#rapport").change(function() {
var rapport = $("#rapport option:selected").val();
//console.log (rapport);
//$(".slidingVisual").show();
$('#rapport-size').css( "background-size", rapport );
$('.im-product-modal').css( "background-size", rapport );

//--------------------------
//$('body').scrollTo( $("#interior-design-wall"), 800, {offset: -20});
//--------------------------

//  }).trigger('change');
  });
});


	$(function() {
		  $("#hidedrapport").click(function() {
						//$(".slidingVisual").show();
		})
	});


	$( ".main-star" ).click(function() {
		var id=$(this).attr('id');
		 for(i=0;i<5;i++) {
		 $('#deferred').fadeTo('fast', 0.1).fadeTo('fast', 1.0);
		  }
	});
	
});


$(window).load(function() {
  $('.main-slide').flexslider({
    animation: "slide",
    slideshow: true
  });
});
$(window).load(function() {
  $('.slide-main').flexslider({
    animation: "slide",
    slideshow: false
  });
});

$(document).ready(function() {
    //$("select").selectBox();
    $("#amount").selectBox();
    $("#material").selectBox();
    //$("#rapport").selectBox();

$('select[name=limit]').selectBox();

});


$(document).ready(
	function()
	{

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
		
//------------------------------- форма авторизации virtuemart
//$(".guest").clone().appendTo("#form-auth");
//$("#form-auth").find("a").hide();

		$("#user-menu").hide();
		$("#user-area-toggle").click(
			function()
			{
				$('#user-menu').toggle();
			}
		);

		$("#form-auth").hide();
		//----------------------------------- fix
		if (jQuery.browser.msie)
		{
			var version = $.browser.version;
		}
		if ( version == "7.0")
		{
			$("#form-auth").show();
			$("#form-auth").width(205);
			$("#form-auth").height(250);
			$(".backet").css("top","120px");
//index.php?option=com_login

		}
		//-----------------------------------
		$(".create-acc-link").hide();
		$('#auth').click(
			function()
			{
				$('#form-auth').toggle();
			}
		);

		//--------------------------
		$( "#mod_search_searchword" ).on( "keydown", 
				function(event) 
				{ 
					if	(event.which == 13) 
					{
//console.log("Entered!"); 
						$("#form-search").submit();
					}
				}
		);
		//--------------------------
		$( "#search_searchword" ).on( "keydown", 
				function(event) 
				{ 
					if	(event.which == 13) 
					{
						$("#form-search2-submit").click();
					}
				}
		);

		//-------------------------
		//$("#searchphraseany").removeAttr("checked");
		//$("#searchphraseall").attr("checked","checked");
		
	}
);//end ready
