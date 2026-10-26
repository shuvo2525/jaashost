<?php
/**
 * JAAS BD Platform - Cart & Checkout Controller
 * Renders the Shopping Cart & WHMCS Checkout Flow
 */

require_once __DIR__ . '/db.php';
$pdo = getDB();

// Render cart interface
include __DIR__ . '/cart.html';
