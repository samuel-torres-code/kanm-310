-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 03, 2023 at 09:11 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kanm`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  `comment_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `show_id`, `time_stamp`, `comment_text`) VALUES
(1, 1, 2, '2023-04-15 19:11:35', 'THis shows is awesome adn cool!!! ;drop all tables;'),
(2, 2, 2, '2023-05-02 22:07:46', 'hi'),
(3, 5, 2, '2023-05-02 22:08:09', 'test'),
(4, 5, 4, '2023-05-02 22:31:13', 'PORN'),
(5, 5, 4, '2023-05-02 22:31:54', 'r324543rwe'),
(6, 5, 4, '2023-05-02 22:33:04', '2342'),
(7, 1, 4, '2023-05-02 22:35:53', 'sam'),
(8, 1, 4, '2023-05-02 22:39:19', 'my password is password'),
(9, 2, 4, '2023-05-02 22:39:46', 'doenut'),
(10, 2, 2, '2023-05-02 22:41:03', 'samuel tores'),
(11, 2, 2, '2023-05-02 22:42:51', 'comments'),
(12, 2, 2, '2023-05-03 04:41:43', 'Swaos'),
(13, 1, 2, '2023-05-03 04:44:08', 'sam'),
(14, 1, 2, '2023-05-03 15:57:28', 'Sam'),
(15, 1, 2, '2023-05-03 15:58:11', 'Saos'),
(16, 1, 2, '2023-05-03 15:59:34', 'New Comment'),
(17, 1, 2, '2023-05-03 16:00:45', 'New CommentSwaos'),
(18, 1, 2, '2023-05-03 16:01:24', 'le'),
(19, 1, 2, '2023-05-03 16:01:45', 'swaos'),
(20, 2, 2, '2023-05-03 16:42:54', 'Sam'),
(21, 5, 4, '2023-05-03 17:11:57', 'ayy'),
(22, 1, 2, '2023-05-03 21:02:09', 'Awesome Comment');

-- --------------------------------------------------------

