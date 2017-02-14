<html>
<body>
<?php
$xmldata = array();
$currentclip = null;
$index = null;          // Текущий индекс в массиве

function saxStartElement($parser,$name,$attrs)
{
    global $currentclip;
    global $index;
    switch($name)
    {
        case 'video':
            $xmldata = array();
            break;
        case 'videoclip':
            $currentclip = array();
            if (in_array('group',array_keys($attrs)))
                $currentclip['group'] = $attrs['group'];
            if (in_array('title',array_keys($attrs)))
                $currentclip['title'] = $attrs['title'];
            break;
        default:
            $index = $name;
            break;
    };
}

function saxEndElement($parser,$name)
{
    global $xmldata,$currentclip,$index;

    if ((is_array($currentclip)) && ($name=='videoclip'))
// Если в данный момент у нас есть массив $currentclip (т.е.
// мы обрабатываем содержимое тега) и имя закрывающего
// тега - "videoclip", то это значит, что данные  кончились и мы можем поместить их в массив
// новостей.
    {
        $xmldata[] = $currentclip;
// Уничтожаем массив текущей новости, чтобы показать, что
// в данный момент мы не занимаемся получением данных для
// новости.
        $currentclip = null;
    };
// В любом случае закрытие тега означает, что символьные
// данные, получаемые парсером не нужно помещать куда-либо.
    $index = null;
}

function saxCharacterData($parser,$data)
{
    global $currentclip,$index;

// Мы принимаем только данные для новостей, помещенные в
// какой-нибудь тег. Все остальные символьные данные
// (как правило это пустое пространство, использованное
// для форматирования) мы опускаем за ненадобностью.
    if ((is_array($currentclip)) && ($index))
        $currentclip[$index] = $data;
}
//=================================
// MAIN
//=================================
$parser = xml_parser_create();
xml_set_element_handler($parser,'saxStartElement','saxEndElement');
xml_set_character_data_handler($parser,'saxCharacterData');
xml_parser_set_option($parser,XML_OPTION_CASE_FOLDING,false);

$filename = "test_video.xml";
$xml = join('',file($filename));

if (!xml_parse($parser,$xml,true))
// Парсер возвращает значение FALSE, если произошла
// какая-либо ошибка. В этом случае мы также прекращаем
// выполнение скрипта и возвращаем ошибку.
    die(sprintf('Ошибка XML: %s в строке %d',
        xml_error_string(xml_get_error_code($parser)),
        xml_get_current_line_number($parser)));

xml_parser_free($parser);

echo "<pre>";
print_r($xmldata);
echo "</pre>";
/*
foreach($news as $n)
{
?>
<tr>
    <td width="90%"><b><?php echo $n['title']; ?></b></td>
    <td><?php echo $n['date']; ?></td>
</tr>
<tr>
    <td colspan="2"><?php echo $n['text']; ?><br><br></td>
</tr>
<?php
}
*/
?>
</body>
</html>

