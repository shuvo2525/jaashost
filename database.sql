-- ========================================================
-- JAAS BD Hosting Platform - Official Database Export
-- Compatible with: Local XAMPP (Apache, PHP 7.4 - 8.3+, MySQL / MariaDB)
-- phpMyAdmin Import Ready
-- ========================================================

CREATE DATABASE IF NOT EXISTS `jaasbd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `jaasbd`;

-- --------------------------------------------------------
-- Table structure for table `admins`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'Administrator',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admins` (`username`, `email`, `password`, `role`) VALUES
('admin', 'admin@jaasbd.com', 'admin123', 'Super Administrator')
ON DUPLICATE KEY UPDATE `password`=VALUES(`password`);

-- --------------------------------------------------------
-- Table structure for table `site_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('site_info', '{"title":"JAAS BD • Web Hosting, BDIX VPS & Cloud Servers in Bangladesh","favicon":"assets/images/jaasbd-logo.png","headerLogo":"assets/images/jaasbd-logo.png","footerLogo":"assets/images/jaasbd-logo.png","tagline":"We Help Businesses Grow Online","subtagline":"Get fast, secure and premium web hosting, domain names, business email, SSL, and cloud services to easily build and manage your website."}'),
('contact_info', '{"phone":"+88-01818-430308","email":"info@jaasbd.com","supportEmail":"support@jaasbd.com","address":"843/06, Kadim Dewhata, Mirzapur, Tangail. 1940.","whatsapp":"8801818430308"}'),
('gateways', '{"eps":{"name":"EPS Easy Payment System","psoLicensed":"Bangladesh Bank PSO Licensed","active":true},"bkash":{"name":"bKash Online Payment","merchantNumber":"01818430308","active":true},"nagad":{"name":"Nagad Payment","merchantNumber":"01818430308","active":true}}'),
('hero', '{"line1":"High Performance","line2":"NVMe Hosting in Bangladesh","badge":"10Gbps BDIX Connectivity Direct"}')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

-- --------------------------------------------------------
-- Table structure for table `packages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `packages` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `badge` VARCHAR(50) DEFAULT 'Popular',
  `base_price` INT NOT NULL,
  `storage` VARCHAR(50),
  `websites` VARCHAR(50),
  `ram` VARCHAR(50),
  `cpu` VARCHAR(50),
  `bandwidth` VARCHAR(50),
  `features_json` TEXT,
  `storage_options_json` LONGTEXT,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `packages` (`id`, `name`, `category`, `badge`, `base_price`, `storage`, `websites`, `ram`, `cpu`, `bandwidth`, `features_json`, `storage_options_json`, `sort_order`) VALUES
