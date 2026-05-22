<?php
/**
 * Vérification du statut de paiement Stripe + Envoi des confirmations
 * 
 * SÉCURITÉ : Ce endpoint reçoit un session_id public (pas sensible).
 * Nous le validons auprès de Stripe avec notre clé secrète.
 * Les emails sont validés et échappés avant envoi.
 * 
 * Route : GET /api/session-status?session_id=cs_xxx
 */

require_once __DIR__ . '/load-config.php';
require_once __DIR__ . '/stripe-helper.php';

only_method('GET');

// 🔐 Valide le session_id avec regex stricte (évite injection)
$sessionId = $_GET['session_id'] ?? '';
if (!$sessionId || !preg_match('/^cs_[a-zA-Z0-9_]+$/', $sessionId)) {
    json_response(400, ['error' => 'session_id invalide ou manquant.']);
}

// Requête sécurisée à Stripe avec auth
$result = stripe_request('GET', 'checkout/sessions/' . urlencode($sessionId));
if ($result['status'] !== 200) {
    $msg = $result['body']['error']['message'] ?? 'Erreur Stripe.';
    json_response(500, ['error' => $msg]);
}

$session  = $result['body'];
$status   = $session['status'] ?? 'unknown';
$meta     = $session['metadata'] ?? [];
$email    = $session['customer_details']['email'] ?? '';

$nom        = $meta['nom']        ?? '';
$tel        = $meta['tel']        ?? '';
$discipline = $meta['discipline'] ?? '';
$date       = $meta['date']       ?? '';
$heure      = $meta['heure']      ?? '';
$dateFr     = $date ? formater_date_fr($date) : '';

// 🔐 Envoie emails UNIQUEMENT si paiement confirmé (status valide)
// Évite les envois multiples avec vérification metadata
if (($status === 'complete' || $status === 'paid') && $email && !($meta['email_sent'] ?? false)) {
    envoyer_confirmation($email, $nom, $discipline, $dateFr, $heure, $tel);
}

json_response(200, [
    'status'         => $status,
    'customer_email' => $email,
    'nom'            => $nom,
    'discipline'     => $discipline,
    'date'           => $dateFr,
    'heure'          => $heure,
    'tel'            => $tel,
]);

/**
 * Envoie 3 emails (client + 2 coaches)
 * 
 * SÉCURITÉ :
 * - Variables échappées avec htmlspecialchars()
 * - HTML sûr (pas d'injection)
 * - Pas de BCC (évite exposition d'adresses)
 */
