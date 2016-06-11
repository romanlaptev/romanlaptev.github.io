<?php
/**
 * Основные параметры WordPress.
 *
 * Этот файл содержит следующие параметры: настройки MySQL, префикс таблиц,
 * секретные ключи и ABSPATH. Дополнительную информацию можно найти на странице
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Кодекса. Настройки MySQL можно узнать у хостинг-провайдера.
 *
 * Этот файл используется скриптом для создания wp-config.php в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать этот файл
 * с именем "wp-config.php" и заполнить значения вручную.
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'wp');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'master');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'UT61,Fkq`x[kiBWO1A!P6}qiSUMq+)t,Z8z;7:^Krl11Ea1-/%?]ZRw9!Dz%3J7>');
define('SECURE_AUTH_KEY',  'Nj_$yX;n+uO]<q|N|>6sO`SrvsbDI>e5p ]y.T]f2`-HS~sa5A*+$L1}z]}fQt,f');
define('LOGGED_IN_KEY',    'CGt>OE( &m2%9<4~M0dQV-q^Je:n-,GDUK#(S;B($|O)p2Z!Gm+;`&;)aqi&wJ=o');
define('NONCE_KEY',        'v;6J[s+EzxM3:v;b;}E-+RjShkuzBmvGZxi%7Z(K7l=TzK-7(pAtopJcw-@/Yw#`');
define('AUTH_SALT',        ' 3cZ(yy]1%Gj3N<y6h -ZD@]s|RQN]6|BC>SS@LV%<+36 V7z&umE{<<!0Lr^V@S');
define('SECURE_AUTH_SALT', 's+,i>;l)2(-3F?{-VVCo}^>uiYX!:&:/hu4#@+9k^>?#nKG:?{if]T=%uLK2{>+!');
define('LOGGED_IN_SALT',   ')[k+Pg*Vvh6DVd<>>vi%Cnvw:;v#X/GnGk_eI*t/}]J*m7Je~$%yjZ+lzSQW_t3h');
define('NONCE_SALT',       '8)|B>CWlZy$+|U,NVi*vz.+~I=`//dz++:V6nEM+G/Ai7Xpf:Psq~2F$omh|>Bjo');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
