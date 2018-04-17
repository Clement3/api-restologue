const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var users = {
  username: "admin",
  password: "admin",
  connected: false
}

app.use(bodyParser.urlencoded({ extended: true })); 

// Verify if the user login & password is correct
app.post('/verify', (req, res) => {
  if (req.body.username === users.username && req.body.password === users.password) {
    users.connected = true;
    return res.status(200).json({ message: 'Connexion réussie.'})
  }
  res.status(401).json({ message: 'Mauvais nom d\'utilisateur ou mot de passe'})
})

// Check if the user is connected
app.get('/connected', (req, res) => {
  if (users.connected) {
    res.status(200).json({ message: 'L\'utilisateur est connecté.'})
  }
  res.status(401).json({ message: 'L\'utilisateur n\'est pas connecté.'})
})

app.listen(3000, () => console.log('Auth API is running.'))