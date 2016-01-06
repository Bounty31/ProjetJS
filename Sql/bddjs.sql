-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 06 Janvier 2016 à 22:52
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `bddjs`
--

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

CREATE TABLE IF NOT EXISTS `score` (
  `id_score` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `id_jeu` int(11) NOT NULL,
  PRIMARY KEY (`id_score`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `score`
--

INSERT INTO `score` (`id_score`, `id_user`, `score`, `id_jeu`) VALUES
(1, 1, 854, 1),
(2, 1, 8544, 2),
(3, 1, 4654, 52),
(4, 1, 12121212, 2),
(5, 2, 10101010, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `login_user` varchar(32) NOT NULL,
  `password_user` varchar(16) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id_user`, `login_user`, `password_user`) VALUES
(1, 'login', 'password'),
(2, 'admin', 'admin'),
(3, 'anonyme', '');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
