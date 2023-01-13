-- Adminer 4.8.1 MySQL 10.4.27-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `book_id` int(100) NOT NULL AUTO_INCREMENT,
  `genre_id` int(10) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `publisher` varchar(300) NOT NULL,
  `edition` int(100) DEFAULT NULL,
  `isbn` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pages` int(100) DEFAULT NULL,
  `quantity` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`book_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

INSERT INTO `books` (`book_id`, `genre_id`, `title`, `author`, `publisher`, `edition`, `isbn`, `pages`, `quantity`) VALUES
(10,	1,	'In Search of Lost Time',	'Marcel Proust1',	'NY Publishers',	NULL,	'null',	NULL,	10),
(11,	1,	'Ma Thổi Đèn - Trùng Cốc Vân Nam',	'Thiên Hạ Bá Xướng',	'Nhã Nam',	NULL,	'null',	NULL,	0),
(12,	1,	'Ma Thổi Đèn - Mô Kim Quyết',	'Thiên Hạ Bá Xướng',	'Nhã Nam',	NULL,	'',	NULL,	0),
(14,	3,	'In Search of Lost Time',	'mentor thuong',	'dfbgbng',	NULL,	'null',	NULL,	0),
(15,	1,	'Mô Kim Hiệu Uý',	'Thiên Hạ Bá Xướng',	'Nhã Nam',	NULL,	'null',	NULL,	98)
ON DUPLICATE KEY UPDATE `book_id` = VALUES(`book_id`), `genre_id` = VALUES(`genre_id`), `title` = VALUES(`title`), `author` = VALUES(`author`), `publisher` = VALUES(`publisher`), `edition` = VALUES(`edition`), `isbn` = VALUES(`isbn`), `pages` = VALUES(`pages`), `quantity` = VALUES(`quantity`);

DROP TABLE IF EXISTS `books_request`;
CREATE TABLE `books_request` (
  `request_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `genre_id` int(10) NOT NULL,
  `book_id` int(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `borrow_date` date NOT NULL,
  `return_date` date NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `books_request` (`request_id`, `user_id`, `genre_id`, `book_id`, `status`, `borrow_date`, `return_date`) VALUES
(5,	14,	1,	15,	1,	'2022-12-02',	'0000-00-00'),
(6,	14,	1,	15,	0,	'0000-00-00',	'0000-00-00'),
(7,	14,	1,	14,	0,	'0000-00-00',	'0000-00-00')
ON DUPLICATE KEY UPDATE `request_id` = VALUES(`request_id`), `user_id` = VALUES(`user_id`), `genre_id` = VALUES(`genre_id`), `book_id` = VALUES(`book_id`), `status` = VALUES(`status`), `borrow_date` = VALUES(`borrow_date`), `return_date` = VALUES(`return_date`);

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `genre_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `genre` (`genre_id`, `name`, `description`) VALUES
(1,	'Trinh Thám Trung Quốc',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(3,	'Trinh Thám',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(4,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(5,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(6,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(7,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(8,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất'),
(9,	'Trinh Thám 1',	'Tuyển tập truyện trinh thám Trung Quốc hay nhất')
ON DUPLICATE KEY UPDATE `genre_id` = VALUES(`genre_id`), `name` = VALUES(`name`), `description` = VALUES(`description`);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(300) NOT NULL,
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createdBy` int(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `users` (`user_id`, `name`, `phone`, `email`, `role`, `password`, `address`, `createdBy`) VALUES
(1,	'turng',	'01711568524',	'a.zshahriar@gmail.com',	1,	'12345756542',	'Mirpur DOHS',	0),
(13,	'mentor thuong',	'0962529820',	'mentorthuong@gmail.com',	0,	'hanoi11',	'hanoi',	0),
(14,	'admin',	'07645342312',	'dfggsd@g.g',	3,	'hanoi',	'hn',	0),
(20,	'Trung',	'012345',	'tesst@gmail.com',	0,	'12345',	'Dong Anh, Ha Noi',	0),
(21,	'Nguyen',	'012345',	'nguyen@gmail.com',	0,	'12345',	'Dong Anh, Ha Noi',	0),
(22,	'trung',	'0123456789',	'admin@gmail.com',	0,	'12345',	'Đông Anh, Hà Nội',	0),
(23,	'Vu',	'012345',	'vu@gmail.com',	2,	'12345',	'Dong Anh, Ha Noi',	0)
ON DUPLICATE KEY UPDATE `user_id` = VALUES(`user_id`), `name` = VALUES(`name`), `phone` = VALUES(`phone`), `email` = VALUES(`email`), `role` = VALUES(`role`), `password` = VALUES(`password`), `address` = VALUES(`address`), `createdBy` = VALUES(`createdBy`);

DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info` (
  `user_id` int(100) NOT NULL,
  `user_code` varchar(500) NOT NULL,
  `user_class` varchar(500) NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_info_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

INSERT INTO `users_info` (`user_id`, `user_code`, `user_class`) VALUES
(20,	'LQT46B-056-1923',	'LQT46B'),
(21,	'LQT46B-100-1923',	'LQT46B'),
(22,	'LQT46V',	'LQT46B')
ON DUPLICATE KEY UPDATE `user_id` = VALUES(`user_id`), `user_code` = VALUES(`user_code`), `user_class` = VALUES(`user_class`);

-- 2022-12-18 15:03:44
