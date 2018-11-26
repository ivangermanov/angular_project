-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: studmysql01.fhict.local
-- Generation Time: Nov 26, 2018 at 09:04 AM
-- Server version: 5.7.13-log
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbi380810`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name_department` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name_department`, `role`) VALUES
(1, 'IT', 'programming'),
(3, 'Ivan\'s department', 'TestRole'),
(5, 'Media', 'TestRole'),
(6, 'Production', 'TestRole'),
(7, 'Service', 'TestRole'),
(8, 'Manufacturing', 'TestRole'),
(9, 'Secretary', 'TestRole'),
(10, 'Accountancy', 'IDK'),
(11, 'Logistics', 'Moving stuff around'),
(12, 'Keys', '');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name_employee` varchar(55) DEFAULT NULL,
  `date_of_hire` date DEFAULT NULL,
  `telephone` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `department_id`, `name_employee`, `date_of_hire`, `telephone`) VALUES
(18, 7, 'Lexi-Mai Bradshaw', '1997-12-06', '+12025550101'),
(19, 9, 'Sonya Andersen', '1997-12-06', '+12025550101'),
(21, 6, 'German Ivanov', '2018-10-11', '+999'),
(22, 10, 'TestGuy', '2018-03-15', '123123123'),
(23, 10, 'rac', '2018-10-10', 'sdf'),
(24, 1, 'Armin van Buuren', '2012-10-13', '+06 9999999'),
(25, 1, 'Nasakoto Yakata', '2010-10-14', '+700 000 000'),
(26, 3, 'James Bond', '2007-07-07', '+007 700 007'),
(27, 3, 'German Ivanov Jr.', '2018-10-12', '+355 555 55'),
(28, 1, '50 cent', '2013-10-11', '+50 05 50'),
(29, 3, 'Thierry Henry', '2013-05-08', '+06 000 000'),
(30, 5, 'Test Subject', '2006-09-08', '111111111111'),
(31, 12, 'Linda', '2018-10-13', '');

-- --------------------------------------------------------

--
-- Table structure for table `employeetask`
--

CREATE TABLE `employeetask` (
  `employee_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employeetask`
--

INSERT INTO `employeetask` (`employee_id`, `task_id`) VALUES
(19, 5),
(18, 8),
(18, 10),
(18, 15),
(18, 16),
(21, 17),
(25, 18),
(28, 18),
(31, 19);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name_task` varchar(50) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES
(5, 5, 'Buy groceries', 'Not having to shop for the whole week', '2018-09-26'),
(7, 7, 'Kids to school!!', 'You want your children educated', '2018-09-26'),
(8, 8, 'Buy milk', 'Someone already drank it', '2018-09-26'),
(10, 8, 'datepicker', 'to test the datepicker', '2018-11-17'),
(12, 3, 'TestHeraTestUpdate', 'To test whether API works on hera', '2018-10-01'),
(13, 8, 'DHL Packing', '€10/hour', '2018-10-03'),
(14, 6, 'add', 'add', '2018-10-17'),
(15, 7, 'whysoslowtasks', 'promises make it slow ;(', '2018-10-23'),
(16, 7, 'bullcrap2', 'crapbull', '2018-10-22'),
(17, 6, 'TestApi', 'TO test', '2018-10-16'),
(18, 1, 'Jump Around', 'Dance', '2019-02-15'),
(19, 12, 'Bake bread', '', '2018-10-26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_ibfk_1` (`department_id`);

--
-- Indexes for table `employeetask`
--
ALTER TABLE `employeetask`
  ADD PRIMARY KEY (`employee_id`,`task_id`),
  ADD KEY `employeetask_ibfk_2` (`task_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_ibfk_1` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employeetask`
--
ALTER TABLE `employeetask`
  ADD CONSTRAINT `employeetask_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employeetask_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
