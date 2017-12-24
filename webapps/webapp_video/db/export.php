<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

//echo "<pre>";
//print_r($_SERVER);
//print_r($_REQUEST);
//print_r($_FILES);
//echo "</pre>";
//exit();

$log = "";

$export_sql = array(
"node" => "SELECT nid, vid, type, title, created, changed, status FROM node", 
//"node_revision" => "SELECT nid, vid, title, status, comment FROM node_revision", 
"node_type" => "SELECT type, name, orig_type FROM node_type", 

"taxonomy_vocabulary" => "SELECT vid, name, machine_name FROM taxonomy_vocabulary", 
"taxonomy_term_hierarchy" => "SELECT tid, parent FROM taxonomy_term_hierarchy",
"taxonomy_index" => "SELECT nid, tid FROM taxonomy_index",
"taxonomy_term_data" => "SELECT tid, vid,  name FROM taxonomy_term_data",

"menu_links" => "SELECT * FROM menu_links",
"book" =>  "SELECT * FROM book",

"field_data_body_video" =>"SELECT 
field_data_body.entity_id,
field_data_body.body_value
FROM field_data_body 
LEFT JOIN node ON node.nid=field_data_body.entity_id
WHERE node.type='video'",

"field_data_body" =>"SELECT 
field_data_body.entity_id,
field_data_body.body_value
FROM field_data_body 
LEFT JOIN node ON node.nid=field_data_body.entity_id
WHERE node.type != 'video'",

"field_data_field_filename" => "SELECT entity_id, field_filename_value FROM field_data_field_filename",
"field_data_field_subfolder" => "SELECT entity_id, field_subfolder_value FROM field_data_field_subfolder",
"field_data_field_img_cover" => "SELECT entity_id, field_img_cover_value FROM field_data_field_img_cover",
"field_data_field_roles" => "SELECT entity_id, field_roles_value FROM field_data_field_roles",
"field_data_field_year" => "SELECT entity_id, field_year_value FROM field_data_field_year",
"field_data_field_taxonomy" => "SELECT entity_id, field_taxonomy_tid FROM field_data_field_taxonomy",
"field_data_field_taxonomy_alpha" => "SELECT entity_id, field_taxonomy_alpha_tid FROM field_data_field_taxonomy_alpha"
);

if(!empty( $_REQUEST['action'] ) ){
	$action = $_REQUEST['action'];
	switch ($action)
	{
		case "export":
			process_export();
		break;
	}
}

function process_export()
{
	global $log, $db, $filename;

	if( empty ($_REQUEST['filename']) )
	{
		return $log = "<div class='alert alert-danger'>filename is empty...</div>";
	}

	if (empty($_REQUEST['sqlite_path']))
	{
		return $log = "<div class='alert alert-danger'>sqlite_path is empty...</div>";
	}

	$sqlite_path = $_REQUEST['sqlite_path'];
	$format = $_REQUEST['format'];
	$exportType = $_REQUEST['exportType'];

	$filename = $_REQUEST['filename'];
	//$foldername = $_REQUEST['foldername'];
	//if( $exportType == "folder")
	//{
		//$filename = $foldername;
	//}

	$data = get_db_data( $sqlite_path );

	switch ($format)
	{
		case "xml":
			export_to_xml( $filename, $data );
		break;
		case "json":
			export_to_json( $filename, $data );
		break;
	}

}//end process_export()


function get_db_data( $sqlite_path )
{
	global $export_sql;
	
	function run_sql($db,  $query)
	{
		$result = $db->query($query);
		$result->setFetchMode(PDO::FETCH_OBJ);
		$result_data = array();
		
		foreach ($result as $row )
		{
			$result_data[] = $row;
		}//next
		
		return $result_data;
	}//end get_table()


	$db = new PDO( $sqlite_path ) or die("Could not open database");
	$data = array();
	
	foreach( $export_sql as $key=>$sql )
	{
		$node = run_sql( $db,  $sql);
		$data[ $key  ] = $node;
	}
	return $data;
}//end get_db_data()

