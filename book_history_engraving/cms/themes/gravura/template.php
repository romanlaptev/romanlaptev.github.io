<?php

/**
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return a string containing the breadcrumb output.
 */
function gravura_breadcrumb($variables) {
//echo "function gravura_breadcrumb()";
//echo "<br>";

$breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $output .= '<div class="breadcrumb">' . implode(' › ', $breadcrumb) . '</div>';

    return $output;
  }
}

/**
 * Override or insert variables into the maintenance page template.
 */
function gravura_preprocess_maintenance_page(&$vars) {
//drupal_set_message('themes/gravura/template.php, gravura_preprocess_maintenance_page');

  // While markup for normal pages is split into page.tpl.php and html.tpl.php,
  // the markup for the maintenance page is all in the single
  // maintenance-page.tpl.php template. So, to have what's done in
  // gravura_preprocess_html() also happen on the maintenance page, it has to be
  // called here.
  gravura_preprocess_html($vars);
}

/**
 * Override or insert variables into the html template.
 */
function gravura_preprocess_html(&$vars) {
//drupal_set_message('themes/gravura/template.php, function gravura_preprocess_html');

  // Toggle fixed or fluid width.
  if (theme_get_setting('gravura_width') == 'fluid') {
    $vars['classes_array'][] = 'fluid-width';
  }
  // Add conditional CSS for IE6.
  drupal_add_css(path_to_theme() . '/fix-ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lt IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
}

/**
 * Override or insert variables into the html template.
 */
function gravura_process_html(&$vars) {
//drupal_set_message('themes/gravura/template.php, function gravura_process_html');
  // Hook into color.module
  if (module_exists('color')) {
    _color_html_alter($vars);
  }
}

/**
 * Override or insert variables into the page template.
 */
function gravura_preprocess_page(&$vars) {
//drupal_set_message('function gravura_preprocess_page');

  // Move secondary tabs into a separate variable.
  $vars['tabs2'] = array(
    '#theme' => 'menu_local_tasks',
    '#secondary' => $vars['tabs']['#secondary'],
  );
  unset($vars['tabs']['#secondary']);

  if (isset($vars['main_menu'])) {
    $vars['primary_nav'] = theme('links__system_main_menu', array(
      'links' => $vars['main_menu'],
      'attributes' => array(
        'class' => array('links', 'inline', 'main-menu'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['primary_nav'] = FALSE;
  }
  if (isset($vars['secondary_menu'])) {
    $vars['secondary_nav'] = theme('links__system_secondary_menu', array(
      'links' => $vars['secondary_menu'],
      'attributes' => array(
        'class' => array('links', 'inline', 'secondary-menu'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['secondary_nav'] = FALSE;
  }

  // Prepare header.
  $site_fields = array();
  if (!empty($vars['site_name'])) {
    $site_fields[] = $vars['site_name'];
  }
  if (!empty($vars['site_slogan'])) {
    $site_fields[] = $vars['site_slogan'];
  }
  $vars['site_title'] = implode(' ', $site_fields);
  if (!empty($site_fields)) {
    $site_fields[0] = '<span>' . $site_fields[0] . '</span>';
  }
  $vars['site_html'] = implode(' ', $site_fields);

  // Set a variable for the site name title and logo alt attributes text.
  $slogan_text = $vars['site_slogan'];
  $site_name_text = $vars['site_name'];
  $vars['site_name_and_slogan'] = $site_name_text . ' ' . $slogan_text;
}

/**
 * Override or insert variables into the node template.
 */
function gravura_preprocess_node(&$vars) {
  $vars['submitted'] = $vars['date'] . ' — ' . $vars['name'];
}

/**
 * Override or insert variables into the comment template.
 */
function gravura_preprocess_comment(&$vars) {
  $vars['submitted'] = $vars['created'] . ' — ' . $vars['author'];
}

/**
 * Override or insert variables into the block template.
 */
function gravura_preprocess_block(&$vars) {
  $vars['title_attributes_array']['class'][] = 'title';
  $vars['classes_array'][] = 'clearfix';
}

/**
 * Override or insert variables into the page template.
 */
function gravura_process_page(&$vars) {
//echo "function gravura_process_page()";
//echo "<br>";

  // Hook into color.module
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

/**
 * Override or insert variables into the region template.
 */
function gravura_preprocess_region(&$vars) {
  if ($vars['region'] == 'header') {
    $vars['classes_array'][] = 'clearfix';
  }
}



//----------------------------------------------
//скопировать изображение ноды в папку контента
//----------------------------------------------
function copy_img($source_file, $dest_file)
{
//echo "function copy_img";
//echo "<br>";
//echo "copy ".$source_file." --> ".$dest_file;
//echo "<br>";
	global $out;
	$out2 = "";

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
$out2 .= "<span class='ok'>Исходный файл </span>".$source_file." существует.";
$out2 .= "<br>";
		if (file_exists($dest_file))
		{
$out2 .= "<ul>";
$out2 .= "<span class='warning'>Файл назначения</span>".$dest_file." существует, <span class='warning'>перезаписываем</span>";
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
echo "function remove_img";
echo "<br>";
	if (unlink ($file))
	{
$out2 .= "<ul>";
$out2 .= "<span class='ok'>Remove </span>".$file;
$out2 .= "</ul>";
	}

echo $out2;
	return $out2;
}//------------ end func

//-----------------
// Создать иконку 
//-----------------
function create_icon ($alt,$img_title,$preset_name,$src_file)
{
//echo "function create_icon";
//echo "<br>";
	$out="";

//------------------------ Drupal 6
/*
	if (module_exists('imagecache'))
	{
		$img = theme('imagecache', $preset_name, $src_file, $alt, $img_title);		
		echo $img;
	}
*/
//------------------------ Drupal 7

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

	$out .= "<ul>";
	$out .= "<span class='warning'>создать PRESET $preset_name для </span> ".$src_file;
	$out .= "</ul>";
	return $out;
}//------------------------ end func

//----------------------------------------------
//операции с прикрепленным изображением: 
//если необходимо, переместить в альтернатив. раположение контента сайта,
//формирование иконок предосмотра
//вывод с использованием лайтбокса
//----------------------------------------------
function attached_img_action($node){
//echo "function attached_img_action";
//echo "<br>";

//echo "<pre>";
//print_r($content['body']['#object']->field_content_location);
//[field_content_files] 
//[field_book_img]
//print_r($node);
//print_r($field_instance["default_value"]);
//echo "</pre>";


//--------------------------------------------------------------------------
//-------------------------- чтение значений CCK-полей в переменные
//--------------------------------------------------------------------------
	$field_book_img = field_get_items('node', $node, 'field_book_img');
//echo "field_book_img = <pre>";
//print_r($field_book_img);
//echo "</pre>";
//echo "count = ".count($field_book_img);
//echo "<br>";

	$test=0;
	if (empty($field_book_img[0]['filename']))
	{
		$test=1;//файл не загружен
//echo "файл изображения не загружен";
//echo "<br>";
	}


	$field_content_location = field_get_items('node', $node, 'field_content_location');
/*
	//---------- разделить значение поля на имя переменной и ее значение
	$field_arr_keys = array();
	$field_arr_values = array();
	$images_path = array();

	for ($n1=0; $n1 < count($field_content_location); $n1++)
	{
		$field_arr = array();

		$exp_str = trim($field_content_location[$n1]['value']);
//$exp_str = trim($n1."url_original=book_history_engraving/02.german_engraving");
		$field_arr = explode("=",$exp_str);
//$field_arr[1]="/mnt/terra/0_sites/site-content";

//echo "field_arr = <pre>";
//print_r($field_arr);
//echo "</pre>";
		$f_arr_keys[]=$field_arr[0];
		$f_arr_values[]=$field_arr[1];
//echo $field_arr[1];
//echo "<br>";
	}

	$images_path = array_combine($f_arr_keys, $f_arr_values);
echo "images_path = <pre>";
print_r($images_path);
echo "</pre>";

*/
	//-------------------------------------------------------------------------------

	//-------------------------------------------------------------------------------
	//файловый путь папки изображений контента
	//--------------------------------------------------------------------------
	if (empty($field_content_location[0]['value']))
	{
		//(абсолютный путь к папке изображений материалов сайта)
		//считать значение по умолчанию из параметров типа материала
		$field_instance = field_info_instance('node', "field_content_location", 'book');
		$fs_root_dest = $field_instance["default_value"][0]["value"];

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][0]['value']=$fs_root_dest;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$fs_root_dest = trim($field_content_location[0]['value']);
//echo "fs_root_dest = ".$fs_root_dest;
//echo "<br>";
	}


	//--------------------------------------------------------------------------
	//получить файловый путь к изображениям и иконкам, из текстового поля ноды
	//--------------------------------------------------------------------------
	if (empty($field_content_location[1]['value']))
	{
		//(папка для изображения в оригинальном размере)
		$url_original = "book_history_engraving";

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][1]['value']=$url_original;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$url_original = trim($field_content_location[1]['value']);
//echo "url_original = ".$url_original;
//echo "<br>";
	}

	//--------------------------------------------------------------------------
	if (empty($field_content_location[2]['value']))
	{
		$url_preview = "thumbnail";//(папка для изображений предосмотра)

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][2]['value']=$url_preview;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$url_preview = trim($field_content_location[2]['value']);
//echo "url_preview = ".$url_preview;
//echo "<br>";
	}

	//--------------------------------------------------------------------------
	if (empty($field_content_location[3]['value']))
	{
		$url_small = "small";//(папка для изображений стиля small)

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][3]['value']=$url_small;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$url_small = trim($field_content_location[3]['value']);
//echo "url_small = ".$url_small;
//echo "<br>";
	}

	//--------------------------------------------------------------------------
	if (empty($field_content_location[4]['value']))
	{
		$url_medium = "medium";//(папка для изображений стиля medium)

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][4]['value']=$url_medium;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$url_medium = trim($field_content_location[4]['value']);
//echo "url_medium = ".$url_medium;
//echo "<br>";
	}

	//--------------------------------------------------------------------------
	if (empty($field_content_location[5]['value']))
	{
		$url_large = "large";//(папка для изображений стиля large)

		//заполнить ССК-поле, если не заполнено
		$node->field_content_location[LANGUAGE_NONE][5]['value']=$url_large;
		node_save($node);
		$test=1;//поле не заполнено
	}
	else
	{
		$url_large = trim($field_content_location[5]['value']);
//echo "url_large = ".$url_large;
//echo "<br>";
	}
	//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
	$img_title = $node->title;
	$alt = $node->title;
	$out ="";

//echo "test = ".$test;
//echo "<br>";
//переместить изображения в альтернатив. раположение контента сайта,
if ($test == 0)
{
	
//объеденить переменные со значениями файловых путей, в один массив
	$img_filepath_arr = array();

//файловый путь к директории сайта
	$img_filepath_arr['fs_root'] = getcwd();

//файловый путь к прикрепленным к ноде изображениям
	$img_filepath_arr['fs_root_src'] = $img_filepath_arr['fs_root']."/sites/default/files";

//файловый путь к альтернатив. раположению контента сайта
	$img_filepath_arr['fs_root_dest'] = $fs_root_dest;

//название подпапки для изображений ноды
	$img_filepath_arr['img_subfolder'] = "book_img";

//название подпапки для изображений контента сайта
	$img_filepath_arr['img_original'] = $url_original;

	$img_filepath_arr['src_style_preview'] = "styles/".$url_preview."/public";
	$img_filepath_arr['dst_style_preview'] = $url_preview;

	$img_filepath_arr['src_style_small'] = "styles/".$url_small."/public";
	$img_filepath_arr['dst_style_small'] = $url_small;

	$img_filepath_arr['src_style_medium'] = "styles/".$url_medium."/public";
	$img_filepath_arr['dst_style_medium'] = $url_medium;

	$img_filepath_arr['src_style_large'] = "styles/".$url_large."/public";
	$img_filepath_arr['dst_style_large'] = $url_large;
//echo "<pre>";
//print_r($img_filepath_arr);
//echo "</pre>";
	prep_images($node,$field_book_img,$img_filepath_arr);
}

//если ни один файл изображения не загружен,
//вывести изображения из альтерн. папки контента
if ($test == 1)
{

//объеденить переменные со значениями файловых путей, в один массив
		$img_filepath_arr = array();
		$img_filepath_arr[] = $fs_root_dest;
		$img_filepath_arr[] = $url_original;
		$img_filepath_arr[] = $url_preview;
		$img_filepath_arr[] = $url_small;
		$img_filepath_arr[] = $url_medium;
		$img_filepath_arr[] = $url_large;
//--------------------------------------------------------------------------
//-------------------------- чтение значений CCK-полей в массив
//--------------------------------------------------------------------------
	$field_content_files = field_get_items('node', $node, 'field_content_files');
	if ( $web_content_location = field_get_items('node', $node, 'field_web_content_location') )
	{
		$img_filepath_arr["web_content_location"] = $web_content_location[0]['value'];
	}

	view_images($field_content_files,$img_filepath_arr);//вывод с использованием лайтбокса
}

}//end attached_img_action()

//формирование иконок предосмотра
//вывод с использованием лайтбокса
function prep_images($node,$field_book_img,$img_filepath){
echo "function prep_images()";
echo "<br>";

	for ($n1=0;$n1<count($field_book_img);$n1++)
	{
		$file_src = trim($field_book_img[$n1]['filename']);
//echo $n1."file_src = ".$file_src;
//echo "<br>";
//-----------------------------------------------------------------------------
		if (!empty($field_book_img[$n1]['title']))
		{
			$img_title = trim($field_book_img[$n1]['title']);
		}
		else
		{
			if (!empty($field_book_img[$n1]['alt']))
			{
				$img_title = trim($field_book_img[$n1]['alt']);
				$alt = trim($field_book_img[$n1]['alt']);
			}
		}
//------------------------- запомнить копию имени файла изображения в CCK-поле
/*
		$arr=explode("#",$node->field_content_files[LANGUAGE_NONE][$n1]['value']);
		$test_filename = $arr[0];
		//if ($node->field_content_files[LANGUAGE_NONE][$n1]['value'] != $file_src)
		if ($test_filename != $file_src)
		{
			if (!empty($img_title))
			{
				$node->field_content_files[LANGUAGE_NONE][$n1]['value']=$file_src.'#'.$img_title;
			}
			else
				$node->field_content_files[LANGUAGE_NONE][$n1]['value']=$file_src;
			node_save($node);
		}
*/

/*
		for ( $n2=0; $n2<count($node->field_content_files[LANGUAGE_NONE]); $n2++ )
		{
			if ( empty( $node->field_content_files[LANGUAGE_NONE][$n2]['value'] ) )
			{
echo "count(node->field_content_files) = ".count($node->field_content_files[LANGUAGE_NONE]);
echo "<br>";
				if (!empty($img_title))
				{
					$node->field_content_files[LANGUAGE_NONE][$n2]['value']=$file_src.'#'.$img_title;
				}
				else
					$node->field_content_files[LANGUAGE_NONE][$n2]['value']=$file_src;
				node_save($node);
			}
		}
*/
//-----------------------------------------------------------------------------

//===================================================================================
// скопировать изображение ноды в папку контента и создать иконки
//===================================================================================
		$original_img = $img_filepath['img_original']."/".$file_src;
//echo "original_img = ".$original_img;
//echo "<br>";

		$source_file = 
$img_filepath['fs_root_src']."/".
$img_filepath['img_subfolder']."/".
$file_src;
echo "source_file = ".$source_file;
echo "<br>";

		$dest_file = $img_filepath['fs_root_dest']."/".$original_img;
echo "dest_file = ".$dest_file;
echo "<br>";
		$out="";
		if (file_exists($source_file))
		{
			copy_img ($source_file, $dest_file); 

//----------------------------------------------------------- preview_img
echo "Preview img prepare.....";
echo "<br>";
			$source_file = 
$img_filepath['fs_root_src']."/".
$img_filepath['src_style_preview']."/".
$img_filepath['img_subfolder']."/".$file_src;

			$dest_file = 
$img_filepath['fs_root_dest']."/".
$img_filepath['img_original']."/".
$img_filepath['dst_style_preview']."/".$file_src;

			if (file_exists($source_file))
			{
				// скопировать изображение иконки в папку контента
				copy_img ($source_file, $dest_file); 
			}
			else // создать иконку
			{
				$preset_name = $img_filepath['dst_style_preview'];
				$src_file = $img_filepath['img_subfolder']."/".$file_src;
				$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
			}

//-------------------------------------------------------------- small img
echo "Small img prepare.....";
echo "<br>";
			$source_file = 
$img_filepath['fs_root_src']."/".
$img_filepath['src_style_small']."/".
$img_filepath['img_subfolder']."/".$file_src;
//echo "source_file = ".$source_file;
//echo "<br>";

			$dest_file = 
$img_filepath['fs_root_dest']."/".
$img_filepath['img_original']."/".
$img_filepath['dst_style_small']."/".$file_src;
//echo "dest_file = ".$dest_file;
//echo "<br>";
			if (file_exists($source_file))
			{
				// скопировать изображение иконки в папку контента
				copy_img ($source_file, $dest_file); 
			}
			else // создать иконку
			{
				$preset_name = $img_filepath['dst_style_small'];
				$src_file = $img_filepath['img_subfolder']."/".$file_src;
				$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
			}

//-------------------------------------------------------------- medium img
echo "Medium img prepare.....";
echo "<br>";
			$source_file = 
$img_filepath['fs_root_src']."/".
$img_filepath['src_style_medium']."/".
$img_filepath['img_subfolder']."/".$file_src;
//echo "source_file = ".$source_file;
//echo "<br>";

			$dest_file = 
$img_filepath['fs_root_dest']."/".
$img_filepath['img_original']."/".
$img_filepath['dst_style_medium']."/".$file_src;
//echo "dest_file = ".$dest_file;
//echo "<br>";
			if (file_exists($source_file))
			{
				// скопировать изображение иконки в папку контента
				copy_img ($source_file, $dest_file); 
			}
			else // создать иконку
			{
				$preset_name = $img_filepath['dst_style_medium'];
				$src_file = $img_filepath['img_subfolder']."/".$file_src;
				$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
			}

//-------------------------------------------------------------- large img
echo "Large img prepare.....";
echo "<br>";
			$source_file = 
$img_filepath['fs_root_src']."/".
$img_filepath['src_style_large']."/".
$img_filepath['img_subfolder']."/".$file_src;
//echo "source_file = ".$source_file;
//echo "<br>";

			$dest_file = 
$img_filepath['fs_root_dest']."/".
$img_filepath['img_original']."/".
$img_filepath['dst_style_large']."/".$file_src;
//echo "dest_file = ".$dest_file;
//echo "<br>";
			if (file_exists($source_file))
			{
				// скопировать изображение иконки в папку контента
				copy_img ($source_file, $dest_file); 
			}
			else // создать иконку
			{
				$preset_name = $img_filepath['dst_style_large'];
				$src_file = $img_filepath['img_subfolder']."/".$file_src;
				$out .= create_icon ($alt,$img_title,$preset_name,$src_file);
			}
//--------------------------------------------------------------


		}//---------------------- end if
echo $out;

	}//--------------- end for

}//end prep_images()

//вывод с использованием лайтбокса
function view_images($field_content_files,$img_filepath_arr){
//echo "function view_images()";
//echo "<br>";
//echo "img_filepath_arr = <pre>";
//print_r($img_filepath_arr);
//echo "</pre>";

	//определить веб-алиас контента сайта
	if ( !empty($img_filepath_arr["web_content_location"]) )
	{
		$web_content_location = $img_filepath_arr["web_content_location"];
	}
	else
	{
		//(последний элемент файлового пути к папке контента)
		//$web_content_location_arr = explode ("/",$img_filepath_arr[0]);
		//$web_content_location = "/".end($web_content_location_arr);

		//считать значение по умолчанию из параметров типа материала
		$field_instance = field_info_instance('node', "field_web_content_location", 'book');
		$web_content_location = "/".$field_instance["default_value"][0]["value"];
	}

	$url_original = $web_content_location ."/". $img_filepath_arr[1];
	$url_preview = $url_original ."/". $img_filepath_arr[2];
	$url_small = $url_original ."/". $img_filepath_arr[3];
	$url_medium = $url_original ."/". $img_filepath_arr[4];
	$url_large = $url_original ."/". $img_filepath_arr[5];

	for ($n1=0;$n1<count($field_content_files);$n1++)
	{
		if (!empty($field_content_files[$n1]['value']))
		{
			$filename = trim($field_content_files[$n1]['value']);

//---------------- получить описание изображения из CCK-поля 
			$filename_arr = explode("#",$filename);
//echo "<pre>";
//print_r($filename_arr);
//echo "</pre>";
			if (!empty($filename_arr[1]))
			{	
				$filename = $filename_arr[0];
				$img_title = $filename_arr[1];
//echo $img_title;
//echo "<br>";
				$alt = $img_title;
			}
			else
			{
				$img_title = "";
				$alt = "";
			}

//----------------
			$original_img = $url_original."/".$filename;
			$preview_img = $url_preview."/".$filename;
//echo "preview_img = ".$preview_img;
//echo "<br>";
			$small_img = $url_small."/".$filename;
//echo "small_img = ".$small_img;
//echo "<br>";
			$medium_img = $url_medium."/".$filename;
//echo "medium_img = ".$medium_img;
//echo "<br>";
			$large_img = $url_large."/".$filename;
//echo "large_img = ".$large_img;
//echo "<br>";
//----------------------------------------------------------------------------------
			//Вывод изображения ноды в лайтбоксе
			echo "
<div class='img_content'>
<a class='pirobox' href='".$medium_img."' title='".$img_title."'>
<img src='".$preview_img."' alt='".$alt."'></a>
<!--
<br>
<div class='resize'>увеличить в 
	<a class='pirobox' href='".$small_img."'>2x</a>
	<a class='pirobox' href='".$medium_img."'>3x</a>
	<a class='pirobox' href='".$large_img."'>4x</a>
	<a href='".$original_img."' target='_blank'>полный размер</a>
</div>
-->
<p>".$img_title."</p>

</div>";

//----------------------------------------------------------------------------------
		}//---------------------- end if 
	}//--------------- end for
	

}//end view_images()