-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2021 a las 21:19:44
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_warehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(3) NOT NULL,
  `channel_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `channels`
--

INSERT INTO `channels` (`channel_id`, `channel_name`) VALUES
(1, 'Whatsapp'),
(2, 'Facebook'),
(3, 'Telegram'),
(4, 'Discord');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `city_id` int(5) NOT NULL,
  `country_id` int(3) NOT NULL,
  `city_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`city_id`, `country_id`, `city_name`) VALUES
(1, 1, 'Rosario'),
(4, 1, 'Córdoba'),
(7, 7, 'La Paz'),
(10, 8, 'Asunción'),
(11, 9, 'NYC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `company_id` int(3) NOT NULL,
  `company_name` varchar(64) NOT NULL,
  `city_id` int(3) NOT NULL,
  `address` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `city_id`, `address`) VALUES
(1, 'Acámica', 1, 'aaa'),
(2, 'Globant', 1, 'bbb'),
(3, 'LDC', 1, 'Paraguay 777'),
(4, 'LDC2', 1, 'Paraguay 777'),
(5, 'LDC3', 1, 'Paraguay 777'),
(6, 'LDC4', 1, 'Paraguay 777'),
(7, 'LDC5', 1, 'Paraguay 777'),
(8, 'Neural Soft', 1, 'Roca'),
(9, 'LDC7', 1, 'Paraguay 777');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(3) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `city_id` int(5) NOT NULL,
  `company_id` int(3) NOT NULL,
  `position` varchar(32) NOT NULL,
  `interest` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `firstname`, `lastname`, `email`, `city_id`, `company_id`, `position`, `interest`) VALUES
(3, 'maria', 'dichiara', 'mari@google.com', 1, 2, 'comer', 75),
(6, 'dan', 'nielsen', 'dan@google.com', 1, 2, 'developer', 100),
(7, 'Agustín Emanuel', 'Soria', 'agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(8, 'Agustín Emanuel', 'Soria', 'agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(9, 'Agustín Emanuel', 'Soria', 'agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(10, 'Agustín Emanuel', 'Soria', 'agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(11, 'Agustín Emanuel', 'Soria', 'agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(12, 'Agustín Emanuel', 'Soria', 'dani_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(13, 'Agustín Emanuel', 'Soria', 'dan_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(14, 'Agustín Emanuel', 'Soria', 'da_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(15, 'Agustín Emanuel', 'Soria', 'd_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(16, 'Agustín Emanuel', 'Soria', '_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(17, 'Agustín Emanuel', 'Soria', '__agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(18, 'Agustín Emanuel', 'Soria', '__.agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(19, 'Agustín Emanuel', 'Soria', '_.agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(20, 'Agustín Emanuel', 'Soria', 'ma_agustinesoria96@gmail.com', 1, 1, 'UI Designer', 100),
(22, 'Daniela', 'Berardi', 'danielaberardi@gmail.com', 4, 2, 'Fontend', 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts_channels`
--

CREATE TABLE `contacts_channels` (
  `contact_id` int(3) NOT NULL,
  `channel_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts_channels`
--

INSERT INTO `contacts_channels` (`contact_id`, `channel_id`) VALUES
(0, 0),
(3, 1),
(3, 2),
(6, 1),
(7, 1),
(7, 2),
(7, 3),
(8, 1),
(8, 2),
(8, 3),
(9, 1),
(9, 2),
(9, 3),
(10, 1),
(10, 2),
(10, 3),
(11, 1),
(11, 2),
(11, 3),
(12, 1),
(12, 2),
(12, 3),
(13, 1),
(13, 2),
(14, 1),
(14, 2),
(15, 1),
(15, 2),
(16, 1),
(16, 2),
(17, 1),
(17, 2),
(18, 1),
(18, 2),
(19, 1),
(19, 2),
(20, 1),
(20, 2),
(22, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `country_id` int(3) NOT NULL,
  `region_id` int(3) NOT NULL,
  `country_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`country_id`, `region_id`, `country_name`) VALUES
(1, 1, 'Argentina'),
(5, 1, 'Chile'),
(7, 1, 'Bolivia'),
(8, 1, 'Paraguay'),
(9, 5, 'USA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `region_id` int(3) NOT NULL,
  `region_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`region_id`, `region_name`) VALUES
(1, 'Sudamérica'),
(5, 'Norteamérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(3) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(65) NOT NULL,
  `perfil` enum('Admin','Básico') NOT NULL DEFAULT 'Básico',
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `perfil`, `password`) VALUES
(1, 'Daniela', 'Berardi', 'danielaberardi@live.com.ar', 'Admin', '1234'),
(2, 'Olivia', 'Dichiara', 'olivia@hotmail.com', 'Básico', '5678'),
(3, 'gus', 'elias', 'gu@google.com', 'Admin', '1aaa'),
(4, 'gustavo2', 'gustavo2', '', 'Admin', ''),
(5, 'gustavo2', 'elias', '', 'Admin', ''),
(6, 'gustavo2', 'elias', 'g@yahoo.com.ar', 'Admin', ''),
(8, 'gustavo2', 'elias', 'gus@yahoo.com', 'Básico', ''),
(9, 'gustavo2', 'elias', 'gust@yahoo.com', 'Básico', ''),
(10, 'gustavo2', 'elias', 'gust@yahoo.co', 'Básico', ''),
(11, 'gustavo2', 'elias', 'gusta@yahoo.com', 'Básico', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `cities_ibfk_1` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indices de la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD PRIMARY KEY (`contact_id`,`channel_id`),
  ADD KEY `channel_id` (`channel_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD KEY `countries_ibfk_1` (`region_id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`region_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `channels`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `region_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`);

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`);

--
-- Filtros para la tabla `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