--
-- Stand-in structure for view `members`
-- (See below for the actual view)
--
CREATE TABLE `members` (
`show_id` int(11)
,`user_id` int(11)
,`username` varchar(100)
,`password` varchar(255)
,`email` varchar(100)
,`first_name` varchar(100)
,`last_name` varchar(100)
,`is_admin` tinyint(1)
,`is_dj` tinyint(1)
,`show_name` varchar(100)
,`show_desc` varchar(255)
,`show_pic` text
,`start_time` datetime
,`end_time` datetime
,`day_of_week` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `plays`
--

CREATE TABLE `plays` (
  `set_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL,
  `was_mandatory` tinyint(1) NOT NULL DEFAULT 0,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sets`
--

CREATE TABLE `sets` (
  `set_id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL,
  `set_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `show_id` int(11) NOT NULL,
  `show_name` varchar(100) NOT NULL,
  `show_desc` varchar(255) NOT NULL,
  `show_pic` text NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `day_of_week` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`show_id`, `show_name`, `show_desc`, `show_pic`, `start_time`, `end_time`, `day_of_week`) VALUES
(2, 'BAM! Cookin\' with Sam!', 'The hottest tunes from DJ Sammy ', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/2048px-718smiley.svg.png', '2023-04-16 13:00:00', '2023-04-16 14:00:00', 2),
(4, '60minutesofsilence', 'music🎶🎶🎶 le le', 'https://cdn.discordapp.com/attachments/135519322670891009/1103055376498299011/Screenshot_20220428-214457_Instagram.jpg', '2023-05-02 16:00:00', '2023-05-02 17:00:00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `show_hosts`
--

CREATE TABLE `show_hosts` (
  `user_id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `show_hosts`
--

INSERT INTO `show_hosts` (`user_id`, `show_id`) VALUES
(1, 2),
(2, 2),
(5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `track_id` int(11) NOT NULL,
  `track_name` varchar(100) NOT NULL,
  `track_runtime` int(11) NOT NULL,
  `track_artist` varchar(50) NOT NULL,
  `track_album` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `mandatory` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_dj` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `first_name`, `last_name`, `is_admin`, `is_dj`) VALUES
(1, 'raacecar246', 'password', 'torres.sam@tamu.edu', 'Sam', 'Torres', 1, 1),
(2, 'dogenut', 'password', 'torres.samalt@gmail.com', 'Sam', 'Torres', 0, 1),
(3, 'dogenut', '$2y$10$p.ZZXbMs5hfEVTwodKPMhO7y1HDEwHHlX4CTtyFMGJP.xX4np.BEW', 'torres.samalt@gmail.com', 'Sam', 'Torres', 0, 0),
(4, 'dogenut', '$2y$10$mH0c1hq9lIjKHGUT92ZA1Oo0VKdi3ongSnBLtX4zxNR6adZ.2P63u', 'torres.samalt@gmail.com', 'Sam', 'Torres', 0, 0),
(5, 'liamrams', 'liamrams', 'liamrams@tamu.edu', 'Liam', 'Ramsey', 0, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_comments`
-- (See below for the actual view)
--
CREATE TABLE `user_comments` (
`comment_id` int(11)
,`comment_text` varchar(255)
,`time_stamp` datetime
,`show_id` int(11)
,`username` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_show`
-- (See below for the actual view)
--
CREATE TABLE `user_show` (
`user_id` int(11)
,`username` varchar(100)
,`password` varchar(255)
,`email` varchar(100)
,`first_name` varchar(100)
,`last_name` varchar(100)
,`is_admin` tinyint(1)
,`is_dj` tinyint(1)
,`show_id` int(11)
,`show_name` varchar(100)
,`show_desc` varchar(255)
,`show_pic` text
,`start_time` datetime
,`end_time` datetime
,`day_of_week` int(11)
);

-- --------------------------------------------------------

--
-- Structure for view `members`
--
DROP TABLE IF EXISTS `members`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `members`  AS SELECT `show_hosts`.`show_id` AS `show_id`, `users`.`user_id` AS `user_id`, `users`.`username` AS `username`, `users`.`password` AS `password`, `users`.`email` AS `email`, `users`.`first_name` AS `first_name`, `users`.`last_name` AS `last_name`, `users`.`is_admin` AS `is_admin`, `users`.`is_dj` AS `is_dj`, `shows`.`show_name` AS `show_name`, `shows`.`show_desc` AS `show_desc`, `shows`.`show_pic` AS `show_pic`, `shows`.`start_time` AS `start_time`, `shows`.`end_time` AS `end_time`, `shows`.`day_of_week` AS `day_of_week` FROM ((`users` left join `show_hosts` on(`show_hosts`.`user_id` = `users`.`user_id`)) left join `shows` on(`show_hosts`.`show_id` = `shows`.`show_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `user_comments`
--
DROP TABLE IF EXISTS `user_comments`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_comments`  AS SELECT `c`.`comment_id` AS `comment_id`, `c`.`comment_text` AS `comment_text`, `c`.`time_stamp` AS `time_stamp`, `c`.`show_id` AS `show_id`, `u`.`username` AS `username` FROM (`comments` `c` join `users` `u` on(`c`.`user_id` = `u`.`user_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `user_show`
--
DROP TABLE IF EXISTS `user_show`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_show`  AS SELECT `u`.`user_id` AS `user_id`, `u`.`username` AS `username`, `u`.`password` AS `password`, `u`.`email` AS `email`, `u`.`first_name` AS `first_name`, `u`.`last_name` AS `last_name`, `u`.`is_admin` AS `is_admin`, `u`.`is_dj` AS `is_dj`, `s`.`show_id` AS `show_id`, `s`.`show_name` AS `show_name`, `s`.`show_desc` AS `show_desc`, `s`.`show_pic` AS `show_pic`, `s`.`start_time` AS `start_time`, `s`.`end_time` AS `end_time`, `s`.`day_of_week` AS `day_of_week` FROM ((`users` `u` join `show_hosts` `sh` on(`sh`.`user_id` = `u`.`user_id`)) join `shows` `s` on(`s`.`show_id` = `sh`.`show_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `show_id_comments_fk` (`show_id`),
  ADD KEY `user_id_comments_fk` (`user_id`);

--
-- Indexes for table `plays`
--
ALTER TABLE `plays`
  ADD KEY `set_id_plays_fk` (`set_id`),
  ADD KEY `set_id_tracks_fk` (`track_id`);

--
-- Indexes for table `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`set_id`),
  ADD KEY `show_id_set_fk` (`show_id`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`show_id`);

--
-- Indexes for table `show_hosts`
--
ALTER TABLE `show_hosts`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `show_id_fk` (`show_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`track_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sets`
--
ALTER TABLE `sets`
  MODIFY `set_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `show_id_comments_fk` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_comments_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plays`
--
ALTER TABLE `plays`
  ADD CONSTRAINT `set_id_plays_fk` FOREIGN KEY (`set_id`) REFERENCES `sets` (`set_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `set_id_tracks_fk` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sets`
--
ALTER TABLE `sets`
  ADD CONSTRAINT `show_id_set_fk` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `show_hosts`
--
ALTER TABLE `show_hosts`
  ADD CONSTRAINT `show_id_fk` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
