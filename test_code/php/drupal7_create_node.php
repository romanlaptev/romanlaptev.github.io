<?php
//sftp://root@vbox1/home/www/sites/music/cms/music_drupal/scripts/drupal_create_node.php

error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 1);


chdir ("../");
//echo getcwd(); // current directory-- /home/www/sites/music/cms/music_drupal/ !!!!!!!!!!!!!!!
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
//$node->{$field_name}[LANGUAGE_NONE][] = array('tid' => $tid);
$node->field_music_artist[ LANGUAGE_NONE ][]['value'] = "test artist";

$node->field_taxonomy_alpha[ LANGUAGE_NONE ][]["tid"] = 94;//termin "M"

$node->field_img_cover[ LANGUAGE_NONE ][]["value"] = "/music/M/Metallica/covers/Kill_Em_All.jpg";
$node->field_img_cover[ LANGUAGE_NONE ][]["value"] = "/music/M/Metallica/covers/Kill_Em_All.jpg";

$node->field_file_location[ LANGUAGE_NONE ][]["value"] = "/music/0_playlist/metallica.json";

$node->field_country[ LANGUAGE_NONE ][]["tid"] = 116;//termin "USA"


node_save($node);


//=================================================================================


?>
