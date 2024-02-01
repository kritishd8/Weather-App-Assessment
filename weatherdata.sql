-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 02:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weatherdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather_data`
--

CREATE TABLE `weather_data` (
  `id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `temperature` float NOT NULL,
  `humidity` int(11) NOT NULL,
  `pressure` int(11) NOT NULL,
  `wind_speed` float NOT NULL,
  `weather_description` varchar(255) NOT NULL,
  `icon` varchar(20) NOT NULL,
  `country` varchar(2) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather_data`
--

INSERT INTO `weather_data` (`id`, `city`, `temperature`, `humidity`, `pressure`, `wind_speed`, `weather_description`, `icon`, `country`, `last_updated`) VALUES
(1, 'Nagaon', 23.55, 59, 1015, 1.96, 'overcast clouds', '04n', 'IN', '2024-01-22 13:34:34'),
(2, 'Kathmandu', 12.12, 54, 1020, 3.09, 'few clouds', '02n', 'NP', '2024-01-22 13:34:46'),
(3, 'Delhi', 11.05, 87, 1019, 2.06, 'mist', '50n', 'IN', '2024-01-22 13:48:22'),
(4, 'Nagaon', 29.21, 24, 1016, 0.28, 'overcast clouds', '04d', 'IN', '2024-01-23 05:20:51'),
(5, 'Kathmandu', 12.12, 62, 1022, 1.03, 'haze', '50d', 'NP', '2024-01-23 05:21:00'),
(6, 'Berlin', 4.81, 90, 1003, 6.71, 'broken clouds', '04n', 'DE', '2024-01-23 06:23:02'),
(7, 'Poland', -1.98, 59, 1021, 0, 'few clouds', '02n', 'US', '2024-01-23 06:27:18'),
(8, 'Nagaon', 21.57, 45, 1013, 0.65, 'broken clouds', '04n', 'IN', '2024-01-24 13:39:01'),
(9, 'Kathmandu', 11.12, 66, 1019, 3.6, 'broken clouds', '04n', 'NP', '2024-01-24 13:39:07'),
(10, 'Nagaon', 22.25, 60, 1015, 1.96, 'overcast clouds', '04n', 'IN', '2024-01-24 17:09:15'),
(11, 'Nagaon', 22.25, 60, 1015, 1.96, 'overcast clouds', '04d', 'IN', '2024-01-21 12:04:00'),
(12, 'Nagaon', 24.25, 58, 1020, 2.06, 'mist', '50d', 'IN', '2024-01-20 12:02:50'),
(13, 'Nagaon', 22.5, 60, 1010, 3.09, 'few clouds', '02d', 'IN', '2024-01-19 12:02:10'),
(14, 'Nagaon', 21.5, 59, 1015, 3.09, 'few clouds', '02d', 'IN', '2024-01-18 12:01:37'),
(15, 'New York', 5, 87, 1032, 4.12, 'mist', '50d', 'US', '2024-01-24 17:58:04'),
(16, 'Nagaon', 30.19, 20, 1017, 1.33, 'clear sky', '01d', 'IN', '2024-01-25 04:53:28'),
(17, 'Kathmandu', 11.12, 62, 1024, 0, 'haze', '50d', 'NP', '2024-01-25 04:55:04'),
(18, 'new york', 5.9, 89, 1023, 2.57, 'light rain', '10n', 'US', '2024-01-25 05:33:26'),
(19, 'nagaon', 34, 18, 1011, 1.92, 'few clouds', '02d', 'IN', '2024-01-25 10:53:57'),
(20, 'kathmandu', 14.12, 47, 1020, 4.63, 'few clouds', '02d', 'NP', '2024-01-25 10:55:57'),
(21, 'new york', 8.03, 97, 1023, 2.57, 'mist', '50n', 'US', '2024-01-25 11:53:57'),
(22, 'helsinki', -0.23, 89, 1005, 9.39, 'broken clouds', '04d', 'FI', '2024-01-25 11:54:11'),
(23, 'india', 4.01, 88, 1027, 2.14, 'broken clouds', '04d', 'IT', '2024-01-25 12:00:36'),
(24, 'russia', -13.5, 94, 1027, 2.52, 'overcast clouds', '04n', 'RU', '2024-01-25 12:00:43'),
(25, 'pokhara', 12.24, 53, 1018, 0.76, 'broken clouds', '04d', 'NP', '2024-01-25 12:00:48'),
(26, 'nagaon', 19.44, 53, 1016, 1.67, 'scattered clouds', '03n', 'IN', '2024-01-26 01:06:46'),
(27, 'Kathmandu', 6.12, 81, 1024, 1.03, 'mist', '50d', 'NP', '2024-01-26 03:07:09'),
(28, 'nagaon', 35.46, 23, 1012, 2.93, 'clear sky', '01d', 'IN', '2024-01-28 09:33:11'),
(29, 'kathmandu', 17.12, 36, 1019, 3.6, 'scattered clouds', '03d', 'NP', '2024-01-28 09:33:38'),
(30, 'Mumbai', 32.99, 18, 1014, 4.63, 'smoke', '50d', 'IN', '2024-01-28 09:34:07'),
(31, 'nagaon', 26.34, 43, 1014, 1.51, 'overcast clouds', '04n', 'IN', '2024-01-29 13:18:42'),
(32, 'nagaon', 33.46, 20, 1007, 2.93, 'clear sky', '01d', 'IN', '2024-01-27 07:33:11'),
(33, 'kathmandu', 12.12, 62, 1019, 3.09, 'few clouds', '02n', 'NP', '2024-01-29 13:23:36'),
(34, 'nagaon', 24.83, 49, 1014, 2.29, 'overcast clouds', '04d', 'IN', '2024-01-31 12:57:59'),
(35, 'nagaon', 25.5, 70, 1010, 5.5, 'Partly Cloudy', '02d', 'IN', '2024-01-29 18:15:00'),
(36, 'kathmandu', 12.12, 71, 1018, 4.63, 'broken clouds', '04n', 'NP', '2024-01-31 13:01:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather_data`
--
ALTER TABLE `weather_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather_data`
--
ALTER TABLE `weather_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
