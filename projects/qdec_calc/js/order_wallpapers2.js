var min_w = 90;
var min_h = 90;

var max_w = 1500;
var max_h = 1500;
//var max_w = 450;
//var max_h = 350;


//var init_w = 300;
//var init_h = 250;

var init_roll_width = 90;

var action = "";
var rest_left = 0;


$(window).load(
    function() 
	{
	//----------------------- определить размеры изображения товара
		img_w = $("#target").width();
//console.log ("img_w = " + img_w);
		img_h = $("#target").height();
//console.log('img_h = ' + img_h);
		img_src = $("#target").attr("src");

		if ( $("#target").width() == 0)//если нет изображения обоев
		{
			img_w = '568';
			img_h = '320';
		}
		
		$('.im-product').width(img_w);
		$('.im-product').height(img_h);
		$('.im-product').css("background-image","url('" + img_src + "')");

		var flypage = $("input[name=flypage]").val();
		if ( flypage =="shopdecor-wallpapers" ||
			flypage == "shopdecor-design-2" )
		{
			set_guides_mod();
			//-------------- записать длину и ширину в поля для сабмита формы
			$('input[name=w_cm]').val( init_w );
			$('input[name=h_cm]').val( init_h );
			$("#decor_dynamic_size_field").val( init_w + "x" + init_h );
		}
		
		if ( flypage == "shopdecor-design" )
		{
			$(".shopdecor-design #target").hide();

			// установить нач. значение ширины
			var roll_width = $('#material option:selected').val();
			roll_width_cm = roll_width * 100; //перевести ширину обоев в см
			init_w = roll_width_cm;
			init_h = roll_width_cm;
			$( "#amount" ).val( init_w );
			$( "#slider-range" ).slider( "value",init_w );
			$( "#amount-ui" ).val( init_h );
			$( "#slider-ui" ).slider( "value",init_h );
			//-------------- записать длину и ширину в поля для сабмита формы
			$('input[name=w_cm]').val( init_w );
			$('input[name=h_cm]').val( init_h );
			$("#decor_dynamic_size_field").val( init_w + "x" + init_h );
			
			//$(".im-product").css("background-size", img_w + "px") ;
			set_guides_design();

		}

    }
);// end window.load

$(function() {
	//-----------------------
		var flypage = $("input[name=flypage]").val();
		if ( flypage =="shopdecor-wallpapers")
		{
			max_w = 450;
			max_h = 350;
		}
		
//-------------- записать длину и ширину в поля для сабмита формы и вычисления предв. стоимости
	if ( flypage == "shopdecor-design" )
	{
		// установить нач. значение ширины
		var roll_width = $('#material option:selected').val();
		roll_width_cm = roll_width * 100; //перевести ширину обоев в см
		init_w = roll_width_cm;
		init_h = roll_width_cm;

		$('input[name=w_cm]').val( init_w );
		$('input[name=h_cm]').val( init_h );
		$("#decor_dynamic_size_field").val( init_w + "x" + init_h );
	}
	else
	{
		$('input[name=w_cm]').val( init_w );
		$('input[name=h_cm]').val( init_h );
		$("#decor_dynamic_size_field").val( init_w + "x" + init_h );
	}
	
	var num_roll = init_w / init_roll_width; 
	$("input[name=num_roll]").val( Math.ceil( num_roll) );

	calc_order_price();
//--------------------------------------
	$("input[name=color]").val( $("#ColorsArray img:first").attr('title') );

	$("#slider-range").slider({
	  range: "min",
	  min: min_w,
	  max: max_w,
	  value: init_w,
	  slide: function( event, ui ) {
	  
		//prev_w_cm = $( "#amount" ).val();
//console.log("prev_w_cm = " + prev_w_cm);		
		$( "#amount" ).val( "" + ui.value );
		
//-------------- записать длину и ширину в поля для сабмита формы
		var w = $( "#amount" ).val();
		var h = $( "#amount-ui" ).val();

		var flypage = $("input[name=flypage]").val();
//console.log(flypage);		
		if ( flypage =="shopdecor-wallpapers" ||
			flypage == "shopdecor-design-2" )
		{
			set_guides_mod();//установить направляющие
			$('input[name=w_cm]').val( w );
			$('input[name=h_cm]').val( h );
			$("#decor_dynamic_size_field").val( w + "x" + h );
		}
		
		if ( flypage == "shopdecor-design" )
		{
			set_guides_design();//установить направляющие
			$('input[name=w_cm]').val( w );
			$('input[name=h_cm]').val( h );
			$("#decor_dynamic_size_field").val( w + "x" + h );
		}
		
		calc_order_price();
		
	  }
	});
	
	$( "#amount" ).val( "" + $( "#slider-range" ).slider( "value" ));

	$("#slider-ui").slider({
	  range: "min",
	  min: min_h,
	  max: max_h,
	  value: init_h,
	  slide: function( event, ui ) {
		$( "#amount-ui" ).val( "" + ui.value );
//-------------- записать длину и ширину в поля для сабмита формы
		var w = $( "#amount" ).val();
		var h = $( "#amount-ui" ).val();

		var flypage = $("input[name=flypage]").val();
//console.log(flypage);		
		if ( flypage =="shopdecor-wallpapers" ||
			flypage == "shopdecor-design-2" )
		{
			set_guides_mod();//установить направляющие
			$('input[name=w_cm]').val( w );
			$('input[name=h_cm]').val( h );
			$("#decor_dynamic_size_field").val( w + "x" + h );
			
		}
		if ( flypage == "shopdecor-design" )
		{
			set_guides_design();//установить направляющие
			$('input[name=w_cm]').val( w );
			$('input[name=h_cm]').val( h );
			$("#decor_dynamic_size_field").val( w + "x" + h );
			
		}
//----------------------------------------------
		calc_order_price();

	  }
	});
	$( "#amount-ui" ).val( "" + $( "#slider-ui" ).slider( "value" ));
});