('starter-bdix', 'Starter BDIX Hosting', 'BDIX Web Hosting', 'Best For Starters', 199, '5 GB NVMe', '1 Website', '1 GB DDR4', '1 Core CPU', 'Unlimited', '["5 GB Pure NVMe SSD","1 Website Hosted","10Gbps BDIX Peering","Free SSL Certificate","cPanel Control Panel"]', '[{"gb":5,"price":199,"ram":"1 GB","cpu":"1 Core","sites":1,"bandwidth":"Unlimited"},{"gb":10,"price":299,"ram":"2 GB","cpu":"1 Core","sites":2,"bandwidth":"Unlimited"},{"gb":15,"price":399,"ram":"3 GB","cpu":"2 Cores","sites":3,"bandwidth":"Unlimited"}]', 1),
('business-hosting', 'Business Hosting', 'BDIX Web Hosting', 'Most Popular', 399, '20 GB NVMe', '5 Websites', '4 GB DDR4', '2 Cores CPU', 'Unlimited', '["20 GB Pure NVMe SSD","5 Websites Hosted","10Gbps BDIX Direct","Free Automated SSL","LiteSpeed Web Server","Daily Auto Backups"]', '[{"gb":10,"price":299,"ram":"2 GB","cpu":"1 Core","sites":3,"bandwidth":"Unlimited"},{"gb":20,"price":399,"ram":"4 GB","cpu":"2 Cores","sites":5,"bandwidth":"Unlimited"},{"gb":35,"price":549,"ram":"6 GB","cpu":"3 Cores","sites":10,"bandwidth":"Unlimited"},{"gb":50,"price":749,"ram":"8 GB","cpu":"4 Cores","sites":20,"bandwidth":"Unlimited"}]', 2),
('pro-bdix', 'Pro BDIX Enterprise', 'BDIX Web Hosting', 'Enterprise Power', 699, '40 GB NVMe', 'Unlimited Websites', '8 GB DDR4', '4 Cores CPU', 'Unlimited', '["40 GB Pure NVMe SSD","Unlimited Websites","Direct 10Gbps BDIX","Free Domain Included","Free Wildcard SSL","VIP Priority Support"]', '[{"gb":40,"price":699,"ram":"8 GB","cpu":"4 Cores","sites":"Unlimited","bandwidth":"Unlimited"},{"gb":60,"price":999,"ram":"12 GB","cpu":"6 Cores","sites":"Unlimited","bandwidth":"Unlimited"},{"gb":100,"price":1499,"ram":"16 GB","cpu":"8 Cores","sites":"Unlimited","bandwidth":"Unlimited"}]', 3),
('web-starter', 'Web Starter NVMe', 'Web Hosting', 'Budget Friendly', 149, '3 GB NVMe', '1 Website', '1 GB RAM', '1 Core', 'Unlimited', '["3 GB NVMe SSD","1 Website","Free SSL Protection","cPanel Dashboard","24/7 Support"]', '[{"gb":3,"price":149,"ram":"1 GB","cpu":"1 Core","sites":1,"bandwidth":"Unlimited"},{"gb":7,"price":229,"ram":"2 GB","cpu":"1 Core","sites":2,"bandwidth":"Unlimited"},{"gb":12,"price":319,"ram":"3 GB","cpu":"2 Cores","sites":3,"bandwidth":"Unlimited"}]', 4),
('web-standard', 'Standard cPanel Hosting', 'Web Hosting', 'Recommended', 299, '15 GB NVMe', '3 Websites', '3 GB RAM', '2 Cores', 'Unlimited', '["15 GB NVMe SSD","3 Websites Hosted","LiteSpeed Engine","cPanel Access","Daily Backups"]', '[{"gb":15,"price":299,"ram":"3 GB","cpu":"2 Cores","sites":3,"bandwidth":"Unlimited"},{"gb":25,"price":449,"ram":"4 GB","cpu":"2 Cores","sites":5,"bandwidth":"Unlimited"},{"gb":40,"price":649,"ram":"6 GB","cpu":"3 Cores","sites":10,"bandwidth":"Unlimited"}]', 5),
('web-premium', 'Web Premium Unlimited', 'Web Hosting', 'High Traffic', 549, '35 GB NVMe', 'Unlimited Websites', '6 GB RAM', '3 Cores', 'Unlimited', '["35 GB NVMe SSD","Unlimited Websites","Free SSL & CDN","LiteSpeed Enterprise","Priority 24/7 Care"]', '[{"gb":35,"price":549,"ram":"6 GB","cpu":"3 Cores","sites":"Unlimited","bandwidth":"Unlimited"},{"gb":50,"price":749,"ram":"8 GB","cpu":"4 Cores","sites":"Unlimited","bandwidth":"Unlimited"},{"gb":80,"price":1099,"ram":"12 GB","cpu":"6 Cores","sites":"Unlimited","bandwidth":"Unlimited"}]', 6),
('cloud-vps-1', 'BDIX Cloud VPS Starter', 'BDIX Cloud VPS', 'Dedicated Root', 999, '50 GB NVMe', 'Root Access', '4 GB ECC', '2 vCPU', '5 TB BDIX', '["50 GB NVMe Storage","4 GB Dedicated RAM","2 vCPU Cores","Full Root SSH Access","1 Dedicated IPv4"]', '[{"gb":50,"price":999,"ram":"4 GB","cpu":"2 vCPU","sites":"Unlimited","bandwidth":"5 TB"},{"gb":80,"price":1499,"ram":"8 GB","cpu":"4 vCPU","sites":"Unlimited","bandwidth":"10 TB"},{"gb":120,"price":2199,"ram":"16 GB","cpu":"6 vCPU","sites":"Unlimited","bandwidth":"Unlimited"}]', 7),
('cloud-vps-pro', 'BDIX Cloud VPS Pro', 'BDIX Cloud VPS', 'High Performance', 1799, '100 GB NVMe', 'Root Access', '8 GB ECC', '4 vCPU', '10 TB BDIX', '["100 GB NVMe Storage","8 GB Dedicated RAM","4 vCPU Cores","Tier-3 Dhaka Datacenter","DDoS Mitigation"]', '[{"gb":100,"price":1799,"ram":"8 GB","cpu":"4 vCPU","sites":"Unlimited","bandwidth":"10 TB"},{"gb":160,"price":2699,"ram":"16 GB","cpu":"6 vCPU","sites":"Unlimited","bandwidth":"Unlimited"}]', 8),
('cloud-vps-ultra', 'BDIX Cloud VPS Ultra', 'BDIX Cloud VPS', 'Maximum Power', 2999, '200 GB NVMe', 'Root Access', '16 GB ECC', '8 vCPU', 'Unlimited BDIX', '["200 GB NVMe Storage","16 GB Dedicated RAM","8 vCPU Cores","Automated Snapshot Backups","Dedicated Support Engineer"]', '[{"gb":200,"price":2999,"ram":"16 GB","cpu":"8 vCPU","sites":"Unlimited","bandwidth":"Unlimited"},{"gb":400,"price":4999,"ram":"32 GB","cpu":"12 vCPU","sites":"Unlimited","bandwidth":"Unlimited"}]', 9),
('ssl-cert', 'PositiveSSL Certificate', 'Software', 'Essential', 125, '256-bit Encryption', '1 Domain', 'Browser Padlock', '-', 'Unlimited', '["Instant SSL Activation","Free Reissues","Green HTTPS Padlock","Boost Google Ranking"]', '[{"gb":1,"price":125,"ram":"-","cpu":"-","sites":1,"bandwidth":"Unlimited"}]', 10),
('cpanel-solo', 'cPanel Solo License', 'Software', 'Official Partner', 1899, '1 Account', '1 User', 'Full WHM/cPanel', '-', 'Unlimited', '["Official cPanel License","1 Account Provisioning","Automatic Updates","Instant Automated Key"]', '[{"gb":1,"price":1899,"ram":"-","cpu":"-","sites":1,"bandwidth":"Unlimited"}]', 11),
('litespeed-ent', 'LiteSpeed Enterprise', 'Software', 'Ultra Fast', 1250, 'Unlimited Cache', 'High Traffic', 'LSCache Engine', '-', 'Unlimited', '["5x Apache Speed","Built-in Anti-DDoS","WordPress Accelerator Engine","Official License Key"]', '[{"gb":1,"price":1250,"ram":"-","cpu":"-","sites":1,"bandwidth":"Unlimited"}]', 12)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `base_price`=VALUES(`base_price`), `storage_options_json`=VALUES(`storage_options_json`);

