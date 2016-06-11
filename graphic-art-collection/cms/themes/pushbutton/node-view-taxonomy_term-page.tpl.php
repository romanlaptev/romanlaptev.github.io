node-view-taxonomy_term-page
<?php
?>
<div class="node<?php if ($sticky) { print " sticky"; } ?><?php if (!$status) { print " node-unpublished"; } ?>">
  <?php print $picture ?>
  <?php if ($page == 0): ?>
    <h1 class="title"><a href="<?php print $node_url ?>"><?php print $title ?></a></h1>
  <?php endif; ?>
    <span class="submitted"><?php print $submitted ?></span>
    <div class="taxonomy"><?php print $terms ?></div>
    
<?php 
	if (!empty($node->field_filename[0]['value']))
	{
		$url_original = trim($node->field_original_img[0]['value']);
		$url_medium = trim($node->field_big_img[0]['value']);
		$url_preview = trim($node->field_preview_img[0]['value']);
	
		$filename = $node->field_filename[0]['value'];
		$img_title = $node->field_title[0]['value'];
		$alt = $img_title;
		$preview_img = $url_preview."/".$filename;
		$medium_img = $url_medium."/".$filename;
		$original_img = $url_original."/".$filename;

		echo "
<div class='img_content'>
<a rel='lightbox' href='".$medium_img."' title='".$img_title."'>
<img src='".$preview_img."' alt='".$alt."'></a>
<br>
<a href='".$original_img."'>view original img</a>
<p>".$img_title."</p>
</div>";
	}//------------------------- end if
?>
    
    <div class="content"><?php print $content ?></div>
    <?php if ($links): ?>
    <div class="links">&raquo; <?php print $links ?></div>
    <?php endif; ?>
</div>
