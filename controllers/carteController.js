var data = require('../data')

let id = 0

exports.index = function (req, res) {
    return res.status(200).json({ data: data.listeDeCartes })  
}

exports.add = function (req, res) {
    if (req.body.nom) {

        carte = {
            id: id++,
            nom: req.body.nom,
            menus: []
        }

        data.listeDeCartes.push(carte)
        return res.status(201).json({ data: carte.id})      
    }

    return res.status(400).json({ message: "Le nom est requis." })    
}

exports.show = function (req, res) {
    for (let i in data.listeDeCartes) {
        if (data.listeDeCartes[i].id == req.params.id) {
            return res.status(200).json({ data: data.listeDeCartes[i] })
        }
    }

    return res.status(404).json({ message: "Impossible de trouver cet carte" })
}

exports.destroy = function (req, res) {
    for (let i in data.listeDeCartes) {
        console.log(data.listeDeCartes)
        if (data.listeDeCartes[i].id == req.params.id) {
            delete data.listeDeCartes[i]
            
            return res.status(200).json({ message: "Carte supprimer" })
        }
    }

    return res.status(404).json({ message: "Impossible de trouver cet carte." })
}