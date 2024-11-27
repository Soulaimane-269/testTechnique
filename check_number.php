<?php

function trouverPlusPetitNombre($debut, $fin) {
    for ($i = $debut; $i <= $fin; $i++) {
        $digits = str_split($i);

        // Vérifier si le nombre a au moins 3 chiffres
        if (count($digits) < 3) {
            continue;
        }

        $secondDigit = (int) $digits[1]; // Le deuxième chiffre
        $lastDigit = (int) $digits[count($digits) - 1]; // Le dernier chiffre
        $secondLastDigit = (int) $digits[count($digits) - 2]; // L'avant-dernier chiffre

        // Vérification des conditions
        if (
            ($lastDigit + $secondLastDigit == $secondDigit) && // La somme des 2 derniers chiffres est égale au 2ème chiffre
            count(array_unique($digits)) == count($digits) && // Pas de chiffres répétés
            $i % 3 == 0 && // Divisible par 3
            !in_array(0, $digits) && !in_array(9, $digits) // Pas de 0 ni de 9
        ) {
            return $i;
        }
    }
    return null; // Retourne null si aucun nombre valide n'est trouvé
}

$debut = isset($_POST['debut']) ? (int)htmlspecialchars($_POST['debut'], ENT_QUOTES, 'UTF-8') : 0;
$fin = isset($_POST['fin']) ? (int)htmlspecialchars($_POST['fin'], ENT_QUOTES, 'UTF-8') : 0;

$resultat = trouverPlusPetitNombre($debut, $fin);

// Retourner le résultat au format JSON
echo json_encode(['result' => $resultat]);

?>