$(document).ready(
function()
{
//----------------------- http://fancyapps.com/fancybox/#docs
	$(".fancybox").fancybox({
//onCancel:	function() {console.log('.fancybox onCancel')}, //Called after user triggers canceling. 
			beforeLoad:	function() { //Called before starting to load content. 
//console.log('.fancybox beforeLoad');
			},
			afterLoad:	function() { //Called after content is loaded. 
//console.log('.fancybox afterLoad');
			},
//beforeShow:	function() {console.log('.fancybox beforeShow')}, //Called right before open animations has started
			afterShow:	function() {  //Called after open animations has ended
//console.log('.fancybox afterShow');
				$(".fancybox-image").attr('id','fancybox-image-id');
				if($("#target").width() > 0)
				{
					var texture_src = $("input[name=texture_src]").val();
					if (texture_src !='')
					{
						var texture_code = "<div id='product-texture_modal'></div>";				
						$(texture_code).insertAfter(".fancybox-inner .fancybox-image");
						
						$("#product-texture_modal").css("background-image",texture_src);
						var img_hh = $(".fancybox-inner").height();
						$("#product-texture_modal").css('height',img_hh+'px');
						$("#product-texture_modal").css('position','relative');
						$("#product-texture_modal").css('top','-'+img_hh+'px');
						
						$(".select_tov").clone(true).appendTo(".fancybox-inner").addClass("select-tov-modal");
						$(".modal-save-image-btn").show();
//---------------------------------
						var texture_name = $("input[name=texture]").val();
						$(".select_tov .item_block .item").each(
							function()
							{
								var test_texture_name = $(this).attr("title");
								if ( test_texture_name == texture_name)
								{
									$(this).children(".textur").addClass("active");
								}
							}
						);
//-------------------------------						
					}
					
					if ($("input[name=desaturate_check]").length>0)					
					{
						if ($("input[name=desaturate_check]").val() != "")
						{
							//$(".fancybox-image").attr('id','fancybox-image-id');
							//var img_obj=document.getElementById('fancybox-image-id');
							//alert (img_obj.outerHTML);
							filter_desaturate2();
						}
					}
					
					if ($("input[name=sepia_check]").length>0)					
					{
//console.log("product-texture_modal, sepia_check");					
						if ($("input[name=sepia_check]").val() != "")
						{
							//$(".fancybox-image").attr('id','fancybox-image-id');
							filter_sepia2();
							//-----------------------------------
							if (jQuery.browser.msie)
							{
								var version = $.browser.version;
								if ( version == "8.0")
								{
									var filename_src = $("#large-img").attr("href");
									view_filters_ie8(filename_src,"#fancybox-image-id");
								}
							}
							//-----------------------------------
							
						}
					}
					
					if ($("input[name=transform_check]").length>0)					
					{
						if ($("input[name=transform_check]").val() != "")
						{
							$(".fancybox-image").attr('id','fancybox-image-id');
							$("#fancybox-image-id").addClass('transform-class');
						}
					}
					
				}//------------------ end if				
			},
			beforeClose:	function() {//Called right after closing has been triggered but not yet started 
//console.log('.fancybox beforeClose');

				var flypage = $("input[name=flypage]").val();
				if ( flypage =="shopdecor-design" ||
					flypage == "shopdecor-design-2" )
				{
					if ( $("#fancybox-image-id").attr("src") ) 
					{
						var crop_flag=0;
						if ($('.jcrop-holder').is(':visible'))
						{
							var x = parseInt( $(".jcrop-holder div:first").css("left") );
							var y = parseInt( $(".jcrop-holder div:first").css("top") );
							var w = parseInt( $(".jcrop-holder div:first").css("width") );
							var h = parseInt( $(".jcrop-holder div:first").css("height") );
							$('#target').Jcrop({
							},function(){
								jcrop_api = this;
							});
							jcrop_api.destroy();
							crop_flag=1;
						}
					
						//---------------------------
						var new_src = $("#fancybox-image-id").attr("src");
//console.log( new_src.length );
						$("#large-img").attr("href", new_src);
						var new_src = new_src.replace("water","pre_320");
						$("#target").attr("src", new_src);
						
						if (crop_flag==1)
						{
							initJcrop_mod_ext(x,y,w,h);
						}
						
						if ( flypage == "shopdecor-design" )
						{
							$(".im-product").css("background-image","url( '" + new_src + "' )");
						}
					}
					
					//----------------------------------------------------------
					if ( flypage == "shopdecor-design" )
					{
						if ( $('#product-texture').is(":visible") )
						{
							var w = $(".im-product").width();
							var h = $(".im-product").height();
							$('#product-texture').width(w);
							$('#product-texture').height(h);
							
							$("#zoom-link").show();
						}
					}

				}//---------------- end if
				
			}, 
			afterClose:	function() { //Called after closing animation has ended
//console.log('.fancybox afterClose');
				$(".modal-save-image-btn").hide();
				
				//-------------------							
				if ( $('#product-texture').is(":visible") )
				{
					//$("#large-img .jcrop-holder div:first").css("z-index","1600");
					//$("#large-img .jcrop-holder div:first img").hide();
				}
				
			}, 
//onUpdate:	function() {console.log('.fancybox onUpdate')}, //Called after window resize, scroll or orientation change events are triggered
//onPlayStart:	function() {console.log('.fancybox onPlayStart')}, //Called after slideshdow has started
//onPlayEnd:	function() {console.log('.fancybox onPlayEnd')} //Called after slideshdow has stoped
		    helpers : {
				overlay : {
					locked : false
				}
		    }
	});

//-----------------------
	$('.color-main a').click(
		function()
		{
			return false;
		}
	);

	$('.color-main img').click(
		function()
		{
			$(".error-load-img").hide();
			var target_src = $('#target').attr('src');
			var path = target_src.substring(0,target_src.lastIndexOf('/')+1);
//console.log('path = ' + path);		
			
			var thumb_src = $(this).attr('src');
			var filename = thumb_src.substring(thumb_src.lastIndexOf('/')+1,thumb_src.length);
			var filename = filename.replace('_320.jpg','.jpg');
//console.log('filename = ' + filename);		

			var new_src = path + filename;
			
			var flypage = $("input[name=flypage]").val();
			
			if ( flypage =="shopdecor-wallpapers" ||
				flypage == "shopdecor-design-2" )
			{
				$('#target').attr('src',new_src);
			}
			
			if ( flypage == "shopdecor-design" )
			{
				$(".im-product").css("background-image","url( '" + new_src + "' )");
			}

//--------------------записать номер выбранного цвета в поле заказа
			$("input[name=color]").val( $(this).attr('title') );
			
			if ($('.jcrop-holder').is(':visible'))
			{
				var x = parseInt( $(".jcrop-holder div:first").css("left") );
				var y = parseInt( $(".jcrop-holder div:first").css("top") );
				var w = parseInt( $(".jcrop-holder div:first").css("width") );
				var h = parseInt( $(".jcrop-holder div:first").css("height") );
				jcrop_api.destroy();
				//jcrop_api.setImage(new_src);
				initJcrop_mod_ext(x,y,w,h);
			}
			$('#target').removeClass('transform-class');

			//сменить картинку в блоке "Посмотреть эти обои в интерьере"
			$("#interior-wall").attr("src",new_src);
			$("#rapport-size").css("background-image","url('"+new_src+"')");
			
			if ($('#target').hasClass('transform-class'))
			{
				$("#interior-wall").addClass('transform-class');
			}
			else
				$("#interior-wall").removeClass('transform-class');
			//сменить картинку в блоке текстур
			$(".select_tov .textur1").css("background-image","url("+new_src+")");

			//сменить ссылку на большую картинку при клике
			var large_src = new_src.replace('pre_320','water');
			$('#large-img').attr('href',large_src);

			//--------------------------
			var new_sku = filename.replace('.jpg','');
			$(".product_sku").text(new_sku);
		}
	);

	$("#flip_horizontal").click(
		function()
		{
			if ($('.jcrop-holder').is(':visible'))
			{
				$('.jcrop-holder img').toggleClass('transform-class');
				//$(".jcrop-holder div:first").toggleClass('transform-class');

			}
			$('#target').toggleClass('transform-class');

			if ( $('#target').hasClass('transform-class') || 
				$('.jcrop-holder div img').hasClass('transform-class') )
			{
				$("#interior-wall").addClass('transform-class');
				$("input[name=transform]").val("Отражение по горизонтали: есть");
				$("input[name=transform_check]").val("1");
				$("#flip_horizontal").addClass("active");
			}
			else
			{
				$("#interior-wall").removeClass('transform-class');
				$("input[name=transform]").val("Отражение по горизонтали: нет");
				$("input[name=transform_check]").val("");
				$("#flip_horizontal").removeClass("active");
			}

			//-----------------------------------
			if (jQuery.browser.msie)
			{
				var version = $.browser.version;
				if ( version == "8.0")
				{
					if ($('.jcrop-holder').is(':visible'))
					{
						var x = parseInt( $(".jcrop-holder div:first").css("left") );
						var y = parseInt( $(".jcrop-holder div:first").css("top") );
						var w = parseInt( $(".jcrop-holder div:first").css("width") );
						var h = parseInt( $(".jcrop-holder div:first").css("height") );
						jcrop_api.destroy();
						crop_flag=1;
					}
					
					var filename_src = $("#large-img").attr("href");
					filename_src = filename_src.replace("water","pre_320");
					view_filters_ie8(filename_src,"#target");
					
					if (crop_flag==1)
					{
						initJcrop_mod_ext(x,y,w,h);
					}
				}
			}
			//-----------------------------------

			if ( $("input[name=sepia_check]").val()==1 )
			{
				$("#sepia-link").addClass("active");
			}
			
			if ( $("input[name=desaturate_check]").val()==1 )
			{
				$("#desaturate-link").addClass("active");
			}

			return false;
		}
	);

	$("#left-right").click(
		function()
		{
			$("#guides-block").removeClass("transform-class");
			$("input[name=direction_check]").val("1");
			$("input[name=direction_text]").val("Как клеим: слева направо");
			//-----------------------------------
			if (jQuery.browser.msie)
			{
				var version = $.browser.version;
				if ( version == "8.0")
				{
					set_guides_ie8();
				}
			}
			//-----------------------------------
		}
	);
	
	$("#right-left").click(
		function()
		{
			$("#guides-block").addClass("transform-class");
			$("input[name=direction_check]").val("2");
			$("input[name=direction_text]").val("Как клеим: справа налево");
			
			//-----------------------------------
			if (jQuery.browser.msie)
			{
				var version = $.browser.version;
				if ( version == "8.0")
				{
					set_guides_ie8();
				}
			}
			//-----------------------------------
			
		}
	);
	
	$('.interior-pics a').click(
		//сменить картинку интерьера в блоке "Посмотреть эти обои в интерьере"
		function()
		{
			var bg = $(this).find('img').attr('src');
//console.log(bg);
			var filename = bg.substring(bg.lastIndexOf('/')+1,bg.length);
console.log(filename);
			//var new_bg = "files/images/production/x_interior/530_376/" + filename;
			var new_bg = "images/530_376_" + filename;
			
			$("#interior").css("background-image","url("+ new_bg +")");
			$("#interior-design-wall").css("background-image","url("+ new_bg +")");
			
			// для дизайнерских обоев, выравнивание фрагмента по центру интерьера
			var flypage = $("input[name=flypage]").val();
			if ( flypage == "shopdecor-design" )
			{
//console.log("rest_w = " + window.rest_w);				
				$(".im-product-modal").width(rest_w);//correct
				$(".im-product-modal .product-texture-modal").width(rest_w);
				$(".im-product-modal").css("left","");
				switch (filename)
				{
					case "g2.png":
						//$(".im-product-modal").width(530);//correct
						//$(".im-product-modal .product-texture-modal").width(530);
					break;
					
					case "g3.png":
						//$(".im-product-modal").width(530);
						//$(".im-product-modal .product-texture-modal").width(530);
					break;

					case "g4.png":
						//$(".im-product-modal").width(530);
						//$(".im-product-modal .product-texture-modal").width(530);
					break;

					case "g5.png":
						//$(".im-product-modal").width(530);
						//$(".im-product-modal .product-texture-modal").width(530);
					break;

					case "d1.png":
						//$(".im-product-modal").width(445);
						//$(".im-product-modal .product-texture-modal").width(445);
					break;

					case "d3.png":
						//$(".im-product-modal").width(445);
						//$(".im-product-modal .product-texture-modal").width(445);
					break;

					case "s1.png":
						$(".im-product-modal").width(220);
						$(".im-product-modal .product-texture-modal").width(220);
					break;

					case "s2.png":
						$(".im-product-modal").css("left","-50px");
						//$(".im-product-modal").width(445);
						//$(".im-product-modal .product-texture-modal").width(445);
					break;

					case "of1.png":
						$(".im-product-modal").width(285);
						$(".im-product-modal .product-texture-modal").width(285);
					break;

					case "kux1.png":	
						$(".im-product-modal").width(235);
						$(".im-product-modal .product-texture-modal").width(235);
					break;
					
					default:
					break;
				}
				
			}//----------- end if
			
			if ( flypage =="shopdecor-wallpapers" ||
				flypage == "shopdecor-design-2" )
			{
				$(".wrap-interior-img div:first").css("left",rest_left);
				switch (filename)
				{
					case "s1.png":
						var new_left = parseFloat( rest_left ) - 4;
//console.log("new_left = " + new_left);				
						$(".wrap-interior-img div:first").css("left",new_left + "px");
					break;
					
					case "s2.png":
						var new_left = parseFloat( rest_left ) - 57;
						$(".wrap-interior-img div:first").css("left",new_left + "px");
					break;

					case "of1.png":
						var new_left = parseFloat( rest_left ) + 26;
						$(".wrap-interior-img div:first").css("left",new_left + "px");
					break;

					case "kux1.png":	
						var new_left = parseFloat( rest_left ) + 6;
						$(".wrap-interior-img div:first").css("left",new_left + "px");
					break;
					
					default:
					break;
				}
			}//----------- end if
			
			return false;
		}
	);
	
	$(".select_tov .item_block .item").click(//Выбор текстуры
		function()
		{
			$(".choose-texture").show();
//----------------------------------- наложить текстуру на главное изображение		
			$('#product-texture').show();
			
			var bg = $(this).find('.textur0').attr('style');
//console.log("bg - " + bg);
			var filename = bg.substring(bg.lastIndexOf('/')+1,bg.length);
			filename = filename.replace(");","");
			filename = filename.replace("\"","");
			filename = filename.replace(")","");
//console.log(filename);
			//$("#product-texture").css("background-image","url(files/images/production/x_textures/for_oboi_fotooboi/"+filename+")");
			$("#product-texture").css("background-image","url(images/"+filename+")");
			
			//bg = bg.replace("background:","");
//console.log("bg - " + bg);
			//$("#product-texture").css("background-image",bg);

			var flypage = $("input[name=flypage]").val();
//console.log(flypage);		
			if ( flypage =="shopdecor-wallpapers" ||
				flypage == "shopdecor-design-2" )
			{
				$('#product-texture').width(img_w);
			}
			
			if ( flypage == "shopdecor-design" )
			{
				var w = $(".im-product").width();
				$('#product-texture').width(w);
			}
			
			$('#product-texture').height(img_h);
			
			//$('#product-texture').css("top","-" + (img_h) + "px");
			$('#product-texture').css("top","0");
			
			$('#product-texture').css("margin-bottom","-" + (img_h) + "px");
			
//---------------------------------------- заполнить поля заказа
			var texture_name = $(this).attr('title');
			$("#texture-name").text(texture_name);
			$("input[name=texture]").val(texture_name);
			
			var texture_src = $("#product-texture").css("background-image");
			$("input[name=texture_src]").val(texture_src);
//console.log("input[name=texture_src]" + $("input[name=texture_src]").val());		
			
//---------------------------------------- модальное окно выбора текстуры
			if ( $("#fancybox-image-id").is(":visible") )
			{
				//var new_src = $("#fancybox-image-id").attr("src");
				var new_src = $("#large-img").attr("href");
//console.log( '$("#fancybox-image-id").is(":visible") ' + new_src);
				//$("#large-img").attr("href", new_src);

				var new_src = new_src.replace("water","pre_320");
				$("#target").attr("src", new_src);
			}
//---------------------------			
			$(".select_tov .item_block .item").children(".textur").removeClass("active");
			var texture_active = $(this).children(".textur");
			$(texture_active).addClass("active");
			//var texture_active_index = $(".select_tov .item_block .item .textur").index( texture_active );
//---------------------------			
			
			//$.fancybox.close;
			$("#large-img").click();
			
			return false;
		}
	);
//----------------------------	Сохранение изображения с наложенными фильтрами/текстурами и параметрами ширины/высоты
	$(".save-image-btn").click(
		function()
		{
			save_image_pre();
			return false;
		}
	);
	
	$(".modal-save-image-btn").click(
		function()
		{
			save_image();
			return false;
		}
	);
	
	//-----------------------------------	
	$(".choose-texture").hide();
	
	$(".remove-texture").click(
		function()
		{
			$('#product-texture').hide();
			$('#product-texture_modal').hide();

			$("input[name=texture]").val('');
			$("input[name=texture_src]").val('');
			$("#texture-name").empty();
			$(".choose-texture").hide();

			$(".select_tov .item_block .item").children(".textur").removeClass("active");
			
		}
	);
	
	//--------------------------------------
	$(".jcrop-holder").live("click",function()
		{
//console.log('jcrop-holder click!');					
			return false;
		}
	);
	
	$(".jcrop-holder div:first").live("click",function()
		{
//console.log('jcrop-holder div:first click!');					
			//$("#large-img").click();
			return false;
		}
	);
	
	$('#product-texture').click(
		function()
		{
			//$('.im-product a').click();
			if ( $(".jcrop-holder").is(":visible") )
			{
				//$(".jcrop-holder div:first").css("z-index","1600");
			}
			
		}
	);
	
	$('#desaturate-link').click(
		function()
		{
			var crop_flag=0;
			if ($(".jcrop-holder").is(':visible'))
			{
				var x = parseInt( $(".jcrop-holder div:first").css("left") );
				var y = parseInt( $(".jcrop-holder div:first").css("top") );
				var w = parseInt( $(".jcrop-holder div:first").css("width") );
				var h = parseInt( $(".jcrop-holder div:first").css("height") );
				jcrop_api.destroy();
		
				crop_flag=1;

				//исправление исчезания картинки
				var new_src = $('#large-img').attr('href');
				var new_src = new_src.replace('water','pre_320');
				$('#large-img').html('<img alt="" id="target" src="'+ new_src +'">');
			}
			reset_filters("target");
			filter_desaturate_mod("target");
			
			//$('#target').removeClass('sepia');
			$("input[name=sepia]").val("Сепия: нет");
			$("input[name=sepia_check]").val("");

			//$('#target').addClass('grayscale');
			$("input[name=desaturate]").val("ч/б: есть");
			$("input[name=desaturate_check]").val("1");

			if ( $("input[name=transform_check]").val()==1 )
			{
				$("#flip_horizontal").click();
			}
			//-----------------------------------
			if (jQuery.browser.msie)
			{
				var version = $.browser.version;
				if ( version == "8.0")
				{
					var filename_src = $("#large-img").attr("href");
					filename_src = filename_src.replace("water","pre_320");
					view_filters_ie8(filename_src,"#target");
				}
			}
			//-----------------------------------
			if (crop_flag==1)
			{
				setTimeout (
					function()
					{
						initJcrop_mod_ext(x,y,w+3,h+3);
					},100
				);
			}
		}
	);

	$('#sepia-link').click(
		function()
		{
			var crop_flag=0;
			if ($('.jcrop-holder').is(':visible'))
			{
				var x = parseInt( $(".jcrop-holder div:first").css("left") );
				var y = parseInt( $(".jcrop-holder div:first").css("top") );
				var w = parseInt( $(".jcrop-holder div:first").css("width") );
				var h = parseInt( $(".jcrop-holder div:first").css("height") );
//var selection = jcrop_api.tellSelect();
//alert(selection.x + ', ' + selection.x2 + ', ' + selection.y + ', ' + selection.y2);
				jcrop_api.destroy();

				crop_flag=1;
				
				//исправление исчезания картинки
				var new_src = $('#large-img').attr('href');
				var new_src = new_src.replace('water','pre_320');
				$('#large-img').html('<img alt="" id="target" src="'+ new_src +'">');
			}
			reset_filters("target");
			filter_sepia_mod("target");
		
			//$('#target').removeClass('grayscale');
			$("input[name=desaturate]").val("ч/б: нет");
			$("input[name=desaturate_check]").val("");

			//$('#target').addClass('sepia');
			$("input[name=sepia]").val("Сепия: есть");
			$("input[name=sepia_check]").val("1");

			if ( $("input[name=transform_check]").val()==1 )
			{
				$("#flip_horizontal").click();
			}
			
			//-----------------------------------
			if (jQuery.browser.msie)
			{
				var version = $.browser.version;
				if ( version == "8.0")
				{
//console.log (version);				
					var filename_src = $("#large-img").attr("href");
					filename_src = filename_src.replace("water","pre_320");
					view_filters_ie8(filename_src,"#target");
				}
			}
			
			//-----------------------------------
			var corr_value_px = 3;
			if (crop_flag==1)
			{
				setTimeout (
					function()
					{
						initJcrop_mod_ext(x,y,w + corr_value_px, h + corr_value_px);
					},100
				);
			}
			
		}
	);
	
	$('#reset-link').click(
		function()
		{
			reset_filters("target");
			$('#target').removeClass('sepia');
			$('#target').removeClass('grayscale');
			$('.jcrop-holder div img').removeClass('transform-class');
			$('#target').removeClass('transform-class');
			$("#interior-wall").removeClass('transform-class');
			
			//$('#product-texture').hide();
			if ($('.jcrop-holder').is(':visible'))
			{
				var x = parseInt( $(".jcrop-holder div:first").css("left") );
				var y = parseInt( $(".jcrop-holder div:first").css("top") );
				var w = parseInt( $(".jcrop-holder div:first").css("width") );
				var h = parseInt( $(".jcrop-holder div:first").css("height") );
				jcrop_api.destroy();

				crop_flag=1;

				//исправление исчезания картинки при комбинации фильтр+кадрирование, а затем убрать фильтр
				var new_src = $('#large-img').attr('href');
				var new_src = new_src.replace('water','pre_320');
				$('#large-img').html('<img alt="" id="target" src="'+ new_src +'">');

				$('#guides-block').css("left","0");
			}
			
			if (crop_flag==1)
			{
				setTimeout (
					function()
					{
						initJcrop_mod_ext(x,y,w,h);
					},100
				);
			}
			//set_guides_mod();//установить направляющие

			$("input[name=transform]").val("Отражение по горизонтали: нет");
			$("input[name=transform_check]").val("");

			$("input[name=sepia]").val("Сепия: нет");
			$("input[name=sepia_check]").val("");
			
			$("input[name=desaturate]").val("ч/б: нет");
			$("input[name=desaturate_check]").val("");

			$(".remove-texture").click();
			
		}
	);
	
	$('#material').change(
		function()
		{
			var flypage = $("input[name=flypage]").val();
//console.log(flypage);		
			if ( flypage =="shopdecor-wallpapers" ||
				flypage == "shopdecor-design-2" )
			{
				var roll_width = $('#material option:selected').val();
				roll_width_cm = roll_width * 100; //перевести ширину обоев в см
				$( "#slider-range" ).slider( "option", "min", roll_width_cm );
				$( "#slider-ui" ).slider( "option", "min", roll_width_cm );
				
				//----------------------------
				if ($('.jcrop-holder').is(':visible'))
				{
					var x = parseInt( $(".jcrop-holder div:first").css("left") );
					var y = parseInt( $(".jcrop-holder div:first").css("top") );
					var w = parseInt( $(".jcrop-holder div:first").css("width") );
					var h = parseInt( $(".jcrop-holder div:first").css("height") );
					jcrop_api.destroy();
					
					//исправление исчезания картинки при комбинации фильтр+кадрирование, а затем убрать фильтр
					var new_src = $('#large-img').attr('href');
					var new_src = new_src.replace('water','pre_320');
					$('#large-img').html('<img alt="" id="target" src="'+ new_src +'">');
					$('#guides-block').css("left","0");
				
					setTimeout (
						function()
						{
							initJcrop_mod_ext(x,y,w,h);
						},100
					);
				}
				//----------------------------
				set_guides_mod();//установить направляющие
			}

			if ( flypage == "shopdecor-design" )
			{
				var roll_width = $('#material option:selected').val();
				roll_width_cm = roll_width * 100; //перевести ширину обоев в см
				
				if ( $( "#amount" ).val() < roll_width_cm  && $( "#amount-ui" ).val() < roll_width_cm )
				{
					$( "#amount" ).val( roll_width_cm );
					$( "#slider-range" ).slider( "value", roll_width_cm );
					$( "#slider-range" ).slider( "option", "min", roll_width_cm );
				
					$( "#amount-ui" ).val( roll_width_cm );
					$( "#slider-ui" ).slider( "value", roll_width_cm );
					$( "#slider-ui" ).slider( "option", "min", roll_width_cm );
				}
				//--------------------------------
				img_w = $("#target").width();
				img_h = $("#target").height();
				set_guides_design();
			}
			
			$("input[name=inp_material]").val( $('#material option:selected').text() );

			//если выбран материал, отличный от Обои на флизелиновой основе, убрать текстуру
			if (!$("#flizelin").is(":selected")) 
			{
				$('#product-texture').hide();
				$("input[name=texture]").val("");
				$("input[name=texture_src]").val('');
			}
		}
	);

	
	$('#amount').keyup(
		function(e)
		{
//console.log('code - ' + e.which);
//console.log($('#amount').val());
			action = "keyup";
//-------------- изм. размеры области кадрирования 
			var w = $( "#amount" ).val();
			var h = $( "#amount-ui" ).val();

			$('input[name=w_cm]').val( w );
			$('input[name=h_cm]').val( h );
			$("#decor_dynamic_size_field").val( w + "x" + h );
			
			if (w <= max_w)
			{
				$( "#slider-range" ).slider( "value",w );
			}
			else
			{
				$( "#amount" ).val(""+max_w);
				$( "#slider-range" ).slider( "value", max_w);
				$("input[name=w_cm]").val( max_w );
			}

				//-------------- записать длину и ширину в поля для сабмита формы
			var flypage = $("input[name=flypage]").val();
//console.log(flypage);		
			if ( flypage =="shopdecor-wallpapers" ||
				flypage == "shopdecor-design-2" )
			{
				set_guides_mod();//установить направляющие
			}
			if ( flypage == "shopdecor-design" )
			{
				set_guides_design();//установить направляющие
			}
			
		}
	);
	
	$('#amount-ui').keyup(
		function(e)
		{
			
			action = "keyup";
//-------------- изм. размеры области кадрирования 
			var w = $( "#amount" ).val();
			var h = $( "#amount-ui" ).val();
			var flypage = $("input[name=flypage]").val();
//console.log(flypage);		

			if (h <= max_h)
			{
				$( "#slider-ui" ).slider( "value",h );
	//-------------- записать длину и ширину в поля для сабмита формы
				if ( flypage =="shopdecor-wallpapers" ||
					flypage == "shopdecor-design-2" )
				{
					set_guides_mod();//установить направляющие
					$('input[name=w_cm]').val( w );
					$('input[name=h_cm]').val( h );
					$("#decor_dynamic_size_field").val( w + "x" + h );
					
				}
				if ( flypage == "shopdecor-design" )
				{
					set_guides_design();//установить направляющие
					$('input[name=w_cm]').val( w );
					$('input[name=h_cm]').val( h );
					$("#decor_dynamic_size_field").val( w + "x" + h );
				}
			}
			else
			{
				$( "#amount-ui" ).val("" + max_h);
				$( "#slider-ui" ).slider( "value", max_h);
				$('input[name=h_cm]').val( max_h );
			}
			
		}
	);

	$("form").keypress(function (event) 
	{
		if (event.keyCode == 13) 
		{
			return false;
		}
	});

    	$("#addtocart-decor-wallpapers").on("submit", 
		function()
		{
			var error=false;
			if ($("#no-material").is(":selected")) 
			{
alert( "Пожалуйста, выберите из выпадающего списка материал товара.");	
				error=true;
			}

			if ($("#flizelin").is(":selected")) 
			{
				if ($("input[name=texture]").val()=="") 
				{
alert( "Пожалуйста, выберите текстуру материала.");	
					error=true;
				}
			}

			if (error)
			{
				return false;
			}
			else
			{
//$("#addtocart-decor-wallpapers").submit();
				//получить ссылку для кадрированого фрагмента изображения
				if ( parseInt($('#w').val()) ) 
				{
					get_crop_url();
				}
				
				//------------------------
				var texture_name = $("input[name=texture]").val();
				texture_name = texture_name;
				$("input[name=texture]").val(texture_name);
				
//return false;
			}
		}
	);
//=======================================
    	$("#addtocart-decor-design").on("submit", 
		function()
		{
			var error=false;
			if ($("#no-material").is(":selected")) 
			{
alert( "Пожалуйста, выберите из выпадающего списка материал товара.");	
				error=true;
			}

			if ($("#flizelin").is(":selected")) 
			{
				if ($("input[name=texture]").val()=="") 
				{
alert( "Пожалуйста, выберите текстуру материала.");	
					error=true;
				}
			}

			if (error)
			{
				return false;
			}
			else
			{
//----------------------- сохранить в поля заказа значения ширины и высоты стены
				w = $("#amount").val();
				h = $("#amount-ui").val();
				$('input[name=w_cm]').val( w );
				$('input[name=h_cm]').val( h );
				$("#decor_dynamic_size_field").val( w + "x" + h );
				
//return false;
			}
		}
	);


//--------------------------------------
	$("#rapport").change(
		function()
		{
console.log("change!");
$("input[name=repeat_pattern]").val("Повторить узор по ширине полосы: " + $('#rapport option:selected').text());
		}
	);


//--------------------------------------
	$('#rapport-size').click( 
		function()
		{
			return false;
		}
	);	
	
//--------------------------------------- Посмотреть в интерьере
    $(".show_visual a").click(function(){
		$('.slidingVisual').modal();
		in_interior();
		return false;
    });

	$(".simplemodal-close").click(
		function()
		{
			$(".fancybox-overlay").remove();
		}
	);
	
	//--------------------
	$( "#product-texture" ).live("mousedown",
		function( event ) 
		{
//console.log( "mouse down");
			if ( $("#product-texture").is(":visible") )
			{
				$(".jcrop-holder div:first").css("z-index","1600");
				//---------------- fix ie
				$('.jcrop-holder').css("z-index","1001");
			}
		}
	);
	
	$( "#product-texture" ).live("mouseup",
		function( event ) 
		{
//console.log( "mouse up");
		}
	);


	//$( "#product-texture" ).live("mousemove",
	$( ".jcrop-dragbar" ).live("mousemove",
		function( event ) 
		{
//console.log( "jcrop-dragbar mouse move");
			action = "jcrop-dragbar";
		}
	);


	//--------------------
/*	
	$( ".jcrop-tracker" ).live("click",
		function( event ) 
		{
		}
	);	
*/	
	//--------------------
	$("#ColorsArray a:first").removeClass("fancybox");

	//-----------------------------------
	if (jQuery.browser.msie)
	{
		var version = $.browser.version;
		if ( version == "8.0" || version == "7.0")
		{
			$("#zoom-link").css("background-image","url(images/sm_zoom+.png)"); 
			$("#zoom-link").css("background-repeat","no-repeat"); 
			
			$(".menu-left #active_menu, .menu-info #active_menu").css("background-image","url(images/bg-act.png)"); 
			$(".menu-left #active_menu, .menu-info #active_menu").css("background-repeat","repeat-x"); 
			
			$("#slider-range, #slider-ui").css("background-image","url(images/bg-ui-widget.png)"); 
			$("#slider-range, #slider-ui").css("background-repeat","no-repeat"); 

			$(".b-ug").css("background-repeat","repeat-x"); 
			$(".option.filtr header").css("background-image","url(images/bg-f-opt_fix.png)"); 
			
			$(".guest input[type='submit']").css("background-image","url(images/bg-btn-zk.png)"); 
			setTimeout(function()
				{
					$(".btn-logout").css("background","none"); 
					$(".btn-logout").css("background-color","transparent"); 
					$(".btn-logout").css("background-image","none"); 
					$(".btn-logout").css("filter","none"); 
				}, 200);
			
		}
	}
	//-----------------------------------

	//----------------------------------- fix
	if (jQuery.browser.msie)
	{
		var version = $.browser.version;
		if ( version == "7.0")
		{
		    	//$(".slidingText").show();
			//$(".slidingSearch").show();
    $(".slidingText").slideToggle();
    $(".slidingSearch").slideToggle();

		}
	}
	//-----------------------------------
	
});//---------------------- end ready