function export_to_xml( $filename, $data )
{
	global $log;
	global $export_sql;

	function form_table( $data, $tablename )
	{
		
		$xml = "";
		$xml .= "\t<table name='$tablename'>\n";
		foreach ($data as $num=>$row )
		{
			$xml .=  "\t\t<record num=\"$num\">\n";
			foreach ($row as $key=>$node )
			{
				$xml .=  "\t\t\t<column name='$key'>";
if( $key == "created" || $key == "changed")
{
	$node = date('d-M-Y H:i:s', $node);
}
				$xml .=  htmlspecialchars ($node);
				$xml .=  "</column>\n";
			}//end foreach
			$xml .= "\t\t</record>\n";
		}//end foreach
		$xml .= "</table>\n";
		return $xml;
	}//end add_table()


	$tablename = array_keys($data);

	if( $_REQUEST['exportType'] == "file" )
	{
		$xml="";
		$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";

		$xml .="<structure_schemas>\n";
		$xml .="\t<database>\n";
		foreach( $export_sql as $key=>$sql )
		{
			$xml .="\t\t<table name='$key'></table>\n";
		}
		$xml .="\t</database>\n";
		$xml .="</structure_schemas>\n";
				
		$xml .="<database name='video'>\n";
		for( $n1 = 0; $n1 < count( $tablename ); $n1++)
		{
			$xml .= form_table( $data[ $tablename[$n1] ], $tablename[$n1] );
		}
		$xml .="</database>\n";
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";
		if ( !empty($xml) )
		{
			header('Content-Type:  application/xhtml+xml');
			header('Content-Disposition: attachment; filename='.$filename.'');
			header('Content-Transfer-Encoding: binary');
			//header('Content-Length: '.strlen($xml));
			echo $xml;
exit();
		}

	}

/*
	if( $_REQUEST['exportType'] == "folder" )
	{
		if ( !file_exists($filename)) 
		{
				if ( mkdir( $filename, 0, true ) )
				{
$log .= "<div class='alert alert-success'>Create folder <b>".$filename."</b> success...</div>";
				} else {
$log .= "<div class='alert alert-danger'>Can not create <b>".$filename."</b> </div>";
				}
		}
		else
		{
$log .= "<div class='alert alert-warning'>Folder <b>".$filename."</b> is exists</div>";
		}

		$fs_path = $filename;
		for( $n1 = 0; $n1 < count( $tablename ); $n1++)
		{
			$xml="";
			$xml .= "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
			$xml .="<root>\n";
			$xml .= form_table( $data[ $tablename[$n1] ], $tablename[$n1] );
			$xml .="</root>\n";
//echo "<pre>";
//echo htmlspecialchars($xml);
//echo "</pre>";
			$filename =$tablename[$n1].".xml" ;
			$num_bytes = file_put_contents ($fs_path."/".$filename, $xml);
			if ($num_bytes > 0)
			{
$log .= "<div class='alert alert-success'>Write <b>".$num_bytes."</b> bytes in <b>".$fs_path."/".$filename."</b></div>";
			}
			else
			{
$log .= "<div class='alert alert-danger'>Error write in <b>".$fs_path."/".$filename."</b></div>";
			}
		}//next

	}
*/

}//end function export_to_xml()

