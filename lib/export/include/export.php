<?php
//echo "<pre>";
//print_r ($_REQUEST);
//echo "</pre>";

$log = "";
$res = validate();

if( $res ) {
	$log .=   "continue.....";
	$db_conn = $_REQUEST["export"][ "db_conn"  ];
	switch ($db_conn) {
		case "mysql":
			$host = $_REQUEST["export"]["mysqldb_host"];
			$db_user = $_REQUEST["export"]["mysqldb_user"];
			$pwd = $_REQUEST["export"]["mysqldb_pwd"];
			$db_name = $_REQUEST["export"]["db_name"];
			
			$link = mysql_connect($host, $db_user, $pwd) or die( "Сервер базы данных ".$host." не доступен" );
			
			//mysql_query('SET NAMES utf8');
			
			mysql_set_charset("utf8", $link);
			$charset = mysql_client_encoding($link);
			//printf ("current character set is %s\n", $charset);
			
			$db = mysql_select_db($db_name) or die( "База данных ".$db_name." не доступна" );
			process_export_mysql();
/*
//test connection
			$sql = "SHOW TABLES";
			$res = mysql_query($sql) or die( "Ошибка при выполнении запроса: ".mysql_error() );

			for( $n = 0; $n < mysql_num_rows ($res); $n++)
			{
				$row = mysql_fetch_row($res);
echo "<pre>";
print_r ($row);
echo "</pre>";
			}//next row
*/
		break;
		
		case "sqlite":
			$params=array();
			$params["sqlite_path"] = $_REQUEST["export"]["sqlite_path"]; 
			$params["db_name"] = $_REQUEST["export"]["db_name"]; 
			$params["export_format"] = $_REQUEST["export"]["format"];
			$params["savein"] = $_REQUEST["export"]["savein"];

			if( $_REQUEST["export"]["savein"] === "file"){
				$params["filename"] = $_REQUEST["export"]["filename"];
			}
			
			if( $_REQUEST["export"]["savein"] === "folder"){
				$params["foldername"] = $_REQUEST["export"]["foldername"];
			}
			
			//if( !empty($_REQUEST["export"]["html_tpl"]["page"]) ){
				//$params["template_page"] = $_REQUEST["export"]["html_tpl"]["page"];
			//}
			//if( !empty($_REQUEST["export"]["html_tpl"]["picture"]) ){
				//$params["template_picture"] = $_REQUEST["export"]["html_tpl"]["picture"];
			//}

			process_export_sqlite();
		break;
	}// end switch
	
}
else
{
	$log .=  "<span class='text-danger'>error....</span>";
}


function validate() {
	global $log;

	$test_var = "db_name";
	$text = "<p>error, <b>".$test_var."</b> is empty....</p>";
	if( empty( $_REQUEST["export"][$test_var] ) ){
		$log .=  "<p class='text-danger'>".$text."</p>";
		return  false;
	}
	
	$db_conn = $_REQUEST["export"][ "db_conn"  ];
	switch ($db_conn) {
		case "mysql":
			$list_var[0][0] = "mysqldb_host";
			$list_var[0][1] = "<p>error, <b>".$list_var[0][0]."</b> is empty....</p>";

			$list_var[1][0] = "mysqldb_user";
			$list_var[1][1] = "<p>error, <b>".$list_var[1][0]."</b> is empty....</p>";

			$list_var[2][0] = "mysqldb_pwd";
			$list_var[2][1] = "<p>error, <b>".$list_var[2][0]."</b> is empty....</p>";

			$list_var[3][0] = "mysqldb_name";
			$list_var[3][1] = "<p>error, <b>".$list_var[3][0]."</b> is empty....</p>";

			for ( $n1=0; $n1 < sizeof($list_var); $n1++ )
			{
				$test_var = $_REQUEST[ $list_var[$n1][0] ];
				if( empty( $test_var ) )
				{
					$log .=  "<span class='text-danger'>".$list_var[$n1][1]."</span>";
					return  false;
				}
			}
			return  true;
		break;
		
		case "sqlite":

			$test_var = "sqlite_path";
			$text = "<p>error, <b>".$test_var."</b> is empty....</p>";
			if( empty( $_REQUEST["export"][$test_var] ) ){
				$log .=  "<span class='text-danger'>".$text."</span>";
				return  false;
			}
			
			if( $_REQUEST["export"]["savein"] === "file"){
				$test_var = "filename";
				$text = "<p>error, <b>".$test_var."</b> is empty....</p>";
				if( empty( $_REQUEST["export"][$test_var] ) ){
					$log .=  "<span class='text-danger'>".$text."</span>";
					return  false;
				}
			}
			
			if( $_REQUEST["export"]["savein"] === "folder"){
				$test_var = "folderename";
				$text = "<p>error, <b>".$test_var."</b> is empty....</p>";
				if( empty( $_REQUEST["export"][$test_var] ) ){
					$log .=  "<span class='text-danger'>".$text."</span>";
					return  false;
				}
			}

			return  true;
		break;
	}// end switch

	return  false;
	
}//end validate()


function process_export_mysql()
{
	global $log, $db, $db_name;

	$savein = $_REQUEST["savein"];
	if( empty( $_REQUEST[ "filename"  ] ) )
	{
		$log .=  "<p class='text-danger'>error, <b>filename</b> is empty....</p>";
		return  false;
	}
	$filename = $_REQUEST['filename'];
	
	if( $savein == "folder")
	{
		$filename = $_REQUEST['foldername'];
	}
	$format = $_REQUEST['format'];

	switch($db_name )
	{
		case "art":
			require_once dirname(__FILE__)."/process_export_art.php";
			process_export_art($savein,
								$filename,
								$format
			);
		break;

		case "lib":
		break;
		//
		//case "gravura":
		//break;
		
		//case "mydb":
		//break;
		
		//case "photoalbum":
		//break;
		
		//case "webpad":
		//break;
		
		//case "wp":
		//break;
		default:
			$log .=  "<p class='error'>error, no process export for ".$db_name."</p>";
	}// end switch

}//end process_export_mysql()



function process_export_sqlite(){
	global $log, $params, $db;

	$db = new PDO( $params["sqlite_path"] ) or die("Could not open database " . $params["sqlite_path"] );
	$db_name = $params["db_name"];
//echo dirname(__FILE__)."/process_export_$db_name.php";

	require_once dirname(__FILE__)."/process_export_$db_name.php";
	$process_func = "process_export_".$db_name;
	$process_func( $params );
	
}//end process_export_sqlite()

?>
<div class="panel panel-primary">
	<div class="panel-heading">
		<h1>Export log</h1>
	</div>
	<div class="panel-body">
<?php 
	if( !empty( $log ) ){
echo $log;
	}
?>
	</div>
</div>