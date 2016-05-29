<?
function ArticleShowItem()
{
	global $smarty, $usubmodule, $NAVI_STR;

	$iblock_element = new _iblock_element();
	$iblock = new _iblock();

	$str_id = mysql_escape_string($usubmodule);
	$str_id = str_replace('.html', '', $str_id);
	
	//открываем доступ для админов
	$its_auth = AutorizeUser();
	
	//если просматривает админ, то он может видеть и неактивированные статьи в том числе
	if($its_auth) 
		$item = $iblock_element->Get(array('code' => $str_id, 'iblock_id' => 6));
	else 
		$item = $iblock_element->Get(array('code' => $str_id, 'active' => 1));

//----------------------------------------------------- получить категорию текущей статьи
	$cat=$iblock_element->Get(array('id' => $item['properties']['categories_articles']['value'], 'active' => 1));
//echo "cat = <pre>";			
//print_r($cat);
//echo "</pre>";			
	//$item['properties']['categories_articles']['cat_name'] = $cat['name'];
//----------------------------------------------------- получить четыре статьи из текущей категории для блока "Смотрите также"
//echo "iblock_id = ".$item['iblock_id'];
//echo "<br>";
//echo "category_current = ".$cat['id'];
//echo "<br>";

	$page_num = 0;
	$divider = 4;	
	$res_articles = $iblock_element->GetList(
array('iblock_id' => $item['iblock_id'], 'active' => 1), 
array('timestamp' => 'DESC'), 
array('categories_articles' => array($cat['id'])), 
$page_num, $divider);

	$more_articles=array();
	$n1=0;
	while ($data = $res_articles->GetData())
	{
		if ($n1 < 3)	//для вывода три статьи
		{
			if ($data['id'] != $item['id'])	//исключить из списка, текущую статью
			{
				$more_articles[$n1]['id']=$data['id'];
				$more_articles[$n1]['name']=$data['name'];
				$more_articles[$n1]['code']=$data['code'];
				$more_articles[$n1]['info'] = $iblock_element->Get(array('code' => $more_articles[$n1][code], 'iblock_id' => 6));
				$n1++;
			}
		}
	}
//echo "more_articles = <pre>";			
//print_r($more_articles);
//echo "</pre>";			
//-----------------------------------------------------		
	$item['date'] = GetRusDate($item['timestamp'], 1);
//echo "articles_data = <pre>";			
//print_r($item);
//echo "</pre>";			

	$NAVI_STR[] = array('Статьи' => '/articles/');

	$smarty->assign('content', 'articles_item');
	$smarty->assign('articles_data', $item);
	$smarty->assign('category_data', $cat);
	$smarty->assign('more_articles', $more_articles);

	$smarty->assign('header', array("keywords" => strtolower(preg_replace("/[;,.:]+?/", "", $item['name'])), "description" => $item['name'], "title" => $item['name']));
//-------------------------------------------------------	
	session_start();
//echo "SESSION = <pre>";
//print_r($_SESSION);
//echo "</pre>";
//сформировать массив товаров для вывода блока "Вы смотрели"		
	if (isset($_SESSION['visited_products_arr']))
	{
		$smarty->assign('visited_products_arr', $_SESSION['visited_products_arr']);
	}
//-------------------------------------------------------		
}

