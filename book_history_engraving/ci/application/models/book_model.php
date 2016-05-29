<?php 
//error_reporting(E_ALL);

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Book_model extends CI_Model
{

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }

//------------------------------------------------------
// получить menu_links.mlid страниц книги 1-го уровня (список тетрадей)
//------------------------------------------------------
    function get_book_content($field_book_title)
    {
	$sql = "
-- получить страницы 1-го уровня
SELECT 
book.mlid, 
book.nid, 
-- menu_links.mlid, 
menu_links.plid, 
node.nid, 
node.title, 
field_data_body.body_value, 
field_data_field_description.field_description_value, -- метатег description
field_data_field_keywords.field_keywords_value -- метатег keywords
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid -- основная часть
LEFT JOIN field_data_field_description ON field_data_field_description.entity_id=node.nid -- метатег description
LEFT JOIN field_data_field_keywords ON field_data_field_keywords.entity_id=node.nid -- метатег keywords
WHERE 
book.mlid IN
(
SELECT menu_links.mlid FROM menu_links WHERE menu_links.plid IN -- ВЛОЖЕННЫЙ ЗАПРОС
	(SELECT menu_links.mlid FROM menu_links WHERE link_title LIKE '%".$field_book_title."%')
) 
AND node.title != 'all_text' 
ORDER BY menu_links.weight ASC
";
//echo $sql;
//echo "<br>";
	$query = $this->db->query($sql);
        return $query->result();
    }//---------------------------- end func


	function get_page($mlid)
	{
		$sql="
-- получить страницу
SELECT 
book.mlid, 
book.nid, 
-- menu_links.mlid, 
menu_links.plid, 
menu_links.depth, 
node.nid, 
node.title, 
field_data_body.body_value, 
field_data_field_description.field_description_value, -- метатег description
field_data_field_keywords.field_keywords_value -- метатег keywords
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
LEFT JOIN field_data_body ON field_data_body.entity_id=node.nid -- основная часть
LEFT JOIN field_data_field_description ON field_data_field_description.entity_id=node.nid -- метатег description
LEFT JOIN field_data_field_keywords ON field_data_field_keywords.entity_id=node.nid -- метатег keywords
WHERE 
book.mlid=".$mlid;
//echo "sql = ".$sql;
//echo "<br>";
		$query = $this->db->query($sql);
//echo "query = <pre>";
//print_r($query);
//echo "</pre>";

	        return $query->result();
	}//------------------------- end func


	function get_child_pages($mlid)
	{
		$sql="
-- получить дочернии страницы
SELECT 
book.mlid, 
book.nid, 
-- menu_links.mlid, 
menu_links.plid, 
node.nid, 
node.title 
FROM book 
LEFT JOIN menu_links ON menu_links.mlid=book.mlid 
LEFT JOIN node ON node.nid=book.nid
WHERE 
book.mlid IN
	(SELECT menu_links.mlid FROM menu_links WHERE menu_links.plid=".$mlid.") 
AND node.title != 'all_text' 
ORDER BY menu_links.weight ASC, node.title ASC";
//echo "sql = ".$sql;
//echo "<br>";
		$query = $this->db->query($sql);
	        return $query->result();
	}//------------------------- end func


