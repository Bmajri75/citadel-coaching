<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/stripe-helper.php';

only_method('POST');

$body       = get_json_body();
$nom        = trim($body['nom']        ?? '');
$email      = trim($body['email']      ?? '');
$tel        = trim($body['tel']        ?? '');
$discipline = trim($body['discipline'] ?? '');
$date       = trim($body['date']       ?? '');
$heure      = trim($body['heure']      ?? '');

if (!$nom || !$email || !$discipline || !$date || !$heure) {
    json_response(400, ['error' => 'Informations de réservation incomplètes.']);
}

$dateFormatee = formater_date_fr($date);

$result = stripe_request('POST', 'checkout/sessions', [
    'mode'                                                    => 'payment',
    'customer_email'                                          => $email,
    'locale'                                                  => 'fr',
    'line_items[0][price_data][currency]'                     => 'eur',
    'line_items[0][price_data][product_data][name]'           => "Séance privée — $discipline",
    'line_items[0][price_data][product_data][description]'    => "$dateFormatee à $heure — Paris / Île-de-France",
    'line_items[0][price_data][unit_amount]'                  => 7000,
    'line_items[0][quantity]'                                 => 1,
    'metadata[nom]'                                           => $nom,
    'metadata[tel]'                                           => $tel,
    'metadata[discipline]'                                    => $discipline,
    'metadata[date]'                                          => $date,
    'metadata[heure]'                                         => $heure,
    'success_url'                                             => SITE_URL . '/succes?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url'                                              => SITE_URL . '/#reservation',
]);

if ($result['status'] !== 200) {
    json_response(500, ['error' => $result['body']['error']['message'] ?? 'Erreur Stripe.']);
}

json_response(200, ['url' => $result['body']['url']]);
