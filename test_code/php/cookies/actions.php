<?
function ActionShowItem()
{
	global $usubmodule, $smarty, $NAVI_STR;

	$iblock_element = new _iblock_element();
	$iblock = new _iblock();

	$str_id = mysql_escape_string($usubmodule);
	$str_id = str_replace('.html', '', $str_id);
//7 - id для акций  
	$item = $iblock_element->Get(array('code' => $str_id, 'iblock_id' => 7));
	
	//$item['date'] = GetRusDate($item['timestamp'], 1);
	$item['date'] = date("d.m.Y", $item['timestamp']);

	$smarty->assign('content', 'action_item');
	$smarty->assign('news_data', $item);

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

function ActionList()
{
	global $smarty, $umodule, $NAVI_STR;

	$iblock_element = new _iblock_element();
	$iblock = new _iblock();
    $NAVI_STR[] = array('Акции' => '/actions/');

	$smarty->assign('content', 'action_list');

	list($razdel, $year, $month) = explode('-', $umodule);
	$pages_block = $iblock->Get(array('code' => 'pages'));
	$content_data = $iblock_element->Get(array('code' => 'actions', 'iblock_id' => $pages_block['id'], 'active' => 1));
	
	//print_r($content_data);
	
	$smarty->assign('page_data', $content_data);
	$smarty->assign('header', array("keywords" => strtolower(preg_replace("/[;,.:]+?/", "", $content_data['properties']['keywords']['value'])), "description" => $content_data['properties']['description']['value'], "title" => $content_data['properties']['title']['value']));
	$news_block = $iblock->Get(array('code' => 'actions'));

	$news = $iblock_element->GetList(array('iblock_id' => $news_block['id'], 'active' => 1), array('timestamp' => 'DESC'));

	while ($data = $news->GetData())
	{
		$item = $iblock_element->Get(array('id' => $data['id']));
		$item['date'] = date("d.m.Y", $item['timestamp']);
		$news_data[] = $item;
	}
	$smarty->assign('news_years', $news_years);
	$smarty->assign('news_data', $news_data);
	
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

function getActionList($action_cnt)
{
	$iblock = new _iblock();
	$iblock_element = new _iblock_element();

	$news_data = array();
	$news_block = $iblock->Get(array('code' => 'actions'));

	$news = $iblock_element->GetList(array('iblock_id' => $news_block['id'], 'active' => 1), array('timestamp' => 'DESC'), false, 0 ,$action_cnt);

	
	while ($data = $news->GetData())
	{
		$item = $iblock_element->Get(array('id' => $data['id']));
		$item['date'] = date("d", $item['timestamp']).' '.getAccusativeMonthName(date("n", $item['timestamp']));
		$news_data[] = $item;
	}
	return $news_data;
}

?>