//--------------------------------
// получить изображения страницы
//--------------------------------
    function get_page_images($nid)
    {
	$page_images=array();
//---------------------------------------------------------------
		$sql="
-- получить параметры прикрепленных файлов
SELECT 

	-- field_data_field_book_img.field_book_img_fid,
	field_data_field_book_img.delta as book_img_delta, 

	file_managed.filename, 
-- -----------------------------------------------
-- в сериализованном значении убрать кавычки
-- -----------------------------------------------
	-- SUBSTRING(variable.value,7) as path,
	@path:= CONCAT ('".$this->config->item('content_site')."/',
			REPLACE( 
				REPLACE(variable.value, 's:19:\"', ''),
			'\";','')
		) as path,
-- -----------------------------------------------
	CONCAT(@path,'/book_img/',file_managed.filename) as img_original,
	CONCAT(@path,'/styles/thumbnail/public/book_img/',file_managed.filename) as img_thumbnail,
	CONCAT(@path,'/styles/small/public/book_img/',file_managed.filename) as img_small,
	CONCAT(@path,'/styles/medium/public/book_img/',file_managed.filename) as img_medium,
	CONCAT(@path,'/styles/large/public/book_img/',file_managed.filename) as img_large,

	-- file_managed.uri, 
	-- file_managed.filemime, 
	-- file_managed.filesize, 
	-- file_managed.timestamp, 
	field_data_field_book_img.entity_id, 
	field_data_field_book_img.field_book_img_alt as alt,
	field_data_field_book_img.field_book_img_title as title,
	field_data_field_book_img.field_book_img_width as width,
	field_data_field_book_img.field_book_img_height as height
FROM 
	field_data_field_book_img
LEFT JOIN 
	file_managed ON file_managed.fid=field_data_field_book_img.field_book_img_fid
LEFT JOIN 
	variable ON variable.name='file_public_path'
WHERE 
	field_data_field_book_img.entity_id=".$nid."
ORDER BY 
	field_data_field_book_img.delta ASC
";
//echo "sql = ".$sql;
//echo "<br>";
	$query = $this->db->query($sql);
	if (count($query->result())>0)
	{
		$page_images['images']=$query->result();
	}
//---------------------------------------------------------------
	else
	{
		$sql="
-- получить параметры прикрепленных файлов (локальные копии)
SELECT 
-- field_data_field_content_files.entity_id, 
field_data_field_content_files.delta as content_files_delta, 
field_data_field_content_files.field_content_files_value
FROM field_data_field_content_files 
WHERE 
field_data_field_content_files.entity_id=$nid
ORDER BY field_data_field_content_files.delta ASC
";
//echo "sql = ".$sql;
//echo "<br>";
		$query = $this->db->query($sql);
		if (count($query->result())>0)
		{
			$page_images['images']=$query->result();
			$sql="
-- получить расположение прикрепленных файлов (локальные копии)
SELECT 
entity_id, 
delta, 
field_content_location_value
FROM field_data_field_content_location 
WHERE 
entity_id=$nid
ORDER BY delta ASC
";
//echo "sql = ".$sql;
//echo "<br>";
			$query = $this->db->query($sql);
			if (count($query->result())>0)
			{
				$page_images['content_location']=$query->result();
			}
		}
	}//---------------------------- end elseif

//echo "page_images = <pre>";
//print_r($page_images);
//echo "</pre>";
	if (count($page_images)>0)
	{
	        return $page_images;
	}
//---------------------------------------------------------------


    }//---------------------------- end func


	function get_breadcrumbs($mlid)
	{
		$sql="
-- получить заголовок текущего раздела и параметры родителей для строки навигации
( 
SELECT 
	menu_links.link_title, 
	menu_links.mlid, 
	@p1:=menu_links.plid as plid 
FROM 
	menu_links 
WHERE 
	menu_links.mlid =".$mlid."  AND menu_links.depth >4
) 
UNION ALL 
( 
SELECT 
	menu_links.link_title, 
	menu_links.mlid, 
	@p2:=menu_links.plid as plid
FROM 
	menu_links 
WHERE 
	menu_links.mlid =@p1  AND menu_links.depth >4
) 
UNION ALL 
( 
SELECT 
	menu_links.link_title, 
	menu_links.mlid, 
	menu_links.plid 
FROM 
	menu_links 
WHERE 
	menu_links.mlid =@p2  AND menu_links.depth >4
) 
";
//echo "sql = ".$sql;
//echo "<br>";
		$query = $this->db->query($sql);
	        return $query->result();
	}//------------------------- end func

	function get_page_list($mlid,$plid)
	{
		$sql="
--
-- получить mlid родительской страницы для строки ссылок в нижн. части страницы
-- получить mlid соседних страниц для строки ссылок в нижн. части страницы
--
SELECT 
	menu_links.link_title, 
	menu_links.mlid, 
	menu_links.plid 
FROM 
	menu_links 
WHERE 
	menu_links.plid=505 
AND menu_links.link_title !='all_text'
AND menu_links.depth >4
ORDER BY menu_links.weight, menu_links.link_title ASC
";
//echo "sql = ".$sql;
//echo "<br>";
		$query = $this->db->query($sql);
	        return $query->result();
	}//------------------------- end func

}//------------------------------ end class
?>
