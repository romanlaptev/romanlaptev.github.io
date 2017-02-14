<?php
function pushbutton_preprocess_node(&$vars) {
//echo "<pre>";
//print_r($vars);
//echo "</pre>";
/*
  foreach ($vars['node']->taxonomy as $term) {
    $vars['template_files'][] = 'node-term-'. $term->tid;
  }
  */
/*
    [template_files] => Array
        (
            [0] => node-photogallery_image
            [1] => node-view-taxonomy_term
            [2] => node-view-taxonomy_term-page
        )
*/
}

function pushbutton_pager($tags = array(), $limit = 10, $element = 0, $parameters = array(), $quantity = 9) {
//drupal_set_message ("function pushbutton_pager");
//echo "function pushbutton_pager";
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', (isset($tags[0]) ? $tags[0] : t('« first')), $limit, $element, $parameters);
  $li_previous = theme('pager_previous', (isset($tags[1]) ? $tags[1] : t('‹ previous')), $limit, $element, 1, $parameters);
  $li_next = theme('pager_next', (isset($tags[3]) ? $tags[3] : t('next ›')), $limit, $element, 1, $parameters);
  $li_last = theme('pager_last', (isset($tags[4]) ? $tags[4] : t('last »')), $limit, $element, $parameters);

  if ($pager_total[$element] > 1) {

    //if ($li_first) {
      $items[] = array(
        'class' => 'pager-first',
        'data' => $li_first,
      );
    //}
    //if ($li_previous) {
      //$items[] = array(
        //'class' => 'pager-previous',
        //'data' => $li_previous,
      //);
    //}

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => 'pager-ellipsis',
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => 'pager-item',
            'data' => theme('pager_previous', $i, $limit, $element, ($pager_current - $i), $parameters),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => 'pager-current',
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => 'pager-item',
            'data' => theme('pager_next', $i, $limit, $element, ($i - $pager_current), $parameters),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => 'pager-ellipsis',
          'data' => '…',
        );
      }
    }
    // End generation.

    //if ($li_next) {
      //$items[] = array(
        //'class' => 'pager-next',
        //'data' => $li_next,
      //);
    //}

    //if ($li_last) {
      $items[] = array(
        'class' => 'pager-last',
        'data' => $li_last,
      );
    //}

    return theme('item_list', $items, NULL, 'ul', array('class' => 'pager'));
  }
}

//error_reporting(E_ALL);
//error_reporting(0);
//  error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
//echo "template.php";
//echo "<br>";
//================================================= FUNCTIONS

//----------------------------------------------
//скопировать изображение ноды в папку контента
//----------------------------------------------
function copy_img($source_file, $dest_file)
{
echo "function copy_img";
echo "<br>";
//echo "copy ".$source_file." --> ".$dest_file;
//echo "<br>";
	global $out;
	$res=0;
	if (!file_exists($dest_file))
	{
$out2 .= "<ul>";
$out2 .= "<span class='error'>Не найден </span>".$dest_file;
$out2 .= "</ul>";

		if (mkdir(dirname($dest_file),0,true))
		{
$out2 .= "<ul>";
$out2 .= "<ul>";
$out2 .= "<span class='ok'>Создание </span>".dirname($dest_file);
$out2 .= "</ul>";
$out2 .= "</ul>";
		}
		else
		{
$out2 .= "<ul>";
$out2 .= "<ul>";
$out2 .= "<span class='error'>Не удалось создать </span>".dirname($dest_file);
$out2 .= "</ul>";
$out2 .= "</ul>";
		}

	}
	else
		$res=1;

	if (file_exists($source_file))
	{
//$out2 .= "<span class='ok'>Исходный файл </span>".$source_file." существует, <span class='warning'>перемещаем</span>";
$out2 .= "<span class='ok'>Исходный файл </span>".$source_file." существует.";
$out2 .= "<br>";
		if (file_exists($dest_file))
		{
$out2 .= "<ul>";
$out2 .= "<span class='warning'>Файл назначения</span>".$dest_file." уже существует, <span class='warning'>перезаписываем</span>";
$out2 .= "</ul>";
		}

		if (!copy($source_file, $dest_file)) 
		{
$out2 .= "<ul>";
$out2 .= "<span class='error'>Не удалось скопировать </span>".$source_file;
$out2 .= "</ul>";
		}
		else
		{
			$res=1;
$out2 .= "<ul>";
$out2 .= "<span class='ok'>Скопирован </span>";
$out2 .= $source_file." >> ".$dest_file;
$out2 .= "</ul>";
		}

	}

echo $out2;
//echo "res = ".$res;
//echo "<br>";
	return $res;

}//------------ end func
//----------------------
//удалить изображение 
//----------------------
function remove_img($file)
{
//echo "function remove_img";
//echo "<br>";
	if (unlink ($file))
	{
$out2 .= "<ul>";
$out2 .= "<span class='ok'>Remove </span>".$file;
$out2 .= "</ul>";
	}

//echo $out2;
	return $out2;
}//------------ end func

//-----------------
// Создать иконку 
//-----------------
function create_icon ($alt,$img_title,$preset_name,$src_file)
{
echo "function create_icon";
echo "<br>";
	$out="";

//------------------------ Drupal 6
	if (module_exists('imagecache'))
	{
		$img = theme('imagecache', $preset_name, $src_file, $alt, $img_title);		
		echo $img;
	}

//------------------------ Drupal 7
/*
	$image_settings = array(
			'style_name' => $preset_name,
//'path' => 'public://img_book/p0007_1.jpg',
//'path' => 'img_book/p0007_1.jpg',
			'path' => $src_file,
			'alt' => $alt,
			'title' => $img_title,
			'attributes' => array('class' => 'image'),
			'getsize' => FALSE,
			);
	//print theme('image_style', $image_settings);
	$img = theme('image_style', $image_settings);
	//$img = theme('imagecache', $preset_name, $src_file, $alt, $img_title);		
	echo $img;
*/

	$out .= "<ul>";
	$out .= "<span class='warning'>создать PRESET $preset_name для </span> ".$src_file;
	$out .= "</ul>";
	return $out;
}//------------------------ end func
