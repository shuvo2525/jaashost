<?php
/**
 * JAAS BD Platform - Entry Point for Local XAMPP
 * Automatically verifies database and routes requests to appropriate pages
 */

require_once __DIR__ . '/db.php';

// Trigger database readiness check
$pdo = getDB();

$rp = $_GET['rp'] ?? '';
$action = $_GET['a'] ?? '';

// Check if cart, store, or checkout action
if (strpos($rp, '/store') !== false || strpos($rp, 'cart') !== false || in_array($action, ['add', 'view', 'checkout', 'confproduct', 'confdomains'])) {
    include __DIR__ . '/cart.html';
    exit;
}

// Check if login
if (strpos($rp, 'login') !== false) {
    include __DIR__ . '/login.html';
    exit;
}

// Render homepage by default
include __DIR__ . '/index.html';
