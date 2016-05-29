node--book.tpl.php.tpl
<?php 
global $theme;
//$theme_path = base_path().drupal_get_path('theme',$theme);
$theme_path = drupal_get_path('theme',$theme);

echo <<<EOF
<!-- ======================================= -->
<link rel="stylesheet" href="$theme_path/js/pirobox/pirobox.css" type="text/css" media="screen" />
<script type="text/javascript" src="$theme_path/js/pirobox/jquery.min.js"></script>
<script type="text/javascript" src="$theme_path/js/pirobox/pirobox_ansi.js"></script>
<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery().piroBox({
			my_speed: 300, //animation speed
			bg_alpha: 0.1, //background opacity
			slideShow : false, // true == slideshow on, false == slideshow off
			slideSpeed : 6, //slideshow duration in seconds(3 to 6 Recommended)
			close_all : '.piro_close,.piro_overlay'// add class .piro_overlay(with comma)if you want overlay click close piroBox

	});
});
</script>
<!-- ======================================= -->

EOF;
?>

<?
//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//echo "</pre>";
?>
<style>
.error
{
	font-weight:bold;
	color:red;
}
.ok
{
	font-weight:bold;
	color:green;
}
.warning
{
	font-weight:bold;
	color:blue;
}
</style>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <span class="submitted"><?php //print $submitted ?></span>
  <?php endif; ?>

<div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
?>

<?
//-------------------------------------------------------------------------
	if (!empty($content['book_navigation']))
	{
		if (isset($content['body']['#object']->book))
		{
			if ($content['body']['#object']->book['depth'] == 3)
			{
				echo $content['book_navigation']['#markup'];
			}
		}
	}
//-------------------------------------------------------------------------
?>

<div class="notebook_page">
<table>
	<tbody><tr>
		<td valign="top" class="text_col">
			<div class="text_column">

<!--{TEXT_COLUMN_START}-->
				<p>	
<?
//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//echo "</pre>";
//echo (htmlspecialchars( $content['book_navigation']['#markup']) );

	//print render($content['body']['#object']->body['und'][0]['value']);
	if (!empty($content['book_navigation']))
	{
//======================================
/*
$str = '<a href="/notebook-1.html">Тетрадь I. Вступительные статьи</a>';
     if (preg_match("|href=\"(.*)\">|sei", $str, $arr))
     {
         echo $arr[1];
         echo "<br>";

	$change_href=str_replace(base_path(),"",$arr[1]);
	$content['book_navigation']['#markup'] = str_replace($arr[1],$change_href,$content['book_navigation']['#markup']);
     }
*/

$content['book_navigation']['#markup'] = str_replace(base_path(),"",$content['book_navigation']['#markup']);
$content['book_navigation']['#markup'] = str_replace("<a><li>","</a></li>",$content['book_navigation']['#markup']);
$content['book_navigation']['#markup'] = str_replace("<a>","</a>",$content['book_navigation']['#markup']);
$content['book_navigation']['#markup'] = str_replace("<div>","</div>",$content['book_navigation']['#markup']);

//======================================

		if (isset($content['body']['#object']->book))
		{
			//if ($content['body']['#object']->book['has_children'] == 0)
			if ($content['body']['#object']->book['depth'] == 3)
			{
				//echo $content['book_navigation']['#markup'];
				$temp = $content['book_navigation'];
				$content['book_navigation']="";
//убрать дублирование навигации книги
				print render($content);

				$content['book_navigation']=$temp;
			}
			else
				print render($content);
		}
		else
			print render($content);
	}


?>
<!--{TEXT_COLUMN_END}-->

			</div><!-- end text column -->
		</td>
<!--
</tr>
<tr>
-->
		<td valign="top">
			<div class="picture_column">
<!--{PICTURE_START}-->
<?php
	attached_img_action($node);
?>

			</div> <!-- end picture column -->
		</td>

	</tr>
</tbody>
</table>
</div>			<!-- end notebook_page -->
<?
//-------------------------------------------------------------------------
	if (!empty($content['book_navigation']))
	{
		if (isset($content['body']['#object']->book))
		{
			//if ($content['body']['#object']->book['has_children'] == 0)
			if ($content['body']['#object']->book['depth'] == 3)
			{
				echo $content['book_navigation']['#markup'];
			}
		}
	}
//-------------------------------------------------------------------------
?>
</div>

  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <div class="links"><?php print render($content['links']); ?></div>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>

</div>
