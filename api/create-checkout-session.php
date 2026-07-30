<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/stripe-helper.php';

only_method('POST');

$body       = get_json_body();
$nom        = trim($body['nom']                ?? '');
$email      = trim($body['email']              ?? '');
$tel        = trim($body['tel']                ?? '');
$discipline = trim($body['discipline']         ?? '');
$ville      = trim($body['ville']              ?? '');
$coach_id   = trim($body['preferred_coach_id'] ?? '');

if (!$nom || !$email || !$discipline) {
    json_response(400, ['error' => 'Informations incompletes (nom, email, discipline requis).']);
}

$description = $ville ? "$nom - $ville" : $nom;

$result = stripe_request('POST', 'checkout/sessions', [
    'mode'                                                    => 'payment',
    'customer_email'                                          => $email,
    'locale'                                                  => 'fr',
    'line_items[0][price_data][currency]'                     => 'eur',
    'line_items[0][price_data][product_data][name]'           => 'Seance privee - ' . $discipline,
    'line_items[0][price_data][product_data][description]'    => $description,
    'line_items[0][price_data][unit_amount]'                  => 9000,
    'line_items[0][quantity]'                                 => 1,
    'metadata[nom]'                                           => $nom,
    'metadata[email]'                                         => $email,
    'metadata[tel]'                                           => $tel,
    'metadata[discipline]'                                    => $discipline,
    'metadata[ville]'                                         => $ville,
    'metadata[coach_id]'                                      => $coach_id,
    'success_url'                                             => SITE_URL . '/succes?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url'                                              => SITE_URL . '/demande-coaching',
]);

if ($result['status'] !== 200) {
    $msg = isset($result['body']['error']['message']) ? $result['body']['error']['message'] : 'Erreur Stripe.';
    json_response(500, ['error' => $msg]);
}

json_response(200, ['url' => $result['body']['url']]);
