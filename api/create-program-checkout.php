<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/stripe-helper.php';

only_method('POST');

$body        = get_json_body();
$programmeId = trim($body['programmeId'] ?? '');
$email       = trim($body['email']       ?? '');
$nom         = trim($body['nom']         ?? '');

if (!$programmeId || !$email) {
    json_response(400, ['error' => 'Informations manquantes.']);
}

if (!isset(PROGRAMMES[$programmeId])) {
    json_response(404, ['error' => 'Programme introuvable.']);
}

$programme = PROGRAMMES[$programmeId];

$result = stripe_request('POST', 'checkout/sessions', [
    'mode'                                                    => 'payment',
    'customer_email'                                          => $email,
    'locale'                                                  => 'fr',
    'line_items[0][price_data][currency]'                     => 'eur',
    'line_items[0][price_data][product_data][name]'           => $programme['nom'],
    'line_items[0][price_data][product_data][description]'    => 'Programme PDF — Citadel Coaching',
    'line_items[0][price_data][unit_amount]'                  => $programme['prix'] * 100,
    'line_items[0][quantity]'                                 => 1,
    'metadata[programmeId]'                                   => $programmeId,
    'metadata[nom]'                                           => $nom,
    'success_url'                                             => SITE_URL . '/succes-programme?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url'                                              => SITE_URL . '/programmes/' . $programmeId,
]);

if ($result['status'] !== 200) {
    json_response(500, ['error' => $result['body']['error']['message'] ?? 'Erreur Stripe.']);
}

json_response(200, ['url' => $result['body']['url']]);
