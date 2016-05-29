node--book_history_engraving.tpl.php
<?php 
global $theme;
//$theme_path = base_path().drupal_get_path('theme',$theme);
$theme_path = drupal_get_path('theme',$theme);
echo <<<EOF
<link rel="stylesheet" href="$theme_path/pirobox/pirobox.css" type="text/css" media="screen" />
<script type="text/javascript" src="$theme_path/pirobox/jquery.min.js"></script>
<script type="text/javascript" src="$theme_path/pirobox/pirobox_ansi.js"></script>
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
EOF;
?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

<div class="attach_image">
<?php
	view_book_images( $node );
?>
</div>

  <?php print render($content['links']); ?>
  <?php print render($content['comments']); ?>

</div>
