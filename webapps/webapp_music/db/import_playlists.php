<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);

chdir ("../");
//echo getcwd();
//echo "<br>";

// Define default settings.
define('DRUPAL_ROOT', getcwd() );
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Bootstrap Drupal.
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);


//===================== INIT vars
$_vars=array();
$_vars["nodeType"] = "playlist";
$_vars["nodeTitle"] = "test6";


echo "PHP version: ".phpversion()."\n";
echo "SAPI name: ".php_sapi_name();
echo "\n";
echo "PHP_SAPI: ".PHP_SAPI;
echo "\n";


//$node = node_load(110);
//echo "<pre>";
//print_r($node);
//echo "</pre>";
//exit;

//--------------------------- create test node (Drupal7)
$node = new stdClass();

$node->uid = 1; // author id 
$node->type = $_vars["nodeType"];
$node->sticky = 0;//?

$node->language = LANGUAGE_NONE;
//$node->language = 'ru';

$node->title = $_vars["nodeTitle"];

/*
$body_text =  "Body";
$node->body[ $node->language][0]['value'] = $body_text;
$node->body[ $node->language][0]['summary'] = text_summary($body_text);
$node->body[ $node->language][0]['format'] = 'filtered_html';
*/
$node->status = 1;     // public
//$node->revision = 1;
//$node->promote = ;

$node->created = time();
$node->changed = time();

//$node->path = "test1";
//$node->log = "added $i node";
//$node_terms = array();

//CCK fields
$node->field_taxonomy_alpha[ LANGUAGE_NONE ][]["tid"] = 94;//termin "M"

$node->field_img_cover[ LANGUAGE_NONE ][]["value"] = "/music/M/Metallica/covers/Kill_Em_All.jpg";
$node->field_img_cover[ LANGUAGE_NONE ][]["value"] = "/music/M/Metallica/covers/Kill_Em_All.jpg";

$node->field_file_location[ LANGUAGE_NONE ][]["value"] = "/music/0_playlist/metallica.json";

$node->field_country[ LANGUAGE_NONE ][]["tid"] = 116;//termin "USA"
$node->field_music_genre[ LANGUAGE_NONE ][]["tid"] = 122;//termin "Rock"
$node->field_music_styles[ LANGUAGE_NONE ][]["tid"] = 17;//termin "thrash"
$node->field_music_format[ LANGUAGE_NONE ][]["tid"] = 120;//termin "studio album"
$node->field_music_artist[ LANGUAGE_NONE ][]['value'] = "test artist";

$node->field_related_links[ LANGUAGE_NONE ][]["value"] = '<a href="https://music.yandex.ru/users/roman-laptev/playlists/1019" class="btn btn-info" target="_blank">yandex music</a>';
//&lt;a href=&quot;https://music.yandex.ru/users/roman-laptev/playlists/1019&quot; class=&quot;btn btn-info&quot; target=&quot;_blank&quot;&gt;yandex music&lt;/a&gt

$node->field_music_track[ LANGUAGE_NONE ][]["value"] = '<a data-type="local-file" href="/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3">Motorbreath</a>';
//[safe_value] => &lt;a data-type=&quot;local-file&quot; href=&quot;/music/M/Metallica/1983_Kill_em_All/03_Motorbreath.mp3&quot;&gt;Motorbreath&lt;/a&gt;

$node->field_music_track[ LANGUAGE_NONE ][]["value"] = '<a data-type="local-file" href="/music/M/Metallica/1983_Kill_em_All/04_Jump_In_The_Fire.mp3">Jump_In_The_Fire</a>';
//[safe_value] => &lt;a data-type=&quot;local-file&quot; href=&quot;/music/M/Metallica/1983_Kill_em_All/04_Jump_In_The_Fire.mp3&quot;&gt;Jump_In_The_Fire&lt;/a&gt;

/*
    [book] => Array
        (
            [mlid] => 618
            [nid] => 110
            [bid] => 110
*/
node_save($node);

//=================================================================================


?>
