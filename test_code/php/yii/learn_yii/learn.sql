-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 15 2015 г., 13:14
-- Версия сервера: 5.5.35
-- Версия PHP: 5.4.4-14+deb7u8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `learn`
--

-- --------------------------------------------------------

--
-- Структура таблицы `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'курс',
  `description` text,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `courses`
--

INSERT INTO `courses` (`course_id`, `title`, `description`) VALUES
(1, 'Javascript', 'Hexlet University'),
(4, 'HTML-верстка на Bootstrap', '');

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `lesson_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(6) unsigned DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'урок',
  `description` text,
  PRIMARY KEY (`lesson_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`lesson_id`, `course_id`, `url`, `title`, `description`) VALUES
(1, 1, 'http://mycomp/video/video_lessons/js_HexletUniversity/JavaScript,%20%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D1%8F%203%20%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8.%20%D0%97%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F.mp4', 'лекция 3 Функции. Замыкания', 'Hexlet University'),
(2, 1, 'http://mycomp/video/video_lessons/js_HexletUniversity/JavaScript, лекция 4 Наследование.mp4', 'лекция 4. Наследование', 'Hexlet University'),
(5, 1, 'http://mycomp/video/video_lessons/js_HexletUniversity/JavaScript, лекция 6 Регулярные выражения.mp4', 'лекция 6 Регулярные выражения', 'Hexlet University'),
(6, 1, 'http://mycomp/video/video_lessons/js_HexletUniversity/JavaScript, лекция 7 Сравнения, var, eval и заключение.mp4', 'лекция 7 Сравнения, var, eval и заключение', 'Hexlet University'),
(7, 4, 'http://mycomp/video/video_lessons/HTML-верстка на Bootstrap/1 Подключение Bootstrap.mp4', 'Подключение Bootstrap', ''),
(8, 0, 'https://www.youtube.com/embed/-wcy1Bsq-Ls', 'Bootstrap: Как создаются современные адаптивные сайты', 'test2'),
(9, 4, 'http://mycomp/video/video_lessons/HTML-верстка на Bootstrap/2 Container и Row - что это.mp4', 'Container и Row - что это', ''),
(10, 4, 'http://mycomp/video/video_lessons/HTML-верстка на Bootstrap/3 Navbar - разметка навигации для сайта.mp4', 'Navbar - разметка навигации для сайта', '');

-- --------------------------------------------------------

--
-- Структура таблицы `tbl_migration`
--

CREATE TABLE IF NOT EXISTS `tbl_migration` (
  `version` varchar(255) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tbl_migration`
--

INSERT INTO `tbl_migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1433741630),
('m150608_053808_create_table_cources', 1433744571),
('m150608_053808_create_table_lessons', 1433744572),
('m150608_053808_create_table_users', 1433744572),
('m150608_063808_add_demo_data', 1433745007);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(64) NOT NULL,
  `pass` varchar(64) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `login`, `pass`) VALUES
(1, 'admin', 'super');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
