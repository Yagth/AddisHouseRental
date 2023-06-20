-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 16, 2023 at 03:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WebDatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `House`
--

CREATE TABLE `House` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `location` text NOT NULL,
  `house_description` text NOT NULL,
  `house_tag` varchar(50) NOT NULL,
  `rooms` int(11) NOT NULL DEFAULT 0,
  `bed_rooms` int(11) NOT NULL DEFAULT 0,
  `bath_rooms` int(11) NOT NULL DEFAULT 0,
  `status` varchar(10) NOT NULL DEFAULT 'NR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `House`
--

INSERT INTO `House` (`id`, `owner_id`, `price`, `location`, `house_description`, `house_tag`, `rooms`, `bed_rooms`, `bath_rooms`, `status`) VALUES
(55, 33, 2000, 'Mexico', 'Hello there you have got to rent this house it is so awesome dude.', 'Garage', 3, 0, 0, 'R'),
(57, 34, 2000, 'Bole', 'Hello there you have got to rent this house it is so awesome dude.', 'Garage', 3, 1, 2, 'NR'),
(58, 34, 2000, 'Bole', 'Hello there you have got to rent this house it is so awesome dude.', 'Garage', 3, 1, 2, 'NR'),
(59, 34, 2000, 'Bole', 'Hello there you have got to rent this house it is so awesome dude.', 'Apartement', 3, 1, 2, 'NR'),
(60, 34, 2000, 'Bole', 'Hello there you have got to rent this house it is so awesome dude.', 'Apartement', 3, 1, 2, 'NR'),
(61, 34, 2000, '4 Kilo', 'Hello there you have got to rent this house it is so awesome dude.', 'Apartement', 3, 1, 2, 'NR');

-- --------------------------------------------------------

--
-- Table structure for table `House_Pic`
--

CREATE TABLE `House_Pic` (
  `pic_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `pic_desc` text NOT NULL,
  `photo_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `House_Pic`
--

INSERT INTO `House_Pic` (`pic_id`, `house_id`, `pic_desc`, `photo_url`) VALUES
(61, 55, 'main', 'IMG-6487a2ea667810.12804926.png'),
(62, 55, 'other', 'IMG-6487a2ea667d51.75905906.png'),
(63, 57, 'main', 'IMG-6487a363949e79.11615619.png'),
(64, 57, 'other', 'IMG-6487a36394a7d0.16961807.png'),
(65, 58, 'main', 'IMG-6487a392e10690.77718438.png'),
(66, 58, 'other', 'IMG-6487a392e11042.40053739.png'),
(67, 59, 'main', 'IMG-6487b83f0a9202.87880721.png'),
(68, 59, 'other', 'IMG-6487b83f125168.00667553.png'),
(69, 60, 'main', 'IMG-6487b8c4ae6de0.59222323.png'),
(70, 60, 'other', 'IMG-6487b8c4ae9e58.33094061.png'),
(71, 61, 'main', 'IMG-6487b8f41dbe15.57931790.png'),
(72, 61, 'other', 'IMG-6487b8f41dc428.04450486.png');

-- --------------------------------------------------------

--
-- Table structure for table `Rented_House`
--

CREATE TABLE `Rented_House` (
  `entry_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rented_House`
--

INSERT INTO `Rented_House` (`entry_id`, `house_id`, `user_id`, `start_date`, `end_date`) VALUES
(11, 55, 32, '2023-06-13', '2024-09-23');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `phonenumber` text NOT NULL,
  `telegram_username` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `firstname`, `lastname`, `email`, `phonenumber`, `telegram_username`, `password`, `status`) VALUES
(32, 'yab', 'der', 'yab11@gmail.com', '', '', 'f215c160a96ecd18f1137ff066132f94', 'L'),
(33, 'yab', 'der', 'yabuman34@mgac.com', '', '', 'f215c160a96ecd18f1137ff066132f94', 'N'),
(34, 'yab', 'der', 'yab11@mekan.gmail.com', '', '', 'a61728bed2c7abcfd4c0218df3c4aedc', 'N'),
(38, 'yab', 'Der', 'yab35@gmail.comi', '', '', 'e807f1fcf82d132f9bb018ca6738a19f', 'admin'),
(39, 'yab', 'Der', 'yab15@gmail.comi', '0911926069', 'yabui', 'e807f1fcf82d132f9bb018ca6738a19f', 'admin'),
(40, 'yab', 'Der', 'yab25@gmail.comi', '0911926069', 'yabui', 'e807f1fcf82d132f9bb018ca6738a19f', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `House`
--
ALTER TABLE `House`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Owner_user_foreign_key` (`owner_id`);

--
-- Indexes for table `House_Pic`
--
ALTER TABLE `House_Pic`
  ADD PRIMARY KEY (`pic_id`),
  ADD KEY `HousePic_Foreign_key` (`house_id`);

--
-- Indexes for table `Rented_House`
--
ALTER TABLE `Rented_House`
  ADD PRIMARY KEY (`entry_id`),
  ADD KEY `User_Foreign_key` (`user_id`),
  ADD KEY `House_Foreign_key` (`house_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `House`
--
ALTER TABLE `House`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `House_Pic`
--
ALTER TABLE `House_Pic`
  MODIFY `pic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `Rented_House`
--
ALTER TABLE `Rented_House`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `House`
--
ALTER TABLE `House`
  ADD CONSTRAINT `Owner_user_foreign_key` FOREIGN KEY (`owner_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `House_Pic`
--
ALTER TABLE `House_Pic`
  ADD CONSTRAINT `HousePic_Foreign_key` FOREIGN KEY (`house_id`) REFERENCES `House` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Rented_House`
--
ALTER TABLE `Rented_House`
  ADD CONSTRAINT `House_Foreign_key` FOREIGN KEY (`house_id`) REFERENCES `House` (`id`),
  ADD CONSTRAINT `User_Foreign_key` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
