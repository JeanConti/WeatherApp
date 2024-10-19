const apiKey = '6c6d33e641b27a32fcc27871687bca90';

document.addEventListener('DOMContentLoaded', () => {
  const inputVille = document.querySelector('.ville-input');

  // Detectar la tecla Enter en el campo de texto
  inputVille.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      obtenirMeteo();  // Llama a la función de búsqueda cuando se presiona "Enter"
    }
  });
});


// Fonction appelée lors du clic sur le bouton de recherche
function obtenirMeteo() {
    const ville = document.getElementById('cityInput').value;  // Obtenir la ville saisie par l'utilisateur
    const infoMeteo = document.getElementById('weatherInfo'); // Section des infos météo
    const sectionRechercherVille = document.querySelector('.rechercher-ville'); // Section de recherche de ville
    const sectionNonTrouve = document.querySelector('.non-trouve'); // Section d'erreur de ville non trouvée

    // Vérifier si le champ de la ville est vide
    if (ville === '') {
        alert('Veuillez entrer le nom d\'une ville');
        return;
    }

    // Construire l'URL de l'API pour obtenir les infos météo
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

    // Faire une requête à l'API météo
    fetch(url)
        .then(response => {
            // Si la réponse est invalide, lancer une erreur
            if (!response.ok) {
                throw new Error('Ville non trouvée');
            }
            return response.json();
        })
        .then(data => {
            // Si la ville est trouvée, afficher les infos météo
            afficherMeteo(data);
            infoMeteo.style.display = 'block'; // Afficher la section météo
            sectionRechercherVille.style.display = 'none'; // Masquer la section de recherche initiale
            sectionNonTrouve.style.display = 'none'; // Masquer la section d'erreur (si visible)
        })
        .catch(error => {
            // Si la ville n'est pas trouvée, afficher la section d'erreur
            infoMeteo.style.display = 'none'; // Masquer la section météo
            sectionRechercherVille.style.display = 'none'; // Masquer la section de recherche initiale
            sectionNonTrouve.style.display = 'block'; // Afficher la section d'erreur
        });
}



// Fonction qui met à jour les informations météo dans l'interface
function afficherMeteo(data) {
    const ville = data.name;
    const temperature = Math.round(data.main.temp); // Arrondir la température
    const description = data.weather[0].description;
    const icone = data.weather[0].icon;
    const humidite = data.main.humidity;
    const vitesseVent = data.wind.speed;

    // Mettre à jour le HTML avec les informations reçues
    document.querySelector('.ville-tsxt').textContent = ville;
    document.querySelector('.temp-txt').textContent = `${temperature} °C`;
    document.querySelector('.condition-txt').textContent = description;
    document.querySelector('.resume-meteo-img').src = `http://openweathermap.org/img/wn/${icone}@2x.png`;
    document.querySelector('.valeur-humidite-txt').textContent = `${humidite}%`;
    document.querySelector('.valeur-vent-txt').textContent = `${vitesseVent} km/h`;

    // Vous pouvez ajouter ici d'autres éléments comme les prévisions météorologiques si nécessaire.

  
}


