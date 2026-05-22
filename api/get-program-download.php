<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/stripe-helper.php';

only_method('GET');

$sessionId = $_GET['session_id'] ?? '';
if (!$sessionId) {
    json_response(400, ['error' => 'session_id manquant.']);
}

$result = stripe_request('GET', 'checkout/sessions/' . urlencode($sessionId));
if ($result['status'] !== 200) {
    json_response(500, ['error' => $result['body']['error']['message'] ?? 'Erreur Stripe.']);
}

$session = $result['body'];

if (($session['payment_status'] ?? '') !== 'paid') {
    json_response(402, ['error' => 'Paiement non confirmé.']);
}

$programmeId = $session['metadata']['programmeId'] ?? '';

if (!$programmeId || !isset(PROGRAMMES[$programmeId])) {
    json_response(404, ['error' => 'Programme introuvable.']);
}

json_response(200, [
    'nom'           => PROGRAMMES[$programmeId]['nom'],
    'pdfUrl'        => PDF_URLS[$programmeId] ?? '',
    'customerEmail' => $session['customer_details']['email'] ?? '',
]);
