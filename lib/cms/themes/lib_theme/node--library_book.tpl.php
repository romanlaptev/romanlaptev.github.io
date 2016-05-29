node--library_book.tpl.php
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
//--------------------------------------------------
//echo "<pre>";
//print_r($node->field_img_cover);
//print_r($content);
//echo "</pre>";
	if ( empty($node->field_code) )
	{
		//считать значение по умолчанию из параметров типа материала
		$field_instance = field_info_instance('node', "field_code", 'library_book');
		$code = $field_instance["default_value"][0]["value"];

		$code = str_replace("<?php","",$code);
		$code = str_replace("<?","",$code);
		$code = str_replace("?>","",$code);
		eval ($code);
	}

	if ( !empty($node->field_img_cover) )
	{
		$img_cover = $node->field_img_cover["und"][0]["value"];
?>
<div class="book-covers">
	<img src="<?php echo $img_cover; ?>"/>
</div>
<?php
	}
//--------------------------------------------------

      print render($content);
    ?>
  </div>

  <?php print render($content['links']); ?>

  <?php print render($content['comments']); ?>

</div>
