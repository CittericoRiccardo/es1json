const express = require('express')
const app = express()
app.get('/gioco.js', function (req, res) {
  res.set('Content-Type', 'application/javascript')
  res.sendFile(__dirname + '/gioco.js')
})
app.get('/gioco', (req, res) => {
  res.sendFile(__dirname + '/blackjack.html')
})
var punteggioutente = 0
var cartegiocatore = []
var cardb
var puntib = 0
//la freccia la uso per chiamare una funzione che è all'interno delle graffe senza specificare un nome
const pesca = () => {
  const seme = ['cuore', 'quadri', 'fiori', 'picche']
  const valore = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  const semee = [Math.floor(Math.random() * seme.length)]
  const valoree = [Math.floor(Math.random() * valore.length)]
  var v = parseInt(valoree)
  if (valoree === 'J' || valoree === 'Q' || valoree === 'K') {
    v = 10
  } else {
    if (valoree == 'A') v = 11
  }
  return {
    seme: semee,
    valore: valoree,
    v: v,
  }
}
for (i = 0; i < 2; i++) {
  cardb = pesca()
  puntib = puntib + cardb.v
  var decisione = Math.random() * 2
  if (decisione == 1) {
    puntib = puntib - 11 + 1
  }
}
if (puntib < 17) {
  cardb = pesca()
  puntib = puntib + cardb.v
  var decisione = Math.random() * 2
  if (decisione == 1) {
    puntib = puntib - 11 + 1
  }
}
app.get('/richiedocarta', (req, res) => {
  const c = pesca()
  cartegiocatore.push(c)
  punteggioutente = punteggioutente + c.v
  if (punteggioutente > 21) {
    punteggioutente = 'hai perso'
  }
  res.json({
    c: c.valore + ' di ' + c.seme,
    punteggio: punteggioutente,
  })
})
app.get('/fermamano', (req, res) => {
  if (punteggioutente > 21 || puntib > punteggioutente) {
    punteggioutente = 'hai perso'
  } else {
    if (punteggioutente == puntib) {
      punteggioutente = 'hai pareggiato'
    } else {
      punteggioutente = 'hai vinto'
    }
  }
  res.json({
    punteggio: punteggioutente,
  })
})
app.listen(3000, () => {
  console.log('server in ascolto sulla porta 3000')
})
