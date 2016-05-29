<?php
/**
 * @file views-view-fields.tpl.php
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>

<?
//echo "fields = <pre>";
//print_r($fields);
//echo "</pre>";
?>

<div class="notebook_page">
<table>
	<tbody><tr>
		<td valign="top" class="text_col">
			<div class="text_column">

<!--{TEXT_COLUMN_START}-->
<?php 
foreach ($fields as $id => $field): 
	if (!empty($field->separator))
	{
		print $field->separator; 
	}
	print $field->wrapper_prefix; 
	print $field->label_html; 
//echo "class = ".$field->class;
//echo "<br>";
	if ($field->class == 'body')
	{
		print $field->content; 
	}

	print $field->wrapper_suffix; 
endforeach; 
?>
<!--{TEXT_COLUMN_END}-->

			</div><!-- end text column -->
		</td>

		<td valign="top">
			<div class="picture_column">
<!--{PICTURE_START}-->
				<div class="picture">
<!--
<a rel="lightbox" title="" href="/site-content/book_history_engraving/08.English_engraving_18th/medium/p0008.jpg">
<img alt="" title="" src="/site-content/book_history_engraving/08.English_engraving_18th/preview_gallery_img/p0008.jpg">
					</a>
					<span class="resize">увеличить в 
<a rel="lightbox" href="/site-content/book_history_engraving/08.English_engraving_18th/small/p0008.jpg">2x</a> 
<a rel="lightbox" href="/site-content/book_history_engraving/08.English_engraving_18th/medium/p0008.jpg">3x</a> 
<a rel="lightbox" href="/site-content/book_history_engraving/08.English_engraving_18th/large/p0008.jpg">4x</a>
<a href='/site-content/book_history_engraving/08.English_engraving_18th/original/p0008.jpg'>download original image</a>
					</span>
					<br>
-->
<?php
	if ($field->class == 'field-img1-book')
	{
		//print htmlspecialchars($field->content); 
		print $field->content; 
	}
?>
					<p></p>
				</div>
			</div> <!-- end picture column -->

		</td>

	</tr>
</tbody>
</table>
</div>

