<?php
	$base_url="";
	//$base_url="/smarty_site";
	//$base_url="/transcend/0_sites/smarty_site";
	$base_url="";
	$smarty->assign('base_url', $base_url);
	$smarty->assign('rewrite_url', '0');

	//$smarty->assign('metrika', 'wizardgraphics.narod.ru');
	$smarty->assign('metrika', 'wizardgraphics.dax.ru');
	$smarty->assign('adsense_left', '0');
	$smarty->assign('adsense_right', '0');
	$smarty->assign('adsense_bottom', '0');
	$smarty->assign('tak', '0');
	$smarty->assign('adnova', '0');

	$breadcrumb = "<a href=".$base_url."/>Главная</a>";
	$content = 'list-albums';

	$charset = "utf-8";
	//$charset = "windows-1251";
	$smarty->assign('charset', $charset);

	$sitename1 = 'Коллекция живописи и графики';

	if ($charset == "windows-1251")
	{
		//$breadcrumb = iconv("UTF-8", "windows-1251",$breadcrumb);
		$sitename1 = iconv("UTF-8", "windows-1251",$sitename1);
		$sitename2 = iconv("UTF-8", "windows-1251",$sitename2);
	}

	$smarty->assign('sitename1', $sitename1);
	$smarty->assign('sitename2', 'Graphic arts collection');

	$smarty->assign('content_site', 'https://googledrive.com/host/0B0l5s_9HQLzzYTRRM1U3VXBTbWc');

	//$smarty->assign('content_site', 'http://vhost.tw1.ru');
	//$smarty->assign('content_site', 'http://wizardgraphics.narod.ru');
	//$smarty->assign('content_site', 'http://albums.vhost.16mb.com');
	//$smarty->assign('content_site', 'http://mycomp');
	//$smarty->assign('content_site', '');

	//$xml_file = "xml/photogallery_images.xml";
	$xml_file = "xml/export_albums.xml";
	//$log_file = "log/visits.txt";
	//$smarty->assign('log_file', $log_file);

	//$colorbox = "lightbox";
	$colorbox = "pirobox";
	//$colorbox = "highslide";
	$smarty->assign('colorbox', $colorbox);
?>
