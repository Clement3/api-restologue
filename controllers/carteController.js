var carteModel = require('../models/Carte')

// Pour écrire moins, on stock le model dans la variable Carte
let Carte = carteModel.data

// Pour générer [id] qu'on incrémente. Commence à 1 car on stock déjà des données
// teste dans notre model
let id = 1

exports.index = function (req, res) {
    return res.status(200).json({ data: Carte })
}

exports.create = function (req, res) {
    if (req.body.nom) {
		let generateId = id++
        let carteSchema = {
            id: generateId.toString(),
            nom: req.body.nom,
            menus: []
        }
        Carte.push(carteSchema)
        return res.status(201).json({ data: carteSchema.id})
    }
    return res.status(400).json({ message: 'Le nom est requis.' })
}

exports.show = function (req, res) {
    for (let i in Carte) {
        if (Carte[i].id === req.params.id) {
            return res.status(200).json({ data: Carte[i] })
        }
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
    }
    return res.status(404).json({ message: 'Aucune cartes.' })
}

exports.edit = function (req, res) {
    for (let i in Carte) {
        if (Carte[i].id === req.params.id) {
            Carte[i].nom = req.body.nom
            return res.status(200).json({ message: 'La carte à été modifier.' })
        }
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
    }
    return res.status(404).json({ message: 'Aucune cartes.' })
}

exports.destroy = function (req, res) {
    for (let i in Carte) {
        if (Carte[i].id === req.params.id) {
            Carte.splice(i, 1)
            return res.status(200).json({ message: 'La carte à bien été supprimer.' })
        }
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
    }
    return res.status(404).json({ message: 'Aucune cartes.' })
}