function set_guides_mod(x, y, w, h)
{
//console.log("function set_guides_mod (x, y, w, h)");
//console.log("x - " + x);
//console.log("y - " + y);
//console.log("w - " + w);
//console.log("h - " + h);

	if ( $("#target").width() == 0)//если нет изображения обоев
	{
		return;	
	}

	var roll_width = $('#material option:selected').val();
	roll_width = roll_width * 100; //перевести ширину обоев в см

	img_w = $("#target").width();
	img_h = $("#target").height();
	
	//получить px в см
	var a = max_w / img_w;
	var b = img_w / roll_width;

	var c = a / roll_width;
	var d = b / 2;
	var e = d - c;
	var num_px_in_cm = b / e;
//console.log("num_px_in_cm = " + num_px_in_cm);

	//получить размер полосы в px
	var roll_width_px = num_px_in_cm * roll_width;

	//получить кол-во полос
	var wall_width = $("#amount").val();
	var num_roll = wall_width / roll_width; 
	$("input[name=num_roll]").val( Math.ceil( num_roll) );
	
	if (wall_width > max_w)
	{
		wall_width = max_w;
	}
	
	//получить ширину области кадрирования
	var crop_w = roll_width_px * num_roll;

//-----------------------------------------------
	var wall_height = $("#amount-ui").val();
	
	//получить px в см
	var a1 = max_h / img_h;
	var b1 = img_h / roll_width;

	var c1 = a1 / roll_width;
	var d1 = b / 2;
	var e1 = d1 - c1;
	var num_px_in_cm_h = b1 / e1;
//console.log("num_px_in_cm_h = " + num_px_in_cm_h);
	
	//получить высоту в px
	var crop_h = wall_height / num_px_in_cm_h;

	crop_h = crop_h * (num_px_in_cm_h * num_px_in_cm);
//console.log("crop_h = " + crop_h);
	
	var flypage = $("input[name=flypage]").val();
	if ( flypage =="shopdecor-wallpapers" ||
		flypage == "shopdecor-design-2" )
	{
		//if ( !$(".jcrop-holder").is(":visible") )
		//{
//console.error("error!");		
			initJcrop_mod(crop_w, crop_h);
		//}
	}

	var ms=1;
	//-----------------------------------
	if (jQuery.browser.msie)
	{
		var version = $.browser.version;
		if ( version == "8.0")
		{
			ms=200;
		}
	}
	setTimeout (//задержка для IE
		function()
		{
			// расставить направляющие
			var num_guides = Math.floor(wall_width / roll_width);
			
			// исправить k для размещения полос по области кадрирования
			var crop_w = $(".jcrop-holder div:first").width();
//console.log( "crop_w = " + crop_w );
//alert( "crop_w = " + crop_w );
			var k = crop_w / wall_width;

			$('#guides-block').empty();
			var guide = "<div class='guides'></div>";

			for (n1=0; n1 < num_guides; n1++)
			{
				$('#guides-block').append(guide);
			}
			
			var n2=0;
			$('#guides-block .guides').each(
				function()
				{
					n2++;
					var m = (roll_width*n2)*k;
					$(this).css('margin-left',m+'px')
					$(this).css('height',img_h+'px');
					//----------------------
					var test_m = parseFloat( $(this).css("margin-left") );
					var test_w = $(".jcrop-holder div:first").width();
					if ( test_m >  test_w)
					{
		//console.log("error! hide guide line..");			
						$(this).hide();
					}
					//----------------------
				}
			);
			$('#guides-block').css("top","-" + img_h + "px");
			var test_w = $(".jcrop-holder div:first").width();
			$('#guides-block').width(test_w);

		},ms
	);
	
	
}//--------------- end func

