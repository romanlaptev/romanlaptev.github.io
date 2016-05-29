<?php
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <span class="submitted"><?php print $submitted ?></span>
  <?php endif; ?>

  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
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

      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);

//echo "<pre>";
//print_r($content);
//print_r($content['book_navigation']);
//print_r($content['body']['#object']->book['has_children']);
//print_r($content['body']['#object']->book);
//$content['book']['has_children']
//echo "</pre>";

      print render($content);

    ?>
  </div>

  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <div class="links"><?php print render($content['links']); ?></div>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>

</div>
