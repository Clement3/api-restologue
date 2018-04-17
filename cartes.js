const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var data = require('./data')

let id = 0;

var cartes = {}

// For Parsing Body x-www-form-encoded
app.use(bodyParser.urlencoded({ extended: true })); 

// Return all cards
app.get('/carte/get', (req, res) => {
    return res.status(200).json({ data: cartes})  
})

// Add new card
app.post('/carte/add', (req, res) => {
    if (req.body.nom) {
        cartes = {
            id: id++,
            nom: req.body.nom,
            menus: []
        }
        data.listeDeCartes.push(cartes)
        return res.status(201).json({ id: id})      
    }
    return res.status(400).json({ message: "Le nom est requis." })
})

// Get card by id
app.get('/carte/:id/get', (req, res) => {
    if (cartes[req.params.id] !== undefined) {
        return res.status(200).json({ data: cartes[req.params.id] })
    }
    return res.status(400).json({ message: "Impossible de trouver cet carte." })
})

// Delete card by id
app.delete('/carte/:id/delete', (req, res) => {
    if (cartes[req.params.id] !== undefined) {
        delete cartes[req.params.id]
        return res.status(200).json({ message: "Carte supprimer" })
    }
    return res.status(400).json({ message: "Impossible de trouver cet carte." })
})

// We start the Card Api server
app.listen(4000, () => console.log('Card API is running on http://localhost:4000.'))