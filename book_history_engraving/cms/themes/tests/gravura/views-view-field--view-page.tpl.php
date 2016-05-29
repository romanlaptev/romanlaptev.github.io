<?php
 /**
  * This template is used to print a single field in a view. It is not
  * actually used in default Views, as this is registered as a theme
  * function which has better performance. For single overrides, the
  * template is perfectly okay.
  *
  * Variables available:
  * - $view: The view object
  * - $field: The field handler object that can process the input
  * - $row: The raw SQL result that can be used
  * - $output: The processed output that will normally be used.
  *
  * When fetching output from the $row, this construct should be used:
  * $data = $row->{$field->field_alias}
  *
  * The above will guarantee that you'll always get the correct data,
  * regardless of any changes in the aliasing that might happen if
  * the view is modified.
  */
?>

<?php 
//echo "view = <pre>";
//print_r($view);
//echo "</pre>";

//echo "row = <pre>";
//print_r($row->_field_data['nid']['entity']->body['und'][0]);
//print_r($row->_field_data['nid']['entity']);
//print_r($row);
//echo "</pre>";


/*
if (!empty($row->field_body))
{
?>
<div class="notebook_page">
<table>
	<tbody><tr>
		<td valign="top" class="text_col">
			<div class="text_column">

			<h2>test</h2>
<!--{TEXT_COLUMN_START}-->
<?
	print $output; 
?>
<!--{TEXT_COLUMN_END}-->

			</div><!-- end text column -->
		</td>

		<td valign="top">
		</td>

	</tr>
</tbody>
</table>
</div>

<?
}
*/
	print $output; 

?>

