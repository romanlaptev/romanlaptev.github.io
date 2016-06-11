<?php
class YaController extends Controller
{
	public function actionIndex()
	{
/*
		YaPhotoalbums::model()->deleteAll();
		$ya_photoalbums = new YaPhotoalbums;
		$ya_photoalbums->album_id="1";
		$ya_photoalbums->title="test1";
		$ya_photoalbums->save();

		$ya_photoalbums = new YaPhotoalbums;
		$ya_photoalbums->album_id="2";
		$ya_photoalbums->title="test2";
		$ya_photoalbums->save();
*/
		//$data = "";
		//$data = YaPhotoalbums::model()->findAll();
		$data = YaPhotos::model()->findAll();
		$this->render('index', array('data' => $data) );
	}
	
	public function actionGet_ya_photos()
	{
		$data = "";

		//http://api.yandex.ru/fotki/doc/operations-ref/collection-partial-lists.xml
		//Коллекции возвращаются постранично. На каждой странице может быть не более ста элементов.

		$xml = file_get_contents('http://api-fotki.yandex.ru/api/users/roman-laptev/albums/');
		$this->update_albums_table($xml);
		
		//http://api.yandex.ru/fotki/doc/operations-ref/all-photos-collection-get.xml
		$xml = file_get_contents('http://api-fotki.yandex.ru/api/users/roman-laptev/photos/');
		$this->update_photos_table($xml);
		
		//$xml = file_get_contents('http://api-fotki.yandex.ru/api/users/roman-laptev/album/427834/photos/');
		//$data = YaPhotoalbums::model()->findAll();
		$data = YaPhotos::model()->findAll();
		$this->render('ya_photos', array('data' => $data) );
	}

	private function update_albums_table($xml)
	{
/*	
		//$xml = str_replace("<f:","<f-",$xml);
echo "<pre>";	
print_r(htmlspecialchars($xml));
echo "</pre>";	
return;
*/
		$data = YaPhotoalbums::model()->deleteAll();
		$feed = new SimpleXMLElement($xml); 
/*
$namespaces = $feed->getNameSpaces(true);
echo "namespaces: <pre>";	
print_r($namespaces);
echo "</pre>";	
		//$feed->registerXPathNamespace('c', 'http://www.w3.org/2005/Atom'); 
		//$feed->registerXPathNamespace('app', 'http://www.w3.org/2007/app'); 
		//$feed->registerXPathNamespace('f', 'yandex:fotki'); 
*/
	
		foreach($feed->entry as $entry)
		{
		
 			$ya_photoalbums=new YaPhotoalbums;
 			$album_id_arr = explode (":",$entry->id);
 			$album_id = end($album_id_arr);
 			$ya_photoalbums->album_id=$album_id;
 			$ya_photoalbums->title=$entry->title;
 			$ya_photoalbums->published=$entry->published;
			$ya_photoalbums->updated=$entry->updated;
			//$ya_photoalbums->image_count='тестовая запись';

/*	
$f = $entry->children($namespaces['f']);
echo "image count: ".$children->image-count;
echo "<br>";

$children =  $entry->children('http://www.w3.org/2007/app'); 
echo "<pre>";	
print_r($children);
echo "</pre>";	
*/
 			$ya_photoalbums->save();
		}

		
	}//---------------------- end func
	
	private function update_photos_table($xml)
	{
	}//---------------------- end func
	
}
?>