CREATE DATABASE IF NOT EXISTS `lab67` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `lab67`;


CREATE TABLE `accounts` (
  `id` int PRIMARY KEY auto_increment NOT NULL,
  `username` varchar(32) NOT NULL UNIQUE,
  `email` varchar(254) NOT NULL,
  `password` varchar(254) NOT NULL
);

INSERT INTO `accounts` (`username`, `email`, `password`) VALUES
('nguyenvana', 'nguyenvana@gmail.com', 'adasdasdasd')