function ArticleList()
{
	global $smarty, $iblock_element, $iblock, $umodule, $NAVI_STR, $page_divider;
	$smarty->assign('content', 'article_list');
    $NAVI_STR[] = array('Статьи' => '/articles/');
	$iblock_element = new _iblock_element();
	
//===========================Блог выводить по====================================
	$div_link_base = MakeUrl(array('divider_type'));
	// число элементов на страницу. 0 - все
	//$dividers = array( 20, 30, 40, 0);
	$dividers = array(10, 20, 30, 40, 0);


	$session_div = $_SESSION['divider'];
	if (!isset($_SESSION['divider'])) $session_div = 0;
	if ($_REQUEST['divider_type'] != '')
	{		
		if (array_key_exists($_REQUEST['divider_type'], $dividers))
		{
			$_SESSION['divider'] = $session_div = $_REQUEST['divider_type'];
		}
		else $_SESSION['divider'] == 'all';
	}

	$dividers_disp = array();
	foreach($dividers as $key=>$divider_item)
	{
		if ($key == $session_div) $is_selected = 1;
		else $is_selected = 0;

		$divider_disp_name = ($divider_item==0) ? 'Все':$divider_item;

		$dividers_disp[] = array(
					"name"        => $divider_disp_name,
					"link"        => $div_link_base.'divider_type='.$key,
					"is_selected" => $is_selected
			);

	}


	$smarty->assign('dividers', $dividers_disp);
	

	if (!strcmp($session_div, 'all'))
	{
		$divider = 0;
	}
	else
	{
		$divider = $dividers[$session_div];
	}



	if (!eregi("[0-9]+", $_REQUEST['page']) || intval($_REQUEST['page']) < 0)
	{
		$page_num = 0;
	}
	else
	{
		$page_num = intval($_REQUEST['page']) * $divider;
	}


	//===============================================================================
	//получаем список тематик статей
	$items = $iblock_element->GetList(array('iblock_id' => '8','active' => '1'));
	$i=0;
	while ($iblock_element = $items->GetData())
	{
		$categories[$i]['id']=$iblock_element['id'];
		$categories[$i]['value']=$iblock_element['name'];
		$i++;
	}
	
	$smarty->assign('categories', $categories);

	$iblock = new _iblock();
	$page_block = $iblock->Get(array('code' => 'pages'));
	
	$iblock_element = new _iblock_element();
	$content_data = $iblock_element->Get(array('iblock_id' => $page_block['id'], 'code' => 'articles'));
	$smarty->assign('header', array("keywords" => strtolower(preg_replace("/[;,.:]+?/", "", $content_data['properties']['keywords']['value'])), "description" => $content_data['properties']['description']['value'], "title" => $content_data['properties']['title']['value']));

	$smarty->assign('page_data', $content_data);

	$articles_block = $iblock->Get(array('code' => 'articles'));
	
//echo $articles_block['id'];
//echo "<br>";
//echo $_REQUEST['category_id'];
	
	//если задано к какой категории статей относится текущая статья
	if(isset($_REQUEST['category_id'])) 
	{

		$articles = $iblock_element->GetList(array('iblock_id' => $articles_block['id'], 'active' => 1), array('timestamp' => 'DESC'), array('categories_articles' => array($_REQUEST['category_id'])), $page_num, $divider);
			
		if (!isset($total)) $total = $iblock_element->total;
	

		$max_n=(empty($divider))?0:(int)($total/$divider);
		$max_num=$max_n*$divider;
		
			
		//print("max=");print($max_num);
		if ($page_num > $max_num) 	
		{
			$_REQUEST['page']=$max_n;
			$articles = $iblock_element->GetList(array('iblock_id' => $articles_block['id'], 'active' => 1), array('timestamp' => 'DESC'), array('categories_articles' => array(intval($_REQUEST['category_id']))), $max_num, $divider);
		}
		
			
		$category_current=intval($_REQUEST['category_id']);
	}
	//иначе если задана секция статьи (к какой категории товаров она относится)
	elseif(isset($_REQUEST['section_id'])) 
	{
		$articles = array();
		$section_id = (int)$_REQUEST['section_id'];
		//это выбираем только нужные статьи
		$sql = 'SELECT * FROM _iblock_elements WHERE iblock_id='.(int)$articles_block['id'].' AND active=1 AND section_id REGEXP "(^|;)'.$section_id.'($|;)" ORDER BY timestamp DESC';
//echo '1.sql = '.$sql;
//echo "<br>";
		$res1 = mysql_query($sql);
		
		$article_count = 0;
    	if ($cc = mysql_num_rows($res1))
    	{
    		while($article = mysql_fetch_assoc($res1))
			{
				if($article_count >= $divider) break;
				$res2 = mysql_query('SELECT value FROM _iblock_property_values WHERE element_id='.$article['id'].' AND property_id=63');
				$anonce = mysql_fetch_row($res2);
				$article['properties']['anounce']['value'] = $anonce[0];
				$article['date'] = GetRusDate($article['timestamp'], 1);
				
				$articles_data[] = $article;
					
				$article_count++;
				
			}
			
		}
		else $cc = 0;
		if (!isset($total)) $total = $cc;

		$max_n=(empty($divider))?0:(int)($total/$divider);
		$max_num=$max_n*$divider;
		
		if ($page_num > $max_num) 	
		{
			$_REQUEST['page']=$max_n;
			
			$sql = 'SELECT * FROM _iblock_elements WHERE iblock_id='.(int)$articles_block['id'].' AND active=1 AND section_id REGEXP "(^|;)'.$section_id.'($|;)" ORDER BY timestamp DESC '.(int)$max_num.', '.(int)$divider;
//echo '2.sql = '.$sql;
//echo "<br>";
			
			$res1 = mysql_query($sql);
			if (mysql_num_rows($res1))
			{
				while($article = mysql_fetch_assoc($res1))
				{
					$res2 = mysql_query('SELECT value FROM _iblock_property_values WHERE element_id='.$article['id'].' AND property_id=63');
					$anonce = mysql_fetch_row($res2);
					$article['properties']['anounce']['value'] = $anonce[0];

					$article['date'] = GetRusDate($article['timestamp'], 1);
					$articles_data[] = $article;
				}
			}
		}
		$category_current=-1;
	}
	else
	{
		$articles = $iblock_element->GetList(array('iblock_id' => $articles_block['id'], 'active' => 1), array('timestamp' => 'DESC'),false, $page_num, $divider);
		
		if (!isset($total)) $total = $iblock_element->total;
	
		$max_n=(empty($divider))?0:(int)($total/$divider);
		$max_num=$max_n*$divider;
		
		if ($page_num > $max_num) 	
		{
			$_REQUEST['page']=$max_n;
			$articles = $iblock_element->GetList(array('iblock_id' => $articles_block['id'], 'active' => 1), array('timestamp' => 'DESC'), false, $max_num, $divider);
		}
		$category_current=-1;
	}
	if(!isset($_REQUEST['section_id']))
	{
		while ($data = $articles->GetData())
		{
			$item = $iblock_element->Get(array('id' => $data['id']));
			$item['date'] = GetRusDate($item['timestamp'], 1);
			$articles_data[] = $item;
		}
	}
//echo "articles_data = <pre>";			
//print_r($item);
//echo "</pre>";			

	$smarty->assign('articles_data', $articles_data);
	$smarty->assign('category_current', $category_current);
	
	// Ссылки на страницы
	$REQUEST_URI = $_SERVER['REQUEST_URI'];

	//print_r($_REQUEST);
		
// $smarty->assign('pages', MakePageLinks(MakeUrl(array('page')), $total, $divider, $_REQUEST['page'],''));
 $smarty->assign('pages', MakePageLinks(MakeUrl(array('page')), $total, $divider, intval($_REQUEST['page']),''));	
 
//-------------------------------------------------------	
	session_start();
//echo "SESSION = <pre>";
//print_r($_SESSION);
//echo "</pre>";
//сформировать массив товаров для вывода блока "Вы смотрели"		
	if (isset($_SESSION['visited_products_arr']))
	{
		$smarty->assign('visited_products_arr', $_SESSION['visited_products_arr']);
	}
//-------------------------------------------------------	

}

