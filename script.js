let essais = 0;
const maxEssais = 10;

document.getElementById('rangeForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const debut = parseInt(document.getElementById('debut').value);
    const fin = parseInt(document.getElementById('fin').value);

    if (fin - debut > 100) {
        document.getElementById('resultat').innerText = "L'intervalle ne doit pas dépasser 100 nombres.";
        return;
    }

    essais++;

    const essaisRestants = Math.max(0, maxEssais - essais);
    document.getElementById('essaisRestants').innerText = "Essais restants : " + essaisRestants;

    if (essais > maxEssais) {
        document.getElementById('gameOverOverlay').style.display = 'flex';
        return;
    }

    fetch('check_number.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `debut=${debut}&fin=${fin}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === null) {
            document.getElementById('resultat').innerText = "Aucun nombre valide trouvé dans l'intervalle.";
        } else {
            const winMessage = `Le nombre valide trouvé est : ${data.result}`;
            document.getElementById('winMessage').innerText = winMessage;
            document.getElementById('winOverlay').style.display = 'flex';
        }
    })
    .catch(error => {
        console.log('Erreur lors de la requête:', error);
        document.getElementById('resultat').innerText = "Une erreur est survenue.";
    });
});

let hintClicked = false;
document.getElementById('hint').addEventListener('click', function () {
    if (!hintClicked) {
        document.getElementById('resultat').innerText = "Psst... Le nombre est inférieur à 2000!";
        this.style.display = 'none';
        hintClicked = true;
    }
});

document.getElementById('retryButton').addEventListener('click', function () {
    location.reload();
});
