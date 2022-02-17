-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ecomerce
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bodega`
--

DROP TABLE IF EXISTS `bodega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodega` (
  `id_bod` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_bod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_bod` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telef_bod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cel_bod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomb_contac_bod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_ciudad` bigint unsigned NOT NULL,
  `id_direccion` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_bod`),
  KEY `bodega_id_ciudad_foreign` (`id_ciudad`),
  KEY `bodega_id_direccion_foreign` (`id_direccion`),
  CONSTRAINT `bodega_id_ciudad_foreign` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`) ON DELETE CASCADE,
  CONSTRAINT `bodega_id_direccion_foreign` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodega`
--

LOCK TABLES `bodega` WRITE;
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `id_cargo` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_emp` bigint unsigned NOT NULL,
  `nomb_cargo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observ_cargo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_cargo` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_cat` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nomb_cat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observ_cat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_cat` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id_ciudad` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_provincia` bigint unsigned NOT NULL,
  `estado_ciudad` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_ciudad`),
  KEY `ciudad_id_provincia_foreign` (`id_provincia`),
  CONSTRAINT `ciudad_id_provincia_foreign` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id_provincia`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tipo_cli` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado_cli` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_persona` bigint unsigned NOT NULL,
  `id_empresa` bigint unsigned NOT NULL,
  `id_direccion` bigint unsigned NOT NULL,
  `id_usu` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `cliente_id_persona_foreign` (`id_persona`),
  KEY `cliente_id_empresa_foreign` (`id_empresa`),
  KEY `cliente_id_direccion_foreign` (`id_direccion`),
  KEY `cliente_id_usu_foreign` (`id_usu`),
  CONSTRAINT `cliente_id_direccion_foreign` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`) ON DELETE CASCADE,
  CONSTRAINT `cliente_id_empresa_foreign` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE,
  CONSTRAINT `cliente_id_persona_foreign` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE,
  CONSTRAINT `cliente_id_usu_foreign` FOREIGN KEY (`id_usu`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id_det_fact` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_prod` double NOT NULL,
  `descuento` double NOT NULL,
  `neto` double NOT NULL,
  `iva` double NOT NULL,
  `total` double NOT NULL,
  `id_fact` bigint unsigned NOT NULL,
  `id_prod` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_det_fact`),
  KEY `detalle_factura_id_fact_foreign` (`id_fact`),
  KEY `detalle_factura_id_prod_foreign` (`id_prod`),
  CONSTRAINT `detalle_factura_id_fact_foreign` FOREIGN KEY (`id_fact`) REFERENCES `factura` (`id_fact`) ON DELETE CASCADE,
  CONSTRAINT `detalle_factura_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle_ped` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_prod` bigint unsigned NOT NULL,
  `id_pedido` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL,
  `total_detalle` double NOT NULL,
  PRIMARY KEY (`id_detalle_ped`),
  KEY `detalle_pedido_id_prod_foreign` (`id_prod`),
  KEY `detalle_pedido_id_pedido_foreign` (`id_pedido`),
  CONSTRAINT `detalle_pedido_id_pedido_foreign` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE,
  CONSTRAINT `detalle_pedido_id_prod_foreign` FOREIGN KEY (`id_prod`) REFERENCES `producto` (`id_prod`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `id_direccion` bigint unsigned NOT NULL AUTO_INCREMENT,
  `direcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `calle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `piso` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_ciudad` bigint unsigned NOT NULL,
  `estado_direccion` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `direccion_id_ciudad_foreign` (`id_ciudad`),
  CONSTRAINT `direccion_id_ciudad_foreign` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id_empleado` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_empresa` bigint unsigned NOT NULL,
  `id_usu` bigint unsigned NOT NULL,
  `id_cargo` bigint unsigned NOT NULL,
  `id_persona` bigint unsigned NOT NULL,
  `estado_empl` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `empleado_id_empresa_foreign` (`id_empresa`),
  KEY `empleado_id_usu_foreign` (`id_usu`),
  KEY `empleado_id_cargo_foreign` (`id_cargo`),
  KEY `empleado_id_persona_foreign` (`id_persona`),
  CONSTRAINT `empleado_id_cargo_foreign` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`) ON DELETE CASCADE,
  CONSTRAINT `empleado_id_empresa_foreign` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE,
  CONSTRAINT `empleado_id_persona_foreign` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE,
  CONSTRAINT `empleado_id_usu_foreign` FOREIGN KEY (`id_usu`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` bigint unsigned NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo_envio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_comercial` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado_empresa` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio`
--

DROP TABLE IF EXISTS `envio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio` (
  `id_envio` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha_inicio_ped` date NOT NULL,
  `fecha_fin_ped` date NOT NULL,
  `fecha_registro_env` date NOT NULL,
  `ciudad_origen` bigint unsigned NOT NULL,
  `ciudad_destino` bigint unsigned NOT NULL,
  `id_pedido` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_envio`),
  KEY `envio_ciudad_origen_foreign` (`ciudad_origen`),
  KEY `envio_ciudad_destino_foreign` (`ciudad_destino`),
  KEY `envio_id_pedido_foreign` (`id_pedido`),
  CONSTRAINT `envio_ciudad_destino_foreign` FOREIGN KEY (`ciudad_destino`) REFERENCES `ciudad` (`id_ciudad`) ON DELETE CASCADE,
  CONSTRAINT `envio_ciudad_origen_foreign` FOREIGN KEY (`ciudad_origen`) REFERENCES `ciudad` (`id_ciudad`) ON DELETE CASCADE,
  CONSTRAINT `envio_id_pedido_foreign` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio`
--

