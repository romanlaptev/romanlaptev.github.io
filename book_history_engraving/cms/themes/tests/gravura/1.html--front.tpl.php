<!DOCTYPE html>
<!--[if lt IE 7]><html class="ie9 ie8 ie7 ie6" lang="<?php print $language->language; ?>"><![endif]-->
<!--[if IE 7]><html class="ie9 ie8 ie7" lang="<?php print $language->language; ?>"><![endif]-->
<!--[if IE 8]><html class="ie9 ie8" lang="<?php print $language->language; ?>"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="<?php print $language->language; ?>"><![endif]-->
<!--[if gt IE 9]><!-->
<html lang="<?php print $language->language; ?>"><!--<![endif]-->


<head profile="<?php print $grddl_profile; ?>">

  <?php //print $head; ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <title><?php print $head_title; ?></title>
  <?php //print $styles; ?>
  <?php //print $scripts; ?>

	<meta name="viewport" content="width=320,initial-scale=1.0"/>

<?php 

global $base_url;
global $theme;
//$theme_path = base_path().drupal_get_path('theme',$theme);
$theme_path = drupal_get_path('theme',$theme);
echo <<<EOF
<link rel="stylesheet" href="$theme_path/style.css">
<link rel="stylesheet" href="$theme_path/css/square-style.css">
<script src="$theme_path/js/jquery-1.9.1.min.js"></script>
<script src="$theme_path/js/jquery.innerfade.js"></script>
<script src="$theme_path/js/main.js"></script>

<script>
	$(function(){
		$('#slides').innerfade({
			//animationtype: 'fade',
			animationtype: 'slide',
			speed: 2000,
			timeout: 3000,
			type: 'sequence',
			containerheight:'340px'
		});
		
	});
</script>

EOF;

?>

</head>

<body>
  <?php //print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

</body>
</html>
