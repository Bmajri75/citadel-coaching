<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/stripe-helper.php';

if (!defined('HORAIRES')) {
    define('HORAIRES', ['08:00', '09:00', '14:00', '15:00', '16:00']);
}

only_method('GET');

$date = $_GET['date'] ?? '';
if (!$date || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    json_response(400, ['error' => 'date invalide (format: YYYY-MM-DD)']);
}

$d = DateTime::createFromFormat('Y-m-d', $date);
if (!$d || $d->format('Y-m-d') !== $date) {
    json_response(400, ['error' => 'date invalide']);
}

$creneauxPris = [];
$fichier      = __DIR__ . '/../data/creneau-reserves.json';

if (file_exists($fichier)) {
    $data = json_decode(@file_get_contents($fichier), true);
    if (is_array($data)) {
        foreach ($data as $r) {
            if (($r['date'] ?? '') === formater_date_fr($date)) {
                $creneauxPris[] = $r['heure'] ?? '';
            }
        }
    }
}

$disponibles = array_values(array_diff(HORAIRES, $creneauxPris));

json_response(200, [
    'date'        => $date,
    'disponibles' => $disponibles,
    'reserves'    => $creneauxPris,
]);
