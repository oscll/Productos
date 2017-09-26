CREATE DATABASE  IF NOT EXISTS `productos`;

USE `productos`;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `name` varchar(255) NOT NULL,
  `text_prod` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `cod_prod` varchar(255) NOT NULL,
  `cant_prod` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `pago` varchar(255) NOT NULL,
  PRIMARY KEY (`cod_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;