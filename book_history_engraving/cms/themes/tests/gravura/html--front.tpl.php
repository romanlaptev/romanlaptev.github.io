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
<link rel="stylesheet" href="$theme_path/css/main.css">
<script src="$theme_path/js/jquery-1.9.1.min.js"></script>
<script src="$theme_path/js/jquery.innerfade.js"></script>
<script src="$theme_path/js/main.js"></script>

<script>
	$(function(){
		$('#slides').innerfade({
			animationtype: 'fade',
			//animationtype: 'slide',
			speed: 2000,
			timeout: 3000,
			type: 'sequence',
			containerheight:'395px'
		});
		
	});
</script>

EOF;

?>

</head>

<body>

<!-- Rating@Mail.ru counter -->
<script type="text/javascript">
var _tmr = _tmr || [];
_tmr.push({id: "2552409", type: "pageView", start: (new Date()).getTime()});
(function (d, w) {
   var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true;
   ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";
   var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
   if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window);
</script><noscript><div style="position:absolute;left:-10000px;">
<img src="//top-fwz1.mail.ru/counter?id=2552409;js=na" style="border:0;" height="1" width="1" alt="Рейтинг@Mail.ru" />
</div></noscript>
<!-- //Rating@Mail.ru counter -->

  <?php //print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

<!-- Rating@Mail.ru logo -->
<a href="http://top.mail.ru/jump?from=2552409">
<img src="//top-fwz1.mail.ru/counter?id=2552409;t=479;l=1" 
style="border:0;" height="31" width="88" alt="Рейтинг@Mail.ru" /></a>
<!-- //Rating@Mail.ru logo -->

</body>
</html>