LOCK TABLES `envio` WRITE;
/*!40000 ALTER TABLE `envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `envio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_pedido` (
  `id_estado_pedido` bigint unsigned NOT NULL AUTO_INCREMENT,
  `estado_inicial` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_actual` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_final` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` date NOT NULL,
  `id_pedido` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_estado_pedido`),
  KEY `estado_pedido_id_pedido_foreign` (`id_pedido`),
  CONSTRAINT `estado_pedido_id_pedido_foreign` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id_fact` bigint unsigned NOT NULL AUTO_INCREMENT,
  `num_fact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_emision_fact` date NOT NULL,
  `hora_emision_fact` time NOT NULL,
  `vencimiento_fact` date NOT NULL,
  `observ_fact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal_fact` double NOT NULL,
  `subcero_fact` double NOT NULL,
  `subiva_fact` double NOT NULL,
  `subice_fact` double NOT NULL,
  `total_fact` double NOT NULL,
  `id_formapago` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_fact`),
  KEY `factura_id_formapago_foreign` (`id_formapago`),
  CONSTRAINT `factura_id_formapago_foreign` FOREIGN KEY (`id_formapago`) REFERENCES `forma_pago` (`id_formapago`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pago` (
  `id_formapago` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nomb_formapago` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observ_formapago` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_formapago` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_formapago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nomb_marca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observ_marca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_marca` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_02_09_210930_create_pais',1),(6,'2022_02_09_211352_create_provincia',1),(7,'2022_02_09_211421_create_ciudad',1),(8,'2022_02_09_211457_create_direccion',1),(9,'2022_02_09_211534_create_tipo_identificacion',1),(10,'2022_02_09_211535_create_persona',1),(11,'2022_02_09_211604_create_empresa',1),(12,'2022_02_09_211621_create_cargo',1),(13,'2022_02_09_211622_create_cliente',1),(14,'2022_02_09_211641_create_empleado',1),(15,'2022_02_09_211825_create_bodega',1),(16,'2022_02_09_211859_create_categoria',1),(17,'2022_02_09_211915_create_marca',1),(18,'2022_02_09_211951_create_producto',1),(19,'2022_02_09_212023_create_forma_pago',1),(20,'2022_02_09_212024_create_pedido',1),(21,'2022_02_09_212042_create_detalle_pedido',1),(22,'2022_02_09_212133_create_estado_pedido',1),(23,'2022_02_09_212359_create_factura',1),(24,'2022_02_09_212429_create_detalle_factura',1),(25,'2022_02_09_212521_create_envio',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id_pais` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_pais` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_pais` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` bigint unsigned NOT NULL AUTO_INCREMENT,
  `total` double NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_ult_mod` date NOT NULL,
  `fecha_registro_ped` date NOT NULL,
  `estado_ped` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_cliente` bigint unsigned NOT NULL,
  `id_formapago` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `pedido_id_cliente_foreign` (`id_cliente`),
  KEY `pedido_id_formapago_foreign` (`id_formapago`),
  CONSTRAINT `pedido_id_cliente_foreign` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `pedido_id_formapago_foreign` FOREIGN KEY (`id_formapago`) REFERENCES `forma_pago` (`id_formapago`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_persona` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_persona` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido_persona` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tipo_ident` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `persona_id_tipo_ident_foreign` (`id_tipo_ident`),
  CONSTRAINT `persona_id_tipo_ident_foreign` FOREIGN KEY (`id_tipo_ident`) REFERENCES `tipo_identificacion` (`id_tipo_ident`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_prod` bigint unsigned NOT NULL AUTO_INCREMENT,
  `codigo_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codbarra_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `present_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_prod` double NOT NULL,
  `stockmin_prod` int NOT NULL,
  `stockmax_prod` int NOT NULL,
  `stock_prod` int NOT NULL,
  `fechaing_prod` date NOT NULL,
  `fechaelab_prod` date NOT NULL,
  `fechacad_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aplicaiva_prod` tinyint(1) NOT NULL,
  `aplicaice_prod` tinyint(1) NOT NULL,
  `util_prod` double NOT NULL,
  `comision_prod` double NOT NULL,
  `imagen_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observ_prod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_prod` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_bod` bigint unsigned NOT NULL,
  `id_marca` bigint unsigned NOT NULL,
  `id_cat` bigint unsigned NOT NULL,
  `id_empresa` bigint unsigned NOT NULL,
  PRIMARY KEY (`id_prod`),
  KEY `producto_id_bod_foreign` (`id_bod`),
  KEY `producto_id_marca_foreign` (`id_marca`),
  KEY `producto_id_cat_foreign` (`id_cat`),
  KEY `producto_id_empresa_foreign` (`id_empresa`),
  CONSTRAINT `producto_id_bod_foreign` FOREIGN KEY (`id_bod`) REFERENCES `bodega` (`id_bod`) ON DELETE CASCADE,
  CONSTRAINT `producto_id_cat_foreign` FOREIGN KEY (`id_cat`) REFERENCES `categoria` (`id_cat`) ON DELETE CASCADE,
  CONSTRAINT `producto_id_empresa_foreign` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE,
  CONSTRAINT `producto_id_marca_foreign` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `id_provincia` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_provincia` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_pais` bigint unsigned NOT NULL,
  `estado_prod` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_provincia`),
  KEY `provincia_id_pais_foreign` (`id_pais`),
  CONSTRAINT `provincia_id_pais_foreign` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_identificacion`
--

DROP TABLE IF EXISTS `tipo_identificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_identificacion` (
  `id_tipo_ident` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tipo_ident` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_tipo_ident` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_ident`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_identificacion`
--

LOCK TABLES `tipo_identificacion` WRITE;
/*!40000 ALTER TABLE `tipo_identificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_identificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_user` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-16 14:41:00
