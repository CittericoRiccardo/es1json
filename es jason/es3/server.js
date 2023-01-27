const express = require('express')
const app = express()
app.get('/gioco', (req, res) => {
  res.sendFile(__dirname + '/blackjack.html')
})
var punteggioutente = 0
var cartegiocatore = []

//la freccia la uso per chiamare una funzione che è all'interno delle graffe senza specificare un nome
const pesca = () => {
  const seme = ['cuore', 'quadri', 'fiori', 'picche']
  const valore = [
    '1',
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
    if (valoree == '1') v = 11
  }
  return {
    seme: semee,
    valore: valoree,
    v: v
  }
}
