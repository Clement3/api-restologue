var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

// Import data file
var data = require('../data')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true })); 

let id = 0;

// Return all menus
router.get('/cartes/menus/all', (req, res) => {
    for (let i in data.listeDeCartes) {
        for (let k in data.listeDeCartes[i].menus) {
            return res.status(200).json({ data: data.listeDeCartes[i].menus })
        }
    }

    return res.status(404).json({ message: "Il y à aucun menus." })
})

// Return all menus for carteId
router.get('/cartes/:carteId/menus/get', (req, res) => {
    for (let i in data.listeDeCartes) {
        if (data.listeDeCartes[i].id == req.params.carteId) {
            return res.status(200).json({ data: data.listeDeCartes[i].menus })
        }
    }

    return res.status(404).json({ message: "Impossible de trouver cet carte." })
})

// Add a menu to a carteId
router.post('/cartes/:carteId/menus/add', (req, res) => {
    for (let i in data.listeDeCartes) {
        if (data.listeDeCartes[i].id == req.params.carteId) {
            menu = {
                id: id++,
                nom: req.body.nom,
                entree: {
                    nom: req.body.entree_nom,
                    prix: req.body.entree_prix
                },
                plat: {
                    nom: req.body.plat_nom,
                    prix: req.body.plat_prix
                },
                dessert: {
                    nom: req.body.dessert_nom,
                    prix: req.body.dessert_prix
                }                                
            }

            data.listeDeCartes[i].menus.push(menu)
            menus.push(menu)

            return res.status(201).json({ data: menu.id })
        }
    }

    return res.status(404).json({ message: "Impossible de trouver cet carte." })
})

// Delete a menu from a carteId
router.delete('/cartes/:carteId/menus/remove', (req, res) => {
    for (let i in data.listeDeCartes) {
        if (data.listeDeCartes[i].id == req.params.carteId) {
            data.listeDeCartes[i].menus.splice(0, data.listeDeCartes[i].menus.length)
        }
    }

    return res.status(404).json({ message: "Impossible de trouver cet carte." })
})

// Return a menu from menuId
router.get('/cartes/menus/:menuId/get', (req, res) => {
    for (let i in data.listeDeCartes) {
        for (let k in data.listeDeCartes[i].menus) {
            if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {
                return res.status(200).json({ data:  data.listeDeCartes[i].menus[k] })
            }
        }

        return res.status(404).json({ message: "Aucun menus" })
    }

    return res.status(404).json({ message: "Aucune cartes" })
})


// Delete a menu from a menuId
router.delete('/cartes/menus/:menuId/remove', (req, res) => {
    for (let i in data.listeDeCartes) {
        for (let k in data.listeDeCartes[i].menus) {
            if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {
                data.listeDeCartes[i].menus.splice(k, 0)
                return res.status(200).json({ message: "Menu supprimer avec success." })
            }
        }
    }

    return res.status(404).json({ message: "Aucune cartes" })
})

// Update a menu from a menuId
router.put('/cartes/menus/:menuId/update', (req, res) => {
    for (let i in data.listeDeCartes) {
        for (let k in data.listeDeCartes[i].menus) {
            if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {
                data.listeDeCartes[i].menus[k] = {
                    id: id++,
                    nom: req.body.nom,
                    entree: {
                        nom: req.body.entree_nom,
                        prix: req.body.entree_prix
                    },
                    plat: {
                        nom: req.body.plat_nom,
                        prix: req.body.plat_prix
                    },
                    dessert: {
                        nom: req.body.dessert_nom,
                        prix: req.body.dessert_prix
                    }                                
                }

                return res.status(200).json({ message: "Menu édité avec success" })
            }
        }

        return res.status(404).json({ message: "Aucun menus" })
    }

    return res.status(404).json({ message: "Aucune cartes" })  
})

module.exports = router;