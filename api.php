<?php
/**
 * JAAS BD Platform - Central PHP REST API for XAMPP / Apache / MySQL
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDB();

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Helper to get JSON input
function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

try {
    switch ($action) {
        case 'status':
            $dbConnected = ($pdo !== null);
            $tablesCount = 0;
            if ($dbConnected) {
                $stmt = $pdo->query("SHOW TABLES");
                $tablesCount = count($stmt->fetchAll());
            }
            echo json_encode([
                'success' => true,
                'php_version' => PHP_VERSION,
                'database_connected' => $dbConnected,
                'database_name' => DB_NAME,
                'tables_count' => $tablesCount,
                'timestamp' => date('c')
            ]);
            break;

        case 'get_config':
            $cfg = null;
            if ($pdo) {
                $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
                $rows = $stmt->fetchAll();
                if (!empty($rows)) {
                    $cfg = [];
                    foreach ($rows as $r) {
                        $key = $r['setting_key'];
                        $val = json_decode($r['setting_value'], true);
                        if ($key === 'site_info') $cfg['site'] = $val;
                        else if ($key === 'contact_info') $cfg['contact'] = $val;
                        else if ($key === 'gateways') $cfg['gateways'] = $val;
                        else if ($key === 'hero') $cfg['hero'] = $val;
                    }

                    // Packages from table
                    $pkgStmt = $pdo->query("SELECT * FROM packages ORDER BY sort_order ASC, base_price ASC");
                    $pkgs = $pkgStmt->fetchAll();
                    if (!empty($pkgs)) {
                        $cfg['packages'] = array_map(function($p) {
                            return [
                                'id' => $p['id'],
                                'name' => $p['name'],
                                'category' => $p['category'],
                                'badge' => $p['badge'],
                                'basePrice' => (int)$p['base_price'],
                                'storage' => $p['storage'],
                                'websites' => $p['websites'],
                                'ram' => $p['ram'],
                                'cpu' => $p['cpu'],
                                'bandwidth' => $p['bandwidth'],
                                'features' => json_decode($p['features_json'], true) ?: [],
                                'storageOptions' => json_decode($p['storage_options_json'], true) ?: []
                            ];
                        }, $pkgs);
                    }

                    // Domain pricing from table
                    $domStmt = $pdo->query("SELECT * FROM domain_pricing ORDER BY reg_price ASC");
                    $doms = $domStmt->fetchAll();
                    if (!empty($doms)) {
                        $cfg['domainPricing'] = array_map(function($d) {
                            return [
                                'ext' => $d['tld'],
                                'regPrice' => (int)$d['reg_price'],
                                'renewPrice' => (int)$d['renew_price'],
                                'transferPrice' => (int)$d['transfer_price'],
                                'note' => $d['note']
                            ];
                        }, $doms);
                    }

                    // Testimonials from table
                    $testiStmt = $pdo->query("SELECT * FROM testimonials ORDER BY sort_order ASC");
                    $testis = $testiStmt->fetchAll();
                    if (!empty($testis)) {
                        $cfg['testimonials'] = array_map(function($t) {
                            return [
                                'id' => $t['id'],
                                'name' => $t['name'],
                                'role' => $t['role'],
                                'image' => $t['avatar'],
                                'rating' => (int)$t['rating'],
                                'review' => $t['review']
                            ];
                        }, $testis);
                    }
                }
            }

            // Fallback to site-config.json if database empty or not connected
            if (!$cfg && file_exists(__DIR__ . '/site-config.json')) {
                $cfg = json_decode(file_get_contents(__DIR__ . '/site-config.json'), true);
            }

            echo json_encode($cfg ?: ['error' => 'Config not found']);
            break;

        case 'save_config':
            $input = getJsonInput();
            if (empty($input)) {
                echo json_encode(['success' => false, 'error' => 'No configuration payload sent']);
                break;
            }

            // 1. Sync to site-config.json
            file_put_contents(__DIR__ . '/site-config.json', json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

            // 2. Sync to MySQL if available
            if ($pdo) {
                if (isset($input['site'])) {
                    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES ('site_info', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                    $json = json_encode($input['site']);
                    $stmt->execute([$json, $json]);
                }
                if (isset($input['contact'])) {
                    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES ('contact_info', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                    $json = json_encode($input['contact']);
                    $stmt->execute([$json, $json]);
                }
                if (isset($input['gateways'])) {
                    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES ('gateways', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                    $json = json_encode($input['gateways']);
                    $stmt->execute([$json, $json]);
                }
                if (isset($input['hero'])) {
                    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES ('hero', ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                    $json = json_encode($input['hero']);
                    $stmt->execute([$json, $json]);
                }
            }

            echo json_encode(['success' => true, 'message' => 'Configuration saved to MySQL and file']);
            break;

        case 'admin_login':
            $input = getJsonInput();
            $username = isset($input['username']) ? trim($input['username']) : '';
            $password = isset($input['password']) ? trim($input['password']) : '';

            $authenticated = false;
            $adminUser = null;

            if ($pdo) {
                $stmt = $pdo->prepare("SELECT * FROM admins WHERE (username = ? OR email = ?) AND password = ? LIMIT 1");
                $stmt->execute([$username, $username, $password]);
                $adminUser = $stmt->fetch();
                if ($adminUser) {
                    $authenticated = true;
                }
            }

            // Fallback check against site-config.json
            if (!$authenticated && file_exists(__DIR__ . '/site-config.json')) {
                $fileCfg = json_decode(file_get_contents(__DIR__ . '/site-config.json'), true);
                if (isset($fileCfg['admin']) && ($username === $fileCfg['admin']['username'] || $username === $fileCfg['admin']['email']) && $password === $fileCfg['admin']['password']) {
                    $authenticated = true;
                    $adminUser = ['username' => $fileCfg['admin']['username'], 'role' => 'Administrator'];
                }
            }

            if ($authenticated) {
                echo json_encode(['success' => true, 'user' => $adminUser['username']]);
            } else {
                http_response_code(401);
                echo json_encode(['success' => false, 'error' => 'Invalid admin username or password']);
            }
            break;

        case 'place_order':
            $input = getJsonInput();
            $client = isset($input['client']) ? $input['client'] : [];
            $invoice = isset($input['invoice']) ? $input['invoice'] : [];
            $service = isset($input['service']) ? $input['service'] : null;

            if (empty($invoice['id']) || empty($client['name'])) {
                echo json_encode(['success' => false, 'error' => 'Missing order payload']);
                break;
            }

            if ($pdo) {
                // 1. Record Client
                $stmtClient = $pdo->prepare("INSERT INTO clients (name, email, phone, company, address, password) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone), company=VALUES(company), address=VALUES(address)");
                $stmtClient->execute([
                    $client['name'],
                    $client['email'],
                    $client['phone'],
                    isset($client['company']) ? $client['company'] : '',
                    isset($client['address']) ? $client['address'] : '',
                    isset($client['password']) ? $client['password'] : 'JaasBd#2026!'
                ]);

                // 2. Record Service if provided
                if ($service && !empty($service['id'])) {
                    $stmtSrv = $pdo->prepare("INSERT INTO services (id, client_email, plan_id, name, domain, storage, billing_cycle, price, status, reg_date, next_due, server_ip, cpanel_user, cpanel_pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status=VALUES(status)");
                    $stmtSrv->execute([
                        $service['id'],
                        $client['email'],
                        isset($service['planId']) ? $service['planId'] : 'business-hosting',
                        isset($service['name']) ? $service['name'] : 'Business Hosting',
                        isset($service['domain']) ? $service['domain'] : '',
                        isset($service['storage']) ? $service['storage'] : '20 GB NVMe SSD',
                        isset($service['billingCycle']) ? $service['billingCycle'] : '1 Year',
                        isset($service['price']) ? (int)$service['price'] : 0,
                        isset($service['status']) ? $service['status'] : 'Active',
                        isset($service['regDate']) ? $service['regDate'] : date('Y-m-d'),
                        isset($service['nextDue']) ? $service['nextDue'] : date('Y-m-d', strtotime('+1 year')),
                        isset($service['serverIP']) ? $service['serverIP'] : '103.145.118.25',
                        isset($service['cpanelUser']) ? $service['cpanelUser'] : 'cpanel',
                        isset($service['cpanelPass']) ? $service['cpanelPass'] : 'pass123'
                    ]);
                }

                // 3. Record Invoice
                $stmtInv = $pdo->prepare("INSERT INTO invoices (id, client_email, date, due_date, plan_name, domain, subtotal, discount, amount, status, gateway, txn_id, cpanel_user, cpanel_pass, server_ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status=VALUES(status)");
                $stmtInv->execute([
                    $invoice['id'],
                    $client['email'],
                    isset($invoice['date']) ? $invoice['date'] : date('Y-m-d'),
                    isset($invoice['dueDate']) ? $invoice['dueDate'] : date('Y-m-d'),
                    isset($invoice['planName']) ? $invoice['planName'] : '',
                    isset($invoice['domain']) ? $invoice['domain'] : '',
                    isset($invoice['subtotal']) ? (int)$invoice['subtotal'] : (int)$invoice['amount'],
                    isset($invoice['discount']) ? (int)$invoice['discount'] : 0,
                    (int)$invoice['amount'],
                    isset($invoice['status']) ? $invoice['status'] : 'PAID',
                    isset($invoice['gateway']) ? $invoice['gateway'] : 'SSLCOMMERZ / EPS Online Payment',
                    isset($invoice['txnId']) ? $invoice['txnId'] : 'TXN-SSL-' . rand(100000, 999999),
                    isset($invoice['cpanelUser']) ? $invoice['cpanelUser'] : 'N/A',
                    isset($invoice['cpanelPass']) ? $invoice['cpanelPass'] : 'N/A',
                    isset($invoice['serverIP']) ? $invoice['serverIP'] : '103.145.118.25'
                ]);
            }

            echo json_encode([
                'success' => true,
                'invoiceId' => $invoice['id'],
                'message' => 'Order and invoice stored successfully in database'
            ]);
            break;

        case 'get_invoices':
            $invoices = [];
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM invoices ORDER BY created_at DESC");
                $invoices = $stmt->fetchAll();
            }
            echo json_encode(['success' => true, 'invoices' => $invoices]);
            break;

        case 'get_services':
            $services = [];
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM services ORDER BY created_at DESC");
                $services = $stmt->fetchAll();
            }
            echo json_encode(['success' => true, 'services' => $services]);
            break;

        default:
            echo json_encode([
                'service' => 'JAAS BD REST API',
                'status' => 'online',
                'supported_actions' => ['status', 'get_config', 'save_config', 'admin_login', 'place_order', 'get_invoices', 'get_services']
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
