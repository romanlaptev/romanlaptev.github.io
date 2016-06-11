<?php
/*
Template Name: test1
*/
?>
<?php get_header(); ?>

<?php
echo "<pre>";
print_r($post);
echo "</pre>";
/*
WP_Post Object
(
    [ID] => 500
    [post_author] => 1
    [post_date] => 2016-01-09 13:55:20
    [post_date_gmt] => 2016-01-09 13:57:36
    [post_content] => http://www.metmuseum.org/collection/the-collection-online/search/399144

    [post_title] => Portrait of Queen Marie-Antoinette
    [post_excerpt] => 
    [post_status] => publish
    [comment_status] => closed
    [ping_status] => closed
    [post_password] => 
    [post_name] => portrait-of-queen-marie-antoinette
    [to_ping] => 
    [pinged] => 
    [post_modified] => 2016-01-31 06:15:07
    [post_modified_gmt] => 2016-01-31 03:15:07
    [post_content_filtered] => 
    [post_parent] => 0
    [guid] => http://localhost/sites/graphic-art-collection/art.wp/portrait-of-queen-marie-antoinette/
    [menu_order] => 0
    [post_type] => post
    [post_mime_type] => 
    [comment_count] => 0
    [filter] => raw
)
*/

$categories = get_the_category( $post->ID );
echo "<pre>";
print_r( $categories );
echo "</pre>";
/*
Array
(
    [0] => stdClass Object
        (
            [term_id] => 4
            [name] => Иоганн Исайя Нильсон
            [slug] => nilson-johannes
            [term_group] => 0
            [term_taxonomy_id] => 4
            [taxonomy] => category
            [description] => cartouches_modernes_a_compagnes_par_des_enfans.jpeg
            [parent] => 2
            [count] => 5
            [object_id] => 500
            [filter] => raw
            [cat_ID] => 4
            [category_count] => 5
            [category_description] => cartouches_modernes_a_compagnes_par_des_enfans.jpeg
            [cat_name] => Иоганн Исайя Нильсон
            [category_nicename] => nilson-johannes
            [category_parent] => 2
        )
)
*/


$posttags = get_the_tags();
echo "<pre>";
print_r( $posttags );
echo "</pre>";

if ($posttags) {
  foreach($posttags as $tag) {
	echo $tag->name . ' '; 
  }
}
/*
Array
(
    [0] => stdClass Object
        (
            [term_id] => 77
            [name] => zoom
            [slug] => zoom
            [term_group] => 0
            [term_taxonomy_id] => 77
            [taxonomy] => post_tag
            [description] => 
            [parent] => 0
            [count] => 1
            [object_id] => 500
            [filter] => raw
        )
*/
?>

<?php
//http://wp-kama.ru/function/wp_list_pages#4.1-vyvedem-spisok-dochernih-stranits
  $children = wp_list_pages('title_li=&child_of='.$post->ID.'&echo=0');
  if ($children) { ?>
  <ul>
  <?php echo $children; ?>
  </ul>
<?php } ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
