//getElementByID seleziona l'elemento con quell'id
const richiedocarta = document.getElementById('carta')
const fermamano = document.getElementById('ferma')
const raddoppia = document.getElementById('raddoppia')
const dividi = document.getElementById('dividi')
var cartaestratta = document.getElementById('cartaestratta')
var punti = document.getElementById('punteggio')
var asso = 1
//rimane in ascolto fino a quando non succede qualcosa al pulsante
document.getElementById('selezionea').addEventListener('change', function () {
  asso = this.value //cambia valore in base a come lo seleziono
})
//la freccia la uso come funzione: esegue il codice che scrivo nelle {}
richiedocarta.addEventListener('click', () => {
  var xhr = new XMLHttpRequest(xhr.open('GET', '/richiedocarta'))
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log('richiesta accettata')
    } else {
      console.log('richiesta negata')
    }
  }
  xhr.send()
  xhr.responseType = 'json'
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var risposta = xhr.response
      var carta = risposta.carta
      var punteggio
      if (carta === 'A') {
        punteggio = asso - 11 + risposta.punteggio
      } else {
        punteggio = risposta.punteggio
      }
      //inner aggiorna la visualizzazione della pagina html
      cartaestratta.innerHTML = carta
      punti.innerHTML = punteggio
    }
  })
})
fermamano.addEventListener('click', () => {
    var xhr = new XMLHttpRequest(xhr.open('GET', '/fermamano'))
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('richiesta accettata')
      } else {
        console.log('richiesta negata')
      }
    }
    xhr.send()
    xhr.responseType = 'json'
    xhr.addEventListener('load', function () {
        var risposta=xhr.response
        var punteggio=risposta.punteggio
        punti.innerHTML=punteggio
  })
})