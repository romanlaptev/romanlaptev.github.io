﻿#!/bin/sh
echo "Content-type: text/html"
echo ""
echo "<h2> This is message </h2>"
echo "<b>"

#set | grep QUERY_STRING
echo $QUERY_STRING

echo ${#QUERY_STRING}

# определить номера позиций символа-разделителя &
# var1=ls&var2=mount

echo "</b><br><hr>"
echo "<b>Environment</b><br>"

echo "<pre>"
set
echo "</pre>"

#   ${#string} - Длина строки

#Извлечение подстроки
#   ${string:position} - с position до конца
#   ${string:position:length} - с position длиной length символов
#   ${string: -length} - последние length символов

#Удаление части строки
#   ${string#substring} - до первого с начала
#   ${string##substring} - до последнего с начала
#   ${string%substring} - до первого с конца
#   ${string%%substring} - до последнего с конца

#Замена подстроки

#   ${string/substring/replacement} - первое вхождение
#   ${string//substring/replacement} - все вхождения
#   ${var/#Pattern/Replacement} - Если в переменной var найдено совпадение с Pattern, 
#       причем совпадающая подстрока расположена в начале строки (префикс), 
#       то оно заменяется на Replacement. Поиск ведется с начала строки
#   ${var/%Pattern/Replacement} - Если в переменной var найдено совпадение с Pattern, 
#       причем совпадающая подстрока расположена в конце строки (суффикс), 
#       то оно заменяется на Replacement. Поиск ведется с конца строки

#Пример:
#   a="12345"; echo "${a}"; echo "${a:3}"; echo "${a#12}"; echo "${a/12/21}"

 