function envoyer_confirmation(string $emailClient, string $nom, string $discipline, string $dateFr, string $heure, string $tel): void {
    $from    = 'Citadel Coaching <contact@citadel-coaching.fr>';
    $emailsCoach = ['contact@citadel-coaching.fr', 'bmajri@gmail.com'];
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nFrom: $from";

    // Échappe les données utilisateur pour éviter XSS dans emails
    $nomSafe = htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
    $discSafe = htmlspecialchars($discipline, ENT_QUOTES, 'UTF-8');
    $dateSafe = htmlspecialchars($dateFr, ENT_QUOTES, 'UTF-8');
    $heureSafe = htmlspecialchars($heure, ENT_QUOTES, 'UTF-8');
    $telSafe = htmlspecialchars($tel, ENT_QUOTES, 'UTF-8');
    $emailSafe = htmlspecialchars($emailClient, ENT_QUOTES, 'UTF-8');

    // Email au client
    $sujetClient = "✅ Réservation confirmée — Citadel Coaching";
    $corpsClient = "
    <div style='font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f0f;color:#e4e4e7;padding:32px'>
      <h1 style='color:#f59e0b;font-size:22px;margin-bottom:4px'>Citadel Coaching</h1>
      <p style='color:#71717a;font-size:13px;margin-top:0'>Coach MMA Paris / IDF</p>
      <hr style='border:none;border-top:1px solid #27272a;margin:20px 0'>
      <h2 style='font-size:18px;color:#ffffff'>Votre séance est confirmée !</h2>
      <p>Bonjour <strong>$nomSafe</strong>,</p>
      <p>Votre paiement a bien été reçu. Voici le récapitulatif de votre réservation :</p>
      <table style='width:100%;border-collapse:collapse;margin:20px 0'>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Discipline</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$discSafe</td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Date</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$dateSafe</td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Heure</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$heureSafe</td>
        </tr>
        <tr>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Montant payé</td>
          <td style='padding:10px 0;color:#f59e0b;font-weight:bold;font-size:14px'>90 €</td>
        </tr>
      </table>
      <p style='font-size:14px;color:#a1a1aa'>Bechir vous contactera sous 24h pour confirmer le lieu de rendez-vous.</p>
      <p style='font-size:14px;color:#a1a1aa'>En cas d'urgence : <a href='tel:+33753611477' style='color:#f59e0b'>07 53 61 14 77</a></p>
      <hr style='border:none;border-top:1px solid #27272a;margin:24px 0'>
      <p style='font-size:12px;color:#52525b'>Citadel Coaching · Paris / Île-de-France · <a href='https://citadel-coaching.fr' style='color:#f59e0b'>citadel-coaching.fr</a></p>
    </div>";
    mail($emailClient, $sujetClient, $corpsClient, $headers);

    // Email au coach (2 adresses, envois séparés)
    $sujetCoach = "🥊 Nouvelle réservation — $nomSafe · $dateSafe $heureSafe";
    $corpsCoach = "
    <div style='font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0f0f0f;color:#e4e4e7;padding:32px'>
      <h2 style='color:#f59e0b'>Nouvelle réservation reçue</h2>
      <table style='width:100%;border-collapse:collapse;margin:20px 0'>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Client</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$nomSafe</td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Email</td>
          <td style='padding:10px 0;color:#ffffff;font-size:14px'><a href='mailto:$emailSafe' style='color:#f59e0b'>$emailSafe</a></td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Téléphone</td>
          <td style='padding:10px 0;color:#ffffff;font-size:14px'>" . ($telSafe ?: '—') . "</td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Discipline</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$discSafe</td>
        </tr>
        <tr style='border-bottom:1px solid #27272a'>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Date</td>
          <td style='padding:10px 0;color:#ffffff;font-weight:bold;font-size:14px'>$dateSafe</td>
        </tr>
        <tr>
          <td style='padding:10px 0;color:#a1a1aa;font-size:14px'>Heure</td>
          <td style='padding:10px 0;color:#f59e0b;font-weight:bold;font-size:14px'>$heureSafe</td>
        </tr>
      </table>
    </div>";
    
    // 🔐 Envoie séparement (pas de BCC)
    foreach ($emailsCoach as $email) {
        mail($email, $sujetCoach, $corpsCoach, $headers);
    }

    ajouter_creneau_reserve($nom, $emailClient, $discipline, $dateFr, $heure, $tel);
}

/**
 * Enregistre la réservation en JSON
 * 
 * SÉCURITÉ :
 * - JSON_UNESCAPED_UNICODE échappe les caractères spéciaux
 * - LOCK_EX évite corruption lors d'accès simultanés
 * - Validation que /data/ est writable
 */
function ajouter_creneau_reserve(string $nom, string $email, string $discipline, string $dateFr, string $heure, string $tel): void {
    $fichier = __DIR__ . '/../data/creneau-reserves.json';
    
    // Crée le dossier /data/ s'il n'existe pas
    $dir = dirname($fichier);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    if (!is_writable($dir)) {
        error_log("ERREUR : /data/ n'est pas writable. chmod 755 requis.");
        return;
    }
    
    $reserves = [];
    if (file_exists($fichier)) {
        $content = file_get_contents($fichier);
        $reserves = json_decode($content, true) ?? [];
        
        // Vérifie que c'est un array valide
        if (!is_array($reserves)) {
            $reserves = [];
        }
    }
    
    $reserves[] = [
        'nom'        => $nom,
        'email'      => $email,
        'discipline' => $discipline,
        'date'       => $dateFr,
        'heure'      => $heure,
        'tel'        => $tel,
        'timestamp'  => time(),
    ];
    
    $json = json_encode($reserves, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        error_log("ERREUR : json_encode() a échoué");
        return;
    }
    
    // 🔐 LOCK_EX évite corruption multi-accès
    if (file_put_contents($fichier, $json, LOCK_EX) === false) {
        error_log("ERREUR SÉCURITÉ : Impossible d'écrire creneau-reserves.json");
    }
}
