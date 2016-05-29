<?php

/**
 * @file
 * Default theme implementation to navigate books. Presented under nodes that
 * are a part of book outlines.
 *
 * Available variables:
 * - $tree: The immediate children of the current node rendered as an
 *   unordered list.
 * - $current_depth: Depth of the current node within the book outline.
 *   Provided for context.
 * - $prev_url: URL to the previous node.
 * - $prev_title: Title of the previous node.
 * - $parent_url: URL to the parent node.
 * - $parent_title: Title of the parent node. Not printed by default. Provided
 *   as an option.
 * - $next_url: URL to the next node.
 * - $next_title: Title of the next node.
 * - $has_links: Flags TRUE whenever the previous, parent or next data has a
 *   value.
 * - $book_id: The book ID of the current outline being viewed. Same as the
 *   node ID containing the entire outline. Provided for context.
 * - $book_url: The book/node URL of the current outline being viewed.
 *   Provided as an option. Not used by default.
 * - $book_title: The book/node title of the current outline being viewed.
 *   Provided as an option. Not used by default.
 *
 * @see template_preprocess_book_navigation()
 */
?>

<?php
/*
$alias_arr = explode("/",request_uri());
//echo $alias_arr[1];
//echo "<br>";

$prev_url = str_replace($alias_arr[1],"",$prev_url);
$prev_url = str_replace("//","",$prev_url);

$next_url = str_replace($alias_arr[1],"",$next_url);
$next_url = str_replace("//","",$next_url);

$parent_url = str_replace($alias_arr[1],"",$parent_url);
$parent_url = str_replace("//","",$parent_url);
*/

$prev_url_arr = explode("/",$prev_url);
$prev_url = end($prev_url_arr);

$next_url_arr = explode("/",$next_url);
$next_url = end($next_url_arr);

$parent_url_arr = explode("/",$parent_url);
$parent_url = end($parent_url_arr);


?>
<?php if ($tree || $has_links): ?>
  <div id="book-navigation-<?php print $book_id; ?>" class="book-navigation">
    <?php print $tree; ?>

    <?php if ($has_links): ?>
    <div class="page-links clearfix">
      <?php if ($prev_url) : ?>

        <a href="<?php print $prev_url; ?>" class="page-previous" title="<?php print $prev_title; ?>"><|| на предыдущую страницу</a>

      <?php endif; ?>
      <?php if ($parent_url) : ?>

        <a href="<?php print $parent_url; ?>" class="page-up" title="<?php print t('Go to parent page'); ?>">содержание</a>

      <?php endif; ?>
      <?php if ($next_url) : ?>

        <a href="<?php print $next_url; ?>" class="page-next" title="<?php print $next_title; ?>">на следующую страницу ||> </a>


      <?php endif; ?>
    </div>
    <?php endif; ?>

  </div>
<?php endif; ?>
