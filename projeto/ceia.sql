-- phpMyAdmin SQL Dump
-- version 4.0.3
-- http://www.phpmyadmin.net
--
-- Máquina: 127.0.0.1
-- Data de Criação: 06-Fev-2018 às 01:33
-- Versão do servidor: 5.6.11-log
-- versão do PHP: 5.5.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `ceia`
--
CREATE DATABASE IF NOT EXISTS `ceia` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ceia`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `campanha`
--

CREATE TABLE IF NOT EXISTS `campanha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Extraindo dados da tabela `campanha`
--

INSERT INTO `campanha` (`id`, `nome`, `status`) VALUES
(14, 'Campanha do PÃ£o', 'ativo'),
(15, 'apapar', 'ativo'),
(16, 'apapar', 'ativo'),
(17, 'apapar', 'ativo'),
(18, 'apapar', 'ativo'),
(19, 'apapar', 'ativo'),
(20, 'apapar', 'ativo'),
(21, 'apapar', 'ativo'),
(22, 'apapar', 'ativo'),
(23, 'Nova Campanha', 'ativo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `campanha_usuario`
--

CREATE TABLE IF NOT EXISTS `campanha_usuario` (
  `id_campanha` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_campanha`,`id_usuario`),
  KEY `fk_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `campanha_usuario`
--

INSERT INTO `campanha_usuario` (`id_campanha`, `id_usuario`) VALUES
(14, 1),
(14, 8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contagem_itens`
--

CREATE TABLE IF NOT EXISTS `contagem_itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_item` int(11) NOT NULL,
  `dt_atividade` date NOT NULL,
  `quantidade` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contagem_unica` (`id_item`,`dt_atividade`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Extraindo dados da tabela `contagem_itens`
--

INSERT INTO `contagem_itens` (`id`, `id_item`, `dt_atividade`, `quantidade`) VALUES
(2, 2, '2018-02-04', 109),
(3, 3, '2018-02-04', 2),
(9, 1, '2018-02-04', 53.3),
(11, 4, '2018-02-04', 1),
(12, 2, '2018-02-05', 1),
(13, 3, '2018-02-05', 2),
(14, 1, '2018-02-05', 4.66),
(15, 4, '2018-02-05', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `item`
--

CREATE TABLE IF NOT EXISTS `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `id_lista` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_lista` (`id_lista`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `item`
--

INSERT INTO `item` (`id`, `nome`, `id_lista`) VALUES
(1, 'Arroz 1', 1),
(2, 'FeijÃ£o', 1),
(3, 'quiabo', 1),
(4, 'vinagre', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_frequencia`
--

CREATE TABLE IF NOT EXISTS `lista_frequencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `id_campanha` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_freq_campanha` (`id_campanha`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `lista_frequencia`
--

INSERT INTO `lista_frequencia` (`id`, `nome`, `status`, `id_campanha`) VALUES
(3, 'Voluntarios', 'ativo', 14);

-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_itens`
--

CREATE TABLE IF NOT EXISTS `lista_itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `status` varchar(7) NOT NULL,
  `id_campanha` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_itens_campanha` (`id_campanha`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `lista_itens`
--

INSERT INTO `lista_itens` (`id`, `nome`, `status`, `id_campanha`) VALUES
(1, 'doacoes', 'ativo', 14);

-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_pessoa`
--

CREATE TABLE IF NOT EXISTS `lista_pessoa` (
  `id_lista` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  PRIMARY KEY (`id_lista`,`id_pessoa`),
  KEY `fk_frequencia_pessoa` (`id_pessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `lista_pessoa`
--

INSERT INTO `lista_pessoa` (`id_lista`, `id_pessoa`) VALUES
(3, 30),
(3, 31),
(3, 32),
(3, 33),
(3, 35),
(3, 36),
(3, 37),
(3, 38),
(3, 39),
(3, 40),
(3, 41),
(3, 42),
(3, 43);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `nome_mae` varchar(200) DEFAULT NULL,
  `atualizado` varchar(5) NOT NULL,
  `tem_foto` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Extraindo dados da tabela `pessoa`
--

INSERT INTO `pessoa` (`id`, `nome`, `dt_nascimento`, `nome_mae`, `atualizado`, `tem_foto`) VALUES
(30, 'JoÃ£o Rodrigo Ferreira da Silva Sousa', '1982-03-05', 'Zuleide da Silva Sousa', 'true', 'true'),
(31, 'apagar', '2010-05-09', 'maria zelia', 'true', 'false'),
(32, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(33, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(34, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(35, 'apagar', '2010-05-11', 'maria', 'true', 'false'),
(36, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(37, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(38, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(39, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(40, 'apagar', '2010-05-06', 'maria', 'true', 'false'),
(41, 'Ãtala mirela', '2019-01-23', '', 'false', 'false'),
(42, 'Bruna', '2018-01-25', '', 'false', 'true'),
(43, 'Ana', '0000-00-00', '', 'false', 'false'),
(44, 'Nova Pessoa', NULL, NULL, 'false', 'false'),
(45, 'Nova Pessoa', NULL, NULL, 'false', 'false');

-- --------------------------------------------------------

--
-- Estrutura da tabela `presenca`
--

CREATE TABLE IF NOT EXISTS `presenca` (
  `id_lista` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `dt_frequencia` date NOT NULL,
  PRIMARY KEY (`id_pessoa`,`id_lista`,`dt_frequencia`),
  KEY `fk_presenca_lista` (`id_lista`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `presenca`
--

INSERT INTO `presenca` (`id_lista`, `id_pessoa`, `dt_frequencia`) VALUES
(3, 31, '2018-01-23'),
(3, 31, '2018-01-29'),
(3, 32, '2018-01-23'),
(3, 33, '2018-01-23'),
(3, 35, '2018-01-29'),
(3, 36, '2018-01-23'),
(3, 40, '2018-01-23'),
(3, 43, '2018-01-29');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `login` varchar(50) NOT NULL,
  `hash` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL,
  `perfil` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `login`, `hash`, `status`, `perfil`) VALUES
(1, 'JoÃ£o Rodrigo Ferreira da Silva Sousa', 'rodrigo', 'd964173dc44da83eeafa3aebbee9a1a0', 'ativo', 'administrador'),
(8, 'UsuÃ¡rio Editor', 'usuario', 'd964173dc44da83eeafa3aebbee9a1a0', 'ativo', 'editor'),
(9, 'apagar', '1', '1', 'ativo', 'editor'),
(10, 'apagar', '1', '1', 'ativo', 'editor'),
(11, 'apagar', '1', '1', 'ativo', 'editor'),
(12, 'apagar', '1', '1', 'ativo', 'editor'),
(13, 'apagar', '1', '1', 'ativo', 'editor'),
(14, 'apagar', '1', '1', 'ativo', 'editor'),
(15, 'apagar', '1', '1', 'ativo', 'editor');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `campanha_usuario`
--
ALTER TABLE `campanha_usuario`
  ADD CONSTRAINT `fk_campanha` FOREIGN KEY (`id_campanha`) REFERENCES `campanha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `contagem_itens`
--
ALTER TABLE `contagem_itens`
  ADD CONSTRAINT `fk_contagem_item` FOREIGN KEY (`id_item`) REFERENCES `item` (`id`);

--
-- Limitadores para a tabela `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_item_lista` FOREIGN KEY (`id_lista`) REFERENCES `lista_itens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `lista_frequencia`
--
ALTER TABLE `lista_frequencia`
  ADD CONSTRAINT `fk_freq_campanha` FOREIGN KEY (`id_campanha`) REFERENCES `campanha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `lista_itens`
--
ALTER TABLE `lista_itens`
  ADD CONSTRAINT `fk_itens_campanha` FOREIGN KEY (`id_campanha`) REFERENCES `campanha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `lista_pessoa`
--
ALTER TABLE `lista_pessoa`
  ADD CONSTRAINT `fk_frequencia_pessoa` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pessoa_frequencia` FOREIGN KEY (`id_lista`) REFERENCES `lista_frequencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `presenca`
--
ALTER TABLE `presenca`
  ADD CONSTRAINT `fk_presenca_lista` FOREIGN KEY (`id_lista`) REFERENCES `lista_frequencia` (`id`),
  ADD CONSTRAINT `fk_presenca_pessoa` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
