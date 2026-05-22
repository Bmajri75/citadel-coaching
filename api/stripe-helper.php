<?php
// Fonctions partagées par tous les endpoints — pas de SDK Stripe (hébergement mutualisé)

function stripe_request(string $method, string $endpoint, array $data = []): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://api.stripe.com/v1/' . $endpoint,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_USERPWD        => STRIPE_SECRET_KEY . ':',
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    ]);
    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    } elseif ($method === 'GET' && !empty($data)) {
        curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com/v1/' . $endpoint . '?' . http_build_query($data));
    }
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['status' => $httpCode, 'body' => json_decode($response, true)];
}

function json_response(int $code, array $data): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Access-Control-Allow-Origin: ' . SITE_URL);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function only_method(string $allowed): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        header('Access-Control-Allow-Origin: ' . SITE_URL);
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] !== $allowed) {
        json_response(405, ['error' => 'Méthode non autorisée.']);
    }
}

function get_json_body(): array
{
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

// Convertit "2026-05-21" → "Mercredi 21 mai 2026" sans extension intl
function formater_date_fr(string $date): string
{
    $ts    = strtotime($date);
    $jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    $mois  = ['','janvier','février','mars','avril','mai','juin',
               'juillet','août','septembre','octobre','novembre','décembre'];
    return $jours[date('w',$ts)] . ' ' . date('j',$ts) . ' ' . $mois[(int)date('n',$ts)] . ' ' . date('Y',$ts);
}
