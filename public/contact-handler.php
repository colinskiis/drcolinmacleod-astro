<?php
header('Content-Type: application/json');

// POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Origin check — parse host strictly, treat missing origin as neutral
$allowed_hosts = ['drcolinmacleod.com', 'www.drcolinmacleod.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST);
    if (!in_array($host, $allowed_hosts, true)) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

// Rate limit: max 5 submissions per IP per hour
// Stored OUTSIDE web root (parent of public_html) — not browser-accessible
// On Namecheap: __DIR__ = ~/public_html/, dirname(__DIR__) = ~/
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$cacheDir = dirname(__DIR__) . '/contact_cache/';

if (!is_dir($cacheDir)) {
    if (!mkdir($cacheDir, 0700, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
        exit;
    }
}

$rateFile     = $cacheDir . 'rate_' . md5($ip) . '.json';
$window       = 3600;
$maxPerWindow = 5;

// Safe JSON read with corruption guard
$rateData = null;
if (file_exists($rateFile)) {
    $raw = file_get_contents($rateFile);
    if ($raw !== false) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded) && isset($decoded['count'], $decoded['window_start'])) {
            $rateData = $decoded;
        }
    }
}
if ($rateData === null) {
    $rateData = ['count' => 0, 'window_start' => time()];
}

if ((time() - $rateData['window_start']) > $window) {
    $rateData = ['count' => 0, 'window_start' => time()];
}
if ($rateData['count'] >= $maxPerWindow) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many submissions. Please try again later.']);
    exit;
}
$rateData['count']++;
if (file_put_contents($rateFile, json_encode($rateData), LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
    exit;
}

// Honeypot — bots fill hidden fields, humans don't
if (!empty($_POST['_gotcha'])) {
    echo json_encode(['success' => true]); // silent fake success
    exit;
}

// Collect fields
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');
$privacy = $_POST['privacy']      ?? '';

// Presence + privacy checkbox validation
// The form's checkbox has no value attr, so browsers send 'on' by default (HTML spec)
if (!$name || !$email || !$message || $privacy !== 'on') {
    http_response_code(422);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// Max length limits — mb_strlen for correct UTF-8 character counting
$nameLen    = function_exists('mb_strlen') ? mb_strlen($name)    : strlen($name);
$messageLen = function_exists('mb_strlen') ? mb_strlen($message) : strlen($message);
if ($nameLen > 200 || $messageLen > 5000) {
    http_response_code(422);
    echo json_encode(['error' => 'Input too long']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Strip \r and \n to prevent header injection in any string used in the email
function sanitize_header(string $value): string {
    return str_replace(["\r", "\n"], '', $value);
}

$safeName  = sanitize_header($name);
$safeEmail = sanitize_header($email);

// Plain-text body — normalize line endings
$safeMessage = str_replace(["\r\n", "\r"], "\n", $message);

// Send via Resend API
// Key is stored OUTSIDE web root — never committed to git
// File: ~/resend_config.php  (one level above public_html on Namecheap)
// Contents: <?php return 're_YOUR_NEW_API_KEY_HERE';
$configFile = dirname(__DIR__) . '/resend_config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error']);
    exit;
}
$apiKey = require $configFile;
$payload = json_encode([
    'from'      => 'noreply@drcolinmacleod.com',
    'to'        => ['info@drcolinmacleod.com'],
    'reply_to'  => [$safeEmail],
    'subject'   => "Contact form: {$safeName}",
    'text'      => "Name: {$safeName}\nEmail: {$safeEmail}\n\nMessage:\n{$safeMessage}",
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 201) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
