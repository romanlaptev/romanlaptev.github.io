<?php
function process_export_lib( $params ){
	global $log, $db;
//echo "<pre>";
//print_r ($params);
//echo "</pre>";
/*
	$sql = "SELECT nid,tid FROM taxonomy_index";
	$result = $db->query($sql);
	$result->setFetchMode(PDO::FETCH_OBJ);
	$fresult = $result->fetchAll();

echo "<pre>";
print_r ($fresult);
echo "</pre>";
return;
*/

//echo "SQL: " . $_REQUEST["export"]["drupal_book_to_page"]["sql"][0];
	$list_sql = array();
	$list_sql["get_nodes"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_nodes"];
	//$list_sql["get_attach_pictures"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_attach_pictures"];
	//$list_sql["get_node_termins"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_node_termins"];
	//$list_sql["get_child_pictures"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_child_pictures"];
	//$list_sql["get_child_pictures_info"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_child_pictures_info"];
	//$list_sql["get_child_pictures_termins"] = $_REQUEST["export"]["drupal_book_to_page"]["sql"]["get_child_pictures_termins"];
	
	$data = array();

	switch ($params["export_format"]){
		case "xml":
			$data["test"] = get_db_data( $list_sql["get_nodes"] );
echo "<pre>";
print_r($data);
echo "</pre>";
			//export_to_xml( $filename, $data );
		break;
		case "json":
			//export_to_json( $filename, $data );
		break;
		case "wxr":
		break;
		case "html":
			/*
			$data["nodes"] = get_db_data( $list_sql["get_nodes"] );
			//$data["attach_pictures"] = get_db_data( $list_sql["get_attach_pictures"] );
			
			$data["child_pictures"] = get_db_data( $list_sql["get_child_pictures"] );
			$data["child_pictures_info"] = get_db_data( $list_sql["get_child_pictures_info"] );
			$data["child_pictures_termins"] = get_db_data( $list_sql["get_child_pictures_termins"] );
			export_to_html( $params, $data );
			 */
		break;
	}//end switch
	
	//write_wxr( $filename, $xml_data );
}//end process_export_gravura()

function get_db_data( $sql ){
	global $log, $db;
	$data = array();
	$result = $db->query($sql);
	$result->setFetchMode(PDO::FETCH_OBJ);
	$data = $result->fetchAll();
//echo "<pre>";
//print_r($data);
//echo "</pre>";
	return $data;
}//end function get_db_data()


function export_to_html( $params, $data ){
	global $log;
	global $page;
//echo  "dirname:  " .dirname( $params["template"] );
//echo "<br>";
//echo  "directory:  " .__DIR__;
//echo "<br>";

	function get_template( $params, $node ){
		global $log;
		$tpl_name = "../".$params["template_page"]; //стандартный шаблон страницы
		
		$nid = $node->nid;
		$tpl_dir = dirname( $params["template_page"] );
		
		$alias = $node->alias;
		if( count($alias) > 0){
			$test_tpl_name = "../".$tpl_dir."/".$alias;
			if( is_file( $test_tpl_name ) ){
				$tpl_name = $test_tpl_name;
			} else {
				$test_tpl_name = "../".$tpl_dir."/"."node-".$nid.".tpl.html";
				if( is_file( $test_tpl_name ) ){
					$tpl_name = $test_tpl_name;
				}
			}
		}
		//return $tpl_name;
		$page_tpl = file_get_contents( $tpl_name );
		if(!$page_tpl){
			$log .= "<div><span class='error'>read error template </span> $tpl_name</div>\n";
		} else {
//echo htmlspecialchars( $page_tpl);
			return $page_tpl;
		}
	}//end get_template()
	
	function get_page_filename( $params, $node ){
		$nid = $node->nid;
		$filename = "node-".$nid.".html"; //стандартное название файла страницы
		$alias = $node->alias;
		if( count($alias) > 0){
			$filename = $alias;
		}
		return $filename;
	}//end get_page_filename()
	
	function get_child_pictures( $nid, $data  ){
		//$result=array();
		$result=[];
		for( $n = 0; $n < count($data); $n++ ){
			if( $data[$n]->parent_page_id == $nid){
//echo $n, $data[$n]->parent_page_id, $nid;
//echo "<br>";
//echo $data[$n]->picture_info;
//echo "<br>";
				$result[]=$data[$n];
			}
		}//next
		
		return $result;
	};//end function get_child_pictures()
	
	function add_child_pictures_info( $child_pictures, $child_pictures_info ){
		global $log;
		for( $n1=0; $n1 < count($child_pictures); $n1++){
			$picture_info = [];
			for( $n2=0; $n2 < count( $child_pictures_info ); $n2++){
				if( $child_pictures[$n1]->picture_page_nid == $child_pictures_info[$n2]->picture_page_nid ){
					//parse JSON
					$json_string = "{".$child_pictures_info[$n2]->picture_info."}";
					$obj = json_decode ($json_string);
					if( json_last_error() == JSON_ERROR_NONE ){
//echo "<pre>";
//print_r( $obj );
//echo "</pre>";
						foreach( $obj as $key=>$v ){
							$picture_info[$key] = $v;
						}
					} else {
						$log .= "<p><span class='error'>json_last_error() = </span>".json_last_error()."</p>";
						switch (json_last_error()) {
							case JSON_ERROR_DEPTH:
								$log .= "<p class='error'>- Достигнута максимальная глубина стека</p>";
							break;

							case JSON_ERROR_STATE_MISMATCH:
								$log .= "<p class='error'>- Некорректные разряды или не совпадение режимов</p>";
							break;

							case JSON_ERROR_CTRL_CHAR:
								$log .= "<p class='error'>- Некорректный управляющий символ</p>";
							break;

							case JSON_ERROR_SYNTAX:
								$log .= "<p class='error'>- Синтаксическая ошибка, не корректный JSON</p>";
							break;

							case JSON_ERROR_UTF8:
								$log .= "<p class='error'>- Некорректные символы UTF-8, возможно неверная кодировка</p>";
							break;
						}//end switch
						$picture_info[] = $child_pictures_info[$n2]->picture_info;
					}
				}
				
			}//next
			$child_pictures[$n1]->picture_info = $picture_info;
		}//next
		return $child_pictures;
	}//end  function add_child_pictures_info()

	function add_child_pictures_termins( $child_pictures, $child_pictures_termins ){
		global $log;
		for( $n1=0; $n1 < count($child_pictures); $n1++){
			$picture_termins = [];
			for( $n2=0; $n2 < count( $child_pictures_termins ); $n2++){
//echo $n2, $child_pictures_termins[$n2]->termin_key, strlen($child_pictures_termins[$n2]->termin_key);
//echo "<br>";
				if( $child_pictures[$n1]->picture_page_nid == $child_pictures_termins[$n2]->picture_page_nid ){
					$key = $child_pictures_termins[$n2]->termin_key;
					if( strlen($key) == 0){
						$key = $child_pictures_termins[$n2]->termin_name;
					}
					$value = $child_pictures_termins[$n2]->termin_value;
					$picture_termins[$key] = $value;
				}
			}//next
			$child_pictures[$n1]->picture_termins = $picture_termins;
		}//next
		return $child_pictures;
	}//end  function add_child_pictures_termins()

	function tpl_add_child_pictures( $params, $child_pictures){
		global $log;
		$tpl_name = "../".$params["template_picture"];
		$tpl = file_get_contents( $tpl_name );
		if(!$tpl){
			$log .= "<div><span class='error'>read error template </span> $tpl_name</div>\n";
		} else {
//echo htmlspecialchars( $tpl);
		}
		
		for( $n = 0; $n < count($child_pictures); $n++){
			$picture_html = $tpl;
			$picture_html = str_replace ('{site_content_alias}', $child_pictures[$n]->picture_termins["site_content_alias"], $picture_html);
			$picture_html = str_replace ('{galleries_path}', $child_pictures[$n]->picture_termins["galleries_path"], $picture_html);
			$picture_html = str_replace ('{gallery_name}', $child_pictures[$n]->picture_termins["gallery_name"], $picture_html);
			$picture_html = str_replace ('{preview_medium_path}', $child_pictures[$n]->picture_termins["preview_medium_path"], $picture_html);
			$picture_html = str_replace ('{preview_thumbnail_path}', $child_pictures[$n]->picture_termins["preview_thumbnail_path"], $picture_html);
			$picture_html = str_replace ('{zoom_path}', $child_pictures[$n]->picture_termins["zoom_path"], $picture_html);
			
			$picture_html = str_replace ('{filename}', $child_pictures[$n]->filename, $picture_html);
			$picture_html = str_replace ('{file}', $child_pictures[$n]->file, $picture_html);

			$picture_html = str_replace ('{author}', $child_pictures[$n]->picture_info["author"], $picture_html);
			$picture_html = str_replace ('{name}', $child_pictures[$n]->picture_info["name"], $picture_html);
			$picture_html = str_replace ('{date}', $child_pictures[$n]->picture_info["date"], $picture_html);
			$picture_html = str_replace ('{tech}', $child_pictures[$n]->picture_info["tech"], $picture_html);

			$html .= $picture_html;
		}//next
		
		return $html;
	}//end function tpl_add_child_pictures()
	
	
	$foldername = $params["foldername"]; 
	if( !is_dir( $foldername ) ){
		$mode = 0777;
		$recursive = true;
		if (mkdir ($foldername, $mode, $recursive)){
			$log .= "<div><span class='ok'>mkdir</span> $foldername </div>\n";
		} else {
			$log .= "<div><span class='error'>cant mkdir </span> $foldername</div>\n";
		}
	} else {
		$log .=  "<p class='ok'>Folder $foldername is exist...</p>";
	}

	for( $n = 0; $n < count($data["nodes"]); $n++ ){
	//for( $n = 0; $n < 2; $n++ ){
if( $data["nodes"][$n]->nid == 22){
		$page_tpl = get_template( $params, $data["nodes"][$n] );
		$filename = $foldername."/".get_page_filename( $params, $data["nodes"][$n] );
echo $n, $data["nodes"][$n]->nid, $data["nodes"][$n]->title, $data["nodes"][$n]->alias, $filename;
echo "<br>";

		$page = $page_tpl;
		
		//get node info
		$page = str_replace ('{title}', $data["nodes"][$n]->title, $page);
		$page_title = $data["nodes"][$n]->page_title;
		if( count($page_title) == 0 ){
			$page_title = $data["nodes"][$n]->title;
		}
		$page = str_replace ('{page_title}', $page_title, $page);
		
		$page = str_replace ('{nid}', $data["nodes"][$n]->nid, $page);
		//$page = str_replace ('{alias}', $data["nodes"][$n]->alias, $page);
		$page = str_replace ('{text}', $data["nodes"][$n]->text, $page);
		
		$child_pictures = get_child_pictures( $data["nodes"][$n]->nid, 
							$data["child_pictures"] );
		if( count($child_pictures) > 0 ){
			$child_pictures = add_child_pictures_info( $child_pictures,
													$data["child_pictures_info"]
													);
			$child_pictures = add_child_pictures_termins( $child_pictures,
													$data["child_pictures_termins"]
													);
//echo "<pre>";
//print_r($child_pictures);
//echo "</pre>";
/*
    [0] => stdClass Object
        (
            [parent_page_id] => 22
            [picture_page_nid] => 212
            [filename] => p0007-2.jpg
[file] => p0007-2            
            [picture_info] => Array
                (
                    [author] => Мастер игральных карт
                    [name] => Дама с зеркалом
                    [tech] => Резцовая гравюра
                    [date] => 1440 - 1450
                )

            [picture_termins] => Array
                (
                    [site_content_alias] => site-content
                    [galleries_path] => book_history_engraving
                    [gallery_name] => 02.german_engraving
                    [zoom_path] => zoom
                    [preview_thumbnail_path] => thumbnail
                    [preview_medium_path] => medium
                )

        )
*/
			$pictures = tpl_add_child_pictures( $params, $child_pictures);
			$page = str_replace ('{pictures}', $pictures, $page);
		}
		
//echo "test<pre>";
//echo htmlspecialchars( $page );
//echo "</pre>";

		$num_bytes = file_put_contents ($filename, $page );
		if ($num_bytes > 0){
			$log .=  "<p class='ok'>Write ".$num_bytes." bytes in $filename </p>";
		} else {
			$log .= "<p class='error'>Write error in ".$filename. "</p>";
		}
}	
	}//next

}//end export_to_html()
?>