function set_guides_design()
{
	if ( $("#target").width() == 0)//если нет изображения обоев
	{
		return;	
	}

	var roll_width = $('#material option:selected').val();
	if (roll_width == 0)
	{
		return;
	}
	roll_width_cm = roll_width * 100; //перевести ширину обоев в см

	//ширина полосы в px
	var roll_width_px = img_w;

	//получить px в см
	var num_px_in_cm = roll_width_px / roll_width_cm;

	var w_cm = parseInt( $( "#amount" ).val() );
	if (w_cm > max_w)
	{
		w_cm = max_w;
	}
	var h_cm = parseInt( $( "#amount-ui" ).val() );

	var w_px = w_cm * num_px_in_cm;
	var h_px = h_cm * num_px_in_cm;
	
	// масштабируем фон
	
	//---------------------
	if ( w_cm >= (roll_width_cm * 2) )
	{
		$(".im-product").css("width",roll_width_px*2 + "px");
		$(".im-product").css("background-size",roll_width_px + "px");
	}

	//---------------------
	//восстановление высоты и ширины блока 
	$(".im-product").css("height", img_h + "px");
	$(".im-product").css("margin-bottom", "");
	if (w_cm == roll_width_cm)
	{
		$(".im-product").css("width", img_w + "px");
	}
		
	//========================================================
	// применить значения масштабирования
	//========================================================
	scale_wallpapers ( w_cm, 
			h_cm, 
			roll_width_cm,
			roll_width_px,
			w_px );
		
	//------------------------------------------------------------------ расставить направляющие
	var img_w2 = $(".im-product").width();
	var img_h2 = $(".im-product").height();
	
	//получить кол-во полос (кол-во направляющих)
	var num_guides = Math.floor(w_cm / roll_width_cm);
	$("input[name=num_roll]").val( Math.ceil( w_cm / roll_width_cm ) );//кол-во полос для сабмита заказа 
	
	var k = img_w2 / w_cm;//ширина полосы в px
	
	$('#guides-block').empty();
	var guide = "<div class='guides'></div>";

	for (n1=0; n1 < num_guides; n1++)
	{
		$('#guides-block').append(guide);
	}

	var n2=0;
	$('#guides-block .guides').each(
		function()
		{
			n2++;
			var m = (roll_width_cm*n2)*k;
			$(this).css('margin-left',m+'px')
			$(this).css('height',img_h+'px');
			//$(this).css('height',img_h2+'px');
		}
	);
	$('#guides-block').css("top","-" + (img_h) + "px");

	//----------------------------------------------------------
	if ( $('#product-texture').is(":visible") )
	{
		var w = $(".im-product").width();
		var h = $(".im-product").height();
		$('#product-texture').width(w);
		$('#product-texture').height(h);
	}
	
}//--------------- end func

