-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2023 at 11:28 AM
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
  `house_description` text NOT NULL,
  `rooms` int(11) NOT NULL,
  `status` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `House_Pic`
--

CREATE TABLE `House_Pic` (
  `house_id` int(11) NOT NULL,
  `pic_desc` text NOT NULL,
  `photo_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rented_House`
--

CREATE TABLE `Rented_House` (
  `house_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(50) NOT NULL,
  `telegram_username` varchar(50) NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `HousePic_Foreign_key` (`house_id`);

--
-- Indexes for table `Rented_House`
--
ALTER TABLE `Rented_House`
  ADD KEY `User_Foreign_key` (`user_id`),
  ADD KEY `House_Foreign_key` (`house_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phonenumber` (`phonenumber`),
  ADD UNIQUE KEY `telegram_username` (`telegram_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `House`
--
ALTER TABLE `House`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
