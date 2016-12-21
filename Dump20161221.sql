CREATE DATABASE  IF NOT EXISTS `billing_software` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `billing_software`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: billing_software
-- ------------------------------------------------------
-- Server version	5.7.10-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_info`
--

DROP TABLE IF EXISTS `customer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_info` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `company` varchar(245) DEFAULT NULL,
  `address` varchar(245) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pan` varchar(45) DEFAULT NULL,
  `description` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='data of all the customer	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_info`
--

LOCK TABLES `customer_info` WRITE;
/*!40000 ALTER TABLE `customer_info` DISABLE KEYS */;
INSERT INTO `customer_info` VALUES (1,'Tulsi Jain','mahaveer cement center','kesinga','9590716661','tulsirock@gmail.com','kesing','AKIPskdjjfh',NULL),(2,'sneha','jaggu123','kesinga','24234324','tulsirock@gmail.com','kesinga','sdkfjls','sdljflds');
/*!40000 ALTER TABLE `customer_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealer`
--

DROP TABLE IF EXISTS `dealer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer` (
  `dealer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`dealer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Contains dealer information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer`
--

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;
INSERT INTO `dealer` VALUES (1,'lalit','kesinga','kesinga','9892749827','lalit.jain@gmail.com'),(3,'sneha','kesinga','kesinga','24234324','tulsirock@gmail.com');
/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `pay_type` varchar(45) DEFAULT NULL,
  `pay_status` varchar(45) DEFAULT NULL,
  `total_amount` varchar(45) DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `service_tax` decimal(10,2) DEFAULT NULL,
  `vat` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `net_amount` decimal(10,2) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `customer_idx` (`customer_id`),
  CONSTRAINT `customer` FOREIGN KEY (`customer_id`) REFERENCES `customer_info` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='invoicedetails';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2016-10-10 00:00:00','cash','paid','50000','2016-10-10 00:00:00',2000.00,1000.00,20.00,48900.00,1),(3,'2016-10-09 18:30:00','credit','unpaid','50000','2016-10-09 18:30:00',2000.00,1000.00,20.00,48900.00,1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_master`
--

DROP TABLE IF EXISTS `product_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_master` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `quality` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `unit` varchar(45) NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `id_UNIQUE` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_master`
--

LOCK TABLES `product_master` WRITE;
/*!40000 ALTER TABLE `product_master` DISABLE KEYS */;
INSERT INTO `product_master` VALUES (1,'Birla Bold','high','Birla gold supreme text123','bag'),(2,'rod','low','rod','bag'),(12,'test','test','test','KG'),(13,'rod','Low','from raipur','Bag'),(16,'Rod xyz','Low','from haryana','Bag'),(19,'rod','Low','hsadjkashd','Bag'),(21,'ambuja','high','ambuja cement','bag');
/*!40000 ALTER TABLE `product_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `dealer_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `rate` decimal(12,2) DEFAULT NULL,
  `total` decimal(12,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  KEY `dealer_id_idx` (`dealer_id`),
  KEY `item_id_idx` (`item_id`),
  CONSTRAINT `dealer_id` FOREIGN KEY (`dealer_id`) REFERENCES `dealer` (`dealer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `product_master` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='purchase information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,1,1,'2016-10-12 00:00:00',400.00,120.00,5000.00,'slkjfd'),(2,1,1,'2016-10-11 18:30:00',12200.00,120.00,2000.00,'sdkfjls');
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `quantity` decimal(12,2) DEFAULT NULL,
  `rate` decimal(12,2) DEFAULT NULL,
  `total_amount` decimal(12,2) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `tax_rate` decimal(12,2) DEFAULT NULL,
  `tax_amount` decimal(12,2) DEFAULT NULL,
  `gross_amount` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`sales_id`),
  KEY `invoice_idx` (`invoice_id`),
  CONSTRAINT `invoice` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='sales and billing data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (2,1,510.00,200.00,20000.00,1,'2016-12-12 00:00:00','salesdoone',200.20,1999.00,100.00);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `quantity` decimal(2,0) DEFAULT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `item_idx` (`item_id`),
  CONSTRAINT `item` FOREIGN KEY (`item_id`) REFERENCES `product_master` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='data of current stock';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,50),(2,2,50);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='User login data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin','admin'),('staff','staff'),('tulsi','tulsi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-21 18:06:04
