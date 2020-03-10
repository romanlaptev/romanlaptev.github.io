 <!DOCTYPE html>
<html>
<head>
	<title><?php echo $config["site_name"] ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8"/>
	<script src="https://code.jquery.com/jquery-latest.js"></script>	

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">	
<!--
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>	
-->

<!--
<script src="https://raw.githubusercontent.com/ganeshmax/jcarousellite/master/jquery.jcarousellite.js"></script>	
-->
<script>
//http://www.webmasters.by/articles/web-programming/3427-creating-a-slider-using-bootstrap.html
/*
$('.carousel').carousel({
  interval: 2000,
  pause: 'hover',
  wrap: true
});
*/

/*
$(function() {
    $(".jcarousellite").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
	visible: 4,
    speed: 1000,
// auto: 1800,
    });
});
*/

</script>

<!-- http://th3silverlining.com/2010/04/15/pajination-a-jquery-pagination-plugin/ -->
<!--
<script src="https://raw.githubusercontent.com/wesnolte/Pajinate/master/jquery.pajinate.js"></script>	
-->
<script src="js/jquery.pajinate.js"></script>	
<script>
$(document).ready(function(){
        $('#paging_container').pajinate({
                items_per_page : 6,
                num_page_links_to_display : 10,
                start_page : 0,
                item_container_id : '.comment-page',
                nav_panel_id : '.page_navigation',
                nav_label_prev : 'prev',
                nav_label_next : 'next',
               wrap_around: true,
               show_first_last: true,
		//show_first_last:false,
		//show_paginate_if_one:false
        });
});
</script>


<style>
.list-main-category .col-md-offset-2 {
  margin-left: 14%;
}

img {
  padding: 10px;
}
</style>
</head>

<body>

<div class="container">
	<h1 class="text-center"><?php echo $config["site_name"] ?></h1>

	<div class="row list-main-category">
		<div class="col-md-offset-2 col-md-9" id="paging_container">
			<div class="comment-page row">
<?php
if ( !empty($params) )
{
	$item_tpl="
	<div class='col-sm-6 col-md-4'>
		<div class='thumbnail'>
<a href='?tid=#TID'>
<img src='http://site-content/site-content/albums/termin_images/imagecache/category_pictures/#IMG-FILENAME'>
</a>
			<div class='caption'>
<a href='?tid=#TID'>
				<p class='text-center'>#NAME</p>
</a>
			</div>
		</div><!-- end thumbnail -->
	</div>
";
	foreach ($params as $item)
	{
		$html = str_replace( "#NAME", $item["name"], $item_tpl );
		$html = str_replace( "#TID", $item["tid"], $html );
		$html = str_replace( "#IMG-FILENAME", $item["description"], $html );
		echo $html;
	}
}

?>
			</div>
			 <div class="page_navigation row"></div>

		</div>
	</div>
<!--
	<div class="row">
		<div class="col-md-10 jcarousellite">
			<ul>
		<?php
		if ( !empty($params) )
		{
			$img_path = "http://site-content/site-content/albums/termin_images/imagecache/category_pictures";
			$item_tpl="
			<li>
				<img src='#IMG_PATH/#IMG_FILENAME'>
				<span class='carousel-caption'>#NAME</span>
			</li>";
			foreach ($params as $key=>$item)
			{
				$html = str_replace( "#NAME", $item["name"], $item_tpl );
				if ($key > 0)
				{
					$html = str_replace( "#CLASS", "", $html );
				}
				else
				{
					$html = str_replace( "#CLASS", "active", $html );
				}
				$html = str_replace( "#IMG_PATH", $img_path, $html );
				$html = str_replace( "#IMG_FILENAME", $item["description"], $html );
				echo $html;
			}
		}
		?>
			</ul>
			<button class="prev">&laquo;</button>
			<button class="next">&raquo;</button>
		</div>

	</div>
-->
</div><!-- end container -->

</body>
</html>