function initJcrop_mod(w,h)
{
	$('#target').Jcrop({
			onSelect: select_crop,//Called when selection is completed
			onChange: change_crop,//Called when the selection is moving
			onRelease: release_crop,//Called when the selection is released
			bgFade:     true,
			bgOpacity: 0.5,
			allowSelect:false,
			setSelect: [ 0, 0, w,h ],
			aspectRatio: w / h
	},function(){
		jcrop_api = this;
		//jcrop_api.setOptions({ allowSelect: false });
	});
}

function initJcrop_mod_ext(x,y,w,h)
{
//console.log("x="+x);
//console.log("y="+y);
//console.log("w="+w);
//console.log("h="+h);

	$('#target').Jcrop({
			onSelect: select_crop,//Called when selection is completed
			onChange: change_crop,//Called when the selection is moving
			onRelease: release_crop,//Called when the selection is released
			bgFade:     true,
			bgOpacity: 0.5,
			allowSelect:false,
			setSelect: [ x, y, x+w,y+h ],
			aspectRatio: w / h
	},function(){
		jcrop_api = this;
	});
    //jcrop_api.animateTo([x,y,w,h]);
	
}

function select_crop(c)
{

	//------------------------ new size in cm
	if ( action == "jcrop-dragbar" )//если область кадрирование переместили
	{
//console.log('action - '+ action);
		if ( $('#w').val() )
		{
			var w1_px = $('#w').val();
			var h1_px = $('#h').val();
//console.log("w1_px = " + w1_px);	
//console.log("h1_px = " + h1_px);	

			var w2_px = c.w; 
			var h2_px = c.h;
//console.log("w2_px = " + w2_px);	
//console.log("h2_px = " + h2_px);	

			var w1_cm = $( "#amount" ).val();
			var h1_cm = $( "#amount-ui" ).val();

			var p_w = w2_px / (w1_px / 100);// % изменений по ширине
			var p_h = h2_px / ( h1_px / 100);// % изменений по высоте
//console.log("p_w = " + p_w);	
//console.log("p_h = " + p_h);	
			
			var w2_cm = Math.round( (w1_cm / 100) * p_w );// изменения по ширине в см
			var h2_cm = Math.round( ( h1_cm / 100 ) * p_h );
//console.log("w2_cm = " + w2_cm);	
//console.log("h2_cm = " + h2_cm);	
			
			$( "#amount" ).val( w2_cm );
			$( "#amount-ui" ).val( h2_cm );
			$( "#slider-range" ).slider( "value", w2_cm );			
			$( "#slider-ui" ).slider( "value", h2_cm );
			
			//-------------- записать длину и ширину в поля для сабмита формы
			$('input[name=w_cm]').val( w2_cm );
			$('input[name=h_cm]').val( h2_cm );
			$("#decor_dynamic_size_field").val( w2_cm + "x" + h2_cm );

			//получить кол-во полос
			var roll_width = $('#material option:selected').val();
			roll_width = roll_width * 100; //перевести ширину обоев в см
			var wall_width = $("#amount").val();
			var num_roll = wall_width / roll_width; 
			$("input[name=num_roll]").val( Math.ceil( num_roll) );
			
		}
	}
	
//------------------------------- updateCoords
	$('#x').val(c.x);
	$('#y').val(c.y);
	$('#w').val(c.w);
	$('#h').val(c.h);

//-------------------------------- css fix
	var crop_w = parseInt(c.w);
	$('#guides-block .guides').each(
		function()
		{
			var m = parseInt($(this).css('margin-left'));
			if (m > crop_w)
			{
				$(this).css('display','none');			
			}
			else
			{
				$(this).css('display','block');	
			}
		}
	);
	
	if ( $("#product-texture").is(':visible') )
	{
//console.log('c.y =' + c.y);
		$("#product-texture").css("left",c.x);
		$("#product-texture").css("top",c.y);
		$("#product-texture").css("width",c.w);
		$("#product-texture").css("height",c.h);
		
		//-----------------------
		if ( $(".jcrop-holder div:first").css("z-index") == "1600" )
		{
			$(".jcrop-holder div:first").css("z-index","600");
			//---------------- fix ie
			$('.jcrop-holder').css("z-index","999");
		}
		
	}

	action = "";
	calc_order_price();
	
}//------------------ end func

	function change_crop(c)
	{
//console.log('function change_crop(c), '+ c.x);
//console.log('x1 =' + c.x);
//console.log('y1 =' + c.y);
//console.log('x2 = ' + c.x2);
//console.log('y2 = ' + c.y2);
//console.log('w =' + c.w);
//console.log('h =' + c.h);
		var new_top = img_h - c.y;
//console.log('new_top =' + new_top);
		$('#guides-block').css('top', "-" + new_top +"px");
		$('#guides-block').css('left',c.x);
		$('.guides').css('height',c.h);

//-------------------------------- css fix
		var crop_w = parseInt(c.w);
		$('#guides-block .guides').each(
			function()
			{
				var m = parseInt($(this).css('margin-left'));
				if (m > crop_w)
				{
					$(this).css('display','none');			
				}
				else
				{
					$(this).css('display','block');	
				}
			}
		);

	}//--------------- end func

	function release_crop()
	{
//console.log('Jcrop release!');
		$('#target').Jcrop({},function()
		{
			//jcrop_api = this;
			//jcrop_api.setOptions({ allowSelect: true });
		});

		//$('#reset-link').click();
	}
