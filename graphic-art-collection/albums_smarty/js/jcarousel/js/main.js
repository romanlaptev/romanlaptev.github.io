$(document).ready(function(){
    $('#menu li').hover(function(){
            $(this).find('ul:first').css({visibility: "visible",display: "none"}).fadeIn(400); // effect 1
            // $(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(400); // effect 2
        },function(){
            $(this).find('ul:first').css({visibility: "hidden"});
        });

	$(".enter_block .btn_enter, .enter_block .close").click(function () {
	  $(this).parents('.enter_block').toggleClass('open_enter');          
	  return false;
	});
	
	$('a.city').click(function(){$('.region_bottom').slideToggle(), $('a.city').toggleClass('cityOn'); return false;});
	
	/* $('#thumbs ul li').click(function(){$('#thumbs ul li').removeClass('active'), $(this).addClass('active'); return false;});*/
	/* $('#thumbs ul li').delegate('img','click', function(){
							$('#largeImage').attr('src',$(this).attr('src').replace('thumb','large'));
							$('#description').html($(this).attr('alt'));
						});*/
	  /*$('.blockSmallImg ul li').click(function(){$('.blockSmallImg ul li').removeClass('active'), $(this).addClass('active'); return false;});*/
	 $('.blockSmallImg a').delegate('img','click', function(){
							$('#bigImage').attr('src',$(this).attr('src').replace('thumb','big'));
							$('#description').html($(this).attr('alt'));
						});
	 $("#ex-one").organicTabs();
	 $("#ex-one2").organicTabs();
	 
	 $('.icon_question').hover(function(){$('.tool_top', this).slideToggle(100); return false;});
	 
	  $('.view_all span').click(function(){$('.box_your_review_open').slideToggle(), $('.view_all span').css({display:'none'}); return false;});
	  
	  $('.icon_take_call').click(function(){$('#form_order_call').slideDown(); return false;});
	  $('.close_order_call').click(function(){$('#form_order_call').slideUp(); return false;});
	  
	  $('.icon_delivery').click(function(){$('#delivery_and_payment').slideDown(); return false;});
	  $('.close_payment').click(function(){$('#delivery_and_payment').slideUp(); return false;});
	  
	  $('.view_all.more').click(function(){$('.nav li a').removeClass('current'), $('.nav li.more2 a').addClass('current'), $('#description1').css({display:'none'}), $('#description3').css({display:'none'}), $('#description4').css({display:'none'}); $('#description2').css({display:'block', height:'auto'}); return false;});
	 
	  $('.more_filter').live("click",(function(){$('.box_produce').animate({height: 320}, 500), $('.more_filter').css({display:'none'}), $('.more_filter_close').css({display:'block'}); return false;}));
	  $('.more_filter_close').live("click",(function(){$('.box_produce').animate({height: 172}, 500), $('.more_filter_close').css({display:'none'}), $('.more_filter').css({display:'block'}); return false;}));
	
		$('.row_history_order').click(function(){$('.open_block_history', this).slideToggle(500), $('.markerOff', this).toggleClass('markerOn'); return false;});
});

jQuery(document).ready(function() {
		
		jQuery('#carousel_pop').jcarousel({
			wrap: 'circular',
			scroll: 1
		});
		jQuery('#carousel').jcarousel({
			wrap: 'circular',
			scroll: 1
		});
		jQuery('#photo_product').jcarousel({
			wrap: 'circular',
			scroll: 1
		});
		jQuery('#slider_top').jcarousel({
			wrap: 'circular',
			scroll: 1
		});
		jQuery('#contact_gallery').jcarousel({
			wrap: 'circular',
			scroll: 1
		});
		
		jQuery('#other_products').jcarousel({
			vertical: true,
			wrap: 'circular',
			scroll: 1
		});
		jQuery('#carusel_video').jcarousel({
			vertical: true,
			wrap: 'circular',
			scroll: 1
		});

	});



