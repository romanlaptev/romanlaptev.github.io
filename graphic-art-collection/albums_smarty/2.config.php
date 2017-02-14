<?php
	//$base_url="";
	//$base_url="/albums_smarty";
	$base_url="/transcend/sites/albums/albums_smarty";
	//$base_url="/sites/albums_smarty";
	$smarty->assign('base_url', $base_url);
	$smarty->assign('rewrite_url', '1');

	//$smarty->assign('metrika', 'wizardgraphics.narod.ru');
	//$smarty->assign('metrika', 'wizardgraphics.dax.ru');
	$smarty->assign('adsense_left', '0');
	$smarty->assign('adsense_right', '0');
	$smarty->assign('adsense_bottom', '0');

	$breadcrumb = "<a href=".$base_url."/>Главная</a>";
	$content = 'list-albums';

	$charset = "utf-8";
	//$charset = "windows-1251";
	$smarty->assign('charset', $charset);

	$sitename1 = 'Мастера графики';

	if ($charset == "windows-1251")
	{
		//$breadcrumb = iconv("UTF-8", "windows-1251",$breadcrumb);
		$sitename1 = iconv("UTF-8", "windows-1251",$sitename1);
		$sitename2 = iconv("UTF-8", "windows-1251",$sitename2);
	}

	$smarty->assign('sitename1', $sitename1);
	$smarty->assign('sitename2', 'Wizard graphics');

	//$smarty->assign('content_site', 'http://vhost.tw1.ru');
	$smarty->assign('content_site', 'http://mycomp');
	//$smarty->assign('content_site', '');

	$xml_file = "xml/export.xml";
	//$log_file = "log/visits.txt";
	//$smarty->assign('log_file', $log_file);

	//$colorbox = "lightbox";
	$colorbox = "pirobox";
	//$colorbox = "highslide";
	$smarty->assign('colorbox', $colorbox);
?>