//-----------------------------

//получить ссылку для кадрированого фрагмента изображения
function get_crop_url()
{
	var crop_url = "files/crop_image/crop.php";

	if ($('.jcrop-holder').is(':visible'))
	{
		var new_src = $('#large-img').attr('href');
		var new_src = new_src.replace('water','pre_320');
		crop_url += "?src=" + new_src;
	}
	else
		crop_url += "?src=" + $("#target").attr("src");

	crop_url += "&x=" + $("#x").val();
	crop_url += "&y=" + $("#y").val();
	crop_url += "&w=" + $("#w").val();
	crop_url += "&h=" + $("#h").val();
	crop_url += "&order_no=";
	$("#crop-url").attr("href", crop_url);

	//$("input[name=inp_crop_url]").val( $("#crop-url-parent").html() );
	$("input[name=inp_crop_url]").val( $("#crop-url").attr('href') );
}


//--------------------------------------- Посмотреть в интерьере
function in_interior()
{
	$("input[name=repeat_pattern]").val("");

	$("body").append("<div class='fancybox-overlay fancybox-overlay-fixed'></div>");
	$(".fancybox-overlay").show();
	
	//-----------------------------------
	if (jQuery.browser.msie)
	{
		var version = $.browser.version;
		if ( version == "8.0" || version == "7.0")
		{
$(".slidingVisual .simplemodal-close").css("background-image","url(images/x.png)"); 
		}
	}
	//-----------------------------------
	
	if ($("input[name=desaturate_check]").length>0)					
	{
		if ($("input[name=desaturate_check]").val() != "")
		{
			filter_desaturate_mod("interior-wall");
		}
	}
	
	if ($("input[name=sepia_check]").length>0)					
	{
		if ($("input[name=sepia_check]").val() != "")
		{
			filter_sepia_mod("interior-wall");
		}
	}
	
	if ($("input[name=transform_check]").length>0)					
	{
		if ($("input[name=transform_check]").val() != "")
		{
			$("#interior-wall").addClass('transform-class');
		}
	}

	if ($('.jcrop-holder').is(':visible'))
	{
		var has_filters = 0;
		if ($("input[name=desaturate_check]").length>0)					
		{
			if ($("input[name=desaturate_check]").val() != "")
			{
				has_filters = 1;
			}
		}
		
		if ($("input[name=sepia_check]").length>0)					
		{
			if ($("input[name=sepia_check]").val() != "")
			{
				has_filters = 1;
			}
		}

//console.log("has filters = " + has_filters);			
		if (has_filters == 1)
		{
			$(".jcrop-holder div:first").clone().appendTo(".wrap-interior-img");

			$(".wrap-interior-img div:first").css("top","0");
			$(".wrap-interior-img div:first").css("left","0");
			$(".wrap-interior-img div:first").css("position","relative");

			$(".wrap-interior-img div:first div:nth-child(2)").remove();
			$(".wrap-interior-img div:first div:first .jcrop-hline").remove();
			$(".wrap-interior-img div:first div:first .jcrop-vline").remove();
			$(".wrap-interior-img div:first div:first .jcrop-tracker").remove();

			$(".wrap-interior-img div:first div:first").append( $("#interior-wall") );
			$("#interior-wall").css("max-width","none");
			
			//$(".wrap-interior-img div:first").css("left","35px");
			$(".wrap-interior-img div:first").css("top","15px");
			
			var box1 = $("#large-img .jcrop-holder  #target").prev();
			var new_top = $(box1).find("div:first").height();
//console.log("new_top = " + new_top);
			var new_top = new_top + 16;
			
			var new_left = $(box1).find("div:nth-child(2)").width();
//console.log("new_left = " + new_left);

			$("#interior-wall").css("position","relative");
			$("#interior-wall").css("left","-"+new_left+"px");
			$("#interior-wall").css("top","-"+new_top+"px");
			
			// ---------------- масштабировать изображение при необходимости
			var crop_w = $(".wrap-interior-img div:first").width();
			var crop_h = $(".wrap-interior-img div:first").height();
			var test_w = $("#interior-wall").width()
			var test_h = $("#interior-wall").height();
			var test_left = parseFloat ( $("#interior-wall").css("left") );
			var test_left = Math.abs( test_left );	
			
			if ( crop_h > 290 )
			{
				// ---------------- масштабировать изображение
				var k = test_w / test_h;
				var new_h = 290;
				var new_w = new_h * k;
				$("#interior-wall").css("width",new_w + "px");
				$("#interior-wall").css("height",new_h + "px");
				
				//----------------- исправить левый отступ
				var k3 = test_w / test_left;
				var new_left = new_w / k3;
				$("#interior-wall").css("left","-" + new_left + "px");

				// ---------------- масштабировать область кадрирования
				var k2 = crop_w / crop_h;
				var new_w = new_h * k2;
				$(".wrap-interior-img div:first").css("width",new_w + "px");
			}
			//---------------------- выравнивание по середине
			var img_w = $(".wrap-interior-img").width();	
			var crop_w = $(".wrap-interior-img div:first").width();	
			var new_margin = Math.abs( (img_w - crop_w) / 2 );	
//console.log("new_margin = " + new_margin);
			var new_margin = new_margin + 5;	
			$(".wrap-interior-img div:first").css("left",new_margin);

		}
		else
		{
			$("#interior-wall").hide();			
			$(".jcrop-holder div:first").clone().appendTo(".wrap-interior-img");
			
			$(".wrap-interior-img div:first").css("top","0");
			$(".wrap-interior-img div:first").css("left","0");
			$(".wrap-interior-img div:first").css("position","relative");
			
			$(".wrap-interior-img div:first div:nth-child(2)").remove();
			$(".wrap-interior-img div:first .jcrop-hline").remove();
			$(".wrap-interior-img div:first .jcrop-vline").remove();
			$(".wrap-interior-img div:first .jcrop-tracker").remove();
			
			//----------------------
			//$(".wrap-interior-img div:first").css("left","5px");
			$(".wrap-interior-img div:first").css("top","15px");
			
			//-----------------------

			var crop_w = $(".wrap-interior-img div:first").width();
			var crop_h = $(".wrap-interior-img div:first").height();
			var test_w = $(".wrap-interior-img img:last").width()
			var test_h = $(".wrap-interior-img img:last").height();
			var test_left = parseFloat ( $(".wrap-interior-img img:last").css("left") );
			var test_left = Math.abs( test_left );	
//console.log("crop_w = " + crop_w);				
//console.log("crop_h = " + crop_h);				
//console.log("test_w = " + test_w);				
//console.log("test_left = " + test_left);				

			if ( crop_h > 290 )
			{
				// ---------------- масштабировать изображение
				var k = test_w / test_h;
				var new_h = 290;
				var new_w = new_h * k;
				$(".wrap-interior-img img:last").css("width",new_w + "px");
				$(".wrap-interior-img img:last").css("height",new_h + "px");

				//----------------- исправить левый отступ
				var k3 = test_w / test_left;
				var new_left = new_w / k3;
				$(".wrap-interior-img img:last").css("left","-" + new_left + "px");
				
				// ---------------- масштабировать область кадрирования
				var k2 = crop_w / crop_h;
				var new_w = new_h * k2;
				$(".wrap-interior-img div:first").css("width",new_w + "px");
			}

			//---------------------- выравнивание по середине
			var img_w = $(".wrap-interior-img").width();	
			var crop_w = $(".wrap-interior-img div:first").width();	
			var new_margin = Math.abs( (img_w - crop_w) / 2 );	
//console.log("new_margin = " + new_margin);
			var new_margin = new_margin + 5;	
			
			$(".wrap-interior-img div:first").css("left",new_margin);
		}//----------- end if
		
	}//----------- end if ( jcrop-holder').is(':visible) )

	var flypage = $("input[name=flypage]").val();
	if ( flypage == "shopdecor-design" )
	{
		in_interior_design();
		//in_interior_design_mod();
	}//----------- end if

	rest_left = $(".wrap-interior-img div:first").css("left");
}//------------------ end func

