$(document).ready(function(){

	$(".fancybox").fancybox({
		helpers : {
			overlay : {
				locked : false
			}
		}
	});

//-------------------------
	$(".shopdecor-wallpapers .filters a, .shopdecor-design-2 .filters a").click(
		function()
		{
			$(".shopdecor-wallpapers .filters a, .shopdecor-design-2 .filters a").removeClass("active");
			$(this).addClass("active");
			
			if ( $(this).attr("id") == "reset-link" )
			{
				$(this).removeClass("active");
			}
			
		}
	);

//--------------------------- перезаписать значение цены/кол-ва в корзине
	var amount = $('#s-amount').text();
	$('#d-amount').text(amount);
	//$('#deferred').text(amount);

	var total = $('#s-total').text();
	$('#d-total').text(total);

	var basket_link = $('#j-basket a').attr('href');
	$('#go-basket-btn').attr('href',basket_link);

	$(".favorite-products-link").click(
		function()
		{
			var amount = $('#s-amount').text();
			var total = $('#s-total').text();
			$(this).attr("href","index.php?page=list_favorite_products&amount="+amount+"&total="+total+"&option=com_content&task=view&id=25");
		}
	);
//----------------------------------

//Отложенные товары
$( ".main-star" ).click(
	function() 
	{
		$(this).children("span").addClass("no");
		
		var id=$(this).attr('id');
		var product_name = $('#name-'+id).text();
console.log(product_name);		
		var product_url = $('#url-'+id).attr('href');
		var product_img = $('#img-'+id).attr('src');

		$.ajax({
		  type: 'POST',
		  url: '/templates/qdec2/includes/favorite_products.php',
		  data: 'product_id='+id+'&product_name='+product_name+'&product_url='+encodeURIComponent(product_url)+'&product_img='+product_img,
		  success: function(data){
			$('#deferred').text(data);
		  }
		});
	}
);

// //вывести кол-во отложенных товаров
// $.ajax({
  // type: 'POST',
  // url: '/templates/qdec2/includes/favorite_products.php',
  // success: function(data){
	// $('#deferred').text(data);
  // }
// });

//-------------------------- скрыть полный текст описания товара
	var product_short_description = $(".product-short-description").text();
	if (product_short_description.length > 0)
	{
		$(".product-description").hide();
	}
	else
	{
		$(".product-short-description").hide();
		$(".more-desc").hide();
	}
	
	$(".more-desc").click(
		function()
		{
			$(".product-description").toggle();
			//$(".more-desc").hide();
			if ($(".product-description").is(':visible'))
			{
				$(".more-desc").text("скрыть");
			}
			else
			{
				$(".more-desc").text("читать дальше");
			}
			return false;
		}
	);
//-------------------------
	$(".more_v").hide();
	
	$(".collapsible a").click(
		function()
		{
			$(".more_v").toggle();
			if ($(".more_v").is(':visible'))
			{
				$(".collapsible a").text("Скрыть");
			}
			else
			{
				$(".collapsible a").text("Читать полностью...");
			}
			return false;
		}
	);
//-------------------------
	if ($('.show_text a').length>0)
	{
		var correct = $('.show_text a').attr('href');
		correct = correct.replace("http://qdec.loc","");
		$('.show_text a').attr('href',correct);
	}

	if ($('.more_v').length>0)
	{
		var correct = $('.more_v img').attr('src');
		correct = correct.replace("http://qdec.loc","");
		$('.more_v img').attr('src',correct);
	}
	
//-------------------------
	// $(".scroll-to").on("click", function(){
		// $('body').scrollTo( $(this).attr("href"), 800, {offset: 0});
		// return false;
	// });

//-------------------------
   	$("#shop-search").on("submit", 
		function()
		{
			if($("#keyword").val()=="")
			{
				return false;
			}
		}
	);
//-------------------------
	
	}
);//end ready
