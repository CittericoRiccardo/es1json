const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const res = require('express/lib/response')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/utente.html')
})
app.get('/iscrizione', (req, res) => {
  res.sendFile(__dirname + '/iscrizione.html')
})
app.post('/login', (req, res) => {
  var utente = JSON.parse(fs.readFileSync(__dirname + '/utente.json', 'utf-8'))
  var username = req.body.Username
  var password = req.body.Password
  for (var i = 0; i < utente.length; i++) {
    if (utente[i].Username == username && utente[i].Password == password) {
      res.send('accesso riuscito')
      return
    }
  }
  res.send('accesso negato')
})
app.post('/iscrizione', (req, res) => {
  var username = req.body.Username
  var password = req.body.Password
  var nuovoutente = { Username: username, Password: password }
  //fs è il file system
  fs.readFile('utente.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //salvataggio dati esistenti di utente.json
      var utente = JSON.parse(data)
      //aggiubgo utente nuovo all'array,la push aggiunge qualcosa
      utente.push(nuovoutente)
      //converte l'array in una stringa leggibile da json
      var json = JSON.stringify(utente)
      fs.writeFile('utente.json', json, 'utf-8', (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('dati salavti nel file Json')
          res.redirect('/login')
        }
      })
    }
  })
})
app.listen(3000, () => {
  console.log('server in ascolto su porta 3000')
})