function in_interior_design()
{
	$("#rapport-size").css("background-image","none");			
	$(".im-product").clone().appendTo("#rapport-size").insertBefore("#interior-design-wall").addClass("im-product-modal");
	var h = $(".im-product-modal").height();
	$(".im-product-modal").css("margin","auto auto -"+h+"px");
	
	$(".im-product-modal #large-img").remove();
	$(".im-product-modal #guides-block").addClass("guides-block-modal");
	$(".im-product-modal .guides-block-modal").removeAttr("id");
	$(".im-product-modal .guides-block-modal").hide();

	$(".im-product-modal #product-texture").addClass("product-texture-modal");
	$(".im-product-modal .product-texture-modal").removeAttr("id");
	$(".product-texture-modal").hide();
	
	var w1 = $("#rapport-size").width();
	var w2 = $(".im-product-modal").width();

	if (w2 > w1) // масштабирование фрагмента обоев, если необходимо
	{
		var s2 = parseFloat ( $(".im-product-modal").css("background-size") );
		var k = w2 / s2;
		var s3 = w1 / k;
//console.log("k = " + k);				
		$(".im-product-modal").width(w1);
		$(".im-product-modal").css("background-size", s3 + "px");
		$(".im-product-modal .product-texture-modal").width(w1);

		//------------------------------------ 
	}
	window.rest_w = $(".im-product-modal").width();
}//------------------- end func

function in_interior_design_mod()
{
	$("#rapport-size").css("background-image","none");			
	$(".im-product").clone().appendTo("#rapport-size").insertBefore("#interior-design-wall").addClass("im-product-modal");
	var h = $(".im-product-modal").height();
	$(".im-product-modal").css("margin","auto auto -"+h+"px");
	
	$(".im-product-modal #large-img").remove();
	$(".im-product-modal #guides-block").addClass("guides-block-modal");
	$(".im-product-modal .guides-block-modal").removeAttr("id");
	$(".im-product-modal .guides-block-modal").hide();

	var interior_img = $("#interior-design-wall").css("background-image");
	interior_img = interior_img.substring( interior_img.lastIndexOf('/')+1, interior_img.length );
	interior_img = interior_img.replace("\"","");
	interior_img = interior_img.replace(")","");

	// масштабирование 
	var w1 = $("#rapport-size").width(); //530
	var w2 = $(".im-product-modal").width(); //640
	var w_cm = 400;
	var num_guides = $(".im-product-modal .guides-block-modal .guides").length;
	
	w_px_in_cm = w1 / w_cm; // 1,325
	roll_width_cm = 90;
	roll_width_px = roll_width_cm * w_px_in_cm; // 119,25
	
	var w_roll = roll_width_px * num_guides;
	var h_roll = roll_width_px;
	var new_scale = roll_width_px;
	var new_margin_top = new_scale;
	
	$(".im-product-modal").width(w_roll);
	$(".im-product-modal").height(h_roll);
	$(".im-product-modal").css("background-size", new_scale + "px");
	$(".im-product-modal").css("margin","auto auto -"+new_margin_top+"px");

}//------------------- end func

