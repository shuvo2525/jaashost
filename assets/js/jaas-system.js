/**
 * JAAS BD Hosting & Billing System (FOSSBilling / WHMCS-style Architecture)
 * Complete Service Catalog, Cart, Orders, User Storage, Invoices, and cPanel Provisioning.
 */

const JAAS_CATALOG = {
  "web-starter": {
    "id": "web-starter",
    "name": "Web Hosting Starter",
    "category": "Web Hosting",
    "badge": "Starter",
    "basePrice": 99,
    "regularPrice": 134,
    "discountPrice": 99,
    "discountPercent": 26,
    "annualPrice": 1188,
    "vatRate": 0,
    "storage": "5 GB NVMe",
    "websites": "1 Website",
    "ram": "1 GB RAM",
    "cpu": "1 Core CPU",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "5 GB Pure NVMe SSD Storage",
      "1 Hosted Website",
      "cPanel Control Panel",
      "LiteSpeed Web Server",
      "Free Automated SSL Certificate",
      "Daily Remote Backups",
      "Unlimited BDIX Bandwidth"
    ],
    "storageOptions": [
      {
        "gb": 5,
        "price": 99,
        "ram": "1 GB",
        "cpu": "1 Core",
        "sites": 1,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "web-business": {
    "id": "web-business",
    "name": "Web Hosting Business",
    "category": "Web Hosting",
    "badge": "Popular",
    "basePrice": 199,
    "regularPrice": 299,
    "discountPrice": 199,
    "discountPercent": 33,
    "annualPrice": 2268,
    "vatRate": 0,
    "storage": "15 GB NVMe",
    "websites": "3 Websites",
    "ram": "2 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "15 GB NVMe SSD Storage",
      "3 Hosted Websites",
      "cPanel Control Panel",
      "LiteSpeed + LSCache Plugin",
      "Free SSL & Daily Auto Backups",
      "99.9% Server Uptime SLA",
      "Unlimited 10Gbps BDIX Peering"
    ],
    "storageOptions": [
      {
        "gb": 15,
        "price": 199,
        "ram": "2 GB",
        "cpu": "2 Cores",
        "sites": 3,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "web-pro": {
    "id": "web-pro",
    "name": "Web Hosting Ultimate Pro",
    "category": "Web Hosting",
    "badge": "Best Value",
    "basePrice": 349,
    "regularPrice": 499,
    "discountPrice": 349,
    "discountPercent": 30,
    "annualPrice": 3978,
    "vatRate": 0,
    "storage": "35 GB NVMe",
    "websites": "10 Websites",
    "ram": "4 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "35 GB Enterprise NVMe SSD",
      "10 Hosted Websites",
      "cPanel + Softaculous 400+ Apps",
      "LiteSpeed Web Server",
      "Free Wildcard SSL",
      "Daily Offsite Cloud Backup",
      "VIP Priority Support"
    ],
    "storageOptions": [
      {
        "gb": 35,
        "price": 349,
        "ram": "4 GB",
        "cpu": "2 Cores",
        "sites": 10,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "starter-hosting": {
    "id": "starter-hosting",
    "name": "Cheap Starter Hosting",
    "category": "Web Hosting",
    "badge": "Budget Friendly",
    "basePrice": 99,
    "regularPrice": 134,
    "discountPrice": 99,
    "discountPercent": 26,
    "annualPrice": 1188,
    "vatRate": 0,
    "storage": "2 GB NVMe",
    "websites": "1 Website",
    "ram": "1 GB RAM",
    "cpu": "1 Core CPU",
    "bandwidth": "100 GB Bandwidth",
    "features": [
      "2 GB NVMe SSD Storage",
      "1 Hosted Website",
      "cPanel Control Panel",
      "Free Lifetime SSL Certificate",
      "1-Click WordPress Installer",
      "24/7 Helpline Support"
    ],
    "storageOptions": [
      {
        "gb": 2,
        "price": 99,
        "ram": "1 GB",
        "cpu": "1 Core",
        "sites": 1,
        "bandwidth": "100 GB"
      }
    ]
  },
  "premium-hosting": {
    "id": "premium-hosting",
    "name": "Premium High-Traffic Hosting",
    "category": "Web Hosting",
    "badge": "High Traffic",
    "basePrice": 299,
    "regularPrice": 450,
    "discountPrice": 299,
    "discountPercent": 34,
    "annualPrice": 3400,
    "vatRate": 5,
    "storage": "25 GB NVMe",
    "websites": "5 Websites",
    "ram": "4 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited Bandwidth",
    "features": [
      "25 GB NVMe Storage RAID-10",
      "5 Hosted Websites",
      "LiteSpeed + LSCache Acceleration",
      "cPanel with 400+ Script Installer",
      "DDoS Protection 30 Gbps",
      "Free Website Migration"
    ],
    "storageOptions": [
      {
        "gb": 25,
        "price": 299,
        "ram": "4 GB",
        "cpu": "2 Cores",
        "sites": 5,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "business-hosting": {
    "id": "business-hosting",
    "name": "Business Hosting",
    "category": "Web Hosting",
    "badge": "Corporate",
    "basePrice": 399,
    "regularPrice": 599,
    "discountPrice": 399,
    "discountPercent": 33,
    "annualPrice": 4548,
    "vatRate": 5,
    "storage": "50 GB NVMe",
    "websites": "15 Websites",
    "ram": "6 GB RAM",
    "cpu": "4 Cores CPU",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "50 GB Dedicated NVMe Allocation",
      "15 Hosted Websites",
      "Isolated Cloud Container",
      "Dedicated IP Available",
      "Priority 24/7 VIP Phone Support",
      "Enterprise Business Mail Service"
    ],
    "storageOptions": [
      {
        "gb": 50,
        "price": 399,
        "ram": "6 GB",
        "cpu": "4 Cores",
        "sites": 15,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "corporate-hosting": {
    "id": "corporate-hosting",
    "name": "Corporate Hosting",
    "category": "Web Hosting",
    "badge": "Enterprise",
    "basePrice": 799,
    "regularPrice": 1200,
    "discountPrice": 799,
    "discountPercent": 33,
    "annualPrice": 9100,
    "vatRate": 5,
    "storage": "100 GB NVMe",
    "websites": "Unlimited Websites",
    "ram": "8 GB RAM",
    "cpu": "6 Cores CPU",
    "bandwidth": "Unlimited 10Gbps BDIX",
    "features": [
      "100 GB Dedicated Cloud Storage",
      "Unlimited Hosted Websites",
      "Custom Enterprise SLA 99.99%",
      "Daily Off-site Automatic Backups",
      "Dedicated Account Manager",
      "Security Audits & Malware Removal"
    ],
    "storageOptions": [
      {
        "gb": 100,
        "price": 799,
        "ram": "8 GB",
        "cpu": "6 Cores",
        "sites": "Unlimited",
        "bandwidth": "Unlimited BDIX"
      }
    ]
  },
  "wordpress-hosting": {
    "id": "wordpress-hosting",
    "name": "BDIX WordPress Cloud Hosting",
    "category": "Web Hosting",
    "badge": "WP Ultra",
    "basePrice": 499,
    "regularPrice": 699,
    "discountPrice": 499,
    "discountPercent": 29,
    "annualPrice": 5688,
    "vatRate": 0,
    "storage": "25 GB NVMe",
    "websites": "5 Websites",
    "ram": "8 GB RAM",
    "cpu": "4 vCPU",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "WP-CLI & Staging Environment",
      "Redis Object Caching Built-in",
      "Free Cloudflare Enterprise CDN",
      "Automated Daily WP Core & Plugin Updates",
      "LiteSpeed Cache Tuned for WP",
      "Free Migration by WP Specialists"
    ],
    "storageOptions": [
      {
        "gb": 25,
        "price": 499,
        "ram": "8 GB",
        "cpu": "4 vCPU",
        "sites": 5,
        "bandwidth": "Unlimited BDIX"
      }
    ]
  },
  "windows-hosting": {
    "id": "windows-hosting",
    "name": "Windows ASP.NET Hosting",
    "category": "Web Hosting",
    "badge": "Windows Server",
    "basePrice": 399,
    "regularPrice": 550,
    "discountPrice": 399,
    "discountPercent": 27,
    "annualPrice": 4548,
    "vatRate": 0,
    "storage": "20 GB NVMe",
    "websites": "2 Websites",
    "ram": "4 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited Bandwidth",
    "features": [
      "Windows Server 2022 IIS 10",
      "Plesk Control Panel",
      "ASP.NET Core, .NET 8, MVC Support",
      "Microsoft SQL Server + MySQL Included",
      "Free SSL Certificate",
      "Full Crystal Reports Support"
    ],
    "storageOptions": [
      {
        "gb": 20,
        "price": 399,
        "ram": "4 GB",
        "cpu": "2 Cores",
        "sites": 2,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "bdix-starter": {
    "id": "bdix-starter",
    "name": "BDIX Starter Hosting",
    "category": "BDIX Web Hosting",
    "badge": "Ultra Fast",
    "basePrice": 134,
    "regularPrice": 185,
    "discountPrice": 134,
    "discountPercent": 28,
    "annualPrice": 1608,
    "vatRate": 0,
    "storage": "5 GB NVMe",
    "websites": "1 Website",
    "ram": "1.5 GB RAM",
    "cpu": "1 Core CPU",
    "bandwidth": "Unlimited 10Gbps BDIX",
    "features": [
      "Direct 10 Gbps BDIX Peering",
      "1ms Ultra-Low Latency in Bangladesh",
      "Pure NVMe SSD Storage",
      "cPanel with Softaculous 400+ Apps",
      "Free Automated SSL Certificate",
      "Daily Automated Backups"
    ],
    "storageOptions": [
      {
        "gb": 5,
        "price": 134,
        "ram": "1.5 GB",
        "cpu": "1 Core",
        "sites": 1,
        "bandwidth": "Unlimited 10Gbps"
      }
    ]
  },
  "bdix-pro": {
    "id": "bdix-pro",
    "name": "BDIX Professional Hosting",
    "category": "BDIX Web Hosting",
    "badge": "Most Popular",
    "basePrice": 299,
    "regularPrice": 420,
    "discountPrice": 299,
    "discountPercent": 29,
    "annualPrice": 3400,
    "vatRate": 0,
    "storage": "15 GB NVMe",
    "websites": "3 Websites",
    "ram": "2 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited 10Gbps BDIX",
    "features": [
      "15 GB NVMe SSD Storage",
      "3 Hosted Websites",
      "Direct 10Gbps BDIX Connected",
      "LiteSpeed Web Server with LSCache",
      "Free Wildcard SSL Protection",
      "Daily Remote Backups",
      "99.9% Uptime SLA"
    ],
    "storageOptions": [
      {
        "gb": 15,
        "price": 299,
        "ram": "2 GB",
        "cpu": "2 Cores",
        "sites": 3,
        "bandwidth": "Unlimited 10Gbps"
      }
    ]
  },
  "bdix-business": {
    "id": "bdix-business",
    "name": "BDIX Business Enterprise",
    "category": "BDIX Web Hosting",
    "badge": "Best Performance",
    "basePrice": 499,
    "regularPrice": 699,
    "discountPrice": 499,
    "discountPercent": 29,
    "annualPrice": 5688,
    "vatRate": 5,
    "storage": "30 GB NVMe",
    "websites": "10 Websites",
    "ram": "4 GB RAM",
    "cpu": "2 Cores CPU",
    "bandwidth": "Unlimited 10Gbps BDIX",
    "features": [
      "30 GB Pure NVMe SSD",
      "10 Hosted Websites",
      "Direct 10Gbps BDIX Peering",
      "cPanel Control Panel",
      "Free SSL & Daily Remote Backups",
      "Priority VIP Hotline Support",
      "Instant Account Activation"
    ],
    "storageOptions": [
      {
        "gb": 30,
        "price": 499,
        "ram": "4 GB",
        "cpu": "2 Cores",
        "sites": 10,
        "bandwidth": "Unlimited 10Gbps"
      }
    ]
  },
  "bdix-hosting": {
    "id": "bdix-hosting",
    "name": "BDIX Web Hosting (Multi-Tier)",
    "category": "BDIX Web Hosting",
    "badge": "Popular",
    "basePrice": 134,
    "regularPrice": 199,
    "discountPrice": 134,
    "discountPercent": 33,
    "annualPrice": 1608,
    "vatRate": 0,
    "storage": "5 GB NVMe",
    "websites": "1 Website",
    "ram": "1.5 GB RAM",
    "cpu": "1 Core CPU",
    "bandwidth": "Unlimited 10Gbps",
    "features": [
      "Multi-Tier Storage Scaling (5 GB to 60 GB)",
      "10 Gbps Ultra Fast BDIX Peering",
      "NVMe SSD High IOPS Storage",
      "cPanel Control Panel",
      "Free SSL & Automated Backups"
    ],
    "storageOptions": [
      {
        "gb": 5,
        "price": 134,
        "ram": "1.5 GB",
        "cpu": "1 Core",
        "sites": 1,
        "bandwidth": "Unlimited 10Gbps"
      },
      {
        "gb": 15,
        "price": 299,
        "ram": "2 GB",
        "cpu": "2 Cores",
        "sites": 3,
        "bandwidth": "Unlimited 10Gbps"
      },
      {
        "gb": 30,
        "price": 499,
        "ram": "4 GB",
        "cpu": "2 Cores",
        "sites": 10,
        "bandwidth": "Unlimited 10Gbps"
      },
      {
        "gb": 60,
        "price": 899,
        "ram": "6 GB",
        "cpu": "4 Cores",
        "sites": 20,
        "bandwidth": "Unlimited 10Gbps"
      }
    ]
  },
  "vps-1": {
    "id": "vps-1",
    "name": "BDIX Cloud VPS 1",
    "category": "BDIX Cloud VPS",
    "badge": "Starter VPS",
    "basePrice": 999,
    "regularPrice": 1350,
    "discountPrice": 999,
    "discountPercent": 26,
    "annualPrice": 11388,
    "vatRate": 0,
    "storage": "40 GB NVMe",
    "websites": "Unlimited Websites",
    "ram": "2 GB RAM",
    "cpu": "2 vCPU Cores",
    "bandwidth": "10 Gbps BDIX",
    "features": [
      "2 vCPU Cores (Intel Xeon / AMD EPYC)",
      "2 GB Dedicated RAM",
      "40 GB NVMe High Speed Storage",
      "10 Gbps BDIX + 1 Gbps Global Uplink",
      "1 Dedicated IPv4 Address Included",
      "Full Root Access (SSH & Web Console)",
      "KVM Hardware Virtualization"
    ],
    "storageOptions": [
      {
        "gb": 40,
        "price": 999,
        "ram": "2 GB",
        "cpu": "2 vCPU",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "vps-2": {
    "id": "vps-2",
    "name": "BDIX Cloud VPS 2",
    "category": "BDIX Cloud VPS",
    "badge": "Most Popular",
    "basePrice": 1799,
    "regularPrice": 2450,
    "discountPrice": 1799,
    "discountPercent": 27,
    "annualPrice": 20500,
    "vatRate": 0,
    "storage": "80 GB NVMe",
    "websites": "Unlimited Websites",
    "ram": "4 GB RAM",
    "cpu": "4 vCPU Cores",
    "bandwidth": "10 Gbps BDIX",
    "features": [
      "4 vCPU Cores High Performance",
      "4 GB Dedicated RAM",
      "80 GB Pure NVMe SSD Storage",
      "10 Gbps Direct BDIX Peering",
      "1 Dedicated IPv4 Address",
      "Choice of OS: Ubuntu, AlmaLinux, Debian, CentOS",
      "Automated Weekly Snapshot Backups"
    ],
    "storageOptions": [
      {
        "gb": 80,
        "price": 1799,
        "ram": "4 GB",
        "cpu": "4 vCPU",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "vps-3": {
    "id": "vps-3",
    "name": "BDIX Cloud VPS 3",
    "category": "BDIX Cloud VPS",
    "badge": "Heavy Workload",
    "basePrice": 2999,
    "regularPrice": 3999,
    "discountPrice": 2999,
    "discountPercent": 25,
    "annualPrice": 34188,
    "vatRate": 5,
    "storage": "160 GB NVMe",
    "websites": "Unlimited Websites",
    "ram": "8 GB RAM",
    "cpu": "6 vCPU Cores",
    "bandwidth": "10 Gbps BDIX",
    "features": [
      "6 vCPU Cores Turbo Clock",
      "8 GB Dedicated RAM",
      "160 GB NVMe SSD Storage",
      "10 Gbps BDIX + 1 Gbps International",
      "1 Dedicated IPv4 Address",
      "DDoS Protected Network",
      "Priority 24/7 VPS Engineer Support"
    ],
    "storageOptions": [
      {
        "gb": 160,
        "price": 2999,
        "ram": "8 GB",
        "cpu": "6 vCPU",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "managed-vps": {
    "id": "managed-vps",
    "name": "Managed Cloud VPS (cPanel/WHM)",
    "category": "BDIX Cloud VPS",
    "badge": "Fully Managed",
    "basePrice": 3499,
    "regularPrice": 4600,
    "discountPrice": 3499,
    "discountPercent": 24,
    "annualPrice": 39888,
    "vatRate": 5,
    "storage": "100 GB NVMe",
    "websites": "Unlimited Websites",
    "ram": "8 GB RAM",
    "cpu": "4 vCPU Cores",
    "bandwidth": "10 Gbps BDIX",
    "features": [
      "100% Fully Managed by JAAS BD Sysadmins",
      "Free cPanel & WHM Control Panel Setup",
      "4 vCPU Cores & 8 GB RAM",
      "100 GB NVMe Storage",
      "LiteSpeed & CSF Firewall Pre-Configured",
      "Free Website & Database Migration",
      "24/7/365 Proactive Server Monitoring"
    ],
    "storageOptions": [
      {
        "gb": 100,
        "price": 3499,
        "ram": "8 GB",
        "cpu": "4 vCPU",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "bdix-rdp": {
    "id": "bdix-rdp",
    "name": "BDIX Windows RDP VPS",
    "category": "BDIX Cloud VPS",
    "badge": "Windows GUI",
    "basePrice": 1499,
    "regularPrice": 1999,
    "discountPrice": 1499,
    "discountPercent": 25,
    "annualPrice": 17088,
    "vatRate": 0,
    "storage": "60 GB SSD",
    "websites": "RDP Workstation",
    "ram": "4 GB RAM",
    "cpu": "2 vCPU Cores",
    "bandwidth": "10 Gbps BDIX",
    "features": [
      "Windows Server 2022 / 2019 GUI Activated",
      "Direct Remote Desktop Connection (RDP)",
      "2 vCPU Cores & 4 GB RAM",
      "60 GB NVMe SSD",
      "Ultra Low Latency in Bangladesh (1-5ms)",
      "Ideal for Forex, Browsing, Automation & Software"
    ],
    "storageOptions": [
      {
        "gb": 60,
        "price": 1499,
        "ram": "4 GB",
        "cpu": "2 vCPU",
        "sites": "RDP",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "reseller-silver": {
    "id": "reseller-silver",
    "name": "Silver Reseller Hosting",
    "category": "Reseller Hosting",
    "badge": "Starter Agency",
    "basePrice": 1200,
    "regularPrice": 1650,
    "discountPrice": 1200,
    "discountPercent": 27,
    "annualPrice": 13680,
    "vatRate": 0,
    "storage": "50 GB NVMe",
    "websites": "25 cPanel Accounts",
    "ram": "16 GB Pooled",
    "cpu": "4 Cores Pooled",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "50 GB Pure NVMe SSD Storage",
      "Up to 25 Separate cPanel Accounts",
      "Web Host Manager (WHM) Control",
      "100% White-Label Private Nameservers",
      "Free Automated SSL for all Clients",
      "Daily Automated Remote Backups",
      "Overselling Feature Enabled"
    ],
    "storageOptions": [
      {
        "gb": 50,
        "price": 1200,
        "ram": "16 GB Pooled",
        "cpu": "4 Cores",
        "sites": 25,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "reseller-gold": {
    "id": "reseller-gold",
    "name": "Gold Reseller Hosting",
    "category": "Reseller Hosting",
    "badge": "Most Popular",
    "basePrice": 2200,
    "regularPrice": 2999,
    "discountPrice": 2200,
    "discountPercent": 27,
    "annualPrice": 25080,
    "vatRate": 5,
    "storage": "100 GB NVMe",
    "websites": "50 cPanel Accounts",
    "ram": "32 GB Pooled",
    "cpu": "8 Cores Pooled",
    "bandwidth": "Unlimited BDIX",
    "features": [
      "100 GB Pure NVMe SSD Storage",
      "Up to 50 Separate cPanel Accounts",
      "Full WHM Reseller Access",
      "Private Custom Nameservers",
      "LiteSpeed Web Server Included",
      "Daily Off-site JetBackup",
      "Priority Reseller Phone Support"
    ],
    "storageOptions": [
      {
        "gb": 100,
        "price": 2200,
        "ram": "32 GB Pooled",
        "cpu": "8 Cores",
        "sites": 50,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "reseller-plat": {
    "id": "reseller-plat",
    "name": "Platinum Reseller Hosting",
    "category": "Reseller Hosting",
    "badge": "Enterprise Agency",
    "basePrice": 3500,
    "regularPrice": 4800,
    "discountPrice": 3500,
    "discountPercent": 27,
    "annualPrice": 39900,
    "vatRate": 5,
    "storage": "200 GB NVMe",
    "websites": "100 cPanel Accounts",
    "ram": "64 GB Pooled",
    "cpu": "16 Cores Pooled",
    "bandwidth": "Unlimited 10Gbps BDIX",
    "features": [
      "200 GB High IOPS NVMe SSD",
      "Up to 100 cPanel Accounts",
      "Free Dedicated IP Address",
      "LiteSpeed + LSCache Unlimited",
      "Automated Billing (WHMCS / FOSSBilling Ready)",
      "24/7 VIP Senior Support Escalation"
    ],
    "storageOptions": [
      {
        "gb": 200,
        "price": 3500,
        "ram": "64 GB Pooled",
        "cpu": "16 Cores",
        "sites": 100,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "dedicated-entry": {
    "id": "dedicated-entry",
    "name": "BDIX Dedicated Server Entry",
    "category": "Dedicated Server",
    "badge": "Dedicated Node",
    "basePrice": 9999,
    "regularPrice": 13500,
    "discountPrice": 9999,
    "discountPercent": 26,
    "annualPrice": 113988,
    "vatRate": 5,
    "storage": "2x 1TB NVMe SSD",
    "websites": "Unlimited Websites",
    "ram": "32 GB DDR4 ECC",
    "cpu": "Intel Xeon 8 Cores / 16 Threads",
    "bandwidth": "10 Gbps BDIX Port",
    "features": [
      "Intel Xeon E-2288G (8 Cores, 16 Threads 5.0 GHz)",
      "32 GB DDR4 ECC Registered RAM",
      "2x 1TB NVMe PCIe 4.0 Hardware RAID",
      "10 Gbps Direct BDIX Peering in Dhaka Datacenter",
      "5 Usable Dedicated IPv4 Addresses",
      "Full IPMI / iDRAC KVM Over IP Remote Management",
      "99.99% Hardware & Power SLA Guaranteed"
    ],
    "storageOptions": [
      {
        "gb": 2000,
        "price": 9999,
        "ram": "32 GB",
        "cpu": "8 Cores",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "dedicated-server": {
    "id": "dedicated-server",
    "name": "BDIX Dedicated Server Enterprise",
    "category": "Dedicated Server",
    "badge": "Enterprise Beast",
    "basePrice": 16999,
    "regularPrice": 22500,
    "discountPrice": 16999,
    "discountPercent": 24,
    "annualPrice": 193788,
    "vatRate": 5,
    "storage": "2x 2TB NVMe SSD",
    "websites": "Unlimited Websites",
    "ram": "64 GB DDR4 ECC",
    "cpu": "Dual Intel Xeon 16 Cores / 32 Threads",
    "bandwidth": "10 Gbps BDIX Peering",
    "features": [
      "Dual Intel Xeon Silver (16 Cores, 32 Threads)",
      "64 GB DDR4 ECC High-Frequency RAM",
      "2x 2TB Enterprise NVMe SSD in RAID-1",
      "Direct 10 Gbps BDIX Port with Unmetered Peering",
      "13 Usable Dedicated IPv4 Addresses",
      "Dedicated Hardware Firewall & Anti-DDoS",
      "15-Minute Hardware Replacement Guarantee"
    ],
    "storageOptions": [
      {
        "gb": 4000,
        "price": 16999,
        "ram": "64 GB",
        "cpu": "16 Cores",
        "sites": "Unlimited",
        "bandwidth": "10 Gbps BDIX"
      }
    ]
  },
  "ssl-cert": {
    "id": "ssl-cert",
    "name": "PositiveSSL Certificate",
    "category": "Software",
    "badge": "Essential Security",
    "basePrice": 125,
    "regularPrice": 169,
    "discountPrice": 125,
    "discountPercent": 26,
    "annualPrice": 999,
    "vatRate": 0,
    "storage": "256-bit Encryption",
    "websites": "1 Domain Name",
    "ram": "Browser Padlock",
    "cpu": "SHA-256 Hash",
    "bandwidth": "Unlimited Validation",
    "features": [
      "Industry Standard 256-bit SSL Encryption",
      "Recognized by 99.9% of All Web & Mobile Browsers",
      "Green Padlock & HTTPS Security in URL bar",
      "Free Unlimited Reissues During Validity",
      "Boosts Google Search SEO Ranking",
      "Instant Automated Verification & Issuance"
    ],
    "storageOptions": [
      {
        "gb": 1,
        "price": 125,
        "ram": "Padlock",
        "cpu": "256-bit",
        "sites": 1,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "cpanel-solo": {
    "id": "cpanel-solo",
    "name": "cPanel Solo License",
    "category": "Software",
    "badge": "Official License",
    "basePrice": 1899,
    "regularPrice": 2200,
    "discountPrice": 1899,
    "discountPercent": 14,
    "annualPrice": 21648,
    "vatRate": 5,
    "storage": "1 cPanel Account",
    "websites": "1 User Account",
    "ram": "Full WHM & cPanel",
    "cpu": "Auto Updates",
    "bandwidth": "Unlimited",
    "features": [
      "Official cPanel & WHM Solo Partner License",
      "Single Account Provisioning for Cloud VPS",
      "Automatic Official Software & Security Updates",
      "Integrated Webmail, DNS, MySQL & File Management",
      "Official cPanel Support Access",
      "Instant Automated IP Activation"
    ],
    "storageOptions": [
      {
        "gb": 1,
        "price": 1899,
        "ram": "cPanel",
        "cpu": "Auto",
        "sites": 1,
        "bandwidth": "Unlimited"
      }
    ]
  },
  "litespeed-ent": {
    "id": "litespeed-ent",
    "name": "LiteSpeed Web Server Enterprise",
    "category": "Software",
    "badge": "Speed Accelerator",
    "basePrice": 1250,
    "regularPrice": 1550,
    "discountPrice": 1250,
    "discountPercent": 19,
    "annualPrice": 14250,
    "vatRate": 0,
    "storage": "Unlimited LSCache",
    "websites": "High-Traffic Sites",
    "ram": "LSCache Engine",
    "cpu": "2-Worker License",
    "bandwidth": "Unlimited Throughput",
    "features": [
      "5x Apache Performance with 80% Less CPU Usage",
      "Built-in Anti-DDoS & HTTP/3 QUIC Protocol",
      "Native WordPress, Magento & PrestaShop LSCache",
      "Zero-Downtime Graceful Restarts",
      "Drop-in Replacement for Apache (.htaccess support)",
      "Official LiteSpeed Partner License"
    ],
    "storageOptions": [
      {
        "gb": 1,
        "price": 1250,
        "ram": "LSCache",
        "cpu": "2-Worker",
        "sites": "High Traffic",
        "bandwidth": "Unlimited"
      }
    ]
  },
  "domain-registration": {
    "id": "domain-registration",
    "name": "Domain Registration",
    "category": "Domains",
    "badge": "Instant DNS",
    "basePrice": 1450,
    "regularPrice": 1650,
    "discountPrice": 1450,
    "discountPercent": 12,
    "annualPrice": 1450,
    "vatRate": 0,
    "storage": "Full DNS Control",
    "websites": "1 Domain Name",
    "ram": "-",
    "cpu": "-",
    "bandwidth": "Unlimited DNS",
    "features": [
      "Full DNS Management",
      "Free Domain Privacy Protection",
      "Instant DNS Propagation",
      "Free 2 Email Accounts",
      "24/7 Support"
    ],
    "storageOptions": [
      {
        "gb": 0,
        "price": 1450,
        "ram": "-",
        "cpu": "-",
        "sites": 1,
        "bandwidth": "-"
      }
    ]
  },
  "business-email": {
    "id": "business-email",
    "name": "OX Business Email",
    "category": "Communication",
    "badge": "Branded Email",
    "basePrice": 159,
    "regularPrice": 220,
    "discountPrice": 159,
    "discountPercent": 28,
    "annualPrice": 1908,
    "vatRate": 0,
    "storage": "10 GB Email Storage",
    "websites": "1 Mailbox",
    "ram": "Webmail Interface",
    "cpu": "Anti-Spam Shield",
    "bandwidth": "Unlimited",
    "features": [
      "Premium Webmail Interface",
      "Anti-Spam & Anti-Virus Shield",
      "Mobile Sync (iOS & Android)",
      "Calendar, Tasks & Contacts"
    ],
    "storageOptions": [
      {
        "gb": 10,
        "price": 159,
        "ram": "-",
        "cpu": "-",
        "sites": "1 Mailbox",
        "bandwidth": "Unlimited"
      }
    ]
  },
  "gsuite": {
    "id": "gsuite",
    "name": "Google Workspace (G Suite)",
    "category": "Communication",
    "badge": "Official Google",
    "basePrice": 1049,
    "regularPrice": 1350,
    "discountPrice": 1049,
    "discountPercent": 22,
    "annualPrice": 12588,
    "vatRate": 5,
    "storage": "30 GB Google Cloud",
    "websites": "1 User Account",
    "ram": "Google Apps Suite",
    "cpu": "Google Cloud Infra",
    "bandwidth": "Unlimited",
    "features": [
      "Official Gmail for Business",
      "Google Meet 100+ Participants",
      "Google Drive, Docs, Sheets",
      "Admin Security Console"
    ],
    "storageOptions": [
      {
        "gb": 30,
        "price": 1049,
        "ram": "-",
        "cpu": "-",
        "sites": "1 User",
        "bandwidth": "Unlimited"
      }
    ]
  }
};

// Storage helper functions (localStorage abstraction)
const JaasStore = {
  // Get active client user
  getClientUser() {
    const raw = localStorage.getItem('jaas_client_user');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return {
      name: 'Ashish Halder',
      email: 'ashish@example.com',
      phone: '+88-01818-430308',
      company: 'Golden Frame BD',
      address: '843/06, Kadim Dewhata, Mirzapur, Tangail. 1940.',
      loggedIn: false
    };
  },

  setClientUser(user) {
    localStorage.setItem('jaas_client_user', JSON.stringify(user));
  },

  // Registered Clients Management
  getClients() {
    const raw = localStorage.getItem('jaas_clients');
    if (raw) {
      try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length > 0) return arr;
      } catch (e) {}
    }
    const defaults = [
      {
        id: 'CL-8430',
        name: 'Ashish Halder',
        firstName: 'Ashish',
        lastName: 'Halder',
        email: 'ashish@gmail.com',
        password: 'admin123',
        phone: '+8801818430308',
        company: 'Golden Frame BD',
        address: 'Kadim Dewhata, Mirzapur, Tangail, Dhaka 1940',
        district: 'Tangail',
        regDate: '2026-03-15'
      },
      {
        id: 'CL-2026',
        name: 'Valued Customer',
        firstName: 'Valued',
        lastName: 'Customer',
        email: 'customer@jaasbd.com',
        password: 'PutulHost@2026#Secure',
        phone: '+8801818430308',
        company: 'Personal Account',
        address: 'Hat Masjid Road, Rajbari',
        district: 'Rajbari',
        regDate: '2026-03-20'
      }
    ];
    localStorage.setItem('jaas_clients', JSON.stringify(defaults));
    return defaults;
  },

  saveClient(client) {
    if (!client || !client.email) return;
    const clients = this.getClients();
    const idx = clients.findIndex(c => c.email && c.email.toLowerCase() === client.email.toLowerCase());
    if (idx >= 0) {
      clients[idx] = { ...clients[idx], ...client };
    } else {
      clients.push(client);
    }
    localStorage.setItem('jaas_clients', JSON.stringify(clients));

    // Async sync to server API
    try {
      fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      }).catch(() => {});
    } catch(e) {}

    return clients;
  },

  authenticateClient(email, password) {
    if (!email || !password) return null;
    const clients = this.getClients();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    const match = clients.find(c => c.email && c.email.trim().toLowerCase() === cleanEmail && c.password === cleanPass);
    return match || null;
  },

  // Get active services
  getServices() {
    const raw = localStorage.getItem('jaas_services');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [
      {
        id: 'srv-101',
        planId: 'business-hosting',
        name: 'Business Hosting',
        domain: 'goldenframebd.com',
        storage: '20 GB NVMe SSD',
        billingCycle: 'Annually',
        price: 4788,
        status: 'Active',
        regDate: '2026-03-15',
        nextDue: '2027-03-15',
        serverIP: '103.145.118.25',
        nameservers: ['ns1.jaasbd.com', 'ns2.jaasbd.com'],
        cpanelUser: 'jaas_golden',
        cpanelPass: 'J@as2026!k9Fm',
        diskUsed: '3.4 GB',
        diskLimit: '20 GB',
        bandwidthUsed: '24.8 GB'
      }
    ];
  },

  saveService(service) {
    const services = this.getServices();
    services.unshift(service);
    localStorage.setItem('jaas_services', JSON.stringify(services));
    return services;
  },

  updateService(service) {
    const services = this.getServices();
    const idx = services.findIndex(s => s.id === service.id || s.domain === service.domain);
    if (idx >= 0) services[idx] = { ...services[idx], ...service };
    else services.unshift(service);
    localStorage.setItem('jaas_services', JSON.stringify(services));
    return services;
  },

  // Get Domains
  getDomains() {
    const raw = localStorage.getItem('jaas_domains');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [
      {
        id: 'dom-101',
        domain: 'goldenframebd.com',
        regDate: '2026-03-15',
        expiryDate: '2027-03-15',
        nextDue: '2027-03-15',
        price: 1150,
        status: 'Active',
        autoRenew: true,
        whoisPrivacy: true,
        nameservers: ['ns1.jaasbd.com', 'ns2.jaasbd.com'],
        eppCode: 'JF89!kL2#jaas',
        dnsRecords: [
          { type: 'A', name: '@', value: '103.145.118.25', ttl: 14400 },
          { type: 'CNAME', name: 'www', value: 'goldenframebd.com', ttl: 14400 },
          { type: 'MX', name: '@', value: 'mail.goldenframebd.com', priority: 10, ttl: 14400 },
          { type: 'TXT', name: '@', value: 'v=spf1 include:spf.jaasbd.com ~all', ttl: 14400 }
        ]
      },
      {
        id: 'dom-102',
        domain: 'jaasbd.com',
        regDate: '2025-01-10',
        expiryDate: '2027-01-10',
        nextDue: '2027-01-10',
        price: 1150,
        status: 'Active',
        autoRenew: true,
        whoisPrivacy: true,
        nameservers: ['ns1.jaasbd.com', 'ns2.jaasbd.com'],
        eppCode: 'EPP-JAAS-89410',
        dnsRecords: [
          { type: 'A', name: '@', value: '103.145.118.25', ttl: 14400 },
          { type: 'CNAME', name: 'www', value: 'jaasbd.com', ttl: 14400 }
        ]
      }
    ];
  },

  saveDomain(domain) {
    const domains = this.getDomains();
    domains.unshift(domain);
    localStorage.setItem('jaas_domains', JSON.stringify(domains));
    return domains;
  },

  updateDomain(domain) {
    const domains = this.getDomains();
    const idx = domains.findIndex(d => d.id === domain.id || d.domain === domain.domain);
    if (idx >= 0) domains[idx] = { ...domains[idx], ...domain };
    else domains.unshift(domain);
    localStorage.setItem('jaas_domains', JSON.stringify(domains));
    return domains;
  },

  // Get Invoices
  getInvoices() {
    const raw = localStorage.getItem('jaas_invoices');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [
      {
        id: 'INV-2026-64551',
        date: '2026-10-26',
        dueDate: '2026-10-26',
        planName: 'Domain Registration (0 GB NVMe) +',
        domain: 'mycompany.com',
        term: '1 Year<br>(Annually)',
        subtotal: 18850,
        discount: 3480,
        amount: 15370,
        status: 'PAID',
        gateway: 'SSLCOMMERZ / EPS Online Payment',
        txnId: 'TXN-SSL-882801',
        cpanelUser: 'jaas_mycomp',
        cpanelPass: 'J@as2026!k9Fm',
        serverIP: '103.145.118.25'
      }
    ];
  },

  saveInvoice(invoice) {
    const invoices = this.getInvoices();
    invoices.unshift(invoice);
    localStorage.setItem('jaas_invoices', JSON.stringify(invoices));
    return invoices;
  },

  updateInvoice(invoice) {
    const invoices = this.getInvoices();
    const idx = invoices.findIndex(i => i.id === invoice.id);
    if (idx >= 0) invoices[idx] = { ...invoices[idx], ...invoice };
    else invoices.unshift(invoice);
    localStorage.setItem('jaas_invoices', JSON.stringify(invoices));
    return invoices;
  },

  // Support Tickets System
  getTickets() {
    const raw = localStorage.getItem('jaas_tickets');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    return [
      {
        id: 'TCK-84301',
        subject: 'Nameserver Delegation and SSL Setup Assistance',
        department: 'Technical Support',
        priority: 'High',
        status: 'Answered',
        created: '2026-03-15 14:20',
        updated: '2026-03-15 15:05',
        messages: [
          {
            sender: 'Ashish Halder',
            role: 'Client',
            time: '2026-03-15 14:20',
            message: 'Hello Support team, I have pointed goldenframebd.com to ns1.jaasbd.com and ns2.jaasbd.com. Could you please confirm if DNS propagation is complete?'
          },
          {
            sender: 'Tariqul Islam (JAAS Support)',
            role: 'Staff',
            time: '2026-03-15 15:05',
            message: 'Hello Ashish! We have verified that your nameservers are fully active on 103.145.118.25 and Free Let\'s Encrypt AutoSSL has been issued successfully. Your website is live and secured.'
          }
        ]
      }
    ];
  },

  saveTicket(ticket) {
    const tickets = this.getTickets();
    tickets.unshift(ticket);
    localStorage.setItem('jaas_tickets', JSON.stringify(tickets));
    return tickets;
  },

  addTicketReply(ticketId, reply) {
    const tickets = this.getTickets();
    const t = tickets.find(x => x.id === ticketId);
    if (t) {
      t.messages.push(reply);
      t.updated = new Date().toISOString().replace('T', ' ').slice(0, 16);
      t.status = reply.role === 'Client' ? 'Customer-Reply' : 'Answered';
      localStorage.setItem('jaas_tickets', JSON.stringify(tickets));
    }
    return tickets;
  },

  // Generate secure cPanel password
  generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    let pass = 'J@as';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  },

  // Generate clean cPanel username
  generateUsername(name, domain) {
    const base = (name || domain || 'client').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6);
    const rand = Math.floor(10 + Math.random() * 90);
    return 'jaas_' + base + rand;
  },

  // Asynchronous order sync to MySQL (via api.php) or Node.js server
  async syncOrderToBackend(client, invoice, service) {
    const endpoints = ['api.php?action=place_order', '/api/orders'];
    for (const ep of endpoints) {
      try {
        const resp = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client, invoice, service })
        });
        if (resp.ok) {
          const res = await resp.json();
          if (res.success) return true;
        }
      } catch (err) {}
    }
    return false;
  }
};

// Global helper to buy plan
function buyPlan(planId) {
  const target = planId || 'business-hosting';
  window.location.href = 'order.html?plan=' + encodeURIComponent(target);
}

// Dynamic Config Overrides from Admin CMS & Server API
(async function() {
  try {
    const raw = localStorage.getItem('jaas_site_config');
    if (raw) {
      const localCfg = JSON.parse(raw);
      if (localCfg.packages && Array.isArray(localCfg.packages)) {
        localCfg.packages.forEach(p => {
          JAAS_CATALOG[p.id] = p;
        });
      }
    }

    // Try fetching live catalog from PHP API or Node.js or JSON
    const configEndpoints = ['api.php?action=get_config', '/api/config', 'site-config.json'];
    for (const ep of configEndpoints) {
      try {
        const resp = await fetch(ep);
        if (resp.ok) {
          const srvCfg = await resp.json();
          if (srvCfg && srvCfg.packages && Array.isArray(srvCfg.packages)) {
            srvCfg.packages.forEach(p => {
              JAAS_CATALOG[p.id] = p;
            });
            break;
          }
        }
      } catch(err) {}
    }
  } catch (e) {}
})();

// Attach to window
window.JAAS_CATALOG = JAAS_CATALOG;
window.JaasStore = JaasStore;
window.buyPlan = buyPlan;
