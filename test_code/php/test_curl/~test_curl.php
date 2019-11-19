<?php
//header("Content-Type: text/html; charset=utf-8");
//XML send post php

//$url ='http://toool.vm:803/api/update_group/';

//Изменить цену товара
$url ='http://toool.vm/api/update_price/';
$text = '<?xml version="1.0" encoding="UTF-8"?>
<V8Exch:_1CV8DtUD xmlns:V8Exch="http://www.1c.ru/V8/1CV8DtUD/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:v8="http://v8.1c.ru/data">
        <V8Exch:Data>
			<Товары Код="00000025983" Цена="126" ВНаличииУПоставщика="0"></Товары>
        </V8Exch:Data>
</V8Exch:_1CV8DtUD>';

//удалить товары
//$url ='http://toool.vm:803/api/delete_product/';
/*
$text = '<?xml version="1.0" encoding="UTF-8"?>
<V8Exch:_1CV8DtUD xmlns:V8Exch="http://www.1c.ru/V8/1CV8DtUD/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:v8="http://v8.1c.ru/data">
	<V8Exch:Data>
		<Товары Код="25982"/>
<!-- Ручной инструмент - Малярный инструмент -Кисти - Кисть плоская STAYER 0101-020 (UNIVERSAL-STANDARD)-->
	</V8Exch:Data>
</V8Exch:_1CV8DtUD>';
*/

//Добавление/обновление товаров
//$url ='http://toool.vm:803/api/update_product/';
/*
$text = '<?xml version="1.0" encoding="UTF-8"?>
<V8Exch:_1CV8DtUD xmlns:V8Exch="http://www.1c.ru/V8/1CV8DtUD/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:v8="http://v8.1c.ru/data">
	<V8Exch:Data>
		<Товары 
Ссылка="STAYER 0101-020 (UNIVERSAL-STANDARD) Кисть плоская-плоская" 
Родитель="" 
ЭтоГруппа="ложь" 
Код="00000025983" 
Наименование="Кисть плоская-плоская-плоская STAYER 0101-020 (UNIVERSAL-STANDARD)" 
Title="" 
Артикул="00615" 
БазоваяЕдиницаИзмерения="шт" 
ДополнительноеОписаниеНоменклатуры="Кисть плоская STAYER 0101-020 (UNIVERSAL-STANDARD)&#xA;Это кисть малярная, которая используется во время работ с олифой, древесным маслом, малярными красками и другими ЛКМ&#xA;Особенности:&#xA;• Деревянная ручка&#xA;• Металлический бандаж &#xA;• Натуральная щетина&#xA;Купить Кисть плоская STAYER 0101-020 (UNIVERSAL-STANDARD) можно как за наличный, так и безналичный расчет&#xA;В интернет-магазине Город Инструмента вы сможете посмотреть фотографии STAYER 0101-020 (UNIVERSAL-STANDARD), сравнить  его технические характеристики, почитать описания и отзывы&#xA;Так же Вы сможете получить техническую консультацию и купить по привлекательной цене STAYER 0101-020 (UNIVERSAL-STANDARD)" 
ЕдиницаДляОтчетов="шт" 
ЕдиницаХраненияОстатков="шт" 
Комментарий="" 
Комплект="ложь" 
Набор="ложь" 
НаименованиеПолное="Кисть ппппппппплоская STAYER 0101-020 (UNIVERSAL-STANDARD)" 
НоменклатурнаяГруппа="Кисти" 
НоменклатурнаяГруппаКод="000000772" 
НоменклатурнаяГруппаЗатрат="" 
НомерГТД="" 
Описание="Кистьььь плоская STAYER 0101-020 (UNIVERSAL-STANDARD) купить дешево в toool.ru, выбор продажа STAYER 0101-020 (UNIVERSAL-STANDARD)" 
ОсновноеИзображение="0101_020.jpg" 
ОсновнойПоставщик="Мастернэт" 
ОтветственныйМенеджерЗаПокупки="" 
Производитель="Stayer" 
СтавкаНДС="0%" 
СтранаПроисхождения="" 
ЦеноваяГруппа="" 
ВНаличииУПоставщика="1" 
Скидка="0" 
Description="" 
keywords="" 
h1="" 
Суперпредложения="ложь" 
ХитыПродаж="ложь" 
НаличиеНаСкладе="истина"
ДатаСоздания="15.06.2012 9:55:09" 
ПодЗаказ="истина" 
НеВыгружатьВМаркет="истина" 
Подарки="ТаблицаЗначений" 
КраткоеНаименование="STAYER 0101-020" 
Гарантия="" 
МассаБрутто="0" 
СтандартныеКомплектации="ТаблицаЗначений" 
ДополнительныеКомплектации="ТаблицаЗначений" 
Цена="10" 
ТехническиеХарактеристики="Ширина, мм = 20&#xA;Тип кисти = Плоская&#xA;">
			<СопутствующиеТовары/>
			<Подарки/>
			<Файлы/>
		</Товары>
	</V8Exch:Data>
</V8Exch:_1CV8DtUD>';
echo $url;
echo "<br>";
*/

$text = base64_encode($text);
print($text);
echo "<br>";
//die();
$post_data = array("xml" => $text);

if( $curl = curl_init() ) 
{
echo "curl_init";
echo "<br>";
/*
    curl_setopt($curl, CURLOPT_URL, $url);
//	curl_setopt($curl, CURLOPT_PROXY, "213.133.101.44:8888"); 	
    //curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post_data, '', '&'));
    //curl_setopt($curl, CURLOPT_POSTFIELDS, "xml=<Товары>");
    $out = curl_exec($curl);

echo "out = ";
echo $out;
	//print_r($out);
echo "<br>";
	
    curl_close($curl);
*/
}
else
{
echo "curl not init!!!";
echo "<br>";
}
phpinfo();