function export_to_json ( $filename, $data )
{
	global $log;
	$tablename = array_keys($data);
	//$tablename = array("node");

	$json_arr = array();
	if( $_REQUEST['exportType'] == "file" )
	{
		for( $n2 = 0; $n2 < count( $tablename ); $n2++)
		{
			$table_name = $tablename[$n2];
			//$table_json = array();
			for( $n1=0; $n1 < count( $data[ $table_name ] ); $n1++ )
			{
				//$table_json[ $table_name ][] = json_encode( $data[ $table_name ][$n1], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE );
				$json_arr[ $table_name ][] = $data[ $table_name ][$n1];
			}
		}
		$json = json_encode( $json_arr );
//echo "<pre>";
//print_r( $json );
//echo "</pre>";
		if ( !empty($json) )
		{
			header('Content-Type:  application/json');
			header('Content-Disposition: attachment; filename='.$filename.'');
			header('Content-Transfer-Encoding: binary');
			header('Content-Length: '.strlen($json));
			echo $json;
exit();			
		}
	}

	if( $_REQUEST['exportType'] == "folder" )
	{
		if ( !file_exists($filename)) 
		{
			if ( mkdir( $filename, 0, true ) )
			{
$log .= "<p><span class='ok'>Create folder </span>".$filename."</p>";
			}
			else
			{
$log .= "<p><span class='error'>Cant create </span>".$filename."</p>";
			}
		}
		else
		{
$log .= "<p>Folder <span class='ok'>$filename exists </span></p>";
		}

		$fs_path = $filename;
		for( $n2 = 0; $n2 < count( $tablename ); $n2++)
		{
			$table_name = $tablename[$n2];
			$json_arr = array();
			for( $n1=0; $n1 < count( $data[ $table_name ] ); $n1++ )
			{
				$json_arr[ $table_name ][] = $data[ $table_name ][$n1];
			}
			$json = json_encode( $json_arr );
/*
echo "<pre>";
print_r( $json_arr );
echo "</pre>";

echo "<pre>";
print_r( $json );
echo "</pre>";
*/
			if ( !empty($json) )
			{
				$filename =$tablename[$n2].".json" ;
				$num_bytes = file_put_contents ($fs_path."/".$filename, $json);
				if ($num_bytes > 0)
				{
$log .= "<p><span class='ok'>Write </span>".$num_bytes." bytes  in ".$fs_path."/".$filename."</p>";
				}
				else
				{
$log .= "<p><spanp class='error'>Write error in xml/</span>".$fs_path."/".$filename."</p>";
				}
			}

		}//end for

	}


}//end export_to_json()

?>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<link rel="stylesheet" href="../css/bootstrap336.min.css"/>
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h2>Export Drupal database  to XML or JSON file</h2>
		</div>

		<div id='form' class="panel panel-primary">
			<div class="panel-heading">
				<h3>Параметры экспорта</h3>
			</div>
			<div class="panel-body">
<form method='post' name='form_export' action=''>
	<b>sqlite_path:</b>
		<input class='form-control' type=text name=sqlite_path size=60 
value='sqlite:/home/www/sites/video/cms/db/video.sqlite'/>
	<br>

	<div class='panel'>
		<b>Export type, save data in:</b>
		<div>
			<input type="radio" name='exportType' value='file' checked='checked'>File
			<input type="text" class="form-control" name='filename' value='export_video.xml'/>
		</div>
<!--		
		<div>
			<input type="radio" name='exportType' value='folder'>Folder <small>(one table in one file)</small>
			<input type="text" class="form-control" name='foldername' value='/home/www/sites/video/export_video'/>
		</div>
-->		
	</div>

	<div class='panel'>
		<b>format</b>
		<br>
		<ul>
			<li><input type=radio name='format' value='xml' checked='checked'>xml</li>
			<li><input type=radio name='format' value='json'>json</li>
		</ul>
	</div>

	<div class='panel'><b>action</b><br>
		<ul>
			<li><input type="radio" name="action" value="export" checked="checked">export</li>
		</ul>
	</div>
	
	<input class='form-control' type='submit' value='submit'>
</form>
				
			</div>
		</div>

		<div id='log' class="panel panel-info">
			<div class="panel-heading">
				<h3>Log panel</h3>
			</div>
			<div class="panel-body">
				<?php echo $log; ?>
			</div>
		</div>

	</div><!-- end container -->
</body>
</html>

