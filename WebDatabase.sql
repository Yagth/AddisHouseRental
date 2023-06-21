-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 21, 2023 at 11:38 AM
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
(177, 44, 200, '4 kilo', 'A beautiful house around the city for you and your family.', 'Home', 0, 1, 2, 'R'),
(182, 44, 2000, 'Mexico', 'Here is a house that looks cool.', 'Home', 0, 0, 1, 'R'),
(183, 44, 20000, 'Mexico', 'Here is a house that looks cool.', 'Home', 0, 1, 2, 'NR'),
(184, 44, 200, 'Bole', 'Hello there.', 'Home', 0, 3, 1, 'NR'),
(185, 44, 200, 'AlemBank', 'This is a building test.', 'Building', 0, 200, 10, 'NR'),
(186, 44, 2000, 'Bole', 'This is a beautiful house with a large and big salon and located in the heart of the city.', 'Home', 4, 1, 3, 'NR'),
(187, 44, 2, 'dummy', 'Dummy data for the dummy house.', 'Home', 35, 12, 23, 'NR'),
(188, 44, 2, 'dummy', 'Dummy data for the dummy house.', 'Home', 35, 12, 23, 'NR'),
(190, 44, 2, 'dummy', 'Dummy data for the dummy house.', 'Home', 35, 12, 23, 'NR'),
(191, 44, 2, 'dummy', 'Dummy data for the dummy house.', 'Home', 35, 12, 23, 'NR'),
(192, 44, 2, 'dummy', 'Dummy data for the dummy house.', 'Home', 35, 12, 23, 'NR'),
(193, 44, 2000, 'Dummy', 'Hello there this is another dummy house.', 'Home', 3, 1, 2, 'NR'),
(194, 44, 3000, 'Dummy', 'For the last time another dummy house.', 'Home', 5, 2, 3, 'NR'),
(195, 44, 3000, 'Dummy', 'For the last time another dummy house.', 'Home', 5, 2, 3, 'NR'),
(197, 44, 4000, 'Hello', 'Just for the last time trying out the house description.', 'Home', 4, 2, 2, 'NR'),
(198, 44, 3000, 'One', 'Description.', 'Home', 6, 2, 4, 'NR'),
(199, 44, 3000, 'One', 'Amazing building.', 'Home', 0, 2, 4, 'NR'),
(201, 44, 2000, 'Shop', 'Hello there this is another webstie.', 'Shop', 3, 1, 2, 'NR');

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
(212, 177, 'main', 'IMG-6491a0cac11621.23663741.jpg'),
(213, 177, 'other', 'IMG-648e9cd6daded7.47954437.jpg'),
(214, 182, 'main', 'IMG-6491942e4eddc1.44773912.jpg'),
(215, 182, 'other', 'IMG-649084b8be7038.21241832.jpg'),
(216, 183, 'main', 'IMG-64918a6d9fe184.84186564.jpg'),
(217, 183, 'other', 'IMG-649084eda395f5.86497493.jpg'),
(218, 184, 'main', 'IMG-649193d028b662.98382689.jpg'),
(219, 184, 'other', 'IMG-6490b56582e355.52302830.jpg'),
(220, 185, 'main', 'IMG-6491b23e0135f5.81450629.jpg'),
(221, 185, 'other', 'IMG-6490b591754f73.65351508.jpg'),
(222, 186, 'main', 'IMG-6491b14c4da5c4.31990735.jpg'),
(223, 186, 'other', 'IMG-6491b14c4db302.27131660.jpg'),
(224, 187, 'main', 'IMG-6491b297ef9580.08923127.jpg'),
(225, 187, 'other', 'IMG-6491b297efa250.61541937.jpg'),
(226, 188, 'main', 'IMG-6491b2bfc467c6.21186348.jpg'),
(227, 188, 'other', 'IMG-6491b2bfc47059.64381611.jpg'),
(230, 190, 'main', 'IMG-6491b32181fa09.10429238.jpg'),
(231, 190, 'other', 'IMG-6491b321820358.83910711.jpg'),
(232, 191, 'main', 'IMG-6491b333c10147.01191391.jpg'),
(233, 191, 'other', 'IMG-6491b333c107f3.54706468.jpg'),
(234, 192, 'main', 'IMG-6491b34596de36.34924407.jpg'),
(235, 192, 'other', 'IMG-6491b34596e749.23779356.jpg'),
(236, 193, 'main', 'IMG-6491b3fa1ff8b4.57173264.jpg'),
(237, 193, 'other', 'IMG-6491b3fa1fffa7.52461164.jpg'),
(238, 194, 'main', 'IMG-6491b44c992d25.73399582.jpg'),
(239, 194, 'other', 'IMG-6491b44c993a80.65484118.jpg'),
(240, 195, 'main', 'IMG-6491b456dffc89.39308175.jpg'),
(241, 195, 'other', 'IMG-6491b456e011a6.71960729.jpg'),
(242, 197, 'main', 'IMG-6491b4972da198.14419271.jpg'),
(243, 197, 'other', 'IMG-6491b4972df2b3.87699199.jpg'),
(244, 198, 'main', 'IMG-6491b4d6b58209.95403418.jpg'),
(245, 198, 'other', 'IMG-6491b4d6b5e408.63270712.jpg'),
(246, 199, 'main', 'IMG-6491ba71b08831.42221333.jpg'),
(247, 199, 'other', 'IMG-6491b52c026e14.42701581.jpg'),
(250, 201, 'main', 'IMG-6491b5cb7372b3.07194758.jpg'),
(251, 201, 'other', 'IMG-6491b5cb7383c1.82861335.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Rented_House`
--

CREATE TABLE `Rented_House` (
  `entry_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rented_House`
--

INSERT INTO `Rented_House` (`entry_id`, `house_id`, `user_id`, `start_date`, `end_date`) VALUES
(12, 177, 43, '2023-06-20', ''),
(13, 177, 43, '2023-06-20', ''),
(14, 177, 43, '2023-06-20', ''),
(15, 177, 43, '2023-06-20', ''),
(16, 177, 43, '2023-06-20', ''),
(17, 177, 43, '2023-06-20', ''),
(18, 177, 43, '2023-06-20', ''),
(19, 177, 43, '2023-06-20', ''),
(20, 182, 43, '2023-06-20', ''),
(21, 182, 43, '2023-06-20', ''),
(22, 182, 43, '2023-06-20', ''),
(23, 182, 43, '2023-06-20', ''),
(24, 182, 43, '2023-06-20', ''),
(25, 182, 43, '2023-06-20', ''),
(26, 182, 43, '2023-06-20', ''),
(27, 182, 43, '2023-06-20', ''),
(28, 182, 43, '2023-06-20', ''),
(29, 182, 43, '2023-06-20', ''),
(30, 182, 43, '2023-06-20', ''),
(31, 182, 43, '2023-06-20', ''),
(32, 177, 43, '2023-06-20', '');

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
(40, 'yab', 'Der', 'yab25@gmail.comi', '0911926069', 'yabui', 'e807f1fcf82d132f9bb018ca6738a19f', 'admin'),
(41, 'yab', 'der', 'yab13@mekan.gmail.com', '1234567890', 'der', 'a61728bed2c7abcfd4c0218df3c4aedc', 'L'),
(42, 'Yab', 'der', 'ab11@mekan.gmail.com', '98765432', 'gar', 'a61728bed2c7abcfd4c0218df3c4aedc', 'N'),
(43, 'Yab', 'Der', 'YabL@gmail.com', '1234567890', 'yab', 'e807f1fcf82d132f9bb018ca6738a19f', 'N'),
(44, 'Yab', 'Der ', 'YabA@gmail.com', '1234567890', 'yab', 'e807f1fcf82d132f9bb018ca6738a19f', 'L');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `House_Pic`
--
ALTER TABLE `House_Pic`
  MODIFY `pic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT for table `Rented_House`
--
ALTER TABLE `Rented_House`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

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