function GetLastArticlesBlock()
{
	$iblock = new _iblock();
	$articles_block_data = $iblock->Get((array('code' => 'articles')));
	$iblock_element = new _iblock_element();

	$items = $iblock_element->GetList(array('iblock_id' => $articles_block_data['id'], 'active' => 1), array('id' => 'DESC'), false, 0, 4);
	while ($data = $items->GetData())
	{
		$item = $iblock_element->Get(array('id' => $data['id']));
		$articles_data[] = $item;
	}
	return $articles_data;
}

/*** <Evgeniy> ***/
function GetArticles()
{
//echo "function GetArticles";
//echo "<br>";

	global $usubmodule;
//echo "usubmodule = ".$usubmodule;
//echo "<br>";

	$res = mysql_query('SELECT id FROM iblock WHERE code="'.$usubmodule.'"');
    if (mysql_num_rows($res))
    {
    	$id = mysql_fetch_row($res);

    	$sql = 'SELECT * FROM _iblock_elements WHERE iblock_id=6 AND active=1 AND section_id REGEXP "(^|;)'.$id[0].'($|;)" ORDER BY timestamp LIMIT 0, 3';
//echo '3.sql = '.$sql;
//echo "<br>";
    	$res1 = mysql_query($sql);
    	if (mysql_num_rows($res1))
    	{
    		$articles = array();
    		while ($article = mysql_fetch_assoc($res1))
    		{
   				$res2 = mysql_query('SELECT value FROM _iblock_property_values WHERE element_id='.$article['id']
.' AND property_id=63');
     			$anonce = mysql_fetch_row($res2);
     			$article['value'] = $anonce[0];
				$article['date'] = GetRusDate($article['timestamp'], 1);
				
//--------------------------------------------- малая Картинка
				$sql="SELECT value FROM _iblock_property_values WHERE element_id=".$article['id']
." AND property_id=74";				
//echo "sql = ".$sql;
//echo "<br>";
   				$res3 = mysql_query($sql);

     			$img_small = mysql_fetch_row($res3);
     			$article['img_small'] = $img_small[0];
//---------------------------------------------				
   				$articles[] = $article;
    		}
//echo "articles = <pre>";			
//print_r($articles);
//echo "</pre>";			

    		return $articles;
    	}
    	else
    		return '';
    }
    else
    	return '';

/*
	$res = mysql_query($sql1);
	if (mysql_num_rows($res))
	{
		$id = mysql_fetch_row($res);
		$sql = 'SELECT id, name, code, iblock_id FROM _iblock_elements WHERE iblock_id=6 AND section_id='.$id[0].' ORDER BY timestamp LIMIT 0, 4';
    }
    else
    	$sql = 'SELECT id, name, code, iblock_id FROM _iblock_elements WHERE iblock_id=6 ORDER BY timestamp LIMIT 0, 4';

    $res1 = mysql_query($sql);
    $articles = array();
    $articles_id = array();
	while ($article = mysql_fetch_assoc($res1))
	{
     	$res2 = mysql_query('SELECT value FROM _iblock_property_values WHERE element_id='.$article['id'].' AND property_id=63');
     	$anonce = mysql_fetch_row($res2);
     	$articles_id[] = $article['id'];
     	$article['value'] = $anonce[0];
     	$articles[] = $article;
	}

	if (count($articles) < 3)
 	{
   		$num = (4 - count($articles));
   		$sql = 'SELECT id, name, code, iblock_id FROM _iblock_elements WHERE iblock_id=6';

   		if ($num != 4)
   			$sql .= ' AND id NOT IN ('.implode(', ', $articles_id).') ORDER BY timestamp LIMIT 0, '.$num;
   		else
   			$sql .= ' ORDER BY timestamp LIMIT 0, '.$num;

   		$res3 = mysql_query($sql);
   		while ($article = mysql_fetch_assoc($res3))
   		{
   			$res2 = mysql_query('SELECT value FROM _iblock_property_values WHERE element_id='.$article['id'].' AND property_id=63');
     		$anonce = mysql_fetch_row($res2);
     		$article['value'] = $anonce[0];
   			$articles[] = $article;
   		}

 	}

return $articles;  */
}
/*** </Evgeniy> ***/
?>