-- --------------------------------------------------------
-- Table structure for table `domain_pricing`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `domain_pricing` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tld` VARCHAR(20) NOT NULL UNIQUE,
  `reg_price` INT NOT NULL,
  `renew_price` INT NOT NULL,
  `transfer_price` INT NOT NULL,
  `note` VARCHAR(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `domain_pricing` (`tld`, `reg_price`, `renew_price`, `transfer_price`, `note`) VALUES
('.com', 1450, 1550, 1450, ''),
('.com.bd', 2200, 2200, 2200, '2 Years Mandatory'),
('.net', 1850, 1950, 1850, ''),
('.org', 1750, 1850, 1750, ''),
('.xyz', 450, 1250, 1250, 'Special Promo'),
('.info', 1650, 1850, 1650, '')
ON DUPLICATE KEY UPDATE `reg_price`=VALUES(`reg_price`), `renew_price`=VALUES(`renew_price`), `transfer_price`=VALUES(`transfer_price`);

-- --------------------------------------------------------
-- Table structure for table `testimonials`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `rating` INT DEFAULT 5,
  `review` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `name`, `role`, `avatar`, `rating`, `review`, `sort_order`) VALUES
('testi-1', 'Arifur Rahman', 'CEO, TechBazaar BD', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 5, 'I found JAAS BD so useful and they fulfilled my requirements with complete IT support. It is the number one hosting solution for our fast-growing e-commerce platform.', 1),
('testi-2', 'Nusrat Jahan', 'Founder, ShopStyle Online', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face', 5, 'Wonderful service! Very quick response and extraordinary customer service. Their BDIX NVMe hosting gave us 1ms loading speeds across Bangladesh.', 2),
('testi-3', 'Mahmudul Hasan', 'Managing Director, Global Media Ltd', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 5, 'Most popular and reliable web hosting service provider in Bangladesh. Their technical team migrated our sites smoothly with zero downtime.', 3)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `role`=VALUES(`role`), `review`=VALUES(`review`);

-- --------------------------------------------------------
-- Table structure for table `clients`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NOT NULL,
  `company` VARCHAR(100) DEFAULT NULL,
  `address` TEXT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `clients` (`name`, `email`, `phone`, `company`, `address`, `password`) VALUES
('Ashish Halder', 'ashish@example.com', '+88-01818-430308', 'Golden Frame BD', '843/06, Kadim Dewhata, Mirzapur, Tangail. 1940.', 'JaasBd#2026!')
ON DUPLICATE KEY UPDATE `phone`=VALUES(`phone`);

-- --------------------------------------------------------
-- Table structure for table `services`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `client_email` VARCHAR(100) NOT NULL,
  `plan_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `domain` VARCHAR(255) NOT NULL,
  `storage` VARCHAR(50),
  `billing_cycle` VARCHAR(50),
  `price` INT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Active',
  `reg_date` DATE NOT NULL,
  `next_due` DATE NOT NULL,
  `server_ip` VARCHAR(50) DEFAULT '103.145.118.25',
  `nameservers` VARCHAR(255) DEFAULT 'ns1.jaasbd.com, ns2.jaasbd.com',
  `cpanel_user` VARCHAR(50),
  `cpanel_pass` VARCHAR(50),
  `disk_used` VARCHAR(50) DEFAULT '0.1 GB',
  `disk_limit` VARCHAR(50) DEFAULT '20 GB',
  `bandwidth_used` VARCHAR(50) DEFAULT '0.5 GB',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`id`, `client_email`, `plan_id`, `name`, `domain`, `storage`, `billing_cycle`, `price`, `status`, `reg_date`, `next_due`, `cpanel_user`, `cpanel_pass`) VALUES
