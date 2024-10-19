const villeInput = document.querySelector('.ville-input')
const rechercheBtn = document.querySelector('.rechercher-btn')

const sectionMeteoInfo = document.querySelector('.meteo-info')
const sectionNonTrouve = document.querySelector('.non-trouve')
const sectionRechercherVille = document.querySelector('.rechercher-ville')

const apiKey = '6c6d33e641b27a32fcc27871687bca90'


rechercheBtn.addEventListener('click', () => {

  if (villeInput.value.trim() != '') {

    updateInfoMeteo(villeInput.value)
    villeInput.value = ''
    villeInput.blur()

  }

})

villeInput.addEventListener('keydown', (e) => {

  if (e.key == 'Enter' && villeInput.value.trim() != "") {
        
    updateInfoMeteo(villeInput.value)
    villeInput.value = ''
    villeInput.blur()

  }

})

async function getFetchData() {

  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}`

  const reponse = await fetch(urlApi)

  return reponse.json()
}

async function updateInfoMeteo(ville) {

  const meteoData = await getFetchData('weather', ville)

  console.log(meteoData)
}
