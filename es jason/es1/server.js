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
app.post('/login', (req, res) => {
  const utente = JSON.parse(
    fs.readFileSync(__dirname + '/utente.json', 'utf-8'),
  )
  const username = req.body.Username
  const password = req.body.Password
  for (var i = 0; i < utente.length; i++) {
    if (utente[i].username == username && utente[i].password == password) {
      res.send('accesso riuscito')
      return
    }
  }
  res.send('accesso negato')
})
app.listen(3000, () => {
  console.log('server in ascolto su porta 3000')
})