('SRV-894215', 'ashish@example.com', 'business-hosting', 'Business Hosting', 'goldenframebd.com', '20 GB NVMe SSD', '1 Year', 3830, 'Active', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), 'goldenfr', 'JaasBd#Host2026')
ON DUPLICATE KEY UPDATE `status`=VALUES(`status`);

-- --------------------------------------------------------
-- Table structure for table `invoices`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` VARCHAR(50) PRIMARY KEY,
  `client_email` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  `plan_name` VARCHAR(255) NOT NULL,
  `domain` VARCHAR(255) NOT NULL,
  `subtotal` INT NOT NULL,
  `discount` INT NOT NULL DEFAULT 0,
  `amount` INT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'PAID',
  `gateway` VARCHAR(100) DEFAULT 'SSLCOMMERZ / EPS Online Payment',
  `txn_id` VARCHAR(100),
  `cpanel_user` VARCHAR(50),
  `cpanel_pass` VARCHAR(50),
  `server_ip` VARCHAR(50) DEFAULT '103.145.118.25',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `invoices` (`id`, `client_email`, `date`, `due_date`, `plan_name`, `domain`, `subtotal`, `discount`, `amount`, `status`, `gateway`, `txn_id`, `cpanel_user`, `cpanel_pass`) VALUES
('INV-2026-89104', 'ashish@example.com', CURDATE(), CURDATE(), 'Business Hosting (20 GB NVMe SSD) - 1 Year', 'goldenframebd.com', 4788, 958, 3830, 'PAID', 'SSLCOMMERZ / EPS Online Payment', 'TXN-SSL-891042', 'goldenfr', 'JaasBd#Host2026')
ON DUPLICATE KEY UPDATE `status`=VALUES(`status`);
