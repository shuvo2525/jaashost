<?php
/**
 * JAAS BD Platform - 1-Click Database Setup & Diagnostics for XAMPP
 */

require_once __DIR__ . '/db.php';

$stepResults = [];
$errorMsg = null;
$success = false;

// 1. Check MySQL connection
try {
    $rawPdo = new PDO("mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $stepResults[] = ['title' => 'MySQL Server Connection', 'status' => 'success', 'desc' => 'Connected to MySQL on ' . DB_HOST . ' (User: ' . DB_USER . ')'];

    // 2. Create Database
    $rawPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $rawPdo->exec("USE `" . DB_NAME . "`;");
    $stepResults[] = ['title' => 'Database Creation', 'status' => 'success', 'desc' => 'Database `' . DB_NAME . '` is ready.'];

    // 3. Execute database.sql
    $sqlPath = __DIR__ . '/database.sql';
    if (file_exists($sqlPath)) {
        $sql = file_get_contents($sqlPath);
        // Execute multi-query
        $rawPdo->exec($sql);
        $stepResults[] = ['title' => 'SQL Schema & Seed Import', 'status' => 'success', 'desc' => 'All tables, admin accounts, and packages imported from database.sql.'];
    } else {
        throw new Exception('database.sql file was not found in the project root.');
    }

    // 4. Verify Tables
    $tables = ['admins', 'site_settings', 'packages', 'domain_pricing', 'testimonials', 'clients', 'services', 'invoices'];
    $tableCounts = [];
    foreach ($tables as $t) {
        $stmt = $rawPdo->query("SELECT COUNT(*) AS cnt FROM `" . $t . "`");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $tableCounts[$t] = $row ? $row['cnt'] : 0;
    }
    $stepResults[] = ['title' => 'Data Verification', 'status' => 'success', 'desc' => 'Verified 8 Core Tables (' . count($tables) . ' tables active)'];

    $success = true;
} catch (Exception $e) {
    $errorMsg = $e->getMessage();
    $stepResults[] = ['title' => 'Database Error', 'status' => 'error', 'desc' => $errorMsg];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JAAS BD • Local XAMPP Setup &amp; Database Installer</title>
  <link rel="icon" type="image/png" href="assets/images/jaasbd-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #F8FAFC;
      color: #0F172A;
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .setup-card {
      width: 100%;
      max-width: 680px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 36px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    .header-logo-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #E2E8F0;
    }
    .header-logo-row img {
      height: 48px;
      width: auto;
    }
    .setup-title {
      font-size: 20px;
      font-weight: 800;
      color: #0F172A;
    }
    .setup-subtitle {
      font-size: 13px;
      color: #64748B;
      margin-top: 2px;
    }
    .step-box {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 12px;
    }
    .step-box.success {
      border-left: 4px solid #10B981;
    }
    .step-box.error {
      border-left: 4px solid #EF4444;
      background: #FEF2F2;
    }
    .step-icon {
      font-size: 18px;
    }
    .step-title {
      font-size: 14px;
      font-weight: 700;
      color: #0F172A;
    }
    .step-desc {
      font-size: 12.5px;
      color: #64748B;
      margin-top: 3px;
    }
    .table-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 20px 0;
    }
    @media (max-width: 600px) {
      .table-stats-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .stat-badge {
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
    }
    .stat-badge .name { font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 700; }
    .stat-badge .val { font-size: 16px; font-weight: 900; color: #0077B6; margin-top: 2px; }

    .credentials-box {
      background: #F0F9FF;
      border: 1px dashed #7DD3FC;
      border-radius: 10px;
      padding: 16px;
      margin: 20px 0;
      font-size: 13px;
      color: #0369A1;
      line-height: 1.6;
    }
    .credentials-box strong { color: #0F172A; }
    .credentials-box code {
      background: #E0F2FE;
      color: #0284C7;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
    }

    .btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 24px;
    }
    .btn-action {
      flex: 1;
      min-width: 160px;
      padding: 12px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-action.primary {
      background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 119, 182, 0.3);
    }
    .btn-action.secondary {
      background: #FFFFFF;
      color: #334155;
      border: 1px solid #CBD5E1;
    }
    .btn-action:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>

  <div class="setup-card">
    <div class="header-logo-row">
      <img src="assets/images/jaasbd-logo.png" alt="JAAS BD">
      <div>
        <h1 class="setup-title">Local XAMPP Database Installer</h1>
        <p class="setup-subtitle">Automated Database Setup &amp; Configuration for MySQL / MariaDB</p>
      </div>
    </div>

    <?php foreach ($stepResults as $step): ?>
      <div class="step-box <?php echo $step['status']; ?>">
        <span class="step-icon"><?php echo $step['status'] === 'success' ? '✔' : '✖'; ?></span>
        <div>
          <div class="step-title"><?php echo htmlspecialchars($step['title']); ?></div>
          <div class="step-desc"><?php echo htmlspecialchars($step['desc']); ?></div>
        </div>
      </div>
    <?php endforeach; ?>

    <?php if ($success && !empty($tableCounts)): ?>
      <div class="table-stats-grid">
        <?php foreach ($tableCounts as $tbl => $cnt): ?>
          <div class="stat-badge">
            <div class="name"><?php echo htmlspecialchars($tbl); ?></div>
            <div class="val"><?php echo $cnt; ?> rows</div>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="credentials-box">
        🔑 <strong>Default Administrator Credentials:</strong><br>
        • Username: <code>admin</code> &nbsp;&bull;&nbsp; Password: <code>admin123</code><br>
        • Admin Portal: <a href="admin-login.html" style="color:#0077B6; font-weight:700;">admin-login.html</a> or <a href="admin.html" style="color:#0077B6; font-weight:700;">admin.html</a>
      </div>

      <div class="btn-row">
        <a href="index.php" class="btn-action primary">🚀 Open Main Website</a>
        <a href="admin-login.html" class="btn-action secondary">⚙️ Admin Login</a>
        <a href="order.html" class="btn-action secondary">🛒 Test Order &amp; Invoice</a>
      </div>
    <?php else: ?>
      <div style="background:#FEF2F2; border:1px solid #FCA5A5; border-radius:10px; padding:16px; margin-top:20px; color:#DC2626; font-size:13.5px;">
        <strong>XAMPP Troubleshooting:</strong><br>
        1. Open <strong>XAMPP Control Panel</strong>.<br>
        2. Ensure both <strong>Apache</strong> and <strong>MySQL</strong> have the green "Running" status.<br>
        3. Refresh this page to retry setup automatically.
      </div>
    <?php endif; ?>
  </div>

</body>
</html>