// Сохранение изображения с наложенными фильтрами/текстурами и параметрами ширины/высоты
function save_image()
{
//console.log ("function save_image()");
			var filename_src = $("#large-img").attr("href");
			var sepia_check = $("input[name=sepia_check]").val();
			var desaturate_check = $("input[name=desaturate_check]").val();
			var transform_check = $("input[name=transform_check]").val();
			
			var texture_src = $("input[name=texture_src]").val();
			texture_src = texture_src.replace("url","");
			texture_src = texture_src.replace("(","");
			texture_src = texture_src.replace(")","");
			texture_src = texture_src.replace(/"/g,"");
			texture_src = texture_src.replace("http://","");
			texture_src = texture_src.substring(texture_src.indexOf('/')+1, texture_src.length);
			var texture_name = $("input[name=texture]").val();

//--------------- пересчет координат для учета масштабирования изображения (watermark)
			var w_crop = $('#w').val();//147
			
			//очистить стиль мастабированного изображения  для получения реальной ширины и высоты
			$("#fancybox-image-id").removeClass("fancybox-image");
			var w_water = $("#fancybox-image-id").width();//945
			var img_width = $('#target').width();//568
//console.log("img_width = " + img_width);			
			var k_x = w_water / img_width;
			var w = k_x * w_crop;// 244,568661971831
	
			var h_crop = $('#h').val();//105
			var h_water = $("#fancybox-image-id").height();//646
			
			//вернуть стиль масштабированного изображения
			$("#fancybox-image-id").addClass("fancybox-image");
			
			var img_height = $('#target').height();//388
//console.log("img_height = " + img_height);			
			var k_y = h_water / img_height;
			var h = k_y * h_crop;// 174,819587628866
			
//k_x  (945/568)*147 = 244,568661971831
//k_y  (646/388)*105 = 174,819587628866

			var x_crop = $('#x').val();
			var x = x_crop * k_x;

			var y_crop = $('#y').val();
			var y = y_crop * k_y;
			
			var w_cm = $('input[name=w_cm]').val();
			var h_cm = $('input[name=h_cm]').val();
			
//-------------------------------------------------
			var url = '/files/crop_image/crop_filters.php';
			url += '?filename=' + filename_src;
			url += '&sepia=' + sepia_check;
			url += '&desaturate=' + desaturate_check;
			url += '&transform=' + transform_check;
			url += '&texture=' + texture_src;
			url += '&texture_name=' + texture_name;
			url += '&x=' + x;
			url += '&y=' + y;
			url += '&w=' + w;
			url += '&h=' + h;
			url += '&w_cm=' + w_cm;
			url += '&h_cm=' + h_cm;
//console.log(url);

			location.href=url;
}//------------------ end func

//функция без пересчета координат для учета масштабирования изображения
function save_image_pre()
{
	var filename_src = $("#large-img").attr("href");
	filename_src = filename_src.replace("water","pre_320");
	
	var sepia_check = $("input[name=sepia_check]").val();
	var desaturate_check = $("input[name=desaturate_check]").val();
	var transform_check = $("input[name=transform_check]").val();
	
	var texture_src = $("input[name=texture_src]").val();
	texture_src = texture_src.replace("url","");
	texture_src = texture_src.replace("(","");
	texture_src = texture_src.replace(")","");
	texture_src = texture_src.replace(/"/g,"");
	texture_src = texture_src.replace("http://","");
	texture_src = texture_src.substring(texture_src.indexOf('/')+1, texture_src.length);
	var texture_name = $("input[name=texture]").val();
	
	var w = $('#w').val();
	var h = $('#h').val();
	var x = $('#x').val();
	var y = $('#y').val();
	var w_cm = $('input[name=w_cm]').val();
	var h_cm = $('input[name=h_cm]').val();

	var url = '/files/crop_image/crop_filters.php';
	url += '?filename=' + filename_src;
	url += '&sepia=' + sepia_check;
	url += '&desaturate=' + desaturate_check;
	url += '&transform=' + transform_check;
	url += '&texture=' + texture_src;
	url += '&texture_name=' + texture_name;
	url += '&x=' + x;
	url += '&y=' + y;
	url += '&w=' + w;
	url += '&h=' + h;
	url += '&w_cm=' + w_cm;
	url += '&h_cm=' + h_cm;
//console.log(url);

	location.href=url;
}//------------------ end func

function view_filters_ie8(filename_src, id)
{
	//var filename_src = $("#large-img").attr("href");
	//filename_src = filename_src.replace("water","pre_320");
	
	var sepia_check = $("input[name=sepia_check]").val();
	var desaturate_check = $("input[name=desaturate_check]").val();
	var transform_check = $("input[name=transform_check]").val();
	
	var texture_src = $("input[name=texture_src]").val();
	texture_src = texture_src.replace("url","");
	texture_src = texture_src.replace("(","");
	texture_src = texture_src.replace(")","");
	texture_src = texture_src.replace(/"/g,"");
	texture_src = texture_src.replace("http://","");
	texture_src = texture_src.substring(texture_src.indexOf('/')+1, texture_src.length);
	var texture_name = $("input[name=texture]").val();
	
	var w = $('#w').val();
	var h = $('#h').val();
	var x = $('#x').val();
	var y = $('#y').val();
	var w_cm = $('input[name=w_cm]').val();
	var h_cm = $('input[name=h_cm]').val();

	var url = '/files/crop_image/view_filters_ie8.php';
	url += '?filename=' + filename_src;
	url += '&sepia=' + sepia_check;
	url += '&desaturate=' + desaturate_check;
	url += '&transform=' + transform_check;
	url += '&texture=' + texture_src;
	url += '&texture_name=' + texture_name;
//console.log(url);
	//$("#target").attr("src",url);
	$(id).attr("src",url);
}//------------------ end func

function reset_filters(id) {
	Pixastic.revert(document.getElementById(id));
	$('#'+id).removeClass('grayscale');
	$('#'+id).removeClass('sepia');
}

function filter_desaturate2() {
	Pixastic.process( document.getElementById("fancybox-image-id"), "desaturate", {average : false});
}
function filter_desaturate_mod(id) {
	Pixastic.process( document.getElementById(id), "desaturate", {average : false});
}

function filter_sepia2() {
	Pixastic.process(document.getElementById("fancybox-image-id"), "sepia");
}
function filter_sepia_mod(id) {
	Pixastic.process(document.getElementById(id), "sepia");
}

//===============================================================
// масштабируем фон при выборе высоты ширины дизайнерских обоев
// ==============================================================
function scale_wallpapers ( w_cm, 
				h_cm, 
				roll_width_cm,
				roll_width_px,
				w_px )
{
		// масштабирование по x
		scale_wall_x (roll_width_cm, w_cm);

		if ( h_cm >= w_cm )
		{
			if ( h_cm > roll_width_cm )
			{
				var s = h_cm / w_cm;
//console.log("h_cm = " + h_cm);				
//console.log("w_cm = " + w_cm);				
//console.log("s = " + s);				
				//if  ( h_cm >= (w_cm*s) ) //90x180, 180x180
				//{
					// коррекция ширины
					var k2 = h_cm / roll_width_cm;
//console.log("w_px = " + w_px);				
//console.log("k2 = " + k2);				
					var new_width = w_px / k2 ;
					$(".im-product").css("width", new_width + "px");

					// масштабирование по Y
					scale_wall_y (roll_width_cm, h_cm);
				//}
			}
		}//----------- end if



		if ( h_cm < w_cm )
		{
//console.log("h_cm < w_cm");				
			if (w_cm >= (roll_width_cm*5) )//450x180, 540x180
			{
				if (h_cm <= (roll_width_cm*7) )//450x270, 450x360
				{
					// коррекция ширины
					var w_px = $(".im-product").width();
					var new_width = roll_width_px * 2 ;
					$(".im-product").css("width", new_width + "px");

					// масштабирование по x
					scale_wall_x (roll_width_cm, w_cm);
				}

			}


			if (w_cm >= (roll_width_cm*3) )
			{
//console.log("fix w_cm >= (roll_width_cm*3) ");
				//----------------------
				// коррекция высоты

				var h_px = $(".im-product").height();
				var roll_px = parseInt( $(".im-product").css("background-size") );
				var new_height = roll_px * (h_cm / roll_width_cm);

				if ( new_height <= img_h )
				{
					//$(".im-product").css("height", new_height + "px");
				}
				else
				{

					// масштабирование по Y
					scale_wall_y (roll_width_cm, h_cm);

					// коррекция ширины
					var w_px = $(".im-product").width();
					var roll_px = parseInt( $(".im-product").css("background-size") );
					var new_width = roll_px * (w_cm / roll_width_cm);
					$(".im-product").css("width", new_width + "px");

				}

				if ( (img_h - new_height) > 0)
				{
					$(".im-product").css("margin-bottom", (img_h - new_height) + "px");
				}
				//----------------------
			}

			//----------------------
			// коррекция ширины, высоты и масштаба

			var w_px = $(".im-product").width();
			var h_px = $(".im-product").height();

			//---------------------- fix scale 
			var num_roll = w_cm / roll_width_cm;
			var new_scale = w_px / num_roll;
			$(".im-product").css("background-size",new_scale + "px");

			//---------------------- fix height, margin
			var num_roll = h_cm /roll_width_cm;
			var new_height = new_scale * num_roll;
			$(".im-product").css("height",new_height + "px");
			if ( (img_h - new_height) > 0)
			{
				$(".im-product").css("margin-bottom", (img_h - new_height) + "px");
			}

			//----------------------
			
			var w_px = $(".im-product").width();
			var scale = parseInt( $(".im-product").css("background-size") );
			if (w_px > (roll_width_px*2) )
			{
//console.log ("incorrect width!");
				var new_width = roll_width_px*2;
				$(".im-product").css("width", new_width + "px");

				var scale_k = w_px / h_px;
				var n = w_px - new_width;
				var n2 = n / scale_k;
				var new_scale = scale - n2;
				$(".im-product").css("background-size",new_scale + "px");

				var num_roll = h_cm /roll_width_cm;
				var new_height = new_scale * num_roll;
				$(".im-product").css("height",new_height + "px");
				if ( (img_h - new_height) > 0)
				{
					$(".im-product").css("margin-bottom", (img_h - new_height) + "px");
				}
			}

			//----------------------
			
			var h_px = $(".im-product").height();
			var scale = parseInt( $(".im-product").css("background-size") );
			if (h_px > Math.ceil(img_h) )
			{
//console.log ("incorrect height! h_px = "+h_px);

				$(".im-product").css("height",roll_width_px + "px");

				var num_roll_h = h_cm / roll_width_cm;
				var num_roll_w = w_cm / roll_width_cm;
				
				var new_scale = scale / num_roll_h;
				if (new_scale < 95)//??????????????????????
				{
//console.log ("scale < 95");
					//var new_scale = new_scale*2;//??????????????????????
					var new_scale = new_scale*num_roll_h;//??????????????????????
					
				}
								
				$(".im-product").css("background-size",new_scale + "px");

				var num_roll_w = w_cm / roll_width_cm;
				var new_width = new_scale * num_roll_w;
				$(".im-product").css("width", new_width + "px");

			}
			
		}//----------- end if

		
	
} //------------ end func


//=========================
// масштабирование по X
//=========================
function scale_wall_x (roll_width_cm, w_cm)
{
	if ( roll_width_cm == 90)
	{
		var size_cm = [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260, 1350, 1440];
		var scale_px  = [320, 320, 218, 164, 131, 109, 93.2, 81.7, 72.5, 65.3, 59.3, 54.3, 50.3, 46.6, 43.4, 40.7];
	}
	if ( roll_width_cm == 100)
	{
		var size_cm = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
		var scale_px  = [320, 320, 218, 164, 131, 109, 93.2, 81.7, 72.5, 65.3, 59.3, 54.3, 50.3, 46.6, 43.4];
	}
	if ( roll_width_cm == 150)
	{
		var size_cm = [150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500];
		var scale_px  = [320, 320, 218, 164, 131, 109, 93.2, 81.7, 72.5, 65.3];
	}
	
	n2 = size_cm.length;
	for (n1=0; n1 < n2; n1++)
	{
		if  ( w_cm >= size_cm[n1])
		{
			//var repeat = "repeat-x";
			var repeat = "repeat";
			$(".im-product").css("background-repeat",repeat);
			var v = scale_px[n1] ;
			$(".im-product").css("background-size",v + "px");
		}
	}
}//--------- end func

//=========================
// масштабирование по Y
//=========================
function scale_wall_y (roll_width_cm, h_cm)
{
	if ( roll_width_cm == 90)
	{
		var size_y_cm = [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260, 1350, 1440];
		var scale_y_px  = [300, 160, 106, 80, 64, 53, 45.5, 40, 35.5, 32, 27.5, 26, 24, 22, 20, 18];
	}
	if ( roll_width_cm == 100)
	{
		var size_y_cm = [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
		var scale_y_px  = [160, 106, 80, 64, 53, 45.5, 40, 35.5, 32, 27.5, 26, 24, 22, 20];
	}
	if ( roll_width_cm == 150)
	{
		var size_y_cm = [300, 450, 600, 750, 900, 1050, 1200, 1350, 1500];
		var scale_y_px  = [160, 106, 80, 64, 53, 45.5, 40, 35.5];
	}

	n2 = size_y_cm.length;
	for (n1=0; n1 < n2; n1++)
	{
		if  ( h_cm >= size_y_cm[n1])
		{
			//var repeat = "repeat-y";
			var repeat = "repeat";
			$(".im-product").css("background-repeat",repeat);
			var v = scale_y_px[n1] ;
		
			$(".im-product").css("background-size",v + "px "+v+"px ");

		}
	}

}//--------- end func


function set_guides_ie8()
{
	var m = [];
	var n1=0;
	$('#guides-block .guides').each(
		function()
		{
			m[n1] = parseFloat( $(this).css('margin-left') );
			n1++;
		}
	);
//console.log("m= " + m);		

	var m_new = [];
	if ($('.jcrop-holder').is(':visible'))
	{
		var w = $(".jcrop-holder div:first").width();
	}
	else
	{
		var w = $(".im-product").width();
	}
	
	n1=n1-1;
	for (n2=0; n2 < m.length; n2++)
	{
		m_new[n2] = w - m[n1];
		n1=n1-1;
	}
//console.log("m_new= " + m_new);		

	var n1=0;
	$('#guides-block .guides').each(
		function()
		{
			$(this).css("margin-left",m_new[n1]);
			n1++;
		}
	);
}//--------- end func
